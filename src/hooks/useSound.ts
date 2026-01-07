import { useCallback, useRef } from 'react';

// 使用 Web Audio API 生成简单音效
const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const useSound = (enabled: boolean) => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = createAudioContext();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!enabled) return;

    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, [enabled, getContext]);

  const playSequenceNote = useCallback((index: number) => {
    // 不同音高对应不同按钮
    const frequencies = [262, 294, 330, 349, 392, 440, 494, 523]; // C4 到 C5
    playTone(frequencies[index % 8], 0.3, 'sine');
  }, [playTone]);

  const playClick = useCallback(() => {
    playTone(600, 0.1, 'square');
  }, [playTone]);

  const playSuccess = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getContext();
      const notes = [523, 659, 784]; // C5, E5, G5 - 大三和弦
      
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.1);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.1 + 0.3);

        oscillator.start(ctx.currentTime + i * 0.1);
        oscillator.stop(ctx.currentTime + i * 0.1 + 0.3);
      });
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, [enabled, getContext]);

  const playFailure = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.3);
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, [enabled, getContext]);

  const playNewRecord = useCallback(() => {
    if (!enabled) return;
    
    try {
      const ctx = getContext();
      const notes = [523, 659, 784, 1047]; // C5, E5, G5, C6
      
      notes.forEach((freq, i) => {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.15);

        gainNode.gain.setValueAtTime(0.25, ctx.currentTime + i * 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.15 + 0.4);

        oscillator.start(ctx.currentTime + i * 0.15);
        oscillator.stop(ctx.currentTime + i * 0.15 + 0.4);
      });
    } catch (e) {
      console.warn('Audio playback failed:', e);
    }
  }, [enabled, getContext]);

  return {
    playSequenceNote,
    playClick,
    playSuccess,
    playFailure,
    playNewRecord,
  };
};
