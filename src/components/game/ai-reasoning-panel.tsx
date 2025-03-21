'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'

const AIReasoningPanel: React.FC = () => {
  const { state } = useGameContext()
  return (
    <div className="p-4 rounded-lg border border-border bg-slate-800/30 h-full max-h-[600px] flex flex-col">
      <h2 className="text-xl font-bold mb-3 text-violet-400 flex-none">
        AI Reasoning
      </h2>
      <div className="flex-1 overflow-y-auto">
        {state.isAiThinking ? (
          <p className="text-muted-foreground text-base animate-pulse">
            Thinking...
          </p>
        ) : (
          <div className="text-base space-y-3">
            {state.aiRawResponse ? (
              state.aiReasoning ? (
                <p className="whitespace-pre-wrap leading-relaxed">
                  {state.aiReasoning}
                </p>
              ) : (
                <>
                  <p className="text-red-500 font-medium">
                    Could not parse structured response. Raw output:
                  </p>
                  <div className="bg-slate-900/80 p-4 rounded-md font-mono text-sm overflow-auto">
                    {state.aiRawResponse}
                  </div>
                </>
              )
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

export default AIReasoningPanel
