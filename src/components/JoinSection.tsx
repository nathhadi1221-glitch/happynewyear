import React, { useState } from 'react';
import { findPersonByName } from '../data/people';
import { PersonProfile } from '../types';
import { Sparkles, User, AlertCircle, RefreshCw } from 'lucide-react';

interface JoinSectionProps {
  onJoinSuccess: (person: PersonProfile) => void;
}

export const JoinSection: React.FC<JoinSectionProps> = ({ onJoinSuccess }) => {
  const [nameInput, setNameInput] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
  };

  return (
    <section
      id="join-section"
      aria-label="Join the New Year personalized experience"
      className="w-full max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center transition-all"
    >
      <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-[#14120f] to-[#0c0a08] border border-amber-500/25 box-gold-glow">
        {/* Decorative badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] sm:text-xs text-amber-300 font-display tracking-widest uppercase mb-4">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Personal Invitation</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-amber-100 gold-glow">
          JOIN THE NEW YEAR
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-amber-200/75 font-body">
          Enter your name to continue
        </p>

        {/* NOT FOUND STATE */}
        {notFound ? (
          <div className="mt-8 p-6 rounded-2xl bg-red-950/20 border border-amber-500/20 space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-400/20 flex items-center justify-center mx-auto text-amber-300">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-sm sm:text-base text-amber-200/90 font-medium">
              Sorry, we couldn't find your section.
            </p>
            <button
              onClick={handleTryAgain}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-black text-xs sm:text-sm font-semibold hover:bg-amber-300 transition-all shadow-[0_0_15px_rgba(251,191,36,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try another name</span>
            </button>
          </div>
        ) : (
          /* FORM INPUT STATE */
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-sm mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-amber-400/60">
                <User className="w-4 h-4" />
              </div>
              <input
                id="visitor-name-input"
                type="text"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter your name"
                className="w-full pl-11 pr-4 py-3.5 rounded-full bg-[#1c1917]/90 border border-amber-500/30 text-amber-100 placeholder-amber-400/40 text-sm sm:text-base focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all text-center"
                autoComplete="off"
              />
            </div>

            {errorMsg && (
              <p className="text-xs text-amber-400 font-medium">{errorMsg}</p>
            )}

            <button
              id="join-submit-btn"
              type="submit"
              className="w-full py-3.5 px-6 rounded-full font-display font-semibold text-black bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-300 hover:from-amber-300 hover:to-yellow-200 transition-all duration-300 shadow-[0_0_20px_rgba(251,191,36,0.35)] hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] transform active:scale-95 text-sm sm:text-base tracking-wider uppercase min-h-[48px]"
            >
              JOIN
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
