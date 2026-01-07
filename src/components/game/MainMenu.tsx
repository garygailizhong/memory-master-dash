import { Button } from '@/components/ui/button';
import { GameMode, GameSettings, HighScore, DIFFICULTY_CONFIG } from '@/types/game';
import { cn } from '@/lib/utils';

interface MainMenuProps {
  settings: GameSettings;
  highScore: HighScore | null;
  onSelectMode: (mode: GameMode) => void;
  onOpenSettings: () => void;
  onOpenLeaderboard: () => void;
}

export const MainMenu = ({ 
  settings, 
  highScore, 
  onSelectMode, 
  onOpenSettings, 
  onOpenLeaderboard 
}: MainMenuProps) => {
  return (
    <div className="flex flex-col items-center gap-8 p-6 animate-fade-up relative">
      {/* 装饰性背景元素 */}
      <div className="absolute -top-10 -left-10 text-5xl opacity-20 animate-bounce">⭐</div>
      <div className="absolute -top-5 -right-8 text-4xl opacity-20 animate-pulse">✨</div>
      <div className="absolute -bottom-5 -left-5 text-3xl opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>🌟</div>
      <div className="absolute -bottom-10 -right-10 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '0.3s' }}>💫</div>

      {/* 标题区域 */}
      <div className="text-center space-y-3 relative">
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-3xl animate-bounce">🎮</div>
        <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-br from-primary via-game-pink to-accent bg-clip-text text-transparent drop-shadow-lg">
          记忆大师
        </h1>
        <p className="text-lg text-muted-foreground font-medium">
          🧠 挑战你的记忆极限！💪
        </p>
      </div>

      {/* 可爱大脑装饰 */}
      <div className="relative">
        <div className="text-7xl sm:text-8xl animate-bounce-in drop-shadow-xl">🧠</div>
        <div className="absolute -top-2 -right-2 text-3xl animate-star">✨</div>
        <div className="absolute -bottom-1 -left-2 text-2xl animate-star" style={{ animationDelay: '0.2s' }}>⭐</div>
      </div>

      {/* 最高分展示 */}
      {highScore && (
        <div className="bg-gradient-to-r from-accent/20 via-primary/20 to-accent/20 rounded-3xl px-8 py-4 shadow-lg border-2 border-accent/30 animate-pulse-glow">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <span className="text-muted-foreground font-medium">最高分</span>
              <span className="text-2xl font-extrabold text-accent ml-3">{highScore.score}</span>
            </div>
          </div>
        </div>
      )}

      {/* 模式选择 */}
      <div className="w-full max-w-sm space-y-4">
        <Button
          onClick={() => onSelectMode('number')}
          size="lg"
          className={cn(
            'w-full py-10 rounded-3xl text-xl font-bold',
            'bg-gradient-to-br from-primary to-game-purple hover:from-primary/90 hover:to-game-purple/90',
            'shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200',
            'border-4 border-primary/20',
            settings.mode === 'number' && 'ring-4 ring-accent ring-offset-4 ring-offset-background'
          )}
        >
          <span className="mr-4 text-3xl">🔢</span>
          数字模式
        </Button>
        
        <Button
          onClick={() => onSelectMode('color')}
          size="lg"
          className={cn(
            'w-full py-10 rounded-3xl text-xl font-bold',
            'bg-gradient-to-br from-game-cyan to-game-green hover:from-game-cyan/90 hover:to-game-green/90',
            'shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-200',
            'border-4 border-secondary/30 text-white',
            settings.mode === 'color' && 'ring-4 ring-accent ring-offset-4 ring-offset-background'
          )}
        >
          <span className="mr-4 text-3xl">🎨</span>
          颜色模式
        </Button>
      </div>

      {/* 底部按钮 */}
      <div className="flex gap-4 mt-2">
        <Button
          onClick={onOpenSettings}
          variant="outline"
          size="lg"
          className="rounded-2xl px-6 py-6 text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all border-2"
        >
          <span className="mr-2 text-xl">⚙️</span>
          设置
        </Button>
        <Button
          onClick={onOpenLeaderboard}
          variant="outline"
          size="lg"
          className="rounded-2xl px-6 py-6 text-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all border-2"
        >
          <span className="mr-2 text-xl">🏆</span>
          排行榜
        </Button>
      </div>

      {/* 底部提示 */}
      <p className="text-sm text-muted-foreground/70 mt-4">
        💡 选择模式开始游戏
      </p>
    </div>
  );
};
