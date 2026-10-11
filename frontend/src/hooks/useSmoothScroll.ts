import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export interface SmoothScrollOptions {
  duration?: number;
  wheelMultiplier?: number;
  touchMultiplier?: number;
}

/**
 * useSmoothScroll
 * Luxury kinematic smooth scrolling powered by Lenis.
 * 
 * - Normal / Home: Tuned with silky inertia (duration: 1.25s, wheelMultiplier: 1.0)
 *   giving a noticeable, floating, premium gliding momentum.
 * - Modal / Popups: Tuned for swift agility (duration: 0.45s, wheelMultiplier: 2.0)
 *   so scrolling through compact popups feels fast, effortless, and never sluggish.
 */
export function useSmoothScroll<T extends HTMLElement = HTMLDivElement>(
  isScrollable: boolean = true,
  isModal: boolean = false,
  options?: SmoothScrollOptions
) {
  const lenisRef = useRef<Lenis | null>(null);
  const containerRef = useRef<T | null>(null);

  // Global Lenis Init
  useEffect(() => {
    if (typeof window === 'undefined' || isModal) return;

    const lenis = new Lenis({
      duration: options?.duration ?? 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: options?.wheelMultiplier ?? 1.0,
      touchMultiplier: options?.touchMultiplier ?? 1.5,
      infinite: false,
      prevent: (node: any) => {
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
  }, [isModal, options?.duration, options?.wheelMultiplier, options?.touchMultiplier]);

  // Modal Lenis Init
  useEffect(() => {
    if (typeof window === 'undefined' || !isModal) return;

    if (!isScrollable) {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    let rafId: number;
    let lenisInstance: Lenis | null = null;
    let resizeObserver: ResizeObserver | null = null;
    let mutationObserver: MutationObserver | null = null;
    
    const timer = setTimeout(() => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      
      lenisInstance = new Lenis({
        wrapper: container,
        eventsTarget: container,
        duration: options?.duration ?? 0.45,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: options?.wheelMultiplier ?? 2.0,
        touchMultiplier: options?.touchMultiplier ?? 2.0,
        infinite: false,
        prevent: () => false,
      });

      lenisRef.current = lenisInstance;

      function raf(time: number) {
        if (lenisInstance) lenisInstance.raf(time);
        rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);

      // Auto-recalculate scroll boundaries when content dimensions change
      resizeObserver = new ResizeObserver(() => {
        lenisInstance?.resize();
      });
      resizeObserver.observe(container);

      const observeChildren = () => {
        if (!container) return;
        Array.from(container.children).forEach((child) => {
          resizeObserver?.observe(child);
        });
      };
      observeChildren();

      // Detect React DOM swaps (e.g. tab changes, conditional content)
      mutationObserver = new MutationObserver(() => {
        observeChildren();
        lenisInstance?.resize();
        requestAnimationFrame(() => {
          lenisInstance?.resize();
        });
      });

      mutationObserver.observe(container, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }, 40);

    return () => {
      clearTimeout(timer);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeObserver) resizeObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      if (lenisInstance) {
        lenisInstance.destroy();
        lenisInstance = null;
        lenisRef.current = null;
      }
    };
  }, [isModal, isScrollable, options?.duration, options?.wheelMultiplier, options?.touchMultiplier]);

  // Global start/stop handling
  useEffect(() => {
    if (!lenisRef.current || isModal) return;
    if (isScrollable) {
      lenisRef.current.start();
    } else {
      lenisRef.current.stop();
    }
  }, [isScrollable, isModal]);

  const scrollTo = (target: number | string | HTMLElement, scrollOptions?: { immediate?: boolean; offset?: number }) => {
    lenisRef.current?.scrollTo(target, scrollOptions);
  };

  const resize = () => {
    lenisRef.current?.resize();
  };

  const scrollToTop = (immediate = true) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    lenisRef.current?.resize();
    lenisRef.current?.scrollTo(0, { immediate });
    requestAnimationFrame(() => {
      lenisRef.current?.resize();
    });
  };

  return { lenisRef, containerRef, scrollTo, scrollToTop, resize };
}
