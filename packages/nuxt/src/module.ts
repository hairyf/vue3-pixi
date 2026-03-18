import { addComponent, addImports, createResolver, defineNuxtModule } from '@nuxt/kit'
import * as core from 'vue3-pixi'
import { compilerOptions } from 'vue3-pixi'

const components = [
  'Application',
  'AnimatedTransition',
  'AnimatedTransitionGroup',
  'Assets',
]

const clientOnlyComponents = [
  'External',
]

export interface ModuleOptions {}

export default defineNuxtModule({
  meta: { name: 'vue3-pixi-nuxt' },
  async setup(_options, nuxt) {
    const resolver = createResolver(import.meta.url)
    for (const name of components) {
      addComponent({
        name,
        filePath: 'vue3-pixi',
        export: name,
      })
    }

    for (const name of clientOnlyComponents) {
      addComponent({
        name,
        filePath: 'vue3-pixi',
        export: name,
        mode: 'client',
      })
    }

    addComponent({
      name: 'Application',
      filePath: resolver.resolve('./runtime/Application.server.vue'),
      mode: 'server',
    })

    for (const name in core) {
      if (name.match(/^use/) || name.match(/^on[A-Z]/)) {
        addImports({
          from: 'vue3-pixi',
          name,
        })
      }
    }

    nuxt.options.build.transpile.push(/vue3-pixi/)
    nuxt.options.vue.compilerOptions.isCustomElement = compilerOptions.isCustomElement
  },
})
