import type {
} from 'vue-demi'
import type { Filter } from 'pixi.js'
import type { AllowedFilterProps } from './props'

export interface FilterProps<T> { is: (props: any) => T }

export interface FilterEvents {
  render: [FilterInst]
}

export type FilterInst = Filter

type EventsProps = {
  [key in keyof FilterEvents as `on${Capitalize<key>}`]?: ((...args: FilterEvents[key]) => any) | undefined
}

export type FilterComponent = <T extends AllowedFilterProps>(
  props:
  & FilterProps<T>
  & Partial<T>
  & EventsProps
  ) => any
