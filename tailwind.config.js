/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--theme-background-normal)",
        secondary: "var(--theme-color-normal)",
        background: "var(--theme-background-ultralight)",
      },
    },
  },
  plugins: [],
};
