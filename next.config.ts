import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  async redirects() {
    return [
      {
        // The template's "full version" waitlist page no longer exists.
        source: "/full-version",
        destination: "/#contact",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
