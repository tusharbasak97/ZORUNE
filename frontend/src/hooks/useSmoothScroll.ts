import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

/**
 * useSmoothScroll
 * Luxury kinematic smooth scrolling powered by Lenis.
 * Tuned with HIGH RESPONSE SENSITIVITY:
 * - duration: 0.75s (eliminates the floaty/sluggish lag of default smoothscrollers)
 * - wheelMultiplier: 1.25 (immediate onset upon first wheel/touch delta)
 * - exponential ease-out curve (snappy acceleration, silky deceleration)
 */
export function useSmoothScroll(isScrollable: boolean = true) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: 0.75,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.25,
      touchMultiplier: 1.5,
      infinite: false,
      prevent: (node) => {
        if (!node || typeof (node as HTMLElement).closest !== 'function') return false;
        const el = node as HTMLElement;
        return (
          el.hasAttribute?.('data-lenis-prevent') ||
          Boolean(el.closest?.('[data-lenis-prevent]')) ||
          Boolean(el.closest?.('[role="dialog"]')) ||
          Boolean(el.closest?.('.overflow-y-auto')) ||
          Boolean(el.closest?.('.overflow-auto'))
        );
      },
    });

    lenisRef.current = lenis;
    (window as any).lenis = lenis;
    window.dispatchEvent(new CustomEvent('lenis-init', { detail: lenis }));

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      if ((window as any).lenis === lenis) {
        delete (window as any).lenis;
      }
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;
    if (isScrollable) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [isScrollable]);

  return lenisRef;
}
