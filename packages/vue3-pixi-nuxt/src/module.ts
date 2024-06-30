import { addComponent, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import * as core from 'vue3-pixi'
import { isCustomElement } from 'vue3-pixi'

const components = [
  'Application',
  'PixiTransition',
  'PixiTransitionGroup',
  'PTransition',
  'PTransitionGroup',
  'External',
  'Loader',
]

export interface ModuleOptions {}

export default defineNuxtModule({
  meta: { name: 'vue3-pixi-nuxt' },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    for (const name of components) {
      addComponent({
        name,
        filePath: 'vue3-pixi',
        export: name,
      })
    }

    addComponent({
      name: 'Application',
      filePath: resolver.resolve('./runtime/Application.server.vue'),
      mode: 'server',
    })

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
  },
})
