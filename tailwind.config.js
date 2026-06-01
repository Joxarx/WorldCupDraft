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
        // Round, heavy display face — closest free match to the FWC26 type.
        display: ['"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Archivo"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        shimmer: 'shimmer 7s linear infinite',
      },
    },
  },
  plugins: [],
}
