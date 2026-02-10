export function getPointerCoordinates(e: PointerEvent | React.PointerEvent): { x: number; y: number } {
  return {
    x: e.clientX,
    y: e.clientY,
  };
}

export function calculateDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(value, max));
}
