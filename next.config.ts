import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["pdf-parse"],
      },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
};

export default nextConfig;
