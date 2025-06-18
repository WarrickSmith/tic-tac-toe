'use client';

interface GameControlsProps {
  onNewGame: () => void;
  onResetScores: () => void;
}

export default function GameControls({ onNewGame, onResetScores }: GameControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={onNewGame}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        New Game
      </button>
      <button
        onClick={onResetScores}
        className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200"
      >
        Reset Scores
      </button>
    </div>
  );
}