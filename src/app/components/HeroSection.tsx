export function HeroSection() {
  return (
    <section id="hero" className="pt-24 pb-8 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent-primary to-accent-hover rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
            MM
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
          Martin McCurley
        </h1>
        
        <p className="text-base md:text-lg text-text-secondary mb-6 max-w-3xl mx-auto leading-relaxed">
          Software Developer. Been doing this for ages. Graduated December 2024 First Class Honours in Software Development for Business. Now AI Powered.
        </p>
      </div>
    </section>
  );
} 