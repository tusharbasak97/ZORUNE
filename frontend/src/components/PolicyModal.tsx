import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, Truck, RotateCcw, FileText, Lock, Sparkles, Phone, CheckCircle2, ChevronRight, HelpCircle, MessageSquare } from 'lucide-react';
import { useCart } from '../context/CartContext';

export type PolicyTab = 
  | 'privacy'
  | 'terms'
  | 'shipping'
  | 'returns'
  | 'authenticity'
  | 'concierge'
  | 'faq';

interface PolicyModalProps {
  isOpen: boolean;
  initialTab?: PolicyTab;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({
  isOpen,
  initialTab = 'privacy',
  onClose
}) => {
  const { setIsContactOpen } = useCart();
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs: { id: PolicyTab; label: string; icon: React.FC<any> }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'shipping', label: 'Shipping & Metro SLA', icon: Truck },
    { id: 'returns', label: 'Returns & Transit Guarantee', icon: RotateCcw },
    { id: 'authenticity', label: 'Authenticity & Standards', icon: ShieldCheck },
    { id: 'concierge', label: 'Fragrance Concierge', icon: Phone },
    { id: 'faq', label: 'FAQs & Application Guide', icon: HelpCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[oklch(0.179_0.004_286)]/60 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl h-[90vh] max-h-[820px] bg-[oklch(0.98_0.005_78.3)] rounded-2xl shadow-2xl border border-[oklch(0.926_0.01_81.8)] flex flex-col overflow-hidden text-[oklch(0.179_0.004_286)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[oklch(0.926_0.01_81.8)] bg-white/80 backdrop-blur-md flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.179_0.004_286)] flex items-center justify-center text-white font-serif font-bold text-sm">
              Z
            </div>
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[oklch(0.179_0.004_286)]">
                ZORUNE<span className="text-[oklch(0.683_0.102_82.6)]">.</span> Editorial Policies & Customer Care
              </h2>
              <p className="text-[11px] text-[oklch(0.552_0.014_286)] tracking-wider uppercase font-semibold">
                Haute Parfumerie Atelier Guidelines • 2026 Edition
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Layout: Sidebar Tabs + Scrollable Content */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
          
