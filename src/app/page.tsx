import { fetchGitHubRepos, ProjectData } from '@/lib/github';

// This will run at build time in Next.js static export
async function getProjectsData(): Promise<ProjectData[]> {
  return await fetchGitHubRepos();
}

// Create a separate component for the projects section that can handle async data
async function ProjectsSection() {
  const projects = await getProjectsData();

  const getProjectIcon = (language: string) => {
    switch (language?.toLowerCase()) {
      case 'typescript':
      case 'javascript':
        return (
          <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'python':
        return (
          <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'react':
      case 'next.js':
        return (
          <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
    }
  };

  return (
    <section id="projects" className="py-20 px-6 bg-bg-secondary" aria-labelledby="projects-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="projects-heading" className="text-section font-semibold text-text-primary mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-body text-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects that showcase my skills and passion for development.
        </p>
        
        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" role="list">
          {projects.map((project) => (
            <article key={project.repoUrl} className="bg-bg-primary border border-border-subtle rounded-lg overflow-hidden hover:border-accent-primary transition-all duration-300 group" role="listitem">
              <div className="aspect-video bg-gradient-to-br from-bg-tertiary to-bg-quaternary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/5"></div>
                <div className="relative z-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-accent-primary/20 flex items-center justify-center">
                    {getProjectIcon(project.language)}
                  </div>
                  <span className="text-text-muted text-xs">{project.language}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-text-primary mb-2 group-hover:text-accent-primary transition-colors">
                  {project.name}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {project.description}
                </p>
                
                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label="Technologies used">
                  {project.topics.length > 0 ? (
                    project.topics.map((topic) => (
                      <span 
                        key={topic}
                        className="px-2 py-1 bg-bg-secondary text-xs text-text-secondary rounded"
                        role="listitem"
                      >
                        {topic}
                      </span>
                    ))
                  ) : (
                    <span className="px-2 py-1 bg-bg-secondary text-xs text-text-secondary rounded">
                      {project.language}
                    </span>
                  )}
                  {project.stars > 0 && (
                    <span className="px-2 py-1 bg-accent-primary/10 text-xs text-accent-primary rounded flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="sr-only">{project.stars} stars on GitHub</span>
                      {project.stars}
                    </span>
                  )}
                </div>
                
                {/* Project Links */}
                <div className="flex gap-4">
                  {project.demoUrl && (
                    <a 
                      href={project.demoUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent-primary hover:text-accent-hover text-sm font-medium transition-colors"
                      aria-label={`View live demo of ${project.name}`}
                    >
                      Live Demo
                    </a>
                  )}
                  <a 
                    href={project.repoUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent-primary hover:text-accent-hover text-sm font-medium transition-colors"
                    aria-label={`View source code for ${project.name} on GitHub`}
                  >
                    View Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* GitHub Profile Link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/MartinMcCurley" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-border-subtle text-text-primary font-medium rounded-lg hover:border-accent-primary hover:text-accent-primary transition-all duration-300"
            aria-label="View all projects on Martin McCurley's GitHub profile"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Accessibility: Skip to main content link */}
      <a href="#main" className="skip-to-main">
        Skip to main content
      </a>

      {/* Navigation Header */}
      <header>
        <nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-sm border-b border-border-subtle" aria-label="Main navigation">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            {/* Logo/Name */}
            <a href="#hero" className="text-text-primary font-semibold text-lg hover:text-accent-primary transition-colors">
              Martin McCurley
            </a>
            
            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-text-secondary hover:text-accent-primary transition-colors">
                About
              </a>
              <a href="#projects" className="text-text-secondary hover:text-accent-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="text-text-secondary hover:text-accent-primary transition-colors">
                Contact
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-accent-primary text-bg-primary font-medium rounded-lg hover:bg-accent-hover transition-all duration-300"
                aria-label="Download Martin McCurley's resume (PDF)"
              >
                Resume
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-text-primary"
              aria-label="Open mobile menu"
              aria-expanded="false"
              aria-controls="mobile-menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main id="main">
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20" aria-labelledby="hero-heading">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 id="hero-heading" className="text-hero md:text-hero-mobile font-bold text-text-primary mb-6 animate-fade-in">
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
          <div className="w-6 h-10 border-2 border-border-subtle rounded-full flex justify-center">
            <div className="w-1 h-3 bg-accent-primary rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section id="about" className="py-20 px-6" aria-labelledby="about-heading">
        <div className="max-w-4xl mx-auto">
          <h2 id="about-heading" className="text-section font-semibold text-text-primary mb-8 text-center">
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-body text-text-secondary leading-relaxed">
                I&apos;m a passionate software developer with a focus on creating clean, efficient, and user-friendly applications. 
                With experience in modern web technologies, I enjoy building solutions that make a real impact.
              </p>
              
              <p className="text-body text-text-secondary leading-relaxed">
                When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, 
                or working on personal projects that challenge me to grow as a developer.
              </p>
              
              {/* Skills/Technologies */}
              <div className="pt-4">
                <h3 className="text-lg font-medium text-text-primary mb-4">Technologies I work with:</h3>
                <div className="flex flex-wrap gap-2" role="list" aria-label="Technical skills">
                  {['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'CSS', 'Tailwind'].map((tech) => (
                    <span 
                      key={tech}
                      className="px-3 py-1 bg-bg-secondary border border-border-subtle rounded-full text-sm text-text-secondary"
                      role="listitem"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Placeholder for optional photo */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-bg-secondary border border-border-subtle rounded-lg flex items-center justify-center" role="img" aria-label="Profile photo placeholder">
                <span className="text-text-muted text-sm">Photo placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section - Now using GitHub data */}
      <ProjectsSection />
      
      {/* Contact Section */}
      <section id="contact" className="py-20 px-6" aria-labelledby="contact-heading">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="contact-heading" className="text-section font-semibold text-text-primary mb-4">
            Let&apos;s Connect
          </h2>
          <p className="text-body text-text-secondary mb-12 max-w-2xl mx-auto">
            I&apos;m always interested in hearing about new opportunities and connecting with fellow developers. 
            Feel free to reach out!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Email */}
            <a 
              href="mailto:martin@martinmccurley.com" 
              className="flex items-center justify-center space-x-3 p-6 bg-bg-secondary border border-border-subtle rounded-lg hover:border-accent-primary transition-all duration-300 group"
              aria-label="Send email to martin@martinmccurley.com"
            >
              <svg className="w-6 h-6 text-accent-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <div className="text-left">
                <div className="text-text-primary font-medium group-hover:text-accent-primary transition-colors">Email</div>
                <div className="text-text-secondary text-sm">martin@martinmccurley.com</div>
              </div>
            </a>
            
            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/martinmccurley" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-3 p-6 bg-bg-secondary border border-border-subtle rounded-lg hover:border-accent-primary transition-all duration-300 group"
              aria-label="Connect with Martin McCurley on LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div className="text-left">
                <div className="text-text-primary font-medium group-hover:text-accent-primary transition-colors">LinkedIn</div>
                <div className="text-text-secondary text-sm">Connect with me</div>
              </div>
            </a>
          </div>
          
          {/* Additional CTA */}
          <div className="mt-12">
            <a 
              href="mailto:martin@martinmccurley.com" 
              className="inline-flex items-center px-8 py-3 bg-accent-primary text-bg-primary font-medium rounded-lg hover:bg-accent-hover hover:shadow-glow transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border-subtle bg-bg-secondary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-text-secondary text-sm mb-4 md:mb-0">
            © 2025 Martin McCurley. All rights reserved.
          </div>
          
          <div className="flex space-x-6" role="list" aria-label="Social media links">
            <a 
              href="https://github.com/MartinMcCurley" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="Visit Martin McCurley's GitHub profile"
              role="listitem"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a 
              href="https://linkedin.com/in/martinmccurley" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="Connect with Martin McCurley on LinkedIn"
              role="listitem"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
