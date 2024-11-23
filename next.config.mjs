import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/index.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_BASE_URL:
      process.env.BACKEND_BASE_URL || 'https://api.dev.hackquest.io',
    GRAPHQL_ENDPOINT:
      process.env.GRAPHQL_ENDPOINT || 'https://api.dev.hackquest.io/graphql',
    IDE_URL: process.env.IDE_URL || 'http://localhost:8080',
    RUNTIME_ENV: process.env.RUNTIME_ENV || 'dev',
  },

  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig)
