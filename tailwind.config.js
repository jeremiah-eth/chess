/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'chess-light': '#ffce9e',
        'chess-dark': '#d18b47',
        'farcaster-purple': '#8B5CF6',
        'farcaster-blue': '#3B82F6',
      },
      animation: {
        'piece-move': 'pieceMove 0.3s ease-in-out',
        'board-flip': 'boardFlip 0.5s ease-in-out',
      },
      keyframes: {
        pieceMove: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        boardFlip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        }
      }
    },
  },
  plugins: [],
}
