import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disables ESLint during build
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ["tailwindcss"],
  experimental: {
    // Remove invalid css option and use correct serverExternalPackages location
  }
};

export default nextConfig;
