import { useEffect } from 'react';

interface NoConfirmationOverlayProps {
  onClose: () => void;
}

export default function NoConfirmationOverlay({ onClose }: NoConfirmationOverlayProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="overlay-backdrop absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div
        className="shake-animation relative z-10 max-w-md rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-2xl text-valentine-muted hover:text-valentine-accent transition-colors"
          aria-label="Close"
        >
          ×
        </button>
        
        <div className="text-center">
          <p className="text-3xl font-bold text-valentine-text">
            Are you REALLY sure? 🤔
          </p>
          <p className="mt-4 text-lg text-valentine-muted">
            Think about it... 💭
          </p>
          <button
            onClick={onClose}
            className="mt-6 rounded-full bg-valentine-accent px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95"
          >
            Let me reconsider
          </button>
        </div>
      </div>
    </div>
  );
}
