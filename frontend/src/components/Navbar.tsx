import React from 'react';
import { Search, ShoppingBag, Sparkles, Layers, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, onNavigateSection }) => {
  const { cartCount, setIsCartOpen, setIsQuizOpen, setIsWardrobeOpen, setIsContactOpen, pricing } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-[oklch(0.98_0.005_78.3)]/95 backdrop-blur-md border-b border-[oklch(0.926_0.01_81.8)] transition-all">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity (Dior / Chanel haute-parfumerie inspiration) */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => onNavigateSection('hero')}>
            <div className="w-9 h-9 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center shadow-sm">
              <span className="font-serif text-lg font-bold text-[oklch(0.98_0.005_78.3)] tracking-tight">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.22em] text-[oklch(0.179_0.004_286)] leading-none">
                ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[oklch(0.552_0.014_286)] uppercase font-semibold mt-1">
                Haute Parfumerie • 28% Extrait
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs font-semibold uppercase tracking-wider">
            <button 
              onClick={() => onNavigateSection('catalog')} 
              className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer py-1"
            >
              The 30 Icons
            </button>
            <button 
              onClick={() => onNavigateSection('tier1')} 
              className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer py-1 flex items-center space-x-1.5"
            >
              <span>Tier 1 Heroes</span>
              <span className="px-1.5 py-0.5 text-[9px] bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] rounded border border-[oklch(0.926_0.01_81.8)] font-bold">Top 8</span>
            </button>
            <button 
              onClick={() => onNavigateSection('cannibalization')} 
              className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer py-1"
            >
              Scent Comparisons
            </button>
            <button 
              onClick={() => setIsQuizOpen(true)} 
              className="text-[oklch(0.683_0.102_82.6)] hover:text-[oklch(0.588_0.096_80.7)] transition-colors cursor-pointer py-1 flex items-center space-x-1 font-bold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Olfactive Matchmaker</span>
            </button>
            <button 
              onClick={() => setIsWardrobeOpen(true)} 
              className="text-[oklch(0.179_0.004_286)] hover:text-black transition-colors cursor-pointer px-3.5 py-1.5 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)] shadow-xs flex items-center space-x-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Wardrobe Builder</span>
              <span className="px-1.5 py-0.2 text-[9px] bg-[oklch(0.683_0.102_82.6)] text-white font-extrabold rounded">
                Save ₹500
              </span>
            </button>
            <button 
              onClick={() => setIsContactOpen(true)} 
              className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer py-1 flex items-center space-x-1.5"
              title="Speak with Atelier Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Right Action Icons (Search & Cart) */}
          <div className="flex items-center space-x-3.5">
            {/* Search Trigger */}
            <button 
              onClick={onOpenSearch}
              className="flex items-center space-x-2 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] bg-white hover:bg-[oklch(0.959_0.01_87.5)] px-3.5 py-2 rounded-full border border-[oklch(0.926_0.01_81.8)] transition-all cursor-pointer text-xs shadow-2xs"
              title="Search all 30 perfumes, notes, accords"
            >
              <Search className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span className="hidden sm:inline font-medium">Search collection...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-[oklch(0.98_0.005_78.3)] rounded text-[oklch(0.552_0.014_286)] border border-[oklch(0.926_0.01_81.8)]">⌘K</kbd>
            </button>

            {/* Cart Trigger */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-2 bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-md"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[oklch(0.98_0.005_78.3)]" />
              <span className="hidden sm:inline text-xs font-semibold tracking-wide">Wardrobe</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[oklch(0.683_0.102_82.6)] text-white text-[10px] font-bold animate-pulse">
                  {cartCount}
                </span>
              )}
              {pricing.finalTotal > 0 && (
                <span className="hidden md:inline text-xs font-bold text-[oklch(0.926_0.01_81.8)] ml-1">
                  ₹{pricing.finalTotal.toLocaleString('en-IN')}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
