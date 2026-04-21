import type { NextConfig } from 'next'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const basePath = process.env.NEXT_PUBLIC_GH_PAGES_BASE_PATH ?? ''

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  outputFileTracingRoot: rootDir,
  devIndicators: false,
  turbopack: {
    root: rootDir,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

export default nextConfig
