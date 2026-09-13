import React, { useState, useEffect } from 'react';
import { PersonProfile } from '../types';
import { PhotoGallery } from './PhotoGallery';
import { APP_CONFIG } from '../data/config';
import { buildPeopleConfig, findPersonByName } from '../data/people';
import { Sparkles, Heart, ArrowLeft, Users, Calendar } from 'lucide-react';

interface PersonalizedSectionProps {
  person: PersonProfile;
  onReset: () => void;
  onSelectPerson?: (person: PersonProfile) => void;
}

export const PersonalizedSection: React.FC<PersonalizedSectionProps> = ({
  person,
  onReset,
  onSelectPerson,
}) => {
  const [currentPerson, setCurrentPerson] = useState<PersonProfile>(person);
  const allProfiles = buildPeopleConfig();

  // Sync state when parent passes a new person
  useEffect(() => {
    setCurrentPerson(person);
  }, [person]);

  // Refresh photos if an individual photo is uploaded
  const handlePhotoUpdated = () => {
    const refreshed = findPersonByName(currentPerson.name);
    if (refreshed) {
      setCurrentPerson(refreshed);
    }
  };

  const handleSwitchProfile = (p: PersonProfile) => {
    setCurrentPerson(p);
    onSelectPerson?.(p);
  };

  return (
    <section
      id="personalized-section"
      aria-label={`Personalized memories for ${currentPerson.name}`}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-14 transition-all duration-700 animate-fadeIn"
    >
      {/* Quick Profile Navigation Bar between the 4 Sections */}
      <div className="flex items-center justify-center mb-6 sm:mb-8 overflow-x-auto no-scrollbar py-1">
        <div className="inline-flex items-center gap-1.5 p-1.5 rounded-full bg-black/60 border border-amber-500/30 backdrop-blur-md">
          {allProfiles.map((p) => {
            const isActive =
              p.name.toLowerCase() === currentPerson.name.toLowerCase();
            return (
              <button
                key={p.id || p.name}
                type="button"
                onClick={() => handleSwitchProfile(p)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-display tracking-wider transition-all duration-300 min-h-[36px] flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-black font-bold shadow-[0_0_15px_rgba(251,191,36,0.35)]'
                    : 'text-amber-200/75 hover:text-amber-100 hover:bg-amber-400/10'
                }`}
              >
                <span>{p.name}</span>
                {p.photoRange && (
                  <span
                    className={`text-[10px] ${
                      isActive ? 'text-black/75' : 'text-amber-400/60'
                    }`}
                  >
                    ({p.photoRange.start === p.photoRange.end
                      ? `${p.photoRange.count} photo`
                      : `${p.photoRange.start}–${p.photoRange.end}`})
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Header with Person Name & GLIMPSE INTO OUR MEMORIES */}
      <div className="text-center mb-8 sm:mb-12">
        {/* Subtle decorative emblem */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs tracking-widest uppercase font-display mb-3 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Enkutatash 2019 Celebration</span>
        </div>

        {/* Visually prominent Person Name */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider font-display text-amber-100 uppercase gold-glow">
          {currentPerson.name}
        </h2>

        {/* Exact section title: GLIMPSE INTO OUR MEMORIES */}
        <div className="mt-3 flex items-center justify-center gap-2 text-amber-300">
          <div className="h-[1px] w-8 sm:w-12 bg-amber-500/40" />
          <h3 className="text-xs sm:text-sm md:text-base font-bold font-display tracking-[0.2em] text-amber-300 uppercase">
            {APP_CONFIG.memories.title}
          </h3>
          <div className="h-[1px] w-8 sm:w-12 bg-amber-500/40" />
        </div>

        {/* Range Label Badge */}
        {currentPerson.photoRange && (
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/35 text-[11px] font-display text-amber-200">
            <span>{currentPerson.photoRange.label}</span>
            <span>•</span>
            <span>{currentPerson.photoRange.count} {currentPerson.photoRange.count === 1 ? 'Photo' : 'Photos'}</span>
          </div>
        )}

        {/* Emotional subtitle */}
        {currentPerson.subtitle && (
          <p className="mt-3 text-sm sm:text-lg text-amber-200/90 max-w-xl mx-auto font-body italic">
            "{currentPerson.subtitle}"
          </p>
        )}

        {/* Description */}
        {currentPerson.description && (
          <p className="mt-2 text-xs sm:text-sm text-amber-300/70 max-w-lg mx-auto font-body">
            {currentPerson.description}
          </p>
        )}
      </div>

      {/* Side-Scrollable Horizontal Gallery */}
      <div className="my-6 sm:my-8 -mx-4 sm:-mx-6 md:mx-0">
        <div className="px-4 sm:px-6 md:px-0">
          <PhotoGallery
            photos={currentPerson.photos}
            personName={currentPerson.name}
            onPhotoUpdated={handlePhotoUpdated}
          />
        </div>
      </div>

      {/* Additional personalized blessing/message */}
      {currentPerson.additionalMessage && (
        <div className="mt-8 max-w-xl mx-auto p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-amber-900/20 to-amber-950/40 border border-amber-400/25 text-center shadow-lg">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-amber-400/10 text-amber-300 mb-2">
            <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
          <p className="text-sm sm:text-base text-amber-100 font-ethiopic leading-relaxed">
            {currentPerson.additionalMessage}
          </p>
        </div>
      )}

      {/* Switch person button */}
      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/30 text-xs sm:text-sm text-amber-300 hover:text-amber-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Change Name / Return to Entrance</span>
        </button>
      </div>
    </section>
  );
};
