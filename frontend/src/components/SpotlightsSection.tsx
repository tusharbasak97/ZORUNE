import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, ArrowRight, Clock, X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

interface SpotlightArticle {
  id: string;
  category: string;
  title: string;
  readTime: string;
  excerpt: string;
  content: string[];
  date: string;
}

const articles: SpotlightArticle[] = [
  {
    id: 'art-1',
    category: 'FORMULATION CHEMISTRY',
    title: 'The Extrait Advantage: Why 28% Concentration Transforms Skin Sillage',
    readTime: '4 min read',
    date: 'L’Atelier Journal • Issue 14',
    excerpt:
      'Commercial fragrances dilute oils down to 10–14% Eau de Toilette. Discover why 28% pure perfume extract forms an intimate lipid bond with your skin for 12+ hours without synthetic fixatives.',
    content: [
      'In commercial mass-market perfumery, designer houses dilute concentrates down to 10%–14% Eau de Toilette or 15% Eau de Parfum to minimize manufacturing costs and drive inventory turnover. The high-proof denatured alcohol acts as an explosive carrier, creating an artificial blast of top notes that violently evaporates within 90 minutes.',
      'At ZORUNE, our formulation thesis begins at the polar opposite: pure 28% Extrait de Parfum. By maintaining an extraordinarily dense concentration of high-grade botanical absolutes and pure aroma compounds, the fragrance does not flash off into an alcohol cloud. Instead, it forms an intimate, continuous lipid bond with the natural warmth of your skin.',
      'This molecular density delivers what French perfumers call the "aura of presence" — expansive volumetric projection for the first 3 hours that gracefully transitions into an intoxicating, persistent drydown lingering for 10 to 14 hours.'
    ]
  },
  {
    id: 'art-2',
    category: 'FORMULATION CHEMISTRY',
    title: "The Master Perfumer's Friction Law: Why Rubbing Wrists Destroys Scent Architecture",
    readTime: '4 min read',
    date: 'L’Atelier Journal • Issue 15',
    excerpt:
      'The universal habit of rubbing wrists together creates localized kinetic heat that shatters delicate top-note aldehydes and shears volatile citrus molecules.',
    content: [
      'One of the most destructive habits observed by master perfumers like Edmond Roudnitska is the instinctive rubbing together of wrists immediately after spraying. While it feels intuitive, this action creates localized kinetic friction, abruptly spiking skin surface temperature by several degrees.',
      'Fragrance accords are structured in strict thermodynamic volatility hierarchies. Top notes — composed of lightweight monoterpenes like Calabrian bergamot, Sicilian lemon, pink pepper, and aldehydes — possess delicate molecular weights designed to evaporate gently over 20 to 30 minutes. Kinetic friction violently shears these volatile chains, crushing the top notes and muddling the perfume’s intended transition.',
      'Master Technique: Mist your Extrait flacon from 15 to 20 centimeters away and allow the aerosol cloud to settle naturally on unrubbed skin. Let your body warmth slowly awaken the lipid film — the fragrance will evolve sequentially through its true 3-tier pyramid exactly as the nose composed it.'
    ]
  },
  {
    id: 'art-3',
    category: 'FORMULATION CHEMISTRY',
    title: 'The Unscented Lipid Primer: How to Prevent Skin from Devouring Fragrance Oils',
    readTime: '5 min read',
    date: 'L’Atelier Journal • Issue 16',
    excerpt:
      'Why parched skin consumes perfume oils like a desert sponge, and how unscented ceramide or squalane priming locks aromatic molecules on your skin surface for 14 hours.',
    content: [
      'When fragrance connoisseurs complain of disappointing longevity despite wearing high-concentration Extrait, the culprit is rarely the formulation — it is trans-epidermal hydration. Dry, unconditioned skin is lipid-deficient; it acts like a sponge, pulling carrier alcohol and fragile aroma compounds deep into the stratum corneum, effectively smothering outward sillage.',
      'Master formulation chemists rely on a simple physiological principle: apply a rich, fragrance-free ceramide lotion, squalane oil, or pure shea butter immediately after stepping out of the shower while your pores are still warm and receptive.',
      'By saturating your skin’s outer barrier with non-competing lipids, you create a hydrophobic shield that prevents perfume absorption. The 28% Extrait oils are forced to remain suspended on the surface, where body warmth slowly volatilizes the molecules over 12 to 14 hours, increasing projection by up to 40%.'
    ]
  },
  {
    id: 'art-4',
    category: 'MACERATION SCIENCE',
    title: 'The 48-Hour Transit Rest: Unlocking Kinetic Maceration Equilibrium in Luxury Extraits',
    readTime: '4 min read',
    date: 'L’Atelier Journal • Issue 17',
    excerpt:
      'High-concentration artisanal extraits experience severe kinetic agitation during priority air transit. Why resting your pocket flacon in dark cedar restores accord equilibrium.',
    content: [
      'During priority express transit, your flacon is subjected to pressurized aircraft cargo bays, significant altitude and temperature fluctuations, and continuous road vibration. In artisanal 28% Extrait de Parfum blends, where dense botanical resinoids and delicate essential oils coexist, kinetic energy induces temporary molecular agitation.',
      'Upon receiving your delivery, we advise spraying 3 priming pumps into the open air to clear any stagnant liquid from the micro-mist atomizer straw. Then, place your flacon inside a dark drawer, wardrobe, or cupboard at a stable room temperature (20°C to 24°C) for 24 to 48 hours.',
      'This resting window allows the volatile monoterpenes and heavier base fixatives to reorganize and reach thermodynamic equilibrium. The brief patience is rewarded with an instantly richer, rounder bouquet, eliminating temporary transit sharpness and revealing authentic depth.'
    ]
  },
  {
    id: 'art-5',
    category: 'MACERATION SCIENCE',
    title: 'The Photochemical Trap: Why Bathroom Humidity & Sunlight Spoil Masterpiece Oils',
    readTime: '4 min read',
    date: 'L’Atelier Journal • Issue 18',
    excerpt:
      'Displaying perfume on bathroom counters exposes delicate oils to extreme heat cycling and UV photons that cause oxidative degradation of natural accords.',
    content: [
      'Storing luxury perfumes on aesthetic bathroom shelves or sunlit dressers is the single most common cause of premature fragrance spoilage. Steamy daily showers generate rapid temperature swings between 18°C and 42°C paired with 100% relative humidity, creating repeated expansion and contraction cycles inside the flacon.',
      'Furthermore, sunlight contains high-energy ultraviolet (UV) photons. UV radiation penetrates glass and excites the electron bonds of natural aromatic compounds — causing rapid oxidation of natural citrus terpenes, jasmine indoles, and vanilla vanillin, turning vibrant golden essences into cloudy, sour liquids.',
      'Atelier Protocol: Treat fine perfume like a grand cru wine. Store flacons in cool darkness inside an enclosed drawer or travel case away from humidity. When shielded from light and thermal shock, high-grade Extrait de Parfum will not only survive for years — it will gently macerate into an even more opulent, rounded vintage.'
    ]
  },
  {
    id: 'art-6',
    category: 'WARDROBE CURATION',
    title: 'The Anti-Anosmia Spray Mapping: How to Never Go Nose-Blind to Your Signature Scent',
    readTime: '5 min read',
    date: 'L’Atelier Journal • Issue 19',
    excerpt:
      'Spraying directly below your nose induces sensory fatigue within 15 minutes. How master perfumers target peripheral motion zones to maintain sensory awareness all day.',
    content: [
      'It is a ubiquitous paradox among perfume wearers: you stop detecting your scent 20 minutes after application, yet bystanders compliment your projection hours later. This is sensory adaptation (anosmia). When volatile molecules continuously barrage your nasal olfactory bulb without respite, your central nervous system filters out the stimulus as background noise.',
      'The fatal error is spraying the chest, throat, or front of the neck directly beneath your nostrils. Master perfumers overcome this by utilizing the "Peripheral Motion Map": 1 spray on the nape of the neck (behind your hair), 1 spray on each outer shoulder or collarbone, and 1 spray on the back of each wrist.',
      'By moving the application points outside your primary breathing vortex, you do not constantly saturate your olfactory receptors. Instead, every time you gesture, turn your head, or step into a breeze, fresh micro-wafts of fragrance greet your senses dynamically throughout the day.'
    ]
  },
  {
    id: 'art-7',
    category: 'WARDROBE CURATION',
    title: 'The Modern 3-Flacon Wardrobe: Mastering Indian Climates, Boardrooms & Evenings',
    readTime: '5 min read',
    date: 'L’Atelier Journal • Issue 20',
    excerpt:
      'Wearing one perfume year-round is the olfactory equivalent of wearing a heavy wool suit in July. How to curate an agile 3-scent rotation for daytime, corporate, and nocturnal wear.',
    content: [
      'Ambient temperature, relative humidity, and social setting radically alter how perfume molecules expand into the air. A rich, sweet toffee-vanilla gourmand that smells breathtaking in air-conditioned evening air will turn suffocating and cloying under a 36°C tropical summer sun.',
      'A sophisticated fragrance wardrobe requires 3 specialized pillars: A High-Heat Daylight Driver (like ZR-03 Imagination DNA) featuring sparkling citrus and Chinese black tea that cuts cleanly through humidity; an Executive Corporate Anchor (like ZR-08 Bleu de Chanel DNA) delivering disciplined incense and cedar for boardroom presence; and an Intimate Nocturnal Seducer (like ZR-01 SWY Intensely or ZR-10 Angels’ Share DNA) offering warm amber and spices for date nights.',
      'Standardizing our collection in uniform 20ml luxury pocket flacons (2 for ₹1,899, 3 for ₹2,799) eliminates the archaic barrier of spending ₹50,000 on oversized 100ml bottles that spoil before being finished, enabling discerning patrons to own a versatile, complete fragrance wardrobe.'
    ]
  },
  {
    id: 'art-8',
    category: 'WARDROBE CURATION',
    title: 'The Keratin & Textile Scent Reservoir: Unlocking 24-Hour Diffusion Beyond Skin',
    readTime: '4 min read',
    date: 'L’Atelier Journal • Issue 21',
    excerpt:
      'Skin lipids and body heat consume perfume compounds over time. How natural cashmere, cotton, and hair keratin hold pure heart notes in an unaltered state for days.',
    content: [
      'While warm skin is essential for radiating the top notes of a fragrance, cutaneous acidity, perspiration, and natural lipids also accelerate the metabolic breakdown of fragrance accords. Natural organic fibers and hair keratin, by contrast, act as neutral, slow-release reservoirs that preserve the original olfactive purity.',
      'Legendary Parisian perfumers frequently advise scenting the lining of a blazer, the collar of an organic cotton shirt, or the weave of a wool scarf from 25 centimeters away. Because fabric lacks body heat to forcefully evaporate the base, the delicate heart accords — Turkish rose, cardamom, French lavender, and sandalwood — remain suspended in stasis for 24 to 48 hours.',
      'For hair application: avoid spraying alcohol directly onto the scalp. Instead, mist a light cloud into the air above your head or spritz your wooden brush before styling. The hair keratin traps the fragrance molecules, diffusing an enchanting sillage every time you move.'
    ]
  }
];

