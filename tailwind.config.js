/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'furia-black': '#000000',
        'furia-white': '#ffffff',
        'furia-gray': '#1A1A1A',
        'furia-dark': '#0A0A0A',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
      },
      backgroundImage: {
        'furia-pattern': "url('/src/assets/pattern.png')",
        'cs-map': "url('https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg')",
      },
    },
  },
  plugins: [],
};