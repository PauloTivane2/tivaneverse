'use client';

import { useEffect, useRef, useState } from 'react';

interface MatrixRainStaticProps {
  intensity?: number; // quanto mais alto, mais gotas visíveis
  speed?: number; // velocidade das gotas
}

export function MatrixRainStatic({ intensity = 15, speed = 1.5 }: MatrixRainStaticProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile e redimensionar canvas
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === 'undefined') return;

      setIsMobile(window.innerWidth < 768);

      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Lógica de animação
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const fontSize = isMobile ? 24 : 30;
    const columnSpacing = fontSize * 2;
    const columns = Math.floor(canvas.width / columnSpacing);

    const chars = ['0', '1'];
    const drops: number[] = [];

    // Inicializa drops com base na intensidade
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() < intensity / 100 ? 1 : -100; // ajusta visibilidade pela intensidade
    }

    let animationFrameId: number;

    const draw = () => {
      if (!ctx || !canvas) return;

      // Fundo semi-transparente para efeito trail
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnSpacing;
        const y = drops[i] * fontSize;

        ctx.fillStyle = Math.random() > 0.3 ? '#CFFF04' : '#CAE7F7';

        if (drops[i] > 0) ctx.fillText(text, x, y);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
          drops[i] = Math.random() > 0.9 ? 0 : -100;
        }

        if (drops[i] > 0) drops[i] += speed * 0.1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile, intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{
        zIndex: 1,
        opacity: isMobile ? 0.1 : 0.15, // mais sutil no mobile
      }}
    />
  );
}

export default MatrixRainStatic;
