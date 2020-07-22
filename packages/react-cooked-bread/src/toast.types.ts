import { ComponentType } from 'react'
import PropTypes from 'prop-types'
import { TransitionStatus } from 'react-transition-group/Transition'

import {
  Placement,
  ToastType,
  StylerMap,
  GenericObject,
  StylesObj,
  Styles,
  childrenProps,
  toastTypesProps,
  transitionStatusProps,
  placementsProps,
} from './types'

interface ToasterValueProps extends GenericObject {
  content: React.ReactNode
  autoDismiss: boolean
  autoDismissTimeout: number
  placement: Placement
  transitionDuration: number
  transitionState: TransitionStatus
}

interface ToastValueProps extends ToasterValueProps {
  isRunning: boolean
  type: ToastType
}

type ToastContentStylerMapKeys =
  | 'content'
  | 'closeButtonWrapper'
  | 'closeButton'
  | 'iconWrapper'
  | 'icon'
  | 'countdown'
type ToastRootStylerMapKeys = ToastContentStylerMapKeys | 'root'

export type ToastStyler = StylerMap<ToastRootStylerMapKeys, ToastValueProps>

interface SharedToastProps {
  onDismiss: () => void
}

export interface ToastRootProps extends ToastValueProps, SharedToastProps {
  onMouseEnter: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (ev: React.MouseEvent<HTMLElement>) => void
  styles: Styles
}

export interface ToastContentProps extends ToastValueProps, SharedToastProps {
  styles: StylesObj<ToastContentStylerMapKeys>
}

export interface ToastComponentsProps {
  toastRoot: ComponentType<ToastRootProps>
  toastContent?: ComponentType<ToastContentProps>
}

export interface ToasterProps extends ToastComponentsProps, SharedToastProps, ToasterValueProps {
  type: ToastType | undefined
  styler: ToastStyler | undefined
  onMouseEnter?: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave?: (ev: React.MouseEvent<HTMLElement>) => void
}

const sharedPropTypes = {
  children: childrenProps,
  type: toastTypesProps.isRequired,
  content: PropTypes.node.isRequired,
  autoDismissTimeout: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  placement: placementsProps.isRequired,
  transitionDuration: PropTypes.number.isRequired,
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
  styles: PropTypes.shape({
    content: PropTypes.object,
    closeButtonWrapper: PropTypes.object,
    closeButton: PropTypes.object,
    iconWrapper: PropTypes.object,
    icon: PropTypes.object,
    countdown: PropTypes.object,
  }).isRequired,
}
