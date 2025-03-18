'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'
import { Button } from '@/components/ui/button'

const GameControls: React.FC = () => {
  const { dispatch } = useGameContext()

  return (
    <div className="space-x-2">
      <Button onClick={() => dispatch({ type: 'RESET_GAME' })}>
        Reset Game
      </Button>
      <Button
        variant="secondary"
        onClick={() => dispatch({ type: 'RESET_SCORES' })}
      >
        Reset Scores
      </Button>
    </div>
  )
}

export default GameControls
