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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Prevent default tab behavior

      // Get current cursor position
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      // Create a new input value with tab character inserted
      const newValue =
        userInput.substring(0, start) + "\t" + userInput.substring(end);

      // Create a synthetic change event
      const syntheticEvent = {
        target: {
          value: newValue,
        },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      // Call the input change handler
      handleInputChange(syntheticEvent);

      // Set new cursor position (after the tab)
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.selectionStart = start + 1;
          inputRef.current.selectionEnd = start + 1;
        }
      }, 0);
    }
  };

  return (
    <div className="mb-6 relative">
      <textarea
        ref={inputRef}
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="w-full p-4 border rounded font-mono text-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          color: "transparent", // Make the text invisible in the textarea
          caretColor: colors.correct, // Color of the cursor
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
