import { GameButton } from './GameButton';
import { GameMode } from '@/types/game';

interface GameBoardProps {
  mode: GameMode;
  highlightedIndex: number;
  isInputPhase: boolean;
  onButtonClick: (index: number) => void;
}

export const GameBoard = ({ mode, highlightedIndex, isInputPhase, onButtonClick }: GameBoardProps) => {
  const buttonCount = 8;

  return (
    <div className="relative">
      {/* 装饰性背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 rounded-3xl -m-4" />
      
      <div className="grid grid-cols-4 gap-3 sm:gap-4 p-6 bg-card/50 rounded-3xl shadow-xl border-2 border-border/50 backdrop-blur-sm relative">
        {Array.from({ length: buttonCount }, (_, i) => (
          <GameButton
            key={i}
            index={i}
            mode={mode}
            isHighlighted={highlightedIndex === i}
            isDisabled={!isInputPhase}
            onClick={() => onButtonClick(i)}
          />
        ))}
      </div>
    </div>
  );
};
