/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
    './src/**/*.{svelte,js,ts}',
  ],
  theme: {
    fontFamily: {
      imperial: ['"Imperial Script"', 'cursive'],
      montserrat: ['"Montserrat"', 'sans-serif'],
      workSans: ['"Work Sans"', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

