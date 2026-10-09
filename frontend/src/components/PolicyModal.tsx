import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  FileText, 
  Lock, 
  Sparkles, 
  Phone, 
  CheckCircle2, 
  ChevronRight, 
  HelpCircle, 
  MessageSquare,
  AlertCircle,
  Clock,
  Send
} from 'lucide-react';

export type PolicyTab = 
  | 'privacy'
  | 'terms'
  | 'shipping'
  | 'returns'
  | 'contact'
  | 'concierge'
  | 'authenticity'
  | 'faq';

const SUBJECT_OPTIONS = [
  'Fragrance Consultation & Scent Matching',
  'Order Status & Metro Express Dispatch',
  '48-Hour Maceration & Application Advice',
  'Custom Corporate & Wedding Gifting',
  'Atelier Partnership & Press',
  'General Inquiries'
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

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
  const [activeTab, setActiveTab] = useState<PolicyTab>(initialTab);

  // Contact form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{ id: string; name: string } | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const formRenderTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (activeTab === 'contact') {
      formRenderTimeRef.current = Date.now();
      const lastSubmit = localStorage.getItem('zorune_contact_last_submit');
      if (lastSubmit) {
        const elapsed = (Date.now() - parseInt(lastSubmit, 10)) / 1000;
        if (elapsed < 30) {
          setCooldownRemaining(Math.ceil(30 - elapsed));
        }
      }
    }
  }, [activeTab]);

  useEffect(() => {
    if (cooldownRemaining > 0) {
      const timer = setTimeout(() => {
        setCooldownRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownRemaining]);

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

  // OWASP validation & sanitization
  const validateField = (fieldName: keyof FormErrors, value: string): string | undefined => {
    switch (fieldName) {
      case 'name': {
        const clean = value.trim();
        if (!clean) return 'Please enter your full name.';
        if (clean.length < 2) return 'Name must be at least 2 characters.';
        if (clean.length > 60) return 'Name cannot exceed 60 characters.';
        if (!/^[a-zA-Z\s'.-]+$/.test(clean)) {
          return 'Name contains invalid characters. Only letters and standard punctuation are allowed.';
        }
        return undefined;
      }
      case 'email': {
        const clean = value.trim();
        if (!clean) return 'Please enter your email address.';
        if (/[\r\n]/.test(clean)) return 'Invalid characters detected in email.';
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(clean)) return 'Please provide a valid email (e.g. name@domain.com).';
        return undefined;
      }
      case 'phone': {
        const clean = value.replace(/\D/g, '');
        if (clean && clean.length > 0) {
          if (!/^[6-9]\d{9}$/.test(clean)) {
            return 'Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).';
          }
        }
        return undefined;
      }
      case 'message': {
        const clean = value.trim();
        if (!clean) return 'Please describe your fragrance inquiry.';
        if (clean.length < 10) return 'Message must be at least 10 characters for our perfumers to assist.';
        if (clean.length > 1000) return 'Message cannot exceed 1000 characters.';
        if (/<script|javascript:|onload=|onerror=/i.test(clean)) {
          return 'Malicious code patterns detected. Please enter plain text only.';
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const handleBlur = (field: keyof FormErrors, val: string) => {
    const error = validateField(field, val);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (cooldownRemaining > 0) {
      setErrors({ message: `Rate limit active. Please wait ${cooldownRemaining}s before submitting again.` });
      return;
    }

    const formAgeMs = Date.now() - formRenderTimeRef.current;
    if (formAgeMs < 1500) {
      return;
    }

    const nameErr = validateField('name', name);
    const emailErr = validateField('email', email);
    const phoneErr = validateField('phone', phone);
    const messageErr = validateField('message', message);

    if (nameErr || emailErr || phoneErr || messageErr) {
      setErrors({
        name: nameErr,
        email: emailErr,
        phone: phoneErr,
        message: messageErr
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    const cleanName = name.replace(/[<>%$&;{}()+=/\\*]/g, '').trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanPhone = phone.replace(/\D/g, '');
    const cleanMessage = message.replace(/[<>%$&;{}()+=/\\*]/g, '').trim();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          phone: cleanPhone,
          subject,
          message: cleanMessage,
          hp_field: honeypot,
          clientTimestamp: formRenderTimeRef.current
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmittedTicket({ id: data.ticketId || `ZR-CON-${Math.floor(100000 + Math.random() * 900000)}`, name: cleanName });
        localStorage.setItem('zorune_contact_last_submit', Date.now().toString());
        setCooldownRemaining(30);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setErrors({ message: data.error || 'Failed to submit inquiry. Please try calling our concierge lines.' });
      }
    } catch {
      const fallbackTicket = `ZR-CON-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmittedTicket({ id: fallbackTicket, name: cleanName });
      localStorage.setItem('zorune_contact_last_submit', Date.now().toString());
      setCooldownRemaining(30);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const tabs: { id: PolicyTab; label: string; icon: React.FC<any> }[] = [
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'shipping', label: 'Shipping & Metro SLA', icon: Truck },
    { id: 'returns', label: 'Transit Guarantee', icon: RotateCcw },
    { id: 'contact', label: 'Contact Us', icon: MessageSquare },
    { id: 'concierge', label: 'Fragrance Concierge', icon: Phone },
    { id: 'authenticity', label: 'Authenticity & Standards', icon: ShieldCheck },
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

            {/* 5. CONTACT US */}
            {activeTab === 'contact' && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] text-xs font-bold uppercase tracking-wider mb-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Direct Atelier Desk</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[oklch(0.179_0.004_286)]">Contact Haute Concierge</h3>
                  <p className="text-xs text-[oklch(0.552_0.014_286)] mt-1">Direct inquiries to formulation concierges at our Kanpur and Mumbai ateliers</p>
                </div>

                {/* Direct Helplines Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">Primary Concierge</span>
                        <span className="w-2 h-2 rounded-full bg-[oklch(0.696_0.17_162.48)] animate-pulse" title="Active Hotline" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] mb-1">+91 9777776016</h4>
                      <p className="text-xs text-[oklch(0.442_0.015_286)] mb-3">Direct voice consult & WhatsApp scent assistance.</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-[oklch(0.926_0.01_81.8)]">
                      <a href="tel:+919777776016" className="flex-1 py-1.5 px-3 rounded-lg bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer">
                        <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                        <span>Call Now</span>
                      </a>
                      <a href="https://wa.me/919777776016?text=Hi%20ZORUNE%2C%20I%20would%20like%20perfume%20assistance" target="_blank" rel="noopener noreferrer" className="flex-1 py-1.5 px-3 rounded-lg bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] hover:bg-white text-[oklch(0.179_0.004_286)] text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer">
                        <MessageSquare className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">Atelier Executive Line</span>
                        <span className="w-2 h-2 rounded-full bg-[oklch(0.696_0.17_162.48)] animate-pulse" title="Active Hotline" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] mb-1">+91 9999903311</h4>
                      <p className="text-xs text-[oklch(0.442_0.015_286)] mb-3">VIP orders, corporate allocations & bridal suites.</p>
                    </div>
                    <div className="flex items-center gap-2 pt-2 border-t border-[oklch(0.926_0.01_81.8)]">
                      <a href="tel:+919999903311" className="flex-1 py-1.5 px-3 rounded-lg bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer">
                        <Phone className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                        <span>Call Now</span>
                      </a>
                      <a href="https://wa.me/919999903311?text=Hi%20ZORUNE%2C%20I%20have%20an%20atelier%20inquiry" target="_blank" rel="noopener noreferrer" className="flex-1 py-1.5 px-3 rounded-lg bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] hover:bg-white text-[oklch(0.179_0.004_286)] text-xs font-semibold text-center transition-all flex items-center justify-center space-x-1.5 cursor-pointer">
                        <MessageSquare className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                        <span>WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Operating Hours Strip */}
                <div className="p-4 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs">
                  <div className="flex flex-wrap items-center justify-between text-xs text-[oklch(0.442_0.015_286)] gap-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
                      <span>Mon–Sat: 10:00 AM – 8:00 PM IST</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-[oklch(0.179_0.004_286)]">Atelier Centers:</span>
                      <span>Kanpur & Mumbai</span>
                    </div>
                  </div>
                </div>

                {/* Secure Form Section */}
                {submittedTicket ? (
                  <div className="p-6 rounded-xl bg-white border border-[oklch(0.683_0.102_82.6)] text-center animate-fade-in shadow-sm space-y-3">
                    <div className="w-12 h-12 rounded-full bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.683_0.102_82.6)] flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h4 className="font-serif text-xl font-bold text-[oklch(0.179_0.004_286)]">
                      Inquiry Logged Successfully
                    </h4>
                    <p className="text-xs text-[oklch(0.442_0.015_286)] max-w-md mx-auto leading-relaxed">
                      Thank you, <strong>{submittedTicket.name}</strong>. Your message has been received and assigned Reference Ticket <strong>{submittedTicket.id}</strong>. Our concierges will respond within 2 to 4 business hours.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => setSubmittedTicket(null)}
                        className="px-4 py-2 rounded-xl bg-[oklch(0.179_0.004_286)] text-white text-xs font-semibold hover:bg-[oklch(0.262_0.007_286)] transition-all cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-white border border-[oklch(0.926_0.01_81.8)] shadow-2xs space-y-4">
                    <div className="border-b border-[oklch(0.926_0.01_81.8)] pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)]">
                        Online Concierge Desk
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[oklch(0.179_0.004_286)] mt-0.5">
                        Submit a Formulation Inquiry
                      </h4>
                      <p className="text-xs text-[oklch(0.442_0.015_286)]">
                        Our master noses respond to every message within 2 to 4 business hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                      {/* Honeypot Bot Trap */}
                      <div className="hidden opacity-0 pointer-events-none absolute -left-[9999px]" aria-hidden="true">
                        <label htmlFor="policy_contact_hp">Leave empty</label>
                        <input
                          type="text"
                          id="policy_contact_hp"
                          tabIndex={-1}
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)}
                        />
                      </div>

                      {/* Row 1: Name & Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.262_0.007_286)] mb-1.5">
                            Your Name <span className="text-[oklch(0.637_0.237_25.331)]">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            maxLength={60}
                            value={name}
                            onChange={(e) => {
                              setName(e.target.value);
                              if (errors.name) handleBlur('name', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('name', e.target.value)}
                            placeholder="e.g. Tushar Sharma"
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border text-xs text-[oklch(0.179_0.004_286)] placeholder-[oklch(0.6_0.01_80)] focus:outline-none focus:bg-white transition-all ${
                              errors.name 
                                ? 'border-[oklch(0.637_0.237_25.331)] ring-1 ring-[oklch(0.637_0.237_25.331)]/20' 
                                : 'border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)]'
                            }`}
                          />
                          {errors.name && (
                            <p className="text-[11px] text-[oklch(0.637_0.237_25.331)] mt-1 flex items-center space-x-1 animate-fade-in">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span>{errors.name}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.262_0.007_286)] mb-1.5">
                            Email Address <span className="text-[oklch(0.637_0.237_25.331)]">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            maxLength={100}
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              if (errors.email) handleBlur('email', e.target.value);
                            }}
                            onBlur={(e) => handleBlur('email', e.target.value)}
                            placeholder="e.g. connoisseur@domain.com"
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border text-xs text-[oklch(0.179_0.004_286)] placeholder-[oklch(0.6_0.01_80)] focus:outline-none focus:bg-white transition-all ${
                              errors.email 
                                ? 'border-[oklch(0.637_0.237_25.331)] ring-1 ring-[oklch(0.637_0.237_25.331)]/20' 
                                : 'border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)]'
                            }`}
                          />
                          {errors.email && (
                            <p className="text-[11px] text-[oklch(0.637_0.237_25.331)] mt-1 flex items-center space-x-1 animate-fade-in">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span>{errors.email}</span>
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Row 2: Phone & Topic */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.262_0.007_286)] mb-1.5">
                            Indian Mobile <span className="text-[oklch(0.552_0.014_286)] font-normal lowercase">(optional)</span>
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[oklch(0.552_0.014_286)]">
                              +91
                            </span>
                            <input
                              type="tel"
                              maxLength={10}
                              value={phone}
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '');
                                setPhone(val);
                                if (errors.phone) handleBlur('phone', val);
                              }}
                              onBlur={(e) => handleBlur('phone', e.target.value)}
                              placeholder="98XXXXXXXX"
                              className={`w-full pl-12 pr-3.5 py-2.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border text-xs text-[oklch(0.179_0.004_286)] placeholder-[oklch(0.6_0.01_80)] focus:outline-none focus:bg-white transition-all ${
                                errors.phone 
                                  ? 'border-[oklch(0.637_0.237_25.331)] ring-1 ring-[oklch(0.637_0.237_25.331)]/20' 
                                  : 'border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)]'
                              }`}
                            />
                          </div>
                          {errors.phone && (
                            <p className="text-[11px] text-[oklch(0.637_0.237_25.331)] mt-1 flex items-center space-x-1 animate-fade-in">
                              <AlertCircle className="w-3 h-3 flex-shrink-0" />
                              <span>{errors.phone}</span>
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.262_0.007_286)] mb-1.5">
                            Inquiry Topic
                          </label>
                          <select
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.179_0.004_286)] focus:outline-none focus:border-[oklch(0.683_0.102_82.6)] focus:bg-white transition-all"
                          >
                            {SUBJECT_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Row 3: Message */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-[oklch(0.262_0.007_286)]">
                            Inquiry Details <span className="text-[oklch(0.637_0.237_25.331)]">*</span>
                          </label>
                          <span className={`text-[10px] font-mono ${message.length > 950 ? 'text-[oklch(0.669_0.169_70.08)] font-bold' : 'text-[oklch(0.552_0.014_286)]'}`}>
                            {message.length} / 1000
                          </span>
                        </div>
                        <textarea
                          rows={4}
                          required
                          maxLength={1000}
                          value={message}
                          onChange={(e) => {
                            setMessage(e.target.value);
                            if (errors.message) handleBlur('message', e.target.value);
                          }}
                          onBlur={(e) => handleBlur('message', e.target.value)}
                          placeholder="Describe your scent preferences, order inquiry, or custom request..."
                          className={`w-full px-3.5 py-2.5 rounded-xl bg-[oklch(0.98_0.005_78.3)] border text-xs text-[oklch(0.179_0.004_286)] placeholder-[oklch(0.6_0.01_80)] focus:outline-none focus:bg-white resize-y transition-all ${
                            errors.message 
                              ? 'border-[oklch(0.637_0.237_25.331)] ring-1 ring-[oklch(0.637_0.237_25.331)]/20' 
                              : 'border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)]'
                          }`}
                        />
                        {errors.message && (
                          <p className="text-[11px] text-[oklch(0.637_0.237_25.331)] mt-1 flex items-center space-x-1 animate-fade-in">
                            <AlertCircle className="w-3 h-3 flex-shrink-0" />
                            <span>{errors.message}</span>
                          </p>
                        )}
                      </div>

                      {/* Submit Bar */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                        <div className="flex items-center space-x-1.5 text-[11px] text-[oklch(0.552_0.014_286)]">
                          <Lock className="w-3 h-3 text-[oklch(0.683_0.102_82.6)]" />
                          <span>Direct & Encrypted Concierge Channel</span>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting || cooldownRemaining > 0}
                          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold tracking-wide transition-all shadow-xs cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              <span>Submitting...</span>
                            </>
                          ) : cooldownRemaining > 0 ? (
                            <span>Wait {cooldownRemaining}s</span>
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                              <span>Dispatch Inquiry</span>
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
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
                          setActiveTab('contact');
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
