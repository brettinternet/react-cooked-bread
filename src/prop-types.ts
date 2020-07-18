import PropTypes from 'prop-types'
import {
  TransitionStatus,
  UNMOUNTED,
  EXITED,
  ENTERING,
  ENTERED,
  EXITING,
} from 'react-transition-group/Transition'

import { Placement, ToastType } from './types'

export const childrenProps = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

const placements: Placement[] = [
  'bottom-left',
  'bottom-center',
  'bottom-right',
  'top-left',
  'top-center',
  'top-right',
]
export const placementsProps = PropTypes.oneOf(placements)

const toastTypes: ToastType[] = ['error', 'info', 'success', 'warning']
export const toastTypesProps = PropTypes.oneOf(toastTypes)

const transitionStatuses: TransitionStatus[] = [UNMOUNTED, EXITED, ENTERING, ENTERED, EXITING]
export const transitionStatusProps = PropTypes.oneOf(transitionStatuses)

export const stylerProps = PropTypes.oneOfType([PropTypes.object, PropTypes.func])

export const toastStylerProps = PropTypes.shape({
  rootOuter: stylerProps,
  rootInner: stylerProps,
  content: stylerProps,
  closeButton: stylerProps,
  iconWrapper: stylerProps,
  icon: stylerProps,
  countdown: stylerProps,
})
