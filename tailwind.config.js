/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3effb',
          100: '#e7dff6',
          200: '#d0bfee',
          300: '#b89fe5',
          400: '#a17fdb',
          500: '#8a5fd2',
          600: '#7344c9',
          700: '#5A189A', // Main primary
          800: '#4c167f',
          900: '#3d1265',
        },
        secondary: {
          50: '#e7f5f4',
          100: '#ceebe9',
          200: '#9dd7d3',
          300: '#6dc3bd',
          400: '#3cafA7',
          500: '#2A9D8F', // Main secondary
          600: '#258a7e',
          700: '#1f7268',
          800: '#195a52',
          900: '#13433c',
        },
        accent: {
          50: '#fcedef',
          100: '#f9dbde',
          200: '#f3b7bd',
          300: '#ee939c',
          400: '#e86f7b',
          500: '#E63946', // Main accent
          600: '#d12435',
          700: '#ae1e2c',
          800: '#8b1923',
          900: '#68131a',
        },
        dark: {
          100: '#d5d5d5',
          200: '#ababab',
          300: '#808080',
          400: '#565656',
          500: '#2c2c2c',
          600: '#232323',
          700: '#1a1a1a',
          800: '#121212',
          900: '#090909',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui'],
        serif: ['"Merriweather"', 'ui-serif', 'Georgia'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
