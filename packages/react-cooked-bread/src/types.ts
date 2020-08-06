import { ReactNode, CSSProperties } from 'react'
import PropTypes from 'prop-types'
import {
  TransitionProps,
  TransitionStatus,
  UNMOUNTED,
  EXITED,
  ENTERING,
  ENTERED,
  EXITING,
} from 'react-transition-group/Transition'

export type TransitionDuration = Exclude<TransitionProps['timeout'], undefined>

export { TransitionStatus }

export type Id = string

export enum ToastType {
  ERROR = 'error',
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
}
export type ToastTypeOption = ToastType | 'error' | 'info' | 'success' | 'warning'

/**
 * Allow custom props if users don't wish to
 * shadow/override or extend
 */
export type GenericObject = Record<string, unknown>

export type AddToastOptions = {
  id?: Id
  type?: ToastTypeOption
  autoDismiss?: boolean
  timeout?: number
  transitionDuration?: TransitionDuration
  title?: string
  subtitle?: string
  onDismiss?: (id: Id | undefined) => void
} & GenericObject

export type UpdateToastOptions = {
  content?: ReactNode
} & AddToastOptions

export type ActiveToast = {
  id: Id
  content: ReactNode
  type: ToastTypeOption
  autoDismiss?: boolean
  timeout?: number
  transitionDuration?: TransitionDuration
  onDismiss?: (id: Id | undefined) => void
  title?: string
  subtitle?: string
} & GenericObject

export type Add = (content: ReactNode, options?: AddToastOptions) => Id
export type Update = (id: Id, options: UpdateToastOptions) => void
export type Remove = (id: Id) => void
export type RemoveAll = () => void

export enum Placement {
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_CENTER = 'bottom-center',
  BOTTOM_RIGHT = 'bottom-right',
  TOP_LEFT = 'top-left',
  TOP_CENTER = 'top-center',
  TOP_RIGHT = 'top-right',
}
export type PlacementOption =
  | Placement
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'top-left'
  | 'top-center'
  | 'top-right'

export type Styles = CSSProperties | undefined | null

type PropsFn<P, T> = (props: P) => T
export type StylesObj<K extends string> = Partial<Record<K, Styles>>

export type Styler<P = undefined> = CSSProperties | PropsFn<P, CSSProperties> | null
export type StylerMap<K extends string, P = undefined> = StylesObj<K> | PropsFn<P, StylesObj<K>>

export type PropsWithRequiredChildren<P> = P & {
  children: ReactNode
}

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

const placements: PlacementOption[] = [
  Placement.BOTTOM_LEFT,
  Placement.BOTTOM_CENTER,
  Placement.BOTTOM_RIGHT,
  Placement.TOP_LEFT,
  Placement.TOP_CENTER,
  Placement.TOP_RIGHT,
]
export const placementsProps = PropTypes.oneOf(placements)

const toastTypes: ToastTypeOption[] = ['error', 'info', 'success', 'warning']
export const toastTypesProps = PropTypes.oneOf(toastTypes)

const transitionStatuses: TransitionStatus[] = [UNMOUNTED, EXITED, ENTERING, ENTERED, EXITING]
export const transitionStatusProps = PropTypes.oneOf(transitionStatuses)

export const stylerProps = PropTypes.oneOfType([PropTypes.object, PropTypes.func])
