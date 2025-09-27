import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromotionModalProps {
  isOpen: boolean;
  playerColor: 'white' | 'black';
  onPromote: (pieceType: 'queen' | 'castle' | 'bishop' | 'knight') => void;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ isOpen, playerColor, onPromote }) => {
  const pieces = [
    { type: 'queen' as const, symbol: playerColor === 'white' ? '♕' : '♛', name: 'Queen' },
    { type: 'castle' as const, symbol: playerColor === 'white' ? '♖' : '♜', name: 'Rook' },
    { type: 'bishop' as const, symbol: playerColor === 'white' ? '♗' : '♝', name: 'Bishop' },
    { type: 'knight' as const, symbol: playerColor === 'white' ? '♘' : '♞', name: 'Knight' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full mx-4"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Promote Pawn
            </h3>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Choose a piece to promote your pawn to:
            </p>
            
            <div className="grid grid-cols-2 gap-3">
              {pieces.map((piece, index) => (
                <motion.button
                  key={piece.type}
                  onClick={() => onPromote(piece.type)}
                  className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-lg hover:border-farcaster-purple hover:bg-purple-50 transition-all duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <span className="text-3xl mb-2">{piece.symbol}</span>
                  <span className="text-sm font-medium text-gray-700">{piece.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
