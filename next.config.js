/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/book-keeper",
  //output: "export",
  reactStrictMode: true,
  distDir: "dist",
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    unoptimized: true,
    domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
