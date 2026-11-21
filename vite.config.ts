import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nitro } from "nitro/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.get("hero") === "alpha") {
          return new URLSearchParams({
            format: "avif;webp;png",
            w: "1920",
            quality: "75",
            as: "picture",
          });
        }
        if (url.searchParams.has("hero")) {
          return new URLSearchParams({
            format: "avif;webp;jpg",
            w: "1920",
            quality: "75",
            as: "picture",
          });
        }
        return new URLSearchParams({ format: "webp", quality: "80" });
      },
    }),

    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitro({ preset: "vercel" }),
    react(),

    ViteImageOptimizer({
      logStats: true,
      ansiColors: true,
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { quality: 80 },
      avif: { quality: 70 },
      // exclude removed — let it run on everything; imagetools output is already small
    }),
  ],   // ← THIS was missing

  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
      "three",
      "@react-three/fiber",
    ],
  },

  assetsInclude: [
    "**/*.glb",
    "**/*.gltf",
    "**/*.bin",
    "**/*.ktx2",
    "**/*.hdr",
    "**/*.exr",
  ],

  build: {
    target: "es2022",
    assetsInlineLimit: 4096,
  },

  server: {
    host: "::",
    port: 8080,
    watch: { ignored: ["**/.output/**", "**/node_modules/**"] },
  },
});