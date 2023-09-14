import {
  Button,
  CheckBox,
  FancyButton,
  Input,
  List,
  MaskedFrame,
  ProgressBar,
  RadioGroup,
  ScrollBox,
  Select,
  Slider,
  Switcher,
} from '@pixi/ui'
import type { Renderer, RendererOptions } from 'vue3-pixi'
import { setSkipFirstValue as ssfValue } from 'vue3-pixi'
import { patchProp } from './patchProp'

const SwitcherRenderer: RendererOptions = {
  name: 'Switcher',
  createElement: props => new Switcher(props.views || []),
  patchProp(el: Switcher, key, prev, next) {
    switch (key) {
      case 'views':
        ssfValue(el, key, () => el[key] = next)
        break
      default:
        patchProp(el, key, prev, next)
    }
  },
}

const ButtonRenderer: RendererOptions = {
  name: 'Button',
  createElement: () => new Button(),
  patchProp,
}

const CheckBoxRenderer: RendererOptions = {
  name: 'CheckBox',
  createElement: props => new CheckBox(props.options),
  patchProp,
}

const FancyButtonRenderer: RendererOptions = {
  name: 'FancyButton',
  createElement: props => new FancyButton(props.options),
  patchProp,
}

const InputRenderer: RendererOptions = {
  name: 'Input',
  createElement: props => new Input(props.options),
  patchProp,
}

const ListRenderer: RendererOptions = {
  name: 'List',
  createElement: props => new List(props.options),
}

const MaskedFrameRenderer: RendererOptions = {
  name: 'MaskedFrame',
  createElement: props => new MaskedFrame(props.options),
}

const ProgressBarRenderer: RendererOptions = {
  name: 'ProgressBar',
  createElement: props => new ProgressBar(props.options),
}

const RadioGroupRenderer: RendererOptions = {
  name: 'RadioGroup',
  createElement: props => new RadioGroup(props.options),
  patchProp,
}

const ScrollBoxRenderer: RendererOptions = {
  name: 'ScrollBox',
  createElement: props => new ScrollBox(props.options),
}

const SelectRenderer: RendererOptions = {
  name: 'Select',
  createElement: props => new Select(props.options),
  patchProp,
}

const SliderRenderer: RendererOptions = {
  name: 'Slider',
  createElement: props => new Slider(props.options),
  patchProp,
}

export const PixiUiRenderer: Renderer = [
  SwitcherRenderer,
  ButtonRenderer,
  CheckBoxRenderer,
  FancyButtonRenderer,
  InputRenderer,
  ListRenderer,
  MaskedFrameRenderer,
  ProgressBarRenderer,
  RadioGroupRenderer,
  ScrollBoxRenderer,
  SelectRenderer,
  SliderRenderer,
]
