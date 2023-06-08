import { defineConfig, presetIcons, presetUno } from 'unocss'

const config = defineConfig({
  presets: [presetUno(), presetIcons()],
})

export default config

