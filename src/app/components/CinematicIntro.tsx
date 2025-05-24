'use client';

import { useState, useEffect } from 'react';

interface CinematicIntroProps {
  onComplete: () => void;
}

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [currentWord, setCurrentWord] = useState(0);
  const [showFade, setShowFade] = useState(false);
  const [showSkipHint, setShowSkipHint] = useState(false);

  const words = ['PORTFOLIOS', 'ARE', 'BORING'];

  useEffect(() => {
    const wordDuration = 1200; // Duration for each word animation
    const wordDelay = 300; // Delay between words

    // Show skip hint after a delay
    const skipHintTimer = setTimeout(() => {
      setShowSkipHint(true);
    }, 2000);

    // Show words sequentially
    const wordTimers = words.map((_, index) => {
      return setTimeout(() => {
        setCurrentWord(index);
      }, index * (wordDuration + wordDelay));
    });

    // After all words, start fade and complete
    const fadeTimer = setTimeout(() => {
      setShowFade(true);
    }, words.length * (wordDuration + wordDelay) + 500);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, words.length * (wordDuration + wordDelay) + 1300);

    return () => {
      clearTimeout(skipHintTimer);
      wordTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden cursor-pointer">
      {/* Cinematic Background - Using color palette */}
      <div className="absolute inset-0" style={{ background: '#0d0d0d' }}>
        {/* Animated particles with orange glow */}
        <div className="absolute inset-0 opacity-40">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: i % 3 === 0 ? '#ff5c00' : '#ffffff',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
                boxShadow: i % 3 === 0 ? '0 0 10px rgba(255, 92, 0, 0.6)' : '0 0 6px rgba(255, 255, 255, 0.4)'
              }}
            />
          ))}
        </div>
        
        {/* Subtle grid overlay - Using charcoal gray */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(#1a1a1a 1px, transparent 1px),
              linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Skip hint - Using typography system */}
      <div 
        className={`absolute top-8 right-8 transition-opacity duration-1000 ${
          showSkipHint && !showFade ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '0.875rem',
          fontWeight: 400,
          color: '#a0a0a0',
          letterSpacing: '0.025em'
        }}
      >
        Click or press SPACE to skip
      </div>

      {/* 3D Perspective Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          perspective: '1500px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Flying Text - Using typography system */}
        {words.map((word, index) => (
          <div
            key={word}
            className="absolute select-none"
            style={{
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 'clamp(4rem, 15vw, 12rem)',
              fontWeight: 700, // Bold from typography system
              letterSpacing: '-0.025em', // Tight letter spacing for large headings
              lineHeight: 1.2, // Tight line height for headings
              color: '#ffffff', // Primary text color
              textShadow: `
                0 0 30px rgba(255, 92, 0, 0.8),
                0 0 60px rgba(255, 92, 0, 0.4),
                0 0 100px rgba(255, 92, 0, 0.2),
                0 0 20px rgba(255, 255, 255, 0.6)
              `,
              transform: currentWord === index 
                ? 'translateZ(0px) scale(1) rotateX(0deg)' 
                : currentWord > index 
                  ? 'translateZ(4000px) scale(5) rotateX(30deg)' 
                  : 'translateZ(-4000px) scale(0.1) rotateX(-15deg)',
              opacity: currentWord === index ? 1 : currentWord > index ? 0 : 0,
              transition: 'all 1.3s cubic-bezier(0.23, 1, 0.320, 1)',
              filter: currentWord === index ? 'blur(0px)' : 'blur(3px)',
              WebkitTextStroke: currentWord === index ? '1px rgba(255, 92, 0, 0.3)' : 'none'
            }}
          >
            {word}
            
            {/* Enhanced glow effect with orange */}
            <div 
              className="absolute inset-0 -z-10"
              style={{
                fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(4rem, 15vw, 12rem)',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                lineHeight: 1.2,
                color: 'transparent',
                textShadow: '0 0 80px rgba(255, 92, 0, 0.7)',
                filter: 'blur(25px)'
              }}
            >
              {word}
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced scanlines with orange tint */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(255, 92, 0, 0.02) 2px,
            rgba(255, 92, 0, 0.02) 4px
          )`,
          animation: 'scanlines 0.08s linear infinite'
        }}
      />

      {/* Film grain with orange overlay */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, 
            rgba(255, 92, 0, 0.03) 0%, 
            rgba(13, 13, 13, 0.1) 50%, 
            rgba(0, 0, 0, 0.2) 100%
          )`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Fade to portfolio - Using bg-primary color */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          showFade ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundColor: '#0d0d0d' }}
      />

      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  );
} 