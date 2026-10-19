import React from 'react';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Zap, Droplets, Waves } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FluidWaterCanvas } from './FluidWaterCanvas';

interface HeroProps {
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog }) => {
  const { setIsQuizOpen } = useCart();

  const marqueeText = [
    "20%–30% EXTRAIT ELIXIR",
    "20 SOVEREIGN TERROIR FORMULATIONS",
    "40% PCR REFILLABLE FLACON",
    "SNI-15 SCREW NECK ARCHITECTURE",
    "CIRCULAR MYCELIUM PACKAGING",
    "ETHICAL SINGLE-ORIGIN CO-OPS",
    "IFRA 51 & EU 1223 COMPLIANT"
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-8 sm:pt-12 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] overflow-hidden"
    >
      {/* Haute Parfumerie Ambient Light Caustics */}
      <FluidWaterCanvas className="absolute inset-0 z-0 opacity-60 pointer-events-none" themeColor="champagne" variant="hero" interactiveIntensity={0.6} />

      {/* Subtle Warm Ambient Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-30 z-1">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[oklch(0.959_0.01_87.5)] blur-[90px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Discreet Haute Parfumerie Eyebrow & Interactive Ripple Hint with Floating Animation */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[oklch(0.926_0.01_81.8)] mb-5 sm:mb-6 shadow-2xs animate-float">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.683_0.102_82.6)] animate-ping" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[oklch(0.442_0.015_286)]">
              Sovereign Eco-Luxury • 20 Terroir Formulations
            </span>
            <span className="hidden sm:inline text-[oklch(0.926_0.01_81.8)]">|</span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-[oklch(0.683_0.102_82.6)] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
              <span>30% Extrait • Sovereign Sillage</span>
            </span>
          </div>

          {/* Main Editorial Headline with Smooth Fade-In Up Animation */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[oklch(0.179_0.004_286)] leading-[1.12] mb-6 animate-fade-in-up">
            <span className="block">Sovereign Haute</span>
            <span className="block italic font-normal text-[oklch(0.683_0.102_82.6)] transition-all hover:tracking-wide duration-300">
              Parfumerie.
            </span>
          </h1>

          {/* Editorial Tagline */}
          <p className="text-base sm:text-lg lg:text-xl text-[oklch(0.442_0.015_286)] font-normal leading-relaxed mb-8 max-w-xl mx-auto">
            Rare single-origin botanicals captured in sculptural, infinitely refillable crystal.
          </p>

          {/* Clean Decluttered CTAs with Hover Animations */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8 sm:mb-10">
            <button
              onClick={onExploreCatalog}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>Explore Our Collection</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] font-medium text-xs tracking-wider uppercase border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Olfactory Matchmaker</span>
            </button>
          </div>

          {/* 4 Clean Minimalist Pillars with Hover Elevation & Micro Animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <Droplets className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">20%–30% Extrait</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">Single-origin natural botanicals compounded for 12–18 hours sustained skin sillage.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">40% PCR Flacon</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">Threaded SNI-15 screw neck engineered for infinite aluminum cartridge refills.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <ShieldCheck className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Mycelium Casket</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">100% home-compostable mushroom secondary casket with FSC cotton provenance certificate.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <Zap className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Terroir Allocation</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">Direct ethical cooperatives across Kochi, Cape Fynbos, Kashmir, and Grasse.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Infinite Seamless Formulation Ticker Animation */}
      <div className="w-full border-t border-[oklch(0.926_0.01_81.8)] bg-white/70 backdrop-blur-md py-2.5 overflow-hidden relative z-10">
        <div className="animate-marquee flex items-center space-x-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[oklch(0.552_0.014_286)]">
          {marqueeText.concat(marqueeText).map((text, idx) => (
            <span key={idx} className="flex items-center space-x-6 flex-shrink-0">
              <span className="text-[oklch(0.179_0.004_286)]">{text}</span>
              <span className="text-[oklch(0.683_0.102_82.6)]">•</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
