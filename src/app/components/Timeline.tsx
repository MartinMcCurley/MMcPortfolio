'use client';

import React from 'react';

interface TimelineItem {
  id: string;
  title: string;
  company?: string;
  period: string;
  description: string;
  technologies?: string[];
  status: 'current' | 'completed';
  url?: string;
  type: 'work' | 'project';
}

interface TimelineProps {
  items: TimelineItem[];
  title: string;
  showOnlyStatus?: 'current' | 'completed' | 'all';
}

const Timeline: React.FC<TimelineProps> = ({ items, title, showOnlyStatus = 'all' }) => {
  // Filter items based on status
  const filteredItems = items.filter(item => {
    if (showOnlyStatus === 'all') return true;
    return item.status === showOnlyStatus;
  });

  // Sort items by status (current first) and then by period
  const sortedItems = filteredItems.sort((a, b) => {
    if (a.status === 'current' && b.status === 'completed') return -1;
    if (a.status === 'completed' && b.status === 'current') return 1;
    return 0;
  });

  const getStatusIcon = (status: 'current' | 'completed') => {
    if (status === 'current') {
      return (
        <div className="w-5 h-5 bg-accent-primary rounded-full animate-pulse border-2 border-bg-primary shadow-glow"></div>
      );
    }
    return (
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
    );
  };

  const renderTimelineItem = (item: TimelineItem, index: number, isLast: boolean) => {
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
                  View Project
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="timeline-middle">
          {getStatusIcon(item.status)}
        </div>
        
        {!isLast && <hr className="bg-bg-tertiary" />}
      </li>
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-section font-bold text-center mb-8 text-accent-primary">
        {title}
      </h2>
      
      <ul className="timeline timeline-vertical w-full">
        {sortedItems.map((item, index) => 
          renderTimelineItem(item, index, index === sortedItems.length - 1)
        )}
      </ul>
    </div>
  );
};

export default Timeline; 