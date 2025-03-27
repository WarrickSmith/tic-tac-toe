// app/api/gemini/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Board, Player } from '@/lib/types/game' // Import Player type

const formatBoard = (board: Board): string => {
  return board.map((cell) => (cell === null ? '-' : cell)).join('')
}

const extractJson = (text: string) => {
  try {
    // First attempt direct JSON parse
    try {
      return JSON.parse(text)
    } catch {
      // Double underscore indicates intentional unused var
      console.log('Direct parse failed, trying code blocks')
    }

    console.log('Raw text from Gemini:', text)
    // Try extracting JSON from markdown code blocks
    const codeBlockMatch = text.match(/```(?:json)?\s*\n([\s\S]+?)\n```/i)
    if (codeBlockMatch) {
      try {
        return JSON.parse(codeBlockMatch[1])
      } catch (error) {
        console.error('Error parsing code block JSON:', error)
      }
    }

    // Fallback to improved loose JSON match that allows nested braces
    const looseMatch = text.match(/\{(?:[^{}]|{[^{}]*})*\}/)
    if (looseMatch) {
      try {
        return JSON.parse(looseMatch[0])
      } catch (error) {
        console.error('Error parsing loose JSON:', error)
      }
    }

    console.log('No valid JSON found')
    return null
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return null
  }
}

export async function POST(request: Request) {
  const { board } = await request.json()

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' }) // Model updated to 1.5-pro

  const formattedBoard = formatBoard(board)
  const availableMoves = board
    .map((cell: Player | null, index: number) => (cell === null ? index : null))
    .filter((index: number | null): index is number => index !== null) // Type guard for filtering

  const prompt = `
    You are an expert Tic-Tac-Toe AI player playing as 'O' against a human 'X'. Your goal is to win or force a draw.
    Current board state (indexes 0-8, '-' represents empty):
    ${formattedBoard.slice(0, 3)}
    ${formattedBoard.slice(3, 6)}
    ${formattedBoard.slice(6, 9)}

    Available moves (indices): [${availableMoves.join(', ')}]

    Follow these strict priorities meticulously when choosing your move ONLY from the available moves:

    Priority 1: WINNING MOVE. Check if placing 'O' in any available position results in an immediate win (three 'O's in a row, column, or diagonal). If yes, choose that winning position. Check ALL potential winning lines involving available moves.
    Priority 2: BLOCKING MOVE. If no winning move exists for 'O', check if the opponent 'X' could win on their *next* turn by placing 'X' in any of the currently available positions. If yes, you MUST choose that position to block them. If multiple blocking moves are needed (e.g., opponent has two winning lines), block one of them. Check ALL potential opponent winning lines involving available moves.
    Priority 3: STRATEGIC MOVE. If there's no immediate winning move for 'O' AND no immediate blocking move is required against 'X', then choose the best strategic move from the remaining available positions. Good strategies include: taking the center (4 if available), taking corners (0, 2, 6, 8 if available), or setting up a two-way threat (fork).

    Provide detailed reasoning explaining *exactly* how you evaluated the priorities in order (Win? Block? Strategic?). State clearly which priority led to your final move choice.

    Return ONLY JSON in the specified format below. Do not include any other text or markdown formatting outside the JSON structure.
    {
      "move": <chosen_index>,
      "reasoning": "Detailed explanation following the Win > Block > Strategic priority evaluation."
    }
  `

  try {
    const result = await model.generateContent(prompt)
    const textResponse = result.response.text()
    const moveData = extractJson(textResponse)
    console.log('moveData', moveData)

    if (moveData) {
      return Response.json({
        move: moveData.move,
        reasoning: moveData.reasoning,
        rawResponse: textResponse, // Always include the raw response
      })
    } else {
      return Response.json({
        error: 'Could not parse AI response',
        rawResponse: textResponse,
      })
    }
  } catch (error) {
    // Error handling
    console.error(error)
    return Response.json({ error: 'Failed to get AI move' }, { status: 500 })
  }
}
