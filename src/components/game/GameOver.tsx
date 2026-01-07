import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GameOverProps {
  score: number;
  level: number;
  highScore: number | null;
  isNewRecord: boolean;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameOver = ({ score, level, highScore, isNewRecord, onPlayAgain, onBackToMenu }: GameOverProps) => {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-up p-6">
      {isNewRecord && (
        <div className="text-4xl animate-celebrate">🎊🏆🎊</div>
      )}
      
      <h2 className={cn(
        'text-3xl font-bold',
        isNewRecord ? 'text-accent' : 'text-foreground'
      )}>
        {isNewRecord ? '新纪录！' : '游戏结束'}
      </h2>

      <div className="bg-card rounded-2xl p-6 shadow-lg space-y-4 w-full max-w-xs">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">本次得分</span>
          <span className="text-2xl font-bold text-primary">{score}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">到达关卡</span>
          <span className="text-2xl font-bold">{level}</span>
        </div>
        {highScore !== null && (
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-muted-foreground">历史最高</span>
            <span className={cn(
              'text-2xl font-bold',
              isNewRecord ? 'text-accent' : 'text-muted-foreground'
            )}>
              {isNewRecord ? score : highScore}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="w-full text-lg py-6 rounded-2xl animate-pulse-glow"
        >
          🔄 再玩一次
        </Button>
        <Button
          onClick={onBackToMenu}
          variant="outline"
          size="lg"
          className="w-full text-lg py-6 rounded-2xl"
        >
          🏠 返回主页
        </Button>
      </div>
    </div>
  );
};
