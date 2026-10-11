import React from 'react';
import { Compass, Search, Layers, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { FluidWaterCanvas } from './FluidWaterCanvas';

interface NotFoundProps {
  onReturnHome: () => void;
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onOpenWardrobe: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  onReturnHome,
  onOpenSearch,
  onOpenQuiz,
  onOpenWardrobe
}) => {
  return (
    <div className="relative min-h-screen bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] flex flex-col justify-between selection:bg-[oklch(0.683_0.102_82.6)] selection:text-white overflow-hidden">
      
      {/* Scentedelic-Style Interactive Fluid Water Canvas (Active Mouse Wave & Ripple Distortion) */}
      <FluidWaterCanvas 
        className="absolute inset-0 z-0" 
        themeColor="gold"
        variant="404"
        interactiveIntensity={1.8}
      />

      {/* Top Haute Header */}
      <header className="relative z-10 w-full border-b border-[oklch(0.926_0.01_81.8)] bg-white/70 backdrop-blur-md py-4 px-6 sm:px-12 xl:px-16 flex items-center justify-between">
        <div 
          onClick={onReturnHome}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white font-serif font-bold text-sm shadow-xs group-hover:scale-105 transition-transform">
            Z
          </div>
          <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.2em] text-[oklch(0.179_0.004_286)]">
            ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </span>
        </div>

        <button
          onClick={onReturnHome}
          className="text-xs font-semibold text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5 transition-colors cursor-pointer px-4 py-2 rounded-full border border-[oklch(0.926_0.01_81.8)] bg-white/80 hover:bg-white shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Boutique</span>
        </button>
      </header>

      {/* Main High-Fashion Editorial 404 Canvas */}
      <main className="relative z-10 flex-1 flex items-center justify-center py-12 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto text-center flex flex-col items-center justify-center">
          
          {/* Eyebrow - Floating Luxury Pill matching Hero style */}
          <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[oklch(0.926_0.01_81.8)] mb-4 sm:mb-6 shadow-2xs animate-float">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.683_0.102_82.6)] animate-ping" />
            <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-[oklch(0.442_0.015_286)]">
              Haute Parfumerie • 404 Error
            </span>
          </div>

          {/* Monumental 404 */}
          <h2 className="font-serif text-8xl sm:text-9xl lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-black text-[oklch(0.179_0.004_286)] tracking-tighter leading-none mb-3">
            404<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>

          {/* Editorial Headline */}
          <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-tight leading-tight mb-4">
            Essence <span className="italic font-normal text-[oklch(0.683_0.102_82.6)]">Dissipated.</span>
          </h1>

          {/* Poetic Copy */}
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-[oklch(0.442_0.015_286)] leading-relaxed max-w-md sm:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto mb-8 sm:mb-10">
            The olfactory composition you seek has dispersed into the atmosphere. 
            This flacon may have retired to our private vault, or its coordinates were lost in transit.
          </p>

          {/* Luxury Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-5 w-full max-w-md sm:max-w-none mx-auto mb-8 sm:mb-10">
            <button
              onClick={onReturnHome}
              className="w-full sm:w-auto px-8 lg:px-10 py-3.5 lg:py-4 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs lg:text-sm font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
              <span>Return to Boutique</span>
            </button>

            <button
              onClick={onOpenQuiz}
              className="w-full sm:w-auto px-8 lg:px-10 py-3.5 lg:py-4 rounded-full bg-white/90 hover:bg-white text-[oklch(0.179_0.004_286)] text-xs lg:text-sm font-bold uppercase tracking-wider border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
              <span>Olfactive Matchmaker</span>
            </button>
          </div>

          {/* Quick Concierge Links */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs lg:text-sm font-medium text-[oklch(0.442_0.015_286)] px-6 lg:px-8 py-3 rounded-full bg-white/70 border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs shadow-2xs">
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Search Scent Notes (Ctrl+K)</span>
            </button>

            <span className="text-[oklch(0.926_0.01_81.8)]">•</span>

            <button
              onClick={onOpenWardrobe}
              className="flex items-center space-x-1.5 hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>3-Wardrobe (₹2,799)</span>
            </button>

            <span className="text-[oklch(0.926_0.01_81.8)]">•</span>

            <a
              href="https://wa.me/919820096786?text=Hello%20ZORUNE%20Concierge%2C%20I%20need%20fragrance%20recommendations"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

        </div>
      </main>

      {/* Footer Minimalist Signature */}
      <footer className="relative z-10 w-full py-4 px-6 sm:px-12 xl:px-16 border-t border-[oklch(0.926_0.01_81.8)] bg-white/70 backdrop-blur-md text-center text-xs text-[oklch(0.552_0.014_286)]">
        <p>ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span> Haute Parfumerie Collective • Formulated with High-Grade Oils & Bottled in Mumbai</p>
      </footer>

    </div>
  );
};
