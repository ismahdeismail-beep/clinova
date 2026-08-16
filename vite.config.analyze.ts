import { defineConfig } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { buildConfig } from './vite.config'

const base = buildConfig()

export default defineConfig({
  ...base,
  plugins: [
    ...(base.plugins ?? []),
    visualizer({
      open: false,
      gzipSize: true,
      brotliSize: true,
      filename: 'dist/bundle-stats.html',
    }),
  ],
})
