'use client'
import React, { createContext, useContext } from 'react'
import useGame from '../hooks/use-game'

const GameContext = createContext<ReturnType<typeof useGame> | null>(null)

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const game = useGame()

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>
}

export const useGameContext = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}
