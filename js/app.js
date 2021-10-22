// Clef images
const clefImage = new Image();
const bassClefImage = new Image();
clefImage.src = './img/clef.svg';
bassClefImage.src = './img/bassClef.svg';

/**
 * Draw clef according to selected clef type
 */
const drawClef = () => {
  const { ctx, defaultKey } = notesConfig;
  if (defaultKey === 'clef') {
    ctx.drawImage(clefImage, 0, 40, 200, 350);
  } else {
    ctx.drawImage(bassClefImage, 0, 83, 150, 200);
  }
}

/**
 * Draw note lines
 */
const initNoteLines = () => {
  const { ctx, lineStart, lineEnd, noteLineStep, noteLineCount } = notesConfig;
  for (let i = 0; i < noteLineCount; i ++) {
    const line = {
      ctx,
      start: { x: lineStart.x, y: lineStart.y + i * noteLineStep },
      end: { x: lineEnd.x, y: lineEnd.y + i * noteLineStep }
    }
    drawLine(line);
  }
}

/**
 * Create bounadries array, so we can position note onto or between lines
 * @returns 
 */
const initNoteBoundaries = () => {
  const { lineStart, noteLineStep } = notesConfig;
  const verticalBoundaries = [];
  for (let i = -2; i < 11; i++) {
    const lineY = lineStart.y + i * noteLineStep / 2;
    const upperY = lineY - noteLineStep / 4;
    const lowerY = lineY + (noteLineStep / 4) - 1;
    verticalBoundaries.push({ upperY, lowerY });
  }
  return verticalBoundaries;
}

/**
 * 
 * @param {*} y 
 * @param {*} boundaries 
 * @returns 
 */
const getCenterInBoundariesAndNoteName = (y, boundaries) => {
  const {
    lineStart,
    lineEnd,
    noteRadius,
    noteSpace,
    noteCount,
    noteNames,
  } = notesConfig;
  let center = { x: 0, y: 0 };
  let noteName = '';
  // Get coordinate on x-axis according to noteCount
  const noteDiameter = noteRadius * 2;
  center.x = lineStart.x + noteDiameter + ((noteDiameter + noteSpace) * noteCount);
  if (center.x >= lineEnd.x) {
    initCanvas();
    notesConfig.noteCount = 2;
    center.x = lineStart.x + noteDiameter + ((noteDiameter + noteSpace) * notesConfig.noteCount);
  }
  // Get coordinate on y-axis according to noteLine position and mouseclick y-coordinate
  for (let i = 0; i < boundaries.length; i++) {
    if (y >= boundaries[i].upperY && y <= boundaries[i].lowerY) {
      y = (boundaries[i].lowerY - boundaries[i].upperY) / 2 + boundaries[i].upperY;
      center.y = y;
      noteName = noteNames[i];
    }
  }
  return { center, noteName };
}

/**
 * Create options for clef type select
 */
const createKeySelectOptions = () => {
  const { noteNames, defaultKey } = notesConfig;
  const keys = Object.keys(noteNames[0]);
  const selectKey = document.querySelector('#selectKey');
  keys.forEach(key => {
    const option = document.createElement('option');
    if (key === defaultKey) option.selected = true;
    option.text = key;
    option.value = key;
    selectKey.add(option);
  });
  selectKey.addEventListener('change', event => {
    notesConfig.defaultKey = event.target.value;
    initCanvas();
  });
}

/**
 * Create options for note name types
 */
const createnoteNameTypeSelectOptions = () => {
  const { noteNames } = notesConfig;
  const names = Object.keys(noteNames[0].clef);
  const selectNoteNameType = document.querySelector('#noteNameType');
  names.forEach(name => {
    const option = document.createElement('option');
    option.text = name;
    option.value = name;
    selectNoteNameType.add(option);
  });
  selectNoteNameType.addEventListener('change', event => {
    notesConfig.defaultNoteType = event.target.value;
  });
}

/**
 * Write note name
 * @param {String} noteName - name of note
 * @param {Object} location - location of note
 * @param {number} location.x - x-coordinate of note
 * @param {number} location.y - y-coordinate of note
 */
