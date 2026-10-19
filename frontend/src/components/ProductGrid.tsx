import React, { useState, useMemo } from 'react';
import { Search, X, Crown, ArrowUpDown } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('rank');

  interface CategoryItem {
    id: string;
    label: string;
    count: number;
    isCrown?: boolean;
  }

  const categories: CategoryItem[] = [
    { id: 'all', label: 'All Creations', count: products.length, isCrown: true },
    { id: 'unisex', label: 'Unisex Terroir', count: products.filter(p => p.gender === 'Unisex').length },
    { id: 'female', label: "Women's Collection", count: products.filter(p => p.gender === 'Female').length },
    { id: 'male', label: "Men's Structured", count: products.filter(p => p.gender === 'Male').length },
    { id: 'japan', label: 'Japan Terroir', count: products.filter(p => p.terroir?.origin.includes('Japan')).length },
    { id: 'africa', label: 'South Africa Fynbos', count: products.filter(p => p.terroir?.origin.includes('South Africa')).length },
    { id: 'southasia', label: 'South Asia Terroir', count: products.filter(p => p.terroir?.origin.includes('India') || p.terroir?.origin.includes('Kashmir')).length },
    { id: 'europe', label: 'European Botanicals', count: products.filter(p => p.terroir?.origin.includes('France') || p.terroir?.origin.includes('Italy') || p.terroir?.origin.includes('Spain') || p.terroir?.origin.includes('Tunisia') || p.terroir?.origin.includes('Corsica')).length },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory === 'unisex' && p.gender !== 'Unisex') return false;
      if (selectedCategory === 'female' && p.gender !== 'Female') return false;
      if (selectedCategory === 'male' && p.gender !== 'Male') return false;
      if (selectedCategory === 'japan' && !p.terroir?.origin.includes('Japan')) return false;
      if (selectedCategory === 'africa' && !p.terroir?.origin.includes('South Africa')) return false;
      if (selectedCategory === 'southasia' && !p.terroir?.origin.includes('India') && !p.terroir?.origin.includes('Kashmir')) return false;
      if (selectedCategory === 'europe' && !['France', 'Italy', 'Spain', 'Tunisia', 'Corsica'].some(c => p.terroir?.origin.includes(c))) return false;
      if (selectedCategory === 'tier1' && p.tier !== 'TIER_1_HERO') return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const allNotes = p.all_notes || [];
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesBrand = p.inspired_by?.brand?.toLowerCase().includes(q) ?? false;
        const matchesOriginal = p.inspired_by?.original_name?.toLowerCase().includes(q) ?? false;
        const matchesFamily = p.olfactive_family.toLowerCase().includes(q);
        const matchesAccords = p.main_accords.some(a => a.toLowerCase().includes(q));
        const matchesNotes = allNotes.some(n => n.toLowerCase().includes(q));
        const matchesTerroir = p.terroir ? (p.terroir.origin.toLowerCase().includes(q) || p.terroir.cooperative.toLowerCase().includes(q)) : false;

        if (!matchesName && !matchesSku && !matchesBrand && !matchesOriginal && !matchesFamily && !matchesAccords && !matchesNotes && !matchesTerroir) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_asc') return (a.price_eur || a.price) - (b.price_eur || b.price);
      if (sortBy === 'price_desc') return (b.price_eur || b.price) - (a.price_eur || a.price);
      if (sortBy === 'longevity') return b.longevity_hours - a.longevity_hours;
      if (sortBy === 'concentration') {
        const getConc = (p: Product) => parseInt(p.concentration.replace(/\D/g, '')) || 25;
        return getConc(b) - getConc(a);
      }
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      // Default: Commercial Rank
      return (a.commercial_rank || 99) - (b.commercial_rank || 99);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="relative py-16 sm:py-24 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[oklch(0.683_0.102_82.6)] mb-2 block">
            SOVEREIGN HAUTE PARFUMERIE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[oklch(0.179_0.004_286)] mb-4">
            Our Collection<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[oklch(0.442_0.015_286)] font-light leading-relaxed max-w-2xl mx-auto">
            Single-origin terroir botanicals compounded into sovereign extraits, encased in sculptural refillable crystal and presentation coffrets.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-[oklch(0.926_0.01_81.8)] shadow-2xs">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <label htmlFor="catalog-search" className="sr-only">
              Search fragrances by note or name
            </label>
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
            <input
              type="text"
              id="catalog-search"
              name="catalog-search"
              aria-label="Search fragrances by note or name"
              placeholder="Search by perfume name, notes (e.g. yuzu, orris, saffron, buchu), or terroir..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none transition-all placeholder:text-[oklch(0.552_0.014_286)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-3 self-end md:self-auto">
            <span className="text-xs text-[oklch(0.442_0.015_286)] flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <label htmlFor="catalog-sort" className="hidden sm:inline font-medium cursor-pointer">Sort by:</label>
            </span>
            <select
              id="catalog-sort"
              name="catalog-sort"
              aria-label="Sort master formulations"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none cursor-pointer font-medium"
            >
              <option value="rank">Master Formulary Rank (#1 to #20)</option>
              <option value="price_asc">Investment: € Low to High</option>
              <option value="price_desc">Investment: € High to Low</option>
              <option value="longevity">Skin Longevity (Hours)</option>
              <option value="concentration">Pure Extrait Concentration (%)</option>
              <option value="name">Olfactive Creation (A–Z)</option>
            </select>
          </div>

        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                    : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:border-[oklch(0.179_0.004_286)]/30 border border-[oklch(0.926_0.01_81.8)]'
                }`}
              >
                {cat.isCrown && <Crown className={`w-3.5 h-3.5 ${isActive ? 'fill-white' : 'text-[oklch(0.683_0.102_82.6)]'}`} />}
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)]'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Matching Count / Active Filter Feedback */}
        <div className="flex items-center justify-between text-xs text-[oklch(0.442_0.015_286)] mb-6 px-1">
          <span>Showing <strong className="text-[oklch(0.179_0.004_286)]">{filteredProducts.length}</strong> of {products.length} creations</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-[oklch(0.683_0.102_82.6)] hover:underline cursor-pointer font-semibold"
            >
              Clear search &ldquo;{searchQuery}&rdquo;
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.sku} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-2xl border border-[oklch(0.926_0.01_81.8)] p-8 shadow-2xs">
            <p className="text-lg font-serif text-[oklch(0.179_0.004_286)] mb-2 font-bold">No fragrances matched your criteria</p>
            <p className="text-sm text-[oklch(0.442_0.015_286)] mb-6">Try searching for other notes like vanilla, citrus, or oud.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-6 py-2.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs tracking-wider uppercase cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
