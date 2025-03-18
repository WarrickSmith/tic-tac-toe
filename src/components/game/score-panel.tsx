'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'

// Enhanced ScoreCard with player indicators
const ScoreCard: React.FC<{
  title: string
  score: number
  playerSymbol?: 'X' | 'O' | null
  isDraw?: boolean
}> = ({ title, score, playerSymbol, isDraw = false }) => {
  // Dynamic styling based on player symbol
  const bgColor =
    playerSymbol === 'X'
      ? 'bg-gradient-to-b from-emerald-600 to-emerald-800'
      : playerSymbol === 'O'
      ? 'bg-gradient-to-b from-violet-600 to-violet-800'
      : 'bg-gradient-to-b from-slate-600 to-slate-800'

  const symbolColor =
    playerSymbol === 'X'
      ? 'text-emerald-300'
      : playerSymbol === 'O'
      ? 'text-violet-300'
      : 'text-gray-300'

  return (
    <div
      className={`flex flex-col items-center ${bgColor} p-4 rounded-lg shadow-md border border-slate-600 relative`}
    >
      <div className="absolute -top-3 bg-slate-900 px-3 py-1 rounded-full border border-slate-600 font-bold">
        <span className="text-base text-white">{title}</span>
      </div>

      {isDraw ? (
        <span className="text-5xl font-bold mb-1 flex items-center">
          <span className="text-emerald-300">X</span>
          <span className="text-gray-300 mx-1">=</span>
          <span className="text-violet-300">O</span>
        </span>
      ) : (
        playerSymbol && (
          <span className={`text-5xl font-bold ${symbolColor} mb-1`}>
            {playerSymbol}
          </span>
        )
      )}

      <div className="bg-slate-900/70 w-full text-center rounded-md py-1 px-2 mt-1">
        <span className="text-3xl font-bold text-white">
          {score}
          <span className="text-sm text-slate-300 ml-1">pts</span>
        </span>
      </div>
    </div>
  )
}

const ScorePanel: React.FC = () => {
  const { state } = useGameContext()
  return (
    <div className="space-y-6">
      {/* Game status announcement */}
      {(state.winner || state.isDraw) && (
        <div className="text-center text-2xl font-bold py-3 px-4 bg-gradient-to-r from-emerald-700 to-violet-700 text-white rounded-md shadow-lg animate-in fade-in-50 duration-300 mb-4">
          {state.winner
            ? `${state.winner === 'X' ? 'You' : 'AI'} Won the Match!`
            : 'Match Ended in a Draw!'}
        </div>
      )}

      {/* Game legend - current status */}
      <div className="bg-slate-800/60 rounded-md p-2 text-center mb-4">
        <span className="font-medium text-slate-300">
          {state.isAiThinking
            ? 'AI is thinking...'
            : state.winner || state.isDraw
            ? 'Game Over'
            : `Current Turn: ${
                state.currentPlayer === 'X' ? 'You (X)' : 'AI (O)'
              }`}
        </span>
      </div>

      {/* Score cards */}
      <div className="flex justify-between gap-3">
        <ScoreCard title="HUMAN" score={state.scores.X} playerSymbol="X" />
        <ScoreCard title="DRAW" score={state.scores.draw} isDraw={true} />
        <ScoreCard title="AI" score={state.scores.O} playerSymbol="O" />
      </div>
    </div>
  )
}

export default ScorePanel
