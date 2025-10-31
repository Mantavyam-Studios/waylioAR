import { withToolbar } from "@repo/feature-flags/lib/toolbar";
import { config, withAnalyzer } from "@repo/next-config";
import { withLogging, withSentry } from "@repo/observability/next-config";
import type { NextConfig } from "next";
import { env } from "@/env";

let nextConfig: NextConfig = withToolbar(withLogging(config));

// Allow forwarded domains for development (e.g., VS Code port forwarding)
if (process.env.NODE_ENV === "development") {
  nextConfig.experimental = {
    ...nextConfig.experimental,
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "localhost:3001",
        "5sckrv0q-3000.inc1.devtunnels.ms",
        "3001.inc1.devtunnel.ms",
      ],
      bodySizeLimit: "2mb",
    },
  };

  // Add CORS headers for development
  nextConfig.headers = async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS",
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, Authorization, X-Requested-With",
        },
      ],
    },
  ];
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === "true") {
  nextConfig = withAnalyzer(nextConfig);
}

export default nextConfig;
