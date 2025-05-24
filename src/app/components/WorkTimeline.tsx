'use client';

import React from 'react';

interface WorkItem {
  id: string;
  title: string;
  company?: string;
  period: string;
  description: string;
  technologies: string[];
  status: 'current' | 'completed';
  url?: string;
  type: 'work' | 'project';
}

interface WorkTimelineProps {
  currentWork: WorkItem[];
  completedWork: WorkItem[];
}

const WorkTimeline: React.FC<WorkTimelineProps> = ({ currentWork, completedWork }) => {
  const renderTimelineItem = (item: WorkItem, index: number, isLast: boolean) => {
    const isEven = index % 2 === 0;
    const timelinePosition = isEven ? 'timeline-start' : 'timeline-end';
    
    return (
      <li key={item.id}>
        {index > 0 && <hr className="bg-bg-tertiary" />}
        
        <div className={`${timelinePosition} timeline-box bg-bg-secondary border border-border-subtle shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-bg-tertiary hover:border-accent-primary/30`}>
          <div className="space-y-3">
            {/* Header with time and title */}
            <div className="space-y-1">
              <time className="font-mono italic text-small text-accent-primary opacity-70">
                {item.period}
              </time>
              <div className="text-subsection font-medium text-text-primary">
                {item.title}
              </div>
              {item.company && (
                <div className="text-small text-accent-primary font-medium">
                  {item.company}
                </div>
              )}
            </div>

            {/* Status and type badges */}
            <div className="flex items-center gap-2">
              <div className={`px-2 py-1 text-xs rounded-full font-medium ${
                item.status === 'current' 
                  ? 'bg-accent-primary/20 text-accent-primary border border-accent-primary/30' 
                  : 'bg-green-400/20 text-green-400 border border-green-400/30'
              }`}>
                {item.status === 'current' ? 'Current' : 'Completed'}
              </div>
              <div className={`px-2 py-1 text-xs rounded-full font-medium border ${
                item.type === 'work' 
                  ? 'bg-accent-secondary/20 text-accent-secondary border-accent-secondary/30' 
                  : 'bg-accent-hover/20 text-accent-hover border-accent-hover/30'
              }`}>
                {item.type === 'work' ? 'Work' : 'Project'}
              </div>
            </div>
            
            {/* Description */}
            <p className="text-text-secondary leading-relaxed text-body">
              {item.description}
            </p>
            
            {/* Technologies */}
            {item.technologies && item.technologies.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-small font-medium text-text-muted">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {item.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-bg-tertiary text-text-secondary border border-border-subtle rounded hover:border-accent-primary/30 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Project link */}
            {item.url && (
              <div className="pt-2">
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1 text-small bg-accent-primary text-bg-primary rounded hover:bg-accent-hover transition-colors duration-200 font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  View
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="timeline-middle">
          {item.status === 'current' ? (
            <div className="w-5 h-5 bg-accent-primary rounded-full animate-pulse border-2 border-bg-primary shadow-glow"></div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5 text-green-400"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        
        {!isLast && <hr className="bg-bg-tertiary" />}
      </li>
    );
  };

  return (
    <div className="w-full space-y-16">
      
      {/* Currently Working On Section */}
      {currentWork.length > 0 && (
        <div>
          <h2 className="text-section font-semibold text-center mb-8 text-accent-primary">
            Currently Working On
          </h2>
          <ul className="timeline timeline-vertical w-full">
            {currentWork.map((item, index) => 
              renderTimelineItem(item, index, index === currentWork.length - 1)
            )}
          </ul>
        </div>
      )}

      {/* Completed Work Section */}
      {completedWork.length > 0 && (
        <div>
          <h2 className="text-section font-semibold text-center mb-8 text-green-400">
            Completed Work
          </h2>
          <ul className="timeline timeline-vertical w-full">
            {completedWork.map((item, index) => 
              renderTimelineItem(item, index, index === completedWork.length - 1)
            )}
          </ul>
        </div>
      )}

    </div>
  );
};

// Example data structure for easy copy-paste
export const exampleWorkData = {
  currentWork: [
    {
      id: '1',
      title: 'Portfolio Website Redesign',
      period: '2024 - Present',
      description: 'Complete redesign and rebuild of personal portfolio using Next.js 15 with modern UI/UX principles.',
      technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'DaisyUI'],
      status: 'current' as const,
      url: 'https://martinmccurley.com',
      type: 'project' as const,
    },
    {
      id: '2',
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2023 - Present',
      description: 'Leading development of scalable web applications and mentoring junior developers.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      status: 'current' as const,
      type: 'work' as const,
    },
  ],
  completedWork: [
    {
      id: '3',
      title: 'E-commerce Platform',
      period: '2023',
      description: 'Built a comprehensive e-commerce platform with advanced features.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      status: 'completed' as const,
      url: 'https://github.com/example/project',
      type: 'project' as const,
    },
  ],
};

export default WorkTimeline;