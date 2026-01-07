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
    <div className="flex flex-col items-center gap-6 animate-fade-up p-6 relative">
      {/* 装饰元素 */}
      {isNewRecord && (
        <>
          <div className="absolute -top-4 -left-4 text-4xl animate-bounce">🎊</div>
          <div className="absolute -top-4 -right-4 text-4xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
        </>
      )}
      
      {/* 标题 */}
      <div className="text-center">
        {isNewRecord ? (
          <div className="space-y-2">
            <div className="text-6xl animate-celebrate">🏆</div>
            <h2 className="text-4xl font-extrabold text-accent animate-pulse-glow inline-block px-6 py-2 rounded-full bg-accent/10">
              新纪录！
            </h2>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-6xl">😊</div>
            <h2 className="text-3xl font-bold text-foreground">
              游戏结束
            </h2>
          </div>
        )}
      </div>

      {/* 分数卡片 */}
      <div className="bg-gradient-to-br from-card to-muted/50 rounded-3xl p-6 shadow-xl border-2 border-border/50 space-y-4 w-full max-w-xs">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium flex items-center gap-2">
            <span className="text-xl">📊</span> 本次得分
          </span>
          <span className={cn(
            'text-3xl font-extrabold',
            isNewRecord ? 'text-accent' : 'text-primary'
          )}>{score}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-medium flex items-center gap-2">
            <span className="text-xl">🎯</span> 到达关卡
          </span>
          <span className="text-2xl font-bold">{level}</span>
        </div>
        {highScore !== null && (
          <div className="flex justify-between items-center pt-3 border-t-2 border-border/50">
            <span className="text-muted-foreground font-medium flex items-center gap-2">
              <span className="text-xl">🏆</span> 历史最高
            </span>
            <span className={cn(
              'text-2xl font-bold',
              isNewRecord ? 'text-accent' : 'text-muted-foreground'
            )}>
              {isNewRecord ? score : highScore}
            </span>
          </div>
        )}
      </div>

      {/* 按钮 */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        <Button
          onClick={onPlayAgain}
          size="lg"
          className="w-full text-xl py-7 rounded-2xl font-bold bg-gradient-to-r from-primary to-game-purple hover:from-primary/90 hover:to-game-purple/90 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all"
        >
          <span className="mr-3 text-2xl">🔄</span>
          再玩一次
        </Button>
        <Button
          onClick={onBackToMenu}
          variant="outline"
          size="lg"
          className="w-full text-lg py-6 rounded-2xl font-semibold border-2 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
        >
          <span className="mr-2 text-xl">🏠</span>
          返回主页
        </Button>
      </div>
    </div>
  );
};
