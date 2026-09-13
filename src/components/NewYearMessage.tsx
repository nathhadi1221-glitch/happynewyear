import React, { useState, useEffect, useRef, useCallback } from 'react';
import { APP_CONFIG } from '../data/config';
import { Sparkles, ChevronLeft, ChevronRight, Pause, Heart } from 'lucide-react';

export const NewYearMessage: React.FC = () => {
  const messages = [
    {
      id: 1,
      text: APP_CONFIG.newYearMessage1,
      badge: 'Blessing 01',
      amharic: 'አዲሱ ዓመት የደስታ፣ የጤና እና የፈገግታ ይሁንላችሁ!',
    },
    {
      id: 2,
      text: APP_CONFIG.newYearMessage2,
      badge: 'Blessing 02',
      amharic: 'አብረን የምንስቅበት፣ አዳዲስ አስደናቂ ታሪኮችን የምንጽፍበት ብሩህ ዘመን ይሁንልን!',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextMessage = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setIsFading(false);
    }, 450);
  }, [messages.length]);

  const prevMessage = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
      setIsFading(false);
    }, 450);
  }, [messages.length]);

  // Automatic slide every 7.5 seconds when not paused
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextMessage();
    }, 7500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, nextMessage]);

  // Hold-to-pause event handlers (works with pointer events, touch, and mouse)
  const handleHoldStart = () => {
    setIsPaused(true);
  };

  const handleHoldEnd = () => {
    setIsPaused(false);
  };

  const activeMsg = messages[currentIndex];

  return (
    <section
      id="new-year-message-section"
      aria-label="Ethiopian New Year 2019 Messages"
      className="relative w-full max-w-4xl mx-auto px-4 sm:px-8 py-16 sm:py-24 text-center select-none"
    >
      {/* Background golden glow disc */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[320px] sm:h-[550px] rounded-full blur-[110px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.16) 0%, rgba(217,119,6,0.04) 60%, transparent 80%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Pill Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-widest uppercase font-display shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>New Year Wish • {activeMsg.badge}</span>
        </div>

        {/* Testimonial Message Container with Touch & Hold to Pause */}
        <div
          role="region"
          aria-live="polite"
          aria-label="Interactive New Year message slider"
          className="relative min-h-[220px] sm:min-h-[200px] flex flex-col items-center justify-center p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#191511]/90 via-[#13100c]/90 to-[#0a0806]/90 border border-amber-400/30 box-gold-glow cursor-grab active:cursor-grabbing transition-all duration-300"
          style={{ touchAction: 'pan-y' }}
          onPointerDown={handleHoldStart}
          onPointerUp={handleHoldEnd}
          onPointerLeave={handleHoldEnd}
          onPointerCancel={handleHoldEnd}
        >
          {/* Pause Status Indicator */}
          {isPaused && (
            <div className="absolute top-3 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-[10px] text-amber-200 font-semibold tracking-wider uppercase animate-pulse">
              <Pause className="w-3 h-3 text-amber-300 fill-amber-300" />
              <span>Reading (Paused)</span>
            </div>
          )}

          {/* Opening quote symbol */}
          <span className="text-3xl sm:text-4xl text-amber-400/40 font-serif select-none -mb-2" aria-hidden="true">
            “
          </span>

          {/* Active Message text with smooth crossfade */}
          <div
            className={`transition-all duration-500 ease-out transform ${
              isFading
                ? 'opacity-0 translate-y-3 scale-98'
                : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <p className="text-xl sm:text-3xl md:text-4xl font-serif font-normal text-amber-100 gold-glow leading-relaxed sm:leading-snug max-w-2xl mx-auto px-2">
              "{activeMsg.text}"
            </p>

            <p className="mt-4 text-xs sm:text-sm text-amber-300/75 font-ethiopic">
              {activeMsg.amharic}
            </p>
          </div>

          {/* Closing quote symbol */}
          <span className="text-3xl sm:text-4xl text-amber-400/40 font-serif select-none -mt-1" aria-hidden="true">
            ”
          </span>
        </div>

        {/* Carousel controls & hold hint */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          {/* Navigation buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevMessage}
              className="p-2.5 rounded-full bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all active:scale-95"
              aria-label="Previous message"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2 px-2">
              {messages.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setIsFading(true);
                    setTimeout(() => {
                      setCurrentIndex(idx);
                      setIsFading(false);
                    }, 400);
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    idx === currentIndex
                      ? 'w-8 h-2 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
                      : 'w-2 h-2 bg-amber-400/30 hover:bg-amber-400/50'
                  }`}
                  aria-label={`Go to message ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextMessage}
              className="p-2.5 rounded-full bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-300 hover:text-amber-100 transition-all active:scale-95"
              aria-label="Next message"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Hold hint */}
          <p className="text-[11px] text-amber-300/60 tracking-wider">
            💡 Touch & hold to pause and read
          </p>
        </div>
      </div>
    </section>
  );
};

export const FinalWish: React.FC = () => {
  return (
    <footer
      id="final-wish-section"
      aria-label="Final New Year Wish and Signature"
      className="relative w-full max-w-2xl mx-auto px-4 py-14 sm:py-20 text-center border-t border-amber-500/20 mt-10"
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Subtle Adey Abeba emblem */}
        <span className="text-3xl select-none filter drop-shadow animate-gentleSway" aria-hidden="true">
          🌼
        </span>

        {/* Exact Final Wish Message */}
        <p className="text-xl sm:text-3xl font-display font-semibold text-amber-100 tracking-wide gold-glow">
          {APP_CONFIG.finalWish}
        </p>

        {/* Exact Personal Signature with authentic elegant styling */}
        <div className="pt-2">
          <p className="text-base sm:text-xl font-serif italic text-amber-300/90 tracking-wider">
            {APP_CONFIG.signature}
          </p>
          <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto mt-2" />
        </div>

        <p className="text-xs text-amber-400/60 font-ethiopic pt-2">
          እንቁጣጣሽ ፳፻፲፱ • መልካም አዲስ ዓመት!
        </p>
      </div>
    </footer>
  );
};
