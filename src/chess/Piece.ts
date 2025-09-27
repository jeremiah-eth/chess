import { Piece, Position, Square, MoveResult, PieceType, PieceColor } from '../types/chess';

export abstract class ChessPiece implements Piece {
  public id: string;
  public type: PieceType;
  public color: PieceColor;
  public position: Position;
  public captured: boolean = false;
  public lastMoved: number = 0;
  public advancedTwo?: number;

  constructor(
    type: PieceType,
    color: PieceColor,
    position: Position,
    id?: string
  ) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.id = id || `${color}-${type}-${position.x}-${position.y}`;
  }

  abstract isValidMove(
    toSquare: Square,
    gameState: { board: Square[][]; pieces: Piece[]; currentPlayer: PieceColor }
  ): MoveResult;

  public capture(): void {
    this.captured = true;
  }

  public moveTo(position: Position, turn: number): void {
    this.position = position;
    this.lastMoved = turn;
  }

  public getNotation(): string {
    const file = String.fromCharCode(96 + this.position.x);
    const rank = this.position.y.toString();
    return `${file}${rank}`;
  }

  protected isPathClear(
    from: Position,
    to: Position,
    board: Square[][]
  ): boolean {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    
    if (steps <= 1) return true;

    const stepX = dx === 0 ? 0 : dx / Math.abs(dx);
    const stepY = dy === 0 ? 0 : dy / Math.abs(dy);

    for (let i = 1; i < steps; i++) {
      const checkX = from.x + stepX * i;
      const checkY = from.y + stepY * i;
      
      if (board[checkY - 1][checkX - 1].piece !== null) {
        return false;
      }
    }
    
    return true;
  }

  protected isOpponentPiece(piece: Piece | null): boolean {
    return piece !== null && piece.color !== this.color;
  }

  protected isOwnPiece(piece: Piece | null): boolean {
    return piece !== null && piece.color === this.color;
  }
}
