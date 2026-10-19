import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const NewsletterClub: React.FC = () => {
  const [contact, setContact] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contact.trim().length > 3) {
      setIsSubscribed(true);
    }
  };

  return (
    <section id="club" className="relative py-16 sm:py-20 border-b border-[oklch(0.926_0.01_81.8)] bg-[oklch(0.98_0.005_78.3)] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Subtle Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white border border-[oklch(0.926_0.01_81.8)] text-[oklch(0.552_0.014_286)] text-[11px] font-bold uppercase tracking-[0.2em] mb-4 shadow-2xs">
          <Mail className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
          <span>Join The Club • L'Atelier Reserve</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[oklch(0.179_0.004_286)] tracking-tight mb-3">
          Join The Atelier Allocation Club<span className="text-[oklch(0.683_0.102_82.6)]">.</span>
        </h2>

        {/* Philosophy Copy */}
        <p className="text-xs sm:text-sm text-[oklch(0.442_0.015_286)] max-w-xl mx-auto mb-8 leading-relaxed">
          We compound our 30% Elixirs in limited 50-liter artisanal runs to safeguard oil authenticity. 
          Enter your email or WhatsApp to receive private notices when reserved batches open for bottling.
        </p>

        {/* Form or Success State */}
        {isSubscribed ? (
          <div className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-full bg-white border border-emerald-300 text-emerald-800 text-xs font-semibold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Welcome to the Atelier Club. Your invitation token is recorded for Batch 04 allocations.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center max-w-md mx-auto gap-2.5">
            <label htmlFor="newsletter-allocation-contact" className="sr-only">
              Email address or WhatsApp number for small-batch allocation notices
            </label>
            <input
              type="text"
              id="newsletter-allocation-contact"
              name="newsletter-contact"
              autoComplete="email"
              aria-label="Email address or WhatsApp number for small-batch allocation notices"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter Email or WhatsApp (+91...)"
              className="w-full sm:flex-1 bg-white text-[oklch(0.179_0.004_286)] text-xs px-4 py-3 rounded-full border border-[oklch(0.926_0.01_81.8)] focus:border-[oklch(0.683_0.102_82.6)] focus:outline-none shadow-2xs placeholder-[oklch(0.552_0.014_286)]"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[oklch(0.179_0.004_286)] hover:bg-[oklch(0.262_0.007_286)] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center space-x-1.5 cursor-pointer flex-shrink-0"
            >
              <span>Request Access</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        )}

        {/* Policy Reassurance */}
        <p className="text-[11px] text-[oklch(0.552_0.014_286)] mt-4 flex items-center justify-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.683_0.102_82.6)]" />
          <span>Zero marketing spam. Zero coupon gimmicks. Strictly small-batch bottling notifications.</span>
        </p>

      </div>
    </section>
  );
};
