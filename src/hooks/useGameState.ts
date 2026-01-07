import { useState, useCallback, useRef, useEffect } from 'react';
import { GameState, GameSettings, GamePhase, DIFFICULTY_CONFIG } from '@/types/game';

const generateSequence = (length: number): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * 8));
};

export const useGameState = (settings: GameSettings) => {
  const [state, setState] = useState<GameState>({
    phase: 'idle',
    sequence: [],
    playerInput: [],
    level: 1,
    score: 0,
    showingIndex: -1,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const config = DIFFICULTY_CONFIG[settings.difficulty];

  const clearTimeouts = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const startGame = useCallback(() => {
    clearTimeouts();
    const sequenceLength = config.startLength;
    const newSequence = generateSequence(sequenceLength);
    
    setState({
      phase: 'showing',
      sequence: newSequence,
      playerInput: [],
      level: 1,
      score: 0,
      showingIndex: -1,
    });
  }, [config.startLength, clearTimeouts]);

  const nextLevel = useCallback(() => {
    const newLevel = state.level + 1;
    const newSequence = generateSequence(config.startLength + newLevel - 1);
    
    setState(prev => ({
      ...prev,
      phase: 'showing',
      sequence: newSequence,
      playerInput: [],
      level: newLevel,
      showingIndex: -1,
    }));
  }, [state.level, config.startLength]);

  const handleInput = useCallback((index: number): { correct: boolean; complete: boolean } => {
    const expectedIndex = state.playerInput.length;
    const isCorrect = state.sequence[expectedIndex] === index;

    if (!isCorrect) {
      setState(prev => ({
        ...prev,
        phase: 'failure',
      }));
      return { correct: false, complete: false };
    }

    const newInput = [...state.playerInput, index];
    const isComplete = newInput.length === state.sequence.length;

    if (isComplete) {
      const levelScore = state.level * 10;
      setState(prev => ({
        ...prev,
        playerInput: newInput,
        phase: 'success',
        score: prev.score + levelScore,
      }));
      return { correct: true, complete: true };
    }

    setState(prev => ({
      ...prev,
      playerInput: newInput,
    }));

    return { correct: true, complete: false };
  }, [state.sequence, state.playerInput, state.level]);

  const setPhase = useCallback((phase: GamePhase) => {
    setState(prev => ({ ...prev, phase }));
  }, []);

  const setShowingIndex = useCallback((index: number) => {
    setState(prev => ({ ...prev, showingIndex: index }));
  }, []);

  const resetGame = useCallback(() => {
    clearTimeouts();
    setState({
      phase: 'idle',
      sequence: [],
      playerInput: [],
      level: 1,
      score: 0,
      showingIndex: -1,
    });
  }, [clearTimeouts]);

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeouts();
  }, [clearTimeouts]);

  return {
    state,
    config,
    startGame,
    nextLevel,
    handleInput,
    setPhase,
    setShowingIndex,
    resetGame,
  };
};
