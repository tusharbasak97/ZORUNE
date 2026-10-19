import React from 'react';
import { Star, Plus, Eye, Zap, MapPin, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, navigateToProduct } = useCart();

  const isTier1 = product.tier === 'TIER_1_HERO';

  return (
    <div className="group relative flex flex-col rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/60 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl overflow-hidden shadow-2xs">
      
      {/* Top Media Area */}
      <div 
        className="relative aspect-[4/5] w-full overflow-hidden bg-[oklch(0.97_0.007_88.6)] cursor-pointer p-4 flex items-center justify-center" 
        onClick={() => navigateToProduct(product.sku)}
      >
        {/* Product Flacon Artwork */}
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-108 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Tier Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {isTier1 ? (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[oklch(0.179_0.004_286)] text-white shadow-xs">
              <span>Masterpiece</span>
            </span>
          ) : (
            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs">
              <span>Sovereign Terroir</span>
            </span>
          )}
        </div>

        {/* Concentration Pill */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs shadow-2xs">
            {product.concentration.includes('(') ? product.concentration.split('(')[1].replace(')', '') : '30% Extrait'}
          </span>
        </div>

        {/* Quick View Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateToProduct(product.sku);
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3.5 py-1.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-medium flex items-center space-x-1.5 shadow-md cursor-pointer whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
          <span>View Flacon Page</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        
        {/* SKU and Gender */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[oklch(0.552_0.014_286)] mb-1">
          <span className="tracking-wider uppercase text-[oklch(0.683_0.102_82.6)]">{product.sku}</span>
          <span className="px-2 py-0.5 rounded bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)] text-[10px] font-medium">{product.gender}</span>
        </div>

        {/* Terroir Location Tag */}
        {product.terroir && (
          <div className="flex items-center space-x-1 text-[10px] text-[oklch(0.552_0.014_286)] mb-1">
            <MapPin className="w-3 h-3 text-[oklch(0.683_0.102_82.6)] shrink-0" />
            <span className="truncate font-medium">{product.terroir.origin}</span>
          </div>
        )}

        {/* Perfume Name */}
        <h3 
          onClick={() => navigateToProduct(product.sku)}
          className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Master Formulary Note */}
        <p className="text-xs text-[oklch(0.683_0.102_82.6)] font-medium mb-2.5 line-clamp-1">
          {product.inspired_by?.original_name || product.tagline}
        </p>

        {/* Olfactive Family & Accords */}
        <div className="flex flex-wrap gap-1 mb-3">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)]">
            {product.olfactive_family}
          </span>
          {product.main_accords.slice(0, 2).map((accord, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-[oklch(0.977_0.013_86.8)] text-[oklch(0.588_0.096_80.7)] capitalize border border-[oklch(0.926_0.01_81.8)]/60">
              {accord}
            </span>
          ))}
        </div>

        {/* Batch Status and Longevity */}
        <div className="flex items-center justify-between text-xs text-[oklch(0.552_0.014_286)] pt-2 border-t border-[oklch(0.944_0.012_84.6)] mb-4">
          {product.reviews_count > 0 ? (
            <div className="flex items-center space-x-1">
              <Star className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)] fill-[oklch(0.683_0.102_82.6)]" />
              <span className="font-semibold text-[oklch(0.179_0.004_286)]">{product.rating}</span>
              <span className="text-[10px] text-[oklch(0.552_0.014_286)]">({product.reviews_count})</span>
            </div>
          ) : (
            <div className="flex items-center space-x-1.5 text-[oklch(0.683_0.102_82.6)]">
              <Sparkles className="w-3 h-3" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">Inaugural 2026 Batch</span>
            </div>
          )}
          <div className="flex items-center space-x-1 text-[oklch(0.442_0.015_286)]">
            <Zap className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
            <span className="text-[11px] font-medium">{product.longevity_hours}h Wear</span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <div className="flex items-baseline space-x-1.5">
              {product.price_eur ? (
                <span className="text-base font-extrabold text-[oklch(0.179_0.004_286)]">€{product.price_eur}</span>
              ) : null}
              <span className="text-xs text-[oklch(0.442_0.015_286)] font-semibold">
                (₹{product.price.toLocaleString('en-IN')})
              </span>
            </div>
            <span className="text-[10px] text-[oklch(0.683_0.102_82.6)] uppercase font-bold tracking-wider block">
              50ml Refillable PCR Glass
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-3.5 py-2 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.683_0.102_82.6)] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 flex items-center space-x-1 cursor-pointer"
            title="Acquire Flacon"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Acquire</span>
          </button>
        </div>

      </div>
    </div>
  );
};
