/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F5FA',
          100: '#E1EBF5',
          200: '#C2D7EC',
          300: '#94BCDF',
          400: '#5C9BD0',
          500: '#347CC0',
          600: '#2361A2',
          700: '#1C4E84',
          800: '#153C66',
          900: '#0B2545', // Primary Deep Navy
          950: '#07172C',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706', // Primary Warm Gold / Amber
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 20px -2px rgba(11, 37, 69, 0.08), 0 2px 6px -2px rgba(11, 37, 69, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(11, 37, 69, 0.14), 0 4px 10px -2px rgba(11, 37, 69, 0.06)',
      },
    },
  },
  plugins: [],
};
