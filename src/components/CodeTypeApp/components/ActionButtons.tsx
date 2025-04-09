import { ColorPalette } from "../../../types/types";
import { derivedColors } from "../../../utils/colors";

interface ActionButtonsProps {
  colors: ColorPalette;
  onReset: () => void;
  onNext: () => void;
}

const ActionButtons = ({ colors, onReset, onNext }: ActionButtonsProps) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onReset}
        className="px-6 py-2 rounded transition-all duration-200 ease-in-out"
        style={{
          backgroundColor: colors.correct,
          color: "white",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = derivedColors.correctHover;
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = colors.correct;
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }}
      >
        Reset Exercise
      </button>

      <button
        onClick={onNext}
        className="px-6 py-2 rounded transition-all duration-200 ease-in-out"
        style={{
          backgroundColor: "#f0f0f0",
          color: "#333",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = "#e0e0e0";
          e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = "#f0f0f0";
          e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
        }}
      >
        Next Exercise
      </button>
    </div>
  );
};

export default ActionButtons;
