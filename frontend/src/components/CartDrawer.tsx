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
    setIsCheckoutOpen
  } = useCart();

  React.useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isCartOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-heading"
    >
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Drawer Panel Container */}
      <div className="absolute inset-y-0 right-0 w-full sm:w-auto max-w-full flex justify-end">
        <div className="w-full sm:w-[450px] bg-white border-l border-[oklch(0.926_0.01_81.8)] p-4 sm:p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300 h-full max-h-[100dvh] overflow-hidden">
          
          {/* Top Bar */}
          <div>
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-[oklch(0.926_0.01_81.8)]">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
                <h3 id="cart-drawer-heading" className="font-serif text-lg sm:text-xl font-bold text-[oklch(0.179_0.004_286)]">
                  Your Private Reserve<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
                </h3>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="p-1.5 sm:p-2 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)] flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dynamic Savings & Free Shipping Ticker */}
            <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl bg-[oklch(0.977_0.013_86.8)] border border-[oklch(0.926_0.01_81.8)]">
              <div className="flex items-center justify-between text-xs gap-2">
                <span className="font-bold text-[oklch(0.683_0.102_82.6)] flex items-center space-x-1 truncate">
                  <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{pricing.bundleName}</span>
                </span>
                <span className="text-[11px] font-bold text-emerald-700 whitespace-nowrap flex-shrink-0">
                  Complimentary Courier
                </span>
              </div>
            </div>
          </div>

          {/* Cart Items List */}
          <div 
            className="flex-1 overflow-y-auto my-3 sm:my-4 pr-1 space-y-3 min-h-0 overscroll-contain popup-scroll-pane"
            data-lenis-prevent
          >
            {cart.length === 0 ? (
              <div className="py-16 sm:py-20 text-center px-4">
                <ShoppingBag className="w-12 h-12 text-[oklch(0.926_0.01_81.8)] mx-auto mb-3" />
                <p className="text-base font-serif text-[oklch(0.179_0.004_286)] mb-1 font-bold">Your private reserve is empty</p>
                <p className="text-xs text-[oklch(0.552_0.014_286)] mb-6">Explore our 20 Sovereign Terroir Formulations.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.sku}
                  className="p-3 sm:p-3.5 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] flex items-center justify-between gap-2.5 sm:gap-3 shadow-2xs"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-13 h-15 sm:w-16 sm:h-18 object-contain rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white p-1 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0 pr-1">
                    <span className="text-[10px] text-[oklch(0.683_0.102_82.6)] font-bold block">{item.product.sku}</span>
                    <h4 className="font-serif text-sm font-bold text-[oklch(0.179_0.004_286)] truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-[oklch(0.552_0.014_286)] truncate">
                      {item.product.concentration || '25% Extrait'} • 50ml
                    </p>
                    <div className="text-xs font-extrabold text-[oklch(0.179_0.004_286)] mt-0.5">
                      €{(item.product.price_eur || Math.round(item.product.price / 90)) * item.quantity}{' '}
                      <span className="font-normal text-[oklch(0.442_0.015_286)] text-[11px]">
                        (₹{(item.product.price * item.quantity).toLocaleString('en-IN')})
                      </span>
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-end space-y-1.5 flex-shrink-0">
                    <div className="flex items-center space-x-1 bg-white rounded-lg p-1 border border-[oklch(0.926_0.01_81.8)] shadow-2xs">
                      <button
                        onClick={() => updateQuantity(item.product.sku, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.product.name}`}
                        className="w-6 h-6 flex items-center justify-center text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] active:scale-95 cursor-pointer"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] px-1.5 min-w-[1.1rem] text-center select-none">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.sku, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.product.name}`}
                        className="w-6 h-6 flex items-center justify-center text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.sku)}
                      aria-label={`Remove ${item.product.name} from reserve`}
                      className="text-[10px] text-[oklch(0.552_0.014_286)] hover:text-red-600 active:text-red-700 flex items-center space-x-1 cursor-pointer py-0.5"
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
            <div className="pt-3 sm:pt-4 border-t border-[oklch(0.926_0.01_81.8)] space-y-2.5 sm:space-y-3 pb-[max(0.5rem,env(safe-area-inset-bottom))]">
              
              {/* Quality & Pricing Assurance Banner */}
              <div className="p-2.5 sm:p-3 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] block truncate">Single-Origin Terroir Parfumerie</span>
                    <span className="text-[10px] text-[oklch(0.442_0.015_286)] block truncate">40% PCR Flacons • Threaded SNI-15 Refillable</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-[oklch(0.683_0.102_82.6)] border border-[oklch(0.926_0.01_81.8)] flex-shrink-0 whitespace-nowrap">
                  20%–30% Extrait
                </span>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[oklch(0.442_0.015_286)]">
                <div className="flex justify-between items-center">
                  <span>Subtotal ({pricing.bottleCount} Editions)</span>
                  <span className="text-[oklch(0.179_0.004_286)] font-medium">
                    €{pricing.originalSubtotalEur} <span className="font-normal text-[oklch(0.442_0.015_286)] text-[11px]">(₹{pricing.originalSubtotal.toLocaleString('en-IN')})</span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>White-Glove Insured Courier</span>
                  <span className="text-emerald-700 font-semibold text-[11px]">COMPLIMENTARY</span>
                </div>
                <div className="flex justify-between items-center text-sm font-extrabold text-[oklch(0.179_0.004_286)] pt-1.5 border-t border-[oklch(0.926_0.01_81.8)]">
                  <span>Final Investment</span>
                  <span className="text-[oklch(0.179_0.004_286)] text-base">
                    €{pricing.finalTotalEur} <span className="text-xs font-normal text-[oklch(0.442_0.015_286)]">(₹{pricing.finalTotal.toLocaleString('en-IN')})</span>
                  </span>
                </div>
              </div>

              {/* Instant 1-Click Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] active:scale-[0.99] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <span>Acquire Selection</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <p className="text-[10px] text-center text-[oklch(0.552_0.014_286)] flex items-center justify-center space-x-1">
                <Zap className="w-3 h-3 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
                <span className="truncate">White-Glove Courier Dispatch • Presentation Casket</span>
              </p>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
