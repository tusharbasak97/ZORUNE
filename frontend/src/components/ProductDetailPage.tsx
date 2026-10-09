import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, ShieldCheck, Zap, Droplets, Clock, 
  MapPin, CheckCircle2, Plus, Sparkles, Layers, Share2, 
  Check, Info, ChevronRight, Wind, Award
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  onNavigateHome: () => void;
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  onNavigateHome,
  onSelectProduct
}) => {
  const { 
    addToCart, 
    setIsCartOpen, 
    setIsCheckoutOpen, 
    setIsWardrobeOpen,
    userPincode, 
    setUserPincode, 
    pincodeDeliveryText, 
    isSameDayAvailable 
  } = useCart();

  const [inputPin, setInputPin] = useState(userPincode);
  const [pinChecked, setPinChecked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedImage, setSelectedImage] = useState(product.image_url);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedImage(product.image_url);

    // Update document title for SEO
    const prevTitle = document.title;
    document.title = `ZORUNE. ${product.sku} - ${product.name} | 20ml Extrait de Parfum (28%) Inspired by ${product.inspired_by.brand} ${product.inspired_by.original_name}`;

    // Update meta description if element exists
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      'content',
      `${product.name} (${product.sku}) by ZORUNE. Pure 28% Extrait de Parfum inspired by ${product.inspired_by.brand} ${product.inspired_by.original_name}. 20ml pocket flacon for flat ₹999. ${product.longevity_hours}h longevity.`
    );

    // Inject JSON-LD Schema.org Product structured data for Google SEO
    const scriptId = 'zorune-pdp-jsonld';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      'name': `ZORUNE ${product.sku} ${product.name} (20ml Extrait de Parfum)`,
      'image': product.image_url,
      'description': product.description,
      'sku': product.sku,
      'brand': {
        '@type': 'Brand',
        'name': 'ZORUNE Haute Parfumerie'
      },
      'offers': {
        '@type': 'Offer',
        'url': window.location.href,
        'priceCurrency': 'INR',
        'price': 999,
        'availability': 'https://schema.org/InStock',
        'itemCondition': 'https://schema.org/NewCondition',
        'seller': {
          '@type': 'Organization',
          'name': 'ZORUNE'
        }
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': product.rating,
        'reviewCount': product.reviews_count
      }
    };
    script.text = JSON.stringify(jsonLd);

    return () => {
      document.title = prevTitle;
      const el = document.getElementById(scriptId);
      if (el) el.remove();
    };
  }, [product]);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPin.length === 6) {
      setUserPincode(inputPin);
      setPinChecked(true);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleInstantBuy = () => {
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  // Find complementary fragrance for Duo recommendation (2 for ₹1,899)
  const complementaryProduct = allProducts.find(
    p => p.sku !== product.sku && (p.tier === 'TIER_1_HERO' || p.gender === product.gender)
  ) || allProducts.find(p => p.sku !== product.sku);

  // Find 3 related fragrances from the same olfactive family or tier
  const relatedProducts = allProducts
    .filter(p => p.sku !== product.sku)
    .filter(p => p.olfactive_family === product.olfactive_family || p.tier === product.tier)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] flex flex-col font-sans selection:bg-[oklch(0.683_0.102_82.6)] selection:text-white">
      
      {/* Editorial Breadcrumbs & Back Navigation Bar */}
      <div className="w-full bg-white border-b border-[oklch(0.926_0.01_81.8)] py-3.5 px-4 sm:px-8 sticky top-0 z-30 shadow-2xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 text-[oklch(0.442_0.015_286)]">
            <button
              onClick={onNavigateHome}
              className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer flex items-center space-x-1 font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>The 30 Masterpieces</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[oklch(0.926_0.01_81.8)]" />
            <span className="text-[oklch(0.552_0.014_286)] hidden sm:inline">{product.olfactive_family}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[oklch(0.926_0.01_81.8)] hidden sm:inline" />
            <span className="font-bold text-[oklch(0.179_0.004_286)] truncate max-w-[180px] sm:max-w-none">
              {product.name} ({product.sku})
            </span>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-1 text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer px-2.5 py-1 rounded-full border border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)]"
            title="Copy Product Link"
          >
            {copiedLink ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Link Copied</span>
              </>
            ) : (
              <>
                <Share2 className="w-3 h-3" />
                <span>Share Flacon</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main PDP Grid */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14">
          
          {/* Left Column: Visual Flacon Showcase (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="sticky top-20">
              
              {/* Flacon Main Media Container */}
              <div className="relative aspect-square w-full rounded-3xl bg-white border border-[oklch(0.926_0.01_81.8)] p-8 shadow-xs flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="w-full h-full object-contain filter drop-shadow-xl hover:scale-105 transition-transform duration-500"
                />

                {/* Extrait Seal Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[oklch(0.179_0.004_286)] text-white tracking-wider uppercase flex items-center space-x-1 shadow-sm">
                    <Droplets className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                    <span>28% Extrait</span>
                  </span>
                </div>

                {/* Arbitrage Savings Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] shadow-2xs">
                    Save {product.arbitrage_savings_percent}%
                  </span>
                </div>

                {/* Subtle Flacon Specification Tag */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-[oklch(0.552_0.014_286)] bg-[oklch(0.98_0.005_78.3)]/90 backdrop-blur-xs px-3.5 py-1.5 rounded-xl border border-[oklch(0.926_0.01_81.8)]">
                  <span>Uniform 20ml Pocket Flacon</span>
                  <span>~300 Precision Sprays</span>
                </div>
              </div>

              {/* Performance Metrics Trio */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="p-3.5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] text-center shadow-2xs">
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase font-bold tracking-wider block mb-1">
                    Skin Longevity
                  </span>
                  <div className="flex items-center justify-center space-x-1 font-extrabold text-[oklch(0.179_0.004_286)] text-sm">
                    <Clock className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                    <span>{product.longevity_hours} Hours</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] text-center shadow-2xs">
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase font-bold tracking-wider block mb-1">
                    Sillage Radius
                  </span>
                  <div className="flex items-center justify-center space-x-1 font-extrabold text-[oklch(0.179_0.004_286)] text-sm">
                    <Wind className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                    <span>{product.sillage_rating}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] text-center shadow-2xs">
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] uppercase font-bold tracking-wider block mb-1">
                    Authenticity
                  </span>
                  <div className="flex items-center justify-center space-x-1 font-extrabold text-[oklch(0.179_0.004_286)] text-sm">
                    <Award className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                    <span>Pure French Oils</span>
                  </div>
                </div>
              </div>

              {/* Kinetic Maceration Reassurance Card */}
              <div className="p-4 rounded-2xl bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] mt-4 text-xs text-[oklch(0.442_0.015_286)]">
                <div className="flex items-center space-x-2 text-[oklch(0.179_0.004_286)] font-bold mb-1">
                  <Info className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                  <span>The 48-Hour Transit Rest Protocol</span>
                </div>
                <p className="leading-relaxed text-[11px] text-[oklch(0.442_0.015_286)]">
                  High-concentration 28% Extraits experience kinetic pressure during priority air transit. 
                  After arrival, spray 3 test pumps and allow your flacon to rest for 24–48 hours in dark storage for peak accord equilibrium.
                </p>
              </div>

            </div>
          </div>

          {/* Right Column: Scent Architecture & Purchase Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Titles & Rating */}
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase mb-2">
                <span className="text-[oklch(0.683_0.102_82.6)]">{product.sku}</span>
                <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
                <span className="text-[oklch(0.442_0.015_286)]">{product.gender}</span>
                <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
                <span className="text-[oklch(0.552_0.014_286)]">{product.olfactive_family}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-tight leading-tight mb-3">
                {product.name}<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </h1>

              {/* Ratings and Reviews count */}
              <div className="flex items-center space-x-3 text-xs text-[oklch(0.552_0.014_286)] mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] fill-[oklch(0.683_0.102_82.6)]" />
                  ))}
                  <span className="font-bold text-[oklch(0.179_0.004_286)] ml-1.5">{product.rating}</span>
                </div>
                <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
                <span>{(product.reviews_count / 1000).toFixed(1)}k verified connoisseur reviews</span>
                <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
                <span className="text-emerald-700 font-semibold flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock</span>
                </span>
              </div>

              {/* Olfactory Extraction Transparency Callout */}
              <div className="p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] mb-6 shadow-2xs">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.552_0.014_286)] block mb-0.5">
                      Direct Olfactory Extraction
                    </span>
                    <p className="text-sm font-semibold text-[oklch(0.179_0.004_286)]">
                      Inspired by {product.inspired_by.brand} {product.inspired_by.original_name}
                    </p>
                    <p className="text-xs text-[oklch(0.442_0.015_286)] mt-1">
                      Original Luxury Retail: <span className="line-through text-[oklch(0.552_0.014_286)]">₹{product.original_price_inr.toLocaleString('en-IN')} (${product.original_price_usd})</span>
                    </p>
                  </div>
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] border border-[oklch(0.926_0.01_81.8)] whitespace-nowrap">
                    28% Extrait Formulation
                  </span>
                </div>
              </div>

              {/* Transparent Direct Pricing */}
              <div className="p-5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.552_0.014_286)] block mb-0.5">
                    Direct Atelier Price (20ml Pocket Flacon)
                  </span>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-extrabold text-[oklch(0.179_0.004_286)]">₹999</span>
                    <span className="text-xs text-[oklch(0.552_0.014_286)] line-through">₹{product.original_price_inr.toLocaleString('en-IN')}</span>
                    <span className="text-xs font-bold text-emerald-700">Save {product.arbitrage_savings_percent}%</span>
                  </div>
                </div>

                <div className="text-left sm:text-right text-xs">
                  <span className="font-bold text-[oklch(0.179_0.004_286)] block">Multi-Flacon Direct Tiers</span>
                  <span className="text-[oklch(0.683_0.102_82.6)] font-semibold">2 for ₹1,899 • 3 for ₹2,799</span>
                </div>
              </div>

            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)]">Composition Story</h3>
              <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Scent Pyramid Breakdown */}
            <div className="p-6 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs space-y-5">
              <div className="flex items-center space-x-2 pb-3 border-b border-[oklch(0.926_0.01_81.8)]">
                <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <h3 className="font-serif text-base font-bold text-[oklch(0.179_0.004_286)]">The 3-Tier Olfactive Pyramid</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                {/* Top Notes */}
                <div className="p-3.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)] block mb-1">
                    Top Notes (0–30 min)
                  </span>
                  <p className="text-xs font-semibold text-[oklch(0.179_0.004_286)] mb-1">
                    {product.notes.top.join(', ')}
                  </p>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)]">Initial projection aura</span>
                </div>

                {/* Heart Notes */}
                <div className="p-3.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)] block mb-1">
                    Heart Notes (1–4 hrs)
                  </span>
                  <p className="text-xs font-semibold text-[oklch(0.179_0.004_286)] mb-1">
                    {product.notes.middle.join(', ')}
                  </p>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)]">Core sillage signature</span>
                </div>

                {/* Base Notes */}
                <div className="p-3.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)] block mb-1">
                    Base Notes (4–12+ hrs)
                  </span>
                  <p className="text-xs font-semibold text-[oklch(0.179_0.004_286)] mb-1">
                    {product.notes.base.join(', ')}
                  </p>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)]">Persistent skin drydown</span>
                </div>
              </div>

              {/* Main Accords */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-[oklch(0.552_0.014_286)] uppercase tracking-wider block mb-2">
                  Dominant Olfactory Accords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {product.main_accords.map((accord, i) => (
                    <span 
                      key={i} 
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] capitalize"
                    >
                      {accord}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* When To Wear Profile */}
            <div className="p-5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] block">
                Wearability & Lifestyle Context
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] font-semibold block mb-1">Optimal Seasons:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.when_to_apply.seasons.map((s, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.262_0.007_286)] border border-[oklch(0.926_0.01_81.8)] text-[11px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] font-semibold block mb-1">Time of Day:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.when_to_apply.time_of_day.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.262_0.007_286)] border border-[oklch(0.926_0.01_81.8)] text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-[oklch(0.552_0.014_286)] font-semibold block mb-1">Occasion:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.when_to_apply.occasions.map((o, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.262_0.007_286)] border border-[oklch(0.926_0.01_81.8)] text-[11px]">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Priority Metro Delivery SLA Checker */}
            <div className="p-5 rounded-2xl bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Check Priority Delivery SLA</span>
                </span>
                {isSameDayAvailable && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Same-Day Metro Dispatch
                  </span>
                )}
              </div>

              <form onSubmit={handlePincodeCheck} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  placeholder="Enter 6-digit Pincode (e.g. 400050)"
                  className="flex-1 bg-white text-[oklch(0.179_0.004_286)] text-xs px-3.5 py-2.5 rounded-xl border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {pinChecked && (
                <p className="text-xs text-[oklch(0.262_0.007_286)] mt-2.5 font-medium flex items-center space-x-1.5">
                  <Zap className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Estimated Arrival: {pincodeDeliveryText}</span>
                </p>
              )}
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleInstantBuy}
                className="w-full py-4 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Instant 1-Click Buy Now (₹999)</span>
                <span className="text-[11px] font-normal opacity-70">• 20ml Flacon</span>
              </button>

              <button
                onClick={() => {
                  addToCart(product, 1);
                  setIsCartOpen(true);
                }}
                className="w-full py-3.5 rounded-full bg-white hover:bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] font-semibold text-xs uppercase tracking-wider border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.179_0.004_286)] transition-all shadow-2xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <span>Add to Fragrance Wardrobe (Duo ₹1,899 / Trio ₹2,799)</span>
              </button>
            </div>

            {/* Strategic Duo Upgrade Suggestion */}
            {complementaryProduct && (
              <div className="p-4 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs flex items-center justify-between gap-3">
                <div className="flex items-center space-x-3 min-w-0">
                  <img
                    src={complementaryProduct.image_url}
                    alt={complementaryProduct.name}
                    className="w-12 h-12 object-contain rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] p-1 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)] block">
                      Recommended Duo Pairing (Save ₹99)
                    </span>
                    <p className="text-xs font-bold text-[oklch(0.179_0.004_286)] truncate">
                      Pair with {complementaryProduct.name} ({complementaryProduct.sku})
                    </p>
                    <p className="text-[10px] text-[oklch(0.552_0.014_286)]">
                      Both 20ml Flacons for ₹1,899 + Free Express Air
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    addToCart(complementaryProduct, 1);
                    setIsCartOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer flex-shrink-0"
                >
                  Add Both (₹1,899)
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Related Formulations Carousel / Grid */}
        <section className="mt-20 pt-12 border-t border-[oklch(0.926_0.01_81.8)]">
          <div className="flex items-end justify-between mb-8">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[oklch(0.683_0.102_82.6)] block mb-1">
                L'ATELIER RESERVE
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)]">
                Complementary Masterpieces<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </h2>
            </div>
            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
            >
              Explore All 30 Formulations →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.sku}
                onClick={() => onSelectProduct(p)}
                className="group p-5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div className="relative aspect-square w-full rounded-xl bg-[oklch(0.98_0.005_78.3)] p-4 flex items-center justify-center mb-4">
                  <img src={p.image_url} alt={p.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[10px] font-bold bg-white text-[oklch(0.683_0.102_82.6)] border border-[oklch(0.926_0.01_81.8)]">
                    {p.sku}
                  </span>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-[oklch(0.179_0.004_286)] text-base group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors truncate">
                    {p.name}
                  </h4>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] truncate mb-2">
                    Inspired by {p.inspired_by.brand} {p.inspired_by.original_name}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[oklch(0.944_0.012_84.6)]">
                    <span className="text-sm font-extrabold text-[oklch(0.179_0.004_286)]">₹999 / 20ml</span>
                    <span className="text-[11px] font-bold text-[oklch(0.683_0.102_82.6)]">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

    </div>
  );
};
