import { defineConfig } from 'vitest/config'

const config = defineConfig({
  test: {
    environment: 'jsdom',
  },
})

export default config
