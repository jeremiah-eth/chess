import { ChessPiece } from '../Piece';
import { Square, MoveResult } from '../../types/chess';

export class Knight extends ChessPiece {
  constructor(color: 'white' | 'black', position: { x: number; y: number }, id?: string) {
    super('knight', color, position, id);
  }

  isValidMove(toSquare: Square, gameState: { board: Square[][]; pieces: any[]; currentPlayer: 'white' | 'black' }): MoveResult {
    const { currentPlayer } = gameState;
    const from = this.position;
    const to = toSquare.position;
    
    // Check if it's the piece's turn
    if (this.color !== currentPlayer) {
      return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
    }

    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);

    // Knight moves in L-shape: 2 squares in one direction, 1 square perpendicular
    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      // Check if destination is empty or has opponent piece
      if (!toSquare.piece || toSquare.piece.color !== this.color) {
        return {
          valid: true,
          capture: toSquare.piece ? toSquare : null,
          promotion: false,
          castling: false,
          enPassant: false,
          check: false,
          checkmate: false
        };
      }
    }

    return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
  }
}
