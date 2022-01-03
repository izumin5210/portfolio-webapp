/* eslint-disable @typescript-eslint/no-var-requires */

const withLinaria = require("next-linaria");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = withLinaria(nextConfig);
