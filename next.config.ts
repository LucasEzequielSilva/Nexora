import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // La página /vsl-1 ya no existe: quien entre por un link viejo cae en la home.
      { source: "/vsl-1", destination: "/", permanent: true },
    ];
  },
  async rewrites() {
    return [
      { source: "/vsl-1/pitch-deck", destination: "/vsl-1/pitch-deck/index.html" },
    ];
  },
};

export default nextConfig;
