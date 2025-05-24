import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom color palette from design system
      colors: {
        // Background colors
        'bg-primary': '#1A1A1A',
        'bg-secondary': '#202020', 
        'bg-tertiary': '#252525',
        
        // Text colors
        'text-primary': '#EEEEEE',
        'text-secondary': '#B3B3B3',
        'text-muted': '#808080',
        
        // Accent colors (futuristic)
        'accent-primary': '#3291FF',
        'accent-secondary': '#00D9FF',
        'accent-hover': '#5AA3FF',
        
        // Utility colors
        'border-subtle': '#333333',
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
      
      // Box shadows for subtle effects
      boxShadow: {
        'glow': '0 0 20px rgba(50, 145, 255, 0.1)',
        'glow-hover': '0 0 30px rgba(50, 145, 255, 0.2)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.3)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.4)',
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
          '0%, 100%': { boxShadow: '0 0 20px rgba(50, 145, 255, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(50, 145, 255, 0.2)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
