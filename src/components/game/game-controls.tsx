'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'
import { Button } from '@/components/ui/button'

const GameControls: React.FC = () => {
  const { dispatch } = useGameContext()
  return (
    <div className="flex gap-3 justify-center">
      <Button
        onClick={() => dispatch({ type: 'RESET_GAME' })}
        className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 text-base"
        size="lg"
      >
        Reset Game
      </Button>
      <Button
        variant="secondary"
        onClick={() => dispatch({ type: 'RESET_SCORES' })}
        className="bg-slate-700 hover:bg-slate-800 text-white font-medium py-2 px-6 text-base"
        size="lg"
      >
        Reset Scores
      </Button>
    </div>
  )
}

export default GameControls
