import { fetchGitHubRepos, ProjectData } from '@/lib/github';

// Compact Project Card Component with placeholder image
function CompactProjectCard({ project, isLeft = false }: { project: ProjectData, isLeft?: boolean }) {
  return (
    <div className={`group relative bg-bg-secondary rounded-lg p-4 transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/10 hover:-translate-y-1 border border-border-subtle hover:border-accent-primary/30 ${isLeft ? 'ml-4' : 'mr-4'}`}>
      {/* Project Image */}
      <div className="mb-3 overflow-hidden rounded-md">
        <img 
          src="https://placehold.co/200x120/0d0d0d/ff5c00" 
          alt={`${project.name} project screenshot`}
          className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Project Info */}
      <h3 className="text-sm font-semibold text-text-primary mb-1 group-hover:text-accent-primary transition-colors duration-300 line-clamp-1">
        {project.name}
      </h3>
      
      <p className="text-xs text-text-secondary mb-2 line-clamp-2 leading-relaxed">
        {project.description}
      </p>
      
      {/* Language badge */}
      <div className="flex items-center justify-between mb-2">
        <span className="px-2 py-1 text-xs bg-accent-primary/20 text-accent-primary rounded-full font-medium">
          {project.language}
        </span>
        <span className="flex items-center space-x-1 text-text-tertiary">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span className="text-xs">{project.stars}</span>
        </span>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between items-center">
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-secondary hover:text-accent-primary transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-accent-primary focus:ring-opacity-50 rounded p-1"
          aria-label={`View ${project.name} source code on GitHub`}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs bg-accent-primary text-bg-primary px-2 py-1 rounded hover:bg-accent-hover transition-colors duration-300"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}

// Tree Branch Component
function TreeBranch({ direction }: { direction: 'left' | 'right' }) {
  return (
    <div className={`absolute top-1/2 ${direction === 'left' ? 'right-full' : 'left-full'} w-16 h-0.5 bg-gradient-to-${direction === 'left' ? 'l' : 'r'} from-accent-primary to-transparent`}>
      {/* Branch connector line */}
      <div className={`absolute ${direction === 'left' ? 'left-0' : 'right-0'} top-0 w-4 h-16 border-${direction === 'left' ? 'l' : 'r'} border-t border-accent-primary/50 -translate-y-8`}></div>
    </div>
  );
}

// Server-side Projects Component with Tree Layout
export async function ProjectsSection() {
  const allProjects = await fetchGitHubRepos();
  
  // Sort by last updated date
  const sortedProjects = allProjects.sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  
  // Split projects
  const workingOnProjects = sortedProjects.slice(0, 3);
  const workedOnProjects = sortedProjects.slice(3, 6); // Limit to keep it compact

  return (
    <section className="py-8 px-6 min-h-[calc(100vh-300px)]">
      <div className="max-w-6xl mx-auto">
        {/* Tree Layout */}
        <div className="relative">
          {/* Central trunk */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-gradient-to-b from-accent-primary via-accent-primary/50 to-transparent transform -translate-x-1/2"></div>
          
          {/* Central node */}
          <div className="relative flex justify-center mb-8">
            <div className="w-4 h-4 bg-accent-primary rounded-full shadow-lg shadow-accent-primary/50"></div>
          </div>
          
          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            
            {/* Left Branch - Working On */}
            <div className="relative">
              {/* Branch connector */}
              <div className="hidden lg:block absolute top-8 right-0 w-12 h-0.5 bg-gradient-to-r from-transparent to-accent-primary"></div>
              
              <div className="text-right lg:pr-12">
                <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center justify-end">
                  <svg className="w-5 h-5 mr-2 text-accent-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  Working on...
                </h3>
                
                <div className="space-y-4">
                  {workingOnProjects.length > 0 ? (
                    workingOnProjects.map((project) => (
                      <CompactProjectCard key={project.name} project={project} isLeft={true} />
                    ))
                  ) : (
                    // Placeholder projects for "Working on"
                    [...Array(3)].map((_, i) => (
                      <CompactProjectCard key={i} project={{
                        name: `Project ${i + 1}`,
                        description: 'Currently in development...',
                        language: 'TypeScript',
                        stars: Math.floor(Math.random() * 50),
                        repoUrl: '#',
                        demoUrl: '#',
                        topics: ['react', 'nextjs'],
                        lastUpdated: new Date().toISOString()
                      }} isLeft={true} />
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Branch - Worked On */}
            <div className="relative">
              {/* Branch connector */}
              <div className="hidden lg:block absolute top-8 left-0 w-12 h-0.5 bg-gradient-to-l from-transparent to-accent-primary"></div>
              
              <div className="lg:pl-12">
                <h3 className="text-xl font-semibold text-text-primary mb-6 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-accent-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Worked on
                </h3>
                
                <div className="space-y-4">
                  {workedOnProjects.length > 0 ? (
                    workedOnProjects.map((project) => (
                      <CompactProjectCard key={project.name} project={project} />
                    ))
                  ) : (
                    // Placeholder projects for "Worked on"
                    [...Array(3)].map((_, i) => (
                      <CompactProjectCard key={i} project={{
                        name: `Completed Project ${i + 1}`,
                        description: 'Successfully delivered and deployed.',
                        language: 'JavaScript',
                        stars: Math.floor(Math.random() * 100),
                        repoUrl: '#',
                        demoUrl: '#',
                        topics: ['react', 'nodejs'],
                        lastUpdated: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString()
                      }} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Compact Loading fallback for Suspense
export function ProjectsSkeleton() {
  return (
    <section className="py-8 px-6 min-h-[calc(100vh-300px)]">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Central trunk skeleton */}
          <div className="absolute left-1/2 top-0 w-1 h-full bg-bg-secondary transform -translate-x-1/2 animate-pulse"></div>
          
          {/* Central node skeleton */}
          <div className="relative flex justify-center mb-8">
            <div className="w-4 h-4 bg-bg-secondary rounded-full animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            {/* Left side skeleton */}
            <div className="text-right lg:pr-12">
              <div className="w-32 h-6 bg-bg-secondary rounded mb-6 ml-auto animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-bg-secondary rounded-lg p-4 ml-4 animate-pulse">
                    <div className="w-full h-20 bg-bg-primary rounded-md mb-3"></div>
                    <div className="w-3/4 h-4 bg-bg-primary rounded mb-2"></div>
                    <div className="w-full h-3 bg-bg-primary rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-bg-primary rounded"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right side skeleton */}
            <div className="lg:pl-12">
              <div className="w-28 h-6 bg-bg-secondary rounded mb-6 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-bg-secondary rounded-lg p-4 mr-4 animate-pulse">
                    <div className="w-full h-20 bg-bg-primary rounded-md mb-3"></div>
                    <div className="w-3/4 h-4 bg-bg-primary rounded mb-2"></div>
                    <div className="w-full h-3 bg-bg-primary rounded mb-2"></div>
                    <div className="w-1/2 h-3 bg-bg-primary rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 