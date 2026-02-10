import { useFleeingButton } from '../hooks/useFleeingButton';

interface CTAButtonsProps {
  onYesClick: () => void;
  onNoClick: () => void;
}

export default function CTAButtons({ onYesClick, onNoClick }: CTAButtonsProps) {
  const { buttonRef, buttonStyle, handlePointerMove, handleClick } = useFleeingButton(onNoClick);

  return (
    <div className="relative flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
      <button
        onClick={onYesClick}
        className="yes-button group relative overflow-hidden rounded-full bg-valentine-accent px-12 py-4 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
      >
        <span className="relative z-10">Yes! 💖</span>
        <div className="shimmer-effect absolute inset-0" />
      </button>

      <button
        ref={buttonRef}
        onPointerMove={handlePointerMove}
        onClick={handleClick}
        className="no-button rounded-full border-2 border-valentine-muted bg-white/80 px-12 py-4 text-xl font-bold text-valentine-muted shadow-md transition-all hover:bg-white active:scale-95"
        style={buttonStyle}
      >
        No 😢
      </button>
    </div>
  );
}
