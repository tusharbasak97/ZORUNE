import React, { useState } from 'react';
import { Sparkles, Thermometer, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface CannibalizationShowcaseProps {
  products: Product[];
}

interface ComparisonItem {
  sku: string;
  name: string;
  formula: string;
  archetype: string;
  description: string;
  accords: string;
  bestFor: string;
  longevity: string;
  climateFeature: string;
}

export const CannibalizationShowcase: React.FC<CannibalizationShowcaseProps> = ({ products }) => {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'climate' | 'aristocracy' | 'nocturnal' | 'lifestyle'>('climate');

  const getProduct = (sku: string) => products.find(p => p.sku === sku);

  const handleAdd = (sku: string) => {
    const p = getProduct(sku);
    if (p) addToCart(p, 1);
  };

  const climateItems: ComparisonItem[] = [
    {
      sku: 'ZR-U01',
      name: 'Yuzu Céleste',
      formula: 'Formula U-01',
      archetype: 'The Glacier Spring & High Humidity Resistor',
      description: 'Pristine Kōchi yuzu cold-pressed oil, Japanese white mint, and Himalayan juniper berry over crystalline biotech ambroxan. Engineered to resist 45°C heat without souring.',
      accords: 'Kōchi Yuzu, Hokkaido Mint, Juniper CO2, Biotech Ambroxan',
      bestFor: 'High Summer Heat, Humid Monsoons & Active Mountain Travel',
      longevity: '15+ Hours (Glacier Sparkling Halo)',
      climateFeature: 'Active Quad Co-Solvent Volatility Retarder'
    },
    {
      sku: 'ZR-M04',
      name: 'Vetiver Monsoon',
      formula: 'Formula M-04',
      archetype: 'The Kannauj Rainmaker • Wet Earth & Geosmin',
      description: 'Traditional copper-deg hydro-distilled Kannauj Ruh Khus paired with natural riverbed clay geosmin and Italian green mandarin. Cuts through monsoon downpours.',
      accords: 'Kannauj Ruh Khus, Mitti Attar (Geosmin), Green Mandarin, Patchouli',
      bestFor: 'Monsoon Humidity, High-Heat Executive Wear & Deep Grounding',
      longevity: '16+ Hours (Crisp Cooling Earth Sillage)',
      climateFeature: 'Non-Indolic Hydrophobic Earth Matrix'
    }
  ];

  const aristocracyItems: ComparisonItem[] = [
    {
      sku: 'ZR-W01',
      name: 'Orris Soie',
      formula: 'Formula W-01',
      archetype: 'Florentine Orris Butter (15% Irone) & Haute Suede',
      description: 'Three-year cured organic Florentine Iris butter enriched with Grasse jasmine grandiflorum and New Caledonian sandalwood. Aristocratic luxury with zero synthetic sweetness.',
      accords: 'Florentine Orris (15% Irone), Grasse Jasmine, Suede, Sandalwood',
      bestFor: 'Executive Boardrooms, Black-Tie Galas & Quiet Luxury',
      longevity: '18+ Hours (Regal Powdery Sillage)',
      climateFeature: 'Anhydrous Non-Sweetening Resin Stabilizer'
    },
    {
      sku: 'ZR-U05',
      name: 'Mysore Santal',
      formula: 'Formula U-05',
      archetype: 'Ancient Chola Temple Santalum Album',
      description: 'Certified sustainable Karnataka Santalum album heartwood paired with Australian sandalwood, ambrette seeds, and golden Siamese benzoin tears.',
      accords: 'Karnataka Santalum Album, Australian Sandalwood, Benzoin Siam, Ambrette',
      bestFor: 'High-Stakes Presence, Signature Dignity & Spiritual Comfort',
      longevity: '20+ Hours (Milky Balsamic Resonance)',
      climateFeature: 'High-Free-Santalol (>90%) Fixative Skeleton'
    }
  ];

  const nocturnalItems: ComparisonItem[] = [
    {
      sku: 'ZR-M03',
      name: 'Oud Samarkhand',
      formula: 'Formula M-03',
      archetype: 'Assam Wild Oud, Kashmiri Saffron & Green Hojari',
      description: 'Sustainable Assam wild Aquilaria oud infused with rare Kashmiri saffron and imperial Omani Royal Green Hojari frankincense. Deep, animalic, and resinous.',
      accords: 'Assam Wild Oud (30%), Pampore Saffron, Green Hojari Frankincense',
      bestFor: 'Freezing Winter Galas, Private Salons & Royal Evening Presence',
      longevity: '20+ Hours (Magnetic Enveloping Cloud)',
      climateFeature: 'Anti-Collapse Thermal Cold Matrix'
    },
    {
      sku: 'ZR-U02',
      name: 'Saffron Nomade',
      formula: 'Formula U-02',
      archetype: 'The Golden Stigma • Pampore Saffron & Somalian Myrrh',
      description: 'High-altitude Grade-1 Mongra Kashmiri saffron stigmas paired with Somalian myrrh, green Guatemalan cardamom, and golden ambergris.',
      accords: 'Pampore Saffron CO2, Somalian Myrrh, Cardamom, Golden Amber',
      bestFor: 'High-Altitude Travel, Intimate Dinners & Creative Elegance',
      longevity: '18+ Hours (Spiced Golden Aura)',
      climateFeature: 'Skin-Temperature Osmotic Diffusion Engine'
    }
  ];

  const lifestyleItems: ComparisonItem[] = [
    {
      sku: 'ZR-M01',
      name: 'Kiso Silence',
      formula: 'Formula M-01',
      archetype: 'The Temple Cryptomeria • Kiso Valley Hinoki',
      description: 'Serene, dry, resinous cedarwood, therapeutic Japanese Hinoki heartwood, damp moss, and cold temple incense rising into misty alpine air.',
      accords: 'Kiso Hinoki Heartwood, Yakushima Sugi, Elemi, Smoked Incense',
      bestFor: 'Boardroom Authority, Mindful Focus & Bespoke Tailoring',
      longevity: '17+ Hours (Sovereign Resinous Wood Sillage)',
      climateFeature: 'Zero-Water Phase-Stable Conifer Shield'
    },
    {
      sku: 'ZR-W02',
      name: 'Madurai Lune',
      formula: 'Formula W-02',
      archetype: 'Pre-Dawn Madurai Jasmine Sambac & Pink Pepper',
      description: 'Intoxicating night-blooming Indian jasmine sambac buds blossoming into solar radiance with pink pepper and Haitian vetiver.',
      accords: 'Madurai Jasmine Sambac, Mysore Tuberose, Pink Pepper, Haitian Vetiver',
      bestFor: 'Sunlit Brunches, Chic Vacations & Tropical Evenings',
      longevity: '16+ Hours (Hypnotic White-Floral Projection)',
      climateFeature: 'Hydrophobic Solar White-Floral Complex'
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
            {item.sku} • {item.formula}
          </span>
          <span className="text-[10px] font-semibold text-[oklch(0.442_0.015_286)] bg-[oklch(0.959_0.01_87.5)] px-2 py-0.5 rounded-full border border-[oklch(0.926_0.01_81.8)] shrink-0">
            30% Extrait • 50ml Flacon
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
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0">• Key Notes:</span>
            <span className="text-right font-medium text-[oklch(0.179_0.004_286)]">{item.accords}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0">• Climate Role:</span>
            <span className="text-right font-medium text-[oklch(0.179_0.004_286)]">{item.bestFor}</span>
          </div>
          <div className="flex items-start justify-between gap-2">
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0">• Longevity:</span>
            <span className="text-right font-bold text-[oklch(0.683_0.102_82.6)]">{item.longevity}</span>
          </div>
          <div className="flex items-start justify-between gap-2 pt-1 border-t border-[oklch(0.926_0.01_81.8)]/60">
            <span className="text-[oklch(0.552_0.014_286)] font-semibold shrink-0 flex items-center space-x-1">
              <Thermometer className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
              <span>Physics Shield:</span>
            </span>
            <span className="text-right text-[10px] text-[oklch(0.442_0.015_286)] italic">{item.climateFeature}</span>
          </div>
        </div>
      </div>

      {/* Unified Add Flacon Button */}
      <button
        onClick={() => handleAdd(item.sku)}
        className="w-full py-2.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-1.5"
      >
        <span>Acquire {item.sku} Master Flacon</span>
      </button>
    </div>
  );

  return (
    <section id="cannibalization" className="relative py-16 sm:py-24 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[oklch(0.442_0.015_286)]">
              The Master Formulation Architecture
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[oklch(0.179_0.004_286)] mb-3">
            Climate & Olfactory Architecture Matrix<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-sm text-[oklch(0.442_0.015_286)] leading-relaxed">
            Every formulation in the Master Compendium is engineered for a specific thermodynamic challenge and lifestyle domain. Compare accords and climate physics below.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto px-2">
          <button
            onClick={() => setActiveTab('climate')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer text-center ${
              activeTab === 'climate'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:border-[oklch(0.683_0.102_82.6)]/40'
            }`}
          >
            Extreme Climate Resistors (Heat & Monsoon)
          </button>
          <button
            onClick={() => setActiveTab('aristocracy')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer text-center ${
              activeTab === 'aristocracy'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:border-[oklch(0.683_0.102_82.6)]/40'
            }`}
          >
            Quiet Luxury & Formal Authority (Iris & Chypre)
          </button>
          <button
            onClick={() => setActiveTab('nocturnal')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer text-center ${
              activeTab === 'nocturnal'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:border-[oklch(0.683_0.102_82.6)]/40'
            }`}
          >
            Nocturnal Seduction & Winter (Cognac & Cashmere)
          </button>
          <button
            onClick={() => setActiveTab('lifestyle')}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer text-center ${
              activeTab === 'lifestyle'
                ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-xs'
                : 'bg-white text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] shadow-2xs hover:border-[oklch(0.683_0.102_82.6)]/40'
            }`}
          >
            Modern Chic & Daytime Signature (Fig & Citrus Tea)
          </button>
        </div>

        {/* Tab Content Display */}
        {activeTab === 'climate' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {climateItems.map(renderCard)}
          </div>
        )}

        {activeTab === 'aristocracy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {aristocracyItems.map(renderCard)}
          </div>
        )}

        {activeTab === 'nocturnal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {nocturnalItems.map(renderCard)}
          </div>
        )}

        {activeTab === 'lifestyle' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {lifestyleItems.map(renderCard)}
          </div>
        )}

      </div>
    </section>
  );
};
