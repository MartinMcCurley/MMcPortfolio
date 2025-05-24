import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-hero md:text-hero-mobile font-bold text-text-primary mb-6 animate-fade-in">
            Martin McCurley
          </h1>
          
          {/* Subtitle */}
          <p className="text-section md:text-section-mobile font-medium text-text-secondary mb-8 animate-slide-up">
            Software Developer
          </p>
          
          {/* Description */}
          <p className="text-body md:text-body-mobile text-text-secondary max-w-2xl mx-auto mb-12 animate-slide-up">
            Crafting modern, performant web experiences with a focus on clean code and exceptional user interfaces.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
            <a 
              href="#projects" 
              className="px-8 py-3 bg-accent-primary text-bg-primary font-medium rounded-lg
                         hover:bg-accent-hover hover:shadow-glow transition-all duration-300
                         focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="px-8 py-3 border border-border-subtle text-text-primary font-medium rounded-lg
                         hover:border-accent-primary hover:text-accent-primary hover:shadow-glow
                         transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-border-subtle rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Temporary sections for navigation */}
      <section id="projects" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-section font-semibold text-text-primary mb-4">
            Projects
          </h2>
          <p className="text-body text-text-secondary">
            Project showcase coming soon...
          </p>
        </div>
      </section>
      
      <section id="contact" className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-section font-semibold text-text-primary mb-4">
            Contact
          </h2>
          <p className="text-body text-text-secondary">
            Contact information coming soon...
          </p>
        </div>
      </section>
    </main>
  );
}
