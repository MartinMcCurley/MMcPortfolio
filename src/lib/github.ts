export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
  pushed_at: string;
}

export interface ProjectData {
  name: string;
  description: string;
  repoUrl: string;
  demoUrl: string | null;
  language: string;
  topics: string[];
  stars: number;
  lastUpdated: string;
}

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubRepos(): Promise<ProjectData[]> {
  const username = process.env.GITHUB_USERNAME || 'MartinMcCurley';
  const token = process.env.GITHUB_TOKEN;
  
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'MMcPortfolio'
  };
  
  if (token && token !== 'your_github_personal_access_token_here') {
    headers['Authorization'] = `token ${token}`;
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=10&type=public`,
      { headers }
    );

    if (!response.ok) {
      console.warn(`GitHub API request failed: ${response.status} ${response.statusText}`);
      return getFallbackProjects();
    }

    const repos: GitHubRepo[] = await response.json();
    
    // Filter out forked repos and the portfolio repo itself, and get the most interesting ones
    const filteredRepos = repos
      .filter(repo => 
        !repo.name.includes('fork') && 
        repo.name !== 'MMcPortfolio' &&
        repo.description && 
        repo.description.trim().length > 0
      )
      .slice(0, 6); // Take top 6 projects

    return filteredRepos.map(mapRepoToProjectData);
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return getFallbackProjects();
  }
}

function mapRepoToProjectData(repo: GitHubRepo): ProjectData {
  return {
    name: formatRepoName(repo.name),
    description: repo.description || 'A GitHub project showcasing development skills.',
    repoUrl: repo.html_url,
    demoUrl: repo.homepage || null,
    language: repo.language || 'JavaScript',
    topics: repo.topics.slice(0, 3), // Limit to 3 topics for UI
    stars: repo.stargazers_count,
    lastUpdated: repo.updated_at
  };
}

function formatRepoName(name: string): string {
  // Convert kebab-case or snake_case to Title Case
  return name
    .replace(/[-_]/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Fallback projects in case GitHub API fails
function getFallbackProjects(): ProjectData[] {
  return [
    {
      name: 'Web Application Project',
      description: 'A modern web application built with React and TypeScript, featuring responsive design and clean architecture.',
      repoUrl: `https://github.com/MartinMcCurley/web-app-project`,
      demoUrl: null,
      language: 'TypeScript',
      topics: ['react', 'typescript', 'web'],
      stars: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'API Service',
      description: 'RESTful API service with Node.js and Express, including authentication and database integration.',
      repoUrl: `https://github.com/MartinMcCurley/api-service`,
      demoUrl: null,
      language: 'JavaScript',
      topics: ['nodejs', 'express', 'api'],
      stars: 0,
      lastUpdated: new Date().toISOString()
    },
    {
      name: 'Data Visualization Tool',
      description: 'Interactive data visualization dashboard using D3.js and modern web technologies.',
      repoUrl: `https://github.com/MartinMcCurley/data-viz`,
      demoUrl: null,
      language: 'JavaScript',
      topics: ['d3js', 'visualization', 'dashboard'],
      stars: 0,
      lastUpdated: new Date().toISOString()
    }
  ];
} 