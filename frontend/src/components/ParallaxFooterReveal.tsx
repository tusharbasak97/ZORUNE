import React from 'react';

/**
 * ParallaxFooterReveal
 * Anchored statically at the bottom of the viewport (fixed z-0):
 * - ZERO letter animations or movement (clean, motionless, monumental brand anchor)
 * - The upper page content and footer smoothly slide over/above it during scrolling
 * - When the user scrolls to the bottom of the page, the footer retracts upward to reveal this brand layer
 * - Creates the authentic illusion that all page content exists on a floating layer above the brand
 */
export const ParallaxFooterReveal: React.FC = () => {
  return (
    <div 
      aria-label="Atelier Monumental Monogram Anchor"
      className="fixed bottom-0 left-0 right-0 z-0 h-[260px] sm:h-[340px] lg:h-[380px] w-full overflow-hidden bg-[oklch(0.98_0.005_78.3)] border-t border-[oklch(0.926_0.01_81.8)] select-none pointer-events-none flex flex-col items-center justify-center px-4 pb-16 md:pb-0"
    >
      <div className="w-full max-w-[1440px] mx-auto text-center flex flex-col items-center justify-center">
        {/* Monumental Brand Name Anchored Statically (Zero Animation) */}
        <h2 className="font-serif font-black text-[16vw] sm:text-[15vw] lg:text-[14vw] leading-none tracking-[0.16em] sm:tracking-[0.22em] text-[oklch(0.179_0.004_286)] uppercase select-none">
          ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
        </h2>
        
        {/* Minimalist French Atelier Tagline */}
        <p className="text-[9px] sm:text-[11px] lg:text-xs font-bold tracking-[0.45em] uppercase text-[oklch(0.552_0.014_286)] mt-2 sm:mt-4">
          Haute Parfumerie Collective • Crafted in Mumbai
        </p>
      </div>
    </div>
  );
};
