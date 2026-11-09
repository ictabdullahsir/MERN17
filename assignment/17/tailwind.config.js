/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#16302b",
        pine: { 600: "#1f6f5c", 700: "#195a4b", 800: "#14473b" },
        paper: "#f5f7f6",
      },
    },
  },
  plugins: [],
};
