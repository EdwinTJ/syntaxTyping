import { useState, useRef, useEffect } from "react";
import { CodeExercise } from "../../../types/types";

/**
 * Manages typing state and logic
 */
const useTypingExercise = (currentExercise: CodeExercise | null) => {
  const [userInput, setUserInput] = useState<string>("");
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [correctChars, setCorrectChars] = useState<number>(0);
  const [mistakes, setMistakes] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [timeoutMessage, setTimeoutMessage] = useState<string>("");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Reset exercise state
  const resetExercise = () => {
    setUserInput("");
    setCurrentPosition(0);
    setCorrectChars(0);
    setMistakes(0);
    setCompleted(false);
    setTimeoutMessage("");

    // Focus on the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Complete the exercise forcefully (e.g., when time expires)
  const completeExerciseTimeout = () => {
    setCompleted(true);
    setTimeoutMessage("Time limit reached!");
  };

  // Handle input change when user is typing
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    if (currentExercise) {
      // Handle backspace
      if (input.length < currentPosition) {
        // Backspace was pressed, adjust the current position
        setCurrentPosition(input.length);
      } else if (
        input.length > currentPosition &&
        currentPosition < currentExercise.code.length
      ) {
        const expectedChar = currentExercise.code[currentPosition];
        const enteredChar = input[currentPosition];

        if (enteredChar === expectedChar) {
          setCorrectChars((prev) => prev + 1);
        } else {
          setMistakes((prev) => prev + 1);
        }

        setCurrentPosition(currentPosition + 1);

        if (currentPosition + 1 >= currentExercise.code.length) {
          setCompleted(true);
        }
      }
    }

    setUserInput(input);
  };

  useEffect(() => {
    if (currentExercise) {
      resetExercise();
    }
  }, [currentExercise]);

  return {
    userInput,
    currentPosition,
    correctChars,
    mistakes,
    completed,
    timeoutMessage,
    inputRef: inputRef as React.RefObject<HTMLTextAreaElement>,
    resetExercise,
    handleInputChange,
    completeExerciseTimeout,
    setTimeoutMessage,
  };
};

export default useTypingExercise;
