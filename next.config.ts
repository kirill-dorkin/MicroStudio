import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const gaEnabled = !!process.env.NEXT_PUBLIC_GA_ID;

// Next.js injects inline bootstrap scripts, so script-src needs 'unsafe-inline'
// unless every page is rendered with a nonce.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}${gaEnabled ? " https://www.googletagmanager.com" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${gaEnabled ? " https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com" : ""}`,
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 2160],
  },
  compiler: {
    removeConsole: { exclude: ["error", "warn"] },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Pages of the previous version of the site.
      { source: "/full-version", destination: "/ru/contact", permanent: true },
      { source: "/demo/:slug*", destination: "/ru/work", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
