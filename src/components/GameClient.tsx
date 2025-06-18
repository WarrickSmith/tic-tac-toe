'use client';

import { useState, useCallback, useEffect } from 'react';
import { 
  createEmptyBoard, 
  makeMove, 
  getGameStatus, 
  getOpponent,
  Player,
  Board as BoardType,
  GameStatus
} from '@/lib/gameLogic';
import { getScores, saveScores, resetScores, GameScores } from '@/lib/localStorage';
import { AiService } from '@/lib/aiService';
import Board from '@/components/Board';
import GameControls from '@/components/GameControls';
import Scoreboard from '@/components/Scoreboard';
import AiExplanation from '@/components/AiExplanation';
import PlayerSettings from '@/components/PlayerSettings';

export default function GameClient() {
  const [board, setBoard] = useState<BoardType>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [winningLine, setWinningLine] = useState<number[][] | null>(null);
  const [scores, setScores] = useState<GameScores>({ humanWins: 0, aiWins: 0, draws: 0 });
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [humanSymbol, setHumanSymbol] = useState<Player>('X');
  const [aiSymbol, setAiSymbol] = useState<Player>('O');
  const [firstPlayer, setFirstPlayer] = useState<Player>('X');
  const [gameStarted, setGameStarted] = useState(false);
  const [aiService, setAiService] = useState<AiService | null>(null);

  const updateScores = useCallback((status: GameStatus, winner: Player | null) => {
    if (status === 'won' && winner) {
      const newScores = {
        ...scores,
        humanWins: winner === humanSymbol ? scores.humanWins + 1 : scores.humanWins,
        aiWins: winner === aiSymbol ? scores.aiWins + 1 : scores.aiWins
      };
      setScores(newScores);
      saveScores(newScores);
    } else if (status === 'draw') {
      const newScores = {
        ...scores,
        draws: scores.draws + 1
      };
      setScores(newScores);
      saveScores(newScores);
    }
  }, [scores, humanSymbol, aiSymbol]);

  // Initialize AI service and load scores on component mount
  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
    const model = process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-1.5-flash';
    setAiService(new AiService(apiKey, model));
    setScores(getScores());
  }, []);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (board[row][col] !== null || gameStatus !== 'playing') {
      return;
    }

    try {
      const newBoard = makeMove(board, row, col, currentPlayer);
      const { status, winner: gameWinner, winningLine: newWinningLine } = getGameStatus(newBoard);

      setBoard(newBoard);
      setGameStatus(status);
      setWinner(gameWinner);
      setWinningLine(newWinningLine);

      if (status === 'playing') {
        setCurrentPlayer(getOpponent(currentPlayer));
      } else {
        updateScores(status, gameWinner);
      }
    } catch (error) {
      console.error('Invalid move:', error);
    }
  }, [board, currentPlayer, gameStatus, updateScores]);

  const makeAiMove = useCallback(async () => {
    if (!aiService) return;
    
    setIsAiThinking(true);
    setAiExplanation(null);

    try {
      const aiMove = await aiService.makeMove(board, aiSymbol, humanSymbol);
      const [row, col] = aiMove.move;

      const newBoard = makeMove(board, row, col, aiSymbol);
      const { status, winner: gameWinner, winningLine: newWinningLine } = getGameStatus(newBoard);

      setBoard(newBoard);
      setGameStatus(status);
      setWinner(gameWinner);
      setWinningLine(newWinningLine);
      setAiExplanation(aiMove.explanation);

      if (status === 'playing') {
        setCurrentPlayer(getOpponent(aiSymbol));
      } else {
        updateScores(status, gameWinner);
      }
    } catch (error) {
      console.error('AI move failed:', error);
      setAiExplanation('AI encountered an error. Please try again.');
    } finally {
      setIsAiThinking(false);
    }
  }, [board, aiSymbol, humanSymbol, aiService, updateScores]);

  // Handle AI move
  useEffect(() => {
    if (gameStatus === 'playing' && currentPlayer === aiSymbol && aiService) {
      makeAiMove();
    }
  }, [currentPlayer, gameStatus, aiSymbol, makeAiMove, aiService]);

  const handleHumanSymbolChange = useCallback((symbol: Player) => {
    setHumanSymbol(symbol);
    setAiSymbol(symbol === 'X' ? 'O' : 'X');
  }, []);

  const handleFirstPlayerChange = useCallback((player: Player) => {
    setFirstPlayer(player);
  }, []);

  const handleStartGame = useCallback(() => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(firstPlayer);
    setGameStatus('playing');
    setWinner(null);
    setWinningLine(null);
    setAiExplanation(null);
    setGameStarted(true);
  }, [firstPlayer]);

  const handleNewGame = useCallback(() => {
    setGameStarted(false);
  }, []);

  const handleResetScores = useCallback(() => {
    const emptyScores = { humanWins: 0, aiWins: 0, draws: 0 };
    setScores(emptyScores);
    resetScores();
  }, []);

  const getStatusMessage = () => {
    if (gameStatus === 'won' && winner) {
      return winner === humanSymbol ? 'You win!' : 'AI wins!';
    }
    if (gameStatus === 'draw') {
      return "It's a draw!";
    }
    if (isAiThinking) {
      return 'AI is thinking...';
    }
    return currentPlayer === humanSymbol ? 'Your turn' : "AI's turn";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-blue-400">
          Tic-Tac-Toe AI
        </h1>
        
        <Scoreboard scores={scores} />
        
        {!gameStarted ? (
          <PlayerSettings
            humanSymbol={humanSymbol}
            firstPlayer={firstPlayer}
            onHumanSymbolChange={handleHumanSymbolChange}
            onFirstPlayerChange={handleFirstPlayerChange}
            onStartGame={handleStartGame}
            disabled={false}
          />
        ) : (
          <>
            <AiExplanation explanation={aiExplanation} isThinking={isAiThinking} />
            
            <div className="text-center mb-6">
              <p className="text-xl font-semibold">
                {getStatusMessage()}
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <Board
                board={board}
                onCellClick={handleCellClick}
                winningLine={winningLine}
                disabled={gameStatus !== 'playing' || currentPlayer === aiSymbol || isAiThinking}
              />
            </div>

            <GameControls
              onNewGame={handleNewGame}
              onResetScores={handleResetScores}
            />
          </>
        )}
      </div>
    </div>
  );
}