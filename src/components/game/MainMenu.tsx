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
    <div className="flex flex-col items-center gap-6 p-6 animate-fade-up">
      {/* 标题 */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
          记忆大师
        </h1>
        <p className="text-muted-foreground">挑战你的记忆极限！</p>
      </div>

      {/* 表情装饰 */}
      <div className="text-6xl animate-bounce-in">🧠✨</div>

      {/* 最高分展示 */}
      {highScore && (
        <div className="bg-card rounded-2xl px-6 py-3 shadow-md">
          <span className="text-muted-foreground">最高分: </span>
          <span className="text-xl font-bold text-accent">{highScore.score}</span>
          <span className="text-sm text-muted-foreground ml-2">
            ({DIFFICULTY_CONFIG[highScore.difficulty].label})
          </span>
        </div>
      )}

      {/* 模式选择 */}
      <div className="w-full max-w-xs space-y-3">
        <Button
          onClick={() => onSelectMode('number')}
          size="lg"
          className={cn(
            'w-full py-8 rounded-2xl text-xl',
            settings.mode === 'number' && 'ring-2 ring-primary ring-offset-2'
          )}
        >
          <span className="mr-3 text-2xl">🔢</span>
          数字模式
        </Button>
        
        <Button
          onClick={() => onSelectMode('color')}
          size="lg"
          variant="secondary"
          className={cn(
            'w-full py-8 rounded-2xl text-xl',
            settings.mode === 'color' && 'ring-2 ring-secondary ring-offset-2'
          )}
        >
          <span className="mr-3 text-2xl">🎨</span>
          颜色模式
        </Button>
      </div>

      {/* 底部按钮 */}
      <div className="flex gap-4 mt-4">
        <Button
          onClick={onOpenSettings}
          variant="outline"
          size="lg"
          className="rounded-xl px-6"
        >
          ⚙️ 设置
        </Button>
        <Button
          onClick={onOpenLeaderboard}
          variant="outline"
          size="lg"
          className="rounded-xl px-6"
        >
          🏆 排行榜
        </Button>
      </div>
    </div>
  );
};
