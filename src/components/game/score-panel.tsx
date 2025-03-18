'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'

const ScoreCard: React.FC<{ title: string; score: number }> = ({
  title,
  score,
}) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-muted-foreground">{title}</span>
      <span className="text-2xl font-bold">{score}</span>
    </div>
  )
}

const ScorePanel: React.FC = () => {
  const { state } = useGameContext()

  return (
    <div className="space-y-4">
      {(state.winner || state.isDraw) && (
        <div className="text-center text-lg font-semibold">
          {state.winner
            ? `${state.winner === 'X' ? 'You' : 'AI'} Won!`
            : 'Draw!'}
        </div>
      )}
      <div className="flex justify-between">
        <ScoreCard title="You (X)" score={state.scores.X} />
        <ScoreCard title="Draws" score={state.scores.draw} />
        <ScoreCard title="AI (O)" score={state.scores.O} />
      </div>
    </div>
  )
}

export default ScorePanel
