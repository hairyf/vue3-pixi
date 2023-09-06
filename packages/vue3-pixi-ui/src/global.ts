import type { SwitcherComponent } from './elements/switcher'
import type { ButtonComponent } from './elements/button'
import type { CheckBoxComponent } from './elements/checkBox'
import type { FancyButtonComponent } from './elements/fancyButton'
import type { InputComponent } from './elements/input'
import type { ListComponent } from './elements/list'
import type { MaskedFrameComponent } from './elements/maskedFrame'
import type { ProgressBarComponent } from './elements/progressBar'
import type { RadioGroupComponent } from './elements/radioGroup'
import type { ScrollBoxComponent } from './elements/scrollBox'
import type { SelectComponent } from './elements/select'
import type { SliderComponent } from './elements/slider'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Switcher: SwitcherComponent
    PixiSwitcher: SwitcherComponent

    Button: ButtonComponent
    PixiButton: ButtonComponent

    CheckBox: CheckBoxComponent
    PixiCheckBox: CheckBoxComponent

    FancyButton: FancyButtonComponent
    PixiFancyButton: FancyButtonComponent

    Input: InputComponent
    PixiInput: InputComponent

    List: ListComponent
    PixiList: ListComponent

    MaskedFrame: MaskedFrameComponent
    PixiMaskedFrame: MaskedFrameComponent

    ProgressBar: ProgressBarComponent
    PixiProgressBar: ProgressBarComponent

    RadioGroup: RadioGroupComponent
    PixiRadioGroup: RadioGroupComponent

    ScrollBox: ScrollBoxComponent
    PixiScrollBox: ScrollBoxComponent

    Select: SelectComponent
    PixiSelect: SelectComponent

    Slider: SliderComponent
    PixiSlider: SliderComponent

  }
}

export type {
  SwitcherComponent,
  ButtonComponent,
  CheckBoxComponent,
  FancyButtonComponent,
  InputComponent,
  ListComponent,
  MaskedFrameComponent,
  ProgressBarComponent,
  RadioGroupComponent,
  ScrollBoxComponent,
  SliderComponent,
}
