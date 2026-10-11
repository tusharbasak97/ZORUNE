import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const circleRef = useRef<SVGCircleElement | null>(null);

  // Circular progress ring geometry
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.6637

  useEffect(() => {
    // Direct, ultra-fast real-time DOM update without React re-render overhead
    const updateProgressDirect = (progressRatio: number, currentScrollY: number) => {
      const clampedProgress = Math.min(1, Math.max(0, progressRatio));
      const offset = circumference * (1 - clampedProgress);

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset = `${offset}px`;
      }

      const shouldBeVisible = currentScrollY > 320;
      setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));
    };

    const handleNativeScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;
      updateProgressDirect(progress, currentScroll);
    };

    // Lenis listener attachment
    let unsubscribeLenis: (() => void) | undefined;
    const attachLenis = (lenisInstance: any) => {
      if (!lenisInstance || typeof lenisInstance.on !== 'function') return;
      if (unsubscribeLenis) unsubscribeLenis();

      const onLenisScroll = (e: any) => {
        const progress = typeof e?.progress === 'number' 
          ? e.progress 
          : (e?.scroll && lenisInstance.limit ? e.scroll / lenisInstance.limit : 0);
        const scrollVal = typeof e?.scroll === 'number' 
          ? e.scroll 
          : (window.scrollY || document.documentElement.scrollTop);
        
        updateProgressDirect(progress, scrollVal);
      };

      const off = lenisInstance.on('scroll', onLenisScroll);
      unsubscribeLenis = () => {
        if (typeof off === 'function') off();
        else if (typeof lenisInstance.off === 'function') lenisInstance.off('scroll', onLenisScroll);
      };

      // Immediate calculation from current Lenis state
      if (typeof lenisInstance.progress === 'number') {
        updateProgressDirect(lenisInstance.progress, lenisInstance.scroll || 0);
      }
    };

    // If Lenis is already available on window, attach immediately
    if ((window as any).lenis) {
      attachLenis((window as any).lenis);
    }

    // Also listen for lenis-init custom event if Lenis mounts right after this component
    const onLenisInit = (e: any) => {
      const instance = e?.detail || (window as any).lenis;
      if (instance) {
        attachLenis(instance);
      }
    };
    window.addEventListener('lenis-init', onLenisInit);

    // Passive native scroll & resize listeners for foolproof sync
    window.addEventListener('scroll', handleNativeScroll, { passive: true });
    window.addEventListener('resize', handleNativeScroll, { passive: true });

    // Initial calculation on mount
    handleNativeScroll();

    return () => {
      window.removeEventListener('scroll', handleNativeScroll);
      window.removeEventListener('resize', handleNativeScroll);
      window.removeEventListener('lenis-init', onLenisInit);
      if (unsubscribeLenis) unsubscribeLenis();
    };
  }, [circumference]);

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 0.8 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={`fixed bottom-20 min-[600px]:bottom-8 right-4 min-[600px]:right-18 sm:right-20 lg:right-22 xl:right-8 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Move to top"
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[oklch(0.179_0.004_286)] text-[oklch(0.98_0.005_78.3)] flex items-center justify-center border border-[oklch(0.683_0.102_82.6)]/40 hover:border-[oklch(0.683_0.102_82.6)] shadow-xl hover:shadow-[0_0_25px_oklch(0.683_0.102_82.6/0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
      >
        {/* Realtime Circular SVG Scroll Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
        >
          {/* Subtle Background Track */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-[oklch(0.262_0.007_286)]"
            strokeWidth="2.5"
            fill="transparent"
          />
          {/* Realtime Active Gold Progress Stroke (No CSS transition delay) */}
          <circle
            ref={circleRef}
            cx="24"
            cy="24"
            r={radius}
            className="stroke-[oklch(0.683_0.102_82.6)]"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Animated Arrow Icon */}
        <ArrowUp className="w-4 h-4 text-[oklch(0.98_0.005_78.3)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-all duration-300 transform group-hover:-translate-y-0.5" />

        {/* Subtle Luxury Tooltip on Hover */}
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md border border-[oklch(0.926_0.01_81.8)]/20 shadow-lg">
          Move to top
        </span>
      </button>
    </div>
  );
};
