import { ColorPalette, CodeExercise } from "../../../types/types";
import { derivedColors } from "../../../utils/colors";

interface ExercisePromptProps {
  colors: ColorPalette;
  currentExercise: CodeExercise;
}

const ExercisePrompt = ({ colors, currentExercise }: ExercisePromptProps) => {
  return (
    <div
      className="mb-6 p-5 rounded-lg shadow-sm"
      style={{
        backgroundColor: colors.prompt,
        borderLeft: `4px solid ${derivedColors.promptBorder}`,
      }}
    >
      <div className="flex items-center mb-2">
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
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h2 className="text-xl font-medium text-gray-800">Task</h2>
      </div>
      <p className="text-gray-700">{currentExercise.prompt}</p>

      {/* Add time limit display */}
      {currentExercise.timeLimit && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Time limit:</span>{" "}
          {currentExercise.timeLimit} seconds
        </div>
      )}

      {/* Add expected time display */}
      {currentExercise.expectedTime && (
        <div className="text-sm text-gray-600">
          <span className="font-medium">Expected time:</span>{" "}
          {currentExercise.expectedTime} seconds
        </div>
      )}
    </div>
  );
};

export default ExercisePrompt;
