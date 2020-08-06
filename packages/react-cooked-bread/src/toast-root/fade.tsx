/** @jsx jsx */
import React from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import { jsx } from '@emotion/core'

import { ToastType } from '../types'
import { ToastRootProps, toastRootPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { getTransitionDuration } from '../utils'

const rootClassName = `${classNamePrefix}__toast__root`

const getTransition = (t: number) => `opacity ${t}ms, max-height ${t}ms ease-out`

const toastStates: Record<TransitionStatus, React.CSSProperties> = {
  entering: { opacity: 0 },
  entered: { opacity: 1, maxHeight: 800 },
  exiting: { opacity: 0, maxHeight: 0 },
  exited: { opacity: 0 },
  unmounted: {},
}

export const FadeToastRoot: React.FC<ToastRootProps> = ({
  children,
  type,
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
      overflow: 'hidden',
      transition: getTransition(getTransitionDuration(transitionDuration, transitionState)),
      ...toastStates[transitionState],
      ...styles,
    }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    {children}
  </div>
)

FadeToastRoot.propTypes = toastRootPropTypes
