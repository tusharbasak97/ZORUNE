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

  const categories = [
    { id: 'all', label: 'All 30 Icons', count: products.length },
    { id: 'tier1', label: 'Tier 1 Heroes', count: products.filter(p => p.tier === 'TIER_1_HERO').length, isCrown: true },
    { id: 'male', label: "Men's Collection", count: products.filter(p => p.gender === 'Male').length },
    { id: 'female', label: "Women's Collection", count: products.filter(p => p.gender === 'Female').length },
    { id: 'unisex', label: 'Shared / Unisex', count: products.filter(p => p.gender === 'Unisex').length },
    { id: 'fresh', label: 'Fresh Citrus & Aquatic', count: products.filter(p => p.main_accords.some(a => ['citrus', 'fresh', 'fresh spicy', 'marine', 'aquatic', 'green'].includes(a.toLowerCase()))).length },
    { id: 'gourmand', label: 'Warm Spices & Gourmand', count: products.filter(p => p.main_accords.some(a => ['vanilla', 'sweet', 'cinnamon', 'warm spicy', 'caramel'].includes(a.toLowerCase()))).length },
    { id: 'woody', label: 'Woody & Resins', count: products.filter(p => p.main_accords.some(a => ['woody', 'amber', 'oud', 'smoky', 'balsamic', 'leather'].includes(a.toLowerCase()))).length },
    { id: 'floral', label: 'Floral Elegance', count: products.filter(p => p.main_accords.some(a => ['white floral', 'floral', 'rose', 'powdery', 'fruity'].includes(a.toLowerCase()))).length },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Category filter
      if (selectedCategory === 'tier1' && p.tier !== 'TIER_1_HERO') return false;
      if (selectedCategory === 'male' && p.gender !== 'Male') return false;
      if (selectedCategory === 'female' && p.gender !== 'Female') return false;
      if (selectedCategory === 'unisex' && p.gender !== 'Unisex') return false;
      
      if (selectedCategory === 'fresh') {
        const isFresh = p.main_accords.some(a => ['citrus', 'fresh', 'fresh spicy', 'marine', 'aquatic', 'green'].includes(a.toLowerCase()));
        if (!isFresh) return false;
      }

      if (selectedCategory === 'gourmand') {
        const isGourmand = p.main_accords.some(a => ['vanilla', 'sweet', 'cinnamon', 'warm spicy', 'caramel'].includes(a.toLowerCase()));
        if (!isGourmand) return false;
      }

      if (selectedCategory === 'woody') {
        const isWoody = p.main_accords.some(a => ['woody', 'amber', 'oud', 'smoky', 'balsamic', 'leather'].includes(a.toLowerCase()));
        if (!isWoody) return false;
      }

      if (selectedCategory === 'floral') {
        const isFloral = p.main_accords.some(a => ['white floral', 'floral', 'rose', 'powdery', 'fruity'].includes(a.toLowerCase()));
        if (!isFloral) return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const allNotes = p.all_notes || [];
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesBrand = p.inspired_by.brand.toLowerCase().includes(q);
        const matchesOriginal = p.inspired_by.original_name.toLowerCase().includes(q);
        const matchesFamily = p.olfactive_family.toLowerCase().includes(q);
        const matchesAccords = p.main_accords.some(a => a.toLowerCase().includes(q));
        const matchesNotes = allNotes.some(n => n.toLowerCase().includes(q));

        if (!matchesName && !matchesSku && !matchesBrand && !matchesOriginal && !matchesFamily && !matchesAccords && !matchesNotes) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'reviews') return (b.reviews_count || 0) - (a.reviews_count || 0);
      if (sortBy === 'score') return (b.commercial_score || 0) - (a.commercial_score || 0);
      if (sortBy === 'longevity') return b.longevity_hours - a.longevity_hours;
      // Default: Commercial Rank
      return (a.commercial_rank || 99) - (b.commercial_rank || 99);
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" className="py-16 sm:py-24 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[oklch(0.683_0.102_82.6)] mb-2 block">
            THE COMPLETE COLLECTION
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[oklch(0.179_0.004_286)] mb-4">
            Curated 30 Olfactive Formulations<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[oklch(0.442_0.015_286)] font-light leading-relaxed">
            Every bottle is an uncompromised 20ml Extrait de Parfum (28% perfume oil concentration). 
            Explore by commercial rank, olfactory accords, or inspired designer house.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 bg-white p-3.5 rounded-2xl border border-[oklch(0.926_0.01_81.8)] shadow-2xs">
          
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
            <input
              type="text"
              placeholder="Search by perfume, notes (e.g. vanilla, bergamot), or inspired brand..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs sm:text-sm pl-10 pr-10 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none transition-all placeholder:text-[oklch(0.552_0.014_286)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
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
              <span className="hidden sm:inline font-medium">Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none cursor-pointer font-medium"
            >
              <option value="rank">Commercial Rank (#1 to #30)</option>
              <option value="score">Commercial Viability Score</option>
              <option value="rating">Community Rating (★)</option>
              <option value="reviews">Review Count</option>
              <option value="longevity">Longevity (Hours)</option>
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
          <span>Showing <strong className="text-[oklch(0.179_0.004_286)]">{filteredProducts.length}</strong> of 30 formulations</span>
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
