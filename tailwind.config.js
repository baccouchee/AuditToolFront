module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      minWidth: {
        0: '0',
        '1/5': '20%',
        '1/4': '25%',
        '1/2': '50%',
        '3/4': '75%',
        full: '100%',
      },
      minHeight: {
        '82vh': '82vh',
        '90vh': '90vh',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
      },
      colors: {
        'navy-400': 'rgba(48,53,114,0.7)',
        navy: 'rgb(28,33,94)',
        'navy-600': 'rgba(08,13,74)',
        main: 'rgb(246, 229, 26)',
        'main-600': 'rgb(204, 187, 8)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
