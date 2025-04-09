import { ColorPalette } from "../../../types/types";

interface StatsDisplayProps {
  colors: ColorPalette;
  wpm: number;
  accuracy: number;
  mistakes: number;
}

const StatsDisplay = ({
  colors,
  wpm,
  accuracy,
  mistakes,
}: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div
        className="p-4 border rounded-lg text-center shadow-sm"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h3 className="font-medium text-gray-600">WPM</h3>
        <p className="text-2xl font-bold" style={{ color: colors.correct }}>
          {wpm}
        </p>
      </div>
      <div
        className="p-4 border rounded-lg text-center shadow-sm"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h3 className="font-medium text-gray-600">Accuracy</h3>
        <p
          className="text-2xl font-bold"
          style={{ color: accuracy > 80 ? colors.correct : colors.incorrect }}
        >
          {accuracy}%
        </p>
      </div>
      <div
        className="p-4 border rounded-lg text-center shadow-sm"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <h3 className="font-medium text-gray-600">Mistakes</h3>
        <p
          className="text-2xl font-bold"
          style={{ color: mistakes > 5 ? colors.incorrect : colors.correct }}
        >
          {mistakes}
        </p>
      </div>
    </div>
  );
};

export default StatsDisplay;
