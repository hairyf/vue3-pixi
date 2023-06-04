import FloatingVue from 'floating-vue'
import { renderer } from 'vue3-pixi'
import { Text } from 'pixi.js'

import 'floating-vue/dist/style.css'
import 'uno.css'
import './style.css'

class YellowText extends Text {
  constructor(text, style) {
    super(text, style)
    this.style.fill = 'yellow'
  }
}

const elements = {
  YellowText: props => new YellowText(props.text, props.style),
}

renderer.use({ elements })

FloatingVue.options.distance = 28
FloatingVue.options.themes.tooltip.delay.show = 100
