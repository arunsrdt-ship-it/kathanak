import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Google Drive thumbnail CDN (used for cover images only)
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/d/**',
      },
      {
        // CloudFront CDN for Nexum background video / assets
        protocol: 'https',
        hostname: 'd8j0ntlcm91z4.cloudfront.net',
      },
      {
        // Pravatar avatar CDN for Nexum testimonial card
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
    ],
  },
  async rewrites() {
    return [
      {
        // Proxy /api/* to the backend so media streams work without CORS issues in production
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/:path*`,
      },
    ];
  },
};

export default nextConfig;
