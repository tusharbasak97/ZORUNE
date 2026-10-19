import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Sparkles, Check, ArrowRight, Plus } from 'lucide-react';
import { Product } from '../types';
import productsData from '../data/products.json';

const products = productsData.products as unknown as Product[];

export const WardrobeBuilderModal: React.FC = () => {
  const { isWardrobeOpen, setIsWardrobeOpen, addToCart, setIsCartOpen } = useCart();
  const [selectedSkus, setSelectedSkus] = useState<string[]>([]);

  // Lock body scroll and disable Lenis
  useEffect(() => {
    if (isWardrobeOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    } else {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isWardrobeOpen]);

  if (!isWardrobeOpen) return null;

  const masterFlacons = products;

  const bespokeTotal = selectedSkus.reduce((sum, sku) => {
    const prod = products.find(p => p.sku === sku);
    return sum + (prod?.price || 0);
  }, 0);

  const bespokeTotalEur = selectedSkus.reduce((sum, sku) => {
    const prod = products.find(p => p.sku === sku);
    return sum + (prod?.price_eur || Math.round((prod?.price || 0) / 90));
  }, 0);

  const toggleSelect = (sku: string) => {
    if (selectedSkus.includes(sku)) {
      setSelectedSkus(selectedSkus.filter(s => s !== sku));
    } else {
      setSelectedSkus([...selectedSkus, sku]);
    }
  };

  const handleAddBespokeToCart = () => {
    selectedSkus.forEach(sku => {
      const prod = products.find(p => p.sku === sku);
      if (prod) {
        addToCart(prod, 1);
      }
    });
    setIsWardrobeOpen(false);
    setIsCartOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsWardrobeOpen(false)}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-5 sm:p-8 overscroll-contain popup-scroll-pane no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsWardrobeOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span>Sovereign Haute Parfumerie Atelier</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)] mb-2">
            Bespoke Private Salon Selection<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)]">
            Curate your sovereign private collection of 50ml Master Flacons with white-glove, insured climate-controlled transit.
          </p>
        </div>

        {/* Selected Flacons Preview Tray */}
        <div className="p-4 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] mb-6">
          <div className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-3 flex items-center justify-between">
            <span>Selected Sovereign Flacons ({selectedSkus.length})</span>
            <span className="text-[11px] text-[oklch(0.683_0.102_82.6)] font-semibold">50ml Super-Flint Crystal Caskets</span>
          </div>

          {selectedSkus.length === 0 ? (
            <p className="text-xs text-[oklch(0.552_0.014_286)] italic py-4 text-center">
              Select flacons below to assemble your bespoke private collection.
            </p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {selectedSkus.map(sku => {
                const prod = products.find(p => p.sku === sku);
                if (!prod) return null;
                return (
                  <div key={sku} className="relative p-2.5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] flex items-center space-x-2.5 shadow-2xs">
                    <img src={prod.image_url} alt={prod.name} className="w-10 h-10 object-contain rounded-lg border border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] p-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[oklch(0.179_0.004_286)] truncate">{prod.name}</p>
                      <p className="text-[10px] text-[oklch(0.683_0.102_82.6)] truncate font-semibold">
                        €{prod.price_eur || Math.round(prod.price / 90)} (₹{prod.price.toLocaleString('en-IN')})
                      </p>
                    </div>
                    <button
                      onClick={() => toggleSelect(sku)}
                      className="p-1 rounded text-[oklch(0.552_0.014_286)] hover:text-red-600 hover:bg-[oklch(0.98_0.005_78.3)] cursor-pointer"
                      title="Remove"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Catalog Selector Grid */}
        <p className="text-xs font-semibold text-[oklch(0.442_0.015_286)] mb-3">Curate your sovereign flacons:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {masterFlacons.map(p => {
            const isSelected = selectedSkus.includes(p.sku);
            return (
              <div
                key={p.sku}
                onClick={() => toggleSelect(p.sku)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)] shadow-2xs'
                    : 'bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.179_0.004_286)]/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-[oklch(0.683_0.102_82.6)]">{p.sku}</span>
                  {isSelected ? (
                    <div className="w-4 h-4 rounded-full bg-[oklch(0.179_0.004_286)] text-white flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  ) : (
                    <Plus className="w-3.5 h-3.5 text-[oklch(0.552_0.014_286)]" />
                  )}
                </div>
                <div>
                  <p className="font-serif text-sm font-bold text-[oklch(0.179_0.004_286)]">{p.name}</p>
                  <p className="text-[10px] text-[oklch(0.552_0.014_286)] line-clamp-1 mb-2">{p.tagline || p.concept}</p>
                </div>
                <div className="pt-2 border-t border-[oklch(0.944_0.012_84.6)] flex items-center justify-between text-xs">
                  <span className="font-bold text-[oklch(0.179_0.004_286)]">
                    €{p.price_eur || Math.round(p.price / 90)} <span className="text-[10px] font-normal text-[oklch(0.442_0.015_286)]">(₹{p.price.toLocaleString('en-IN')})</span>
                  </span>
                  <span className="text-[10px] text-[oklch(0.683_0.102_82.6)] font-semibold">50ml PCR Flacon</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Total Footer */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase font-bold text-[oklch(0.552_0.014_286)] block">Total Investment ({selectedSkus.length} Flacons)</span>
            <span className="text-2xl font-extrabold text-[oklch(0.179_0.004_286)]">
              €{bespokeTotalEur} <span className="text-base font-normal text-[oklch(0.442_0.015_286)]">(₹{bespokeTotal.toLocaleString('en-IN')})</span>
            </span>
            <p className="text-xs text-emerald-800 font-medium mt-0.5">Complimentary White-Glove Insured Courier Included</p>
          </div>

          <button
            onClick={handleAddBespokeToCart}
            disabled={selectedSkus.length === 0}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              selectedSkus.length > 0
                ? 'bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white shadow-sm'
                : 'bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.552_0.014_286)] cursor-not-allowed border border-[oklch(0.926_0.01_81.8)]'
            }`}
          >
            <span>Acquire Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
