// Project Card Skeleton
export function ProjectCardSkeleton() {
  return (
    <div className="bg-bg-secondary rounded-lg p-6 animate-pulse">
      <div className="w-8 h-8 bg-bg-primary rounded mb-4"></div>
      <div className="w-3/4 h-6 bg-bg-primary rounded mb-2"></div>
      <div className="w-full h-4 bg-bg-primary rounded mb-1"></div>
      <div className="w-5/6 h-4 bg-bg-primary rounded mb-4"></div>
      <div className="flex space-x-2 mb-4">
        <div className="w-16 h-6 bg-bg-primary rounded-full"></div>
        <div className="w-20 h-6 bg-bg-primary rounded-full"></div>
        <div className="w-14 h-6 bg-bg-primary rounded-full"></div>
      </div>
      <div className="flex justify-between">
        <div className="w-16 h-8 bg-bg-primary rounded"></div>
        <div className="w-16 h-8 bg-bg-primary rounded"></div>
      </div>
    </div>
  );
}

// Projects Grid Skeleton
export function ProjectsGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Hero Section Skeleton
export function HeroSkeleton() {
  return (
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
  );
}

// Contact Section Skeleton
export function ContactSkeleton() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="w-32 h-8 bg-bg-secondary rounded mx-auto mb-8 animate-pulse"></div>
        <div className="w-96 h-6 bg-bg-secondary rounded mx-auto mb-8 animate-pulse"></div>
        <div className="flex justify-center space-x-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-12 h-12 bg-bg-secondary rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Loading Spinner Component
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <div className="w-full h-full border-4 border-border-subtle border-t-accent-primary rounded-full"></div>
    </div>
  );
}

// Inline Loading Text
export function LoadingText({ text = "Loading..." }: { text?: string }) {
  return (
    <div className="flex items-center justify-center space-x-2 text-text-secondary">
      <LoadingSpinner size="sm" />
      <span>{text}</span>
    </div>
  );
} 