import GameBoard from '@/components/game/board'
import ScorePanel from '@/components/game/score-panel'
import GameControls from '@/components/game/game-controls'
import AIReasoningPanel from '@/components/game/ai-reasoning-panel'
import { GameProvider } from '@/lib/context/game-context'

export default function Home() {
  return (
    <GameProvider>
      <div className="container mx-auto px-4 py-8 max-w-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-600 to-violet-600 p-4 rounded-lg shadow-lg">
              <h1 className="text-4xl font-extrabold text-center text-white tracking-tight">
                <span className="text-emerald-300">X</span>
                <span className="mx-1">vs</span>
                <span className="text-violet-300">O</span>
                <div className="text-2xl font-bold mt-1">Battle Gemini AI</div>
              </h1>
            </div>
            <ScorePanel />
            <GameBoard />
            <GameControls />
          </div>
          <div className="hidden md:block">
            <AIReasoningPanel />
          </div>
          <div className="block md:hidden mt-6">
            <AIReasoningPanel />
          </div>
        </div>
      </div>
    </GameProvider>
  )
}
