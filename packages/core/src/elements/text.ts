import type { AllowedEvents, DefineElement, ExtractContainerProps } from '../types'
import { Text } from 'pixi.js'
import { patchProp, renderer, setObjectProperty, setSkipFirstValue } from '../renderer'

renderer.use({
  name: 'Text',
  createElement: props => new Text({
    text: props.text,
    style: props.style,
  }),
  patchProp(el: Text, key, prev, next) {
    switch (key) {
      case 'text':
        setSkipFirstValue(el, key, () => el.text = next)
        break
      case 'style':
        setSkipFirstValue(el, key, () => setObjectProperty(el, key, prev, next))
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
})

export type TextProps = ExtractContainerProps<Text>

export interface TextEvents extends AllowedEvents {
  render: [Text]
}

export type TextElement = DefineElement<TextProps, TextEvents>

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Text: TextElement
    PixiText: TextElement
  }
}
