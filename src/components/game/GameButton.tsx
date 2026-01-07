import { cn } from '@/lib/utils';
import { GAME_COLORS } from '@/types/game';

interface GameButtonProps {
  index: number;
  mode: 'number' | 'color';
  isHighlighted: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export const GameButton = ({ index, mode, isHighlighted, isDisabled, onClick }: GameButtonProps) => {
  const color = GAME_COLORS[index];

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn(
        'w-18 h-18 sm:w-20 sm:h-20 rounded-2xl font-extrabold text-2xl sm:text-3xl',
        'transition-all duration-200 transform',
        'shadow-lg hover:shadow-xl',
        'focus:outline-none focus:ring-4 focus:ring-accent/50',
        'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
        'border-4',
        mode === 'color' 
          ? `${color.class} border-white/30 text-white` 
          : 'bg-gradient-to-br from-card to-muted border-primary/20 text-foreground',
        isHighlighted && 'animate-highlight scale-115 ring-4 ring-accent shadow-2xl',
        !isDisabled && !isHighlighted && 'hover:scale-110 active:scale-95 cursor-pointer',
      )}
      style={{
        width: '4.5rem',
        height: '4.5rem',
      }}
    >
      {mode === 'number' ? (
        <span className="drop-shadow-md">{index + 1}</span>
      ) : (
        <span className="text-xl opacity-80">●</span>
      )}
    </button>
  );
};
