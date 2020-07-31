/** @jsx jsx */
import React from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import { jsx } from '@emotion/core'

import { colors } from '../styles'
import { PlacementOption } from '../types'
import { ToastRootProps, toastRootPropTypes } from '../toast-types'

export const gutter = 8
export const borderRadius = 4
export const toastWidth = 360

const rootClassName = 'react-cooked-bread__toast__root'

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

const toastStates = (
  placement: PlacementOption
): Record<TransitionStatus, React.CSSProperties> => ({
  entering: { transform: getTranslate(placement), transitionProperty: 'none' },
  entered: { transform: 'translate3d(0,0,0)' },
  exiting: { transform: 'scale(0.80)', opacity: 0 },
  exited: { transform: 'scale(0.80)', opacity: 0 },
  unmounted: {},
})

export const DefaultToastRoot: React.FC<ToastRootProps> = ({
  children,
  type,
  placement,
  transitionDuration,
  transitionState,
  autoDismiss,
  onMouseEnter,
  onMouseLeave,
  styles,
}) => {
  return (
    <div
      className={`${rootClassName} ${rootClassName}--${type}`}
      role={autoDismiss ? 'alert' : 'alertdialog'}
      css={{
        overflow: 'hidden',
        backgroundColor: colors[type].bg,
        borderRadius,
        boxShadow: '0 3px 8px rgba(0, 0, 0, 0.175)',
        color: colors[type].text,
        display: 'flex',
        marginBottom: gutter,
        transition: `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${transitionDuration}ms`,
        width: toastWidth,
        opactiy: 1,
        transform: 'scale(1)',
        ...toastStates(placement)[transitionState],
        ...styles,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}

DefaultToastRoot.propTypes = toastRootPropTypes
