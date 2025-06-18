export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = Cell[][];
export type GameStatus = 'playing' | 'won' | 'draw';

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  status: GameStatus;
  winningLine: number[][] | null;
}

export const createEmptyBoard = (): Board => [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export const checkWinner = (board: Board): { winner: Player | null; winningLine: number[][] | null } => {
  const lines = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (
      board[a[0]][a[1]] &&
      board[a[0]][a[1]] === board[b[0]][b[1]] &&
      board[a[0]][a[1]] === board[c[0]][c[1]]
    ) {
      return { winner: board[a[0]][a[1]], winningLine: line };
    }
  }

  return { winner: null, winningLine: null };
};

export const isBoardFull = (board: Board): boolean => {
  return board.every(row => row.every(cell => cell !== null));
};

export const makeMove = (board: Board, row: number, col: number, player: Player): Board => {
  if (board[row][col] !== null) {
    throw new Error('Cell is already occupied');
  }
  
  const newBoard = board.map((boardRow, r) =>
    boardRow.map((cell, c) => (r === row && c === col ? player : cell))
  );
  
  return newBoard;
};

export const getGameStatus = (board: Board): { status: GameStatus; winner: Player | null; winningLine: number[][] | null } => {
  const { winner, winningLine } = checkWinner(board);
  
  if (winner) {
    return { status: 'won', winner, winningLine };
  }
  
  if (isBoardFull(board)) {
    return { status: 'draw', winner: null, winningLine: null };
  }
  
  return { status: 'playing', winner: null, winningLine: null };
};

export const getOpponent = (player: Player): Player => player === 'X' ? 'O' : 'X';