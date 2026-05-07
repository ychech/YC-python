import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
        pathname: "/api/ide/v1/text_to_image",
      },
    ],
  },
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
