export interface GameScores {
  humanWins: number;
  aiWins: number;
  draws: number;
}

const SCORES_KEY = 'tic-tac-toe-scores';

export const getScores = (): GameScores => {
  if (typeof window === 'undefined') {
    return { humanWins: 0, aiWins: 0, draws: 0 };
  }

  try {
    const stored = localStorage.getItem(SCORES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading scores from localStorage:', error);
  }

  return { humanWins: 0, aiWins: 0, draws: 0 };
};

export const saveScores = (scores: GameScores): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
  } catch (error) {
    console.error('Error saving scores to localStorage:', error);
  }
};

export const resetScores = (): void => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(SCORES_KEY);
  } catch (error) {
    console.error('Error resetting scores in localStorage:', error);
  }
};