          {/* Navigation Sidebar */}
          <div className="w-full md:w-64 bg-[oklch(0.959_0.01_87.5)]/80 border-b md:border-b-0 md:border-r border-[oklch(0.926_0.01_81.8)] p-3 sm:p-4 overflow-x-auto md:overflow-y-auto flex md:flex-col gap-1.5 flex-shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all text-left whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[oklch(0.179_0.004_286)] text-white shadow-sm'
                      : 'text-[oklch(0.442_0.015_286)] hover:text-[oklch(0.179_0.004_286)] hover:bg-white/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[oklch(0.683_0.102_82.6)]' : 'text-[oklch(0.552_0.014_286)]'}`} />
                  <span className="flex-1">{tab.label}</span>
                  <ChevronRight className={`w-3 h-3 hidden md:block ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              );
            })}
          </div>

          {/* Content Pane */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6 text-sm leading-relaxed text-[oklch(0.442_0.015_286)] bg-[oklch(0.98_0.005_78.3)]">
            
            {/* 1. PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <Lock className="w-3.5 h-3.5" />
                    <span>DPDP Compliant</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Privacy & Data Protection Policy</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Last Updated: October 2026 • Effective Worldwide</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">1. Information We Collect</h4>
                    <p>
                      When you place an order or consult our Olfactive Concierge, we collect necessary identification data including your name, delivery address, phone number for courier dispatch, and email address. We do <strong>not</strong> collect or store credit card, debit card, or UPI PIN credentials on our servers.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">2. Strict Zero Data-Selling Guarantee</h4>
                    <p>
                      ZORUNE operates strictly as a direct-to-connoisseur perfumery atelier. We will never sell, rent, monetize, or distribute your customer profiles, browsing habits, or fragrance preferences to third-party ad brokers or data aggregators.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">3. Payment Tokenization & PCI-DSS</h4>
                    <p>
                      All monetary transactions are processed through RBI-approved, PCI-DSS Level 1 compliant payment networks utilizing 256-bit AES end-to-end encryption. Card details are tokenized securely in accordance with Indian financial regulatory mandates.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">4. Cookies & Scent Profile Persistence</h4>
                    <p>
                      We utilize modern browser local storage and essential session cookies strictly to preserve your cart flacons, custom 3-bottle wardrobe bundles, and AI Olfactive Matchmaker quiz results across visits.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. TERMS OF SERVICE */}
            {activeTab === 'terms' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Legal Agreement</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Terms & Conditions of Sale</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Governed by the Laws of the Republic of India</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">1. Transparent Fixed Atelier Pricing</h4>
                    <p>
                      ZORUNE upholds an uncompromising direct pricing philosophy: <strong>1 flacon for ₹999, 2 flacons for ₹1,899, and 3 flacons for ₹2,799</strong>. We never run inflated MRP fake sales, arbitrary discount codes, or surprise fees. Every price displayed is all-inclusive of applicable GST and express courier freight.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">2. Olfactive Interpretation & Trademark Disclaimer</h4>
                    <p>
                      All 30 formulations presented by ZORUNE are independent olfactive interpretations handcrafted using 28% Extrait de Parfum compounds. Any references to designer fragrances, brand names, or registered trademarks belong exclusively to their respective intellectual property holders and are used purely for comparative scent family categorization. ZORUNE maintains zero legal association with original designer houses.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">3. Order Acceptance & Atelier Rights</h4>
                    <p>
                      Orders placed on ZORUNE.com constitute an offer to purchase. In rare circumstances of inventory exhaustion or suspicious fraudulent automated bot activity, ZORUNE reserves the right to decline or refund an order in full.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">4. Jurisdiction</h4>
                    <p>
                      Any dispute arising out of or in connection with the purchase or delivery of products from ZORUNE shall be subject to the exclusive jurisdiction of the competent courts of Mumbai, Maharashtra.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SHIPPING & DELIVERY */}
            {activeTab === 'shipping' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <Truck className="w-3.5 h-3.5" />
                    <span>Priority Metro SLA</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Shipping, Dispatch & Delivery SLA</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Air Express Nationwide via Bluedart & Delhivery</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">Same-Day Priority Metro Dispatch</h4>
                    <p>
                      Orders confirmed before <strong>1:00 PM IST</strong> are processed and dispatched on the same business day from our climate-controlled fulfillment ateliers in <strong>Kanpur and Mumbai</strong>.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">Delivery Timeframes Across India</h4>
                    <ul className="space-y-2 mt-2">
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0 mt-0.5" />
                        <span><strong>Tier 1 Metros (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Chennai, Kolkata):</strong> Delivered within 24 to 48 hours.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0 mt-0.5" />
                        <span><strong>Tier 2 Cities (Pune, Ahmedabad, Chandigarh, Jaipur, Lucknow, Kochi, etc.):</strong> Delivered within 2 to 3 business days.</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <CheckCircle2 className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0 mt-0.5" />
                        <span><strong>Rest of India & Special Regions:</strong> Delivered within 3 to 5 business days via Priority Air Courier.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">Thermal & Shock Protective Packaging</h4>
                    <p>
                      High-concentration (28%) Extrait de Parfum requires careful handling. Every 20ml flacon is encased in custom high-density EVA foam and rigid magnetic gift packaging to shield delicate aromatic molecules from extreme transit heat and mechanical shock.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RETURNS & TRANSIT GUARANTEE */}
            {activeTab === 'returns' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Hassle-Free Protection</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Returns, Replacements & Transit Damage</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">100% Replacement on Transit Breakage or Spray Malfunction</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">Artisanal Hygiene Policy</h4>
                    <p>
                      Due to the intimate, hygienic nature of personal fine fragrance and Extrait de Parfum compounds, once a flacon has been unsealed, test-sprayed, or used, it cannot be returned or resold. We engineered our uniform 20ml format precisely so connoisseurs can experience haute parfumerie without the commitment risk of costly 100ml blind buys.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">100% Zero-Friction Transit Replacement Guarantee</h4>
                    <p>
                      If your parcel arrives damaged, leaking, cracked, or with a defective micro-mist atomizer, you are fully covered under our Atelier Guarantee:
                    </p>
                    <ul className="space-y-1.5 mt-2 text-xs">
                      <li>1. Contact our Fragrance Concierge on WhatsApp or Email within <strong>48 hours of delivery</strong>.</li>
                      <li>2. Share a quick unboxing video or photo demonstrating the leakage/damage.</li>
                      <li>3. We dispatch an immediate brand-new replacement flacon via Priority Air with zero return shipping hassle.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">Order Cancellation</h4>
                    <p>
                      You may cancel any unfulfilled order prior to warehouse dispatch by messaging the Concierge with your Order ID for an immediate 100% refund.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. AUTHENTICITY & STANDARDS */}
            {activeTab === 'authenticity' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>28% Extrait Standard</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Authenticity & Olfactive Purity</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Mastercrafted in Grasse, Bottled Fresh in India</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">28% Extrait de Parfum Concentration</h4>
                    <p>
                      While commercial designers dilute their mass-market fragrances into Eau de Toilette (8–12%) or Eau de Parfum (15–18%), ZORUNE formulates exclusively in <strong>28% Extrait de Parfum</strong>. This guarantees dense sillage, nuclear skin projection, and true 8–12+ hour longevity across Indian tropical climates.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">The 48-Hour Cold Maceration Standard</h4>
                    <p>
                      Every compound batch is blended with ultra-pure grain alcohol and allowed to macerate in low-temperature darkness for a minimum of 48 hours before bottling. This enables the natural and synthetic aromatic molecules to harmonize, rounding off harsh alcoholic edges into velvet sillage.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">IFRA Certified & Clean Formulations</h4>
                    <p>
                      All fragrance oils comply 100% with International Fragrance Association (IFRA 51st Amendment) safety benchmarks. Formulations are 100% vegan, cruelty-free, and free from phthalates, parabens, and hazardous fixatives.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 6. FRAGRANCE CONCIERGE */}
            {activeTab === 'concierge' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <Phone className="w-3.5 h-3.5" />
                    <span>Dedicated Assistance</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Fragrance Concierge & Support</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Personalized Scent Advice & Order Tracking</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">Direct Helplines</span>
                    <h4 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] mt-1 mb-2">Voice & WhatsApp Concierge</h4>
                    <p className="text-xs text-[oklch(0.442_0.015_286)] mb-3">Speak directly with an in-house certified nose for scent pairing, notes consult, and express order updates.</p>
                    <div className="flex flex-col gap-2">
                      <a 
                        href="tel:+919777776016"
                        className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[oklch(0.179_0.004_286)] text-white text-xs font-semibold hover:bg-[oklch(0.262_0.007_286)] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                        <span>Call +91 9777776016</span>
                      </a>
                      <a 
                        href="https://wa.me/919999903311?text=Hi%20ZORUNE%2C%20I%20would%20like%20perfume%20assistance"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] text-xs font-semibold hover:bg-white transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                        <span>WhatsApp +91 9999903311</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">Written Concierge Desk</span>
                      <h4 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] mt-1 mb-2">Direct Message & Email</h4>
                      <p className="text-xs text-[oklch(0.442_0.015_286)] mb-3">For custom bridal suites, wholesale allocations, or secure inquiries.</p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => {
                          onClose();
                          setIsContactOpen(true);
                        }}
                        className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-[oklch(0.683_0.102_82.6)] text-white text-xs font-semibold hover:bg-[oklch(0.588_0.096_80.7)] transition-colors cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Open Secure Contact Form</span>
                      </button>
                      <a 
                        href="mailto:concierge@zorune.com"
                        className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] text-xs font-semibold hover:bg-white transition-colors"
                      >
                        <span>concierge@zorune.com</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.179_0.004_286)] mb-1">Operating Hours & Atelier Locations</h4>
                  <p className="text-xs text-[oklch(0.442_0.015_286)] leading-relaxed">
                    Monday to Saturday: 10:00 AM – 8:00 PM IST<br />
                    <strong className="text-[oklch(0.179_0.004_286)]">Ateliers & Fulfillment Hubs:</strong> Kanpur • Mumbai<br />
                    • <strong className="text-[oklch(0.179_0.004_286)]">Mumbai Atelier:</strong> Level 5, The Capital, Bandra Kurla Complex (BKC), Mumbai 400051, Maharashtra<br />
                    • <strong className="text-[oklch(0.179_0.004_286)]">Kanpur Atelier & Distribution:</strong> Civil Lines & Panki Industrial Area, Kanpur 208022, Uttar Pradesh
                  </p>
                </div>
              </div>
            )}

            {/* 7. FAQS */}
            {activeTab === 'faq' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Frequently Asked Questions</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Frequently Asked Questions</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Application tips, spray counts & longevity science</p>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-sm text-[oklch(0.179_0.004_286)] mb-1">Q: How many sprays are in a 20ml flacon?</h4>
                    <p>
                      Each ZORUNE 20ml flacon is fitted with an ultra-fine Italian micro-mist atomizer delivering approximately <strong>300 precision sprays</strong>. If you apply 4 to 5 sprays daily, one flacon lasts approximately 60 to 70 days.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-sm text-[oklch(0.179_0.004_286)] mb-1">Q: Why do you standardize in 20ml instead of 100ml?</h4>
                    <p>
                      Most fragrance buyers never finish a 100ml bottle before the top notes oxidize. 20ml pocket flacons allow you to own multiple world-class icons without blind-buy risk, switch scents with occasions, and travel effortlessly with pocket portability.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-sm text-[oklch(0.179_0.004_286)] mb-1">Q: How should I apply 28% Extrait for maximum longevity?</h4>
                    <p>
                      Apply 2 sprays directly to warm pulse points (clavicle/collarbone and base of the neck). Never vigorously rub your wrists together, as friction destroys the delicate volatile top-note molecules. For 14+ hour projection, apply 1 spray to the shoulders of a dark shirt or jacket.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)]">
                    <h4 className="font-semibold text-sm text-[oklch(0.179_0.004_286)] mb-1">Q: How does the bundle pricing work?</h4>
                    <p>
                      Our bundle pricing is automatic: 1 bottle is ₹999, 2 bottles are ₹1,899 (Save ₹99), and 3 bottles are ₹2,799 (Save ₹198). Any combination of the 30 icons automatically qualifies at checkout.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Footer Bar */}
        <div className="px-6 py-3.5 border-t border-[oklch(0.926_0.01_81.8)] bg-white flex items-center justify-between text-xs text-[oklch(0.552_0.014_286)] flex-shrink-0">
          <span>Need custom concierge guidance? Call/WhatsApp: +91 9777776016 • +91 9999903311</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[oklch(0.179_0.004_286)] text-white font-semibold text-xs uppercase tracking-wider hover:bg-[oklch(0.262_0.007_286)] transition-colors cursor-pointer"
          >
            Close & Return to Atelier
          </button>
        </div>

      </div>
    </div>
  );
};
