/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com", "i.ibb.co"],
  },
  experimental: {
    serverComponentsExternalPackages: ["cloudinary", "graphql-request"],
  },
};

module.exports = nextConfig;
