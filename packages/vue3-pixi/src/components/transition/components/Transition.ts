import type { ExtractPropTypes, PropType } from 'vue-demi'
import { BaseTransition, defineComponent, h } from 'vue-demi'

import type { Fn, Hook, TransitionTicker } from '../types'

import { callAnimationHook, callInstanceSetterterHook } from './utils'

export const transitionProps = {
  duration: [Number, Object] as PropType<number | { enter: number;leave: number }>,
  beforeEnter: [Function, Object, Array] as PropType<Hook<(el: any) => void>>,
  enter: [Function, Object, Array] as PropType< Hook<(el: any, done: Fn) => TransitionTicker | void>>,
  afterEnter: [Function, Object, Array] as PropType<Hook<(el: any) => void>>,
  enterCancelled: [Function, Object, Array] as PropType< Hook<(el: any) => void>>,
  beforeLeave: [Function, Object, Array] as PropType< Hook<(el: any) => void>>,
  leave: [Function, Object, Array] as PropType< Hook<(el: any, done: Fn) => TransitionTicker | void>>,
  afterLeave: [Function, Object, Array] as PropType< Hook<(el: any) => void>>,
  onBeforeEnter: Function as PropType<(el: any) => void>,
  onEnter: Function as PropType<(el: any, done: Fn) => void>,
  onAfterEnter: Function as PropType<(el: any) => void>,
  onEnterCancelled: Function as PropType<(el: any) => void>,
  onBeforeLeave: Function as PropType<(el: any) => void>,
  onLeave: Function as PropType<(el: any, done: Fn) => void>,
  onAfterLeave: Function as PropType<(el: any) => void>,
  appear: Boolean,
}

export type TransitionProps = ExtractPropTypes<typeof transitionProps>

export const PTransition = defineComponent({
  name: 'PTransition',
  props: transitionProps,
  setup(props, { slots }) {
    const rowProps = resolveTransitionProps(props, { id: 0, time: 0 })
    return () => h(BaseTransition, rowProps, slots)
  },
})

export function resolveTransitionProps(props: TransitionProps, context?: any) {
  function onBeforeEnter(el: any) {
    callInstanceSetterterHook(el, props, 'beforeEnter')
  }
  function onEnter(el: any, done: Fn) {
    callAnimationHook(el, props, 'enter', done, context)
  }
  function onAfterEnter(el: any) {
    callInstanceSetterterHook(el, props, 'afterEnter')
  }
  function onEnterCancelled(el: any) {
    callInstanceSetterterHook(el, props, 'afterEnter')
  }
  function onBeforeLeave(el: any) {
    callInstanceSetterterHook(el, props, 'beforeLeave')
  }
  async function onLeave(el: any, done: Fn) {
    callAnimationHook(el, props, 'leave', done, context)
  }
  function onAfterLeave(el: any) {
    callInstanceSetterterHook(el, props, 'afterLeave')
  }
  return {
    css: false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    appear: props.appear,
  }
}
