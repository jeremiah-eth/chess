import { GameState, Square, Piece, Move, Position, Player } from '../types/chess';
import { ChessPiece } from './Piece';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Knight } from './pieces/Knight';
import { Bishop } from './pieces/Bishop';
import { Queen } from './pieces/Queen';
import { King } from './pieces/King';

export class GameEngine {
  private gameState: GameState;
  private onStateChange?: (state: GameState) => void;

  constructor(onStateChange?: (state: GameState) => void) {
    this.onStateChange = onStateChange;
    this.gameState = this.initializeGame();
  }

  private initializeGame(): GameState {
    const board: Square[][] = [];
    const pieces: Piece[] = [];

    // Initialize empty board
    for (let y = 1; y <= 8; y++) {
      const row: Square[] = [];
      for (let x = 1; x <= 8; x++) {
        row.push({
          position: { x, y },
          piece: null,
          color: (x + y) % 2 === 0 ? 'light' : 'dark',
          selected: false,
          highlighted: false
        });
      }
      board.push(row);
    }

    // Create pieces
    const pieceClasses = {
      pawn: Pawn,
      castle: Rook,
      knight: Knight,
      bishop: Bishop,
      queen: Queen,
      king: King
    };

    // Black pieces (top)
    const blackPieces = [
      { type: 'castle', pos: { x: 1, y: 1 } },
      { type: 'knight', pos: { x: 2, y: 1 } },
      { type: 'bishop', pos: { x: 3, y: 1 } },
      { type: 'queen', pos: { x: 4, y: 1 } },
      { type: 'king', pos: { x: 5, y: 1 } },
      { type: 'bishop', pos: { x: 6, y: 1 } },
      { type: 'knight', pos: { x: 7, y: 1 } },
      { type: 'castle', pos: { x: 8, y: 1 } }
    ];

    // Black pawns
    for (let x = 1; x <= 8; x++) {
      blackPieces.push({ type: 'pawn', pos: { x, y: 2 } });
    }

    // White pieces (bottom)
    const whitePieces = [
      { type: 'castle', pos: { x: 1, y: 8 } },
      { type: 'knight', pos: { x: 2, y: 8 } },
      { type: 'bishop', pos: { x: 3, y: 8 } },
      { type: 'queen', pos: { x: 4, y: 8 } },
      { type: 'king', pos: { x: 5, y: 8 } },
      { type: 'bishop', pos: { x: 6, y: 8 } },
      { type: 'knight', pos: { x: 7, y: 8 } },
      { type: 'castle', pos: { x: 8, y: 8 } }
    ];

    // White pawns
    for (let x = 1; x <= 8; x++) {
      whitePieces.push({ type: 'pawn', pos: { x, y: 7 } });
    }

    // Create all pieces
    [...blackPieces, ...whitePieces].forEach(({ type, pos }) => {
      const color = pos.y <= 2 ? 'black' : 'white';
      const PieceClass = pieceClasses[type as keyof typeof pieceClasses];
      const piece = new PieceClass(color, pos) as ChessPiece;
      pieces.push(piece);
      board[pos.y - 1][pos.x - 1].piece = piece;
    });

    const whitePlayer: Player = {
      color: 'white',
      name: 'White Player',
      checked: false,
      kingMoved: false,
      castled: false
    };

    const blackPlayer: Player = {
      color: 'black',
      name: 'Black Player',
      checked: false,
      kingMoved: false,
      castled: false
    };

    return {
      board,
      pieces,
      currentPlayer: 'white',
      gameStatus: 'playing',
      moveHistory: [],
      turn: 1,
      whitePlayer,
      blackPlayer,
      selectedSquare: null
    };
  }

  public getGameState(): GameState {
    return this.gameState;
  }

  public selectSquare(position: Position): boolean {
    const square = this.gameState.board[position.y - 1][position.x - 1];
    
    // If no piece selected, try to select a piece
    if (!this.gameState.selectedSquare) {
      if (square.piece && square.piece.color === this.gameState.currentPlayer) {
        this.gameState.selectedSquare = position;
        square.selected = true;
        this.notifyStateChange();
        return true;
      }
      return false;
    }

    // If same square selected, deselect
    if (this.gameState.selectedSquare.x === position.x && 
        this.gameState.selectedSquare.y === position.y) {
      this.deselectSquare();
      return true;
    }

    // Try to make a move
    return this.makeMove(this.gameState.selectedSquare, position);
  }

  public makeMove(from: Position, to: Position): boolean {
    const fromSquare = this.gameState.board[from.y - 1][from.x - 1];
    const toSquare = this.gameState.board[to.y - 1][to.x - 1];

    if (!fromSquare.piece) return false;

    const piece = fromSquare.piece as ChessPiece;
    const moveResult = piece.isValidMove(toSquare, {
      board: this.gameState.board,
      pieces: this.gameState.pieces,
      currentPlayer: this.gameState.currentPlayer
    });

    if (!moveResult.valid) return false;

    // Execute the move
    this.executeMove(from, to, moveResult);
    return true;
  }

