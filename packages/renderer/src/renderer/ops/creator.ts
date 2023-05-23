import { camelize, warn } from 'vue-demi'

import { Container } from 'pixi.js'
import { elements } from './elements'

export function createPixiElement(prefix: string, name: string, props: any) {
  let is
  if (name.startsWith(prefix)) {
    name = camelize(name)
    is = elements[name.slice(prefix.length)]
  }
  else {
    name = camelize(name)
    name = name.charAt(0).toUpperCase() + name.slice(1)
    is = elements[name]
  }
  if (!is) {
    warn(`Unknown element ${name}`)
    is = () => new Container()
  }
  return is(props ?? {})
}
