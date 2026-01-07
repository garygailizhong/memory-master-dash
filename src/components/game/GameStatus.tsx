import { GamePhase } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameStatusProps {
  phase: GamePhase;
  level: number;
  score: number;
  sequenceLength: number;
  currentIndex: number;
}

export const GameStatus = ({ phase, level, score, sequenceLength, currentIndex }: GameStatusProps) => {
  const getStatusText = () => {
    switch (phase) {
      case 'showing':
        return { emoji: '👀', text: '记住顺序！', color: 'text-primary' };
      case 'input':
        return { emoji: '👆', text: '轮到你了！', color: 'text-game-cyan' };
      case 'success':
        return { emoji: '🎉', text: '太棒了！', color: 'text-success' };
      case 'failure':
        return { emoji: '😅', text: '再试一次！', color: 'text-destructive' };
      default:
        return { emoji: '🎮', text: '准备开始', color: 'text-foreground' };
    }
  };

  const status = getStatusText();

  return (
    <div className="text-center space-y-4 animate-fade-up">
      {/* 分数和关卡 */}
      <div className="flex justify-center gap-4">
        <div className="bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl px-5 py-3 shadow-lg border-2 border-primary/20">
          <div className="text-xs text-muted-foreground font-medium">关卡</div>
          <div className="text-2xl font-extrabold text-primary">{level}</div>
        </div>
        <div className="bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl px-5 py-3 shadow-lg border-2 border-accent/20">
          <div className="text-xs text-muted-foreground font-medium">分数</div>
          <div className="text-2xl font-extrabold text-accent">{score}</div>
        </div>
      </div>
      
      {/* 状态提示 */}
      <div className={cn(
        'text-2xl sm:text-3xl font-extrabold py-4 flex items-center justify-center gap-3',
        status.color,
        phase === 'success' && 'animate-celebrate',
        phase === 'failure' && 'animate-shake',
      )}>
        <span className="text-4xl">{status.emoji}</span>
        <span>{status.text}</span>
      </div>

      {/* 进度指示器 */}
      {(phase === 'showing' || phase === 'input') && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: sequenceLength }, (_, i) => {
            const isCompleted = phase === 'showing' 
              ? i <= currentIndex 
              : i < currentIndex;
            const isCurrent = phase === 'showing' && i === currentIndex;
            
            return (
              <div
                key={i}
                className={cn(
                  'w-4 h-4 rounded-full transition-all duration-300 shadow-md',
                  isCompleted 
                    ? phase === 'showing' 
                      ? 'bg-primary scale-110' 
                      : 'bg-success scale-110'
                    : 'bg-muted/50',
                  isCurrent && 'animate-pulse ring-2 ring-primary ring-offset-2'
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
