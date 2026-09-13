import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PetalsBackground } from './components/PetalsBackground';
import { HomePage } from './pages/HomePage';
import { PackagePage } from './pages/PackagePage';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/package')) {
        return '/package';
      }
    }
    return '/';
  });

  const [introCompleted, setIntroCompleted] = useState<boolean>(false);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      setCurrentPath(path.includes('/package') ? '/package' : '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    try {
      window.history.pushState({}, '', path);
    } catch {
      // In sandboxed environments where pushState might be restricted
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayBloom = () => {
    setIntroCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fef9c3] flex flex-col relative overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* Background ambient lighting, floating petals, and glowing particles */}
      <PetalsBackground />

      {/* Persistent Navigation Header with active status and replay control */}
      <Navbar
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onReplayBloom={currentPath === '/' ? handleReplayBloom : undefined}
      />

      {/* Separate Pages Layout */}
      <main className="flex-1 w-full flex flex-col relative">
        {currentPath === '/package' ? (
          <PackagePage />
        ) : (
          <HomePage
            introCompleted={introCompleted}
            onIntroComplete={() => setIntroCompleted(true)}
            onReplayBloom={handleReplayBloom}
          />
        )}
      </main>
    </div>
  );
}
