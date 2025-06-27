import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/limn.ts',
      name: 'Limn',
      fileName: (format) => `limn.${format}.js`
    },
    rollupOptions: {
      external: ['signia'],
      output: {
        globals: {
          signia: 'Signia'
        }
      }
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      bundledPackages: ['signia'], // Bundle signia types if needed
    })
  ]
})