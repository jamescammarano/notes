/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Figtree"],
    },
    extend: {
      colors: {
        primary: "#864DFF",
        muted: "#cbcbcb",
        foreground: "#2f2e33",
        inverted: "#fff",
        background: "#1A171F",
      },
      borderRadius: {
        lg: "50%",
        md: ".75em",
      },
    },
  },
  plugins: [],
};
