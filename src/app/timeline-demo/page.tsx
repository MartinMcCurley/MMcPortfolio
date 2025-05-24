'use client';

import React, { useState } from 'react';
import Timeline from '../components/Timeline';

const sampleTimelineData = [
  {
    id: '1',
    title: 'Senior Full Stack Developer',
    company: 'Tech Innovate Inc.',
    period: '2023 - Present',
    description: 'Leading development of scalable web applications using modern technologies. Mentoring junior developers and implementing best practices for code quality and performance optimization.',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
    status: 'current' as const,
    type: 'work' as const,
  },
  {
    id: '2', 
    title: 'Portfolio Website Redesign',
    period: '2024',
    description: 'Complete redesign and rebuild of personal portfolio using Next.js 15 with modern UI/UX principles. Implemented custom design system and DaisyUI components for better maintainability.',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'DaisyUI', 'Framer Motion'],
    status: 'current' as const,
    url: 'https://martinmccurley.com',
    type: 'project' as const,
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'Digital Solutions Co.',
    period: '2021 - 2023',
    description: 'Developed and maintained multiple client projects ranging from e-commerce platforms to content management systems. Collaborated with cross-functional teams to deliver high-quality software solutions.',
    technologies: ['React', 'Vue.js', 'Django', 'Python', 'MySQL', 'Docker'],
    status: 'completed' as const,
    type: 'work' as const,
  },
  {
    id: '4',
    title: 'E-commerce Platform',
    period: '2023',
    description: 'Built a comprehensive e-commerce platform with advanced features including real-time inventory management, payment processing, and analytics dashboard. Achieved 99.9% uptime and handled 10k+ concurrent users.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Docker'],
    status: 'completed' as const,
    url: 'https://github.com/example/ecommerce',
    type: 'project' as const,
  },
  {
    id: '5',
    title: 'Frontend Developer',
    company: 'StartupXYZ',
    period: '2020 - 2021',
    description: 'Focused on creating responsive and accessible user interfaces for a SaaS platform. Worked closely with UX designers to implement pixel-perfect designs and smooth user experiences.',
    technologies: ['React', 'JavaScript', 'SCSS', 'Jest', 'Webpack'],
    status: 'completed' as const,
    type: 'work' as const,
  },
  {
    id: '6',
    title: 'Task Management App',
    period: '2022',
    description: 'Developed a collaborative task management application with real-time updates, file sharing, and team communication features. Used WebSocket technology for live collaboration.',
    technologies: ['React', 'Socket.io', 'Express.js', 'MongoDB', 'Material-UI'],
    status: 'completed' as const,
    url: 'https://github.com/example/taskmanager',
    type: 'project' as const,
  },
];

