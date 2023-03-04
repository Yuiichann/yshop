/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      height: {
        'header-mobile': '76px',
        'header-desktop': '130px',
      },
      fontFamily: {
        roboto: 'Roboto, san-serif',
      },
      fontSize: {
        14: '14px',
        16: '16px',
        18: '18px',
        24: '24px',
        32: '32px',
        48: '48px',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
        },
        center: true,
      },
      colors: {
        primary: '#fa6e4f',
        'main-color': 'rgba(17,17,17,.85)',
        'sub-color': 'rgba(102,102,102,.85)',
      },

      backgroundImage: {
        blur: 'linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.05))',
      },

      keyframes: {
        goto: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'top-to-bot': {
          '0%': { transform: 'translateY(-100%)', opacity: 0.3 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'go-out': {
          '100%': { transform: 'translateY(0)', opacity: 1 },
          '0%': { transform: 'translateY(-100%)', opacity: 0.3 },
        },
      },

      animation: {
        goto: 'goto ease-in .2s',
        'top-to-bot': 'top-to-bot ease-in-out .2s',
        'go-out': 'go-out ease-in-out .2s',
      },
    },
  },

  plugins: [require('tailwind-scrollbar'), require('@tailwindcss/line-clamp')],
};
