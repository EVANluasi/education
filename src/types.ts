export type QuestionType = 'typing' | 'speech' | 'dragdrop' | 'multichoice';

export interface Question {
  id: string;
  level: number;
  type: QuestionType;
  question: string;
  answer: string;
  options?: string[];       // for drag-drop or multichoice
  hint?: string;
  image?: string;
  points: number;
}

export interface LevelConfig {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  type: QuestionType;
  color: string;
  icon: string;
  requiredScore: number;    // min score to unlock next
  totalQuestions: number;
}

export interface PlayerProgress {
  playerName: string;
  createdAt: string;
  levels: Record<number, LevelResult>;
  totalScore: number;
  lastPlayed: string;
}

export interface LevelResult {
  completed: boolean;
  score: number;
  maxScore: number;
  attempts: number;
  bestTime: number;         // seconds
  lastAttempt: string;
}

export interface GameState {
  currentPage: Page;
  currentLevel: number;
  currentQuestionIndex: number;
  score: number;
  startTime: number;
  answers: AnswerRecord[];
}

export interface AnswerRecord {
  questionId: string;
  userAnswer: string;
  correct: boolean;
  timeTaken: number;
}

export type Page = 'menu' | 'dashboard' | 'levelSelect' | 'game' | 'result' | 'leaderboard';
