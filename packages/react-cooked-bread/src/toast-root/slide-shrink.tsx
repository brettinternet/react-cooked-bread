/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/react'

import { PlacementOption, ToastType, TransitionStatus } from '../types'
import { ToastRootProps, toastRootPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { getTransitionDuration, isDev } from '../utils'

const rootClassName = `${classNamePrefix}__toast__root`

const getTransition = (t: number) =>
  `transform ${t}ms cubic-bezier(0.2, 0, 0, 1), opacity ${t}ms, max-height ${t}ms ease-out`

const getTranslate = (placement: PlacementOption): string | undefined => {
  const pos = placement.split('-')
  const position = pos[1] === 'center' ? pos[0] : pos[1]
  const translateMap: Record<string, string> = {
    right: 'translate3d(120%, 0, 0)',
    left: 'translate3d(-120%, 0, 0)',
    bottom: 'translate3d(0, 120%, 0)',
    top: 'translate3d(0, -120%, 0)',
  }
  return translateMap[position]
}

type ToastStates = Record<TransitionStatus, React.CSSProperties>

const geToastStates = (placement: PlacementOption): ToastStates => ({
  entering: { transform: getTranslate(placement), opacity: 0 },
  entered: { transform: 'translate3d(0,0,0)', opacity: 1, maxHeight: 800 },
  exiting: { transform: 'scale(0.80)', opacity: 0, maxHeight: 0 },
  exited: { transform: 'scale(0.80)', opacity: 0 },
  unmounted: {},
})

export const SlideShrinkToastRoot: React.FC<ToastRootProps> = ({
  children,
  type,
  placement,
  transitionDuration,
  transitionState,
  onMouseEnter,
  onMouseLeave,
  styles,
}) => (
  <div
    className={`${rootClassName} ${rootClassName}--${type}`}
    {...(type === ToastType.ERROR
      ? {
          role: 'alert',
          'aria-live': 'assertive',
        }
      : {
          role: 'status',
          'aria-live': 'polite',
        })}
    aria-atomic="true"
    css={{
      transform: 'scale(1)',
      transition: getTransition(getTransitionDuration(transitionDuration, transitionState)),
      ...geToastStates(placement)[transitionState],
      ...styles,
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
)

if (isDev) {
  SlideShrinkToastRoot.propTypes = toastRootPropTypes
}
