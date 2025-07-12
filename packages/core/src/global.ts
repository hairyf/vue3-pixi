import '@vue/runtime-core'
import 'pixi.js'

declare module 'pixi.js' {
  interface Filter {
    parent: Container
    _vp_name: string
    _vp_filter: boolean
  }
  interface Container {
    _vp_name: string
  }
}
