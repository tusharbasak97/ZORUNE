import React, { useEffect, useRef } from 'react';

interface FluidWaterCanvasProps {
  className?: string;
  themeColor?: 'gold' | 'champagne' | 'liquid';
  interactiveIntensity?: number;
  variant?: 'hero' | '404' | 'ambient';
}

/**
 * FluidWaterCanvas
 * Re-creates and elevates Scentedelic's liquid wave / maceration effect.
 * Features:
 * - Viscous Extrait de Parfum liquid wave dynamics (data-warp, data-stir physics)
 * - Window-level pointer tracking: sweeping cursor anywhere stirs fluid waves
 * - Luminous champagne gold caustics & refraction ripples
 * - Fluid water wake trailing the cursor
 */
export const FluidWaterCanvas: React.FC<FluidWaterCanvasProps> = ({ 
  className = "absolute inset-0 pointer-events-auto",
  themeColor = 'gold',
  interactiveIntensity = 1.0,
  variant = 'hero'
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ripple particles
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      intensity: number;
      speed: number;
      waveCount: number;
    }

    // Trailing fluid particles from mouse wake
    interface WakePoint {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      vx: number;
      vy: number;
    }

    const ripples: Ripple[] = [];
    const wakePoints: WakePoint[] = [];

    let mouse = { 
      x: width * 0.5, 
      y: height * 0.5, 
      prevX: width * 0.5, 
      prevY: height * 0.5, 
      speed: 0,
      active: false 
    };
    let time = 0;

    const addRipple = (x: number, y: number, intensity = 1.0) => {
      const baseIntensity = variant === '404' ? 1.6 : 1.2;
      ripples.push({
        x,
        y,
        radius: 8,
        maxRadius: Math.min(width, height) * (variant === '404' ? 0.65 : 0.5),
        intensity: Math.min(intensity * interactiveIntensity * baseIntensity, 2.5),
        speed: 3.2 + Math.random() * 1.8,
        waveCount: 3
      });
      if (ripples.length > 40) {
        ripples.shift();
      }
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= -40 && x <= width + 40 && y >= -40 && y <= height + 40) {
        const dx = x - mouse.prevX;
        const dy = y - mouse.prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        mouse.speed = dist;
        mouse.x = Math.max(0, Math.min(width, x));
        mouse.y = Math.max(0, Math.min(height, y));
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        mouse.active = true;

        // Add fluid wake particles
        if (dist > 3) {
          wakePoints.push({
            x: mouse.x,
            y: mouse.y,
            radius: Math.min(18, 4 + dist * 0.4),
            alpha: 0.6,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8
          });
          if (wakePoints.length > 50) wakePoints.shift();
        }

        if (dist > 6) {
          addRipple(mouse.x, mouse.y, Math.min(dist / 10, 1.8));
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Initial ambient splash
    addRipple(width * 0.5, height * 0.42, 1.6);
    addRipple(width * 0.38, height * 0.52, 1.1);

    let lastDropTime = 0;

    const render = () => {
      time += 0.016;

      // Spontaneous ambient perfume drop every ~2.8s
      if (time - lastDropTime > 2.8) {
        lastDropTime = time;
        addRipple(
          width * 0.2 + Math.random() * (width * 0.6),
          height * 0.2 + Math.random() * (height * 0.6),
          1.2
        );
      }

      ctx.clearRect(0, 0, width, height);

      // Base warm liquid wash in OKLCH
      const baseGrad = ctx.createLinearGradient(0, 0, width, height);
      baseGrad.addColorStop(0, 'oklch(0.98 0.005 78.3 / 0.65)');
      baseGrad.addColorStop(0.5, 'oklch(0.959 0.01 87.5 / 0.45)');
      baseGrad.addColorStop(1, 'oklch(0.98 0.005 78.3 / 0.7)');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, width, height);

      // 1. Scentedelic-Style Liquid Wave Bands (Harmonic fluid warp)
      const waveCount = variant === '404' ? 9 : 7;
      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        const baseOffset = height * (0.15 + i * 0.1);
        const waveFreq = 0.0032 + i * 0.0009;
        const waveAmp = (variant === '404' ? 18 : 14) + i * 4.5;
        const phase = time * (0.95 + i * 0.18);

        ctx.moveTo(0, baseOffset);
        for (let x = 0; x <= width; x += 10) {
          const warpOffset = 
            Math.sin(x * waveFreq + phase) * waveAmp +
            Math.cos(x * waveFreq * 0.55 - phase * 0.65) * (waveAmp * 0.55) +
            Math.sin(x * 0.009 + time * 1.4) * (waveAmp * 0.28);
          
          ctx.lineTo(x, baseOffset + warpOffset);
        }

        // Visible, shimmering champagne gold caustic lines in OKLCH
        const goldAlpha = ((variant === '404' ? 0.12 : 0.08) + (i * 0.022)).toFixed(3);
        ctx.strokeStyle = `oklch(0.683 0.102 82.6 / ${goldAlpha})`;
        ctx.lineWidth = 1.4 + (i * 0.4);
        ctx.stroke();
      }

      // 2. Trailing Liquid Wake Particles
      for (let i = wakePoints.length - 1; i >= 0; i--) {
        const wp = wakePoints[i];
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.radius += 0.4;
        wp.alpha *= 0.94;

        if (wp.alpha < 0.02) {
          wakePoints.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.683 0.102 82.6 / ${(wp.alpha * 0.18).toFixed(3)})`;
        ctx.fill();
        ctx.restore();
      }

      // 3. Interactive Fluid Water Ripples with Refraction Distortion
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.intensity *= 0.981; // Fluid decay

        if (r.intensity < 0.015 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.save();
        
        // Ring 1: Outer wave distortion crest in OKLCH
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        const crestAlpha = (r.intensity * (variant === '404' ? 0.55 : 0.42)).toFixed(3);
        ctx.strokeStyle = `oklch(0.683 0.102 82.6 / ${crestAlpha})`;
        ctx.lineWidth = Math.max(1.4, 5.0 * (1 - r.radius / r.maxRadius));
        ctx.stroke();

        // Ring 2: Secondary harmonic refraction wave in OKLCH
        if (r.radius > 16) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(3, r.radius - 12), 0, Math.PI * 2);
          const innerAlpha1 = (r.intensity * 0.32).toFixed(3);
          ctx.strokeStyle = `oklch(0.74 0.14 85 / ${innerAlpha1})`;
          ctx.lineWidth = Math.max(1.0, 2.5 * (1 - r.radius / r.maxRadius));
          ctx.stroke();
        }

        // Ring 3: Tertiary inner caustic ring in OKLCH
        if (r.radius > 32) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, Math.max(3, r.radius - 26), 0, Math.PI * 2);
          const innerAlpha2 = (r.intensity * 0.20).toFixed(3);
          ctx.strokeStyle = `oklch(0.91 0.06 85 / ${innerAlpha2})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        ctx.restore();
      }

      // 4. Cursor Fluid Stirring Glow in OKLCH
      if (mouse.speed > 0.3) {
        const stirRadius = Math.min(130, 45 + mouse.speed * 2.8);
        const stirGradient = ctx.createRadialGradient(
          mouse.x, mouse.y, 4,
          mouse.x, mouse.y, stirRadius
        );
        stirGradient.addColorStop(0, 'oklch(0.683 0.102 82.6 / 0.22)');
        stirGradient.addColorStop(0.4, 'oklch(0.74 0.14 85 / 0.10)');
        stirGradient.addColorStop(1, 'oklch(0.683 0.102 82.6 / 0)');

        ctx.fillStyle = stirGradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, stirRadius, 0, Math.PI * 2);
        ctx.fill();

        mouse.speed *= 0.88;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [themeColor, interactiveIntensity, variant]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute inset-0 opacity-95 transition-opacity duration-700 pointer-events-none"
      />
    </div>
  );
};
