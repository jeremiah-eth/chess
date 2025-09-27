import { ChessPiece } from '../Piece';
import { Square, MoveResult } from '../../types/chess';

export class King extends ChessPiece {
  constructor(color: 'white' | 'black', position: { x: number; y: number }, id?: string) {
    super('king', color, position, id);
  }

  isValidMove(toSquare: Square, gameState: { board: Square[][]; pieces: any[]; currentPlayer: 'white' | 'black' }): MoveResult {
    const { board, currentPlayer } = gameState;
    const from = this.position;
    const to = toSquare.position;
    
    // Check if it's the piece's turn
    if (this.color !== currentPlayer) {
      return { valid: false, capture: null, promotion: false, castling: false, enPassant: false, check: false, checkmate: false };
    }

    const dx = Math.abs(to.x - from.x);
    const dy = Math.abs(to.y - from.y);

    // King moves one square in any direction
    if (dx <= 1 && dy <= 1 && (dx !== 0 || dy !== 0)) {
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

    // Castling logic
    if (dx === 2 && dy === 0 && this.lastMoved === 0) {
      const rookX = to.x > from.x ? 8 : 1;
      const rookSquare = board[from.y - 1][rookX - 1];
      
      if (rookSquare.piece && 
          rookSquare.piece.type === 'castle' && 
          rookSquare.piece.color === this.color &&
          rookSquare.piece.lastMoved === 0) {
        
        // Check if path is clear for castling
        const direction = to.x > from.x ? 1 : -1;
        const intermediateSquare = board[from.y - 1][from.x + direction - 1];
        
        if (!intermediateSquare.piece) {
          return {
            valid: true,
            capture: null,
            promotion: false,
            castling: true,
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
