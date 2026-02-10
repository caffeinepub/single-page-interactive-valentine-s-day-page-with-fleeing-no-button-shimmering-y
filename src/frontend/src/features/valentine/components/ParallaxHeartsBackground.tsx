import { useEffect, useRef } from 'react';

interface Heart {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

export default function ParallaxHeartsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize hearts
    const heartCount = 25;
    heartsRef.current = Array.from({ length: heartCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 15,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
    }));

    const drawHeart = (x: number, y: number, size: number, rotation: number, opacity: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;

      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      // Left side
      ctx.bezierCurveTo(
        -size / 2, -topCurveHeight,
        -size, topCurveHeight / 2,
        0, size
      );
      // Right side
      ctx.bezierCurveTo(
        size, topCurveHeight / 2,
        size / 2, -topCurveHeight,
        0, topCurveHeight
      );

      ctx.fillStyle = '#ff69b4';
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      heartsRef.current.forEach((heart) => {
        drawHeart(heart.x, heart.y, heart.size, heart.rotation, heart.opacity);

        // Move heart upward
        heart.y -= heart.speed;
        heart.rotation += heart.rotationSpeed;

        // Reset heart when it goes off screen
        if (heart.y + heart.size < 0) {
          heart.y = canvas.height + heart.size;
          heart.x = Math.random() * canvas.width;
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
}
