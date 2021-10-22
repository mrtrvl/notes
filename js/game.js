const initGameInfo = () => {
  const { gameScore } = notesConfig;
  const gameInfo = document.querySelector('#gameInfo');
  if (!gameInfo.hasChildNodes()) {
    const gameIsOn = document.createElement('h2');
    const gameText = document.createElement('p');
    const gameScoreText = document.createElement('p');
    gameText.setAttribute('id', 'gameText');
    gameScoreText.setAttribute('id', 'gameScoreText');
    gameText.textContent = 'Wait for action';
    gameScoreText.textContent = gameScore;
    gameIsOn.textContent = 'Game is on';
    gameInfo.append(gameIsOn);
    gameInfo.append(gameText);
    gameInfo.append(gameScoreText);
  }
  gameInfo.style.visibility = 'visible';
}

const updateGameInfo = (text) => {
  const { gameScore } = notesConfig;
  const gameText = document.querySelector('#gameText');
  const gameScoreText = document.querySelector('#gameScoreText');
  gameText.innerHTML = text;
  gameScoreText.innerHTML = `Your score: ${gameScore}`;
}

const game = (success) => {
  const { gameNote } = notesConfig;
  if (success || !gameNote) {
    const { noteNames } = notesConfig;
    const randomNote = noteNames[Math.floor(Math.random() * noteNames.length - 1) + 1].clef.german;
    notesConfig.gameNote = randomNote;
    updateGameInfo(`Press note ${randomNote}`);
  } else {
    updateGameInfo(`You pressed wrong note, press ${gameNote}`);
  }
}