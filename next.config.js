/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    swcPlugins: ["next-superjson-plugin", {}]
  },
  images: {
    domains: ["avatars.githubusercontent.com", "res.cloudinary.com"]
  }
}

module.exports = nextConfig
