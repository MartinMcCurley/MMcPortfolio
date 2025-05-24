import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Enhanced color palette from design system (Black/Gray/Orange)
      colors: {
        // Background colors (Black & Gray Foundation) - From color-palette.md
        'bg-primary': '#0d0d0d',      // Jet Black - Background / Base layer
        'bg-secondary': '#1a1a1a',    // Charcoal Gray - Main hex surfaces
        'bg-tertiary': '#2e2e2e',     // Slate Gray - Edge shadows / variation
        'bg-quaternary': '#3f3f3f',   // Steel Gray - Layer separation / contrast
        
        // Text colors - High contrast for accessibility
        'text-primary': '#ffffff',    // Pure white for main text on dark backgrounds
        'text-secondary': '#e0e0e0',  // Light gray for secondary text
        'text-muted': '#a0a0a0',      // Medium gray for captions/metadata
        
        // Accent colors (Orange Highlights) - Strategic use for maximum impact
        'accent-primary': '#ff5c00',  // Neon Orange - Highlight edges / accents
        'accent-secondary': '#ff7300', // Lighter orange for secondary highlights
        'accent-hover': '#ff8533',    // Even lighter orange for hover states
        
        // Utility colors
        'border-subtle': '#2e2e2e',   // Slate Gray for subtle borders
        'border-accent': '#ff5c00',   // Orange for highlighted borders
      },
      
      // Typography system from typography-system.md
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      
      fontSize: {
        // Desktop sizes - From typography-system.md
        'hero': ['3.5rem', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.025em',
          fontWeight: '700' 
        }],
        'section': ['2.5rem', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.025em',
          fontWeight: '600' 
        }],
        'subsection': ['1.75rem', { 
          lineHeight: '1.2',
          fontWeight: '500' 
        }],
        'body': ['1.125rem', { 
          lineHeight: '1.75',
          fontWeight: '400' 
        }],
        'small': ['0.875rem', { 
          lineHeight: '1.5',
          fontWeight: '400' 
        }],
        
        // Mobile responsive sizes
        'hero-mobile': ['2.5rem', { 
          lineHeight: '1.2', 
          letterSpacing: '-0.025em',
          fontWeight: '700' 
        }],
        'section-mobile': ['2rem', { 
          lineHeight: '1.2',
          fontWeight: '600' 
        }],
        'subsection-mobile': ['1.5rem', { 
          lineHeight: '1.2',
          fontWeight: '500' 
        }],
        'body-mobile': ['1rem', { 
          lineHeight: '1.75',
          fontWeight: '400' 
        }],
      },
      
      fontWeight: {
        'thin': '300',
        'normal': '400', 
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      },
      
      // Enhanced spacing system for consistent layout
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },
      
      // Box shadows for layered depth and orange glow effects
      boxShadow: {
        'glow': '0 0 20px rgba(255, 92, 0, 0.1)',
        'glow-hover': '0 0 30px rgba(255, 92, 0, 0.2)',
        'glow-strong': '0 0 40px rgba(255, 92, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.7)',
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.3)',
        'focus': '0 0 0 4px rgba(255, 92, 0, 0.2)',
      },
      
      // Enhanced animations for micro-interactions
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out 0.2s forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 92, 0, 0.1)' },
          '50%': { boxShadow: '0 0 30px rgba(255, 92, 0, 0.2)' },
        },
        bounceSubtle: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-5px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      
      // Enhanced border radius for modern feel
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      // Backdrop blur utilities for glass morphism effects
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      
      // Custom gradients for subtle backgrounds
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-subtle': 'linear-gradient(135deg, rgba(255, 92, 0, 0.05) 0%, rgba(255, 92, 0, 0.02) 100%)',
        'gradient-card': 'linear-gradient(145deg, rgba(26, 26, 26, 0.8) 0%, rgba(46, 46, 46, 0.4) 100%)',
      },
      
      // Enhanced transitions for smooth interactions
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1200': '1200ms',
      },
      
      // Custom container sizes for better content flow
      containers: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
        '3xl': '1600px',
      },
      
      // Letter spacing utilities from typography system
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0em',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
      },
      
      // Line height utilities for better typography control
      lineHeight: {
        'tight': '1.2',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2',
      },
    },
  },
  plugins: [require("daisyui")],
  
  // DaisyUI configuration
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#ff5c00",      // Your orange accent color
          "secondary": "#ff7300",    // Lighter orange
          "accent": "#ff8533",       // Orange hover color
          "neutral": "#1a1a1a",      // Your secondary background
          "base-100": "#0d0d0d",     // Your primary background
          "base-200": "#1a1a1a",     // Your secondary background
          "base-300": "#2e2e2e",     // Your tertiary background
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
} satisfies Config;
