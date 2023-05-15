/* eslint-disable import/export */
import { Stage } from './components'
import type { App, Plugin } from 'vue-demi'

export * from './global'
export * from './components'
export * from './renderer'
export * from './composables'

function install(app: App<any>) {
  app.component('Stage', Stage)
}

export { install }

export default { install } as Plugin
