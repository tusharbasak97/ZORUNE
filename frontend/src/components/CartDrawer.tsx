import React from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    pricing, 
    setIsCheckoutOpen,
    setIsWardrobeOpen
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-[oklch(0.926_0.01_81.8)] p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[oklch(0.926_0.01_81.8)]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[oklch(0.683_0.102_82.6)]" />
                <h3 className="font-serif text-xl font-bold text-[oklch(0.179_0.004_286)]">Your Fragrance Wardrobe<span className="text-[oklch(0.683_0.102_82.6)]">.</span></h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Savings & Free Shipping Ticker */}
            <div className="mt-4 p-3.5 rounded-xl bg-[oklch(0.977_0.013_86.8)] border border-[oklch(0.926_0.01_81.8)]">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-[oklch(0.683_0.102_82.6)] flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{pricing.bundleName}</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700">
                  {pricing.freeShipping ? 'FREE Priority Express' : 'Add 1 more for Free Shipping'}
                </span>
              </div>

              {/* Progress prompt towards next bundle level */}
              {pricing.nextTierPrompt && (
                <p className="text-[11px] text-[oklch(0.442_0.015_286)] leading-snug">
                  {pricing.nextTierPrompt}
                </p>
              )}
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-3">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-[oklch(0.926_0.01_81.8)] mx-auto mb-3" />
                <p className="text-base font-serif text-[oklch(0.179_0.004_286)] mb-1 font-bold">Your wardrobe is empty</p>
                <p className="text-xs text-[oklch(0.552_0.014_286)] mb-6">Explore our 30 iconic 20ml Extrait formulations.</p>
                <button
                  onClick={() => { setIsCartOpen(false); setIsWardrobeOpen(true); }}
                  className="px-6 py-2.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Build Your Wardrobe
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.sku}
                  className="p-3.5 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] flex items-center justify-between gap-3 shadow-2xs"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-14 h-16 object-contain rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white p-1 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[oklch(0.683_0.102_82.6)] font-bold block">{item.product.sku}</span>
                    <h4 className="font-serif text-sm font-bold text-[oklch(0.179_0.004_286)] truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-[oklch(0.552_0.014_286)] truncate">20ml Extrait (28%)</p>
                    <span className="text-xs font-extrabold text-[oklch(0.179_0.004_286)] block mt-1">₹999</span>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end space-y-2">
                    <div className="flex items-center space-x-1.5 bg-white rounded-lg p-1 border border-[oklch(0.926_0.01_81.8)]">
                      <button
                        onClick={() => updateQuantity(item.product.sku, item.quantity - 1)}
                        className="p-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] px-1.5">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.sku, item.quantity + 1)}
                        className="p-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.sku)}
                      className="text-[10px] text-[oklch(0.552_0.014_286)] hover:text-red-600 flex items-center space-x-0.5 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Financials & Instant Checkout */}
          {cart.length > 0 && (
            <div className="pt-4 border-t border-[oklch(0.926_0.01_81.8)] space-y-3">
              
              {/* Quality & Pricing Assurance Banner */}
              <div className="p-3 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                  <div>
                    <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] block">Direct Atelier Pricing</span>
                    <span className="text-[10px] text-[oklch(0.442_0.015_286)]">1 for ₹999 • 2 for ₹1,899 • 3 for ₹2,799</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[oklch(0.683_0.102_82.6)] border border-[oklch(0.926_0.01_81.8)]">
                  28% Extrait
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[oklch(0.442_0.015_286)]">
                <div className="flex justify-between">
                  <span>Subtotal ({pricing.bottleCount} Bottles)</span>
                  <span className="text-[oklch(0.179_0.004_286)] font-medium">₹{pricing.originalSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {pricing.bundleDiscount > 0 && (
                  <div className="flex justify-between text-[oklch(0.683_0.102_82.6)] font-semibold">
                    <span>Multi-Flacon Savings</span>
                    <span>-₹{pricing.bundleDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Priority Express Logistics</span>
                  <span className="text-emerald-700 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-[oklch(0.179_0.004_286)] pt-2 border-t border-[oklch(0.926_0.01_81.8)]">
                  <span>Final Total</span>
                  <span className="text-[oklch(0.179_0.004_286)] text-base">₹{pricing.finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Instant 1-Click Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <span>Instant 1-Click Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[10px] text-center text-[oklch(0.552_0.014_286)] flex items-center justify-center space-x-1">
                <Zap className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                <span>Same-Day Priority Air Dispatch • Sealed 20ml Flacon</span>
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
