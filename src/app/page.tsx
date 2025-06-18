'use client';

import dynamic from 'next/dynamic';

const GameClient = dynamic(() => import('@/components/GameClient'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Tic-Tac-Toe AI
        </h1>
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading game...</p>
        </div>
      </div>
    </div>
  )
});

export default function Home() {
  return <GameClient />;
}