export const SpotlightsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<SpotlightArticle | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(3);

  // Responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const maxIndex = Math.max(0, articles.length - visibleCount);

  // Keep index within bounds if window resizes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Timed slide-in / slide-out marquee effect (every 5.2 seconds)
  useEffect(() => {
    if (isPaused || selectedArticle !== null) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5200);

    return () => clearInterval(timer);
  }, [isPaused, selectedArticle, maxIndex]);

  // Handle ESC key to close modal & lock body scroll
  useEffect(() => {
    if (!selectedArticle) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedArticle(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArticle]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  return (
    <section id="spotlights" className="py-20 sm:py-28 border-b border-[oklch(0.926_0.01_81.8)] bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Belvish 'Spotlights' Inspiration) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-[11px] font-bold uppercase tracking-[0.2em] mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
              <span>Spotlights • The Parfumerie Journal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-tight">
              Spotlights & Scent Editorial<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
            </h2>
            <p className="text-sm sm:text-base text-[oklch(0.442_0.015_286)] mt-2 max-w-2xl leading-relaxed">
              Curated essays on formulation chemistry, kinetic maceration science, and the art of fragrance wardrobing.
            </p>
          </div>

          {/* Navigation Controls & Auto-Slide Status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 self-start md:self-end">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] text-[11px] font-medium text-[oklch(0.552_0.014_286)]">
              <span className={`w-2 h-2 rounded-full ${isPaused ? 'bg-amber-400' : 'bg-[oklch(0.683_0.102_82.6)] animate-ping'}`} />
              <span>{isPaused ? 'Paused for reading' : 'Auto-sliding • Hover to pause'}</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                aria-label="Previous editorial essays"
                className="p-2.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.179_0.004_286)] hover:text-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] transition-all cursor-pointer shadow-2xs hover:shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next editorial essays"
                className="p-2.5 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.179_0.004_286)] hover:text-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.179_0.004_286)] transition-all cursor-pointer shadow-2xs hover:shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Marquee / Carousel Window with ample vertical padding for shadows */}
        <div 
          className="relative overflow-hidden py-6 -my-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`
            }}
          >
            {articles.map((art) => (
              <div
                key={art.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3 py-1"
              >
                <article
                  onClick={() => setSelectedArticle(art)}
                  className="h-full p-7 rounded-2xl bg-[oklch(0.98_0.005_78.3)] border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/40 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between group cursor-pointer relative"
                >
                  <div>
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase mb-3.5 text-[oklch(0.552_0.014_286)]">
                      <span className="text-[oklch(0.683_0.102_82.6)] font-semibold">{art.category}</span>
                      <span className="flex items-center space-x-1 text-[oklch(0.552_0.014_286)]">
                        <Clock className="w-3 h-3" />
                        <span>{art.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors leading-snug mb-3">
                      {art.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] leading-relaxed line-clamp-3 mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  {/* Read Link */}
                  <div className="pt-4 border-t border-[oklch(0.926_0.01_81.8)] flex items-center justify-between text-xs font-semibold text-[oklch(0.179_0.004_286)] group-hover:text-[oklch(0.683_0.102_82.6)] transition-colors">
                    <span>Read Full Master Essay</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide page ${idx + 1}`}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-7 bg-[oklch(0.683_0.102_82.6)]'
                  : 'w-2 bg-[oklch(0.926_0.01_81.8)] hover:bg-[oklch(0.552_0.014_286)]'
              }`}
            />
          ))}
        </div>

      </div>

      {/* Full Article Reading Modal with ESC Key Support & Accessible Backdrop */}
      {selectedArticle && (
        <div 
          onClick={() => setSelectedArticle(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-article-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
          data-lenis-prevent
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-white rounded-3xl border border-[oklch(0.926_0.01_81.8)] shadow-2xl p-6 sm:p-10 overscroll-contain popup-scroll-pane"
            data-lenis-prevent
          >
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedArticle(null)}
              aria-label="Close editorial essay"
              className="absolute top-6 right-6 p-2 rounded-full bg-[oklch(0.98_0.005_78.3)] hover:bg-[oklch(0.959_0.01_87.5)] text-[oklch(0.552_0.014_286)] hover:text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6 pr-10">
              <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-[oklch(0.683_0.102_82.6)] mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedArticle.category} • {selectedArticle.readTime}</span>
              </div>
              <h2 id="modal-article-title" className="font-serif text-2xl sm:text-3xl font-extrabold text-[oklch(0.179_0.004_286)] leading-tight mb-2">
                {selectedArticle.title}
              </h2>
              <span className="text-xs text-[oklch(0.552_0.014_286)] font-medium">{selectedArticle.date}</span>
            </div>

            {/* Article Content */}
            <div className="space-y-4 text-sm sm:text-base text-[oklch(0.262_0.007_286)] leading-relaxed border-t border-[oklch(0.926_0.01_81.8)] pt-6 font-normal">
              {selectedArticle.content.map((p, idx) => (
                <p key={idx} className="leading-relaxed">{p}</p>
              ))}
            </div>

            {/* Master Perfumer Notes Box */}
            <div className="mt-6 p-4 rounded-2xl bg-[oklch(0.977_0.013_86.8)] border border-[oklch(0.926_0.01_81.8)] text-xs text-[oklch(0.442_0.015_286)]">
              <div className="flex items-center space-x-2 font-bold text-[oklch(0.179_0.004_286)] mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                <span>ZORUNE Formulation Atelier Standard</span>
              </div>
              <p className="leading-snug">
                Every ZORUNE flacon is engineered to 28% Extrait de Parfum concentration using authentic French compounds, bypassing industrial retailer markup to deliver uncompromising longevity and accord clarity at flat ₹999.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-8 pt-6 border-t border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[oklch(0.552_0.014_286)] italic">ZORUNE Haute Parfumerie Research</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all shadow-xs"
              >
                Close Article
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
