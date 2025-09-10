import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // Silence monorepo/workspace root warnings when a parent lockfile exists
  // e.g., when deploying under /var/www with another package-lock.json
  outputFileTracingRoot: path.join(__dirname, ".."),
  
};

export default nextConfig;

