import React from 'react';
import { Search, ShoppingBag, Sparkles, Layers, Phone, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { UserAccount } from './AccountModal';

interface NavbarProps {
  onOpenSearch: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenAccount: () => void;
  user: UserAccount | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenSearch,
  onNavigateSection,
  onOpenAccount,
  user
}) => {
  const { cartCount, setIsCartOpen, setIsQuizOpen, setIsWardrobeOpen, setIsContactOpen, pricing } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-[oklch(0.98_0.005_78.3)]/95 backdrop-blur-md border-b border-[oklch(0.926_0.01_81.8)] transition-all">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo & Brand Identity (Dior / Chanel haute-parfumerie inspiration) */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer shrink-0" onClick={() => onNavigateSection('hero')}>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center shadow-sm shrink-0">
              <span className="font-serif text-base sm:text-lg font-bold text-[oklch(0.98_0.005_78.3)] tracking-tight">Z</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-extrabold tracking-[0.16em] sm:tracking-[0.2em] text-[oklch(0.179_0.004_286)] leading-none">
                ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </span>
              <span className="hidden sm:block text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.16em] text-[oklch(0.552_0.014_286)] uppercase font-semibold mt-0.5 sm:mt-1">
                Haute Parfumerie
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center justify-center gap-[clamp(0.5rem,1.2vw,1.75rem)] text-xs font-semibold uppercase tracking-wider shrink-0">
            <button
              onClick={() => onNavigateSection('catalog')}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              The 30 Icons
            </button>
            <button
              onClick={() => onNavigateSection('tier1')}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
            >
              <span>Tier 1 Heroes</span>
            </button>
            <button
              onClick={() => onNavigateSection('cannibalization')}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              Comparisons
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.683_0.102_82.6)] hover:text-[oklch(0.588_0.096_80.7)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer flex items-center space-x-1.5 font-bold whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Matchmaker</span>
            </button>
            <button
              onClick={() => setIsWardrobeOpen(true)}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.179_0.004_286)] hover:text-black hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
            >
              <Layers className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Wardrobe Builder</span>
            </button>
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer flex items-center space-x-1.5 whitespace-nowrap"
              title="Speak with Atelier Concierge"
            >
              <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Contact</span>
            </button>
          </nav>

          {/* Right Action Icons (Search, User Account & Cart) */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 xl:space-x-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center space-x-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] bg-white hover:bg-[oklch(0.959_0.01_87.5)] p-2 sm:px-3 sm:py-2 rounded-full border border-[oklch(0.926_0.01_81.8)] transition-all cursor-pointer text-xs shadow-2xs"
              title="Search all 30 perfumes, notes, accords"
              aria-label="Search Collection"
            >
              <Search className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span className="hidden 2xl:inline font-medium">Search...</span>
              <kbd className="hidden 2xl:inline-block px-1.5 py-0.5 text-[10px] bg-[oklch(0.98_0.005_78.3)] rounded text-[oklch(0.552_0.014_286)] border border-[oklch(0.926_0.01_81.8)]">⌘K</kbd>
            </button>

            {/* User Account Trigger */}
            <button
              onClick={onOpenAccount}
              className="flex items-center space-x-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] bg-white hover:bg-[oklch(0.959_0.01_87.5)] px-2.5 sm:px-3.5 py-2 rounded-full border border-[oklch(0.926_0.01_81.8)] transition-all cursor-pointer text-xs shadow-2xs"
              title={user ? `Patron Account (${user.fullName})` : 'Sign in to Patron Account'}
              aria-label="Patron Account"
            >
              <User className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span className="hidden md:inline font-medium">
                {user ? (user.fullName.split(' ')[0] || 'Patron') : 'Account'}
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center space-x-1.5 bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white px-3 sm:px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-md"
              aria-label="Shopping Cart Bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[oklch(0.98_0.005_78.3)]" />
              <span className="hidden md:inline text-xs font-semibold tracking-wide">Wardrobe</span>
              {cartCount > 0 && (
                <span className="flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[oklch(0.683_0.102_82.6)] text-white text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
              {pricing.finalTotal > 0 && (
                <span className="hidden 2xl:inline text-xs font-bold text-[oklch(0.926_0.01_81.8)] ml-0.5">
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

