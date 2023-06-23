/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textTransform: {
        'default': 'none',
      },
      fontFamily: {
        'sans': ['ProductSans Regular', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
});

