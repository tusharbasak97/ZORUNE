import React, { useState, useEffect } from 'react';
import { Sparkles, Droplets } from 'lucide-react';
import { FluidWaterCanvas } from './FluidWaterCanvas';

interface PreloaderProps {
  onComplete: () => void;
  forceFirstVisit?: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, forceFirstVisit }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'drawing' | 'formulating' | 'complete' | 'fading'>('drawing');
  
  // Determine if this is the first visit or subsequent visit
  const [isFirstVisit, setIsFirstVisit] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (forceFirstVisit !== undefined) return forceFirstVisit;
    try {
      const hasVisited = localStorage.getItem('zorune_has_visited');
      if (!hasVisited) {
        localStorage.setItem('zorune_has_visited', 'true');
        return true;
      }
      return false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Timing configuration:
    // First visit: slowed down for an unhurried, monumental luxury introduction (~2.8s)
    // Subsequent visits: quick snappy splash (~1.2s)
    const stepInterval = isFirstVisit ? 65 : 20;
    const stage1Delay = isFirstVisit ? 450 : 200;
    const stage2Delay = isFirstVisit ? 2100 : 820;
    const stage3Delay = isFirstVisit ? 2600 : 1100;
    const stage4Delay = isFirstVisit ? 3000 : 1400;

    // Stage 1: Initial brand emblem appearance
    const t1 = setTimeout(() => {
      setStage('formulating');
    }, stage1Delay);

    // Concentration gauge progress (0% to 30% Extrait concentration)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 30) {
          clearInterval(interval);
          return 30;
        }
        return prev + 1;
      });
    }, stepInterval);

    // Stage 2: Formulation sealed & welcome badge
    const t2 = setTimeout(() => {
      setStage('complete');
    }, stage2Delay);

    // Stage 3: Smooth silky fade-out
    const t3 = setTimeout(() => {
      setStage('fading');
    }, stage3Delay);

    // Stage 4: Trigger onComplete
    const t4 = setTimeout(() => {
      onComplete();
    }, stage4Delay);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearInterval(interval);
    };
  }, [onComplete, isFirstVisit]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        stage === 'fading' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Warm Halo Background */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[oklch(0.959_0.01_87.5)] blur-[120px] pointer-events-none opacity-80" />

      {/* Interactive Extrait Fluid Waves Background */}
      <FluidWaterCanvas 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none" 
        variant="ambient" 
        themeColor="champagne"
        interactiveIntensity={0.8}
      />

      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-[11px] font-semibold tracking-widest uppercase text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer px-3.5 py-1.5 rounded-full border border-[oklch(0.926_0.01_81.8)] bg-white/70 backdrop-blur-xs shadow-2xs hover:bg-white"
      >
        Skip Intro →
      </button>

      {/* Central Haute Monogram & Reveal */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-md">
        
        {/* Animated Hairline Gold Monogram Z */}
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[oklch(0.179_0.004_286)] flex items-center justify-center shadow-xl border border-[oklch(0.683_0.102_82.6)]/30">
            <span className="font-serif text-3xl font-bold text-[oklch(0.98_0.005_78.3)] tracking-tight">
              Z
            </span>
          </div>

          <div className="absolute -inset-2 rounded-3xl border border-[oklch(0.683_0.102_82.6)]/30 animate-ping opacity-20 pointer-events-none" />
        </div>

        {/* Brand Reveal */}
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold tracking-[0.25em] text-[oklch(0.179_0.004_286)] leading-none mb-2">
          ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
        </h1>

        <p className="text-[10px] tracking-[0.38em] uppercase font-bold text-[oklch(0.683_0.102_82.6)] mb-8">
          SOVEREIGN HAUTE PARFUMERIE • 50ML MASTER FLACONS
        </p>

        {/* 30% Extrait Concentration Formulating Gauge */}
        <div className="w-64 bg-white border border-[oklch(0.926_0.01_81.8)] rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] text-[oklch(0.552_0.014_286)] flex items-center space-x-1">
              <Droplets className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
              <span>Oil Formulation</span>
            </span>
            <span className="font-extrabold text-[oklch(0.179_0.004_286)] font-mono">
              {progress}% Extrait
            </span>
          </div>

          {/* Precision Gold Loading Bar */}
          <div className="w-full h-1.5 bg-[oklch(0.98_0.005_78.3)] rounded-full overflow-hidden border border-[oklch(0.926_0.01_81.8)]/60">
            <div 
              className="h-full bg-gradient-to-r from-[oklch(0.683_0.102_82.6)] to-[oklch(0.179_0.004_286)] transition-all duration-75 rounded-full"
              style={{ width: `${(progress / 30) * 100}%` }}
            />
          </div>
        </div>

        {/* Dynamic Micro Status Copy */}
        <div className="h-6 flex items-center justify-center text-xs text-[oklch(0.442_0.015_286)]">
          {stage === 'drawing' && <span>Harmonizing Single-Origin Botanical Extracts...</span>}
          {stage === 'formulating' && <span>Calibrating 30% Extrait Elixir Concentration...</span>}
          {(stage === 'complete' || stage === 'fading') && (
            <span className="text-emerald-700 font-semibold flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Formulation Sealed • Welcome to ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span></span>
            </span>
          )}
        </div>

        <p className="text-[10px] text-[oklch(0.552_0.014_286)] tracking-wider uppercase mt-6">
          Single-Origin Terroir • 50ml Super-Flint Crystal • Sovereign Extrait
        </p>

      </div>
    </div>
  );
};

export default Preloader;
