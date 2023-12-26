/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Comfortaa', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'button': 'rgb(235, 235, 235) 0px 6px 0px',
      },
    },
  },
  plugins: [],
}

