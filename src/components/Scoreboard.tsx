'use client';

import { GameScores } from '@/lib/localStorage';

interface ScoreboardProps {
  scores: GameScores;
}

export default function Scoreboard({ scores }: ScoreboardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-6">
      <h2 className="text-xl font-bold text-center mb-4 text-blue-400">
        Scoreboard
      </h2>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-blue-700 rounded-lg p-3">
          <div className="text-2xl font-bold text-blue-200">
            {scores.humanWins}
          </div>
          <div className="text-sm text-blue-300">
            Human Wins
          </div>
        </div>
        <div className="bg-gray-700 rounded-lg p-3">
          <div className="text-2xl font-bold text-gray-200">
            {scores.draws}
          </div>
          <div className="text-sm text-gray-300">
            Draws
          </div>
        </div>
        <div className="bg-red-700 rounded-lg p-3">
          <div className="text-2xl font-bold text-red-200">
            {scores.aiWins}
          </div>
          <div className="text-sm text-red-300">
            AI Wins
          </div>
        </div>
      </div>
    </div>
  );
}