/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'juross14.github.io',
            port: '',
            pathname: '/myprofile/**',
          },
          {
            protocol: 'https',
            hostname: 'cdn.myanimelist.net',
            port: '',
            pathname: '/images/anime/**',
          },
        ],
      },
};

export default nextConfig;
