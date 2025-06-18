'use client';

import { Board as BoardType } from '@/lib/gameLogic';
import Cell from './Cell';

interface BoardProps {
  board: BoardType;
  onCellClick: (row: number, col: number) => void;
  winningLine: number[][] | null;
  disabled: boolean;
}

export default function Board({ board, onCellClick, winningLine, disabled }: BoardProps) {
  const isWinningCell = (row: number, col: number): boolean => {
    if (!winningLine) return false;
    return winningLine.some(([r, c]) => r === row && c === col);
  };

  return (
    <div className="grid grid-cols-3 gap-1 bg-gray-700 p-4 rounded-lg">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
            isWinning={isWinningCell(rowIndex, colIndex)}
            disabled={disabled}
          />
        ))
      )}
    </div>
  );
}