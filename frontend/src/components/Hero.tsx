import React from 'react';
import { Sparkles, Layers, ShieldCheck, ArrowRight, Zap, Droplets, Waves } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FluidWaterCanvas } from './FluidWaterCanvas';

interface HeroProps {
  onExploreCatalog: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCatalog }) => {
  const { setIsQuizOpen, setIsWardrobeOpen } = useCart();

  const marqueeText = [
    "28% EXTRAIT DE PARFUM",
    "PARIS & GRASSE ESSENCES",
    "UNIFORM 20ML POCKET FLACONS",
    "FLAT ₹999",
    "SAME-DAY METRO AIR DISPATCH",
    "~300 PRECISION SPRAYS",
    "48-HOUR COLD MACERATION",
    "ZERO BLIND-BUY HESITATION"
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-8 sm:pt-12 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] overflow-hidden"
    >
      {/* Scentedelic Fluid Water / Maceration Wave Canvas Background */}
      <FluidWaterCanvas className="absolute inset-0 z-0 opacity-95" themeColor="gold" variant="hero" interactiveIntensity={1.4} />

      {/* Subtle Warm Ambient Depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-50 z-1">
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[oklch(0.959_0.01_87.5)] blur-[100px] rounded-full animate-float" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 my-auto">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Discreet Haute Parfumerie Eyebrow & Interactive Ripple Hint with Floating Animation */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[oklch(0.926_0.01_81.8)] mb-5 sm:mb-6 shadow-2xs animate-float">
            <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.683_0.102_82.6)] animate-ping" />
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[oklch(0.442_0.015_286)]">
              Haute Parfumerie • Uniform 20ml Flacons
            </span>
            <span className="hidden sm:inline text-[oklch(0.926_0.01_81.8)]">|</span>
            <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-[oklch(0.683_0.102_82.6)] font-semibold tracking-wide">
              <Waves className="w-3 h-3 animate-pulse" />
              <span>Fluid Maceration Active</span>
            </span>
          </div>

          {/* Main Editorial Headline with Smooth Fade-In Up Animation */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[oklch(0.179_0.004_286)] leading-[1.08] mb-6 animate-fade-in-up">
            Haute Parfumerie,{' '}
            <span className="italic font-normal text-[oklch(0.683_0.102_82.6)] transition-all hover:tracking-wide duration-300">
              Democratized.
            </span>
          </h1>

          {/* Editorial Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-[oklch(0.442_0.015_286)] font-normal leading-relaxed mb-8 max-w-2xl mx-auto">
            The world’s 30 most iconic luxury fragrances formulated in artisanal <strong className="text-[oklch(0.179_0.004_286)] font-semibold">28% Extrait de Parfum</strong>. 
            Standardized in uniform <strong className="text-[oklch(0.179_0.004_286)] font-semibold">20ml pocket flacons for flat ₹999</strong>. 
            Zero blind-buy hesitation. Nuclear longevity.
          </p>

          {/* Clean Decluttered CTAs with Hover Animations */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8 sm:mb-10">
            <button
              onClick={onExploreCatalog}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer group"
            >
              <span>Explore The 30 Icons — ₹999</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setIsWardrobeOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] font-semibold text-xs tracking-wider uppercase border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Build 3-Wardrobe (₹2,799)</span>
              <span className="text-[10px] bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] font-extrabold px-1.5 py-0.5 rounded border border-[oklch(0.926_0.01_81.8)]">
                Save ₹198
              </span>
            </button>

            <button
              onClick={() => setIsQuizOpen(true)}
              className="w-full sm:w-auto px-5 py-3.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] font-medium text-xs tracking-wide transition-all hover:bg-white/60 flex items-center justify-center space-x-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Olfactive Quiz</span>
            </button>
          </div>

          {/* 4 Clean Minimalist Pillars with Hover Elevation & Micro Animations */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <Droplets className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">28% Extrait</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">Haute concentration engineered for 8–12 hours sustained skin projection.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Uniform 20ml</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">~300 precision sprays. 2 full months of daily wear per pocket flacon.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <Zap className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Priority Metro Air</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">Same-Day delivery in Mumbai, Delhi & Bengaluru for orders before 1 PM.</p>
            </div>

            <div className="p-4 rounded-xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs luxury-card group cursor-default">
              <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                <ShieldCheck className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Direct Atelier</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">1 for ₹999 • 2 for ₹1,899 • 3 for ₹2,799. Pure oils with zero promotional gimmicks.</p>
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
