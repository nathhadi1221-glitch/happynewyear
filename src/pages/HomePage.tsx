import React, { useState } from 'react';
import { FlowerIntro } from '../components/FlowerIntro';
import { JoinSection } from '../components/JoinSection';
import { PersonalizedSection } from '../components/PersonalizedSection';
import { NewYearMessage, FinalWish } from '../components/NewYearMessage';
import { PersonProfile } from '../types';

interface HomePageProps {
  introCompleted: boolean;
  onIntroComplete: () => void;
  onReplayBloom: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  introCompleted,
  onIntroComplete,
  onReplayBloom,
}) => {
  // Visitor profile state: null until they successfully join
  const [activePerson, setActivePerson] = useState<PersonProfile | null>(null);

  const handleJoinSuccess = (person: PersonProfile) => {
    setActivePerson(person);
    // Smooth scroll down to personalized section
    setTimeout(() => {
      document.getElementById('personalized-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const handleResetPerson = () => {
    setActivePerson(null);
  };

  return (
    <div className="w-full relative z-10 flex flex-col items-center min-h-[calc(100vh-80px)]">
      {/* 
        FIRST SECTION: FLOWER INTRODUCTION
        The existing intro/flower-blooming animation plays directly in the Home page's first section.
      */}
      <FlowerIntro
        isCompleted={introCompleted}
        onComplete={onIntroComplete}
      />

      {/* 
        SECOND SECTION: JOIN THE NEW YEAR
        Visible when no visitor profile is currently selected.
      */}
      {!activePerson ? (
        <JoinSection onJoinSuccess={handleJoinSuccess} />
      ) : (
        /* POST-BLOOM PERSONALIZED EXPERIENCE */
        <div className="w-full transition-all duration-1000 animate-fadeIn">
          {/* Personalized Memory Section */}
          <PersonalizedSection
            person={activePerson}
            onReset={handleResetPerson}
            onSelectPerson={(p) => setActivePerson(p)}
          />

          {/* New Year Message Slider with Hold-to-Pause */}
          <NewYearMessage />

          {/* Final Wish and Signature */}
          <FinalWish />
        </div>
      )}
    </div>
  );
};
