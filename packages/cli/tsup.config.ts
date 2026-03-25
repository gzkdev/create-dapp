import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  bundle: true,
  minify: false,
  splitting: false,
  shims: true,
});
