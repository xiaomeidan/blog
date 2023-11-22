/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderWidth: {
        40: '40px'
      },
      fontSize: {
        '22xl': '22rem'
      }
    }
  },
  plugins: [],
  darkMode: 'class' // or 'media' or 'class',
};
