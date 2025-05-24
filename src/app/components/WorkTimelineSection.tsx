'use client';

import React from 'react';
import WorkTimeline from './WorkTimeline';

// Define your actual work and project data here
const portfolioTimelineData = {
  currentWork: [
    {
      id: '1',
      title: 'Portfolio Website Redesign',
      period: '2024 - Present',
      description: 'Complete redesign and rebuild of personal portfolio using Next.js 15 with modern UI/UX principles. Implementing DaisyUI timeline components and custom design system for better maintainability and user experience.',
      technologies: ['Next.js 15', 'TypeScript', 'TailwindCSS', 'DaisyUI', 'Framer Motion'],
      status: 'current' as const,
      url: 'https://martinmccurley.com',
      type: 'project' as const,
    },
    {
      id: '2',
      title: 'Senior Full Stack Developer',
      company: 'Your Current Company', // Replace with actual company
      period: '2023 - Present',
      description: 'Leading development of scalable web applications using modern technologies. Mentoring junior developers and implementing best practices for code quality, performance optimization, and architectural decisions.',
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      status: 'current' as const,
      type: 'work' as const,
    },
    {
      id: '3',
      title: 'Open Source Contributions',
      period: '2024 - Present',
      description: 'Active contributor to open source projects and maintainer of personal repositories. Focus on React ecosystem, developer tooling, and modern web development solutions.',
      technologies: ['React', 'TypeScript', 'Node.js', 'GitHub Actions', 'npm'],
      status: 'current' as const,
      url: 'https://github.com/MartinMcCurley',
      type: 'project' as const,
    },
  ],
  completedWork: [
    {
      id: '4',
      title: 'E-commerce Platform',
      period: '2023',
      description: 'Built a comprehensive e-commerce platform with advanced features including real-time inventory management, payment processing with Stripe integration, and analytics dashboard. Achieved 99.9% uptime and handled 10k+ concurrent users.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Redis', 'Docker', 'Nginx'],
      status: 'completed' as const,
      url: 'https://github.com/MartinMcCurley', // Replace with actual project URL
      type: 'project' as const,
    },
    {
      id: '5',
      title: 'Full Stack Developer',
      company: 'Previous Company Name', // Replace with actual company
      period: '2021 - 2023',
      description: 'Developed and maintained multiple client projects ranging from e-commerce platforms to content management systems. Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines.',
      technologies: ['React', 'Vue.js', 'Django', 'Python', 'MySQL', 'Docker', 'AWS'],
      status: 'completed' as const,
      type: 'work' as const,
    },
    {
      id: '6',
      title: 'Task Management SaaS',
      period: '2022',
      description: 'Developed a collaborative task management application with real-time updates, file sharing, and team communication features. Used WebSocket technology for live collaboration and implemented comprehensive user roles and permissions.',
      technologies: ['React', 'Socket.io', 'Express.js', 'MongoDB', 'Material-UI', 'JWT'],
      status: 'completed' as const,
      url: 'https://github.com/MartinMcCurley', // Replace with actual project URL
      type: 'project' as const,
    },
    {
      id: '7',
      title: 'Frontend Developer',
      company: 'StartupXYZ', // Replace with actual company
      period: '2020 - 2021',
      description: 'Focused on creating responsive and accessible user interfaces for a SaaS platform. Worked closely with UX designers to implement pixel-perfect designs and smooth user experiences across multiple device types.',
      technologies: ['React', 'JavaScript', 'SCSS', 'Jest', 'Webpack', 'Figma'],
      status: 'completed' as const,
      type: 'work' as const,
    },
    {
      id: '8',
      title: 'Real Estate Dashboard',
      period: '2021',
      description: 'Built a comprehensive real estate management dashboard with property listings, client management, and analytics. Integrated with multiple MLS APIs and implemented advanced search and filtering capabilities.',
      technologies: ['Vue.js', 'Nuxt.js', 'Laravel', 'MySQL', 'Google Maps API', 'Chart.js'],
      status: 'completed' as const,
      url: 'https://github.com/MartinMcCurley', // Replace with actual project URL
      type: 'project' as const,
    },
  ],
};

export function WorkTimelineSection() {
  return (
    <section className="py-16 px-6 min-h-[calc(100vh-200px)] bg-bg-primary">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-section font-bold mb-4 text-text-primary">
            Professional Journey
          </h2>
          <p className="text-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A timeline of my professional experiences, current projects, and completed work.
          </p>
        </div>

        {/* Timeline Component */}
        <WorkTimeline 
          currentWork={portfolioTimelineData.currentWork}
          completedWork={portfolioTimelineData.completedWork}
        />

        {/* Call to Action */}
        <div className="text-center mt-20">
          <div className="bg-bg-secondary border border-border-subtle rounded-xl shadow-card max-w-2xl mx-auto p-8 hover:shadow-card-hover transition-all duration-300">
            <h3 className="text-subsection font-semibold text-accent-primary mb-4">
              Interested in Working Together?
            </h3>
            <p className="text-body text-text-secondary mb-6 leading-relaxed">
              I'm always open to discussing new opportunities and interesting projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:martin@martinmccurley.com" // Replace with your actual email
                className="inline-flex items-center justify-center px-6 py-3 bg-accent-primary text-bg-primary text-body font-medium rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-glow hover:shadow-glow-hover"
              >
                Get In Touch
              </a>
              <a 
                href="https://github.com/MartinMcCurley"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-text-primary text-body font-medium rounded-lg border border-border-accent hover:bg-accent-primary/10 hover:border-accent-hover transition-all duration-200"
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// Loading skeleton for the timeline section
export function WorkTimelineSkeleton() {
  return (
    <section className="py-16 px-6 min-h-[calc(100vh-200px)] bg-bg-primary">
      <div className="max-w-4xl mx-auto">
        
        {/* Header skeleton */}
        <div className="text-center mb-16">
          <div className="h-10 bg-bg-secondary rounded-lg w-80 mx-auto mb-4 animate-pulse"></div>
          <div className="h-6 bg-bg-secondary rounded w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Timeline skeleton */}
        <div className="space-y-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-6">
              <div className="w-16 h-16 bg-bg-secondary rounded-full animate-pulse flex-shrink-0"></div>
              <div className="flex-1 space-y-3">
                <div className="h-6 bg-bg-secondary rounded w-64 animate-pulse"></div>
                <div className="h-4 bg-bg-secondary rounded w-48 animate-pulse"></div>
                <div className="h-20 bg-bg-secondary rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
} 