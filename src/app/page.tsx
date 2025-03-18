import GameBoard from '@/components/game/board'
import ScorePanel from '@/components/game/score-panel'
import GameControls from '@/components/game/game-controls'
import AIReasoningPanel from '@/components/game/ai-reasoning-panel'
import { GameProvider } from '@/lib/context/game-context'

export default function Home() {
  return (
    <GameProvider>
      <div className="container mx-auto px-4 py-8 w-full max-w-7xl">
        <div className="bg-gradient-to-r from-emerald-600 to-violet-600 p-4 rounded-lg shadow-lg mb-6 max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-white tracking-tight">
            <span className="text-emerald-300">X</span>
            <span className="mx-1">vs</span>
            <span className="text-violet-300">O</span>
            <div className="text-2xl font-bold mt-1">Battle Gemini AI</div>
          </h1>
        </div>

        {/* Responsive layout that adapts to different screen sizes and orientations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col space-y-6 items-center sm:items-stretch">
            <ScorePanel />
            <GameBoard />
            <GameControls />
          </div>

          {/* AI Reasoning Panel - single implementation with responsive display */}
          <div className="w-full">
            <AIReasoningPanel />
          </div>
        </div>
      </div>
    </GameProvider>
  )
}
