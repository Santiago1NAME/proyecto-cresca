import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
});

export default nextConfig;
