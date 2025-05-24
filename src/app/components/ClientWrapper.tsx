'use client';

import { useState, useEffect, ReactNode } from 'react';
import { CinematicIntro } from './CinematicIntro';

interface ClientWrapperProps {
  children: ReactNode;
}

export function ClientWrapper({ children }: ClientWrapperProps) {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Check if user has already seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenCinematicIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
      setShowContent(true);
    }
    setIsInitialized(true);
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowContent(true);
    // Remember that user has seen the intro for this session
    sessionStorage.setItem('hasSeenCinematicIntro', 'true');
  };

  // Skip intro by clicking anywhere or pressing any key
  useEffect(() => {
    const handleSkip = () => {
      if (showIntro) {
        handleIntroComplete();
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (showIntro && e.code === 'Space') {
        handleIntroComplete();
      }
    };

    if (showIntro && isInitialized) {
      document.addEventListener('click', handleSkip);
      document.addEventListener('keydown', handleKeyPress);
    }

    return () => {
      document.removeEventListener('click', handleSkip);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [showIntro, isInitialized]);

  // Don't render anything until we've checked sessionStorage
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-bg-primary">
        {/* Show a simple loading state while checking sessionStorage */}
      </div>
    );
  }

  if (showIntro) {
    return <CinematicIntro onComplete={handleIntroComplete} />;
  }

  return (
    <div className={`transition-opacity duration-1000 ${
      showContent ? 'opacity-100' : 'opacity-0'
    }`}>
      {children}
    </div>
  );
} 