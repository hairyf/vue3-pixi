import type { Application } from 'pixi.js'
import type { InjectionKey, Ref } from 'vue-demi'

export const appInjectKey: InjectionKey<Application | Ref<Application>> = Symbol('pixi_application')
