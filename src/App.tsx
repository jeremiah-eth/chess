import React, { useState, useCallback } from 'react';
import { GameEngine } from './chess/GameEngine';
import { GameState, Position } from './types/chess';
import { ChessBoard } from './components/ChessBoard';
import { GameHeader } from './components/GameHeader';
import { MoveHistory } from './components/MoveHistory';
import { PromotionModal } from './components/PromotionModal';
import { SocialFeatures } from './components/SocialFeatures';
import { motion } from 'framer-motion';

function App() {
  const [gameEngine] = useState(() => new GameEngine());
  const [gameState, setGameState] = useState<GameState>(gameEngine.getGameState());
  const [showPromotion, setShowPromotion] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(-1);

  const handleStateChange = useCallback((newState: GameState) => {
    setGameState(newState);
    
    // Check if promotion is needed
    if (newState.selectedSquare) {
      const square = newState.board[newState.selectedSquare.y - 1][newState.selectedSquare.x - 1];
      if (square.piece?.type === 'pawn' && 
          ((square.piece.color === 'white' && newState.selectedSquare.y === 1) ||
           (square.piece.color === 'black' && newState.selectedSquare.y === 8))) {
        setShowPromotion(true);
      }
    }
  }, []);

  React.useEffect(() => {
    gameEngine['onStateChange'] = handleStateChange;
  }, [gameEngine, handleStateChange]);

  const handleSquareClick = useCallback((position: Position) => {
    const success = gameEngine.selectSquare(position);
    if (success) {
      setCurrentMoveIndex(gameState.moveHistory.length);
    }
  }, [gameEngine, gameState.moveHistory.length]);

  const handlePromote = useCallback((pieceType: 'queen' | 'castle' | 'bishop' | 'knight') => {
    gameEngine.promotePawn(pieceType);
    setShowPromotion(false);
  }, [gameEngine]);

  const handleNewGame = useCallback(() => {
    // Reset game engine
    const newEngine = new GameEngine(handleStateChange);
    setGameState(newEngine.getGameState());
    setCurrentMoveIndex(-1);
    setShowPromotion(false);
  }, [handleStateChange]);

  const handleSettings = useCallback(() => {
    // TODO: Implement settings modal
    console.log('Settings clicked');
  }, []);

  const handleMoveSelect = useCallback((index: number) => {
    setCurrentMoveIndex(index);
    // TODO: Implement move navigation
    console.log('Move selected:', index);
  }, []);


  const gameId = 'chess-game-123'; // In a real app, this would be dynamic
  const lastMove = gameState.moveHistory[gameState.moveHistory.length - 1];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <GameHeader 
        gameState={gameState}
        onNewGame={handleNewGame}
        onSettings={handleSettings}
      />
      
      {/* Social Features */}
      <SocialFeatures 
        gameId={gameId}
        currentMove={lastMove}
      />
      
      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm"
        >
          <ChessBoard 
            gameState={gameState}
            onSquareClick={handleSquareClick}
          />
        </motion.div>
        
        {/* Game Status */}
        {gameState.gameStatus !== 'playing' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-4 bg-white rounded-lg shadow-lg"
          >
            <h2 className="text-lg font-semibold text-gray-800">
              {gameState.gameStatus === 'checkmate' && '🏆 Checkmate!'}
              {gameState.gameStatus === 'stalemate' && '🤝 Stalemate!'}
              {gameState.gameStatus === 'draw' && '🤝 Draw!'}
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              {gameState.gameStatus === 'checkmate' && 'Game Over'}
              {gameState.gameStatus === 'stalemate' && 'No legal moves available'}
              {gameState.gameStatus === 'draw' && 'Game ended in a draw'}
            </p>
          </motion.div>
        )}
      </div>
      
      {/* Move History */}
      {gameState.moveHistory.length > 0 && (
        <MoveHistory 
          moves={gameState.moveHistory}
          currentMoveIndex={currentMoveIndex}
          onMoveSelect={handleMoveSelect}
        />
      )}
      
      {/* Promotion Modal */}
      <PromotionModal 
        isOpen={showPromotion}
        playerColor={gameState.currentPlayer}
        onPromote={handlePromote}
      />
    </div>
  );
}

export default App;
