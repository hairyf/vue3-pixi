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

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Assets: typeof import('./components').Assets
    AssetsBundle: typeof import('./components').AssetsBundle
    AnimatedTransition: typeof import('./components').AnimatedTransition
    AnimatedTransitionGroup: typeof import('./components').AnimatedTransitionGroup
    External: typeof import('./components').External
  }
}
