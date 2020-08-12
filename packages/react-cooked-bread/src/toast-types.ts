import { ComponentType } from 'react'
import PropTypes from 'prop-types'
import { TransitionStatus } from 'react-transition-group/Transition'

import {
  PlacementOption,
  ToastTypeOption,
  StylerMap,
  GenericObject,
  StylesObj,
  Styles,
  childrenProps,
  toastTypesProps,
  transitionStatusProps,
  placementsProps,
  Styler,
  TransitionDuration,
  ActiveToast,
} from './types'
import {
  GlossyStyleKeys,
  ClassicStyleKeys,
  BootstrapStyleKeys,
  ZeitStyleKeys,
  HtmlyStyleKeys,
} from './toast-content'

interface ToasterValueProps extends GenericObject {
  content: React.ReactNode
  autoDismiss: boolean
  timeout: number
  type: ToastTypeOption
  placement: PlacementOption
  transitionDuration: TransitionDuration
  transitionState: TransitionStatus
  id: string
  title?: string
  subtitle?: string
  isContainerHovered: boolean
  index: number
  reverseColumn: boolean
  toasts: ActiveToast[]
}

interface ToastValueProps extends ToasterValueProps {
  isRunning: boolean
  isItemHovered: boolean
}

export type ToastRootStyler = Styler<ToastValueProps>
export type ToastContentStyler<K extends string> = StylerMap<K, ToastValueProps>

interface SharedToastProps {
  onDismiss: () => void
}

export interface ToastRootProps extends ToastValueProps, SharedToastProps {
  onMouseEnter: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (ev: React.MouseEvent<HTMLElement>) => void
  styles: Styles
}

export interface ToastContentProps extends ToastValueProps, SharedToastProps {
  styles?: StylesObj<string>
}

/**
 * @todo Can we infer styler type for style keys ("wrapper", "title", "text")
 * from the `toastContent` component passed into `ToastProvider`?
 */
type ToastContentStyles =
  | ToastContentStyler<GlossyStyleKeys>
  | ToastContentStyler<ClassicStyleKeys>
  | ToastContentStyler<BootstrapStyleKeys>
  | ToastContentStyler<ZeitStyleKeys>
  | ToastContentStyler<HtmlyStyleKeys>
export interface ToastComponentsProps {
  toastRoot: ComponentType<ToastRootProps>
  toastContent?: ComponentType<ToastContentProps>
  toastRootStyles?: ToastRootStyler
  toastContentStyles?: ToastContentStyles
}

export interface ToasterProps extends ToastComponentsProps, SharedToastProps, ToasterValueProps {
  pauseAllOnHover: boolean
  rootStyles: ToastComponentsProps['toastRootStyles'] | undefined
  contentStyles: ToastContentStyles | undefined
}

export const transitionDurationPropsType = PropTypes.oneOfType([PropTypes.number, PropTypes.object])

const sharedPropTypes = {
  children: childrenProps,
  type: toastTypesProps.isRequired,
  content: PropTypes.node.isRequired,
  timeout: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  placement: placementsProps.isRequired,
  transitionDuration: transitionDurationPropsType.isRequired,
  transitionState: transitionStatusProps.isRequired,
  onDismiss: PropTypes.func.isRequired,
}

export const toastRootPropTypes = {
  ...sharedPropTypes,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  styles: PropTypes.object,
}

export const toastContentPropTypes = {
  ...sharedPropTypes,
  styles: PropTypes.object.isRequired,
}
