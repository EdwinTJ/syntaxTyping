import { ColorPalette } from "../../../types/types";

interface CompletionModalProps {
  isOpen: boolean;
  wpm: number;
  accuracy: number;
  time: number;
  expectedTime?: number;
  timeLimit?: number;
  onReset: () => void;
  onNext: () => void;
  colors: ColorPalette;
  timeoutMessage?: string;
}

export const CompletionModal = ({
  isOpen,
  wpm,
  accuracy,
  time,
  expectedTime,
  timeLimit,
  onReset,
  onNext,
  colors,
  timeoutMessage,
}: CompletionModalProps) => {
  if (!isOpen) return null;

  // Calculate score or rating based on expected time and actual time
  const getPerformanceRating = (): {
    rating: string;
    color: string;
    message: string;
  } => {
    if (!expectedTime) {
      return {
        rating: "Good Job!",
        color: colors.correct,
        message: "You completed the exercise successfully.",
      };
    }

    const timeRatio = time / expectedTime;

    if (timeoutMessage) {
      return {
        rating: "Time Exceeded",
        color: colors.incorrect,
        message: "You didn't complete the exercise within the time limit.",
      };
    } else if (timeRatio <= 0.75) {
      return {
        rating: "Exceptional!",
        color: colors.correct,
        message: "You were much faster than expected. Amazing work!",
      };
    } else if (timeRatio <= 1.0) {
      return {
        rating: "Great!",
        color: colors.correct,
        message: "You completed within the expected time. Well done!",
      };
    } else if (timeRatio <= 1.5) {
      return {
        rating: "Good",
        color: "#3d85c6", // Blue
        message: "You were a bit slower than expected, but still good.",
      };
    } else {
      return {
        rating: "Keep Practicing",
        color: "#e69138", // Orange
        message: "With more practice, you'll improve your speed.",
      };
    }
  };

  const performance = getPerformanceRating();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center mb-6">
          <h2
            className="text-3xl font-bold mb-2"
            style={{ color: performance.color }}
          >
            {performance.rating}
          </h2>
          <p className="text-gray-600">{performance.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm mb-1">Words Per Minute</div>
            <div
              className="text-3xl font-bold"
              style={{ color: colors.correct }}
            >
              {wpm}
            </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <div className="text-gray-500 text-sm mb-1">Accuracy</div>
            <div
              className="text-3xl font-bold"
              style={{
                color: accuracy > 80 ? colors.correct : colors.incorrect,
              }}
            >
              {accuracy}%
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex justify-between mb-1">
              <span className="text-gray-500 text-sm">Time Taken:</span>
              <span className="text-gray-700 font-medium">
                {time.toFixed(1)}s
              </span>
            </div>

            {expectedTime && (
              <div className="flex justify-between mb-1">
                <span className="text-gray-500 text-sm">Expected Time:</span>
                <span className="text-gray-700 font-medium">
                  {expectedTime}s
                </span>
              </div>
            )}

            {timeLimit && (
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">Time Limit:</span>
                <span className="text-gray-700 font-medium">{timeLimit}s</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onReset}
            className="flex-1 py-2 px-4 rounded transition-all duration-200"
            style={{
              backgroundColor: "#f0f0f0",
              color: "#333",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            Try Again
          </button>

          <button
            onClick={onNext}
            className="flex-1 py-2 px-4 rounded transition-all duration-200"
            style={{
              backgroundColor: colors.correct,
              color: "white",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#3daf93"; // Slightly darker
              e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = colors.correct;
              e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
            }}
          >
            Next Exercise
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;
