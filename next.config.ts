import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_SERVER_URL: process.env.NEXT_SERVER_URL,
  },
  images: {
    domains: ['files.edgestore.dev'],
  }
};

export default nextConfig;
