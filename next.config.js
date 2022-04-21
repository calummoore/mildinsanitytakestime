/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['1productaweek.com', 's3.us-west-2.amazonaws.com'],
  },
  async redirects () {
    return [
      {
        source: '/docs',
        destination: '/docs/intro',
        permanent: false,
      },
    ]
  },
  // experimental: { esmExternals: true },
}

module.exports = nextConfig