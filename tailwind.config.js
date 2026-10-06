/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        racing: {
          dark: '#0a120e',
          card: '#121e17',
          cardHover: '#18281f',
          border: '#1f3529',
          green: '#044229',
          lightGreen: '#008751',
          accent: '#10b981',
        },
        gold: {
          light: '#fef08a',
          DEFAULT: '#d4af37',
          dark: '#9a7b1c',
          mat: '#c5a059',
        },
        slate: {
          darker: '#090d12',
          card: '#111822',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 20px rgba(212, 175, 55, 0.25)',
        'emerald-glow': '0 0 20px rgba(16, 185, 129, 0.25)',
      }
    },
  },
  plugins: [],
}
