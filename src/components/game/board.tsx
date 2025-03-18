'use client'
import React from 'react'
import BoardCell from './board-cell'
import { useGameContext } from '@/lib/context/game-context'

const GameBoard: React.FC = () => {
  const { state, dispatch } = useGameContext()

  const handleCellClick = (index: number) => {
    if (
      !state.board[index] &&
      !state.winner &&
      !state.isDraw &&
      state.currentPlayer === 'X' &&
      !state.isAiThinking
    ) {
      dispatch({ type: 'MAKE_MOVE', index })
    }
  }

  return (
    <div className="grid grid-cols-3 gap-3 p-1">
      {state.board.map((cell, index) => (
        <BoardCell
          key={index}
          value={cell}
          onClick={() => handleCellClick(index)}
        />
      ))}
    </div>
  )
}

export default GameBoard
