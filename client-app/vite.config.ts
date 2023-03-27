import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import svgrPlugin from 'vite-plugin-svgr';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    splitVendorChunkPlugin(),
  ],
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  server: {
    open: true,
    port: 3000,
  },
});
