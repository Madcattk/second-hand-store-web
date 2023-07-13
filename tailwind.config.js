/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      colors: {
        'brown': '#31311c',
        'hover': '#EEEEEE',
        'gray': '#D8D8D8',
        'greyV1': '#9D9D9D',
      },
    },
  },
  plugins: [],
}
