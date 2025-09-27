import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFarcaster } from '../hooks/useFarcaster';
import { Move } from '../types/chess';

interface SocialFeaturesProps {
  gameId: string;
  currentMove?: Move;
}

export const SocialFeatures: React.FC<SocialFeaturesProps> = ({ 
  gameId, 
  currentMove
}) => {
  const { user, castMove, showNotification, challengeUser } = useFarcaster();
  const [isCasting, setIsCasting] = useState(false);

  const handleCastMove = async () => {
    if (!currentMove) return;
    
    setIsCasting(true);
    try {
      const result = await castMove(currentMove.notation, gameId);
      if (result.success) {
        await showNotification('Move Casted!', `Your move ${currentMove.notation} has been shared`);
      }
    } catch (error) {
      console.error('Failed to cast move:', error);
    } finally {
      setIsCasting(false);
    }
  };

  const handleChallenge = async () => {
    try {
      const result = await challengeUser(0, `https://chess.farcaster.xyz/game/${gameId}`);
      if (result.success) {
        await showNotification('Challenge Sent!', 'Your chess challenge has been shared');
      }
    } catch (error) {
      console.error('Failed to send challenge:', error);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-farcaster-purple to-farcaster-blue text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-farcaster-purple text-sm">♟️</span>
          </div>
          <div>
            <h3 className="font-semibold">Social Chess</h3>
            <p className="text-xs opacity-90">
              {user ? `Playing as ${user.displayName}` : 'Connect to Farcaster'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {currentMove && (
            <motion.button
              onClick={handleCastMove}
              disabled={isCasting}
              className="px-3 py-1 bg-white text-farcaster-purple rounded-full text-xs font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isCasting ? 'Casting...' : 'Cast Move'}
            </motion.button>
          )}
          
          <motion.button
            onClick={handleChallenge}
            className="px-3 py-1 bg-white text-farcaster-purple rounded-full text-xs font-medium hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Challenge
          </motion.button>
        </div>
      </div>
      
      {currentMove && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 p-2 bg-white bg-opacity-20 rounded-lg"
        >
          <p className="text-xs">
            Last move: <span className="font-mono font-semibold">{currentMove.notation}</span>
            {currentMove.isCheck && <span className="ml-2 text-yellow-300">⚠️ Check!</span>}
            {currentMove.isCheckmate && <span className="ml-2 text-red-300">🏆 Checkmate!</span>}
          </p>
        </motion.div>
      )}
    </div>
  );
};
