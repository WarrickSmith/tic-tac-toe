'use client';

import { Cell as CellType } from '@/lib/gameLogic';

interface CellProps {
  value: CellType;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
}

export default function Cell({ value, onClick, isWinning, disabled }: CellProps) {
  return (
    <button
      className={`
        w-20 h-20 sm:w-24 sm:h-24 border-2 border-gray-600 
        flex items-center justify-center text-4xl sm:text-5xl font-bold 
        transition-all duration-300 hover:bg-gray-800 hover:scale-105
        disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:hover:scale-100
        ${isWinning ? 'bg-green-900 border-green-500 animate-pulse' : ''}
        ${value === 'X' ? 'text-blue-400' : value === 'O' ? 'text-red-400' : 'text-gray-400'}
        ${value ? 'animate-bounce-once' : ''}
      `}
      onClick={onClick}
      disabled={disabled || value !== null}
    >
      <span className={value ? 'animate-fade-in' : ''}>
        {value}
      </span>
    </button>
  );
}