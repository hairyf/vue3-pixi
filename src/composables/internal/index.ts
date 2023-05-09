import type { Application } from 'pixi.js'

import type { InjectionKey, Ref } from 'vue-demi'

export const applicationInjectionKey: InjectionKey<Ref<Application>> = Symbol('pixi_application')
