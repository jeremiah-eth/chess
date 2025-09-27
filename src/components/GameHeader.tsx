import React from 'react';
import { GameState } from '../types/chess';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  gameState: GameState;
  onNewGame: () => void;
  onSettings: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ gameState, onNewGame, onSettings }) => {
  const getStatusText = () => {
    switch (gameState.gameStatus) {
      case 'check':
        return `Check! ${gameState.currentPlayer === 'white' ? 'White' : 'Black'} is in check`;
      case 'checkmate':
        return `Checkmate! ${gameState.currentPlayer === 'white' ? 'Black' : 'White'} wins!`;
      case 'stalemate':
        return 'Stalemate! Game is a draw';
      case 'draw':
        return 'Game is a draw';
      default:
        return `${gameState.currentPlayer === 'white' ? 'White' : 'Black'}'s turn`;
    }
  };

  const getStatusColor = () => {
    switch (gameState.gameStatus) {
      case 'check':
        return 'text-yellow-600';
      case 'checkmate':
        return 'text-red-600';
      case 'stalemate':
      case 'draw':
        return 'text-gray-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">♟️ Chess</h1>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${gameState.currentPlayer === 'white' ? 'bg-white border border-gray-400' : 'bg-gray-800'}`}></div>
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {getStatusText()}
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={onSettings}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ⚙️
          </motion.button>
          <motion.button
            onClick={onNewGame}
            className="px-4 py-2 bg-farcaster-purple text-white rounded-lg hover:bg-purple-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            New Game
          </motion.button>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Turn {gameState.turn} • {gameState.moveHistory.length} moves
      </div>
    </div>
  );
};
