'use client'
import React from 'react'
import { useGameContext } from '@/lib/context/game-context'

const AIReasoningPanel: React.FC = () => {
  const { state } = useGameContext()

  return (
    <div className="p-4 rounded-lg border border-border">
      <h2 className="text-lg font-semibold mb-2">AI Reasoning</h2>
      {state.isAiThinking ? (
        <p className="text-muted-foreground">Thinking...</p>
      ) : (
        <div className="text-sm space-y-2">
          {state.aiRawResponse ? (
            state.aiReasoning ? (
              <p className="whitespace-pre-wrap">{state.aiReasoning}</p>
            ) : (
              <>
                <p className="text-red-500">
                  Could not parse structured response. Raw output:
                </p>
                <div className="bg-muted p-3 rounded-md font-mono text-xs">
                  {state.aiRawResponse}
                </div>
              </>
            )
          ) : null}
        </div>
      )}
    </div>
  )
}

export default AIReasoningPanel
