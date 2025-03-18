'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'
import { Button } from '@/components/ui/button'

const GameControls: React.FC = () => {
  const { dispatch } = useGameContext()
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:justify-center">
      <Button
        onClick={() => dispatch({ type: 'RESET_GAME' })}
        className="flex-1 sm:flex-initial bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 sm:px-6 text-sm sm:text-base"
        size="lg"
      >
        Reset Game
      </Button>
      <Button
        variant="secondary"
        onClick={() => dispatch({ type: 'RESET_SCORES' })}
        className="flex-1 sm:flex-initial bg-slate-700 hover:bg-slate-800 text-white font-medium py-2 px-4 sm:px-6 text-sm sm:text-base"
        size="lg"
      >
        Reset Scores
      </Button>
    </div>
  )
}

export default GameControls
