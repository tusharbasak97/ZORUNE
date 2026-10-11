import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useSmoothScroll } from '../hooks/useSmoothScroll';

interface OlfactiveMatchmakerModalProps {
  products: Product[];
}

export const OlfactiveMatchmakerModal: React.FC<OlfactiveMatchmakerModalProps> = ({ products }) => {
  const { isQuizOpen, setIsQuizOpen, addToCart, setIsCartOpen } = useCart();
  const [step, setStep] = useState<number>(1);
  const [selectedOccasion, setSelectedOccasion] = useState<string>('date');
  const [selectedAccords, setSelectedAccords] = useState<string[]>(['warm spicy', 'vanilla']);
  const [selectedGender, setSelectedGender] = useState<string>('All');
  const [results, setResults] = useState<{ product: Product; match: number }[]>([]);
  const { containerRef: quizScrollRef, scrollToTop } = useSmoothScroll<HTMLDivElement>(isQuizOpen, true);

  React.useEffect(() => {
    scrollToTop(true);
  }, [step]);

  React.useEffect(() => {
    if (isQuizOpen) {
      document.body.style.overflow = 'hidden';
      if ((window as any).lenis) (window as any).lenis.stop();
    }
    return () => {
      document.body.style.overflow = '';
      if ((window as any).lenis) (window as any).lenis.start();
    };
  }, [isQuizOpen]);

  if (!isQuizOpen) return null;

  const occasions = [
    { id: 'office', label: 'Executive Boardroom & Daily Office', desc: 'Poised, clean, non-intrusive elegance', icon: '👔' },
    { id: 'date', label: 'Midnight Romance & Intimate Dinners', desc: 'Cozy cashmere, warm vanilla, magnetic pull', icon: '🍷' },
    { id: 'party', label: 'High-Energy Nightlife & Social Clout', desc: 'Nuclear projection, room-filling sweetness', icon: '✨' },
    { id: 'summer', label: 'Sun-Drenched Vacations & Warm Heat', desc: 'Sparkling citrus, iced tea, Mediterranean splash', icon: '☀️' },
    { id: 'cozy', label: 'Winter Fireside & Quiet Luxury', desc: 'Rich tobacco, cognac, smoky leather', icon: '🪵' }
  ];

  const accordOptions = [
    { id: 'citrus', label: 'Crisp Citrus & Italian Bergamot' },
    { id: 'vanilla', label: 'Rich Bourbon Vanilla & Gourmand' },
    { id: 'warm spicy', label: 'Cinnamon, Cardamom & Warm Spices' },
    { id: 'woody', label: 'Sandalwood, Amber & Cedar' },
    { id: 'oud', label: 'Smoky Resins, Leather & Royal Oud' },
    { id: 'floral', label: 'White Florals, Jasmine & Rose' }
  ];

  const toggleAccord = (id: string) => {
    if (selectedAccords.includes(id)) {
      setSelectedAccords(selectedAccords.filter(a => a !== id));
    } else {
      setSelectedAccords([...selectedAccords, id]);
    }
  };

  const calculateMatches = () => {
    const scored = products.map(p => {
      let score = 30; // base score

      // Gender check
      if (selectedGender === 'All' || p.gender === selectedGender || p.gender === 'Unisex') {
        score += 25;
      }

      // Accords match
      const matchedAccords = p.main_accords.filter(a =>
        selectedAccords.some(userA => a.toLowerCase().includes(userA.toLowerCase()))
      );
      score += matchedAccords.length * 15;

      // Occasion check
      if (selectedOccasion === 'office' && p.when_to_apply.occasions.some(o => o.toLowerCase().includes('office') || o.toLowerCase().includes('daily'))) {
        score += 20;
      } else if (selectedOccasion === 'date' && p.when_to_apply.occasions.some(o => o.toLowerCase().includes('date') || o.toLowerCase().includes('evening'))) {
        score += 20;
      } else if (selectedOccasion === 'party' && p.when_to_apply.occasions.some(o => o.toLowerCase().includes('night out') || o.toLowerCase().includes('party'))) {
        score += 20;
      } else if (selectedOccasion === 'summer' && p.when_to_apply.seasons.some(s => s.toLowerCase() === 'summer')) {
        score += 20;
      }

      // Commercial quality bonus
      score += (p.commercial_score || 80) * 0.1;

      return {
        product: p,
        match: Math.min(99, Math.max(82, Math.round(score * 0.85)))
      };
    });

    scored.sort((a, b) => b.match - a.match);
    setResults(scored.slice(0, 3));
    setStep(4);
  };

  const handleAddAllMatches = () => {
    results.forEach(r => addToCart(r.product, 1));
    setIsQuizOpen(false);
    setIsCartOpen(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setResults([]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsQuizOpen(false)}
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
    >
      <div 
        ref={quizScrollRef}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-[oklch(0.926_0.01_81.8)] rounded-3xl shadow-2xl p-6 sm:p-8 overscroll-contain popup-scroll-pane"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Close Button */}
        <button
          onClick={() => setIsQuizOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] transition-colors cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6 px-6 sm:px-0">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span>AI Olfactive Concierge</span>
          </div>
          <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)]">
            Find Your Signature Scent Profile<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-xs text-[oklch(0.442_0.015_286)] mt-1">
            Step {Math.min(step, 3)} of 3 • Algorithmic match across all 30 ZORUNE formulations
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full h-1.5 bg-[oklch(0.98_0.005_78.3)] rounded-full mb-6 overflow-hidden border border-[oklch(0.926_0.01_81.8)]">
          <div
            className="h-full bg-[oklch(0.179_0.004_286)] transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* STEP 1: OCCASION */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">
              1. Where do you intend to wear this fragrance most?
            </h3>
            <div className="grid grid-cols-1 gap-2.5">
              {occasions.map(occ => (
                <div
                  key={occ.id}
                  onClick={() => setSelectedOccasion(occ.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-center space-x-3.5 ${
                    selectedOccasion === occ.id
                      ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)] shadow-2xs'
                      : 'bg-[oklch(0.98_0.005_78.3)] border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.179_0.004_286)]/30'
                  }`}
                >
                  <span className="text-2xl">{occ.icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[oklch(0.179_0.004_286)]">{occ.label}</p>
                    <p className="text-xs text-[oklch(0.442_0.015_286)]">{occ.desc}</p>
                  </div>
                  {selectedOccasion === occ.id && (
                    <div className="w-5 h-5 rounded-full bg-[oklch(0.179_0.004_286)] text-white flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: ACCORDS */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">
              2. Which olfactive accords resonate with your skin? (Select 1 or more)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {accordOptions.map(acc => {
                const isSelected = selectedAccords.includes(acc.id);
                return (
                  <div
                    key={acc.id}
                    onClick={() => toggleAccord(acc.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)] shadow-2xs'
                        : 'bg-[oklch(0.98_0.005_78.3)] border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.179_0.004_286)]/30'
                    }`}
                  >
                    <span className="text-xs font-semibold text-[oklch(0.179_0.004_286)]">{acc.label}</span>
                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-[oklch(0.179_0.004_286)] text-white flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] text-xs font-semibold cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-xs"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: GENDER */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">
              3. Preferred gender expression:
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {['Male', 'Female', 'All'].map(g => (
                <div
                  key={g}
                  onClick={() => setSelectedGender(g)}
                  className={`p-4 rounded-xl border text-center cursor-pointer transition-all ${
                    selectedGender === g
                      ? 'bg-[oklch(0.977_0.013_86.8)] border-[oklch(0.683_0.102_82.6)] text-[oklch(0.179_0.004_286)] font-bold'
                      : 'bg-[oklch(0.98_0.005_78.3)] border-[oklch(0.926_0.01_81.8)] text-[oklch(0.442_0.015_286)] hover:border-[oklch(0.179_0.004_286)]/30'
                  }`}
                >
                  <p className="text-sm font-semibold">{g === 'All' ? 'Shared / Unisex' : g}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.179_0.004_286)] text-xs font-semibold cursor-pointer border border-[oklch(0.926_0.01_81.8)]"
              >
                Back
              </button>
              <button
                onClick={calculateMatches}
                className="px-8 py-3.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs uppercase tracking-wider flex items-center space-x-2 cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
                <span>Reveal My Matches</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: RESULTS */}
        {step === 4 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[oklch(0.179_0.004_286)]">
                Your Top 3 Olfactive Matches
              </span>
              <button
                onClick={resetQuiz}
                className="text-xs text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] flex items-center space-x-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

            <div 
              className="space-y-3 max-h-[360px] overflow-y-auto pr-1 overscroll-contain popup-scroll-pane"
              data-lenis-prevent
            >
              {results.map(({ product, match }) => (
                <div
                  key={product.sku}
                  className="p-4 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 flex items-center justify-between gap-4 transition-all"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-16 h-20 object-contain rounded-xl border border-[oklch(0.926_0.01_81.8)] bg-white p-1 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[oklch(0.179_0.004_286)] text-white">
                        {match}% Match
                      </span>
                      <span className="text-[11px] text-[oklch(0.683_0.102_82.6)] font-semibold">{product.sku}</span>
                    </div>
                    <h4 className="font-serif text-base font-bold text-[oklch(0.179_0.004_286)] truncate">{product.name}</h4>
                    <p className="text-xs text-[oklch(0.442_0.015_286)] truncate">
                      Inspired by {product.inspired_by.brand} {product.inspired_by.original_name}
                    </p>
                    <p className="text-[11px] text-[oklch(0.179_0.004_286)] font-semibold mt-1">₹999 / 20ml Extrait</p>
                  </div>

                  <button
                    onClick={() => { addToCart(product); setIsQuizOpen(false); }}
                    className="px-4 py-2 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-semibold text-xs uppercase tracking-wider flex-shrink-0 cursor-pointer shadow-xs"
                  >
                    Add 20ml
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[oklch(0.926_0.01_81.8)]">
              <span className="text-xs text-[oklch(0.442_0.015_286)]">
                Get all 3 in a <strong className="text-[oklch(0.179_0.004_286)]">Wardrobe Trio for ₹2,799</strong> (Save ₹198 + Free Priority Dispatch)
              </span>
              <button
                onClick={handleAddAllMatches}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xs"
              >
                Add All 3 to Cart (₹2,799)
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
