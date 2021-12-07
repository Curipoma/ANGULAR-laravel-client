const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  purge: {
    content: ["./src/**/*.{html,ts,css,scss,sass,less,styl}"],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          red_1_index: "#800021",
          red_3: "#b10a32",
        },
        blue: {
          blue_1_index: "#0096d7",
          blue_2: "#064c96",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