export default function TimelineDemoPage() {
  const [filter, setFilter] = useState<'all' | 'current' | 'completed'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'work' | 'project'>('all');

  // Filter data based on both status and type
  const filteredData = sampleTimelineData.filter(item => {
    const statusMatch = filter === 'all' || item.status === filter;
    const typeMatch = typeFilter === 'all' || item.type === typeFilter;
    return statusMatch && typeMatch;
  });

  return (
    <div className="min-h-screen bg-bg-primary p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-hero font-bold mb-4 text-accent-primary">Portfolio Timeline</h1>
          <p className="text-body text-text-secondary max-w-2xl mx-auto leading-relaxed">
            A chronological view of my professional journey and project milestones using DaisyUI's timeline component with custom design system.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 text-body font-medium rounded-lg border transition-all duration-200 ${
                filter === 'all' 
                  ? 'bg-accent-primary text-bg-primary border-accent-primary shadow-glow' 
                  : 'bg-transparent text-text-primary border-border-subtle hover:border-accent-primary/50 hover:bg-accent-primary/10'
              }`}
              onClick={() => setFilter('all')}
            >
              All Items
            </button>
            <button 
              className={`px-4 py-2 text-body font-medium rounded-lg border transition-all duration-200 ${
                filter === 'current' 
                  ? 'bg-accent-primary text-bg-primary border-accent-primary shadow-glow' 
                  : 'bg-transparent text-text-primary border-border-subtle hover:border-accent-primary/50 hover:bg-accent-primary/10'
              }`}
              onClick={() => setFilter('current')}
            >
              Currently Working On
            </button>
            <button 
              className={`px-4 py-2 text-body font-medium rounded-lg border transition-all duration-200 ${
                filter === 'completed' 
                  ? 'bg-accent-primary text-bg-primary border-accent-primary shadow-glow' 
                  : 'bg-transparent text-text-primary border-border-subtle hover:border-accent-primary/50 hover:bg-accent-primary/10'
              }`}
              onClick={() => setFilter('completed')}
            >
              Completed Work
            </button>
          </div>
          
          <div className="flex gap-2">
            <button 
              className={`px-4 py-2 text-body font-medium rounded-lg border transition-all duration-200 ${
                typeFilter === 'all' 
                  ? 'bg-accent-secondary text-bg-primary border-accent-secondary' 
                  : 'bg-transparent text-text-primary border-border-subtle hover:border-accent-secondary/50 hover:bg-accent-secondary/10'
              }`}
              onClick={() => setTypeFilter('all')}
            >
              All Types
            </button>
            <button 
              className={`px-4 py-2 text-body font-medium rounded-lg border transition-all duration-200 ${
                typeFilter === 'work' 
                  ? 'bg-accent-secondary text-bg-primary border-accent-secondary' 
                  : 'bg-transparent text-text-primary border-border-subtle hover:border-accent-secondary/50 hover:bg-accent-secondary/10'
              }`}
              onClick={() => setTypeFilter('work')}
            >
              Work Experience
            </button>
            <button 
              className={`px-4 py-2 text-body font-medium rounded-lg border transition-all duration-200 ${
                typeFilter === 'project' 
                  ? 'bg-accent-secondary text-bg-primary border-accent-secondary' 
                  : 'bg-transparent text-text-primary border-border-subtle hover:border-accent-secondary/50 hover:bg-accent-secondary/10'
              }`}
              onClick={() => setTypeFilter('project')}
            >
              Projects
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-bg-secondary border border-border-subtle rounded-lg shadow-card p-6">
            <div className="text-small text-text-muted">Total Items</div>
            <div className="text-subsection font-bold text-accent-primary">{sampleTimelineData.length}</div>
            <div className="text-small text-text-secondary">Work + Projects</div>
          </div>
          
          <div className="bg-bg-secondary border border-border-subtle rounded-lg shadow-card p-6">
            <div className="text-small text-text-muted">Current Projects</div>
            <div className="text-subsection font-bold text-accent-secondary">
              {sampleTimelineData.filter(item => item.status === 'current').length}
            </div>
            <div className="text-small text-text-secondary">Active developments</div>
          </div>
          
          <div className="bg-bg-secondary border border-border-subtle rounded-lg shadow-card p-6">
            <div className="text-small text-text-muted">Work Experience</div>
            <div className="text-subsection font-bold text-accent-hover">
              {sampleTimelineData.filter(item => item.type === 'work').length}
            </div>
            <div className="text-small text-text-secondary">Professional roles</div>
          </div>
          
          <div className="bg-bg-secondary border border-border-subtle rounded-lg shadow-card p-6">
            <div className="text-small text-text-muted">Projects</div>
            <div className="text-subsection font-bold text-green-400">
              {sampleTimelineData.filter(item => item.type === 'project').length}
            </div>
            <div className="text-small text-text-secondary">Personal & side projects</div>
          </div>
        </div>

        {/* Timeline Component */}
        <div className="bg-bg-secondary border border-border-subtle rounded-xl shadow-card p-8">
          <Timeline 
            items={filteredData}
            title={
              filter === 'current' ? 'Currently Working On' :
              filter === 'completed' ? 'Completed Work' :
              typeFilter === 'work' ? 'Work Experience' :
              typeFilter === 'project' ? 'Projects' :
              'Professional Journey'
            }
          />
        </div>

        {/* Usage Example */}
        <div className="mt-12 bg-bg-tertiary border border-border-subtle rounded-xl shadow-card p-8">
          <h2 className="text-subsection font-bold text-accent-primary mb-4">How to Use</h2>
          <p className="text-body text-text-secondary mb-6 leading-relaxed">
            This timeline component uses DaisyUI's timeline classes with your custom design system and can be easily integrated into your portfolio. 
            Simply import the Timeline component and pass your data:
          </p>
          
          <div className="bg-bg-primary border border-border-subtle rounded-lg p-4 font-mono text-small">
            <pre className="text-text-secondary"><span className="text-accent-primary">import</span> Timeline <span className="text-accent-primary">from</span> <span className="text-green-400">'./components/Timeline'</span>;</pre>
            <pre className="text-text-secondary"></pre>
            <pre className="text-text-secondary"><span className="text-accent-primary">const</span> timelineData = [</pre>
            <pre className="text-text-secondary">  {`{`}</pre>
            <pre className="text-text-secondary">    id: <span className="text-green-400">'1'</span>,</pre>
            <pre className="text-text-secondary">    title: <span className="text-green-400">'Project Name'</span>,</pre>
            <pre className="text-text-secondary">    period: <span className="text-green-400">'2024'</span>,</pre>
            <pre className="text-text-secondary">    status: <span className="text-green-400">'current'</span>,</pre>
            <pre className="text-text-secondary">    type: <span className="text-green-400">'project'</span></pre>
            <pre className="text-text-secondary">  {`}`}</pre>
            <pre className="text-text-secondary">];</pre>
            <pre className="text-text-secondary"></pre>
            <pre className="text-text-secondary">&lt;<span className="text-accent-primary">Timeline</span> items={`{timelineData}`} title=<span className="text-green-400">"My Work"</span> /&gt;</pre>
          </div>

          <div className="flex justify-end mt-6">
            <a 
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-accent-primary text-bg-primary text-body font-medium rounded-lg hover:bg-accent-hover transition-colors duration-200 shadow-glow hover:shadow-glow-hover"
            >
              Back to Portfolio
            </a>
          </div>
        </div>

      </div>
    </div>
  );
} 