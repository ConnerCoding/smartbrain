import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
  envPrefix: ['VITE_', 'REACT_APP_'],
  define: {
    global: 'globalThis',
  },
  plugins: [react()],
});
