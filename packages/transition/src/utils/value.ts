import type { TransitionVars } from '../types'

export const pointKeys = [
  'pivot',
  'anchor',
  'position',
  'scale',
  'tileScale',
  'tilePosition',
  'skew',
  'tile',
]

export function setPropertyValue(instance: any, prop: string, value: any) {
  const name = pointKeys.find(key => prop.startsWith(key))
  if (!name) {
    instance[prop] = value
    return
  }
  switch (prop) {
    case name:
      if (typeof value === 'object')
        return setObjectProperty(instance, name, value)
      else
        return setPointProperty(instance, name, value)
    case `${name}X`:
      return setField(instance[name], 'x', value)
    case `${name}Y`:
      return setField(instance[name], 'y', value)
  }
}

export function setObjectProperty(instance: any, name: string, value: any) {
  for (const key in value)
    setField(instance[name], key, value[key])
}

export function setField(instance: any, key: string, value: any) {
  if (instance[key] !== undefined)
    Reflect.set(instance, key, value)
}

export function setPointProperty(instance: any, key: string, value: any) {
  instance[key].set(value, value)
}

export function setProps(instance: any, transitions: TransitionVars[]) {
  const optionsKeys = ['delay', 'duration', 'ease']
  for (const transition of transitions) {
    const fields = Object
      .keys(transition)
      .filter(i => !optionsKeys.includes(i))
    for (const key of fields)
      setPropertyValue(instance, key, transition[key])
  }
}

export function getValue(instance: any, prop: string) {
  const name = pointKeys.find(key => prop.startsWith(key))
  if (!name)
    return instance[prop]

  switch (prop) {
    case name:
      return instance[name].x || instance[name].y
    case `${name}X`:
      return instance[name].x
    case `${name}Y`:
      return instance[name].y
  }
}
