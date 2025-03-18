// app/api/gemini/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Board } from '@/lib/types/game'

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

  const prompt = `
    I'm playing tic-tac-toe as 'O' against a human who is 'X'.
    Current board state (indexes 0-8):
    ${formattedBoard.slice(0, 3)}
    ${formattedBoard.slice(3, 6)}
    ${formattedBoard.slice(6, 9)}
    
    As an unbeatable tic-tac-toe AI, follow these strict priorities when choosing a move:
    
    Priority 1: If I ('O') can win in this move, take that winning position immediately.
    Priority 2: If the human ('X') has a winning move next, block that position.
    Priority 3: Only if no winning or blocking moves are available, make the most strategic move.
    
    For each move you consider, explicitly check:
    - "Can I win now?" - check every possible winning line for two 'O's and an empty cell
    - "Must I block?" - check every possible winning line for two 'X's and an empty cell
    - "What's the best strategic move?" - only consider this after checking priorities 1 and 2
    
    Return your move as an index 0-8, along with detailed reasoning that shows you followed the priority order.
    
    Return JSON:
    {
      "move": index,
      "reasoning": "your detailed explanation showing priority-based analysis"
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
