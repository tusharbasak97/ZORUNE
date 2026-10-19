import React, { useEffect, useRef } from 'react';

export interface FluidWaterCanvasProps {
  className?: string;
  themeColor?: 'gold' | 'champagne' | 'liquid';
  interactiveIntensity?: number;
  variant?: 'hero' | '404' | 'ambient' | 'flacon';
}

/**
 * FluidWaterCanvas — "L'Élixir Doré • Haute Parfumerie Ambient Light Caustics"
 * 
 * An ultra-refined, whisper-quiet liquid light and maceration caustics simulation
 * tailored for luxury fragrance maisons (Chanel, Hermès, Byredo aesthetic).
 * 
 * Key Principles:
 * 1. Quiet Luxury: ZERO heavy colored wave blocks, ZERO ocean-like slabs.
 * 2. Ethereal Caustic Sheen: Delicate, organic luminous filaments with soft champagne
 *    gradients that drift with hypnotic, slow-motion breathing.
 * 3. Viscous Hydrodynamic Refraction: Smooth, subtle response to cursor movement that
 *    softly bends the light filaments with high damping and natural dissipation.
 * 4. Transparent & Non-Intrusive: Maximum opacity is strictly controlled (0.03–0.12)
 *    so it never competes with flacon imagery, typography, or UI messages.
 */
