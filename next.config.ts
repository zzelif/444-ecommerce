// next.config.ts
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Your existing config...
  experimental: {
    // existing experimental features
  },
  
  // Add this webpack configuration
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()]
    }
    return config
  },
}

export default nextConfig