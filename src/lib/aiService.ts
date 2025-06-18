import { Board, Player } from './gameLogic';

export interface AiMove {
  move: [number, number];
  explanation: string;
}

export interface AiRequest {
  board: Board;
  aiSymbol: Player;
  humanSymbol: Player;
  currentPlayer: string;
}

export class AiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async makeMove(board: Board, aiSymbol: Player, humanSymbol: Player): Promise<AiMove> {
    // First, always check for critical moves (win/block) locally for reliability
    const criticalMove = this.findCriticalMove(board, aiSymbol, humanSymbol);
    if (criticalMove) {
      return criticalMove;
    }

    if (!this.apiKey || this.apiKey === 'your-key-here') {
      // Fallback to simple AI logic when no API key is provided
      return this.makeFallbackMove(board, aiSymbol);
    }

    const request: AiRequest = {
      board,
      aiSymbol,
      humanSymbol,
      currentPlayer: 'AI'
    };

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert Tic-Tac-Toe AI. Analyze the board and make the optimal move.

Board state (null = empty cell):
${JSON.stringify(request.board, null, 2)}

You are: ${aiSymbol} | Human is: ${humanSymbol}

STRICT PRIORITY ORDER:
1. IMMEDIATE WIN: If you can win in one move, DO IT!
2. BLOCK OPPONENT: If human can win next turn, BLOCK them!
3. CREATE FORK: Make a move that creates multiple winning paths
4. BLOCK FORK: Prevent human from creating multiple winning paths
5. CENTER: Take center if available
6. CORNER: Take opposite corner or any corner
7. SIDE: Take any remaining side

Analyze each empty cell systematically. Check if placing your symbol there:
- Completes 3 in a row (WIN!)
- Prevents human from completing 3 in a row (BLOCK!)
- Creates 2+ potential winning lines (FORK!)

Respond with ONLY a JSON object:
{
  "move": [row, col],
  "explanation": "Brief explanation of your strategic choice"
}

Coordinates: [row, col] where both are 0, 1, or 2.`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!text) {
        throw new Error('No response from Gemini API');
      }

      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini API');
      }

      const aiResponse: AiMove = JSON.parse(jsonMatch[0]);
      
      // Validate the response structure
      if (!aiResponse.move || !Array.isArray(aiResponse.move) || aiResponse.move.length !== 2) {
        console.warn('Invalid AI response structure:', aiResponse);
        throw new Error('Invalid response structure from AI');
      }
      
      // Validate the move coordinates
      const [row, col] = aiResponse.move;
      if (typeof row !== 'number' || typeof col !== 'number' || 
          row < 0 || row > 2 || col < 0 || col > 2) {
        console.warn('Invalid AI move coordinates:', { row, col });
        throw new Error('Invalid move coordinates from AI');
      }
      
      // Validate the cell is empty
      if (board[row][col] !== null) {
        console.warn('AI tried to move to occupied cell:', { row, col, currentValue: board[row][col] });
        console.warn('Current board state:', board);
        throw new Error('AI attempted to move to occupied cell');
      }

      return aiResponse;
    } catch (error) {
      console.error('AI service error:', error);
      // Fallback to simple AI logic on error
      return this.makeFallbackMove(board, aiSymbol);
    }
  }

  private findCriticalMove(board: Board, aiSymbol: Player, humanSymbol: Player): AiMove | null {
    // Validate board state first
    if (!board || board.length !== 3 || !board.every(row => row && row.length === 3)) {
      console.error('Invalid board state in findCriticalMove:', board);
      return null;
    }

    // 1. Check for winning move (highest priority)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const testBoard = board.map((r, i) => 
            r.map((c, j) => i === row && j === col ? aiSymbol : c)
          );
          if (this.checkWin(testBoard, aiSymbol)) {
            return {
              move: [row, col],
              explanation: "I can win with this move!"
            };
          }
        }
      }
    }

    // 2. Check for blocking move (second priority)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const testBoard = board.map((r, i) => 
            r.map((c, j) => i === row && j === col ? humanSymbol : c)
          );
          if (this.checkWin(testBoard, humanSymbol)) {
            return {
              move: [row, col],
              explanation: "I need to block your winning move!"
            };
          }
        }
      }
    }

    return null; // No critical move found
  }

  private findTacticalMove(board: Board, aiSymbol: Player): AiMove | null {
    // Validate board state first
    if (!board || board.length !== 3 || !board.every(row => row && row.length === 3)) {
      console.error('Invalid board state in findTacticalMove:', board);
      return null;
    }

    // Look for fork opportunities (moves that create two ways to win)
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          const testBoard = board.map((r, i) => 
            r.map((c, j) => i === row && j === col ? aiSymbol : c)
          );
          
          // Count how many ways this move could lead to a win on the next turn
          let winningOpportunities = 0;
          for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
              if (testBoard[r][c] === null) {
                const nextBoard = testBoard.map((row, ri) => 
                  row.map((cell, ci) => ri === r && ci === c ? aiSymbol : cell)
                );
                if (this.checkWin(nextBoard, aiSymbol)) {
                  winningOpportunities++;
                }
              }
            }
          }
          
          // If this move creates multiple winning opportunities (fork), take it
          if (winningOpportunities >= 2) {
            return {
              move: [row, col],
              explanation: "This move creates multiple winning opportunities!"
            };
          }
        }
      }
    }

    return null; // No tactical move found
  }

  private makeFallbackMove(board: Board, aiSymbol: Player): AiMove {
    // Validate board state first
    if (!board || board.length !== 3 || !board.every(row => row && row.length === 3)) {
      console.error('Invalid board state in makeFallbackMove:', board);
      // Return a safe default move if board is invalid - try center first
      if (board?.[1]?.[1] === null) {
        return {
          move: [1, 1],
          explanation: "Emergency fallback move to center due to invalid board state."
        };
      }
      // If center is taken, find any empty cell
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board?.[r]?.[c] === null) {
            return {
              move: [r, c],
              explanation: "Emergency fallback move due to invalid board state."
            };
          }
        }
      }
      // This should never happen in a valid game state
      throw new Error('No valid moves available - board is full or corrupted');
    }

    // Critical moves (win/block) are handled by findCriticalMove()
    // This method focuses on strategic positioning

    // 3. Take center if available (strong strategic position)
    if (board[1][1] === null) {
      return {
        move: [1, 1],
        explanation: "I'll take the center - it's a strong strategic position."
      };
    }

    // 4. Look for tactical opportunities (forks, two-way wins)
    const tacticalMove = this.findTacticalMove(board, aiSymbol);
    if (tacticalMove) {
      return tacticalMove;
    }

    // 5. Take corners
    const corners = [[0, 0], [0, 2], [2, 0], [2, 2]];
    for (const [row, col] of corners) {
      if (board[row][col] === null) {
        return {
          move: [row, col],
          explanation: "I'll take a corner position."
        };
      }
    }

    // Take any available space
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === null) {
          return {
            move: [row, col],
            explanation: "I'll take this available position."
          };
        }
      }
    }

    // This should never happen in a valid game
    throw new Error('No valid moves available');
  }

  private checkWin(board: Board, player: Player): boolean {
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

    return lines.some(line => 
      line.every(([r, c]) => board[r][c] === player)
    );
  }
}