/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

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
      colors:{
        'sd':'#D3D3D3',
        'cblack':'#303030',
        'cblue':'#369FFF',
        'cpink':'#FB8D93',
        'cteal':'#00C6BA',
        'lpink':'#FFC9CC',
        'cardpink':'#FFDBDB',
        'dpink':'#FFE8E9',
        'dteal':'#DCFFF0',
        'dblue':'#DAF4FF',
        'dhblue':'#C5EEFF',
        'dhteal':'#C6FFE6',
        'dhpink':'#FFD1D4',
        'dshcard':'#F9F9F9',
        'qteal':'#61EEC4',
        'tsd':'#A9CDC4',
        ...colors,
      },
    },
  },
  plugins: [],
});

