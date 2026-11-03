import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Статические файлы для nginx на VPS Timeweb: Node.js на сервере не нужен.
  // Фото заранее пережаты, поэтому оптимизатор Next не требуется.
  output: "export",
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
