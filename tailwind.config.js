/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Comfortaa', 'sans-serif'],
      mono: ['Inconsolata', 'monospace']
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['business']
  }
}
