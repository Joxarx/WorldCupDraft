/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // FIFA World Cup 26 identity: vivid rainbow on near-black.
        wc: {
          black: '#0A0A0B',
          'black-soft': '#141417',
          ink: '#1C1C20',
          white: '#FFFFFF',
          red: '#E4002B',
          orange: '#FF6B00',
          yellow: '#FFC400',
          lime: '#A3E635',
          green: '#22C55E',
          teal: '#14B8A6',
          cyan: '#06B6D4',
          blue: '#3B82F6',
          indigo: '#6366F1',
          purple: '#A855F7',
          magenta: '#D6409F',
          pink: '#EC4899',
        },
      },
      fontFamily: {
        display: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        body: ['"Archivo"', 'Inter', 'sans-serif'],
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 25px rgba(255,255,255,0.25)' },
          '50%': { boxShadow: '0 0 55px rgba(255,255,255,0.55)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'spin-reverse': 'spin-reverse 60s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'hue-rotate': 'hue-rotate 12s linear infinite',
      },
    },
  },
  plugins: [],
}
