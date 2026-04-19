import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Tells Nitro (the underlying server engine) to emit Vercel output.
      // You can also set NITRO_PRESET=vercel in the Vercel dashboard instead.
      server: {
        preset: "vercel",
      },
    }),
    react(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
