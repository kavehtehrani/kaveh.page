import type { NextConfig } from "next";

/**
 * Baseline security headers. None of these affect rendering; they close off
 * MIME sniffing, framing, and referrer leakage.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      // Referenced from a published post but never a real route.
      {
        source: "/digital_nomad",
        destination: "/blog/digital-nomadness",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
