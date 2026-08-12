/** @type {import('next').NextConfig} */
const nextConfig = {
  // API base URL for server-side fetches
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  // Redirect old Brihat paths that might be cached
  async redirects() {
    return [
      { source: '/about', destination: '/company/about', permanent: true },
      { source: '/services', destination: '/solutions', permanent: true },
      { source: '/blog', destination: '/insights', permanent: true },
      { source: '/jobs', destination: '/careers', permanent: true },
    ];
  },
};

export default nextConfig;
