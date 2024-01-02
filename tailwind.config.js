/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Comfortaa', 'sans-serif'],
    },
    extend: {
      boxShadow: {
        'button': 'rgb(220, 220, 220) 0px 6px 0px',
        'button-dark': 'rgba( 0 0 0 / .3 ) 0px 6px 0px',
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["business"],
  },
}
