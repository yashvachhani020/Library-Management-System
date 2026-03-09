/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- THIS IS THE MAGIC LINE YOU NEED
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}