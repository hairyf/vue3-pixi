import { addComponent, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import * as core from 'vue3-pixi'
import { isCustomElement } from 'vue3-pixi'
import { setupDevToolsUI } from './devtools'

export interface ModuleOptions {
  modules: string[]
  devtools: boolean
}

const resolver = createResolver(import.meta.url)

const components = [
  'Application',
  'PixiTransition',
  'PixiTransitionGroup',
  'PTransition',
  'PTransitionGroup',
  'External',
  'Loader',
]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'vue3-pixi-nuxt',
    configKey: 'vue3pixi',
  },
  async setup(options, nuxt) {
    for (const name of components) {
      addComponent({
        name,
        filePath: 'vue3-pixi',
        export: name,
        mode: 'client',
        _raw: true,
      })
      addComponent({
        name,
        filePath: name === 'Application'
          ? resolver.resolve('./runtime/ServerApplication.vue')
          : resolver.resolve('./runtime/ServerEmpty.vue'),
        mode: 'server',
      })
    }

    for (const name in core) {
      if (name.match(/^use/) || name.match(/^on[A-Z]{1}/)) {
        addImports({
          from: 'vue3-pixi',
          name,
        })
      }
    }

    nuxt.options.build.transpile.push(/vue3-pixi/)

    nuxt.options.vue.compilerOptions.isCustomElement = isCustomElement

    if (options.devtools)
      setupDevToolsUI(nuxt, resolver)
  },
})
