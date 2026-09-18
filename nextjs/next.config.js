/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [{
      source: '/api/:path*',
      destination: `${process.env.API_URL || 'http://127.0.0.1:4000'}/api/:path*`,
    }];
  },
};
