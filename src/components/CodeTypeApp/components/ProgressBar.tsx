import { ColorPalette, CodeExercise } from "../../../types/types";

interface ProgressBarProps {
  colors: ColorPalette;
  currentPosition: number;
  currentExercise: CodeExercise | null;
}

const ProgressBar = ({
  colors,
  currentPosition,
  currentExercise,
}: ProgressBarProps) => {
  // Calculate percentage of progress
  const progressPercentage = currentExercise
    ? Math.round((currentPosition / currentExercise.code.length) * 100)
    : 0;

  return (
    <div className="mb-6">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            backgroundColor: colors.correct,
            width: `${progressPercentage}%`,
          }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-600 flex justify-between">
        <div>
          {currentPosition} / {currentExercise?.code.length || 0} characters
        </div>
        <div>{progressPercentage}% completed</div>
      </div>
    </div>
  );
};

export default ProgressBar;
