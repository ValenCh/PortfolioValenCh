import { useEffect, useRef } from 'react';

const CONNECT_DIST = 120;
const MOUSE_RADIUS = 140;
const MOBILE_BREAKPOINT = 768;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createParticles(count, width, height) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: rand(0, width),
      y: rand(0, height),
      vx: rand(-0.18, 0.18),
      vy: rand(-0.18, 0.18),
      r: rand(1, 2.4),
    });
  }
  return particles;
}

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

    function resize() {
      const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height };

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.round((width * height) / 22000) + 40;
      const minCount = isMobile ? 24 : 40;
      const maxCount = isMobile ? 34 : 60;
      const count = Math.max(minCount, Math.min(maxCount, target));
      particlesRef.current = createParticles(count, width, height);
    }

    function handleMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 };
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!prefersReduced && !rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    function drawFrame() {
      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.15;
            ctx.strokeStyle = `rgba(243, 200, 146, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(243, 200, 146, 0.4)';
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick() {
      const { width, height } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0.01) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.35;
          p.vx += (dx / dist) * force * 0.03;
          p.vy += (dy / dist) * force * 0.03;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }

      drawFrame();
      rafRef.current = requestAnimationFrame(tick);
    }

    resize();

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(document.documentElement);

    if (prefersReduced) {
      drawFrame();
    } else {
      if (!isCoarsePointer) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);
      }
      document.addEventListener('visibilitychange', handleVisibilityChange);
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      resizeObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', display: 'block' }}
    />
  );
}