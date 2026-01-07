import { useState, useEffect, useCallback } from 'react';
import { MainMenu } from '@/components/game/MainMenu';
import { GameBoard } from '@/components/game/GameBoard';
import { GameStatus } from '@/components/game/GameStatus';
import { GameOver } from '@/components/game/GameOver';
import { SettingsPanel } from '@/components/game/SettingsPanel';
import { Leaderboard } from '@/components/game/Leaderboard';
import { Button } from '@/components/ui/button';
import { useGameState } from '@/hooks/useGameState';
import { useSound } from '@/hooks/useSound';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { GameMode } from '@/types/game';

type Screen = 'menu' | 'game' | 'settings' | 'leaderboard';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('menu');
  const [isNewRecord, setIsNewRecord] = useState(false);
  
  const { settings, updateSettings, addHighScore, getHighScore, getAllHighScores } = useLocalStorage();
  const { state, config, startGame, nextLevel, handleInput, setPhase, setShowingIndex, resetGame } = useGameState(settings);
  const sound = useSound(settings.soundEnabled);

  const currentHighScore = getHighScore(settings.mode, settings.difficulty);

  // 显示序列逻辑
  useEffect(() => {
    if (state.phase !== 'showing') return;

    let currentIndex = 0;
    
    const showNext = () => {
      if (currentIndex < state.sequence.length) {
        setShowingIndex(state.sequence[currentIndex]);
        sound.playSequenceNote(state.sequence[currentIndex]);
        
        setTimeout(() => {
          setShowingIndex(-1);
          currentIndex++;
          
          if (currentIndex < state.sequence.length) {
            setTimeout(showNext, 200);
          } else {
            setTimeout(() => setPhase('input'), 300);
          }
        }, config.displayTime);
      }
    };

    const timer = setTimeout(showNext, 500);
    return () => clearTimeout(timer);
  }, [state.phase, state.sequence, config.displayTime, setPhase, setShowingIndex, sound]);

  // 成功后进入下一关
  useEffect(() => {
    if (state.phase === 'success') {
      sound.playSuccess();
      const timer = setTimeout(() => {
        nextLevel();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [state.phase, nextLevel, sound]);

  // 失败处理
  useEffect(() => {
    if (state.phase === 'failure') {
      sound.playFailure();
      const newRecord = addHighScore(state.score, state.level, settings.mode, settings.difficulty);
      setIsNewRecord(newRecord);
      if (newRecord) {
        setTimeout(() => sound.playNewRecord(), 500);
      }
    }
  }, [state.phase, state.score, state.level, settings.mode, settings.difficulty, addHighScore, sound]);

  const handleSelectMode = useCallback((mode: GameMode) => {
    updateSettings({ mode });
    setScreen('game');
    setTimeout(startGame, 100);
  }, [updateSettings, startGame]);

  const handleButtonClick = useCallback((index: number) => {
    if (state.phase !== 'input') return;
    
    sound.playClick();
    const result = handleInput(index);
    
    if (!result.correct) {
      // 失败会自动在 useEffect 中处理
    }
  }, [state.phase, handleInput, sound]);

  const handlePlayAgain = useCallback(() => {
    setIsNewRecord(false);
    startGame();
  }, [startGame]);

  const handleBackToMenu = useCallback(() => {
    resetGame();
    setIsNewRecord(false);
    setScreen('menu');
  }, [resetGame]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        {screen === 'menu' && (
          <MainMenu
            settings={settings}
            highScore={currentHighScore}
            onSelectMode={handleSelectMode}
            onOpenSettings={() => setScreen('settings')}
            onOpenLeaderboard={() => setScreen('leaderboard')}
          />
        )}

        {screen === 'settings' && (
          <SettingsPanel
            settings={settings}
            onUpdateSettings={updateSettings}
            onClose={() => setScreen('menu')}
          />
        )}

        {screen === 'leaderboard' && (
          <Leaderboard
            scores={getAllHighScores()}
            onClose={() => setScreen('menu')}
          />
        )}

        {screen === 'game' && (
          <div className="flex flex-col items-center gap-6">
            {/* 返回按钮 */}
            <div className="w-full flex justify-start">
              <Button
                variant="ghost"
                onClick={handleBackToMenu}
                className="rounded-xl"
              >
                ← 返回
              </Button>
            </div>

            {state.phase === 'failure' ? (
              <GameOver
                score={state.score}
                level={state.level}
                highScore={currentHighScore?.score ?? null}
                isNewRecord={isNewRecord}
                onPlayAgain={handlePlayAgain}
                onBackToMenu={handleBackToMenu}
              />
            ) : (
              <>
                <GameStatus
                  phase={state.phase}
                  level={state.level}
                  score={state.score}
                  sequenceLength={state.sequence.length}
                  currentIndex={state.phase === 'showing' ? 
                    state.sequence.indexOf(state.showingIndex) : 
                    state.playerInput.length}
                />

                <GameBoard
                  mode={settings.mode}
                  highlightedIndex={state.showingIndex}
                  isInputPhase={state.phase === 'input'}
                  onButtonClick={handleButtonClick}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
