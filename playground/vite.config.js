import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { compilerOptions } from 'vue3-pixi/compiler'

export default defineConfig({
  plugins: [vue({ template: { compilerOptions } })],
})
