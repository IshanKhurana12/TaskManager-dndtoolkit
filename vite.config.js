import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@dnd-kit/react'],
    },
  },
  optimizeDeps: {
    include: ['@dnd-kit/react'], // Add @dnd-kit/react here for optimization
  },
});
