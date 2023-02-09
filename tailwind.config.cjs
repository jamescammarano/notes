/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Figtree"],
    },
    extend: {
      colors: {
        primary: "#587af7",
        muted: "#cbcbcb",
        foreground: "#2f2e33",
        inverted: "#fff",
        black: "#000",
      },
      borderRadius: {
        lg: "50%",
        md: ".75em",
      },
    },
  },
  plugins: [],
};
