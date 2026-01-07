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
    handleInput(index);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl opacity-10 animate-bounce">🌟</div>
        <div className="absolute top-20 right-20 text-5xl opacity-10 animate-pulse">✨</div>
        <div className="absolute bottom-20 left-20 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>⭐</div>
        <div className="absolute bottom-10 right-10 text-5xl opacity-10 animate-pulse" style={{ animationDelay: '0.5s' }}>💫</div>
        <div className="absolute top-1/2 left-5 text-3xl opacity-5 animate-bounce" style={{ animationDelay: '0.7s' }}>🎮</div>
        <div className="absolute top-1/3 right-5 text-3xl opacity-5 animate-pulse" style={{ animationDelay: '0.3s' }}>🧠</div>
      </div>

      <div className="w-full max-w-md relative z-10">
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
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-border/50">
            <SettingsPanel
              settings={settings}
              onUpdateSettings={updateSettings}
              onClose={() => setScreen('menu')}
            />
          </div>
        )}

        {screen === 'leaderboard' && (
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl shadow-2xl border-2 border-border/50">
            <Leaderboard
              scores={getAllHighScores()}
              onClose={() => setScreen('menu')}
            />
          </div>
        )}

        {screen === 'game' && (
          <div className="flex flex-col items-center gap-6">
            {/* 返回按钮 */}
            <div className="w-full flex justify-start">
              <Button
                variant="ghost"
                onClick={handleBackToMenu}
                className="rounded-xl font-semibold hover:bg-card/50"
              >
                <span className="mr-2">←</span> 返回
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

                {/* 模式提示 */}
                <div className="text-sm text-muted-foreground/70 mt-2">
                  {settings.mode === 'number' ? '🔢 数字模式' : '🎨 颜色模式'}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
