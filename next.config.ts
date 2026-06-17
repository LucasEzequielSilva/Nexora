import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/vsl-1/pitch-deck", destination: "/vsl-1/pitch-deck/index.html" },
    ];
  },
};

export default nextConfig;
