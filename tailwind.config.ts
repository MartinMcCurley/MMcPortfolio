import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette from design system (Black/Gray/Orange)
      colors: {
        // Background colors (Black & Gray Foundation)
        'bg-primary': '#0d0d0d',      // Jet Black - Background / Base layer
        'bg-secondary': '#1a1a1a',    // Charcoal Gray - Main hex surfaces
        'bg-tertiary': '#2e2e2e',     // Slate Gray - Edge shadows / variation
        'bg-quaternary': '#3f3f3f',   // Steel Gray - Layer separation / contrast
        
        // Text colors
        'text-primary': '#ffffff',    // Pure white for main text
        'text-secondary': '#e0e0e0',  // Light gray for secondary text
        'text-muted': '#a0a0a0',      // Medium gray for captions/metadata
        
        // Accent colors (Orange Highlights)
        'accent-primary': '#ff5c00',  // Neon Orange - Highlight edges / accents
        'accent-secondary': '#ff7300', // Lighter orange for secondary highlights
        'accent-hover': '#ff8533',    // Even lighter orange for hover states
        
        // Utility colors
        'border-subtle': '#2e2e2e',   // Slate Gray for subtle borders
        'border-accent': '#ff5c00',   // Orange for highlighted borders
      },
      
      // Typography system from design system
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      fontSize: {
        // Desktop sizes
        'hero': ['3.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'section': ['2.5rem', { lineHeight: '1.2' }],
        'subsection': ['1.75rem', { lineHeight: '1.2' }],
        'body': ['1.125rem', { lineHeight: '1.5' }],
        'small': ['0.875rem', { lineHeight: '1.5' }],
        
        // Mobile responsive sizes
        'hero-mobile': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.025em' }],
        'section-mobile': ['2rem', { lineHeight: '1.2' }],
        'subsection-mobile': ['1.5rem', { lineHeight: '1.2' }],
        'body-mobile': ['1rem', { lineHeight: '1.5' }],
      },
      
      fontWeight: {
        'thin': '300',
        'normal': '400', 
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      
      // Box shadows for subtle effects (Orange glow)
      boxShadow: {
        'glow': '0 0 20px rgba(255, 92, 0, 0.1)',
        'glow-hover': '0 0 30px rgba(255, 92, 0, 0.2)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.7)',
      },
      
      // Animations for micro-interactions
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 92, 0, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 92, 0, 0.2)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
