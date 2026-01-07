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
    <div className="grid grid-cols-4 gap-3 sm:gap-4 p-4">
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
  );
};
