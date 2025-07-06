import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import { componentTagger } from 'lovable-tagger'

export default defineConfig(({ mode }) => ({
  server: {
    port: 8080,
    host: '0.0.0.0',               // allows access from any network IP
    strictPort: true,              // prevents fallback to 8081
    origin: undefined,             // disables host check
    allowedHosts: 'all',           // disables domain matching (important)
    cors: true                     // allows cross-origin access
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}))
