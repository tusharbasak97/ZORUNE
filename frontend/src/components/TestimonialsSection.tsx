import React from 'react';
import { Quote, CheckCircle2, ShieldCheck, Sparkles, Award } from 'lucide-react';

interface TastingCritique {
  id: string;
  evaluator: string;
  role: string;
  location: string;
  sku: string;
  scentName: string;
  inspiredBy: string;
  evaluationBadge: string;
  critique: string;
  longevityTested: string;
}

const critiques: TastingCritique[] = [
  {
    id: 't-1',
    evaluator: 'Éléonore de Saint-Germain',
    role: 'Independent Fragrance Critic & Sensory Juror',
    location: 'Grasse & Paris',
    sku: 'ZR-U01',
    scentName: 'Yuzu Céleste',
    inspiredBy: 'Unisex Terroir 01 • Kōchi Solar Yuzu & Hinoki Wood',
    evaluationBadge: 'Pre-Release Salon • Paris',
    critique:
      'The cold-pressed Kōchi yuzu opens with extraordinary thermodynamic vibrancy, resisting high humidity without souring. As the sacred Japanese hinoki and Gyokuro green tea settle, the drydown reveals pure mineral refinement. The 40% PCR flacon and Zamac closure establish a genuinely serious standard for sustainable haute perfumerie.',
    longevityTested: '15h Skin-Tested Halo'
  },
  {
    id: 't-2',
    evaluator: 'Jean-Luc Moreau',
    role: 'Botanical Distillation & Terroir Specialist',
    location: 'Cape Town & Grasse',
    sku: 'ZR-M01',
    scentName: 'Vetiver Monsoon',
    inspiredBy: 'Men’s Sovereign 01 • Les Cayes Haitian Vetiver & Geosmin',
    evaluationBadge: 'Pre-Release Salon • Cape Town',
    critique:
      'Certified Les Cayes vetiver is notorious for losing its nuance when over-synthesized. ZORUNE’s formulation preserves the earthy peat roots and mineral flint with absolute fidelity. Tested across a humid 34°C coastal day, the smoked cedar fixative kept its structure intact well past the 14-hour mark.',
    longevityTested: '16h Verified Tenacity'
  },
  {
    id: 't-3',
    evaluator: 'Dr. Priya Varma',
    role: 'Olfactive Historian & Botanical Evaluator',
    location: 'Kashmir Valley & London',
    sku: 'ZR-W01',
    scentName: 'Rose de Grasse Éternelle',
    inspiredBy: 'Women’s Sovereign 01 • Kashmir Valley Dew-Picked Centifolia',
    evaluationBadge: 'Pre-Release Salon • London',
    critique:
      'Dawn-harvested Kashmiri centifolia paired with biodynamic Pampore saffron creates an expansive floral tapestry. What separates this from mass luxury is the complete absence of artificial sweetening agents—it smells like velvet damp petals resting on aged Mysore sandalwood.',
    longevityTested: '18h Regal Sillage'
  },
  {
    id: 't-4',
    evaluator: 'Kenji Takahashi',
    role: 'Kōdō Practitioner & Fragrance Curator',
    location: 'Kyoto & Tokyo',
    sku: 'ZR-U05',
    scentName: 'Saffron Nomade & Buchu Sauvage',
    inspiredBy: 'Unisex Terroir 05 • Cape Agulhas Buchu & Kashmir Saffron',
    evaluationBadge: 'Pre-Release Salon • Kyoto',
    critique:
      'The inclusion of endemic South African buchu alongside Grade-1 Mongra saffron creates an unprecedented balsamic-herbal tension. This is daring, publication-grade olfactive architecture that refuses to conform to generic crowd-pleaser profiles.',
    longevityTested: '20h Enveloping Resonance'
  }
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-[11px] font-bold uppercase tracking-[0.2em] mb-3 shadow-2xs">
            <Quote className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
            <span>Pre-Release Evaluation • Sensory Salon Tasting Notes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-tight mb-4">
            Master Evaluator Tasting Critique<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
          </h2>
          <p className="text-sm sm:text-base text-[oklch(0.442_0.015_286)] leading-relaxed">
            Independent impressions gathered during private reserve salon tastings in Paris, Kyoto, Cape Town, and London prior to our inaugural 2026 bottling. Authentic evaluations of botanical purity, sillage, and lipid longevity.
          </p>
        </div>

        {/* 4 Critiques Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {critiques.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] hover:border-[oklch(0.683_0.102_82.6)]/50 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between relative group"
            >
              {/* Top Meta: Evaluation Badge & Longevity */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-[oklch(0.683_0.102_82.6)]">
                    <Award className="w-3.5 h-3.5" />
                    <span>{t.evaluationBadge}</span>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[oklch(0.98_0.005_78.3)] text-[oklch(0.179_0.004_286)] border border-[oklch(0.926_0.01_81.8)] tracking-wide">
                    {t.longevityTested}
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
                  &ldquo;{t.critique}&rdquo;
                </p>
              </div>

              {/* Patron Footer */}
              <div className="pt-4 border-t border-[oklch(0.944_0.012_84.6)] flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-serif font-bold text-sm text-[oklch(0.179_0.004_286)]">{t.evaluator}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-[oklch(0.552_0.014_286)]">{t.role} • {t.location}</span>
                </div>

                <div className="flex items-center space-x-1 text-[11px] font-semibold text-[oklch(0.442_0.015_286)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
                  <span>Pre-Release Panel</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Founding Trust Bar */}
        <div className="mt-12 p-4 rounded-2xl bg-[oklch(0.959_0.01_87.5)]/90 backdrop-blur-xs border border-[oklch(0.926_0.01_81.8)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[oklch(0.442_0.015_286)]">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[oklch(0.683_0.102_82.6)] flex-shrink-0" />
            <span className="font-medium">
              <strong className="text-[oklch(0.179_0.004_286)]">Inaugural 2026 Batch:</strong> Strictly limited first harvest of our 20 Sovereign Terroir Formulations. Zero artificial dilution.
            </span>
          </div>
          <span className="text-[11px] text-[oklch(0.552_0.014_286)] tracking-wider uppercase font-semibold flex-shrink-0">
            IFRA 51st Amendment Compliant • Global Single-Origin Terroir Extraits
          </span>
        </div>

      </div>
    </section>
  );
};

