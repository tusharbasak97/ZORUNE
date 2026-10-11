import React from 'react';
import { Star, Plus, Eye, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, navigateToProduct } = useCart();

  const isTier1 = product.tier === 'TIER_1_HERO';
  const isTier2 = product.tier === 'TIER_2_REVENUE';

  return (
    <div className="group relative flex flex-col rounded-xl sm:rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/60 transition-all duration-300 ease-out hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl overflow-hidden shadow-2xs">
      
      {/* Top Media Area */}
      <div 
        className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden bg-[oklch(0.97_0.007_88.6)] cursor-pointer p-2 sm:p-4 flex items-center justify-center" 
        onClick={() => navigateToProduct(product.sku)}
      >
        {/* Product Flacon Artwork */}
        <img
          src={product.image_url}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Tier Badge */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {isTier1 && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold uppercase tracking-wider bg-[oklch(0.179_0.004_286)] text-white shadow-2xs">
              <span>Hero</span>
            </span>
          )}
          {isTier2 && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider bg-white/90 text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs">
              <span>Signature</span>
            </span>
          )}
          {!isTier1 && !isTier2 && (
            <span className="inline-flex items-center space-x-0.5 px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-semibold uppercase tracking-wider bg-[oklch(0.977_0.013_86.8)] text-[oklch(0.588_0.096_80.7)] border border-[oklch(0.926_0.01_81.8)]">
              <span>Classic</span>
            </span>
          )}
        </div>

        {/* Savings & Match Pill */}
        <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-0.5">
          <span className="px-1.5 py-0.5 rounded-full text-[8px] sm:text-[9px] font-bold bg-white/90 text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs shadow-2xs">
            Save {product.arbitrage_savings_percent}%
          </span>
          <span className="hidden sm:inline-block px-1 py-0.2 rounded text-[8px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            ~95%
          </span>
        </div>

        {/* Quick View Button on Hover (Desktop) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigateToProduct(product.sku);
          }}
          className="hidden md:flex absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 px-3 py-1 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-medium items-center space-x-1 shadow-md cursor-pointer whitespace-nowrap"
        >
          <Eye className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
          <span>View</span>
        </button>
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 p-2 sm:p-3.5">
        
        {/* SKU and Gender */}
        <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-semibold text-[oklch(0.552_0.014_286)] mb-0.5">
          <span className="tracking-wider uppercase text-[oklch(0.683_0.102_82.6)]">{product.sku}</span>
          <span className="px-1.5 py-0.2 rounded bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)] text-[8px] sm:text-[9px] font-medium">{product.gender}</span>
        </div>

        {/* Perfume Name */}
        <h3 
          onClick={() => navigateToProduct(product.sku)}
          className="font-serif text-xs sm:text-sm md:text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors cursor-pointer line-clamp-1"
        >
          {product.name}
        </h3>

        {/* Inspired By Transparency Note */}
        <p className="text-[10px] sm:text-xs text-[oklch(0.442_0.015_286)] mb-1.5 line-clamp-1">
          Inspired by <span className="text-[oklch(0.179_0.004_286)] font-medium">{product.inspired_by.brand}</span> {product.inspired_by.original_name}
        </p>

        {/* Olfactive Family & Accords */}
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)]">
            {product.olfactive_family}
          </span>
          {product.main_accords.slice(0, 1).map((accord, idx) => (
            <span key={idx} className="text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded bg-[oklch(0.977_0.013_86.8)] text-[oklch(0.588_0.096_80.7)] capitalize border border-[oklch(0.926_0.01_81.8)]/60">
              {accord}
            </span>
          ))}
        </div>

        {/* Rating and Longevity */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-[oklch(0.552_0.014_286)] pt-1.5 border-t border-[oklch(0.944_0.012_84.6)] mb-2.5">
          <div className="flex items-center space-x-0.5">
            <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[oklch(0.683_0.102_82.6)] fill-[oklch(0.683_0.102_82.6)]" />
            <span className="font-semibold text-[oklch(0.179_0.004_286)]">{product.rating}</span>
          </div>
          <div className="flex items-center space-x-0.5 text-[oklch(0.442_0.015_286)]">
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[oklch(0.683_0.102_82.6)]" />
            <span className="text-[9px] sm:text-[10px] font-medium">{product.longevity_hours}h Wear</span>
          </div>
        </div>

        {/* Price & Action Button Footer */}
        <div className="mt-auto flex items-center justify-between pt-1">
          <div>
            <div className="flex items-baseline space-x-1">
              <span className="text-xs sm:text-sm md:text-base font-extrabold text-[oklch(0.179_0.004_286)]">₹999</span>
              <span className="text-[9px] sm:text-[10px] text-[oklch(0.552_0.014_286)] line-through">₹{product.original_price_inr.toLocaleString('en-IN')}</span>
            </div>
            <span className="text-[8px] sm:text-[9px] text-[oklch(0.683_0.102_82.6)] uppercase font-bold tracking-wider block">
              20ml Extrait
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.683_0.102_82.6)] text-white text-[9px] sm:text-[11px] font-semibold tracking-wide transition-all duration-200 active:scale-95 flex items-center space-x-0.5 cursor-pointer shadow-2xs"
            title="Add 20ml Flacon to Wardrobe"
          >
            <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            <span>Add</span>
          </button>
        </div>

      </div>
    </div>
  );
};
