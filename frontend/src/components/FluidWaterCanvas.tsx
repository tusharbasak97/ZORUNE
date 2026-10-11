import React, { useEffect, useRef } from 'react';

interface FluidWaterCanvasProps {
  className?: string;
  themeColor?: 'gold' | 'champagne' | 'liquid';
  interactiveIntensity?: number;
  variant?: 'hero' | '404' | 'ambient';
}

/**
 * FluidWaterCanvas
 * Ultra-luxury fluid Extrait de Parfum liquid maceration canvas.
 * Designed with high-fashion aesthetic principles:
 * - Ethereal, slow-breathing ambient liquid caustic pools
 * - Silky, non-intrusive contour waves framed at the periphery
 * - Delicate, single-ring oil refraction caustics on cursor interaction
 * - Micro-sheen fluid wake particles and soft viscous stirring glow
 * - Zero harsh geometric wireframes or typography interference
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

    // Ripple state
    interface Ripple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      intensity: number;
      speed: number;
    }

    // Trailing fluid particles
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
      lastSpawnTime: 0
    };
    let time = 0;

    const addRipple = (x: number, y: number, intensity = 1.0) => {
      const baseIntensity = variant === '404' ? 1.4 : 1.0;
      ripples.push({
        x,
        y,
        radius: 12,
        maxRadius: Math.min(width, height) * (variant === '404' ? 0.45 : 0.38),
        intensity: Math.min(intensity * interactiveIntensity * baseIntensity, 2.0),
        speed: 2.2 + Math.random() * 0.8
      });
      // Keep strictly capped to prevent clutter
      if (ripples.length > 7) {
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
        const now = performance.now();

        mouse.speed = dist;
        mouse.x = Math.max(0, Math.min(width, x));
        mouse.y = Math.max(0, Math.min(height, y));
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;

        // Elegant micro wake particles
        if (dist > 4 && wakePoints.length < 25) {
          wakePoints.push({
            x: mouse.x,
            y: mouse.y,
            radius: Math.min(10, 2 + dist * 0.25),
            alpha: 0.35,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
          });
        }

        // Throttle ripple creation: requires velocity and at least 140ms cooldown
        if (dist > 18 && (now - mouse.lastSpawnTime > 140)) {
          addRipple(mouse.x, mouse.y, Math.min(dist / 14, 1.4));
          mouse.lastSpawnTime = now;
        }
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Initial subtle ambient splash at edges
    addRipple(width * 0.25, height * 0.25, 0.8);
    addRipple(width * 0.75, height * 0.7, 0.7);

    const render = () => {
      time += 0.012;

      ctx.clearRect(0, 0, width, height);

      // ─── 1. AMBIENT EXTRAIT MACERATION POOLS (Silky, ethereal glowing pools) ───
      const poolRadius1 = Math.min(width, height) * 0.42;
      const p1x = width * 0.22 + Math.sin(time * 0.4) * 45;
      const p1y = height * 0.28 + Math.cos(time * 0.32) * 35;
      const grad1 = ctx.createRadialGradient(p1x, p1y, 0, p1x, p1y, poolRadius1);
      grad1.addColorStop(0, 'oklch(0.683 0.102 82.6 / 0.045)');
      grad1.addColorStop(0.6, 'oklch(0.683 0.102 82.6 / 0.012)');
      grad1.addColorStop(1, 'oklch(0.683 0.102 82.6 / 0)');
      ctx.fillStyle = grad1;
      ctx.beginPath();
      ctx.arc(p1x, p1y, poolRadius1, 0, Math.PI * 2);
      ctx.fill();

      const poolRadius2 = Math.min(width, height) * 0.48;
      const p2x = width * 0.78 + Math.cos(time * 0.35) * 50;
      const p2y = height * 0.72 + Math.sin(time * 0.28) * 40;
      const grad2 = ctx.createRadialGradient(p2x, p2y, 0, p2x, p2y, poolRadius2);
      grad2.addColorStop(0, 'oklch(0.74 0.14 85 / 0.038)');
      grad2.addColorStop(0.55, 'oklch(0.74 0.14 85 / 0.01)');
      grad2.addColorStop(1, 'oklch(0.74 0.14 85 / 0)');
      ctx.fillStyle = grad2;
      ctx.beginPath();
      ctx.arc(p2x, p2y, poolRadius2, 0, Math.PI * 2);
      ctx.fill();

      // ─── 2. SILKY PERIPHERY FLUID RIBBONS (Framing the canvas without obstructing text) ───
      // Top fluid wave
      ctx.beginPath();
      const topBase = height * 0.16;
      ctx.moveTo(0, topBase);
      for (let x = 0; x <= width; x += 24) {
        const yOffset = Math.sin(x * 0.0022 + time * 0.6) * 12 + Math.cos(x * 0.0012 - time * 0.4) * 8;
        ctx.lineTo(x, topBase + yOffset);
      }
      ctx.strokeStyle = 'oklch(0.683 0.102 82.6 / 0.045)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // Bottom fluid wave
      ctx.beginPath();
      const btmBase = height * 0.84;
      ctx.moveTo(0, btmBase);
      for (let x = 0; x <= width; x += 24) {
        const yOffset = Math.sin(x * 0.0028 - time * 0.5) * 14 + Math.cos(x * 0.0016 + time * 0.3) * 9;
        ctx.lineTo(x, btmBase + yOffset);
      }
      ctx.strokeStyle = 'oklch(0.683 0.102 82.6 / 0.04)';
      ctx.lineWidth = 1.0;
      ctx.stroke();

      // ─── 3. TRAILING FLUID WAKE PARTICLES (Micro-sheen oil droplets) ───
      for (let i = wakePoints.length - 1; i >= 0; i--) {
        const wp = wakePoints[i];
        wp.x += wp.vx;
        wp.y += wp.vy;
        wp.radius += 0.2;
        wp.alpha *= 0.93;

        if (wp.alpha < 0.015) {
          wakePoints.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.radius, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.683 0.102 82.6 / ${(wp.alpha * 0.12).toFixed(3)})`;
        ctx.fill();
      }

      // ─── 4. INTERACTIVE PERFUME OIL REFRACTION RIPPLES (Ultra-soft single meniscus & caustics) ───
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.speed *= 0.99; // Viscous deceleration
        r.intensity *= 0.978; // Fluid decay

        const progress = r.radius / r.maxRadius;
        if (r.intensity < 0.02 || progress >= 1) {
          ripples.splice(i, 1);
          continue;
        }

        const fade = (1 - progress) * r.intensity;

        // Inner refraction fluid wash
        const rippleGrad = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, r.radius);
        rippleGrad.addColorStop(0, `oklch(0.683 0.102 82.6 / ${(fade * 0.025).toFixed(3)})`);
        rippleGrad.addColorStop(0.85, `oklch(0.683 0.102 82.6 / ${(fade * 0.04).toFixed(3)})`);
        rippleGrad.addColorStop(1, 'oklch(0.683 0.102 82.6 / 0)');
        ctx.fillStyle = rippleGrad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();

        // Delicate outer water meniscus ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        const ringAlpha = (fade * (variant === '404' ? 0.22 : 0.14)).toFixed(3);
        ctx.strokeStyle = `oklch(0.683 0.102 82.6 / ${ringAlpha})`;
        ctx.lineWidth = Math.max(0.6, 1.2 * (1 - progress));
        ctx.stroke();
      }

      // ─── 5. CURSOR FLUID STIRRING GLOW (Viscous oil light under mouse) ───
      if (mouse.speed > 0.4) {
        const stirRadius = Math.min(85, 30 + mouse.speed * 1.8);
        const stirGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, stirRadius);
        stirGrad.addColorStop(0, 'oklch(0.683 0.102 82.6 / 0.065)');
        stirGrad.addColorStop(0.5, 'oklch(0.74 0.14 85 / 0.025)');
        stirGrad.addColorStop(1, 'oklch(0.683 0.102 82.6 / 0)');

        ctx.fillStyle = stirGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, stirRadius, 0, Math.PI * 2);
        ctx.fill();

        mouse.speed *= 0.90;
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

  const isAbsolute = className.includes('absolute');
  return (
    <div className={`overflow-hidden ${isAbsolute ? '' : 'relative'} ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block absolute inset-0 opacity-95 transition-opacity duration-700 pointer-events-none"
      />
    </div>
  );
};
