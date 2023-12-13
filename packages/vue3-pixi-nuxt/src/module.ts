import { addComponent, addImports, addVitePlugin, createResolver, defineNuxtModule, resolvePath } from '@nuxt/kit'
export interface ModuleOptions {
  modules: string[]
  devtools: boolean
  glsl: boolean
}
export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@tresjs/nuxt',
    configKey: 'tres',
  },
  defaults: {
    modules: [],
    devtools: true,
    glsl: false,
  },
  async setup(options, nuxt) {
    addComponent({
      name: 'Application',
      filePath: '@tresjs/core',
      export: 'TresCanvas',
      mode: 'client',
      _raw: true,
    })
  },
})
