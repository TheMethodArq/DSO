import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tmi-p-001.sitecorecontenthub.cloud',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.taylormorrison.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'my.matterport.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'homejab.vr-360-tour.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
