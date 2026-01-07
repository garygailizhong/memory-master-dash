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
        return '👀 记住顺序！';
      case 'input':
        return '👆 轮到你了！';
      case 'success':
        return '🎉 太棒了！';
      case 'failure':
        return '😅 再试一次！';
      default:
        return '准备开始';
    }
  };

  return (
    <div className="text-center space-y-3 animate-fade-up">
      <div className="flex justify-center gap-6 text-lg font-semibold">
        <div className="bg-card rounded-xl px-4 py-2 shadow-md">
          <span className="text-muted-foreground">关卡</span>
          <span className="ml-2 text-primary text-xl">{level}</span>
        </div>
        <div className="bg-card rounded-xl px-4 py-2 shadow-md">
          <span className="text-muted-foreground">分数</span>
          <span className="ml-2 text-accent text-xl">{score}</span>
        </div>
      </div>
      
      <div className={cn(
        'text-2xl font-bold py-3',
        phase === 'success' && 'text-success animate-celebrate',
        phase === 'failure' && 'text-destructive animate-shake',
      )}>
        {getStatusText()}
      </div>

      {phase === 'showing' && (
        <div className="flex justify-center gap-1">
          {Array.from({ length: sequenceLength }, (_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                i <= currentIndex ? 'bg-primary scale-110' : 'bg-muted'
              )}
            />
          ))}
        </div>
      )}

      {phase === 'input' && (
        <div className="flex justify-center gap-1">
          {Array.from({ length: sequenceLength }, (_, i) => (
            <div
              key={i}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-200',
                i < currentIndex ? 'bg-success' : 'bg-muted'
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
};
