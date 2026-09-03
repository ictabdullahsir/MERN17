/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ostad: {
          yellow: "#FFC72C",
          dark: "#111111",
        },
      },
      fontFamily: {
        sans: ["Hind Siliguri", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
