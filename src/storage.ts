import type { PlayerProgress, LevelResult } from './types';

const STORAGE_KEY = 'kalsel_quiz_progress';
const PLAYER_KEY = 'kalsel_quiz_player';

export function saveProgress(progress: PlayerProgress): void {
  progress.lastPlayed = new Date().toISOString();
  progress.totalScore = Object.values(progress.levels).reduce((sum, l) => sum + l.score, 0);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function loadProgress(): PlayerProgress | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as PlayerProgress;
  } catch {
    return null;
  }
}

export function initProgress(playerName: string): PlayerProgress {
  const progress: PlayerProgress = {
    playerName,
    createdAt: new Date().toISOString(),
    levels: {},
    totalScore: 0,
    lastPlayed: new Date().toISOString(),
  };
  saveProgress(progress);
  return progress;
}

export function updateLevelResult(
  progress: PlayerProgress,
  level: number,
  result: Omit<LevelResult, 'attempts' | 'lastAttempt'>
): PlayerProgress {
  const existing = progress.levels[level];
  const attempts = existing ? existing.attempts + 1 : 1;
  const bestTime = existing
    ? Math.min(existing.bestTime, result.bestTime)
    : result.bestTime;

  progress.levels[level] = {
    ...result,
    attempts,
    bestTime,
    lastAttempt: new Date().toISOString(),
  };
  saveProgress(progress);
  return progress;
}

export function isLevelUnlocked(progress: PlayerProgress, level: number): boolean {
  if (level === 1) return true;
  const prev = progress.levels[level - 1];
  if (!prev) return false;
  return prev.completed;
}

export function getLevelStars(score: number, maxScore: number): number {
  const pct = (score / maxScore) * 100;
  if (pct >= 90) return 3;
  if (pct >= 70) return 2;
  if (pct >= 50) return 1;
  return 0;
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(PLAYER_KEY);
}

export function savePlayerName(name: string): void {
  localStorage.setItem(PLAYER_KEY, name);
}

export function loadPlayerName(): string | null {
  return localStorage.getItem(PLAYER_KEY);
}

export function getLeaderboard(): { name: string; score: number; date: string }[] {
  const raw = localStorage.getItem('kalsel_leaderboard');
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveToLeaderboard(name: string, score: number): void {
  const board = getLeaderboard();
  board.push({ name, score, date: new Date().toISOString() });
  board.sort((a, b) => b.score - a.score);
  localStorage.setItem('kalsel_leaderboard', JSON.stringify(board.slice(0, 10)));
}
