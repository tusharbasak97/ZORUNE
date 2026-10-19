import React from 'react';
import { Home, Search, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface MobileBottomNavProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onOpenSearch, onNavigateSection }) => {
  const { cartCount, setIsCartOpen, setIsQuizOpen } = useCart();

  return (
    <>
      {/* 1. TABLET & MID-SCREEN MODE (768px - 1279px): Floating Right-Hand Side Navbar */}
      <nav 
        aria-label="Tablet Floating Navigation"
        className="hidden md:flex xl:hidden fixed right-4 top-1/2 -translate-y-1/2 z-50 flex-col items-center bg-white/90 backdrop-blur-2xl border border-[oklch(0.926_0.01_81.8)] shadow-2xl rounded-full py-4 px-2 space-y-3.5 transition-all duration-300"
      >
        {/* Home */}
        <div className="relative group">
          <button
            onClick={() => onNavigateSection('hero')}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer"
            aria-label="Home"
          >
            <Home className="w-5 h-5" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg">
            Home
          </span>
        </div>

        {/* Our Collection */}
        <div className="relative group">
          <button
            onClick={() => onNavigateSection('catalog')}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer"
            aria-label="Explore Catalog"
          >
            <Search className="w-5 h-5" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg">
            Our Collection
          </span>
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-[oklch(0.926_0.01_81.8)]" />

        {/* Scent Quiz */}
        <div className="relative group">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[oklch(0.683_0.102_82.6)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer relative"
            aria-label="Olfactive Matchmaker Quiz"
          >
            <Sparkles className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[oklch(0.683_0.102_82.6)] animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[oklch(0.683_0.102_82.6)]" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg">
            Olfactive Matchmaker
          </span>
        </div>

        {/* Divider */}
        <div className="w-6 h-px bg-[oklch(0.926_0.01_81.8)]" />

        {/* Shopping Cart Bag */}
        <div className="relative group">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer relative"
            aria-label="Shopping Cart Bag"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[oklch(0.179_0.004_286)] text-white text-[9px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg">
            Bag ({cartCount})
          </span>
        </div>
      </nav>

      {/* 2. MOBILE PHONE MODE (< md, < 768px): Bottom Docked Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[oklch(0.926_0.01_81.8)] px-3 py-2 shadow-lg">
        <div className="flex items-center justify-around max-w-md mx-auto">
          
          {/* Home */}
          <button
            onClick={() => onNavigateSection('hero')}
            className="flex flex-col items-center justify-center p-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
          >
            <Home className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium tracking-wide">Home</span>
          </button>

          {/* Catalog */}
          <button
            onClick={() => onNavigateSection('catalog')}
            className="flex flex-col items-center justify-center p-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-medium tracking-wide">Collection</span>
          </button>

          {/* Quiz */}
          <button
            onClick={() => setIsQuizOpen(true)}
            className="flex flex-col items-center justify-center p-1.5 text-[oklch(0.683_0.102_82.6)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
          >
            <Sparkles className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] font-bold tracking-wide">Matchmaker</span>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping Cart Bag with ${cartCount} items`}
            className="flex flex-col items-center justify-center p-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] active:scale-95 transition-all cursor-pointer relative touch-manipulation"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 mb-0.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[oklch(0.179_0.004_286)] text-white text-[9px] font-bold shadow-xs">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-[10px] font-medium tracking-wide">Bag</span>
          </button>

        </div>
      </div>
    </>
  );
};
