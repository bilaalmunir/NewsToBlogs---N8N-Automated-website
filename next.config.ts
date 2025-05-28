/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.cnn.com',
        pathname: '/api/v1/images/**',
      },
    ],
  },
}

module.exports = nextConfig