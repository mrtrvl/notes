const clefImage = new Image();
const bassClefImage = new Image();
clefImage.src = './img/clef.svg';
bassClefImage.src = './img/bassClef.svg';

const drawClef = () => {
  const { ctx, defaultKey } = notesConfig;
  if (defaultKey === 'clef') {
    console.log('drawing clef');
    ctx.drawImage(clefImage, 0, 40, 200, 350);
  } else {
    console.log('drawing bass clef');
    ctx.drawImage(bassClefImage, 0, 83, 150, 200);
  }
}

// Draw note lines
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

// Create bounadries array, so we can position note onto or between lines
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

// Get note center coordinate
const getCenterInBoundariesAndNoteName = (y, boundaries) => {
  const { lineStart, noteRadius, noteSpace, noteCount, noteNames, defaultNoteType, defaultKey } = notesConfig;
  let center = { x: 0, y: 0 };
  let noteName = '';
  // Get coordinate on x-axis according to noteCount
  const noteDiameter = noteRadius * 2;
  center.x = lineStart.x + noteDiameter + ((noteDiameter + noteSpace) * noteCount);
  // Get coordinate on y-axis according to noteLine position and mouseclick y-coordinate
  for (let i = 0; i < boundaries.length; i++) {
    if (y >= boundaries[i].upperY && y <= boundaries[i].lowerY) {
      y = (boundaries[i].lowerY - boundaries[i].upperY) / 2 + boundaries[i].upperY;
      center.y = y;
      noteName = noteNames[i + 1][defaultKey][defaultNoteType];
    }
  }
  return { center, noteName };
}

const updateNoteInfo = (note) => {
  const { defaultKey } = notesConfig;
  if (!note) note = '';
  const noteName = document.querySelector('#noteName');
  const noteKey = document.querySelector('#noteKey');
  noteName.innerHTML = `Note: ${note}`;
  noteKey.innerHTML = defaultKey;
}

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
    updateNoteInfo();
  });
}

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
    updateNoteInfo();
  });
}

const writeNoteNameOnNote = (noteName, location) => {
  const { ctx } = notesConfig;
  const textOffset = 8;
  ctx.fillStyle = "white";
  ctx.font = '20px Arial';
  ctx.fillText(noteName, location.x - textOffset, location.y + textOffset);
}

const drawNote = (center, noteName) => {
  const { ctx, noteRadius } = notesConfig;
  if (center.y !== 0) {
    // Increase noteCount
    notesConfig.noteCount ++;
    const circle = {
      ctx,
      center,
      radius: noteRadius
    };
    drawCircle(circle);
    writeNoteNameOnNote(noteName, center)
    updateNoteInfo(noteName);
  }
}

const initCanvas = () => {
  console.log('Init canvas ...');
  const canvas = document.querySelector('#canvas');
  const ctx = canvas.getContext('2d');
  notesConfig.ctx = ctx;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initNoteLines();
  drawClef();
}

// Initialize app
const init = () => {
  console.log('Init app ...');
  initCanvas();
  const boundaries = initNoteBoundaries();
  createKeySelectOptions();
  createnoteNameTypeSelectOptions();
  updateNoteInfo();

  // Start listening for mouse click
  canvas.addEventListener('mousedown', event => {
    const x = event.offsetX;
    const y = event.offsetY;
    const { center, noteName } = getCenterInBoundariesAndNoteName(y, boundaries);
    drawNote(center, noteName);
  });
}

// Start initializing
bassClefImage.onload = function() {
 init();
}