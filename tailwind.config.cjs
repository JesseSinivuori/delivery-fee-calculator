/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#009de0',
        'secondary': '#000090',
        'tertiary': '#1b50e0',
      },
      fontFamily: {
        poppins: 'Poppins, sans-serif'
      },
    },

    screens: {
      xss: "350px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}
