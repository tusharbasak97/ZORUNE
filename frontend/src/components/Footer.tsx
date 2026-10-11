import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Droplets, 
  MapPin, 
  Lock, 
  FileText, 
  RotateCcw, 
  Phone, 
  HelpCircle,
  Layers,
  ChevronDown,
  MessageSquare
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PolicyTab } from './PolicyModal';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onReplayIntro?: () => void;
  onOpenPolicy?: (tab: PolicyTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onNavigateSection, 
  onReplayIntro,
  onOpenPolicy 
}) => {
  const { setIsQuizOpen, setIsWardrobeOpen } = useCart();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(prev => prev === key ? null : key);
  };

  const handlePolicyClick = (tab: PolicyTab) => {
    if (onOpenPolicy) {
      onOpenPolicy(tab);
    }
  };

  return (
    <footer className="bg-[oklch(0.959_0.01_87.5)] border-t border-[oklch(0.926_0.01_81.8)] pt-10 sm:pt-14 pb-28 sm:pb-24 lg:pb-16 text-[oklch(0.442_0.015_286)]">
      {/* Full-width container with responsive luxury padding and tablet corridor clearance */}
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        
        {/* 1. Direct Concierge Action Bar (Mobile & Tablet Priority) */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs mb-8 sm:mb-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-left w-full sm:w-auto">
            <div className="w-10 h-10 rounded-xl bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white flex-shrink-0 shadow-2xs">
              <Phone className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">Direct Atelier Desk</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active Hotline" />
                <span className="text-[10px] text-[oklch(0.552_0.014_286)] font-semibold hidden min-[400px]:inline">10 AM – 8 PM IST</span>
              </div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-[oklch(0.179_0.004_286)]">
                Speak with Formulation Concierge
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a 
              href="tel:+919777776016" 
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold transition-all flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>+91 9777776016</span>
            </a>
            <a 
              href="https://wa.me/919777776016?text=Hi%20ZORUNE%2C%20I%20would%20like%20perfume%20assistance" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] text-xs font-semibold hover:bg-[oklch(0.959_0.01_87.5)] transition-all flex items-center justify-center space-x-1.5 shadow-2xs cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 2. Top 4 Trust Highlights: Compact 2x2 on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 pb-8 sm:pb-12 border-b border-[oklch(0.926_0.01_81.8)] mb-8 sm:mb-12">
          <div className="p-3 sm:p-4 rounded-xl bg-white/80 border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 shadow-2xs">
            <div className="p-2 rounded-lg bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0">
              <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider">28% Extrait</h4>
              <p className="text-[10px] sm:text-xs text-[oklch(0.552_0.014_286)] leading-tight mt-0.5">
                8–12 hrs nuclear projection.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/80 border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 shadow-2xs">
            <div className="p-2 rounded-lg bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider">Flat ₹999 / 20ml</h4>
              <p className="text-[10px] sm:text-xs text-[oklch(0.552_0.014_286)] leading-tight mt-0.5">
                ~300 sprays. Zero markup.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/80 border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 shadow-2xs">
            <div className="p-2 rounded-lg bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider">Metro Air Dispatch</h4>
              <p className="text-[10px] sm:text-xs text-[oklch(0.552_0.014_286)] leading-tight mt-0.5">
                Same-Day in BLR, DEL, BOM.
              </p>
            </div>
          </div>

          <div className="p-3 sm:p-4 rounded-xl bg-white/80 border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 shadow-2xs">
            <div className="p-2 rounded-lg bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h4 className="text-[11px] sm:text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider">Direct Atelier</h4>
              <p className="text-[10px] sm:text-xs text-[oklch(0.552_0.014_286)] leading-tight mt-0.5">
                1: ₹999 • 2: ₹1,899 • 3: ₹2,799.
              </p>
            </div>
          </div>
        </div>

        {/* 3. MOBILE & TABLET COLLAPSIBLE ACCORDION VIEW (< xl) */}
        <div className="block xl:hidden mb-8 space-y-3">
          
          {/* Brand Intro Strip */}
          <div className="p-4 rounded-2xl bg-white/70 border border-[oklch(0.926_0.01_81.8)] mb-4 space-y-2">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white font-bold font-serif text-sm">
                Z
              </div>
              <span className="font-serif text-xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-[0.18em]">
                ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </span>
            </div>
            <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">
              Artisanal luxury perfumery collective formulating ~95% close impressions of iconic fragrance masterpieces in 28% Extrait de Parfum (20ml flacons @ flat ₹999).
            </p>
            <div className="pt-1 flex items-center space-x-2 text-[11px] text-[oklch(0.552_0.014_286)]">
              <MapPin className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
              <span>Atelier Hubs: Kanpur • Mumbai</span>
            </div>
          </div>

          {/* Accordion 1: Boutique Sitemap */}
          <div className="rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white/90 overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('sitemap')}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] cursor-pointer"
            >
              <span>Boutique Sitemap</span>
              <ChevronDown className={`w-4 h-4 text-[oklch(0.683_0.102_82.6)] transition-transform duration-300 ${openAccordion === 'sitemap' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'sitemap' && (
              <div className="px-4 pb-4 pt-1 border-t border-[oklch(0.926_0.01_81.8)] space-y-2 text-xs animate-fade-in">
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  All 30 Masterpiece Formulations
                </button>
                <button onClick={() => onNavigateSection('tier1')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Tier 1 Volume Heroes (Top 8)
                </button>
                <button onClick={() => onNavigateSection('cannibalization')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Scent Comparison Matrix
                </button>
                <button onClick={() => setIsWardrobeOpen(true)} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Wardrobe Builder (3 for ₹2,799)
                </button>
                <button onClick={() => setIsQuizOpen(true)} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  AI Olfactive Matchmaker
                </button>
                <button onClick={() => onNavigateSection('testimonials')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Patron Reviews & Proof
                </button>
              </div>
            )}
          </div>

          {/* Accordion 2: Olfactive Families */}
          <div className="rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white/90 overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('families')}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] cursor-pointer"
            >
              <span>Olfactive Families</span>
              <ChevronDown className={`w-4 h-4 text-[oklch(0.683_0.102_82.6)] transition-transform duration-300 ${openAccordion === 'families' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'families' && (
              <div className="px-4 pb-4 pt-1 border-t border-[oklch(0.926_0.01_81.8)] space-y-2 text-xs animate-fade-in">
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Oriental & Amber Woods (Oud/Resin)
                </button>
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Citrus Aromatic & Fresh Tea
                </button>
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Gourmand Warm Vanilla & Spices
                </button>
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Aromatic Fougère & Blue Ambroxan
                </button>
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Amber Florals & Saffron Accords
                </button>
                <button onClick={() => onNavigateSection('catalog')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)]">
                  Aquatic & Marine Vintage Extraits
                </button>
              </div>
            )}
          </div>

          {/* Accordion 3: Customer Care & Policies */}
          <div className="rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white/90 overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('policies')}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] cursor-pointer"
            >
              <span>Customer Care & Policies</span>
              <ChevronDown className={`w-4 h-4 text-[oklch(0.683_0.102_82.6)] transition-transform duration-300 ${openAccordion === 'policies' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'policies' && (
              <div className="px-4 pb-4 pt-1 border-t border-[oklch(0.926_0.01_81.8)] space-y-2 text-xs animate-fade-in">
                <button onClick={() => handlePolicyClick('privacy')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Privacy Policy (DPDP Act)</span>
                </button>
                <button onClick={() => handlePolicyClick('terms')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <FileText className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Terms of Service</span>
                </button>
                <button onClick={() => handlePolicyClick('shipping')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Shipping & Metro SLA</span>
                </button>
                <button onClick={() => handlePolicyClick('returns')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Returns & Transit Guarantee</span>
                </button>
                <button onClick={() => handlePolicyClick('authenticity')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>28% Extrait Authenticity</span>
                </button>
                <button onClick={() => handlePolicyClick('contact')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Contact Us & Concierge</span>
                </button>
                <button onClick={() => handlePolicyClick('faq')} className="block w-full text-left py-1 text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>FAQs & Application Guide</span>
                </button>
              </div>
            )}
          </div>

          {/* Accordion 4: Fragrance Protocols */}
          <div className="rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white/90 overflow-hidden shadow-2xs">
            <button
              onClick={() => toggleAccordion('protocols')}
              className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] cursor-pointer"
            >
              <span>Fragrance Protocols</span>
              <ChevronDown className={`w-4 h-4 text-[oklch(0.683_0.102_82.6)] transition-transform duration-300 ${openAccordion === 'protocols' ? 'rotate-180' : ''}`} />
            </button>
            {openAccordion === 'protocols' && (
              <div className="px-4 pb-4 pt-1 border-t border-[oklch(0.926_0.01_81.8)] space-y-2 text-xs text-[oklch(0.442_0.015_286)] animate-fade-in">
                <p>• The 48-Hour Maceration Protocol</p>
                <p>• Storage in Low-Temperature Darkness</p>
                <p>• Motion Spray Map (Anti-Anosmia)</p>
                <p>• 100% Transit Breakage Guarantee</p>
                {onReplayIntro && (
                  <button 
                    onClick={onReplayIntro}
                    className="block w-full text-left py-1 text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] font-medium"
                  >
                    • Replay Haute Landing Animation
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 4. DESKTOP MULTI-COLUMN SITEMAP (xl and up) */}
        <div className="hidden xl:grid grid-cols-6 gap-8 mb-12">
          
          {/* Column 1 & 2: Brand Story & Atelier Credentials */}
          <div className="col-span-2 space-y-3.5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white font-bold font-serif text-base">
                Z
              </div>
              <span className="font-serif text-2xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-[0.2em]">
                ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </span>
            </div>
            <p className="text-xs text-[oklch(0.442_0.015_286)] max-w-sm leading-relaxed">
              ZORUNE is an artisanal luxury perfumery collective formulating ~95% close impressions of the world’s most iconic fragrance masterpieces. Formulated with high-grade perfume oils at 28% Extrait de Parfum concentration, bottled in 20ml luxury flacons for modern connoisseurs.
            </p>
            <div className="pt-2 text-xs text-[oklch(0.552_0.014_286)] font-medium flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
              <span>Ateliers & Fulfillment Hubs: Kanpur • Mumbai</span>
            </div>
            <div className="pt-1 flex flex-wrap items-center gap-x-3 text-xs text-[oklch(0.442_0.015_286)]">
              <span className="font-semibold text-[oklch(0.179_0.004_286)]">Direct Concierge:</span>
              <a href="tel:+919777776016" className="hover:text-[oklch(0.683_0.102_82.6)] transition-colors font-medium">
                +91 9777776016
              </a>
              <span>•</span>
              <a href="tel:+919999903311" className="hover:text-[oklch(0.683_0.102_82.6)] transition-colors font-medium">
                +91 9999903311
              </a>
            </div>
            <div className="pt-2">
              <button
                onClick={() => handlePolicyClick('contact')}
                className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-lg bg-[oklch(0.179_0.004_286)] text-[oklch(0.985_0.002_247)] text-xs font-semibold tracking-wide hover:bg-[oklch(0.683_0.102_82.6)] transition-all cursor-pointer shadow-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                <span>Contact Haute Concierge</span>
              </button>
            </div>
          </div>

          {/* Column 3: The Collection & Canonical Navigation */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-2.5">Boutique Sitemap</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  All 30 Masterpiece Formulations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('tier1')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Tier 1 Volume Heroes (Top 8)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('cannibalization')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Scent Comparison Matrix
                </button>
              </li>
              <li>
                <button onClick={() => setIsWardrobeOpen(true)} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Wardrobe Builder (3 for ₹2,799)
                </button>
              </li>
              <li>
                <button onClick={() => setIsQuizOpen(true)} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  AI Olfactive Matchmaker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('testimonials')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Patron Reviews & Proof
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Olfactive Accord Taxonomy (SEO Keywords) */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-2.5">Olfactive Families</h5>
            <ul className="space-y-2 text-[oklch(0.442_0.015_286)]">
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Oriental & Amber Woods (Oud/Resin)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Citrus Aromatic & Fresh Tea
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Gourmand Warm Vanilla & Spices
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Aromatic Fougère & Blue Ambroxan
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Amber Florals & Saffron Accords
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('catalog')} className="hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  Aquatic & Marine Vintage Extraits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Customer Care & Policies */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-2.5">Customer Care & Policies</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handlePolicyClick('privacy')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <Lock className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Privacy Policy (DPDP Act)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('terms')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <FileText className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Terms of Service</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('shipping')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <Truck className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Shipping & Metro SLA</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('returns')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <RotateCcw className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Returns & Transit Guarantee</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('authenticity')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <ShieldCheck className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>28% Extrait Authenticity</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('contact')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <Phone className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Contact Us & Concierge</span>
                </button>
              </li>
              <li>
                <button onClick={() => handlePolicyClick('faq')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left flex items-center space-x-1.5">
                  <HelpCircle className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                  <span>FAQs & Application Guide</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 6: Fragrance Protocols & Tech */}
          <div className="space-y-2 text-xs">
            <h5 className="font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-2.5">Fragrance Protocols</h5>
            <ul className="space-y-2 text-[oklch(0.442_0.015_286)]">
              <li>• The 48-Hour Maceration Protocol</li>
              <li>• Storage in Low-Temperature Darkness</li>
              <li>• Motion Spray Map (Anti-Anosmia)</li>
              <li>• 100% Transit Breakage Guarantee</li>
              {onReplayIntro && (
                <li>
                  <button 
                    onClick={onReplayIntro}
                    className="text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left font-medium"
                  >
                    • Replay Haute Landing Animation
                  </button>
                </li>
              )}
            </ul>
          </div>

        </div>

        {/* 5. Bottom Legal / Disclaimer & Quick Links */}
        <div className="pt-6 sm:pt-8 border-t border-[oklch(0.926_0.01_81.8)] flex flex-col md:flex-row items-center justify-between text-[11px] text-[oklch(0.552_0.014_286)] gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center md:justify-start">
            <span>© 2026 ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span> Haute Parfumerie. All rights reserved.</span>
            <span className="hidden sm:inline text-[oklch(0.926_0.01_81.8)]">|</span>
            <button onClick={() => handlePolicyClick('privacy')} className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Privacy</button>
            <button onClick={() => handlePolicyClick('terms')} className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Terms</button>
            <button onClick={() => handlePolicyClick('shipping')} className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Shipping SLA</button>
            <button onClick={() => handlePolicyClick('returns')} className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Transit Guarantee</button>
            <button onClick={() => handlePolicyClick('contact')} className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Contact Us</button>
            <button onClick={() => handlePolicyClick('concierge')} className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Concierge</button>
            <span className="hidden sm:inline text-[oklch(0.926_0.01_81.8)]">|</span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-[oklch(0.179_0.004_286)] cursor-pointer">Site Map</a>
          </div>
          <p className="max-w-xl text-center md:text-right text-[10px] sm:text-[11px] leading-relaxed text-[oklch(0.552_0.014_286)]">
            Disclaimer: Trademarks, brand names, and copyrights remain the sole property of their respective original manufacturers and designers. ZORUNE is an independent perfumery brand with no affiliation or endorsement from mentioned houses. Our fragrances are independent ~95% close clone formulations engineered with high-grade oils for olfactory comparison and personal enjoyment.
          </p>
        </div>

      </div>
    </footer>
  );
};
