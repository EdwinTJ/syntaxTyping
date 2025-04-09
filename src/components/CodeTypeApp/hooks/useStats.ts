import { useState, useEffect } from "react";
import { CodeExercise } from "../../../types/types";

/**
 * Calculate typing statistics
 */
const useStats = (
  completed: boolean,
  startTime: number | null,
  endTime: number | null,
  correctChars: number,
  currentExercise: CodeExercise | null
) => {
  const [wpm, setWpm] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(100);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    if (completed && startTime && endTime && currentExercise) {
      const timeInMinutes = (endTime - startTime) / 60000;
      const wordsTyped = currentExercise.code.length / 5; // Assuming 5 chars = 1 word
      const calculatedWpm = Math.round(wordsTyped / timeInMinutes);
      setWpm(calculatedWpm);

      // Calculate accuracy
      const calculatedAccuracy = currentExercise.code.length
        ? Math.round((correctChars / currentExercise.code.length) * 100)
        : 0;
      setAccuracy(calculatedAccuracy);

      setShowModal(true);
    }
  }, [completed, startTime, endTime, correctChars, currentExercise]);

  const resetStats = () => {
    setWpm(0);
    setAccuracy(100);
    setShowModal(false);
  };

  return {
    wpm,
    accuracy,
    showModal,
    setShowModal,
    resetStats,
  };
};

export default useStats;
