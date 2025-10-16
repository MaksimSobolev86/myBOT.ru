
import React, { useRef, useEffect } from 'react';

// Define the structure for a ball object
interface Ball {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  minBlur: number;
  maxBlur: number;
  color1: string;
  color2: string;
}

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w: number, h: number;
    let animationFrameId: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      ['#c026d3', '#db2777'], // Pink/Fuchsia
      ['#10b981', '#22d3ee'], // Green/Cyan
      ['#3b82f6', '#6366f1'], // Blue/Indigo
      ['#ff6bcb', '#ffd86b'], // Pink/Yellow
      ['#00f5c9', '#0099ff'], // Teal/Blue
    ];

    ballsRef.current = Array.from({ length: 5 }).map(() => {
      const gradient = colors[Math.floor(Math.random() * colors.length)];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 150 + Math.random() * 150,
        dx: (Math.random() - 0.5) * 0.4, // Increased speed for more noticeable movement
        dy: (Math.random() - 0.5) * 0.4, // Increased speed for more noticeable movement
        minBlur: 10 + Math.random() * 15, // Sharp state (10-25px blur)
        maxBlur: 120 + Math.random() * 80, // Blurry state (120-200px blur)
        color1: gradient[0],
        color2: gradient[1],
      };
    });
    
    const balls = ballsRef.current;

    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // A value that smoothly oscillates between 0 and 1.
      // The time multiplier is set to ~0.000105 to create a 60-second full cycle.
      // This means a full "breath" (blurry -> sharp -> blurry) takes one minute.
      // All balls are now synchronized to breathe together.
      const t = Math.sin(Date.now() * 0.000105) * 0.5 + 0.5;

      balls.forEach(b => {
        b.x += b.dx;
        b.y += b.dy;

        if (b.x < -b.r || b.x > w + b.r) b.dx *= -1;
        if (b.y < -b.r || b.y > h + b.r) b.dy *= -1;
        
        // When t=1 (closest), size is biggest. When t=0 (farthest), size is smallest.
        const size = b.r * (0.6 + 0.4 * t);
        
        // When t=1 (closest), blur is at its minimum (sharp). When t=0 (farthest), blur is at its maximum.
        const blur = b.minBlur + (b.maxBlur - b.minBlur) * (1 - t);
        
        // Opacity is higher when closer/sharper
        const alpha = 0.2 + 0.4 * t;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, size);
        grad.addColorStop(0, b.color1);
        grad.addColorStop(1, b.color2);

        ctx.globalAlpha = alpha;
        ctx.filter = `blur(${blur}px)`;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
      <canvas 
        ref={canvasRef} 
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -10,
            background: 'transparent',
        }}
      />
  );
};

export default React.memo(CanvasBackground);