import React, { useState, useEffect, useRef } from 'react';
import { findPersonByName, buildPeopleConfig } from '../data/people';
import { PersonProfile } from '../types';
import { Sparkles, User, AlertCircle, ArrowRight, RefreshCw, Heart } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onJoinSuccess: (person: PersonProfile) => void;
}

export const JoinModal: React.FC<JoinModalProps> = ({ isOpen, onJoinSuccess }) => {
  const [nameInput, setNameInput] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const availableProfiles = buildPeopleConfig();

  useEffect(() => {
    if (isOpen && !notFound) {
      // Gentle delayed autofocus for smooth modal entrance
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, notFound]);

  if (!isOpen) return null;

  const handleSelectProfile = (profile: PersonProfile) => {
    setNotFound(false);
    setErrorMsg('');
    onJoinSuccess(profile);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) {
      setErrorMsg('Please enter your name');
      return;
    }

    setErrorMsg('');
    const matched = findPersonByName(trimmed);

    if (matched) {
      setNotFound(false);
      onJoinSuccess(matched);
    } else {
      setNotFound(true);
    }
  };

  const handleTryAgain = () => {
    setNameInput('');
    setNotFound(false);
    setErrorMsg('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-modal-title"
    >
      {/* Ambient background glows */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[550px] h-[340px] sm:h-[550px] rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.2) 0%, rgba(217,119,6,0.06) 50%, transparent 75%)',
        }}
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#181410] via-[#120f0c] to-[#090807] border border-amber-500/35 p-6 sm:p-9 box-gold-glow my-auto overflow-hidden text-amber-100 transition-all duration-300 transform scale-100">
        {/* Soft decorative flower ornament */}
        <div className="flex flex-col items-center text-center">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-amber-500/20 via-yellow-400/20 to-amber-600/10 border border-amber-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.3)] mb-3 animate-gentleSway">
            <span className="text-3xl sm:text-4xl select-none" aria-hidden="true">
              🌼
            </span>
            <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400/80 blur-xs flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-black" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-[11px] text-amber-300 font-display tracking-widest uppercase mb-1.5">
            <span>Ethiopian New Year 2019</span>
          </div>

          <h2
            id="join-modal-title"
            className="text-2xl sm:text-3xl font-extrabold font-display text-amber-100 gold-glow tracking-wide"
          >
            JOIN THE NEW YEAR
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-amber-200/75 font-body">
            Enter your name or select your section to explore memories
          </p>
        </div>

        {notFound ? (
          /* ================= UNKNOWN USER / NOT FOUND STATE ================= */
          <div className="mt-7 p-6 rounded-2xl bg-gradient-to-b from-amber-950/30 to-black/40 border border-amber-500/25 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-amber-500/15 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-300">
              <AlertCircle className="w-6 h-6" />
            </div>

            <p className="text-base sm:text-lg font-medium text-amber-100 font-display">
              Sorry, we couldn't find your section.
            </p>

            <p className="text-xs text-amber-400/70">
              Please check the spelling or choose directly from the sections below.
            </p>

            <button
              id="try-another-name-btn"
              type="button"
              onClick={handleTryAgain}
              className="w-full py-3 px-6 rounded-full font-display font-semibold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 min-h-[44px] active:scale-98"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try another name</span>
            </button>
          </div>
        ) : (
          /* ================= NAME INPUT STATE ================= */
          <div className="mt-6 space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="visitor-name-modal-input" className="sr-only">
                  Enter your name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-400/60">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    ref={inputRef}
                    id="visitor-name-modal-input"
                    type="text"
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder="e.g. Hana & Dave, Samku, Meku, Mama"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#1c1813]/90 border border-amber-500/35 text-amber-100 placeholder-amber-400/40 text-sm sm:text-base font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all text-center tracking-wide"
                    autoComplete="off"
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-amber-400 text-center font-medium pt-1">
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                id="join-submit-btn"
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl font-display font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-300 shadow-[0_0_25px_rgba(251,191,36,0.35)] text-sm sm:text-base tracking-widest uppercase flex items-center justify-center gap-2 min-h-[48px] active:scale-98"
              >
                <span>JOIN EXPERIENCE</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>

            {/* Quick-Select Section Chips */}
            <div className="pt-2 border-t border-amber-500/20">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-display uppercase tracking-wider text-amber-300/70">
                  Or select your section:
                </span>
                <span className="text-[10px] text-amber-400/50">
                  Click to open
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {availableProfiles.map((p) => (
                  <button
                    key={p.id || p.name}
                    type="button"
                    onClick={() => handleSelectProfile(p)}
                    className="group relative flex flex-col items-start p-3 rounded-xl bg-gradient-to-br from-amber-950/30 to-black/50 border border-amber-500/25 hover:border-amber-400/80 hover:bg-amber-950/60 text-left transition-all duration-200 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] focus:outline-none focus:ring-2 focus:ring-amber-400 active:scale-98"
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs sm:text-sm font-bold font-display text-amber-100 group-hover:text-amber-300 transition-colors">
                        {p.name}
                      </span>
                      <Heart className="w-3 h-3 text-amber-400/50 group-hover:text-amber-400 group-hover:fill-amber-400 transition-all" />
                    </div>
                    {p.photoRange && (
                      <span className="text-[10px] text-amber-300/60 font-body mt-0.5">
                        {p.photoRange.label} ({p.photoRange.count} photos)
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
