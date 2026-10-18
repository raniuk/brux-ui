import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/server.ts', 'src/styles.css'],
  format: ['esm', 'cjs'],
  splitting: false,
  dts: {
    entry: ['src/index.ts', 'src/server.ts'],
  },
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    }
  },
})
