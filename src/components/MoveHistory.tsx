import React from 'react';
import { Move } from '../types/chess';
import { motion } from 'framer-motion';

interface MoveHistoryProps {
  moves: Move[];
  currentMoveIndex: number;
  onMoveSelect: (index: number) => void;
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ moves, currentMoveIndex, onMoveSelect }) => {
  const formatMove = (move: Move, index: number) => {
    const moveNumber = Math.floor(index / 2) + 1;
    const isWhiteMove = index % 2 === 0;
    
    if (isWhiteMove) {
      return `${moveNumber}. ${move.notation}`;
    } else {
      return `${move.notation}`;
    }
  };

  return (
    <div className="w-full bg-gray-50 border-t border-gray-200">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Move History</h3>
        <div className="max-h-32 overflow-y-auto">
          <div className="grid grid-cols-2 gap-1 text-xs">
            {moves.map((move, index) => (
              <motion.button
                key={index}
                onClick={() => onMoveSelect(index)}
                className={`p-2 text-left rounded transition-colors ${
                  index === currentMoveIndex
                    ? 'bg-farcaster-purple text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              >
                {formatMove(move, index)}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
