import { ColorPalette } from "../types/types";

export const appColors: ColorPalette = {
  background: "#FFFFFF", // White
  prompt: "#FFE3D7", // Flesh
  codeBackground: "#f8f9fa", // Light background for code
  codeForeground: "#d1d5db", // Light color for code text
  correct: "#50c2a8", // Darker version of Pale Robin Egg Blue (#9EE1D0)
  incorrect: "#ff9f7f", // Reddish color derived from Flesh (#FFE3D7)
  currentChar: "#BDEADE", // Powder Blue
  correctBg: "#e6f7f2", // Light background for correct chars
  incorrectBg: "#fff1ec", // Light background for incorrect chars
  currentBg: "#d5f2e9", // Light background for current char
};

// Derived colors
export const derivedColors = {
  promptBorder: "#FFD0BA", // Slightly darker version of Flesh
  correctHover: "#3daf93", // Slightly darker version of correct
};

export default appColors;
