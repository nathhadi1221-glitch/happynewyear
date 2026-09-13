import React, { useState, useEffect, useRef } from 'react';
import { BloomingFlower } from './BloomingFlower';
import { APP_CONFIG } from '../data/config';
import { SkipForward, Sparkles } from 'lucide-react';

interface FlowerIntroProps {
  onComplete: () => void;
  isCompleted: boolean;
}

export const FlowerIntro: React.FC<FlowerIntroProps> = ({
  onComplete,
  isCompleted,
}) => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Track elapsed seconds (total duration 12s, slightly faster and smoother)
  const TOTAL_DURATION = 12;
  const [elapsed, setElapsed] = useState(prefersReducedMotion ? TOTAL_DURATION : 0);
  const startTimeRef = useRef<number | null>(null);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (isCompleted) {
      setElapsed(TOTAL_DURATION);
      startTimeRef.current = null;
      return;
    }

    startTimeRef.current = null;
    setElapsed(0);

    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const currentElapsed = (timestamp - startTimeRef.current) / 1000;
      setElapsed(currentElapsed);

      if (currentElapsed >= TOTAL_DURATION) {
        onComplete();
      } else {
        requestRef.current = requestAnimationFrame(animate);
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isCompleted, onComplete, prefersReducedMotion]);

  // Overall bloom progression (0 = tight bud, 1 = full open)
  // Sequence timing (12s total):
  // 0-1.5s: buds appear (bloom 0.05)
  // 1.5-4.5s: bloom 0.05 -> 0.50
  // 4.5-7.5s: bloom 0.50 -> 0.78
  // 7.5-10.5s: bloom 0.78 -> 0.96
  // 10.5-12s: bloom 0.96 -> 1.0
  const calculateBloom = (offsetSeconds: number = 0) => {
    const t = Math.max(0, elapsed - offsetSeconds * 0.7);
    if (t < 1.5) return 0.05;
    if (t < 4.5) return 0.05 + ((t - 1.5) / 3) * 0.45;
    if (t < 7.5) return 0.50 + ((t - 4.5) / 3) * 0.28;
    if (t < 10.5) return 0.78 + ((t - 7.5) / 3) * 0.18;
    return 1.0;
  };

  // Determine which greeting to show
  // Greeting 1: 1.5s to 6.0s (clear, comfortable readability)
  // Transition gap: 6.0s to 6.8s
  // Greeting 2: 6.8s to 11.5s (clear, comfortable readability)
  const showGreeting1 = elapsed >= 1.5 && elapsed < 6.0;
  const showGreeting2 = elapsed >= 6.8 && elapsed < 11.5;

  // Flowers configuration: positioned organically across viewport for depth and framing
  const flowerConfigs = [
    // Center Hero
    { id: 'f-center', x: '50%', y: '52%', size: 140, depth: 'fg' as const, delay: 0, swayDur: 4.5 },
    // Foreground corners
    { id: 'f-left-fg', x: '18%', y: '68%', size: 120, depth: 'fg' as const, delay: 0.6, swayDur: 5.0 },
    { id: 'f-right-fg', x: '82%', y: '66%', size: 125, depth: 'fg' as const, delay: 0.4, swayDur: 4.8 },
    // Midground
    { id: 'f-left-mg', x: '28%', y: '36%', size: 90, depth: 'mg' as const, delay: 1.0, swayDur: 5.6 },
    { id: 'f-right-mg', x: '72%', y: '38%', size: 95, depth: 'mg' as const, delay: 1.2, swayDur: 5.2 },
    // Background (smaller, slightly muted)
    { id: 'f-bg-1', x: '38%', y: '25%', size: 65, depth: 'bg' as const, delay: 1.5, swayDur: 6.2 },
    { id: 'f-bg-2', x: '62%', y: '24%', size: 70, depth: 'bg' as const, delay: 1.7, swayDur: 6.0 },
    { id: 'f-bg-3', x: '10%', y: '45%', size: 60, depth: 'bg' as const, delay: 1.4, swayDur: 6.5 },
    { id: 'f-bg-4', x: '90%', y: '46%', size: 65, depth: 'bg' as const, delay: 1.8, swayDur: 6.2 },
  ];

  return (
    <section
      id="intro-section"
      aria-label="Ethiopian New Year 2019 Blooming Intro"
      className={`relative w-full overflow-hidden transition-all duration-1000 ${
        isCompleted
          ? 'h-[360px] sm:h-[420px] opacity-90'
          : 'min-h-[85vh] sm:min-h-[90vh] flex flex-col items-center justify-center'
      }`}
    >
      {/* Warm golden spotlight */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[140px] transition-opacity duration-1000"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(217,119,6,0.08) 50%, transparent 80%)',
            opacity: elapsed > 1 ? 1 : 0.2,
          }}
        />
      </div>

      {/* Skip button for user control */}
      {!isCompleted && elapsed < 10.5 && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onComplete}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-200/80 hover:text-amber-100 bg-amber-950/40 hover:bg-amber-900/60 border border-amber-500/30 rounded-full backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Skip to content"
          >
            <span>Skip intro</span>
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Progress pill indicator */}
      {!isCompleted && elapsed < 11.2 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-black/60 border border-amber-500/30 rounded-full backdrop-blur-md">
            <span className="text-xs">🌼</span>
            <span className="text-[11px] tracking-widest uppercase font-medium text-amber-300/90 font-display">
              {elapsed < 4 ? 'Adey Abeba Blooming' : elapsed < 8 ? 'Enkutatash Dawning' : 'Welcoming 2019'}
            </span>
          </div>
          <div className="w-24 h-1 bg-amber-950/80 rounded-full overflow-hidden border border-amber-500/20">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (elapsed / TOTAL_DURATION) * 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Animated Flowers Garden Field */}
      <div className="relative w-full max-w-4xl h-[340px] sm:h-[420px] flex items-center justify-center">
        {flowerConfigs.map((cfg) => {
          const bloomProg = calculateBloom(cfg.delay);
          return (
            <div
              key={cfg.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700"
              style={{
                left: cfg.x,
                top: cfg.y,
                opacity: elapsed > 0.4 ? 1 : 0,
              }}
            >
              <BloomingFlower
                bloomProgress={bloomProg}
                size={cfg.size}
                swayDelay={cfg.delay}
                swayDuration={cfg.swayDur}
                depth={cfg.depth}
              />
            </div>
          );
        })}

        {/* Central Overlay for Amharic Greetings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4 text-center">
          {/* Greeting #1 (prominently centered and slightly larger than surrounding text) */}
          <div
            className={`transition-all duration-1000 transform max-w-2xl px-2 ${
              showGreeting1
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/35 text-xs sm:text-sm text-amber-300 font-display tracking-widest uppercase shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Ethiopian New Year 2019</span>
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-ethiopic text-amber-100 gold-glow leading-snug sm:leading-tight">
              {APP_CONFIG.amharicGreeting1}
            </h1>
            <p className="mt-3 text-xs sm:text-base text-amber-300/85 font-display tracking-wider">
              Enkutatash • The Golden Bloom of Hope
            </p>
          </div>

          {/* Greeting #2 */}
          <div
            className={`transition-all duration-1000 transform max-w-xl px-2 ${
              showGreeting2
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] sm:text-xs text-amber-300 font-display tracking-widest uppercase">
              <span className="text-xs">🕊️</span>
              <span>Sacred Transition</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-ethiopic text-amber-100 gold-glow leading-snug sm:leading-tight">
              {APP_CONFIG.amharicGreeting2}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-amber-300/80 font-display tracking-wider">
              From the Year of Saint Mark to the Year of Saint Luke
            </p>
          </div>

          {/* Post-Bloom Settled Title when intro is finished */}
          {isCompleted && (
            <div className="transition-all duration-1000 transform opacity-100 translate-y-0 text-center max-w-xl">
              <div className="inline-flex items-center gap-2 mb-1 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[10px] sm:text-xs text-amber-300 font-display tracking-widest uppercase">
                <span>🌼</span>
                <span>Enkutatash 2019</span>
              </div>
              <p className="text-xl sm:text-3xl font-semibold font-ethiopic text-amber-100 gold-glow">
                {APP_CONFIG.amharicGreeting1}
              </p>
              <p className="text-xs sm:text-sm text-amber-400/70 font-ethiopic mt-1">
                {APP_CONFIG.amharicGreeting2}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
