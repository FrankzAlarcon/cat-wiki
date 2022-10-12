/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#291507',
      },
      fontFamily: {
        'mystery': ['Mystery Quest', 'cursive'],
      },
      backgroundImage: {
        'hero-sm': "url(/img/HeroImagesm.png)",
        'hero-md': "url(/img/HeroImagemd.png)",
        'hero-lg': "url(/img/HeroImagelg.png)"
      }
    },
  },
  plugins: [],
}