const writeNoteNameOnNote = (noteName, location) => {
  const { ctx, defaultKey, defaultNoteType } = notesConfig;
  const textOffsetY = 8;
  const textOffsetX = 10;
  ctx.fillStyle = "white";
  ctx.font = '20px Arial';
  ctx.fillText(noteName[defaultKey][defaultNoteType], location.x - textOffsetX, location.y + textOffsetY);
}

/**
 * Draw note onto canvas
 * @param {Object} center - center location of note
 * @param {number} center.x - x-coordinate of note
 * @param {number} center.y - y-coordinate of note
 * @param {String} noteName - name of note
 */
const drawNote = (center, noteName) => {
  const { ctx, noteRadius, gameIsOn, gameNote, synth, defaultKey, defaultNoteType, audioOn, easy } = notesConfig;
  const actionBox = document.querySelector('#actionBox');
  const actionText = document.querySelector('#actionText');
  if (!synth) {
    notesConfig.synth = new Tone.Synth().toDestination();
  }
  if (center.y !== 0) {
    // Increase noteCount
    notesConfig.noteCount ++;
    const circle = {
      ctx,
      center,
      radius: noteRadius
    };
    drawCircle(circle);
    if (gameIsOn) {
      let success = false;
      if (noteName[defaultKey][defaultNoteType] === gameNote) {
        success = true;
        notesConfig.gameScore = notesConfig.gameScore + 1;
        actionBox.classList.remove('has-background-danger');
        actionBox.classList.add('has-background-success');
        actionText.innerHTML = '+1';
      } else {
        actionBox.classList.remove('has-background-success');
        actionBox.classList.add('has-background-danger');
        notesConfig.gameScore -= 1;
        actionText.innerHTML = '-1';
      }
      if (easy) writeNoteNameOnNote(noteName, center);
      game(success);
    } else {
      writeNoteNameOnNote(noteName, center);
    }
    if (audioOn) {
      notesConfig.synth.triggerAttackRelease(noteName[defaultKey].english, '4n');
    }
  }
}

/**
 * Initialize canvas, draw lines and clef
 */
const initCanvas = () => {
  console.log('Init canvas ...');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  notesConfig.ctx = ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initNoteLines();
  drawClef();
  notesConfig.noteCount = 2;
}

const initResetButton = () => {
  const resetButton = document.querySelector('#resetCanvasButton');
  resetButton.addEventListener('click', event => {
    notesConfig.gameIsOn = false;
    const gameInfo = document.querySelector('#gameInfo');
    gameInfo.style.visibility = 'hidden';
    initCanvas();
  });
}

const initPlayButton = () => {
  const playButton = document.querySelector('#playButton');
  playButton.addEventListener('click', event => {
    console.log('Game is on');
    notesConfig.gameIsOn = true;
    initCanvas();
    initGameInfo();
    game();
  });
}

const initAudioCheckBox = () => {
  const audioCheckBox = document.querySelector('#audio');
  audioCheckBox.addEventListener('change', event => {
    notesConfig.audioOn = event.target.checked;
  });
}

const initDifficultyCheckBox = () => {
  const difficultyCheckBox = document.querySelector('#difficulty');
  difficultyCheckBox.addEventListener('change', event => {
    notesConfig.easy = event.target.checked;
  });
}

/**
 * Initialize app, create note boundaries and select elements
 */
const init = () => {
  console.log('Init app ...');
  initCanvas();
  const boundaries = initNoteBoundaries();
  createKeySelectOptions();
  createnoteNameTypeSelectOptions();
  initResetButton();
  initPlayButton();
  initAudioCheckBox();
  initDifficultyCheckBox();

  // Start listening for mouse click
  canvas.addEventListener('mousedown', event => {
    const y = event.offsetY;
    const { center, noteName } = getCenterInBoundariesAndNoteName(y, boundaries);
    drawNote(center, noteName);
  });
}

// Start initializing - wait until bassClef image is loaded
bassClefImage.onload = () => {
 init();
}