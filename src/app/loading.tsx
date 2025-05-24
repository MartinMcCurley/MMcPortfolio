'use client';

import { useState, useEffect } from 'react';

export default function Loading() {
  const [currentWord, setCurrentWord] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const words = ['PORTFOLIOS', 'ARE', 'BORING'];

  useEffect(() => {
    const wordDuration = 1200; // Duration for each word animation
    const wordDelay = 300; // Delay between words

    // Show words sequentially
    const wordTimers = words.map((_, index) => {
      return setTimeout(() => {
        setCurrentWord(index);
      }, index * (wordDuration + wordDelay));
    });

    // After all words, show the actual content
    const finalTimer = setTimeout(() => {
      setShowContent(true);
      setTimeout(() => {
        setIsComplete(true);
      }, 800); // Fade in duration
    }, words.length * (wordDuration + wordDelay) + 500);

    return () => {
      wordTimers.forEach(timer => clearTimeout(timer));
      clearTimeout(finalTimer);
    };
  }, []);

  if (isComplete) {
    return null; // Let the actual page render
  }

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black">
        {/* Subtle stars/particles effect */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Perspective Container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ 
          perspective: '1000px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Flying Text */}
        {words.map((word, index) => (
          <div
            key={word}
            className={`absolute text-white font-black tracking-wider select-none transition-all duration-1200 ease-out ${
              currentWord === index ? 'animate-flyIn' : currentWord > index ? 'animate-flyOut' : 'opacity-0'
            }`}
            style={{
              fontSize: currentWord === index ? 'clamp(4rem, 15vw, 12rem)' : '8rem',
              textShadow: '0 0 50px rgba(255, 255, 255, 0.5)',
              transform: currentWord === index 
                ? 'translateZ(0px) scale(1)' 
                : currentWord > index 
                  ? 'translateZ(2000px) scale(3)' 
                  : 'translateZ(-2000px) scale(0.1)',
              opacity: currentWord === index ? 1 : currentWord > index ? 0 : 0
            }}
          >
            {word}
          </div>
        ))}
      </div>

      {/* Fade overlay for transition to content */}
      <div 
        className={`absolute inset-0 bg-bg-primary transition-opacity duration-800 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Show actual loading skeleton during fade */}
        {showContent && (
          <div className="min-h-screen bg-bg-primary animate-fade-in">
            {/* Navigation Skeleton */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border-subtle">
              <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="w-32 h-6 bg-bg-secondary rounded-md animate-pulse"></div>
                <div className="hidden md:flex space-x-8">
                  <div className="w-16 h-4 bg-bg-secondary rounded animate-pulse"></div>
                  <div className="w-16 h-4 bg-bg-secondary rounded animate-pulse"></div>
                  <div className="w-20 h-8 bg-accent-primary/20 rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Hero Section Skeleton */}
            <section className="pt-32 pb-20 px-6">
              <div className="max-w-4xl mx-auto text-center">
                <div className="w-24 h-24 bg-bg-secondary rounded-full mx-auto mb-8 animate-pulse"></div>
                <div className="w-96 h-12 bg-bg-secondary rounded-lg mx-auto mb-4 animate-pulse"></div>
                <div className="w-64 h-6 bg-bg-secondary rounded mx-auto mb-8 animate-pulse"></div>
                <div className="flex justify-center space-x-4">
                  <div className="w-32 h-10 bg-accent-primary/20 rounded-lg animate-pulse"></div>
                  <div className="w-32 h-10 bg-bg-secondary rounded-lg animate-pulse"></div>
                </div>
              </div>
            </section>

            {/* Projects Section Skeleton */}
            <section className="py-20 px-6">
              <div className="max-w-4xl mx-auto">
                <div className="w-48 h-8 bg-bg-secondary rounded mx-auto mb-12 animate-pulse"></div>
                
                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-bg-secondary rounded-lg p-6 animate-pulse">
                      <div className="w-8 h-8 bg-bg-primary rounded mb-4"></div>
                      <div className="w-3/4 h-6 bg-bg-primary rounded mb-2"></div>
                      <div className="w-full h-4 bg-bg-primary rounded mb-4"></div>
                      <div className="flex space-x-2 mb-4">
                        <div className="w-16 h-6 bg-bg-primary rounded-full"></div>
                        <div className="w-20 h-6 bg-bg-primary rounded-full"></div>
                      </div>
                      <div className="flex justify-between">
                        <div className="w-16 h-8 bg-bg-primary rounded"></div>
                        <div className="w-16 h-8 bg-bg-primary rounded"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes flyIn {
          0% {
            transform: translateZ(-2000px) scale(0.1);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateZ(0px) scale(1);
            opacity: 1;
          }
        }

        @keyframes flyOut {
          0% {
            transform: translateZ(0px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateZ(2000px) scale(3);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-flyIn {
          animation: flyIn 1.2s ease-out forwards;
        }

        .animate-flyOut {
          animation: flyOut 0.8s ease-in forwards;
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-in forwards;
        }
      `}</style>
    </div>
  );
} 