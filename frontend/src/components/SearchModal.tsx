import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, products }) => {
  const [query, setQuery] = useState('');
  const { navigateToProduct } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickTags = [
    'Louis Vuitton',
    'Sauvage',
    'Baccarat Rouge',
    'Le Male Elixir',
    'Angels Share',
    'Vanilla',
    'Tobacco',
    'Citrus',
    'Oud',
    'Date Night'
  ];

  const filtered = query.trim()
    ? products.filter(p => {
        const q = query.toLowerCase().trim();
        const allNotes = p.all_notes || [];
        return (
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.inspired_by.brand.toLowerCase().includes(q) ||
          p.inspired_by.original_name.toLowerCase().includes(q) ||
          p.olfactive_family.toLowerCase().includes(q) ||
          p.main_accords.some(a => a.toLowerCase().includes(q)) ||
          allNotes.some(n => n.toLowerCase().includes(q)) ||
          p.when_to_apply.occasions.some(o => o.toLowerCase().includes(q))
        );
      })
    : [];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-3xl bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-6 mt-6 sm:mt-12 overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
      >
        
        {/* Top Input Bar */}
        <div className="relative flex items-center border-b border-[oklch(0.926_0.01_81.8)] pb-4 mb-4">
          <Search className="w-5 h-5 text-[oklch(0.683_0.102_82.6)] mr-3" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by perfume, inspired brand (LV, Dior), notes (vanilla, oud)..."
            className="w-full bg-transparent text-[oklch(0.179_0.004_286)] text-base sm:text-lg focus:outline-none placeholder:text-[oklch(0.552_0.014_286)]"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Search Suggestions */}
        {!query.trim() && (
          <div className="py-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.552_0.014_286)] block mb-3">
              Popular Searches & Inspirations
            </span>
            <div className="flex flex-wrap gap-2">
              {quickTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] text-xs font-medium transition-all cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {query.trim() && (
          <div 
            className="flex-1 overflow-y-auto pr-1 space-y-3 min-h-0 overscroll-contain popup-scroll-pane"
            data-lenis-prevent
          >
            <div className="flex justify-between items-center text-xs text-[oklch(0.552_0.014_286)] pb-1">
              <span>Results for &ldquo;{query}&rdquo;</span>
              <span>{filtered.length} found</span>
            </div>

            {filtered.length > 0 ? (
              filtered.map((p) => (
                <div
                  key={p.sku}
                  onClick={() => {
                    navigateToProduct(p.sku);
                    onClose();
                  }}
                  className="p-3.5 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 flex items-center justify-between gap-4 cursor-pointer transition-all group shadow-2xs"
                >
                  <img
                    src={p.image_url}
                    alt={p.name}
                    className="w-12 h-14 object-contain rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white p-1 flex-shrink-0"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-0.5">
                      <span className="text-xs font-bold text-[oklch(0.683_0.102_82.6)]">{p.sku}</span>
                      {p.tier === 'TIER_1_HERO' && (
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[oklch(0.179_0.004_286)] text-white">
                          Hero
                        </span>
                      )}
                      <span className="text-[10px] text-[oklch(0.552_0.014_286)]">{p.gender}</span>
                    </div>

                    <h4 className="font-serif text-base font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors truncate">
                      {p.name}
                    </h4>

                    <p className="text-xs text-[oklch(0.442_0.015_286)] truncate">
                      Inspired by {p.inspired_by.brand} {p.inspired_by.original_name}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-sm font-extrabold text-[oklch(0.179_0.004_286)] block">₹999</span>
                    <span className="text-[10px] text-[oklch(0.683_0.102_82.6)] font-semibold block">20ml Extrait</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-[oklch(0.552_0.014_286)] text-sm">
                No matching fragrances found for &ldquo;{query}&rdquo;.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
