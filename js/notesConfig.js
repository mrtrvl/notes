const notesConfig = {
  ctx: null,
  lineStart: {
    x: 50,
    y: 100,
  },
  lineEnd: {
    x: 900,
    y: 100,
  },
  noteLineCount: 5,
  virtualNotLineCount: 14,
  noteLineStep: 50,
  noteRadius: 20,
  noteSpace: 20,
  noteCount: 2,
  noteNames: [
    {
      clef: {
        german: 'H5',
        english: 'B5',
        neoLatin: 'si',
      },
      bassClef: {
        german: 'C4',
        english: 'C4',
        neoLatin: 'do',
      },
    },
    {
      clef: {
        german: 'A5',
        english: 'A5',
        neoLatin: 'la',
      },
      bassClef: {
        german: 'C4',
        english: 'C4',
        neoLatin: 'do',
      },
    },
    {
      clef: {
        german: 'G5',
        english: 'G5',
        neoLatin: 'sol',
      },
      bassClef: {
        german: 'H4',
        english: 'B4',
        neoLatin: 'si',
      },
    },
    {
      clef: {
        german: 'F5',
        english: 'F5',
        neoLatin: 'fa',
      },
      bassClef: {
        german: 'A4',
        english: 'A4',
        neoLatin: 'la',
      },
    },
    {
      clef: {
        german: 'E5',
        english: 'E5',
        neoLatin: 'mi',
      },
      bassClef: {
        german: 'G4',
        english: 'G4',
        neoLatin: 'sol',
      },
    },
    {
      clef: {
        german: 'D5',
        english: 'D5',
        neoLatin: 're',
      },
      bassClef: {
        german: 'F4',
        english: 'F4',
        neoLatin: 'fa',
      },
    },
    {
      clef: {
        german: 'C5',
        english: 'C5',
        neoLatin: 'do',
      },
      bassClef: {
        german: 'E4',
        english: 'E4',
        neoLatin: 'mi',
      },
    },
    {
      clef: {
        german: 'H4',
        english: 'B4',
        neoLatin: 'si',
      },
      bassClef: {
        german: 'D4',
        english: 'D4',
        neoLatin: 're',
      },
    },
    {
      clef: {
        german: 'A4',
        english: 'A4',
        neoLatin: 'la',
      },
      bassClef: {
        german: 'C3',
        english: 'C3',
        neoLatin: 'do',
      },
    },
    {
      clef: {
        german: 'G4',
        english: 'G4',
        neoLatin: 'sol',
      },
      bassClef: {
        german: 'H3',
        english: 'B3',
        neoLatin: 'si',
      },
    },
    {
      clef: {
        german: 'F4',
        english: 'F4',
        neoLatin: 'fa',
      },
      bassClef: {
        german: 'A3',
        english: 'A3',
        neoLatin: 'la',
      },
    },
    {
      clef: {
        german: 'E4',
        english: 'E4',
        neoLatin: 'mi',
      },
      bassClef: {
        german: 'G3',
        english: 'G3',
        neoLatin: 'sol',
      },
    },
    {
      clef: {
        german: 'D4',
        english: 'D4',
        neoLatin: 're',
      },
      bassClef: {
        german: 'F3',
        english: 'F3',
        neoLatin: 'fa',
      },
    },
    {
      clef: {
        german: 'C4',
        english: 'C4',
        neoLatin: 'do',
      },
      bassClef: {
        german: 'E3',
        english: 'E3',
        neoLatin: 'mi',
      },
    },
  ],
  defaultNoteType: 'german',
  defaultKey: 'clef',
  gameIsOn: false,
  gameNote: null,
  gameScore: 0,
  synth: null,
  audioOn: false,
};