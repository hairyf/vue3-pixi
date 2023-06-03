import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Vue from '@vitejs/plugin-vue'
import { compilerOptions, transformAssetUrls } from '../packages/renderer/src'

export default defineConfig({
  plugins: [
    Vue({
      template: {
        compilerOptions,
        transformAssetUrls,
      },
    }),
    Inspect(),
  ],
})
