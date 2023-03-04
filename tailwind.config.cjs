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
        muted: { 100: "#cbcbcb", 300: "#4F4663" },
        foreground: "#2f2e33",
        inverted: "#fff",
        background: { 100: "#1A171F", 400: "#0F0D12" },
      },
      borderRadius: {
        lg: "50%",
        md: ".75em",
      },
    },
  },
  plugins: [],
};
