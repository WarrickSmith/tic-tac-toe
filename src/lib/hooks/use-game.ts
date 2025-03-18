'use client'
import { useReducer, useEffect } from 'react'
import { GameState, gameReducer } from '../types/game'
import { getAIMove } from '../services/gemini-service'

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  isDraw: false,
  scores: {
    X: 0,
    O: 0,
    draw: 0,
  },
  aiReasoning: null,
  aiRawResponse: null,
  isAiThinking: false,
}

const useGame = () => {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  useEffect(() => {
    if (state.currentPlayer === 'O' && !state.winner && !state.isDraw) {
      const fetchAIMove = async () => {
        dispatch({ type: 'SET_AI_THINKING', isThinking: true })
        const { move, reasoning, rawResponse } = await getAIMove(state.board)
        if (move !== undefined) {
          dispatch({ type: 'SET_AI_MOVE', index: move, reasoning, rawResponse })
        }
      }

      fetchAIMove()
    }
  }, [state.currentPlayer, state.winner, state.isDraw, state.board])

  return { state, dispatch }
}

export default useGame
