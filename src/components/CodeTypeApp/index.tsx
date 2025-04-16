import { useState, useEffect } from "react";
import { programmingLanguages } from "../../data/programmingLanguages";
import { CodeExercise } from "../../types/types";
import appColors from "../../utils/colors";

// Import custom hooks
import useTypingExercise from "./hooks/useTypingExercise";
import useTimer from "./hooks/useTimer";
import useStats from "./hooks/useStats";

// Import components
import Header from "./components/Header";
import ExerciseSelector from "./components/ExerciseSelector";
import ExercisePrompt from "./components/ExercisePrompt";
import CodeDisplay from "./components/CodeDisplay";
import TypingArea from "./components/TypingArea";
import TimerDisplay from "./components/TimerDisplay";
import ProgressBar from "./components/ProgressBar";
import StatsDisplay from "./components/StatsDisplay";
import ActionButtons from "./components/ActionButtons";
import { CompletionModal } from "./components/CompletionModal";

const CodeTypeApp = () => {
  // App state
  const [language, setLanguage] = useState<string>("python");
  const [difficulty, setDifficulty] = useState<string>("beginner");
  const [exercises, setExercises] = useState<CodeExercise[]>([]);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState<number>(0);
  const [currentExercise, setCurrentExercise] = useState<CodeExercise | null>(
    null
  );

  // Update exercises when language or difficulty changes
  useEffect(() => {
    if (programmingLanguages[language]?.exercises[difficulty]) {
      setExercises(programmingLanguages[language].exercises[difficulty]);
      setSelectedExerciseIndex(0);
    }
  }, [language, difficulty]);

  // Update current exercise when selected exercise changes
  useEffect(() => {
    if (exercises.length > 0) {
      setCurrentExercise(exercises[selectedExerciseIndex]);
    }
  }, [exercises, selectedExerciseIndex]);

  // Initialize custom hooks
  const {
    userInput,
    currentPosition,
    correctChars,
    mistakes,
    completed,
    timeoutMessage,
    inputRef,
    resetExercise,
    handleInputChange,
    completeExerciseTimeout,
  } = useTypingExercise(currentExercise);

  const {
    startTime,
    endTime,
    elapsedTime,
    startTimer,
    stopTimer,
    resetTimer,
    getTimeRemaining,
  } = useTimer(completed, completeExerciseTimeout, currentExercise);

  const { wpm, accuracy, showModal, setShowModal, resetStats } = useStats(
    completed,
    startTime,
    endTime,
    correctChars,
    currentExercise
  );

  // Reset everything when exercise changes
  useEffect(() => {
    if (currentExercise) {
      resetExercise();
      resetTimer();
      resetStats();
    }
  }, [currentExercise]);

  // Stop timer when exercise is completed
  useEffect(() => {
    if (completed && startTime) {
      stopTimer();
    }
  }, [completed, startTime]);

  // Handler for starting timer on first input
  const handleTypingStart = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // If this is the first input and timer hasn't started
    if (!startTime && e.target.value.length > 0) {
      startTimer();
    }

    // Call the normal input handler
    handleInputChange(e);
  };

  // Handle language change
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  // Handle difficulty change
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  // Handle exercise selection change
  const handleExerciseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedExerciseIndex(parseInt(e.target.value));
  };

  // Handle reset exercise
  const handleResetExercise = () => {
    resetExercise();
    resetTimer();
    resetStats();
  };

  // Handle next exercise
  const handleNextExercise = () => {
    // Go to next exercise if available
    if (selectedExerciseIndex < exercises.length - 1) {
      setSelectedExerciseIndex(selectedExerciseIndex + 1);
    } else {
      // If on last exercise, go to next difficulty if available
      const difficulties = Object.keys(
        programmingLanguages[language].exercises
      );
      const currentDifficultyIndex = difficulties.indexOf(difficulty);

      if (currentDifficultyIndex < difficulties.length - 1) {
        setDifficulty(difficulties[currentDifficultyIndex + 1]);
      } else {
        // If on last difficulty, go to next language if available
        const languages = Object.keys(programmingLanguages);
        const currentLanguageIndex = languages.indexOf(language);

        if (currentLanguageIndex < languages.length - 1) {
          setLanguage(languages[currentLanguageIndex + 1]);
        }
      }
    }
    setShowModal(false);
  };

  // Get the file extension for the current language
  const getFileExtension = () => {
    return programmingLanguages[language]?.fileExtension || "code";
  };

  return (
    <div
      className="mx-auto p-6 rounded-lg shadow-lg"
      style={{ backgroundColor: appColors.background }}
    >
      {/* Header */}
      <Header colors={appColors} />

      {/* Language, Difficulty and Exercise Selection */}
      <ExerciseSelector
        colors={appColors}
        programmingLanguages={programmingLanguages}
        language={language}
        difficulty={difficulty}
        selectedExerciseIndex={selectedExerciseIndex}
        exercises={exercises}
        onLanguageChange={handleLanguageChange}
        onDifficultyChange={handleDifficultyChange}
        onExerciseChange={handleExerciseChange}
      />

      {/* Exercise Prompt */}
      {currentExercise && (
        <ExercisePrompt colors={appColors} currentExercise={currentExercise} />
      )}

      {/* Code Display */}
      {currentExercise && (
        <CodeDisplay
          colors={appColors}
          currentExercise={currentExercise}
          userInput={userInput}
          currentPosition={currentPosition}
          fileExtension={getFileExtension()}
        />
      )}

      {/* Typing Area */}
      <TypingArea
        colors={appColors}
        inputRef={inputRef}
        userInput={userInput}
        handleInputChange={handleTypingStart}
        completed={completed}
        startTime={startTime}
        currentExercise={currentExercise}
        timeoutMessage={timeoutMessage}
      />

      {/* Timer Display */}
      <TimerDisplay
        colors={appColors}
        startTime={startTime}
        completed={completed}
        currentExercise={currentExercise}
        elapsedTime={elapsedTime}
        getTimeRemaining={getTimeRemaining}
      />

      {/* Progress Bar */}
      <ProgressBar
        colors={appColors}
        currentPosition={currentPosition}
        currentExercise={currentExercise}
      />

      {/* Stats */}
      <StatsDisplay
        colors={appColors}
        wpm={wpm}
        accuracy={accuracy}
        mistakes={mistakes}
      />

      {/* Action Buttons */}
      <ActionButtons
        colors={appColors}
        onReset={handleResetExercise}
        onNext={handleNextExercise}
      />

      {/* Completion Modal */}
      <CompletionModal
        isOpen={showModal}
        wpm={wpm}
        accuracy={accuracy}
        time={startTime && endTime ? (endTime - startTime) / 1000 : 0}
        expectedTime={currentExercise?.expectedTime}
        timeLimit={currentExercise?.timeLimit}
        onReset={handleResetExercise}
        onNext={handleNextExercise}
        colors={appColors}
        timeoutMessage={timeoutMessage}
      />
    </div>
  );
};

export default CodeTypeApp;
