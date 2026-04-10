import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "ominous-space-acorn-jx4q5vpjvpp3pgvj-3000.app.github.dev",
        "localhost:3000",
      ],
    },
  },
  // Configuração para信頼 Trusted Domains no NextAuth
  // Isso ajuda a evitar erros de host em ambientes proxy
  // images: {
  //   remotePatterns: [],
  // },
};

export default nextConfig;