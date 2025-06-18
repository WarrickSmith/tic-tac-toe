'use client';

import { Player } from '@/lib/gameLogic';

interface PlayerSettingsProps {
  humanSymbol: Player;
  firstPlayer: Player;
  onHumanSymbolChange: (symbol: Player) => void;
  onFirstPlayerChange: (player: Player) => void;
  onStartGame: () => void;
  disabled: boolean;
}

export default function PlayerSettings({
  humanSymbol,
  firstPlayer,
  onHumanSymbolChange,
  onFirstPlayerChange,
  onStartGame,
  disabled
}: PlayerSettingsProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-bold text-center mb-6 text-blue-400">
        Game Settings
      </h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Choose your symbol:
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onHumanSymbolChange('X')}
              disabled={disabled}
              className={`
                flex-1 py-3 px-4 rounded-lg font-bold text-2xl transition-all duration-200
                ${humanSymbol === 'X' 
                  ? 'bg-blue-600 text-white border-2 border-blue-400' 
                  : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              X
            </button>
            <button
              onClick={() => onHumanSymbolChange('O')}
              disabled={disabled}
              className={`
                flex-1 py-3 px-4 rounded-lg font-bold text-2xl transition-all duration-200
                ${humanSymbol === 'O' 
                  ? 'bg-red-600 text-white border-2 border-red-400' 
                  : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              O
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Who goes first:
          </label>
          <div className="flex gap-4">
            <button
              onClick={() => onFirstPlayerChange(humanSymbol)}
              disabled={disabled}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${firstPlayer === humanSymbol 
                  ? 'bg-green-600 text-white border-2 border-green-400' 
                  : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              You
            </button>
            <button
              onClick={() => onFirstPlayerChange(humanSymbol === 'X' ? 'O' : 'X')}
              disabled={disabled}
              className={`
                flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200
                ${firstPlayer !== humanSymbol 
                  ? 'bg-green-600 text-white border-2 border-green-400' 
                  : 'bg-gray-700 text-gray-300 border-2 border-gray-600 hover:bg-gray-600'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              AI
            </button>
          </div>
        </div>

        <button
          onClick={onStartGame}
          disabled={disabled}
          className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 
                     text-white font-semibold rounded-lg transition-colors duration-200
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start New Game
        </button>
      </div>
    </div>
  );
}