export interface CodeExercise {
  prompt: string;
  code: string;
  timeLimit?: number; // Maximum time in seconds before auto-completion
  expectedTime?: number; // for scoring/rating
}

export interface ProgrammingLanguage {
  name: string;
  displayName: string;
  fileExtension: string;
  exercises: {
    [difficulty: string]: CodeExercise[];
  };
}

export interface ColorPalette {
  background: string;
  prompt: string;
  codeBackground: string;
  codeForeground: string;
  correct: string;
  incorrect: string;
  currentChar: string;
  correctBg: string;
  incorrectBg: string;
  currentBg: string;
  [key: string]: string;
}
