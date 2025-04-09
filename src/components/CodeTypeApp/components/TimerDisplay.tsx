import { ColorPalette, CodeExercise } from "../../../types/types";

interface TimerDisplayProps {
  colors: ColorPalette;
  startTime: number | null;
  completed: boolean;
  currentExercise: CodeExercise | null;
  elapsedTime: number;
  getTimeRemaining: () => number;
}

const TimerDisplay = ({
  colors,
  startTime,
  completed,
  currentExercise,
  elapsedTime,
  getTimeRemaining,
}: TimerDisplayProps) => {
  // Don't render if timer hasn't started
  if (!startTime || completed) return null;

  return (
    <div className="mb-6 space-y-2">
      {currentExercise?.timeLimit && (
        <div className="text-center">
          <p className="text-sm font-medium text-gray-700">
            Time Remaining:
            <span
              className="ml-1 font-bold"
              style={{
                color:
                  getTimeRemaining() < 10 ? colors.incorrect : colors.correct,
              }}
            >
              {getTimeRemaining()} seconds
            </span>
          </p>
        </div>
      )}

      {/* Elapsed time display */}
      <div className="text-center">
        <p className="text-sm font-medium text-gray-700">
          Time Elapsed:
          <span className="ml-1 font-bold text-gray-800">
            {Math.floor(elapsedTime)} seconds
          </span>
        </p>
      </div>
    </div>
  );
};

export default TimerDisplay;
