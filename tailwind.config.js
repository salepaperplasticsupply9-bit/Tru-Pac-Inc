/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./src/styles/**/*.css"   // 🔴 THIS LINE WAS MISSING
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A4C7D', // Deep blue
          light: '#3A6AB0',
          dark: '#1A385F',
        },
        secondary: {
          DEFAULT: '#F97316', // Vibrant orange
          light: '#FDBA74',
          dark: '#C2410C',
        },
        accent: {
          DEFAULT: '#10B981', // Emerald green
          light: '#34D399',
          dark: '#059669',
        },
        paper: '#F5F0E6',
        kraft: '#D7B899',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      }
    }
  },
  plugins: [],
};
