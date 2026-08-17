import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedDotBackground({ theme = 'dark' }) {
  const canvasRef = useRef(null);
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const particleCount = Math.min(Math.floor(window.innerWidth / 22), 60);

    const dotColors = isDark
      ? ['rgba(168, 85, 247, 0.5)', 'rgba(16, 185, 129, 0.4)', 'rgba(59, 130, 246, 0.4)', 'rgba(236, 72, 153, 0.35)']
      : ['rgba(147, 51, 234, 0.35)', 'rgba(5, 150, 105, 0.3)', 'rgba(37, 99, 235, 0.3)', 'rgba(219, 39, 119, 0.3)'];

    const lineColor = isDark ? 'rgba(168, 85, 247, 0.09)' : 'rgba(147, 51, 234, 0.07)';

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
      vy: (Math.random() - 0.5) * (prefersReducedMotion ? 0.05 : 0.35),
      radius: Math.random() * 1.5 + 1,
      color: dotColors[Math.floor(Math.random() * dotColors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.6 * (1 - distance / 110);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme, isDark]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Subtle Grid / Radial Dot Pattern Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 opacity-20 ${
          isDark
            ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:28px_28px]'
            : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:28px_28px]'
        }`}
      />

      {/* Soft Blurred Purple Glowing Orb (Top Left) */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.15, 0.95, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute -top-32 -left-32 w-96 h-96 rounded-full blur-[110px] opacity-40 transition-colors duration-700 ${
          isDark ? 'bg-purple-600/30' : 'bg-purple-300/40'
        }`}
      />

      {/* Soft Blurred Emerald Glowing Orb (Bottom Right) */}
      <motion.div
        animate={{
          x: [0, -50, 35, 0],
          y: [0, 40, -30, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute -bottom-32 -right-32 w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-35 transition-colors duration-700 ${
          isDark ? 'bg-emerald-600/25' : 'bg-emerald-300/35'
        }`}
      />

      {/* Soft Blue Center Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full blur-[130px] transition-colors duration-700 ${
          isDark ? 'bg-blue-600/15' : 'bg-blue-200/30'
        }`}
      />

      {/* Canvas Particle Dots */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-85"
      />
    </div>
  );
}
