import type { App, Plugin } from 'vue-demi'
import { State } from './components'

export * from './components'
export * from './renderer'

function install(app: App<any>) {
  app.component('State', State)
}

export { install }

export default { install } as Plugin
