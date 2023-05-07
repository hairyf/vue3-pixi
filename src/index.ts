import type { App, Plugin } from 'vue-demi'
import { Stage } from './components'

export * from './components'
export * from './renderer'

function install(app: App<any>) {
  app.component('Stage', Stage)
}

export { install }

export default { install } as Plugin
