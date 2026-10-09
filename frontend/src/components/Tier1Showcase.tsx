import React from 'react';
import { Crown, Star, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface Tier1ShowcaseProps {
  products: Product[];
}

export const Tier1Showcase: React.FC<Tier1ShowcaseProps> = ({ products }) => {
  const { addToCart, navigateToProduct } = useCart();

  const tier1Products = products
    .filter(p => p.tier === 'TIER_1_HERO')
    .sort((a, b) => a.commercial_rank - b.commercial_rank)
    .slice(0, 8); // Top 8 volume heroes

  return (
    <section id="tier1" className="py-16 sm:py-24 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Crown className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>The Hall of Icons • 50% Volume Champions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[oklch(0.179_0.004_286)]">
              Tier 1 Masterpiece Icons<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] mt-1.5 max-w-xl leading-relaxed">
              The highest-converting, globally sought-after fragrance formulations in modern history. 
              Zero-risk blind buys in uniform 20ml Extrait de Parfum flacons.
            </p>
          </div>

          <div className="text-xs text-[oklch(0.442_0.015_286)] font-medium flex items-center space-x-2">
            <span>Uniform 20ml: <strong className="text-[oklch(0.179_0.004_286)]">Flat ₹999</strong></span>
            <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
            <span className="text-[oklch(0.683_0.102_82.6)] font-semibold">2 for ₹1,899 • 3 for ₹2,799</span>
          </div>
        </div>

        {/* Decluttered Luxury Grid of Top 8 Heroes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tier1Products.map((p) => (
            <div
              key={p.sku}
              className="group relative rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/60 transition-all duration-300 ease-out hover:-translate-y-2.5 hover:shadow-2xl overflow-hidden shadow-2xs flex flex-col justify-between"
            >
              {/* Media Container */}
              <div 
                className="relative aspect-square w-full overflow-hidden bg-[oklch(0.97_0.007_88.6)] cursor-pointer p-4"
                onClick={() => navigateToProduct(p.sku)}
              >
                <img
                  src={p.image_url}
                  alt={p.name}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Subtle Discrete Tags */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[oklch(0.179_0.004_286)] text-white">
                    <span>Rank #{p.commercial_rank}</span>
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white/90 text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs">
                    Save {p.arbitrage_savings_percent}%
                  </span>
                </div>
              </div>

              {/* Info Container */}
              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-[11px] text-[oklch(0.552_0.014_286)] font-medium mb-1">
                  <span className="tracking-wider uppercase font-semibold text-[oklch(0.683_0.102_82.6)]">{p.sku}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-[oklch(0.683_0.102_82.6)] fill-[oklch(0.683_0.102_82.6)]" />
                    <span className="text-[oklch(0.179_0.004_286)] text-[10px] font-semibold">{p.rating}</span>
                  </div>
                </div>

                <h3 
                  onClick={() => navigateToProduct(p.sku)}
                  className="font-serif text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors cursor-pointer truncate"
                >
                  {p.name}
                </h3>

                <p className="text-xs text-[oklch(0.442_0.015_286)] mb-2 truncate">
                  Inspired by {p.inspired_by.brand} {p.inspired_by.original_name}
                </p>

                <p className="text-[11px] text-[oklch(0.552_0.014_286)] line-clamp-1 mb-4 italic">
                  {p.tagline}
                </p>

                {/* Footer Pricing & CTA */}
                <div className="mt-auto pt-3 border-t border-[oklch(0.944_0.012_84.6)] flex items-center justify-between">
                  <div>
                    <span className="text-sm font-extrabold text-[oklch(0.179_0.004_286)]">₹999</span>
                    <span className="text-[10px] text-[oklch(0.552_0.014_286)] block line-through">₹{p.original_price_inr.toLocaleString('en-IN')}</span>
                  </div>

                  <button
                    onClick={() => addToCart(p, 1)}
                    className="px-3.5 py-1.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.683_0.102_82.6)] text-white font-semibold text-xs uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 flex items-center space-x-1 cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add 20ml</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
