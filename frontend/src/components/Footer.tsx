import React from 'react';
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
  ExternalLink,
  Compass,
  Layers
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

  const handlePolicyClick = (tab: PolicyTab) => {
    if (onOpenPolicy) {
      onOpenPolicy(tab);
    }
  };

  return (
    <footer className="bg-[oklch(0.959_0.01_87.5)] border-t border-[oklch(0.926_0.01_81.8)] pt-16 pb-24 lg:pb-16 text-[oklch(0.442_0.015_286)]">
      {/* Full-width container with responsive luxury padding */}
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Top 4 Trust Highlights spanning full width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-[oklch(0.926_0.01_81.8)] mb-12">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0 shadow-2xs">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider mb-1">28% Extrait de Parfum</h4>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">
                Maximum concentration standard. Engineered for 8–12 hours of rich, nuclear projection on skin.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0 shadow-2xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider mb-1">Flat ₹999 / 20ml</h4>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">
                Uniform pocket flacons. ~300 precision sprays. Zero choice paralysis, zero blind-buy commitment.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0 shadow-2xs">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider mb-1">Same-Day Metro Dispatch</h4>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">
                Same-Day Delivery in Mumbai, Delhi-NCR & Bengaluru. Express Air to all tier-1/tier-2 Indian cities.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.683_0.102_82.6)] flex-shrink-0 shadow-2xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[oklch(0.179_0.004_286)] uppercase tracking-wider mb-1">Direct Atelier Pricing</h4>
              <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">
                1 for ₹999 • 2 for ₹1,899 • 3 for ₹2,799. Uncompromising 28% Extrait quality with zero promotional gimmicks.
              </p>
            </div>
          </div>
        </div>

        {/* Primary Columns: Brand + Sitemap Architecture across full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          
          {/* Column 1 & 2: Brand Story & Atelier Credentials */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white font-bold font-serif text-base">
                Z
              </div>
              <span className="font-serif text-2xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-[0.2em]">
                ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
              </span>
            </div>
            <p className="text-xs text-[oklch(0.442_0.015_286)] max-w-sm leading-relaxed">
              ZORUNE is an artisanal luxury perfumery collective democratizing the world’s 30 most iconic fragrance formulations. 
              Formulated in Grasse and Paris, bottled in high-density 20ml pocket flacons for modern Indian connoisseurs.
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
                <button onClick={() => onNavigateSection('spotlights')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  L'Atelier Scent Journal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateSection('club')} className="text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer text-left">
                  The Allocation Club
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

        {/* Bottom Legal / Disclaimer & Quick Links */}
        <div className="pt-8 border-t border-[oklch(0.926_0.01_81.8)] flex flex-col md:flex-row items-center justify-between text-[11px] text-[oklch(0.552_0.014_286)] gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
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
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: Name trademarks and copyrights belong to their respective manufacturers and/or designers. ZORUNE has no affiliation with the manufacturers/designers. Our interpretations are purely olfactive extractions.
          </p>
        </div>

      </div>
    </footer>
  );
};
