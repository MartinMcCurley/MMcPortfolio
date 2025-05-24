'use client';

import { useState } from 'react';
import { ClientWrapper } from './components/ClientWrapper';
import { CinematicIntro } from './components/CinematicIntro';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // Skip intro on click or spacebar
  const handleSkipIntro = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return (
      <div onClick={handleSkipIntro} onKeyDown={(e) => e.key === ' ' && handleSkipIntro()}>
        <CinematicIntro onComplete={handleIntroComplete} />
      </div>
    );
  }

  return (
    <ClientWrapper>
      <div className="min-h-screen bg-bg-primary flex items-center justify-center p-6">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          
          {/* Main Hero with hook */}
          <div className="space-y-6">
            <h1 className="text-hero font-bold text-text-primary mb-4">
              Martin McCurley
            </h1>
            <p className="text-section text-accent-primary font-medium">
              Software Developer
            </p>
            <p className="text-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
              You're right. Most portfolios <em>are</em> boring. Let's build something different together.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            
            {/* Card 1 - Skills */}
            <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-bg-tertiary hover:border-accent-primary/30 group">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-primary/30 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-accent-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h3 className="text-subsection font-semibold text-text-primary mb-4">Full Stack Development</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Modern web applications with React, Next.js, TypeScript, and Node.js
              </p>
            </div>

            {/* Card 2 - Experience */}
            <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-bg-tertiary hover:border-accent-primary/30 group">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-primary/30 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-accent-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875v-4.25m16.5 0a2.25 2.25 0 00.75-1.69l-1.125-7.874a1.875 1.875 0 00-1.859-1.609H7.359a1.875 1.875 0 00-1.859 1.609L4.375 12.46a2.25 2.25 0 00.75 1.69m16.5 0L21 14l-1.5 1.5-1.5-1.5m1.5 0L21 12l-1.5-1.5L21 14zm-16.5 0L3 14l1.5 1.5L6 14l-1.5 0zm1.5 0L3 12l1.5-1.5L6 14l-1.5 0z" />
                </svg>
              </div>
              <h3 className="text-subsection font-semibold text-text-primary mb-4">Professional Experience</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                First Class Honours in Software Development, now AI-powered and ready to innovate
              </p>
            </div>

            {/* Card 3 - Innovation */}
            <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-bg-tertiary hover:border-accent-primary/30 group">
              <div className="w-12 h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent-primary/30 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-accent-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                </svg>
              </div>
              <h3 className="text-subsection font-semibold text-text-primary mb-4">Beyond the Ordinary</h3>
              <p className="text-body text-text-secondary leading-relaxed">
                Creating exceptional digital experiences that users actually remember and enjoy
              </p>
            </div>

          </div>

          {/* Call to Action */}
          <div className="mt-16">
            <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 shadow-card max-w-2xl mx-auto">
              <h3 className="text-subsection font-semibold text-accent-primary mb-4">
                Let's Create Something Amazing
              </h3>
              <p className="text-body text-text-secondary mb-6 leading-relaxed">
                Ready to discuss a project that breaks the mold? Let's build something people will actually want to use.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:martin@martinmccurley.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent-primary text-bg-primary text-body font-medium rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-glow hover:shadow-glow-hover"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  Email Me
                </a>
                <a 
                  href="https://github.com/MartinMcCurley"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-text-primary text-body font-medium rounded-lg border border-border-accent hover:bg-accent-primary/10 hover:border-accent-hover transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 pt-8 border-t border-border-subtle">
            <p className="text-small text-text-muted">
              Full portfolio launching soon • Built with Next.js, TypeScript & TailwindCSS
            </p>
          </div>

        </div>
      </div>
    </ClientWrapper>
  );
}
