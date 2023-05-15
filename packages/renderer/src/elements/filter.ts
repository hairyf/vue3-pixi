import type { AllowedFilterProps } from './props'
import type {
  ComponentCustomProps,
} from 'vue-demi'

export interface FilterProps<T> { is: (props: any) => T }

interface Events {

}

type EventsProps = {
  [key in keyof Events as `on${Capitalize<key>}`]?: ((...args: Events[key]) => any) | undefined
}

export type FilterComponent = <T extends AllowedFilterProps>(
  props:
  & FilterProps<T>
  & Partial<T>
  & ComponentCustomProps
  & EventsProps
  & Record<string, any>
  ) => any
