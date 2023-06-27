const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-phone-input-2/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...fontFamily.sans],
    },
    extend: {
      colors: {
        'coal': '#414A47',
        'cloud': '#FAFAFA',
        'cotton': '#EDEEEA',
        'turquoise-dark': '#DADBC9',
        'turquoise': '#DAE2E0',
        'orange': '#B14F19',
        'transparent': 'transparent',
        'warning': '#e45d12',
        'success': 'hsl(141, 71%, 48%)',
      },
    },
  },
  plugins: [],
};
