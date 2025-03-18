export type Player = 'X' | 'O' | null
export type Board = Player[]
export type GameState = {
  board: Board
  currentPlayer: 'X' | 'O'
  winner: Player
  isDraw: boolean
  scores: {
    X: number // Human
    O: number // AI
    draw: number
  }
  aiReasoning: string | null
  aiRawResponse: string | null
  isAiThinking: boolean
}

// Actions
export type GameAction =
  | { type: 'MAKE_MOVE'; index: number }
  | {
      type: 'SET_AI_MOVE'
      index: number
      reasoning?: string
      rawResponse?: string
    }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_SCORES' }
  | { type: 'SET_AI_THINKING'; isThinking: boolean }

// Reducer (Functional approach)
export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'MAKE_MOVE': {
      if (state.board[action.index] || state.winner || state.isDraw) {
        return state // Invalid move
      }
      const newBoard = [...state.board]
      newBoard[action.index] = state.currentPlayer
      const winner = checkWinner(newBoard)
      const isDraw = !winner && checkDraw(newBoard)

      // Update scores immediately if there's a win or draw
      const newScores = { ...state.scores }
      if (winner === 'X') {
        newScores.X = state.scores.X + 1
      } else if (isDraw) {
        newScores.draw = state.scores.draw + 1
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        scores: newScores,
      }
    }
    case 'SET_AI_MOVE': {
      if (state.board[action.index] || state.winner || state.isDraw) {
        return state // Invalid move
      }
      const newBoard = [...state.board]
      newBoard[action.index] = state.currentPlayer
      const winner = checkWinner(newBoard)
      const isDraw = !winner && checkDraw(newBoard)

      // Update scores immediately if there's a win or draw
      const newScores = { ...state.scores }
      if (winner === 'O') {
        newScores.O = state.scores.O + 1
      } else if (isDraw) {
        newScores.draw = state.scores.draw + 1
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        aiReasoning: action.reasoning ?? null,
        aiRawResponse: action.rawResponse ?? null,
        scores: newScores,
        isAiThinking: false,
      }
    }
    case 'RESET_GAME':
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        isDraw: false,
        aiReasoning: null,
        aiRawResponse: null,
        isAiThinking: false,
      }
    case 'RESET_SCORES':
      return {
        ...state,
        scores: {
          X: 0,
          O: 0,
          draw: 0,
        },
      }
    case 'SET_AI_THINKING':
      return {
        ...state,
        isAiThinking: action.isThinking,
      }
    default:
      return state
  }
}

// Win detection (pure function)
const checkWinner = (board: Board): Player => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}

// Draw detection (pure function)
const checkDraw = (board: Board): boolean => {
  return board.every((cell) => cell !== null)
}
