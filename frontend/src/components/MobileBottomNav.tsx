import { Home, Crown, Search, Scale, Sparkles, Layers, ShoppingBag, ArrowLeft, Plus, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

interface MobileBottomNavProps {
  activeSection: string;
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  isProductPage?: boolean;
  product?: Product | null;
  onBackToCatalog?: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ 
  activeSection, 
  onOpenSearch, 
  onNavigateSection,
  isProductPage = false,
  product = null,
  onBackToCatalog
}) => {
  const { cartCount, setIsCartOpen, setIsQuizOpen, setIsWardrobeOpen, addToCart, setIsCheckoutOpen } = useCart();

  return (
    <>
      {/* 
        1. TABLET & FOLDABLE MODE (>= 600px and < 1280px / xl):
        Floating Right-Hand Side Navbar
        Researched & engineered to support all tablet & foldable viewports:
        - Galaxy Z Fold 4/5/6 inner screen: 768px (portrait), 1076px (landscape)
        - Google Pixel Fold / 9 Pro Fold: 840px (portrait), 1080px (landscape)
        - OnePlus Open: 1114px x 1116px (unfolded)
        - iPad Mini: 744px (portrait), 1133px (landscape)
        - iPad 10.2"/10.9": 810px–820px (portrait), 1080px–1180px (landscape)
        - iPad Pro 11": 834px (portrait), 1194px (landscape)
        - iPad Pro 12.9" (portrait): 1024px
        - Android 8"–12" Tablets: 600px–1280px
        
        Features:
        - Auto-contained vertical scroll with max-h-[90vh] so landscape screens (height 600px-768px) never overflow
        - Active section indicators with luxury brand colors
        - High z-index (z-50) so it always floats seamlessly above content
        - Hover tooltips positioned on the left side
      */}
      <nav 
        aria-label="Tablet & Foldable Navigation"
        className="hidden min-[600px]:flex xl:hidden fixed right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-50 flex-col items-center bg-white/95 backdrop-blur-2xl border border-[oklch(0.926_0.01_81.8)] shadow-[0_10px_35px_-5px_oklch(0_0_0/0.12)] rounded-full py-2.5 px-1 sm:px-1.5 space-y-1.5 sm:space-y-2 max-h-[90vh] overflow-y-auto no-scrollbar transition-all duration-300"
      >
        {/* Home */}
        <div className="relative group">
          <button
            onClick={() => onNavigateSection('hero')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeSection === 'hero'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-sm scale-105'
                : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)]'
            }`}
            aria-label="Home"
          >
            <Home className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            Home
          </span>
        </div>

        {/* Tier 1 Heroes */}
        <div className="relative group">
          <button
            onClick={() => onNavigateSection('tier1')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeSection === 'tier1'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-sm scale-105'
                : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)]'
            }`}
            aria-label="Tier 1 Top 8 Heroes"
          >
            <Crown className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            Top 8 Heroes
          </span>
        </div>

        {/* The 30 Catalog */}
        <div className="relative group">
          <button
            onClick={() => onNavigateSection('catalog')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeSection === 'catalog'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-sm scale-105'
                : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)]'
            }`}
            aria-label="Explore The 30 Catalog"
          >
            <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            The 30 Icons
          </span>
        </div>

        {/* Scent Comparisons */}
        <div className="relative group">
          <button
            onClick={() => onNavigateSection('cannibalization')}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
              activeSection === 'cannibalization'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-sm scale-105'
                : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)]'
            }`}
            aria-label="Scent Comparisons"
          >
            <Scale className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            Comparisons
          </span>
        </div>



        {/* Divider */}
        <div className="w-4 sm:w-5 h-px bg-[oklch(0.926_0.01_81.8)] my-0.5" />

        {/* Scent Quiz */}
        <div className="relative group">
          <button
            onClick={() => setIsQuizOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[oklch(0.683_0.102_82.6)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer relative"
            aria-label="Olfactive Matchmaker Quiz"
          >
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[oklch(0.683_0.102_82.6)] animate-ping" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[oklch(0.683_0.102_82.6)]" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            Matchmaker Quiz
          </span>
        </div>

        {/* Wardrobe Builder */}
        <div className="relative group">
          <button
            onClick={() => setIsWardrobeOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer relative"
            aria-label="Wardrobe Builder"
          >
            <Layers className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[oklch(0.683_0.102_82.6)]" />
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            Wardrobe (₹2,799)
          </span>
        </div>

        {/* Divider */}
        <div className="w-4 sm:w-5 h-px bg-[oklch(0.926_0.01_81.8)] my-0.5" />

        {/* Shopping Cart Bag */}
        <div className="relative group">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer relative"
            aria-label="Shopping Cart Bag"
          >
            <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-3.5 h-3.5 px-0.5 rounded-full bg-[oklch(0.683_0.102_82.6)] text-white text-[8px] font-bold">
                {cartCount}
              </span>
            )}
          </button>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none absolute right-full mr-2.5 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[oklch(0.179_0.004_286)] text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-lg">
            Bag ({cartCount})
          </span>
        </div>
      </nav>

      {/* 
        2. MOBILE PHONE MODE (< 600px):
        - When on PDP: Dedicated high-conversion bottom purchase bar
        - When on Home/Sections: Bottom Docked Navigation Bar for single-section switching
      */}
      <div className="min-[600px]:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-[oklch(0.926_0.01_81.8)] px-2.5 py-1.5 shadow-[0_-4px_20px_oklch(0_0_0/0.06)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
        {isProductPage && product ? (
          <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
            {/* Back to Catalog */}
            <button
              onClick={onBackToCatalog || (() => onNavigateSection('catalog'))}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              title="Return to Catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <div className="text-left">
                <span className="block text-[8px] uppercase tracking-wider text-[oklch(0.552_0.014_286)] font-bold leading-none">Catalog</span>
                <span className="block text-xs font-extrabold text-[oklch(0.179_0.004_286)] mt-0.5 leading-none">₹999</span>
              </div>
            </button>

            {/* Add to Bag */}
            <button
              onClick={() => {
                addToCart(product, 1);
                setIsCartOpen(true);
              }}
              className="flex-1 py-2.5 px-2 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer shadow-2xs active:scale-95 transition-all"
            >
              <Plus className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Add to Bag</span>
              {cartCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[oklch(0.683_0.102_82.6)] text-white text-[8px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Instant Buy */}
            <button
              onClick={() => {
                addToCart(product, 1);
                setIsCheckoutOpen(true);
              }}
              className="flex-1 py-2.5 px-2 rounded-xl bg-[oklch(0.179_0.004_286)] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer shadow-md active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Buy Now</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-around max-w-md mx-auto">
            
            {/* Home */}
            <button
              onClick={() => onNavigateSection('hero')}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all cursor-pointer ${
                activeSection === 'hero'
                  ? 'text-[oklch(0.179_0.004_286)] font-bold'
                  : 'text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] font-medium'
              }`}
            >
              <Home className="w-4 h-4 mb-0.5" />
              <span className="text-[9px] tracking-tight">Home</span>
              {activeSection === 'hero' && (
                <span className="w-1 h-1 rounded-full bg-[oklch(0.683_0.102_82.6)] mt-0.5" />
              )}
            </button>

            {/* Tier 1 / Top 8 */}
            <button
              onClick={() => onNavigateSection('tier1')}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all cursor-pointer ${
                activeSection === 'tier1'
                  ? 'text-[oklch(0.179_0.004_286)] font-bold'
                  : 'text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] font-medium'
              }`}
            >
              <Crown className="w-4 h-4 mb-0.5" />
              <span className="text-[9px] tracking-tight">Top 8</span>
              {activeSection === 'tier1' && (
                <span className="w-1 h-1 rounded-full bg-[oklch(0.683_0.102_82.6)] mt-0.5" />
              )}
            </button>

            {/* Catalog */}
            <button
              onClick={() => onNavigateSection('catalog')}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all cursor-pointer ${
                activeSection === 'catalog'
                  ? 'text-[oklch(0.179_0.004_286)] font-bold'
                  : 'text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] font-medium'
              }`}
            >
              <Search className="w-4 h-4 mb-0.5" />
              <span className="text-[9px] tracking-tight">The 30</span>
              {activeSection === 'catalog' && (
                <span className="w-1 h-1 rounded-full bg-[oklch(0.683_0.102_82.6)] mt-0.5" />
              )}
            </button>

            {/* Compare */}
            <button
              onClick={() => onNavigateSection('cannibalization')}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg transition-all cursor-pointer ${
                activeSection === 'cannibalization'
                  ? 'text-[oklch(0.179_0.004_286)] font-bold'
                  : 'text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] font-medium'
              }`}
            >
              <Scale className="w-4 h-4 mb-0.5" />
              <span className="text-[9px] tracking-tight">Compare</span>
              {activeSection === 'cannibalization' && (
                <span className="w-1 h-1 rounded-full bg-[oklch(0.683_0.102_82.6)] mt-0.5" />
              )}
            </button>



            {/* Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex-1 flex flex-col items-center justify-center py-1 px-0.5 rounded-lg text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-all cursor-pointer relative"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 mb-0.5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 flex items-center justify-center min-w-3.5 h-3.5 px-0.5 rounded-full bg-[oklch(0.683_0.102_82.6)] text-white text-[8px] font-bold">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-medium tracking-tight">Bag</span>
            </button>

          </div>
        )}
      </div>
    </>
  );
};
