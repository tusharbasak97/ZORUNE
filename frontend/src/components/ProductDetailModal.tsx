import React, { useState } from 'react';
import { X, Crown, Clock, MapPin, Plus, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    setIsCheckoutOpen,
    userPincode,
    setUserPincode,
    pincodeDeliveryText,
    isSameDayAvailable
  } = useCart();

  const [inputPin, setInputPin] = useState<string>(userPincode);
  const [pinChecked, setPinChecked] = useState<boolean>(true);

  React.useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isTier1 = product.tier === 'TIER_1_HERO';

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin.trim().length === 6) {
      setUserPincode(inputPin.trim());
      setPinChecked(true);
    }
  };

  const handleOneClickBuy = () => {
    addToCart(product, 1);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setSelectedProduct(null)}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-5 sm:p-8 overscroll-contain popup-scroll-pane"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-5 right-5 z-20 p-2 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Image & Highlights */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[oklch(0.97_0.007_88.6)] border border-[oklch(0.926_0.01_81.8)] shadow-xs p-6 flex items-center justify-center">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-contain"
              />

              {/* Tier Badge */}
              <div className="absolute top-3 left-3">
                {isTier1 ? (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[oklch(0.179_0.004_286)] text-white shadow-xs">
                    <Crown className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                    <span>Tier 1 • Crown Icon</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/95 text-[oklch(0.442_0.015_286)] border border-[oklch(0.926_0.01_81.8)] backdrop-blur-xs">
                    <span>{product.tier === 'TIER_2_REVENUE' ? 'Signature Workhorse' : 'Connoisseur Pick'}</span>
                  </span>
                )}
              </div>

              {/* Price & Savings Pill */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] flex items-center justify-between shadow-2xs">
                <div>
                  <span className="text-[11px] text-[oklch(0.552_0.014_286)] block font-medium">Uniform Luxury Price</span>
                  <div className="flex items-baseline space-x-1.5">
                    <span className="text-xl font-extrabold text-[oklch(0.179_0.004_286)]">₹999</span>
                    <span className="text-xs text-[oklch(0.552_0.014_286)] line-through">₹{product.original_price_inr.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)]">
                  Save {product.arbitrage_savings_percent}%
                </span>
              </div>
            </div>

            {/* Performance Gauges */}
            <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-center">
              <div>
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase font-semibold block mb-0.5">Longevity</span>
                <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] flex items-center justify-center space-x-1">
                  <Clock className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>{product.longevity_hours} Hours</span>
                </span>
              </div>
              <div className="border-x border-[oklch(0.926_0.01_81.8)]">
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase font-semibold block mb-0.5">Sillage</span>
                <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] flex items-center justify-center space-x-1">
                  <Zap className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>{product.sillage_rating}</span>
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase font-semibold block mb-0.5">Sprays</span>
                <span className="text-xs font-bold text-[oklch(0.179_0.004_286)]">~300 Sprays</span>
              </div>
            </div>
          </div>

          {/* Right Column: Scent DNA, Pyramid & Checkout */}
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center space-x-2 text-xs text-[oklch(0.683_0.102_82.6)] font-bold tracking-wider uppercase mb-1">
                <span>{product.sku}</span>
                <span>•</span>
                <span>{product.gender}</span>
                <span>•</span>
                <span>20ml Extrait (28%)</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)] mb-2">
                {product.name}<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </h2>
              
              {/* Inspired By Transparency Box */}
              <div className="p-3.5 rounded-xl bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] mb-3">
                <p className="text-xs text-[oklch(0.262_0.007_286)]">
                  Direct Olfactory Extraction of <strong className="text-[oklch(0.179_0.004_286)]">{product.inspired_by.brand} {product.inspired_by.original_name}</strong>
                </p>
                <p className="text-[11px] text-[oklch(0.552_0.014_286)] mt-0.5">
                  Original Luxury MSRP: ₹{product.original_price_inr.toLocaleString('en-IN')} (${product.original_price_usd}) • ZORUNE: ₹999
                </p>
              </div>

              {/* Tagline or Rescue Angle */}
              {product.rescue_angle ? (
                <div className="p-3 rounded-lg bg-[oklch(0.977_0.013_86.8)] border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.262_0.007_286)] text-xs">
                  <strong className="block text-[11px] uppercase tracking-wider mb-0.5 text-[oklch(0.683_0.102_82.6)]">Formulation Note:</strong>
                  {product.rescue_angle}
                </div>
              ) : (
                <p className="text-xs text-[oklch(0.442_0.015_286)] italic">{product.tagline}</p>
              )}
            </div>

            {/* Olfactive Pyramid */}
            <div className="p-4 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] block">
                The Scent Pyramid
              </span>

              {/* Top Notes */}
              <div>
                <span className="text-[11px] text-[oklch(0.552_0.014_286)] block mb-1">Top Notes (First 15 Minutes):</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.top.map((n, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-white text-[oklch(0.262_0.007_286)] border border-[oklch(0.926_0.01_81.8)]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Middle Notes */}
              <div>
                <span className="text-[11px] text-[oklch(0.552_0.014_286)] block mb-1">Heart Notes (Hours 1–4):</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.middle.map((n, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-[oklch(0.977_0.013_86.8)] text-[oklch(0.588_0.096_80.7)] border border-[oklch(0.926_0.01_81.8)]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>

              {/* Base Notes */}
              <div>
                <span className="text-[11px] text-[oklch(0.552_0.014_286)] block mb-1">Base Notes (Hours 4–12+):</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.notes.base.map((n, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-full text-xs bg-white text-[oklch(0.179_0.004_286)] font-medium border border-[oklch(0.926_0.01_81.8)]">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Wearing Occasions & Seasons */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase block mb-1 font-semibold">Best Seasons</span>
                <span className="text-[oklch(0.179_0.004_286)] font-medium">{product.when_to_apply.seasons.join(', ')}</span>
              </div>
              <div className="p-3 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase block mb-1 font-semibold">Prime Occasions</span>
                <span className="text-[oklch(0.179_0.004_286)] font-medium">{product.when_to_apply.occasions.slice(0, 2).join(', ')}</span>
              </div>
            </div>

            {/* Priority Pincode Delivery Checker */}
            <div className="p-3.5 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Check Priority Delivery SLA</span>
                </span>
                {isSameDayAvailable && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Same-Day Metro Hub
                  </span>
                )}
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 400050)"
                  className="flex-1 bg-white text-[oklch(0.179_0.004_286)] text-xs px-3 py-2 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold cursor-pointer"
                >
                  Check
                </button>
              </form>

              {pinChecked && (
                <p className="text-xs text-[oklch(0.262_0.007_286)] mt-2 font-medium flex items-center space-x-1">
                  <Zap className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Estimated: {pincodeDeliveryText}</span>
                </p>
              )}
            </div>

            {/* CTAs Footer */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleOneClickBuy}
                className="w-full py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>1-Click Buy Now (₹999)</span>
                <span className="text-[11px] font-normal opacity-70">• Instant Fast Checkout</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  setSelectedProduct(null);
                }}
                className="w-full py-3 rounded-full bg-white hover:bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] font-semibold text-xs tracking-wider uppercase border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.179_0.004_286)] transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <span>Add 20ml to Wardrobe (Duo ₹1,899 / Trio ₹2,799)</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
