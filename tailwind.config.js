/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1036BA",
        primaryHover: "#629900",
        secondary: "#C1FF00",
        terciary: "#34C759",
        tinted: "#CED9FF",
        border: "#ccc",
        texts: "#333d4f",
        white: "#EDEBF5",
        black: "#0A0D27",
        lightGray: "#FAFAFA",
        gray: "#B5B5B5",
        darkGray: "#767676",
        danger: "#cf0404",
        success: "#3acc15",
      },
    },
  },
  plugins: [],
};
