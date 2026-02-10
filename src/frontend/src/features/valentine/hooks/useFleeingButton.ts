import { useRef, useState, useCallback } from 'react';

interface ButtonPosition {
  left: string;
  top: string;
}

export function useFleeingButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonStyle, setButtonStyle] = useState<ButtonPosition>({
    left: 'auto',
    top: 'auto',
  });
  const isFleeingRef = useRef(false);

  const moveButton = useCallback(() => {
    if (!buttonRef.current || isFleeingRef.current) return;

    isFleeingRef.current = true;

    const button = buttonRef.current;
    const buttonRect = button.getBoundingClientRect();
    const buttonWidth = buttonRect.width;
    const buttonHeight = buttonRect.height;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const padding = 20;
    const maxLeft = viewportWidth - buttonWidth - padding;
    const maxTop = viewportHeight - buttonHeight - padding;

    let newLeft = Math.random() * maxLeft;
    let newTop = Math.random() * maxTop;

    newLeft = Math.max(padding, Math.min(newLeft, maxLeft));
    newTop = Math.max(padding, Math.min(newTop, maxTop));

    setButtonStyle({
      left: `${newLeft}px`,
      top: `${newTop}px`,
    });

    setTimeout(() => {
      isFleeingRef.current = false;
    }, 300);
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;

      const button = buttonRef.current;
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );

      const threshold = 100;

      if (distance < threshold) {
        moveButton();
      }
    },
    [moveButton]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      moveButton();
    },
    [moveButton]
  );

  return {
    buttonRef,
    buttonStyle: {
      ...buttonStyle,
      position: buttonStyle.left !== 'auto' ? ('fixed' as const) : ('relative' as const),
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    handlePointerMove,
    handlePointerDown,
  };
}
