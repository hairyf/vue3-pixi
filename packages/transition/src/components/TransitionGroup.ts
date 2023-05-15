import type { VNode } from 'vue-demi'
import {
  Fragment,
  createVNode,
  defineComponent,
  getCurrentInstance,
  getTransitionRawChildren,
  resolveTransitionHooks,
  setTransitionHooks,
  useTransitionState,
} from 'vue-demi'
import { resolveTransitionProps, transitionProps } from './Transition'

export const PTransitionGroup = defineComponent({
  name: 'PTransitionGroup',
  props: transitionProps,
  setup(props, { slots }) {
    const instance = getCurrentInstance()!
    const state = useTransitionState()
    const contexts = {} as Record<string, { id: 0; time: 0 }>

    let prevChildren: VNode[]
    let children: VNode[]

    function callTransitionHooks(child: VNode, key: string | null) {
      if (key == null)
        return
      contexts[key] ??= { id: 0, time: 0 }
      const rowProps = resolveTransitionProps(props, contexts[key])
      const transitionHooks = resolveTransitionHooks(child, rowProps, state, instance)
      setTransitionHooks(child, transitionHooks)
    }
    return () => {
      prevChildren = children
      children = slots.default ? getTransitionRawChildren(slots.default()) : []
      for (let i = 0; i < children.length; i++) {
        const child = children[i]
        callTransitionHooks(child, child.key as string)
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i]
          callTransitionHooks(child, child.key as string)
        }
      }
      return createVNode(Fragment, null, children)
    }
  },
})
