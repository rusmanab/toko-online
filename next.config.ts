import type { NextConfig } from "next";

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow semua domain sementara
      },
    ],
  },
};

export default nextConfig;