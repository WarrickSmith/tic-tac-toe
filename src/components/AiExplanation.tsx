'use client';

interface AiExplanationProps {
  explanation: string | null;
  isThinking: boolean;
}

export default function AiExplanation({ explanation, isThinking }: AiExplanationProps) {
  return (
    <div className="bg-purple-900 border border-purple-700 rounded-lg mb-4 h-20 overflow-hidden">
      {isThinking ? (
        <div className="flex items-center justify-center h-full p-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-400 mr-3"></div>
          <span className="text-purple-200 font-medium">AI is thinking...</span>
        </div>
      ) : explanation ? (
        <div className="h-full overflow-y-auto p-4 ai-explanation-scroll">
          <div className="flex items-start">
            <div className="bg-purple-700 rounded-full p-1 mr-3 mt-0.5 flex-shrink-0">
              <svg className="w-4 h-4 text-purple-200" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-purple-200 mb-1">AI&apos;s Reasoning:</div>
              <div className="text-purple-100 text-sm leading-relaxed pr-2">{explanation}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full p-4 text-purple-300 text-sm opacity-60">
          Waiting for AI move...
        </div>
      )}
    </div>
  );
}