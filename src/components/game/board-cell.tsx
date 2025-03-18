import React from 'react'
import { cn } from '@/lib/utils'

type Player = 'X' | 'O' | null

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const OIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
)

const BoardCell: React.FC<{ value: Player; onClick: () => void }> = ({
  value,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'aspect-square bg-slate-800 rounded-lg flex items-center justify-center transition-all',
        'hover:bg-slate-700 focus:ring-2 focus:ring-slate-400',
        'animate-in fade-in-50 duration-300',
        { 'pointer-events-none': value !== null }
      )}
    >
      {value === 'X' && (
        <XIcon className="text-emerald-400 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 animate-in zoom-in-50 duration-200" />
      )}
      {value === 'O' && (
        <OIcon className="text-violet-400 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 animate-in zoom-in-50 duration-200" />
      )}
    </button>
  )
}

export default BoardCell
