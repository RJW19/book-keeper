/** @type {import('next').NextConfig} */
const nextConfig = {
<<<<<<< HEAD
  basePath: "/book-keeper",
  //output: "export",
  reactStrictMode: true,
=======
>>>>>>> parent of 8452341 (pushing prod build v1)
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
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
