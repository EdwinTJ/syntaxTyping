import { ColorPalette, ProgrammingLanguage } from "../../../types/types";

interface ExerciseSelectorProps {
  colors: ColorPalette;
  programmingLanguages: { [key: string]: ProgrammingLanguage };
  language: string;
  difficulty: string;
  selectedExerciseIndex: number;
  exercises: any[];
  onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDifficultyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onExerciseChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ExerciseSelector = ({
  colors,
  programmingLanguages,
  language,
  difficulty,
  selectedExerciseIndex,
  exercises,
  onLanguageChange,
  onDifficultyChange,
  onExerciseChange,
}: ExerciseSelectorProps) => {
  const selectStyles = {
    backgroundColor: colors.prompt,
    borderColor: colors.correctBg,
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Language Selection */}
      <div className="w-full">
        <label className="block mb-2 font-medium text-gray-700">Language</label>
        <div className="relative">
          <select
            value={language}
            onChange={onLanguageChange}
            className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
            style={selectStyles}
          >
            {Object.keys(programmingLanguages).map((lang) => (
              <option key={lang} value={lang}>
                {programmingLanguages[lang].displayName}
              </option>
            ))}
          </select>
          <DropdownArrow />
        </div>
      </div>

      {/* Difficulty Selection */}
      <div className="w-full">
        <label className="block mb-2 font-medium text-gray-700">
          Difficulty Level
        </label>
        <div className="relative">
          <select
            value={difficulty}
            onChange={onDifficultyChange}
            className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
            style={selectStyles}
          >
            {programmingLanguages[language] &&
              Object.keys(programmingLanguages[language].exercises).map(
                (diff) => (
                  <option key={diff} value={diff}>
                    {diff.charAt(0).toUpperCase() + diff.slice(1)}
                  </option>
                )
              )}
          </select>
          <DropdownArrow />
        </div>
      </div>

      {/* Exercise Selection */}
      <div className="w-full">
        <label className="block mb-2 font-medium text-gray-700">Exercise</label>
        <div className="relative">
          <select
            value={selectedExerciseIndex}
            onChange={onExerciseChange}
            className="w-full p-3 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200"
            style={selectStyles}
          >
            {exercises.map((exercise, index) => (
              <option key={index} value={index}>
                {exercise.prompt}
              </option>
            ))}
          </select>
          <DropdownArrow />
        </div>
      </div>
    </div>
  );
};

// Helper component for dropdown arrows
const DropdownArrow = () => (
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg
      className="h-5 w-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </div>
);

export default ExerciseSelector;
