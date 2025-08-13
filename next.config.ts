import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "alt.tailus.io",
      },
      {
        protocol: "https",
        hostname: "tailus.io",
      },
      {
        protocol: "https",
        hostname: "html.tailus.io",
      },
    ],
  },
  experimental: {
    modularizeImports: {
      "lucide-react": {
        transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
      },
    },
  },
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
