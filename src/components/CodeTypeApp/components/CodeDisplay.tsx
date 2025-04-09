import { ColorPalette, CodeExercise } from "../../../types/types";

interface CodeDisplayProps {
  colors: ColorPalette;
  currentExercise: CodeExercise | null;
  userInput: string;
  currentPosition: number;
  fileExtension: string;
}

const CodeDisplay = ({
  colors,
  currentExercise,
  userInput,
  currentPosition,
  fileExtension,
}: CodeDisplayProps) => {
  if (!currentExercise) return null;

  const renderCodeWithHighlighting = () => {
    return (
      <div
        className="font-mono text-lg p-4 rounded border"
        style={{ backgroundColor: colors.codeBackground }}
      >
        {currentExercise.code.split("").map((char, index) => {
          const style = {
            color: colors.codeForeground, // Default light color
            backgroundColor: "transparent",
            transition: "all 0.15s ease-in-out",
            borderRadius: "2px",
            padding: "1px 0",
            borderBottom: "none",
            fontWeight: "normal",
          };

          if (index < currentPosition) {
            // Character has been typed
            if (userInput[index] === char) {
              style.color = colors.correct; // Darker color for correct
              style.backgroundColor = colors.correctBg;
            } else {
              style.color = colors.incorrect; // Darker color for incorrect
              style.backgroundColor = colors.incorrectBg;
            }
          } else if (index === currentPosition) {
            // Current character to type
            style.color = "#222"; // Darker color for current
            style.backgroundColor = colors.currentBg;
            style.borderBottom = `2px solid ${colors.currentChar}`;
            style.fontWeight = "bold";
          }

          // Handle newlines
          if (char === "\n") {
            return (
              <span key={index} style={style} className="block h-6 mb-1">
                ↵
              </span>
            );
          }

          // Handle spaces
          if (char === " ") {
            return (
              <span key={index} style={style} className="inline-block w-4">
                &nbsp;
              </span>
            );
          }

          return (
            <span key={index} style={style}>
              {char}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-3">
        <svg
          className="h-5 w-5 mr-2 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
        <h2 className="text-xl font-medium text-gray-800">Code</h2>
      </div>
      <div className="rounded-lg overflow-hidden shadow-md">
        {/* Code Header - simulating an editor */}
        <div className="bg-gray-800 text-white px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs text-gray-400">{fileExtension || "code"}</div>
        </div>
        {renderCodeWithHighlighting()}
        <div className="bg-gray-100 px-4 py-2 text-xs text-gray-500 border-t">
          Line count: {currentExercise.code.split("\n").length} • Character
          count: {currentExercise.code.length}
        </div>
      </div>
    </div>
  );
};

export default CodeDisplay;
