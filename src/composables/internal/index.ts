import type { Application } from 'pixi.js'
import type { InjectionKey, Ref } from 'vue-demi'

export const applicationInjectionKey: InjectionKey<Ref<Application & { [k: string]: any }>> = Symbol('pixi_application')
