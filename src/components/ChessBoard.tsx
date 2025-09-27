import React from 'react';
import { GameState, Position } from '../types/chess';
import { motion } from 'framer-motion';

interface ChessBoardProps {
  gameState: GameState;
  onSquareClick: (position: Position) => void;
}

export const ChessBoard: React.FC<ChessBoardProps> = ({ gameState, onSquareClick }) => {
  const getPieceSymbol = (piece: any) => {
    if (!piece) return '';
    
    const symbols: { [key: string]: { [key: string]: string } } = {
      white: {
        king: '♔',
        queen: '♕',
        rook: '♖',
        bishop: '♗',
        knight: '♘',
        pawn: '♙'
      },
      black: {
        king: '♚',
        queen: '♛',
        rook: '♜',
        bishop: '♝',
        knight: '♞',
        pawn: '♟'
      }
    };
    
    return symbols[piece.color]?.[piece.type] || '';
  };

  const getSquareColor = (square: any) => {
    let baseColor = square.color === 'light' ? 'bg-chess-light' : 'bg-chess-dark';
    
    if (square.selected) {
      baseColor += ' ring-2 ring-blue-500 ring-opacity-75';
    }
    
    if (square.highlighted) {
      baseColor += ' ring-2 ring-yellow-400 ring-opacity-75';
    }
    
    return baseColor;
  };

  return (
    <div className="w-full max-w-sm mx-auto aspect-square grid grid-cols-8 grid-rows-8 border-2 border-gray-800">
      {gameState.board.map((row, y) =>
        row.map((square, x) => (
          <motion.div
            key={`${x}-${y}`}
            className={`${getSquareColor(square)} flex items-center justify-center cursor-pointer text-2xl select-none hover:opacity-80 transition-all duration-200`}
            onClick={() => onSquareClick(square.position)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={square.selected ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            {square.piece && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {getPieceSymbol(square.piece)}
              </motion.span>
            )}
          </motion.div>
        ))
      )}
    </div>
  );
};