  private executeMove(from: Position, to: Position, moveResult: any): void {
    const fromSquare = this.gameState.board[from.y - 1][from.x - 1];
    const toSquare = this.gameState.board[to.y - 1][to.x - 1];
    const piece = fromSquare.piece!;

    // Create move record
    const move: Move = {
      from,
      to,
      piece,
      capturedPiece: moveResult.capture?.piece,
      notation: this.getMoveNotation(piece, from, to, moveResult),
      isCheck: moveResult.check,
      isCheckmate: moveResult.checkmate,
      isCastling: moveResult.castling,
      isEnPassant: moveResult.enPassant,
      isPromotion: moveResult.promotion,
      promotionPiece: moveResult.promotionPiece
    };

    // Handle special moves
    if (moveResult.castling) {
      this.handleCastling(from, to);
    } else if (moveResult.enPassant) {
      this.handleEnPassant(from, to);
    } else if (moveResult.promotion) {
      // Handle promotion (will be handled by UI)
      this.gameState.selectedSquare = to;
    } else {
      // Regular move
      (piece as ChessPiece).moveTo(to, this.gameState.turn);
      toSquare.piece = piece;
      fromSquare.piece = null;
    }

    // Handle captures
    if (moveResult.capture) {
      moveResult.capture.piece.capture();
    }

    // Update game state
    this.gameState.moveHistory.push(move);
    this.gameState.turn++;
    this.gameState.currentPlayer = this.gameState.currentPlayer === 'white' ? 'black' : 'white';
    this.deselectSquare();

    // Check for check/checkmate
    this.updateGameStatus();

    this.notifyStateChange();
  }

  private handleCastling(from: Position, to: Position): void {
    const king = this.gameState.board[from.y - 1][from.x - 1].piece!;
    const rookX = to.x > from.x ? 8 : 1;
    const rookSquare = this.gameState.board[from.y - 1][rookX - 1];
    const rook = rookSquare.piece!;

    // Move king
    (king as ChessPiece).moveTo(to, this.gameState.turn);
    this.gameState.board[to.y - 1][to.x - 1].piece = king;
    this.gameState.board[from.y - 1][from.x - 1].piece = null;

    // Move rook
    const newRookX = to.x > from.x ? to.x - 1 : to.x + 1;
    (rook as ChessPiece).moveTo({ x: newRookX, y: to.y }, this.gameState.turn);
    this.gameState.board[to.y - 1][newRookX - 1].piece = rook;
    this.gameState.board[from.y - 1][rookX - 1].piece = null;
  }

  private handleEnPassant(from: Position, to: Position): void {
    const piece = this.gameState.board[from.y - 1][from.x - 1].piece!;
    const capturedPawn = this.gameState.board[from.y - 1][to.x - 1].piece!;
    
    (piece as ChessPiece).moveTo(to, this.gameState.turn);
    this.gameState.board[to.y - 1][to.x - 1].piece = piece;
    this.gameState.board[from.y - 1][from.x - 1].piece = null;
    this.gameState.board[from.y - 1][to.x - 1].piece = null;
    (capturedPawn as ChessPiece).capture();
  }

  private getMoveNotation(piece: Piece, _from: Position, to: Position, moveResult: any): string {
    const pieceSymbol = this.getPieceSymbol(piece.type);
    const capture = moveResult.capture ? 'x' : '';
    const check = moveResult.check ? '+' : '';
    const checkmate = moveResult.checkmate ? '#' : '';
    
    return `${pieceSymbol}${capture}${String.fromCharCode(96 + to.x)}${to.y}${check}${checkmate}`;
  }

  private getPieceSymbol(type: string): string {
    const symbols: { [key: string]: string } = {
      king: 'K',
      queen: 'Q',
      rook: 'R',
      bishop: 'B',
      knight: 'N',
      pawn: ''
    };
    return symbols[type] || '';
  }

  private updateGameStatus(): void {
    // Check for check/checkmate logic would go here
    // This is a simplified version
    this.gameState.gameStatus = 'playing';
  }

  private deselectSquare(): void {
    if (this.gameState.selectedSquare) {
      const square = this.gameState.board[this.gameState.selectedSquare.y - 1][this.gameState.selectedSquare.x - 1];
      square.selected = false;
      this.gameState.selectedSquare = null;
      this.notifyStateChange();
    }
  }

  private notifyStateChange(): void {
    if (this.onStateChange) {
      this.onStateChange(this.gameState);
    }
  }

  public promotePawn(pieceType: 'queen' | 'castle' | 'bishop' | 'knight'): void {
    if (!this.gameState.selectedSquare) return;

    const square = this.gameState.board[this.gameState.selectedSquare.y - 1][this.gameState.selectedSquare.x - 1];
    const pawn = square.piece;
    
    if (!pawn || pawn.type !== 'pawn') return;

    // Create new piece
    const PieceClass = {
      queen: Queen,
      castle: Rook,
      bishop: Bishop,
      knight: Knight
    }[pieceType];

    const newPiece = new PieceClass(pawn.color, this.gameState.selectedSquare);
    square.piece = newPiece;
    
    // Update pieces array
    const pieceIndex = this.gameState.pieces.findIndex(p => p.id === pawn.id);
    if (pieceIndex !== -1) {
      this.gameState.pieces[pieceIndex] = newPiece;
    }

    this.gameState.selectedSquare = null;
    this.notifyStateChange();
  }
}
