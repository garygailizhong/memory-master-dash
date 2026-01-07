import { useState, useCallback } from 'react';
import { GameSettings, HighScore, GameMode, Difficulty } from '@/types/game';

const SETTINGS_KEY = 'memory-master-settings';
const SCORES_KEY = 'memory-master-scores';

const defaultSettings: GameSettings = {
  mode: 'number',
  difficulty: 'normal',
  soundEnabled: true,
};

export const useLocalStorage = () => {
  const [settings, setSettingsState] = useState<GameSettings>(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  const [highScores, setHighScoresState] = useState<HighScore[]>(() => {
    try {
      const stored = localStorage.getItem(SCORES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const saveSettings = useCallback((newSettings: GameSettings) => {
    setSettingsState(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  }, []);

  const updateSettings = useCallback((partial: Partial<GameSettings>) => {
    setSettingsState(prev => {
      const newSettings = { ...prev, ...partial };
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
      return newSettings;
    });
  }, []);

  const addHighScore = useCallback((score: number, level: number, mode: GameMode, difficulty: Difficulty): boolean => {
    const existing = highScores.find(s => s.mode === mode && s.difficulty === difficulty);
    const isNewRecord = !existing || score > existing.score;

    if (isNewRecord) {
      const newScore: HighScore = {
        mode,
        difficulty,
        score,
        level,
        date: new Date().toISOString(),
      };

      setHighScoresState(prev => {
        const filtered = prev.filter(s => !(s.mode === mode && s.difficulty === difficulty));
        const newScores = [...filtered, newScore];
        localStorage.setItem(SCORES_KEY, JSON.stringify(newScores));
        return newScores;
      });
    }

    return isNewRecord;
  }, [highScores]);

  const getHighScore = useCallback((mode: GameMode, difficulty: Difficulty): HighScore | null => {
    return highScores.find(s => s.mode === mode && s.difficulty === difficulty) || null;
  }, [highScores]);

  const getAllHighScores = useCallback((): HighScore[] => {
    return [...highScores].sort((a, b) => b.score - a.score);
  }, [highScores]);

  return {
    settings,
    saveSettings,
    updateSettings,
    addHighScore,
    getHighScore,
    getAllHighScores,
  };
};
