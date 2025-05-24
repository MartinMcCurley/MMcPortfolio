import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure for static export (required for GoDaddy deployment)
  output: 'export',
  
  // Disable server-based image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Optional: Add trailing slash for better compatibility with static hosting
  trailingSlash: true,
};

export default nextConfig;
