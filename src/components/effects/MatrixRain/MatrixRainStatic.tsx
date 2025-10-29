'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainStaticProps {
  intensity?: number;
  speed?: number;
}

export function MatrixRainStatic({ intensity = 15, speed = 1.5 }: MatrixRainStaticProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Detectar mobile
    const isMobile = window.innerWidth < 768;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Caracteres que vão cair - apenas 0 e 1 com espaço
    const chars = ['0', '1'];
    
    // Fonte menor em mobile para mais economia
    const fontSize = isMobile ? 24 : 30;
    
    // Espaçamento entre colunas - dobrado para mais espaço
    const columnSpacing = fontSize * 2;
    const columns = Math.floor(canvas.width / columnSpacing);
    
    // Intervalo de animação muito mais lento para queda suave
    const animationInterval = isMobile ? 150 : 120;

    // Array de gotas (uma por coluna) - APENAS 5% das colunas têm gotas
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      // Apenas 5% das colunas iniciam com gotas
      drops[i] = Math.random() > 0.95 ? 1 : -100;
    }

    // Função de desenho
    function draw() {
      if (!ctx || !canvas) return;
      
      // Fundo preto semi-transparente para criar trail (mais fade para ser sutil)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = fontSize + 'px monospace';

      // Loop através das gotas
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * columnSpacing;
        const y = drops[i] * fontSize;
        ctx.fillStyle = Math.random() > 0.3 ? '#CFFF04' : '#CAE7F7';
        
        // Só desenhar se a gota estiver visível
        if (drops[i] > 0) {
          ctx.fillText(text, x, y);
        }

        // Resetar gota ao topo aleatoriamente depois de cair (extremamente esparso)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.995) {
          drops[i] = Math.random() > 0.9 ? 0 : -100; // 90% chance de não resetar
        }

        // Incrementar Y baseado na velocidade (só se estiver visível)
        if (drops[i] > 0) {
          drops[i] += speed * 0.1;
        }
      }
    }

    // Animar com intervalo definido acima
    const interval = setInterval(draw, animationInterval);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [intensity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 1,
        opacity: window.innerWidth < 768 ? 0.1 : 0.15 // Mais sutil em mobile
      }}
    />
  );
}

export default MatrixRainStatic;
