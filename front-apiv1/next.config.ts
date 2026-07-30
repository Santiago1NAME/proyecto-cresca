import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});

export default nextConfig;
