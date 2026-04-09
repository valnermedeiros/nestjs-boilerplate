import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  plugins: [swc.vite()],
  test: {
    globals: true,
    environment: 'node',
    include: ['test/**/*.e2e-spec.ts'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    setupFiles: ['./vitest.setup.ts'],
    testTimeout: 30000
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@test': path.resolve(__dirname, 'test')
    }
  }
});
