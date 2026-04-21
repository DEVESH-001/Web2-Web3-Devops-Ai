import { dirname } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // TODO: Remove this when Next.js 16 is stable
  turbopack: {
    root: dirname(__filename),
  },
};

export default nextConfig;
