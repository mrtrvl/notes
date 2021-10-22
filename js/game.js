const initGameInfo = () => {
  const { gameScore } = notesConfig;
  const gameInfo = document.querySelector('#gameInfo');
  const gameScoreText = document.querySelector('#gameScoreText');
  gameText.textContent = 'Wait for action';
  gameScoreText.textContent = gameScore;
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