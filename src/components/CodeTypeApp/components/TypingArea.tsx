import { ColorPalette, CodeExercise } from "../../../types/types";

interface TypingAreaProps {
  colors: ColorPalette;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  userInput: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  completed: boolean;
  startTime: number | null;
  currentExercise: CodeExercise | null;
  timeoutMessage: string;
}

const TypingArea = ({
  colors,
  inputRef,
  userInput,
  handleInputChange,
  completed,
  startTime,
  currentExercise,
  timeoutMessage,
}: TypingAreaProps) => {
  return (
    <div className="mb-6 relative">
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        className="w-full p-4 border rounded font-mono text-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          color: "transparent",
          caretColor: colors.correct,
          borderColor: completed ? colors.correct : colors.currentChar,
          boxShadow: `0 0 8px rgba(189, 234, 222, 0.3)`,
          height: `${Math.max(
            100,
            (currentExercise?.code.split("\n").length || 0) * 24
          )}px`,
        }}
        placeholder="Start typing..."
        autoFocus
        disabled={completed}
      />

      {!startTime && !completed && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 rounded cursor-pointer"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <p className="font-medium mb-2">
              Click or press any key to start typing
            </p>
            <p className="text-sm text-gray-600">
              Timer will start when you begin
            </p>
            {currentExercise?.timeLimit && (
              <p className="text-sm text-yellow-600 mt-1">
                Complete within {currentExercise.timeLimit} seconds!
              </p>
            )}
          </div>
        </div>
      )}

      {timeoutMessage && (
        <div className="mt-2 text-center text-yellow-600 font-medium">
          {timeoutMessage}
        </div>
      )}
    </div>
  );
};

export default TypingArea;
