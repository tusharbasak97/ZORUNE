import React from 'react';
import { Search, ShoppingBag, Sparkles, Phone, User } from 'lucide-react';
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
  const { cartCount, setIsCartOpen, setIsQuizOpen, setIsContactOpen, pricing } = useCart();

  return (
    <header className="sticky top-0 z-40 w-full bg-[oklch(0.98_0.005_78.3)]/95 backdrop-blur-md border-b border-[oklch(0.926_0.01_81.8)] transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="flex items-center justify-between h-16 sm:h-20">

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
          <nav className="hidden lg:flex items-center justify-center gap-[clamp(0.5rem,1.5vw,2rem)] text-xs font-semibold uppercase tracking-wider shrink-0">
            <button
              onClick={() => onNavigateSection('catalog')}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              Our Collection
            </button>
            <button
              onClick={() => onNavigateSection('cannibalization')}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer whitespace-nowrap"
            >
              Olfactive Matrix
            </button>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="px-2.5 xl:px-3 py-1.5 rounded-full text-[oklch(0.683_0.102_82.6)] hover:text-[oklch(0.588_0.096_80.7)] hover:bg-[oklch(0.959_0.01_87.5)] transition-all cursor-pointer flex items-center space-x-1.5 font-bold whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Matchmaker</span>
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
          <div className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 xl:w-auto xl:h-auto xl:px-3.5 xl:py-2 rounded-full flex items-center justify-center gap-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] bg-white hover:bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] transition-all cursor-pointer text-xs shadow-2xs active:scale-95"
              title="Search the 20 Sovereign Terroir Formulations, notes, accords"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] shrink-0" />
              <span className="hidden xl:inline font-medium">Search...</span>
              <kbd className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] bg-[oklch(0.98_0.005_78.3)] rounded text-[oklch(0.552_0.014_286)] border border-[oklch(0.926_0.01_81.8)]">⌘K</kbd>
            </button>

            {/* User Account Trigger */}
            <button
              onClick={onOpenAccount}
              className="w-9 h-9 md:w-auto md:h-auto md:px-3.5 md:py-2 rounded-full flex items-center justify-center gap-1.5 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] bg-white hover:bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] transition-all cursor-pointer text-xs shadow-2xs active:scale-95"
              title={user ? `Patron Account (${user.fullName})` : 'Sign in to Patron Account'}
              aria-label="Patron Account"
            >
              <User className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] shrink-0" />
              <span className="hidden md:inline font-medium">
                {user ? (user.fullName.split(' ')[0] || 'Patron') : 'Account'}
              </span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative w-9 h-9 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full flex items-center justify-center gap-1.5 bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm hover:shadow-md"
              aria-label={`Shopping Cart Bag with ${cartCount} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[oklch(0.98_0.005_78.3)] shrink-0" />
              <span className="hidden md:inline text-xs font-semibold tracking-wide">Bag</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:static md:top-auto md:right-auto flex items-center justify-center min-w-4 h-4 px-1 rounded-full bg-[oklch(0.683_0.102_82.6)] text-white text-[9px] md:text-[10px] font-bold border-2 border-white md:border-0 shadow-xs">
                  {cartCount}
                </span>
              )}
              {pricing.finalTotal > 0 && (
                <span className="hidden xl:inline text-xs font-bold text-[oklch(0.926_0.01_81.8)] ml-0.5">
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

