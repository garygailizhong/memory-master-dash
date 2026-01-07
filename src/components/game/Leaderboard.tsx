import { Button } from '@/components/ui/button';
import { HighScore, DIFFICULTY_CONFIG } from '@/types/game';
import { cn } from '@/lib/utils';

interface LeaderboardProps {
  scores: HighScore[];
  onClose: () => void;
}

export const Leaderboard = ({ scores, onClose }: LeaderboardProps) => {
  const getModeEmoji = (mode: string) => mode === 'number' ? '🔢' : '🎨';
  
  return (
    <div className="flex flex-col gap-6 p-6 animate-fade-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🏆 排行榜</h2>
        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
          ✕
        </Button>
      </div>

      {scores.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎮</div>
          <p className="text-muted-foreground">还没有记录</p>
          <p className="text-sm text-muted-foreground">开始游戏创建你的第一个记录！</p>
        </div>
      ) : (
        <div className="space-y-3">
          {scores.map((score, index) => (
            <div
              key={`${score.mode}-${score.difficulty}`}
              className={cn(
                'bg-card rounded-xl p-4 flex items-center gap-4 shadow-md',
                index === 0 && 'ring-2 ring-accent'
              )}
            >
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg',
                index === 0 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
              )}>
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getModeEmoji(score.mode)}</span>
                  <span className="font-semibold">
                    {score.mode === 'number' ? '数字模式' : '颜色模式'}
                  </span>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {DIFFICULTY_CONFIG[score.difficulty].label}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  关卡 {score.level} · {new Date(score.date).toLocaleDateString('zh-CN')}
                </div>
              </div>
              <div className="text-2xl font-bold text-primary">{score.score}</div>
            </div>
          ))}
        </div>
      )}

      <Button onClick={onClose} variant="outline" size="lg" className="w-full rounded-xl py-6">
        返回
      </Button>
    </div>
  );
};
