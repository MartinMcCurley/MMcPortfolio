import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for static export (required for GoDaddy deployment)
  output: 'export',
  
  // Disable server-based image optimization for static export
  images: {
    unoptimized: true,
    // Add image optimization settings for better performance
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Optional: Add trailing slash for better compatibility with static hosting
  trailingSlash: true,
  
  // Performance optimizations from optimization checklist
  poweredByHeader: false,
  compress: true,
  
  // Enhanced performance settings
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Build optimizations
  reactStrictMode: true,
  
  // ESLint configuration
  eslint: {
    // Only run ESLint on specific directories during build
    dirs: ['src'],
  },
  
  // TypeScript configuration
  typescript: {
    // Type checking is handled by IDE and CI/CD
    ignoreBuildErrors: false,
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        // Enable module concatenation
        concatenateModules: true,
        // Minimize bundle size
        usedExports: true,
        sideEffects: false,
      };
    }
    
    // Optimize bundle analysis
    if (process.env.ANALYZE === 'true') {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
        })
      );
    }
    
    return config;
  },
};

export default nextConfig;
