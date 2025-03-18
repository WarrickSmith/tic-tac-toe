import { Board } from '../types/game'

// AI move calculation
export const getAIMove = async (
  board: Board
): Promise<{ move: number; reasoning?: string; rawResponse?: string }> => {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ board }),
    })

    if (!response.ok) throw new Error('API request failed')
    const data = await response.json()

    if (data.error) {
      return {
        move: getFallbackMove(board).move,
        reasoning: "Couldn't get AI reasoning.",
        rawResponse: data.rawResponse,
      }
    }

    return {
      move: data.move,
      reasoning: data.reasoning,
      rawResponse: data.rawResponse, // Ensure we also return the raw response
    }
  } catch (error) {
    console.error('Error getting AI move:', error)
    // Fallback strategy
    return getFallbackMove(board)
  }
}

const getFallbackMove = (board: Board): { move: number; reasoning: string } => {
  // Simple fallback: choose the first available cell
  const move = board.findIndex((cell) => cell === null)
  return {
    move,
    reasoning: 'Fallback strategy: choosing the first available cell.',
  }
}
