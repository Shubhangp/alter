/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
      "roboto": "Roboto"
      },
      boxShadow: {
        'header': '0 4px 4px rgba(0, 0, 0, 0.25)'
      }
    },
  },
  plugins: [],
}

