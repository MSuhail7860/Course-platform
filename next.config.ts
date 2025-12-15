import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // serverExternalPackages is usually not needed for Prisma in recent versions, 
  // but keeping it is fine if it solves a specific error for you.
  serverExternalPackages: ["@prisma/client", "prisma"],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.geeksforgeeks.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "utfs.io", // <--- ADD THIS (Standard for UploadThing)
      }
    ]
  }
};

export default nextConfig;
