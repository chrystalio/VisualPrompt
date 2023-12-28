/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ './*.html'],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Inter", "sans-serif"],
        secondary: ["Nunito", "sans-serif"],
      }
    },
  },
  plugins: [require("daisyui")],
}