export const FluidWaterCanvas: React.FC<FluidWaterCanvasProps> = ({ 
  className = "absolute inset-0 pointer-events-none",
  themeColor = 'champagne',
  interactiveIntensity = 0.6,
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

    // Spring-coupled fluid wave node
    interface CausticNode {
      x: number;
      baseY: number;
      height: number;
      speed: number;
    }

    interface CausticRay {
      baseYFraction: number;
      speedMult: number;
      freq: number;
      amplitude: number;
      strokeColor: string;
      glowColor: string;
      fillTop: string;
      fillBottom: string;
      lineWidth: number;
      phase: number;
      nodes: CausticNode[];
    }

    const nodeSpacing = 16;
    let nodeCount = Math.ceil(width / nodeSpacing) + 2;

    const createNodes = (baseYFraction: number): CausticNode[] => {
      const nodes: CausticNode[] = [];
      const baseY = height * baseYFraction;
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: i * nodeSpacing,
          baseY,
          height: 0,
          speed: 0
        });
      }
      return nodes;
    };

    // Color definitions in OKLCH — Whisper-soft, luxury quiet tones
    const getCausticRays = (): CausticRay[] => {
      if (variant === 'flacon') {
        return [];
      }

      const isGold = themeColor === 'gold';
      const alphaMult = variant === '404' ? 1.4 : variant === 'hero' ? 0.9 : 0.6;

      return [
        // Ray 1: Upper whisper-quiet champagne light filament
        {
          baseYFraction: 0.38,
          speedMult: 0.0006,
          freq: 0.0018,
          amplitude: 14,
          strokeColor: `oklch(0.92 0.06 86 / ${(0.18 * alphaMult).toFixed(3)})`,
          glowColor: `oklch(0.94 0.08 88 / ${(0.12 * alphaMult).toFixed(3)})`,
          fillTop: `oklch(0.92 0.05 85 / ${(0.035 * alphaMult).toFixed(3)})`,
          fillBottom: 'oklch(0.92 0.05 85 / 0)',
          lineWidth: 1.5,
          phase: 0.4,
          nodes: createNodes(0.38)
        },
        // Ray 2: Middle luminous Extrait caustic stream
        {
          baseYFraction: 0.58,
          speedMult: 0.0008,
          freq: 0.0022,
          amplitude: 18,
          strokeColor: isGold 
            ? `oklch(0.88 0.08 82 / ${(0.22 * alphaMult).toFixed(3)})` 
            : `oklch(0.90 0.07 86 / ${(0.20 * alphaMult).toFixed(3)})`,
          glowColor: `oklch(0.92 0.08 86 / ${(0.14 * alphaMult).toFixed(3)})`,
          fillTop: `oklch(0.88 0.07 82 / ${(0.04 * alphaMult).toFixed(3)})`,
          fillBottom: 'oklch(0.88 0.07 82 / 0)',
          lineWidth: 1.8,
          phase: 2.1,
          nodes: createNodes(0.58)
        },
        // Ray 3: Lower warm amber light refraction
        {
          baseYFraction: 0.78,
          speedMult: 0.0007,
          freq: 0.0016,
          amplitude: 16,
          strokeColor: `oklch(0.84 0.09 78 / ${(0.16 * alphaMult).toFixed(3)})`,
          glowColor: `oklch(0.86 0.09 80 / ${(0.10 * alphaMult).toFixed(3)})`,
          fillTop: `oklch(0.84 0.08 78 / ${(0.03 * alphaMult).toFixed(3)})`,
          fillBottom: 'oklch(0.84 0.08 78 / 0)',
          lineWidth: 1.5,
          phase: 4.2,
          nodes: createNodes(0.78)
        }
      ];
    };

    let rays = getCausticRays();

    const updateDimensions = () => {
      if (!canvas || !canvas.parentElement) return;
      const newW = canvas.parentElement.clientWidth || window.innerWidth;
      const newH = canvas.parentElement.clientHeight || window.innerHeight;
      if (newW !== width || newH !== height) {
        width = canvas.width = newW;
        height = canvas.height = newH;
        nodeCount = Math.ceil(width / nodeSpacing) + 2;
        rays = getCausticRays();
      }
    };

    window.addEventListener('resize', updateDimensions);
    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => updateDimensions());
      resizeObserver.observe(canvas.parentElement);
    }

    // Concentric flacon refraction ripples (for flacon variant only)
    interface SoftRipple {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      speed: number;
      alpha: number;
    }
    const flaconRipples: SoftRipple[] = [];

    const addFlaconRipple = (x: number, y: number) => {
      flaconRipples.push({
        x,
        y,
        radius: 6,
        maxRadius: Math.min(width, height) * 0.45,
        speed: 1.6,
        alpha: 0.28 * interactiveIntensity
      });
      if (flaconRipples.length > 4) flaconRipples.shift();
    };

    // Viscous perturbation on pointer move
    let prevX = width * 0.5;
    let prevY = height * 0.5;
    let lastFlaconDrop = Date.now();

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      if (x >= -40 && x <= width + 40 && y >= -40 && y <= height + 40) {
        const dx = x - prevX;
        const dy = y - prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 2) {
          if (variant === 'flacon') {
            const now = Date.now();
            if (now - lastFlaconDrop > 180) {
              addFlaconRipple(x, y);
              lastFlaconDrop = now;
            }
          } else {
            // Very gentle hydrodynamic impulse — no violent waves
            const force = Math.min(dist * 0.25 * interactiveIntensity, 12);
            rays.forEach((ray) => {
              const centerIndex = Math.round(x / nodeSpacing);
              const radius = 6;
              for (let i = centerIndex - radius; i <= centerIndex + radius; i++) {
                if (i >= 0 && i < ray.nodes.length) {
                  const factor = Math.cos(((Math.abs(i - centerIndex)) / radius) * (Math.PI / 2));
                  ray.nodes[i].speed -= force * factor * 0.2;
                }
              }
            });
          }
        }

        prevX = x;
        prevY = y;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // 1. Dedicated Flacon Variant: Subtle Crystal Refraction Aura
      if (variant === 'flacon') {
        const cx = width * 0.5;
        const cy = height * 0.5;
        const rad = Math.min(width, height) * 0.42;

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, 'oklch(0.94 0.05 88 / 0.12)');
        grad.addColorStop(0.5, 'oklch(0.88 0.07 84 / 0.05)');
        grad.addColorStop(1, 'oklch(0.88 0.07 84 / 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, rad, 0, Math.PI * 2);
        ctx.fill();

        // Render delicate concentric refraction rings
        for (let i = flaconRipples.length - 1; i >= 0; i--) {
          const r = flaconRipples[i];
          r.radius += r.speed;
          r.alpha *= 0.985;

          if (r.alpha <= 0.005 || r.radius >= r.maxRadius) {
            flaconRipples.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `oklch(0.88 0.07 86 / ${r.alpha.toFixed(3)})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
          ctx.restore();
        }
      }

      // 2. Caustic Light Rays for Hero, 404, and Ambient
      if (variant !== 'flacon') {
        rays.forEach((ray) => {
          const { nodes, speedMult, freq, amplitude, strokeColor, glowColor, fillTop, fillBottom, lineWidth, phase } = ray;

          // Physics update: damped spring + continuous harmonic breathing
          for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const harmonic = Math.sin(node.x * freq + time * speedMult * 1000 + phase) * amplitude
                           + Math.cos(node.x * (freq * 0.6) - time * 0.4) * (amplitude * 0.3);

            // Hooke's Law spring back towards equilibrium
            const displacement = node.height - harmonic;
            node.speed += -0.018 * displacement - 0.055 * node.speed;
            node.height += node.speed;
          }

          // Neighbor smoothing passes (viscous fluid coupling)
          for (let p = 0; p < 3; p++) {
            for (let i = 1; i < nodes.length - 1; i++) {
              const avg = (nodes[i - 1].height + nodes[i + 1].height) * 0.5;
              nodes[i].height += (avg - nodes[i].height) * 0.12;
            }
          }

          // Draw the delicate luminous caustic ray
          ctx.save();

          // A. Soft vertical luminous glow below the filament (fades into nothing)
          const rayGrad = ctx.createLinearGradient(0, nodes[0].baseY - 40, 0, nodes[0].baseY + 120);
          rayGrad.addColorStop(0, 'transparent');
          rayGrad.addColorStop(0.3, fillTop);
          rayGrad.addColorStop(1, fillBottom);

          ctx.beginPath();
          ctx.moveTo(0, height);
          ctx.lineTo(nodes[0].x, nodes[0].baseY + nodes[0].height);

          for (let i = 0; i < nodes.length - 1; i++) {
            const curr = nodes[i];
            const next = nodes[i + 1];
            const midX = (curr.x + next.x) * 0.5;
            const midY = (curr.baseY + curr.height + next.baseY + next.height) * 0.5;
            ctx.quadraticCurveTo(curr.x, curr.baseY + curr.height, midX, midY);
          }

          const last = nodes[nodes.length - 1];
          ctx.lineTo(last.x, last.baseY + last.height);
          ctx.lineTo(width, height);
          ctx.closePath();
          ctx.fillStyle = rayGrad;
          ctx.fill();

          // B. Fine Crystalline Filament with Soft Glow
          ctx.beginPath();
          ctx.moveTo(nodes[0].x, nodes[0].baseY + nodes[0].height);

          for (let i = 0; i < nodes.length - 1; i++) {
            const curr = nodes[i];
            const next = nodes[i + 1];
            const midX = (curr.x + next.x) * 0.5;
            const midY = (curr.baseY + curr.height + next.baseY + next.height) * 0.5;
            ctx.quadraticCurveTo(curr.x, curr.baseY + curr.height, midX, midY);
          }

          ctx.lineTo(last.x, last.baseY + last.height);
          ctx.strokeStyle = strokeColor;
          ctx.lineWidth = lineWidth;
          ctx.shadowBlur = 10;
          ctx.shadowColor = glowColor;
          ctx.stroke();

          ctx.restore();
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, [themeColor, interactiveIntensity, variant]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden="true"
    />
  );
};
