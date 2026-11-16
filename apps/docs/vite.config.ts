import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const r = (p: string) => fileURLToPath(new URL(p, import.meta.url));

/** Regenerates public/r/*.json (the CLI registry) on every production build, so a deploy can never ship a stale registry. */
const buildRegistry = (): Plugin => ({
  name: "nullfuse-build-registry",
  apply: "build",
  buildStart() {
    execFileSync(process.execPath, [r("../../scripts/build-registry.mjs")], { stdio: "inherit" });
  },
});

// The docs site dogfoods the registry source directly.
export default defineConfig({
  plugins: [buildRegistry(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@/components/ui": r("../../registry/ui"),
      "@/lib": r("../../registry/lib"),
      "@nullfuse/core/motion": r("../../packages/core/src/motion.ts"),
    },
    dedupe: ["react", "react-dom", "motion"],
  },
  server: { fs: { allow: [r("../..")] } },
});