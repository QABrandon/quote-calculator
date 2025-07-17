/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yourdomain.com', 'webflow.com'],
  },
  env: {
    WEBFLOW_CLIENT_ID: process.env.WEBFLOW_CLIENT_ID,
    WEBFLOW_CLIENT_SECRET: process.env.WEBFLOW_CLIENT_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  // Configuration for Netlify deployment
  output: 'standalone',
  trailingSlash: true,
}

module.exports = nextConfig 