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
        'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl font-bold text-2xl sm:text-3xl',
        'transition-all duration-200 transform',
        'shadow-lg hover:shadow-xl',
        'focus:outline-none focus:ring-4 focus:ring-primary/50',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        mode === 'color' ? color.class : 'bg-card border-2 border-border',
        mode === 'color' ? 'text-white' : 'text-foreground',
        isHighlighted && 'animate-highlight scale-110 ring-4 ring-accent',
        !isDisabled && !isHighlighted && 'hover:scale-105 active:scale-95',
      )}
    >
      {mode === 'number' ? index + 1 : ''}
    </button>
  );
};
