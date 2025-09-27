export type PieceType = 'king' | 'queen' | 'bishop' | 'knight' | 'castle' | 'pawn';
export type PieceColor = 'white' | 'black';
export type GameStatus = 'playing' | 'check' | 'checkmate' | 'stalemate' | 'draw';

export interface Position {
  x: number;
  y: number;
}

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
  position: Position;
  captured: boolean;
  lastMoved: number;
  advancedTwo?: number; // For en passant tracking
}

export interface Square {
  position: Position;
  piece: Piece | null;
  color: 'light' | 'dark';
  selected: boolean;
  highlighted: boolean;
}

export interface Move {
  from: Position;
  to: Position;
  piece: Piece;
  capturedPiece?: Piece;
  notation: string;
  isCheck: boolean;
  isCheckmate: boolean;
  isCastling: boolean;
  isEnPassant: boolean;
  isPromotion: boolean;
  promotionPiece?: PieceType;
}

export interface GameState {
  board: Square[][];
  pieces: Piece[];
  currentPlayer: PieceColor;
  gameStatus: GameStatus;
  moveHistory: Move[];
  turn: number;
  whitePlayer: Player;
  blackPlayer: Player;
  selectedSquare: Position | null;
}

export interface Player {
  color: PieceColor;
  name: string;
  fid?: number; // Farcaster ID
  checked: boolean;
  kingMoved: boolean;
  castled: boolean;
}

export interface MoveResult {
  valid: boolean;
  capture: Square | null;
  promotion: boolean;
  castling: boolean;
  enPassant: boolean;
  check: boolean;
  checkmate: boolean;
}

export interface GameSettings {
  timeControl?: {
    white: number;
    black: number;
    increment: number;
  };
  allowTakebacks: boolean;
  spectators: boolean;
  socialFeatures: boolean;
}
