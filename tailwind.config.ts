import { colors } from "tailwindcss/colors";

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      font: colors.coolGray800,
      primary: colors.red700,
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
