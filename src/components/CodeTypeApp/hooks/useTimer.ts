import { useState, useEffect, useRef } from "react";
import { CodeExercise } from "../../../types/types";

/**
 * Timer functionality
 */
const useTimer = (
  completed: boolean,
  completeExerciseTimeout: () => void,
  currentExercise: CodeExercise | null
) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Use number type for interval ID
  const timerIntervalRef = useRef<number | null>(null);
  // For timeout, use the appropriate type
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = () => {
    if (!startTime) {
      setStartTime(Date.now());
    }
  };

  const stopTimer = () => {
    if (startTime && !endTime) {
      setEndTime(Date.now());
    }
  };

  const resetTimer = () => {
    if (timerIntervalRef.current !== null) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }

    setStartTime(null);
    setEndTime(null);
    setElapsedTime(0);
  };

  const getTimeRemaining = () => {
    if (!startTime || !currentExercise?.timeLimit) return 0;

    return Math.max(0, Math.ceil(currentExercise.timeLimit - elapsedTime));
  };

  // Update elapsed time continuously
  useEffect(() => {
    if (startTime && !completed) {
      timerIntervalRef.current = window.setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000; //every 100ms for smooth countdown
        setElapsedTime(elapsed);
      }, 100);

      return () => {
        if (timerIntervalRef.current !== null) {
          window.clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
        }
      };
    } else if (completed && startTime && !endTime) {
      stopTimer();

      if (timerIntervalRef.current !== null) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  }, [startTime, completed, endTime]);

  // Handle time limit
  useEffect(() => {
    // Only set up the timeout if we're actively timing and not completed
    if (startTime && !completed && currentExercise?.timeLimit) {
      timeoutIdRef.current = setTimeout(() => {
        completeExerciseTimeout();
        stopTimer();
      }, currentExercise.timeLimit * 1000);

      return () => {
        if (timeoutIdRef.current !== null) {
          clearTimeout(timeoutIdRef.current);
          timeoutIdRef.current = null;
        }
      };
    }
  }, [startTime, completed, currentExercise, completeExerciseTimeout]);

  return {
    startTime,
    endTime,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    getTimeRemaining,
  };
};

export default useTimer;
