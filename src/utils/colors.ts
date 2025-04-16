import { ColorPalette } from "../types/types";

export const appColors: ColorPalette = {
  background: "#FFFFFF", // Main app background color
  prompt: "#FFE3D7", // Exercise instruction background color
  codeBackground: "#f8f9fa", // Code display area background
  codeForeground: "#d1d5db", // Untyped code text color (characters not yet typed)
  correct: "#50c2a8", // Successfully typed character color
  incorrect: "#ff9f7f", // Incorrectly typed character color
  currentChar: "#0d0914", // Cursor/highlight color for current character to be typed
  correctBg: "#e6f7f2", // Background highlight for correctly typed characters
  incorrectBg: "#fff1ec", // Background highlight for incorrectly typed characters
  currentBg: "#42f5e6", // Background highlight for the current character position
};

// Derived colors
export const derivedColors = {
  promptBorder: "#FFD0BA", // Exercise prompt box border color
  correctHover: "#3daf93", // Button hover state for success actions
};

export default appColors;
