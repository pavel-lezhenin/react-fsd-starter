import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('http://localhost:3001/api'),
    'import.meta.env.VITE_PORT': JSON.stringify('3000'),
    'import.meta.env.VITE_PREVIEW_PORT': JSON.stringify('4173'),
    'import.meta.env.VITE_ENABLE_MSW': JSON.stringify('false'),
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['e2e/**/*', 'node_modules/**/*'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/index.ts',
        'src/main.tsx',
        'src/shared/mocks/**',
        'src/shared/ui/Dropdown/**',
        'src/shared/ui/ErrorBoundary/**',
        'src/shared/ui/PageLoader/**',
        'src/shared/ui/Table/**',
        'src/shared/ui/Tabs/**',
        'src/shared/ui/Tooltip/**',
        'src/shared/ui/Avatar/**',
      ],
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 65,
        statements: 75,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@app': resolve(__dirname, './src/app'),
      '@pages': resolve(__dirname, './src/pages'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@features': resolve(__dirname, './src/features'),
      '@entities': resolve(__dirname, './src/entities'),
      '@shared': resolve(__dirname, './src/shared'),
    },
  },
});