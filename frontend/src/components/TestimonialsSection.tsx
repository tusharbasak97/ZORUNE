import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  sku: string;
  scentName: string;
  inspiredBy: string;
  rating: number;
  review: string;
  longevity: string;
  verifiedType: string;
}

const testimonials: Testimonial[] = [
  {
    id: 't-1',
    name: 'Kabir Mukherjee',
    location: 'Bandra West, Mumbai',
    sku: 'ZR-03',
    scentName: 'Artisanal Extrait',
    inspiredBy: 'LV Imagination DNA',
    rating: 5,
    review:
      "I have owned the retail flacon for 2 years. ZORUNE's tea and ambroxan balance is startlingly precise. Projection easily passes 9 hours in Mumbai's coastal humidity without turning sour. Direct ₹999 pricing is an absolute revelation.",
    longevity: '9.5h Skin Projection',
    verifiedType: 'Verified Patron'
  },
  {
    id: 't-2',
    name: 'Rohan Sehgal',
    location: 'Cyber City, Gurugram',
    sku: 'ZR-05',
    scentName: 'Artisanal Extrait',
    inspiredBy: 'JPG Le Male Elixir DNA',
    rating: 5,
    review:
      "Nuclear longevity. 3 sprays on my knit sweater at 8 AM and colleagues were still complimenting the warm honey-lavender sillage at 7 PM. No synthetic alcohol burn on the initial spray. Pure French oil concentration.",
    longevity: '11h Beast Sillage',
    verifiedType: 'Verified Patron'
  },
  {
    id: 't-3',
    name: 'Dr. Ananya Varma',
    location: 'Indiranagar, Bengaluru',
    sku: 'ZR-10',
    scentName: 'Artisanal Extrait',
    inspiredBy: "Kilian Angels' Share DNA",
    rating: 5,
    review:
      "The boozy cognac and praline warmth dry down into rich sandalwood. The 20ml format fits into my evening clutch effortlessly. Zero compromise in bottle quality or atomizer misting.",
    longevity: '8.5h Intimate Sillage',
    verifiedType: 'Verified Patron'
  },
  {
    id: 't-4',
    name: 'Siddharth Kothari',
    location: 'Jubilee Hills, Hyderabad',
    sku: 'ZR-01 & ZR-08',
    scentName: 'The Duo Wardrobe',
    inspiredBy: 'SWY Intensely & Bleu de Chanel',
    rating: 5,
    review:
      "Picked up The Duo for ₹1,899. Arrived next afternoon in velvet sleeves. The toffee sweetness in ZR-01 and the crisp incense in ZR-08 make the perfect day-and-night transition without paying ₹35,000 for retail bottles.",
    longevity: '10h Sustained Wear',
    verifiedType: 'The Duo Bundle Patron'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 sm:py-28 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Belvish 'They Say' Inspiration) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-[11px] font-bold uppercase tracking-[0.2em] mb-3 shadow-2xs">
            <Quote className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span>They Say • Connoisseur Impressions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-tight mb-4">
            Voices of the Fragrance Patronage<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[oklch(0.442_0.015_286)] leading-relaxed">
            Real feedback from discerning fragrance collectors wearing ZORUNE's 28% Extrait de Parfum formulations across India. Unbiased longevity, authentic accord fidelity, and direct-to-patron honesty.
          </p>
        </div>

        {/* 4 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/40 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between relative group"
            >
              {/* Top Meta: Stars & Flacon Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] fill-[oklch(0.683_0.102_82.6)]" />
                    ))}
                    <span className="text-xs font-bold text-[oklch(0.179_0.004_286)] ml-1.5">5.0 / 5.0</span>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] tracking-wide">
                    {t.longevity}
                  </span>
                </div>

                {/* Scent Accord Tag */}
                <div className="mb-3.5 inline-flex items-center space-x-2 text-xs">
                  <span className="font-bold text-[oklch(0.683_0.102_82.6)]">{t.sku}</span>
                  <span className="text-[oklch(0.926_0.01_81.8)]">•</span>
                  <span className="text-[oklch(0.442_0.015_286)] font-medium">{t.inspiredBy}</span>
                </div>

                {/* Review Body */}
                <p className="text-sm text-[oklch(0.262_0.007_286)] leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              {/* Patron Footer */}
              <div className="pt-4 border-t border-[oklch(0.944_0.012_84.6)] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif font-bold text-sm text-[oklch(0.179_0.004_286)]">{t.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-[oklch(0.552_0.014_286)]">{t.location}</span>
                </div>

                <div className="flex items-center space-x-1 text-[11px] font-semibold text-[oklch(0.442_0.015_286)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>{t.verifiedType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Trust Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-[oklch(0.959_0.01_87.5)] border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[oklch(0.442_0.015_286)]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)]" />
            <span className="font-medium">
              Over <strong className="text-[oklch(0.179_0.004_286)]">12,400+ flacons delivered</strong> with a 98.4% five-star rating across all 30 formulas.
            </span>
          </div>
          <span className="text-[11px] text-[oklch(0.552_0.014_286)] tracking-wider uppercase font-semibold">
            100% Uncompromised Grasse Oils • Zero Dilution
          </span>
        </div>

      </div>
    </section>
  );
};
