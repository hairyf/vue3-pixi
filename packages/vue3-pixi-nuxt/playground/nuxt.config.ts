export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@vueuse/nuxt',
    '@nuxt/devtools',
  ],
  vue3pixi: {
    devtools: true,
  },
})
