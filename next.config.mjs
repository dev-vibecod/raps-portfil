/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Local preview assets live in /public — no remote loader needed.
    unoptimized: true,
  },
};

export default nextConfig;
