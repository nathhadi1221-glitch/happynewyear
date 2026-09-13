import React, { useState } from 'react';
import { CelebrationPackage } from '../types';
import { APP_CONFIG } from '../data/config';
import { X, Copy, Check, Sparkles, Heart } from 'lucide-react';

interface PaymentModalProps {
  pkg: CelebrationPackage;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({ pkg, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Copy phone number to clipboard with feedback
  const handleCopyNumber = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(APP_CONFIG.telebirr.phoneNumber);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = APP_CONFIG.telebirr.phoneNumber;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const handlePayContinue = () => {
    setIsSuccess(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-modal-title"
    >
      <div
        className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181512] to-[#0d0c0a] border border-amber-500/30 p-6 sm:p-8 box-gold-glow my-auto overflow-hidden text-amber-100 transition-transform duration-300 transform scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative glow orb */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)' }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full text-amber-400/80 hover:text-amber-200 hover:bg-amber-500/15 transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* ================= SUCCESS STATE ================= */
          <div className="py-6 sm:py-8 text-center space-y-6 animate-fadeIn">
            {/* Elegant Checkmark & Flower Petal Animation */}
            <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-yellow-400/30 border border-amber-400/50 flex items-center justify-center shadow-[0_0_25px_rgba(251,191,36,0.35)]">
              <span className="text-3xl animate-bounce">🌼</span>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
            </div>

            {/* Exactly Required Success Copy */}
            <div className="space-y-4 text-center">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-amber-200 gold-glow">
                Thank you for your support ❤️
              </h3>

              {/* Message 1 */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20">
                <p className="text-xs sm:text-sm font-serif italic text-amber-100 leading-relaxed">
                  "{APP_CONFIG.newYearMessage1}"
                </p>
              </div>

              {/* Message 2 */}
              <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20">
                <p className="text-xs sm:text-sm font-serif italic text-amber-100 leading-relaxed">
                  "{APP_CONFIG.newYearMessage2}"
                </p>
              </div>

              {/* Final Wish */}
              <p className="text-base sm:text-lg font-display text-amber-200 font-medium pt-1">
                {APP_CONFIG.finalWish}
              </p>

              {/* Final Signature */}
              <div className="pt-1">
                <p className="text-sm sm:text-base font-serif italic text-amber-300">
                  {APP_CONFIG.signature}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="mt-4 px-8 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] text-sm uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          /* ================= PAYMENT DETAILS STATE ================= */
          <div className="space-y-5">
            {/* Modal Title */}
            <div className="text-center pt-2">
              <span className="text-xs uppercase tracking-widest text-amber-400/80 font-display font-medium">
                New Year Contribution
              </span>
              <h2
                id="payment-modal-title"
                className="text-xl sm:text-2xl font-bold font-display text-amber-100 gold-glow mt-1"
              >
                PAY FOR YOUR PACKAGE
              </h2>
            </div>

            {/* Selected Package summary badge */}
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{pkg.badge}</span>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-amber-200 tracking-wide font-display">
                    {pkg.name}
                  </h4>
                  <p className="text-xs text-amber-400/70">Ethiopian New Year 2019</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-base sm:text-lg font-extrabold text-amber-300 font-display">
                  {pkg.priceRange}
                </span>
              </div>
            </div>

            {/* Prominent Accepted Methods Notice */}
            <div className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-950/60 to-yellow-950/50 border border-amber-400/30 text-center">
              <p className="text-xs sm:text-sm font-bold tracking-wider text-amber-200 uppercase font-display">
                WE ACCEPT BOTH CASH & TELEBIRR
              </p>
            </div>

            {/* 1. Cash Option */}
            <div className="p-3.5 rounded-2xl bg-[#1f1a14]/80 border border-amber-500/20 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-400 text-lg">
                💵
              </div>
              <div>
                <h4 className="text-sm font-semibold text-amber-100 font-display">CASH</h4>
                <p className="text-xs text-amber-300/80 mt-0.5 font-body">
                  Cash payment accepted
                </p>
              </div>
            </div>

            {/* 2. Telebirr Option */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#211a14] to-[#1a140f] border border-amber-400/35 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-lg">📱</span>
                  <span className="text-xs sm:text-sm font-bold tracking-wider text-amber-200 uppercase font-display">
                    TELEBIRR
                  </span>
                </div>
                <span className="text-[11px] text-amber-400/80 uppercase tracking-wider font-semibold">
                  PAY WITH TELEBIRR
                </span>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-amber-400/70">Name:</span>
                  <span className="font-semibold text-amber-200 text-sm">
                    {APP_CONFIG.telebirr.recipientName}
                  </span>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-amber-400/70">Phone Number:</span>
                  <span className="text-2xl sm:text-3xl font-extrabold tracking-widest text-yellow-300 font-mono gold-glow">
                    {APP_CONFIG.telebirr.phoneNumber}
                  </span>
                </div>
              </div>

              {/* Copy Number Button with Clipboard API */}
              <button
                type="button"
                onClick={handleCopyNumber}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-all active:scale-98"
                aria-label="Copy phone number to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300 font-semibold">Number copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-300" />
                    <span>COPY NUMBER</span>
                  </>
                )}
              </button>
            </div>

            {/* Pay / Continue Action */}
            <div className="pt-2">
              <button
                id="pay-continue-btn"
                type="button"
                onClick={handlePayContinue}
                className="w-full py-3.5 px-6 rounded-full font-display font-semibold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.35)] text-sm sm:text-base tracking-wider uppercase min-h-[48px] active:scale-98"
              >
                PAY / CONTINUE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
