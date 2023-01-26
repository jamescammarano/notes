/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      primary: "#1495F7",
      muted: "#cbcbcb",
      foreground: "#2f2e33",
      inverted: "#fff",
    },
    fontFamily: {
      sans: ["Varela Round"],
    },
    extend: {
      borderRadius: {
        lg: "50%",
        md: ".75em",
      },
    },
  },
  plugins: [],
};
