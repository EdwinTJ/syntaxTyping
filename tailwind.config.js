/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        flesh: "#FFE3D7",
        "flesh-dark": "#FFD0BA",
        cornsilk: "#FBFDDB",
        "cornsilk-dark": "#F0F2C0",
        "powder-blue": "#BDEADE",
        "powder-blue-dark": "#A0D0C0",
        "pale-robin-egg": "#9EE1D0",
        "pale-robin-egg-dark": "#50C2A8",
        "code-light": "#d1d5db",
        "code-dark": "#374151",
        "code-bg": "#f8f9fa",
        "correct-bg": "#e6f7f2",
        "incorrect-bg": "#fff1ec",
        "current-bg": "#d5f2e9",
        "correct-text": "#50c2a8",
        "incorrect-text": "#ff9f7f",
      },
      fontFamily: {
        mono: ['"Fira Code"', '"JetBrains Mono"', "Consolas", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
