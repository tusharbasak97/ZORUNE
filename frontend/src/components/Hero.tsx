import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Droplets, 
  Waves,
  Star,
  Plus,
  Crown,
  Scale,
  Search,
  CheckCircle2,
  Mail
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { FluidWaterCanvas } from './FluidWaterCanvas';
import { Product } from '../types';

interface HeroProps {
  products?: Product[];
  onExploreCatalog: () => void;
  onNavigateSection?: (sectionId: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  products = [],
  onExploreCatalog,
  onNavigateSection,
  onSelectProduct
}) => {
  const { setIsQuizOpen, setIsWardrobeOpen, addToCart } = useCart();
  const [newsletterContact, setNewsletterContact] = useState('');
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false);

  const marqueeText = [
    "~95% OLFACTORY CLONE MATCH",
    "EXPENSIVE OG DNA RE-ENGINEERED",
    "HIGH-GRADE FRENCH OILS",
    "28% EXTRAIT DE PARFUM",
    "UNIFORM 20ML POCKET FLACONS",
    "FLAT ₹999",
    "SAME-DAY METRO AIR DISPATCH",
    "~300 PRECISION SPRAYS",
    "SAVE 90%+ VS RETAIL OGS",
    "ZERO BLIND-BUY HESITATION"
  ];

  // Pick top 4 iconic bestsellers for Home visual spotlight
  const featuredSkus = ['ZR-15', 'ZR-03', 'ZR-27', 'ZR-05'];
  const featuredProducts = featuredSkus
    .map(sku => products.find(p => p.sku === sku))
    .filter((p): p is Product => Boolean(p));

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterContact.trim().length > 3) {
      setIsNewsletterSubscribed(true);
    }
  };

  return (
    <div id="hero" className="flex flex-col bg-[oklch(0.98_0.005_78.3)]">
      
      {/* ─── SECTION 1: HAUTE PARFUMERIE EDITORIAL HERO BANNER (DESKTOP & MOBILE) ─── */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between pt-8 sm:pt-12 border-b border-[oklch(0.926_0.01_81.8)] overflow-hidden">
        {/* Scentedelic Fluid Water Canvas Background */}
        <FluidWaterCanvas className="absolute inset-0 z-0 opacity-95" themeColor="gold" variant="hero" interactiveIntensity={1.4} />

        {/* Ambient Depth Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1720px] h-full pointer-events-none opacity-50 z-1">
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] lg:w-[1000px] h-[350px] bg-[oklch(0.959_0.01_87.5)] blur-[100px] rounded-full animate-float" />
        </div>

        <div className="w-full max-w-7xl xl:max-w-[1536px] 2xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 relative z-10 my-auto">
          <div className="text-center w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto py-4 sm:py-6 lg:py-10">
            
            {/* Discreet Haute Parfumerie Eyebrow & Interactive Ripple Hint */}
            <div className="inline-flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[oklch(0.926_0.01_81.8)] mb-3 sm:mb-5 shadow-2xs animate-float">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.683_0.102_82.6)] animate-ping" />
              <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.18em] uppercase text-[oklch(0.442_0.015_286)]">
                Haute Parfumerie • 28% Extrait • 20ml
              </span>
              <span className="hidden sm:inline text-[oklch(0.926_0.01_81.8)]">|</span>
              <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-[oklch(0.683_0.102_82.6)] font-semibold tracking-wide">
                <Waves className="w-3 h-3 animate-pulse" />
                <span>48h Maceration Protocol</span>
              </span>
            </div>

            {/* Main Editorial Headline with Scaled Down Mobile/Tablet Sizing */}
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[oklch(0.179_0.004_286)] leading-[1.12] mb-3 sm:mb-5 animate-fade-in-up">
              <span>Haute Parfumerie,</span>
              <span className="block italic font-normal text-[oklch(0.683_0.102_82.6)] transition-all hover:tracking-wide duration-300">
                Democratized.
              </span>
            </h1>

            {/* Editorial Subtitle */}
            <p className="text-xs sm:text-sm lg:text-base xl:text-lg text-[oklch(0.442_0.015_286)] font-normal leading-relaxed mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto px-2">
              Thirty of the world’s most iconic luxury fragrances, mastercrafted with high-grade perfume oils for a <strong className="text-[oklch(0.179_0.004_286)] font-semibold">~95% olfactive match</strong> in <strong className="text-[oklch(0.179_0.004_286)] font-semibold">28% Extrait de Parfum</strong>. Standardized in uniform <strong className="text-[oklch(0.179_0.004_286)] font-semibold">20ml flacons at flat ₹999</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-9">
              <button
                onClick={onExploreCatalog}
                className="w-full sm:w-auto px-6 lg:px-8 py-2.5 sm:py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer group"
              >
                <span>Explore The 30 Icons — ₹999</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => setIsWardrobeOpen(true)}
                className="w-full sm:w-auto px-5 lg:px-7 py-2.5 sm:py-3.5 rounded-full bg-white hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] font-semibold text-xs tracking-wider uppercase border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all duration-300 shadow-2xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                <span>Build 3-Wardrobe (₹2,799)</span>
                <span className="text-[9px] bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] font-extrabold px-1.5 py-0.5 rounded border border-[oklch(0.926_0.01_81.8)]">
                  Save ₹198
                </span>
              </button>

              <button
                onClick={() => setIsQuizOpen(true)}
                className="w-full sm:w-auto px-4 lg:px-6 py-2 sm:py-3.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] font-medium text-xs tracking-wide transition-all hover:bg-white/60 flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                <span>Olfactive Quiz</span>
              </button>
            </div>

            {/* 4 Clean Minimalist Pillars - Full Desktop Width Spread */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3.5 lg:gap-4 xl:gap-6 text-left w-full mt-2 sm:mt-4">
              <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:shadow-md transition-all duration-300 luxury-card group cursor-default">
                <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                  <Sparkles className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">~95% Olfactive Match</span>
                </div>
                <p className="text-[10px] sm:text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">High-grade oils engineered for ~95% closeness to ₹15,000–₹45,000 originals.</p>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:shadow-md transition-all duration-300 luxury-card group cursor-default">
                <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                  <Droplets className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">28% Extrait</span>
                </div>
                <p className="text-[10px] sm:text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">Haute concentration engineered for 8–12 hours sustained skin projection.</p>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:shadow-md transition-all duration-300 luxury-card group cursor-default">
                <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                  <Zap className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Uniform 20ml</span>
                </div>
                <p className="text-[10px] sm:text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">~300 precision sprays. 2 full months of daily wear per pocket flacon.</p>
              </div>

              <div className="p-3 sm:p-4 lg:p-5 xl:p-6 rounded-2xl bg-white/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:shadow-md transition-all duration-300 luxury-card group cursor-default">
                <div className="flex items-center space-x-2 text-[oklch(0.683_0.102_82.6)] mb-1.5">
                  <ShieldCheck className="w-4 h-4 group-hover:scale-125 transition-transform duration-300" />
                  <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">Save 90%+ vs Retail</span>
                </div>
                <p className="text-[10px] sm:text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">1 for ₹999 • 2 for ₹1,899 • 3 for ₹2,799. Pure oils with zero retail markup.</p>
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

      {/* ─── MOBILE & TABLET ONLY STOREFRONT ENHANCEMENTS (< 1280px / xl:hidden) ───
          Strictly hidden on Desktop to prevent repeating Tier 1 and Join The Allocation Club. */}
      <div className="block xl:hidden">
        {/* ─── SECTION 2: TRENDING SIGNATURE FLACONS SHOWCASE (MOBILE/TABLET ONLY) ─── */}
        {featuredProducts.length > 0 && (
          <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-b border-[oklch(0.926_0.01_81.8)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.683_0.102_82.6)] mb-2 shadow-2xs">
                <Crown className="w-3.5 h-3.5" />
                <span>Atelier Signature Bestsellers</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[oklch(0.179_0.004_286)] tracking-tight">
                The Most Coveted Formulations<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] mt-1">
                Engineered with high-grade oils for ~95% closeness. 20ml uniform pocket flacons at flat ₹999.
              </p>
            </div>
            
            {onNavigateSection && (
              <button
                onClick={() => onNavigateSection('tier1')}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[oklch(0.179_0.004_286)] hover:text-[oklch(0.683_0.102_82.6)] transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>View All Tier 1 Heroes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* 2-Column Grid on Mobile, 4-Column on Tablet/Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
            {featuredProducts.map((p) => (
              <div
                key={p.sku}
                onClick={() => onSelectProduct && onSelectProduct(p)}
                className="p-3 sm:p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Flacon Image Container */}
                  <div className="relative aspect-[3/4] rounded-xl bg-[oklch(0.98_0.005_78.3)] p-2 sm:p-3 mb-3 flex items-center justify-center overflow-hidden border border-[oklch(0.926_0.01_81.8)]">
                    <img 
                      src={p.image_url} 
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                    />
                    
                    {/* Closeness Tag */}
                    <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-md bg-[oklch(0.179_0.004_286)]/90 backdrop-blur-xs text-[9px] font-bold text-white tracking-wider">
                      ~95% MATCH
                    </span>

                    {/* Arbitrage Savings */}
                    {p.arbitrage_savings_percent && (
                      <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] font-extrabold tracking-wider">
                        SAVE {p.arbitrage_savings_percent}%
                      </span>
                    )}
                  </div>

                  {/* SKU & Gender */}
                  <div className="flex items-center justify-between text-[10px] text-[oklch(0.552_0.014_286)] mb-1">
                    <span className="font-bold text-[oklch(0.683_0.102_82.6)]">{p.sku}</span>
                    <span>{p.gender}</span>
                  </div>

                  {/* Title & Inspired By */}
                  <h3 className="font-serif text-sm sm:text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors truncate">
                    {p.name}
                  </h3>
                  <p className="text-[11px] text-[oklch(0.442_0.015_286)] truncate mb-2">
                    Inspired by {p.inspired_by.brand} {p.inspired_by.original_name}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center space-x-1 text-[11px] text-[oklch(0.552_0.014_286)] mb-3">
                    <Star className="w-3 h-3 text-[oklch(0.683_0.102_82.6)] fill-[oklch(0.683_0.102_82.6)]" />
                    <span className="font-semibold text-[oklch(0.179_0.004_286)]">{p.rating}</span>
                    <span className="text-[10px]">({p.reviews_count})</span>
                  </div>
                </div>

                {/* Price & Add to Bag */}
                <div className="pt-2 border-t border-[oklch(0.926_0.01_81.8)] flex items-center justify-between gap-2">
                  <div>
                    <span className="font-serif text-sm sm:text-base font-extrabold text-[oklch(0.179_0.004_286)] block leading-tight">
                      ₹999
                    </span>
                    <span className="text-[9px] text-[oklch(0.683_0.102_82.6)] font-semibold block">
                      20ml Extrait
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(p);
                    }}
                    className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold transition-all flex items-center justify-center space-x-1 cursor-pointer shadow-2xs"
                    aria-label={`Add ${p.name} to bag`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─── SECTION 3: THE 3-TIER WARDROBE VALUE PROPOSITION ─── */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-b border-[oklch(0.926_0.01_81.8)]">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] text-[10px] font-bold uppercase tracking-[0.2em] text-[oklch(0.683_0.102_82.6)] mb-2 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Direct Atelier Bundle Math</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[oklch(0.179_0.004_286)] tracking-tight">
            Curate Your Fragrance Wardrobe<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] mt-1.5">
            Transparent pricing with zero promotional gimmicks. Pure 28% Extrait de Parfum at flat economies of scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6">
          {/* Tier 1: Single Flacon */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.552_0.014_286)] block mb-1">
                Single Signature Flacon
              </span>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)]">₹999</span>
                <span className="text-xs text-[oklch(0.552_0.014_286)]">/ 20ml</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed mb-4">
                Test the projection and skin fidelity of any single iconic formulation. ~300 precision sprays for 2 full months.
              </p>
            </div>
            <button
              onClick={onExploreCatalog}
              className="w-full py-2.5 rounded-xl bg-[oklch(0.959_0.01_87.5)] hover:bg-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] text-xs font-semibold transition-all cursor-pointer text-center"
            >
              Explore 30 Formulations
            </button>
          </div>

          {/* Tier 2: The Duo */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.552_0.014_286)]">
                  The Duo (2 Flacons)
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  SAVE ₹99
                </span>
              </div>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)]">₹1,899</span>
                <span className="text-xs text-[oklch(0.552_0.014_286)] line-through">₹1,998</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed mb-4">
                Pair a crisp daytime signature with a deep magnetic evening extrait. Includes Free Priority Express Air dispatch.
              </p>
            </div>
            <button
              onClick={() => setIsWardrobeOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[oklch(0.959_0.01_87.5)] hover:bg-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] text-xs font-semibold transition-all cursor-pointer text-center"
            >
              Build Duo Wardrobe
            </button>
          </div>

          {/* Tier 3: The Trio (Best Value Flagship) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-[oklch(0.683_0.102_82.6)] shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-[oklch(0.683_0.102_82.6)] text-white text-[9px] font-extrabold uppercase px-3 py-0.5 rounded-bl-lg tracking-wider">
              MOST POPULAR
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">
                  The Trio Suite (3 Flacons)
                </span>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  SAVE ₹198
                </span>
              </div>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)]">₹2,799</span>
                <span className="text-xs text-[oklch(0.552_0.014_286)] line-through">₹2,997</span>
              </div>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed mb-4">
                The definitive 360° collection: 1 Fresh Office Driver, 1 Seductive Evening Flacon, and 1 Gourmet Date Scent.
              </p>
            </div>
            <button
              onClick={() => setIsWardrobeOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold transition-all cursor-pointer text-center shadow-xs"
            >
              Build 3-Wardrobe (Save ₹198)
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: DIRECT BOUTIQUE GATEWAYS (INTUITIVE EXPLORATION) ─── */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full border-b border-[oklch(0.926_0.01_81.8)]">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[oklch(0.179_0.004_286)] tracking-tight">
            Explore The Atelier<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] mt-1">
            Navigate through curated rankings, formulation matrix, and personalized olfactive consults.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <button
            onClick={() => onNavigateSection && onNavigateSection('tier1')}
            className="p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all text-left shadow-2xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[oklch(0.959_0.01_87.5)] group-hover:bg-[oklch(0.179_0.004_286)] group-hover:text-white text-[oklch(0.683_0.102_82.6)] flex items-center justify-center mb-3 transition-colors">
              <Crown className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors">
              Tier 1 Heroes
            </h3>
            <p className="text-[11px] text-[oklch(0.552_0.014_286)] mt-1">
              Top 8 crowd-pleasing icons ranked by mass appeal.
            </p>
          </button>

          <button
            onClick={() => onNavigateSection && onNavigateSection('catalog')}
            className="p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all text-left shadow-2xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[oklch(0.959_0.01_87.5)] group-hover:bg-[oklch(0.179_0.004_286)] group-hover:text-white text-[oklch(0.683_0.102_82.6)] flex items-center justify-center mb-3 transition-colors">
              <Search className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors">
              The 30 Catalog
            </h3>
            <p className="text-[11px] text-[oklch(0.552_0.014_286)] mt-1">
              Filter by family, season, notes, and occasion.
            </p>
          </button>

          <button
            onClick={() => onNavigateSection && onNavigateSection('cannibalization')}
            className="p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all text-left shadow-2xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[oklch(0.959_0.01_87.5)] group-hover:bg-[oklch(0.179_0.004_286)] group-hover:text-white text-[oklch(0.683_0.102_82.6)] flex items-center justify-center mb-3 transition-colors">
              <Scale className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors">
              Compare Scents
            </h3>
            <p className="text-[11px] text-[oklch(0.552_0.014_286)] mt-1">
              Direct breakdown of clone impressions vs retail OGs.
            </p>
          </button>

          <button
            onClick={() => setIsQuizOpen(true)}
            className="p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all text-left shadow-2xs group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[oklch(0.959_0.01_87.5)] group-hover:bg-[oklch(0.179_0.004_286)] group-hover:text-white text-[oklch(0.683_0.102_82.6)] flex items-center justify-center mb-3 transition-colors">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-sm sm:text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors">
              Olfactive Quiz
            </h3>
            <p className="text-[11px] text-[oklch(0.552_0.014_286)] mt-1">
              Personalized signature match in 4 quick questions.
            </p>
          </button>
        </div>
      </section>

      {/* ─── SECTION 5: L'ATELIER ALLOCATION CLUB VIP NOTIFICATION ─── */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full text-center">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] text-[10px] font-bold uppercase tracking-[0.2em] mb-3 shadow-2xs">
            <Mail className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span>L'Atelier Small-Batch Reserve</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[oklch(0.179_0.004_286)] tracking-tight mb-2">
            Join The Allocation Club<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h3>
          <p className="text-xs text-[oklch(0.442_0.015_286)] max-w-lg mx-auto mb-6 leading-relaxed">
            We blend our 28% Extraits in limited 50-liter artisanal runs. Receive private early dispatch alerts when reserved batches open for bottling.
          </p>

          {isNewsletterSubscribed ? (
            <div className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Invitation token saved. You are registered for Batch 04 allocations.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2">
              <input
                type="text"
                required
                value={newsletterContact}
                onChange={(e) => setNewsletterContact(e.target.value)}
                placeholder="Enter Email or WhatsApp (+91...)"
                className="w-full sm:flex-1 bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs px-4 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none placeholder-[oklch(0.552_0.014_286)]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-2xs cursor-pointer flex-shrink-0"
              >
                <span>Request Access</span>
              </button>
            </form>
          )}

          <p className="text-[10px] text-[oklch(0.552_0.014_286)] mt-3">
            Zero promotional spam. Strictly batch notification alerts.
          </p>
        </div>
      </section>
      </div>

    </div>
  );
};
