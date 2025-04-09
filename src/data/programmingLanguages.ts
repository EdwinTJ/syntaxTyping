import { ProgrammingLanguage } from "../types/types";
export const programmingLanguages: { [key: string]: ProgrammingLanguage } = {
  python: {
    name: "python",
    displayName: "Python",
    fileExtension: "py",
    exercises: {
      beginner: [
        {
          prompt: "Print 'Hello, World!'",
          code: "print('Hello, World!')",
          timeLimit: 30,
          expectedTime: 10,
        },
        {
          prompt: "Define a variable and print it",
          code: "x = 10\nprint(x)",
          timeLimit: 40,
          expectedTime: 15,
        },
        {
          prompt: "Basic if statement",
          code: "if 5 > 2:\n  print('Five is greater than two!')",
          timeLimit: 60,
          expectedTime: 25,
        },
      ],
      intermediate: [
        {
          prompt: "Define a function",
          code: "def greet(name):\n  print('Hello, ' + name)",
          timeLimit: 60,
          expectedTime: 30,
        },
        {
          prompt: "Use a for loop",
          code: "for i in range(5):\n  print(i)",
          timeLimit: 60,
          expectedTime: 30,
        },
        {
          prompt: "Create a list and access elements",
          code: "my_list = [1, 2, 3]\nprint(my_list[0])",
          timeLimit: 60,
          expectedTime: 25,
        },
      ],
      advanced: [
        {
          prompt: "Use list comprehension",
          code: "squares = [x**2 for x in range(10)]",
          timeLimit: 90,
          expectedTime: 45,
        },
        {
          prompt: "Handle exceptions with try-except",
          code: "try:\n  result = 10 / 0\nexcept ZeroDivisionError:\n  print('Cannot divide by zero')",
          timeLimit: 120,
          expectedTime: 60,
        },
        {
          prompt: "Read from a file",
          code: "with open('file.txt', 'r') as f:\n  content = f.read()",
          timeLimit: 90,
          expectedTime: 40,
        },
      ],
    },
  },
  javascript: {
    name: "javascript",
    displayName: "JavaScript",
    fileExtension: "js",
    exercises: {
      beginner: [
        {
          prompt: "Print 'Hello, World!'",
          code: "console.log('Hello, World!');",
          timeLimit: 30,
          expectedTime: 10,
        },
        {
          prompt: "Define a variable and print it",
          code: "const x = 10;\nconsole.log(x);",
          timeLimit: 40,
          expectedTime: 15,
        },
        {
          prompt: "Basic if statement",
          code: "if (5 > 2) {\n  console.log('Five is greater than two!');\n}",
          timeLimit: 60,
          expectedTime: 25,
        },
      ],
      intermediate: [
        {
          prompt: "Define a function",
          code: "function greet(name) {\n  console.log('Hello, ' + name);\n}",
          timeLimit: 60,
          expectedTime: 30,
        },
        {
          prompt: "Use a for loop",
          code: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
          timeLimit: 60,
          expectedTime: 30,
        },
        {
          prompt: "Create an array and access elements",
          code: "const myArray = [1, 2, 3];\nconsole.log(myArray[0]);",
          timeLimit: 60,
          expectedTime: 25,
        },
      ],
      advanced: [
        {
          prompt: "Use array map method",
          code: "const numbers = [1, 2, 3, 4, 5];\nconst squares = numbers.map(x => x * x);",
          timeLimit: 90,
          expectedTime: 45,
        },
        {
          prompt: "Handle errors with try-catch",
          code: "try {\n  const result = 10 / 0;\n  console.log(result);\n} catch (error) {\n  console.error('Cannot divide by zero');\n}",
          timeLimit: 120,
          expectedTime: 60,
        },
        {
          prompt: "Read JSON data",
          code: "fetch('data.json')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));",
          timeLimit: 120,
          expectedTime: 60,
        },
      ],
    },
  },
};
