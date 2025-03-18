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
            <h1 className="text-3xl font-bold text-center">
              Tic-Tac-Toe vs Gemini
            </h1>
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
