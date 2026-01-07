export type GameMode = 'number' | 'color';
export type GamePhase = 'idle' | 'showing' | 'input' | 'success' | 'failure';
export type Difficulty = 'easy' | 'normal' | 'hard';

export interface GameSettings {
  mode: GameMode;
  difficulty: Difficulty;
  soundEnabled: boolean;
}

export interface GameState {
  phase: GamePhase;
  sequence: number[];
  playerInput: number[];
  level: number;
  score: number;
  showingIndex: number;
}

export interface HighScore {
  mode: GameMode;
  difficulty: Difficulty;
  score: number;
  level: number;
  date: string;
}

export const DIFFICULTY_CONFIG = {
  easy: { displayTime: 1200, startLength: 3, label: '简单' },
  normal: { displayTime: 800, startLength: 3, label: '普通' },
  hard: { displayTime: 500, startLength: 4, label: '困难' },
} as const;

export const GAME_COLORS = [
  { id: 0, name: 'red', class: 'bg-game-red' },
  { id: 1, name: 'blue', class: 'bg-game-blue' },
  { id: 2, name: 'green', class: 'bg-game-green' },
  { id: 3, name: 'yellow', class: 'bg-game-yellow' },
  { id: 4, name: 'purple', class: 'bg-game-purple' },
  { id: 5, name: 'orange', class: 'bg-game-orange' },
  { id: 6, name: 'pink', class: 'bg-game-pink' },
  { id: 7, name: 'cyan', class: 'bg-game-cyan' },
] as const;
