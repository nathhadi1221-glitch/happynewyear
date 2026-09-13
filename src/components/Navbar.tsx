import React from 'react';
import { Sparkles, Calendar } from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onReplayBloom?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  onReplayBloom,
}) => {
  const isHome = currentPath === '/' || currentPath === '';
  const isPackage = currentPath === '/package';

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#09090b]/80 border-b border-amber-500/20 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand / Emblem */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg p-1"
          aria-label="Ethiopian New Year 2019 Home"
        >
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-gradient-to-tr from-amber-600/30 to-yellow-400/20 border border-amber-400/40 group-hover:border-amber-400 transition-colors">
            {/* Small Adey Abeba daisy icon */}
            <span className="text-lg select-none">🌼</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-semibold tracking-wider text-amber-200 uppercase font-display group-hover:text-amber-100 transition-colors">
              Enkutatash 2019
            </span>
            <span className="text-[10px] sm:text-xs text-amber-400/80 font-ethiopic">
              እንቁጣጣሽ ፳፻፲፱
            </span>
          </div>
        </button>

        {/* Navigation buttons: HOME & PACKAGE */}
        <nav className="flex items-center gap-1.5 sm:gap-3" aria-label="Main Navigation">
          <button
            id="nav-home-btn"
            onClick={() => onNavigate('/')}
            className={`relative px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center ${
              isHome
                ? 'text-black bg-gradient-to-r from-amber-400 to-yellow-400 font-semibold shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10'
            }`}
            aria-current={isHome ? 'page' : undefined}
          >
            HOME
          </button>

          <button
            id="nav-package-btn"
            onClick={() => onNavigate('/package')}
            className={`relative px-3.5 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 min-h-[44px] flex items-center justify-center ${
              isPackage
                ? 'text-black bg-gradient-to-r from-amber-400 to-yellow-400 font-semibold shadow-[0_0_20px_rgba(251,191,36,0.35)]'
                : 'text-amber-200/80 hover:text-amber-100 hover:bg-amber-400/10'
            }`}
            aria-current={isPackage ? 'page' : undefined}
          >
            PACKAGE
          </button>

          {/* Replay Bloom icon button on Home */}
          {isHome && onReplayBloom && (
            <button
              onClick={onReplayBloom}
              title="Replay Blooming Animation"
              aria-label="Replay Blooming Animation"
              className="ml-1 p-2 rounded-full text-amber-400/80 hover:text-amber-300 hover:bg-amber-400/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};
