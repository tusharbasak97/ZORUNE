import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface CannibalizationShowcaseProps {
  products: Product[];
}

interface ComparisonItem {
  sku: string;
  name: string;
  inspiration: string;
  archetype: string;
  description: string;
  accords: string;
  bestFor: string;
  longevity: string;
}

export const CannibalizationShowcase: React.FC<CannibalizationShowcaseProps> = ({ products }) => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'blue' | 'swy' | 'sweet' | 'floral'>('blue');

  const getProduct = (sku: string) => products.find(p => p.sku === sku);

  const handleAdd = (sku: string) => {
    const p = getProduct(sku);
    if (p) addToCart(p, 1);
  };

  const blueItems: ComparisonItem[] = [
    {
      sku: 'ZR-07',
      name: 'Apex',
      inspiration: 'YSL Y EDP',
      archetype: 'The Crisp Daily Engine',
      description: 'Bursting with tart green apple, fresh ginger, and herbaceous sage. Engineered for high-energy productivity, gym sessions, and daily office wear.',
      accords: 'Green Apple, Fresh Ginger, Amberwood',
      bestFor: 'Daily Office, Workouts & High Energy',
      longevity: '8–10 Hours (Crisp Projection)'
    },
    {
      sku: 'ZR-08',
      name: 'Bleu',
      inspiration: 'Chanel BDC EDP',
      archetype: 'The Boardroom Standard',
      description: 'Refined grapefruit, pink pepper, and aristocratic cedarwood. Never loud, always authoritative. The universal benchmark for understated luxury.',
      accords: 'Pink Pepper, Grapefruit, Incense Cedar',
      bestFor: 'Executive Meetings & Formal Events',
      longevity: '8–10 Hours (Discrete Radiance)'
    },
    {
      sku: 'ZR-15',
      name: 'Savage',
      inspiration: 'Dior Sauvage Parfum',
      archetype: 'The Magnetic Nighttime Force',
      description: 'Deep Calabrian bergamot, creamy Sri Lankan sandalwood, and nocturnal vanilla. Projects through cool evening air with raw masculine charisma.',
      accords: 'Calabrian Bergamot, Sandalwood, Olibanum',
      bestFor: 'Nightlife, Clubbing & Cold Evenings',
      longevity: '10–12 Hours (Nuclear Sillage)'
    }
  ];

  const swyItems: ComparisonItem[] = [
    {
      sku: 'ZR-01',
      name: 'Intense',
      inspiration: 'Armani SWY Intensely',
      archetype: 'The Seductive Gourmand Flame',
      description: 'Cozy toffee caramel, warm cinnamon, and intoxicating Madagascar vanilla. The viral compliment beast engineered for cold weather dates and social romance.',
      accords: 'Toffee Caramel, Warm Cinnamon, Vanilla',
      bestFor: 'Winter Dates, Socials & Young Pros',
      longevity: '10–12 Hours (Warm Cloud)'
    },
    {
      sku: 'ZR-04',
      name: 'Absolute',
      inspiration: 'Armani SWY Absolutely',
      archetype: "The Connoisseur's Boozy Reserve",
      description: 'Aged French rum liqueur, glazed smoky chestnuts, and dark bourbon vanilla. Substantially less sweet, deeper, and steeped in smoky woody depth.',
      accords: 'French Rum Liqueur, Glazed Chestnut, Cedar',
      bestFor: 'Black-Tie Dinners & Private Evenings',
      longevity: '10–12 Hours (Velvety Depth)'
    }
  ];

  const sweetItems: ComparisonItem[] = [
    {
      sku: 'ZR-05',
      name: 'Elixir',
      inspiration: 'JPG Le Male Elixir',
      archetype: 'The Liquid Honey Titan',
      description: 'Lavish golden honey, warm benzoin, and rich roasted tonka bean. An explosive, opulent clubbing statement that cuts through any crowded venue.',
      accords: 'Golden Honey, Warm Tonka, Benzoin',
      bestFor: 'Nightclubs, Parties & Winter Nights',
      longevity: '12+ Hours (Nuclear Longevity)'
    },
    {
      sku: 'ZR-01',
      name: 'Intense',
      inspiration: 'Armani SWY Intensely',
      archetype: 'Cashmere Caramel Romance',
      description: 'Decadent toffee, pink pepper, and sweet cinnamon spun into a cozy cashmere sweater effect. Irresistible proximity scent for intimate dinners.',
      accords: 'Pink Pepper, Toffee Caramel, Suede',
      bestFor: 'Intimate Dinners & Cozy Dates',
      longevity: '10–12 Hours (Enveloping Sillage)'
    },
    {
      sku: 'ZR-02',
      name: 'Wanted',
      inspiration: 'Azzaro Most Wanted',
      archetype: 'Midnight Cardamom Weapon',
      description: 'Minimalist three-note perfection of fiery green cardamom, molten caramel, and bourbon amberwood. Ultra-clean, potent, and effortlessly seductive.',
      accords: 'Fiery Cardamom, Toffee, Bourbon Amberwood',
      bestFor: 'Evening Socials & Lounge Bars',
      longevity: '10–12 Hours (Sharp Projection)'
    }
  ];

  const floralItems: ComparisonItem[] = [
    {
      sku: 'ZR-28',
      name: 'Crystal',
      inspiration: 'Versace Bright Crystal',
      archetype: 'Iced Yuzu & Peony Sparkler',
      description: 'Sparkling frosted pomegranate, iced yuzu, and translucent peony petals. An invigorating, clean, crystalline floral for high heat and casual days.',
      accords: 'Frosted Pomegranate, Peony, Lotus Flower',
      bestFor: 'High Heat Summers, Gym & Casual Days',
      longevity: '7–8 Hours (Fresh Aura)'
    },
    {
      sku: 'ZR-19',
      name: 'Gardenia',
      inspiration: 'Gucci Flora Gardenia',
      archetype: 'Sunlit Pear & Brown Sugar Glow',
      description: 'Playful white gardenia absolute sweetened with sun-ripened Italian pear and warm brown sugar. Joyful, uplifting, and tailored for weekend brunches.',
      accords: 'White Gardenia, Solar Pear, Brown Sugar',
      bestFor: 'Weekend Brunches & Garden Parties',
      longevity: '8–9 Hours (Radiant Cloud)'
    },
    {
      sku: 'ZR-25',
      name: 'Adore',
      inspiration: "Dior J'adore",
      archetype: 'Royal French Golden Bouquet',
      description: 'Regal Grasse grandiflorum jasmine, Damascus rose, and golden Comorian ylang-ylang. An architectural triumph of timeless French haute perfumerie.',
      accords: 'Grasse Jasmine, Damascena Rose, Ylang',
      bestFor: 'Formal Galas & Diplomatic Events',
      longevity: '9–10 Hours (Opulent Floral)'
    }
  ];

  const renderCard = (item: ComparisonItem) => (
    <div 
      key={`${item.sku}-${item.name}`}
      className="group relative flex flex-col justify-between h-full p-6 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/60 transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl overflow-hidden shadow-2xs"
    >
      <div>
        {/* Top Header Pill & SKU */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-bold text-[oklch(0.683_0.102_82.6)] uppercase tracking-wider truncate">
            {item.sku} • {item.inspiration}
          </span>
          <span className="text-[10px] font-semibold text-[oklch(0.442_0.015_286)] bg-[oklch(0.959_0.01_87.5)] px-2 py-0.5 rounded-full border border-[oklch(0.926_0.01_81.8)] shrink-0">
            20ml • ₹999
          </span>
        </div>

        {/* Archetype Headline */}
        <h3 className="font-serif text-xl font-bold text-[oklch(0.179_0.004_286)] mb-2 group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors">
          {item.archetype}
        </h3>

        {/* Editorial Character Description */}
        <p className="text-xs text-[oklch(0.442_0.015_286)] mb-5 leading-relaxed min-h-[48px]">
          {item.description}
        </p>

        {/* Unified Olfactory Architecture Spec Box */}
        <div className="text-[11px] text-[oklch(0.262_0.007_286)] space-y-2 mb-6 bg-[oklch(0.98_0.005_78.3)] p-3.5 rounded-xl border border-[oklch(0.926_0.01_81.8)]">
          <div className="flex items-start justify-between gap-2">
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0">• Primary Accords:</span>
            <span className="text-right font-medium text-[oklch(0.179_0.004_286)]">{item.accords}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0">• Best Worn:</span>
            <span className="text-right font-medium text-[oklch(0.179_0.004_286)]">{item.bestFor}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0">• Longevity:</span>
            <span className="text-right font-bold text-[oklch(0.683_0.102_82.6)]">{item.longevity}</span>
          </div>
        </div>
      </div>

      {/* Unified Add Flacon Button */}
      <button
        onClick={() => handleAdd(item.sku)}
        className="w-full py-2.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-1.5"
      >
        <span>Add {item.sku} Flacon (₹999)</span>
      </button>
    </div>
  );

  return (
    <section id="cannibalization" className="py-16 sm:py-24 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)]">
              Connoisseur Olfactory Comparisons
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[oklch(0.179_0.004_286)] mb-3">
            Navigating Overlapping Masterpieces<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-sm text-[oklch(0.442_0.015_286)] leading-relaxed">
            Similar scent profiles serve completely different lifestyles. Here is how our perfumers recommend pairing and distinguishing between iconic fragrances.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveTab('blue')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'blue'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)]'
            }`}
          >
            The Blue Trinity (Apex vs Bleu vs Savage)
          </button>
          <button
            onClick={() => setActiveTab('swy')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'swy'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)]'
            }`}
          >
            Armani SWY Flankers (Intense vs Absolute)
          </button>
          <button
            onClick={() => setActiveTab('sweet')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'sweet'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)]'
            }`}
          >
            Sweet Nightlife (Elixir vs Intense vs Wanted)
          </button>
          <button
            onClick={() => setActiveTab('floral')}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'floral'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)]'
            }`}
          >
            Feminine Florals (Gardenia vs Voyage vs Adore)
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'blue' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blueItems.map(renderCard)}
          </div>
        )}

        {activeTab === 'swy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {swyItems.map(renderCard)}
          </div>
        )}

        {activeTab === 'sweet' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sweetItems.map(renderCard)}
          </div>
        )}

        {activeTab === 'floral' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {floralItems.map(renderCard)}
          </div>
        )}

      </div>
    </section>
  );
};
