import { ChessPiece } from '../Piece';
import { Square, MoveResult, Piece, Position } from '../../types/chess';

export class Pawn extends ChessPiece {
  constructor(color: 'white' | 'black', position: Position, id?: string) {
    super('pawn', color, position, id);
  }

  isValidMove(toSquare: Square, gameState: { board: Square[][]; pieces: Piece[]; currentPlayer: 'white' | 'black' }): MoveResult {
    const { board, currentPlayer } = gameState;
    const from = this.position;
    const to = toSquare.position;
    
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const direction = this.color === 'white' ? -1 : 1;
    
    // Check if it's the pawn's turn
    if (this.color !== currentPlayer) {
      return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
    }

    // Forward move (1 square)
    if (dx === 0 && dy === direction && !toSquare.piece) {
      const isPromotion = (this.color === 'white' && to.y === 1) || (this.color === 'black' && to.y === 8);
      return {
        valid: true,
        capture: null,
        promotion: isPromotion,
        castling: false,
        enPassant: false,
        check: false,
        checkmate: false
      };
    }

    // Forward move (2 squares from starting position)
    const startingRank = this.color === 'white' ? 7 : 2;
    if (dx === 0 && dy === direction * 2 && from.y === startingRank && !toSquare.piece) {
      // Check if path is clear
      const intermediateSquare = board[from.y + direction - 1][from.x - 1];
      if (!intermediateSquare.piece) {
        this.advancedTwo = gameState.pieces.length; // Track for en passant
        return {
          valid: true,
          capture: null,
          promotion: false,
          castling: false,
          enPassant: false,
          check: false,
          checkmate: false
        };
      }
    }

    // Diagonal capture
    if (Math.abs(dx) === 1 && dy === direction && toSquare.piece && toSquare.piece.color !== this.color) {
      const isPromotion = (this.color === 'white' && to.y === 1) || (this.color === 'black' && to.y === 8);
      return {
        valid: true,
        capture: toSquare,
        promotion: isPromotion,
        castling: false,
        enPassant: false,
        check: false,
        checkmate: false
      };
    }

    // En passant capture
    if (Math.abs(dx) === 1 && dy === direction && !toSquare.piece) {
      const enPassantSquare = board[from.y - 1][to.x - 1];
      if (enPassantSquare.piece && 
          enPassantSquare.piece.type === 'pawn' && 
          enPassantSquare.piece.color !== this.color &&
          enPassantSquare.piece.advancedTwo === gameState.pieces.length - 1) {
        return {
          valid: true,
          capture: enPassantSquare,
          promotion: false,
          castling: false,
          enPassant: true,
          check: false,
          checkmate: false
        };
      }
    }

    return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
  }
}
