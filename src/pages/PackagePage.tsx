import React, { useState } from 'react';
import { CELEBRATION_PACKAGES, APP_CONFIG } from '../data/config';
import { PackageCard } from '../components/PackageCard';
import { PaymentModal } from '../components/PaymentModal';
import { CelebrationPackage } from '../types';
import { Sparkles, Heart } from 'lucide-react';

export const PackagePage: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<CelebrationPackage | null>(null);

  return (
    <div className="w-full relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
      {/* Header Section */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-widest uppercase font-display mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Ethiopian New Year 2019</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display text-amber-100 gold-glow tracking-wide">
          NEW YEAR PACKAGES
        </h1>

        <p className="mt-3 text-sm sm:text-base text-amber-200/80 font-body">
          Choose a package and support the celebration.
        </p>
      </div>

      {/* Exactly THREE Package Cards in 3-column desktop layout, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {CELEBRATION_PACKAGES.map((pkg) => (
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            onSelect={(selected) => setSelectedPackage(selected)}
          />
        ))}
      </div>

      {/* Package Page Final Closing Section */}
      <div className="mt-16 sm:mt-24 pt-12 border-t border-amber-500/20 text-center max-w-2xl mx-auto space-y-6">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-500/10 text-amber-400 mx-auto">
          <Heart className="w-5 h-5 fill-amber-400" />
        </div>

        <h3 className="text-xl sm:text-3xl font-bold font-display text-amber-100 gold-glow">
          Thank you for your support ❤️
        </h3>

        {/* Message 1 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-950/20 border border-amber-500/25">
          <p className="text-sm sm:text-base font-serif italic text-amber-200 leading-relaxed">
            "{APP_CONFIG.newYearMessage1}"
          </p>
        </div>

        {/* Message 2 */}
        <div className="p-5 sm:p-6 rounded-3xl bg-amber-950/20 border border-amber-500/25">
          <p className="text-sm sm:text-base font-serif italic text-amber-200 leading-relaxed">
            "{APP_CONFIG.newYearMessage2}"
          </p>
        </div>

        {/* Final Wish */}
        <p className="text-base sm:text-xl font-display font-semibold text-amber-100">
          {APP_CONFIG.finalWish}
        </p>

        {/* Signature */}
        <div className="pt-1">
          <p className="text-base sm:text-lg font-serif italic text-amber-300">
            {APP_CONFIG.signature}
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-2" />
        </div>

        <p className="text-xs text-amber-400/60 font-ethiopic pt-2">
          መልካም የ፳፻፲፱ አዲስ ዓመት ይሁንልዎ!
        </p>
      </div>

      {/* Payment Popup Modal */}
      {selectedPackage && (
        <PaymentModal
          pkg={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
};
