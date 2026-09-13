import React from 'react';
import { CelebrationPackage } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface PackageCardProps {
  pkg: CelebrationPackage;
  onSelect: (pkg: CelebrationPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onSelect }) => {
  // Accent styling mappings
  const accentStyles = {
    silver: {
      border: 'border-slate-400/40 hover:border-slate-300',
      glow: 'hover:shadow-[0_0_30px_rgba(203,213,225,0.25)]',
      gradient: 'from-slate-800/60 via-[#18181b] to-black',
      badgeBg: 'bg-slate-700/30 text-slate-200 border-slate-400/30',
      priceColor: 'text-slate-100',
      buttonBg: 'from-slate-200 via-slate-300 to-slate-100 text-slate-900 hover:from-white hover:to-slate-200',
      tag: 'Silver Blessing',
    },
    platinum: {
      border: 'border-sky-300/40 hover:border-sky-200',
      glow: 'hover:shadow-[0_0_30px_rgba(186,230,253,0.3)]',
      gradient: 'from-sky-950/40 via-[#15171e] to-black',
      badgeBg: 'bg-sky-500/20 text-sky-200 border-sky-300/40',
      priceColor: 'text-sky-100',
      buttonBg: 'from-sky-100 via-sky-200 to-sky-300 text-sky-950 hover:from-white hover:to-sky-100',
      tag: 'Platinum Brilliance',
    },
    gold: {
      border: 'border-amber-400/50 hover:border-amber-300',
      glow: 'hover:shadow-[0_0_35px_rgba(251,191,36,0.35)]',
      gradient: 'from-amber-950/50 via-[#1a150e] to-black',
      badgeBg: 'bg-amber-500/20 text-amber-200 border-amber-400/40',
      priceColor: 'text-amber-200 gold-glow',
      buttonBg: 'from-amber-400 via-yellow-400 to-amber-300 text-black hover:from-amber-300 hover:to-yellow-200 shadow-[0_0_20px_rgba(251,191,36,0.3)]',
      tag: 'Golden Honor',
    },
  }[pkg.accent];

  return (
    <div
      className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 bg-gradient-to-b ${accentStyles.gradient} border ${accentStyles.border} ${accentStyles.glow} transition-all duration-500 hover:-translate-y-1.5 hover:scale-[1.01] active:scale-[0.99] group`}
    >
      {/* Top Section */}
      <div>
        {/* Tier Identity Badge */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-4xl select-none filter drop-shadow" aria-hidden="true">
            {pkg.badge}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border ${accentStyles.badgeBg} font-display`}
          >
            {accentStyles.tag}
          </span>
        </div>

        {/* Package Title */}
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-wide">
          {pkg.name}
        </h3>

        {/* Price Range */}
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className={`text-2xl sm:text-3xl font-extrabold font-display ${accentStyles.priceColor}`}>
            {pkg.priceRange}
          </span>
        </div>

        {/* Highlight text */}
        {pkg.highlightText && (
          <p className="mt-3 text-xs sm:text-sm text-neutral-300/80 font-body">
            {pkg.highlightText}
          </p>
        )}

        {/* Feature bullets */}
        <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-neutral-300">
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Support the 2019 New Year Celebration</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Honored celebratory mention</span>
          </li>
          <li className="flex items-center gap-2">
            <Check className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Cash & Telebirr accepted</span>
          </li>
        </ul>
      </div>

      {/* Button Action */}
      <div className="mt-8 pt-4 border-t border-white/10">
        <button
          onClick={() => onSelect(pkg)}
          className={`w-full py-3.5 px-6 rounded-full font-display font-bold text-xs sm:text-sm tracking-wider uppercase bg-gradient-to-r ${accentStyles.buttonBg} transition-all duration-300 transform group-hover:shadow-lg active:scale-95 min-h-[48px] flex items-center justify-center`}
        >
          {pkg.buttonText}
        </button>
      </div>
    </div>
  );
};
