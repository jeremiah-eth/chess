import { ChessPiece } from '../Piece';
import { Square, MoveResult } from '../../types/chess';

export class Bishop extends ChessPiece {
  constructor(color: 'white' | 'black', position: { x: number; y: number }, id?: string) {
    super('bishop', color, position, id);
  }

  isValidMove(toSquare: Square, gameState: { board: Square[][]; pieces: any[]; currentPlayer: 'white' | 'black' }): MoveResult {
    const { board, currentPlayer } = gameState;
    const from = this.position;
    const to = toSquare.position;
    
    // Check if it's the piece's turn
    if (this.color !== currentPlayer) {
      return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
    }

    const dx = to.x - from.x;
    const dy = to.y - from.y;

    // Bishop moves diagonally
    if (Math.abs(dx) === Math.abs(dy) && dx !== 0) {
      // Check if path is clear
      if (this.isPathClear(from, to, board)) {
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
    }

    return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
  }
}
