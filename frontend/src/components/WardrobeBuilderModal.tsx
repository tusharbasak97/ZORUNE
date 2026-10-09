import React, { useState } from 'react';
import { X, Layers, Plus, Trash2, Check, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface WardrobeBuilderModalProps {
  products: Product[];
}

export const WardrobeBuilderModal: React.FC<WardrobeBuilderModalProps> = ({ products }) => {
  const { isWardrobeOpen, setIsWardrobeOpen, addToCart, setIsCartOpen } = useCart();
  const [selectedSkus, setSelectedSkus] = useState<string[]>(['ZR-03', 'ZR-05', 'ZR-01']); // Defaults: Imagination, Elixir, Intense
  const [activeTab, setActiveTab] = useState<'custom' | 'curated'>('custom');

  if (!isWardrobeOpen) return null;

  const count = selectedSkus.length;
  const originalSubtotal = count * 999;
  let bundleDiscount = 0;
  let bundleName = 'Single Flacon';

  if (count === 2) {
    bundleDiscount = 99; // 2 x 999 = 1998 -> 1,899
    bundleName = 'The Duo (2 for ₹1,899)';
  } else if (count === 3) {
    bundleDiscount = 198; // 3 x 999 = 2997 -> 2,799
    bundleName = 'The Trio Wardrobe (3 for ₹2,799)';
  } else if (count >= 4) {
    const reserveTotal = 2799 + (count - 3) * 899;
    bundleDiscount = originalSubtotal - reserveTotal;
    bundleName = `Connoisseur Reserve (${count} Bottles)`;
  }

  const finalTotal = originalSubtotal - bundleDiscount;

  const toggleSelect = (sku: string) => {
    if (selectedSkus.includes(sku)) {
      setSelectedSkus(selectedSkus.filter(s => s !== sku));
    } else {
      if (selectedSkus.length >= 6) return;
      setSelectedSkus([...selectedSkus, sku]);
    }
  };

  const handleApplyCurated = (skus: string[]) => {
    setSelectedSkus(skus);
    setActiveTab('custom');
  };

  const handleAddAllToCart = () => {
    selectedSkus.forEach(sku => {
      const prod = products.find(p => p.sku === sku);
      if (prod) {
        addToCart(prod, 1);
      }
    });
    setIsWardrobeOpen(false);
    setIsCartOpen(true);
  };

  const curatedBundles = [
    {
      name: 'The Viral PerfumeTok Duo',
      skus: ['ZR-03', 'ZR-05'],
      price: 1899,
      savings: 99,
      desc: 'LV Imagination (Fresh Tea Citrus) + JPG Le Male Elixir (Honey Vanilla Beast).'
    },
    {
      name: 'The Boardroom & Midnight Seduction',
      skus: ['ZR-08', 'ZR-01'],
      price: 1899,
      savings: 99,
      desc: 'Bleu de Chanel (Gentleman Incense) + SWY Intensely (Toffee & Cinnamon Date Night).'
    },
    {
      name: 'The Royal Autumn/Winter Trio',
      skus: ['ZR-10', 'ZR-30', 'ZR-01'],
      price: 2799,
      savings: 198,
      desc: "Angels' Share (Cognac Boozy) + Tobacco Vanille (Spice) + SWY Intensely (Caramel)."
    },
    {
      name: 'The Modern Femme 3-Wardrobe',
      skus: ['ZR-20', 'ZR-13', 'ZR-17'],
      price: 2799,
      savings: 198,
      desc: 'YSL Libre (Power Lavender) + Burberry Goddess (Vanilla) + Good Girl (Evening Tuberose).'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-5 sm:p-8">
        
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
            <Layers className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span>Multi-Bottle Wardrobe Builder</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)] mb-2">
            Build Your 20ml Fragrance Wardrobe<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)]">
            Never wear just one scent. Select 2 or 3 pocket flacons to unlock instant bundle discounts + Free Express Delivery.
          </p>
        </div>

        {/* Tabs: Custom vs Curated */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex p-1 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'custom' ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs' : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]'
              }`}
            >
              Custom Selection ({selectedSkus.length})
            </button>
            <button
              onClick={() => setActiveTab('curated')}
              className={`px-5 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'curated' ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs' : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]'
              }`}
            >
              Pre-Curated Wardrobes
            </button>
          </div>
        </div>

        {activeTab === 'curated' ? (
          /* Pre-Curated Bundles Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {curatedBundles.map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-serif font-bold text-[oklch(0.179_0.004_286)] text-base">{b.name}</h4>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-white text-[oklch(0.683_0.102_82.6)] border border-[oklch(0.926_0.01_81.8)]">
                    Save ₹{b.savings}
                  </span>
                </div>
                <p className="text-xs text-[oklch(0.442_0.015_286)] mb-4">{b.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[oklch(0.926_0.01_81.8)]">
                  <span className="text-base font-extrabold text-[oklch(0.179_0.004_286)]">₹{b.price.toLocaleString('en-IN')}</span>
                  <button
                    onClick={() => handleApplyCurated(b.skus)}
                    className="px-4 py-1.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                  >
                    Select Bundle
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Custom Wardrobe Selection View */
          <div>
            {/* Active Selected Flacons Bar */}
            <div className="p-4 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-3 flex items-center justify-between">
                <span>Selected Flacons ({selectedSkus.length})</span>
                <span className="text-[11px] text-[oklch(0.683_0.102_82.6)] font-semibold">{bundleName}</span>
              </div>

              {selectedSkus.length === 0 ? (
                <p className="text-xs text-[oklch(0.552_0.014_286)] italic py-4 text-center">
                  Select at least 2 perfumes from the catalog below to unlock bundle savings.
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
                          <p className="text-[10px] text-[oklch(0.552_0.014_286)] truncate">20ml Extrait</p>
                        </div>
                        <button
                          onClick={() => toggleSelect(sku)}
                          className="p-1 rounded text-[oklch(0.552_0.014_286)] hover:text-red-600 hover:bg-[oklch(0.98_0.005_78.3)] cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Catalog Selector Grid */}
            <p className="text-xs font-semibold text-[oklch(0.442_0.015_286)] mb-3">Tap any perfume to add or remove from your wardrobe:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 max-h-[300px] overflow-y-auto pr-1 mb-6">
              {products.map(p => {
                const isSelected = selectedSkus.includes(p.sku);
                return (
                  <div
                    key={p.sku}
                    onClick={() => toggleSelect(p.sku)}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)] shadow-2xs'
                        : 'bg-[oklch(0.98_0.005_78.3)] border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.179_0.004_286)]/30'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold text-[oklch(0.683_0.102_82.6)]">{p.sku}</span>
                      {isSelected ? (
                        <div className="w-4 h-4 rounded-full bg-[oklch(0.179_0.004_286)] text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5" />
                        </div>
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[oklch(0.552_0.014_286)]" />
                      )}
                    </div>
                    <p className="font-serif text-xs font-bold text-[oklch(0.179_0.004_286)] truncate">{p.name}</p>
                    <p className="text-[10px] text-[oklch(0.552_0.014_286)] truncate">{p.inspired_by.brand}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dynamic Pricing Footer & Action */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-extrabold text-[oklch(0.179_0.004_286)]">₹{finalTotal.toLocaleString('en-IN')}</span>
              {bundleDiscount > 0 && (
                <span className="text-sm text-[oklch(0.552_0.014_286)] line-through">₹{originalSubtotal.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-[oklch(0.683_0.102_82.6)] font-bold">
                {bundleDiscount > 0 ? `Saved ₹${bundleDiscount}` : 'Select 2 or more to save'}
              </span>
              <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
              <span className="text-emerald-700 font-medium">Free Priority Air Dispatch</span>
            </div>
          </div>

          <button
            onClick={handleAddAllToCart}
            disabled={selectedSkus.length === 0}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              selectedSkus.length > 0
                ? 'bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white shadow-sm'
                : 'bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.552_0.014_286)] cursor-not-allowed border border-[oklch(0.926_0.01_81.8)]'
            }`}
          >
            <span>Add Wardrobe to Cart</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
