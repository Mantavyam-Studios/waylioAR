import { withCMS } from "@repo/cms/next-config";
import { config, withAnalyzer } from "@repo/next-config";
import { withLogging, withSentry } from "@repo/observability/next-config";
import type { NextConfig } from "next";
import { env } from "@/env";

let nextConfig: NextConfig = withLogging(config);

// Configure webpack to prevent import-in-the-middle from being externalized
nextConfig.webpack = (config, { isServer }) => {
  if (isServer) {
    config.externals = config.externals || [];
    
    // If externals is an array, filter out import-in-the-middle
    if (Array.isArray(config.externals)) {
      config.externals = config.externals.filter((external: any) => {
        if (typeof external === 'string') {
          return external !== 'import-in-the-middle';
        }
        if (typeof external === 'object' && external !== null) {
          delete external['import-in-the-middle'];
        }
        return true;
      });
    }
  }
  return config;
};

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
      // Disable origin check for development
      bodySizeLimit: "2mb",
    },
  };
} else {
  nextConfig.experimental = {
    ...nextConfig.experimental,
  };
}

nextConfig.images?.remotePatterns?.push({
  protocol: "https",
  hostname: "assets.basehub.com",
});

if (process.env.NODE_ENV === "production") {
  const redirects: NextConfig["redirects"] = async () => [
    {
      source: "/legal",
      destination: "/legal/privacy",
      statusCode: 301,
    },
  ];

  nextConfig.redirects = redirects;
}

// Add headers for development to handle forwarded domains
if (process.env.NODE_ENV === "development") {
  nextConfig.headers = async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: "*"
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          key: "Access-Control-Allow-Headers",
          value: "Content-Type, Authorization, X-Requested-With"
        }
      ]
    }
  ];
}

if (env.VERCEL) {
  nextConfig = withSentry(nextConfig);
}

if (env.ANALYZE === "true") {
  nextConfig = withAnalyzer(nextConfig);
}

export default withCMS(nextConfig);
