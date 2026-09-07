/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F7F6',
          100: '#e1e8e6',
          200: '#c4d2ce',
          300: '#99b3ab',
          400: '#648b80',
          500: '#164954', // Lighter Teal / Secondary
          600: '#103942',
          700: '#0D333C', // Deep Teal / Primary
          800: '#102A30', // Dark Text
          900: '#0B272E',
          950: '#06171B',
        },
        gold: {
          300: '#e6c875',
          400: '#d9b65e',
          500: '#C9A84E', // Luxury Gold Accent
          600: '#ab8b39',
          700: '#876c29',
        },
        deepTeal: '#0D333C',
        lighterTeal: '#164954',
        luxuryGold: '#C9A84E',
        darkText: '#102A30',
        lightBg: '#F5F7F6',
        teal: {
          500: '#164954',
          600: '#0D333C',
        },
        dark: {
          900: '#102A30',
          800: '#0D333C',
          700: '#164954',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(13, 51, 60, 0.08)',
        'glow': '0 0 25px rgba(201, 168, 78, 0.25)',
        'gold': '0 4px 20px 0 rgba(201, 168, 78, 0.3)',
      }
    },
  },
  plugins: [],
}
