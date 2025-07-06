import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",                 // allows external access
    port: 8080,
    strictPort: true,                // prevents fallback to 8081/5173
    origin: undefined,               // ensure it accepts external origin
    allowedHosts: 'all',             // ⬅️ key: allow all dynamic ngrok domains
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
