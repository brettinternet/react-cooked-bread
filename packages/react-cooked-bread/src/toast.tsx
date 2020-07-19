/** @jsx jsx */
import React, { useEffect, useRef, useState } from 'react'
import { TransitionStatus } from 'react-transition-group/Transition'
import { jsx, keyframes } from '@emotion/core'
import PropTypes from 'prop-types'

import { CheckIcon, FlameIcon, InfoIcon, CloseIcon, AlertIcon } from './icons'
import { Placement, ToastType, Styler, GenericObject } from './types'
import { getStylerCSS, toastClassNames } from './utils'
import {
  childrenProps,
  toastTypesProps,
  toastStylerProps,
  transitionStatusProps,
  placementsProps,
} from './prop-types'

export const gutter = 8
const borderRadius = 4
const toastWidth = 360
const shrinkKeyframes = keyframes`from { height: 100%; } to { height: 0% }`

const types = {
  success: {
    icon: CheckIcon,
    text: '#006644',
    fg: '#36B37E',
    bg: '#E3FCEF',
  },
  error: {
    icon: FlameIcon,
    text: '#BF2600',
    fg: '#FF5630',
    bg: '#FFEBE6',
  },
  warning: {
    icon: AlertIcon,
    text: '#FF8B00',
    fg: '#FFAB00',
    bg: '#FFFAE6',
  },
  info: {
    icon: InfoIcon,
    text: '#505F79',
    fg: '#2684FF',
    bg: 'white',
  },
}

interface ButtonProps {
  onClick: () => void
}

type ButtonStyler = {
  styler: Styler | undefined
}

const Button: React.FC<ButtonProps & ButtonStyler> = ({ children, onClick, styler }) => (
  <button
    className={toastClassNames.closeButtonClassName}
    css={{
      cursor: 'pointer',
      flexShrink: 0,
      opacity: 0.5,
      padding: `${gutter}px ${gutter * 1.5}px`,
      transition: 'opacity 150ms',
      ':hover': { opacity: 1 },
      ...getStylerCSS(styler, undefined),
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

type ContentProps = {
  styler: Styler | undefined
}

const Content: React.FC<ContentProps> = ({ children, styler }) => (
  <div
    className={toastClassNames.contentClassName}
    css={{
      flexGrow: 1,
      fontSize: 14,
      lineHeight: 1.4,
      minHeight: 40,
      padding: `${gutter}px ${gutter * 1.5}px`,
      ...getStylerCSS(styler, undefined),
    }}
  >
    {children}
  </div>
)

interface CountdownProps {
  opacity: number
  isRunning: boolean
  autoDismissTimeout: number
}

type CountdownStyler = {
  styler: Styler<CountdownProps> | undefined
}

/**
 * @note invoke animation when NOT `autoDismiss` with opacity of 0
 * to avoid a paint bug in FireFox. https://bugzilla.mozilla.org/show_bug.cgi?id=625289
 */
const Countdown: React.FC<CountdownProps & CountdownStyler> = ({
  autoDismissTimeout,
  opacity,
  isRunning,
  styler,
}) => (
  <div
    className={toastClassNames.countdownClassName}
    css={{
      animation: `${shrinkKeyframes} ${autoDismissTimeout}ms linear`,
      animationPlayState: isRunning ? 'running' : 'paused',
      backgroundColor: 'rgba(0,0,0,0.1)',
      bottom: 0,
      height: 0,
      left: 0,
      opacity,
      position: 'absolute',
      width: '100%',
      ...getStylerCSS(styler, { autoDismissTimeout, opacity, isRunning }),
    }}
  />
)

interface IconProps {
  type: ToastType
  autoDismiss: boolean
  autoDismissTimeout: number
  isRunning: boolean
}

type IconStylers = {
  wrapperStyler: Styler<IconProps> | undefined
  iconStyler: Styler<IconProps> | undefined
  countdownStyler: Styler<CountdownProps> | undefined
}

const Icon: React.FC<IconProps & IconStylers> = ({
  type,
  autoDismiss,
  autoDismissTimeout,
  isRunning,
  wrapperStyler,
  iconStyler,
  countdownStyler,
}) => {
  const meta = types[type]
  const Glyph = meta.icon

  return (
    <div
      className={toastClassNames.iconWrapperClassName}
      css={{
        backgroundColor: meta.fg,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        color: meta.bg,
        flexShrink: 0,
        paddingBottom: gutter,
        paddingTop: gutter,
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        width: 30,
        ...getStylerCSS(wrapperStyler, { type, autoDismiss, autoDismissTimeout, isRunning }),
      }}
    >
      <Countdown
        opacity={autoDismiss ? 1 : 0}
        autoDismissTimeout={autoDismissTimeout}
        isRunning={isRunning}
        styler={countdownStyler}
      />
      <Glyph
        className={toastClassNames.iconClassName}
        css={{
          position: 'relative',
          zIndex: 1,
          ...getStylerCSS(iconStyler, { type, autoDismiss, autoDismissTimeout, isRunning }),
        }}
      />
    </div>
  )
}

const getTranslate = (placement: Placement): string | undefined => {
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

const toastStates = (placement: Placement): Record<TransitionStatus, React.CSSProperties> => ({
  entering: { transform: getTranslate(placement), transitionProperty: 'none' },
  entered: { transform: 'translate3d(0,0,0)' },
  exiting: { transform: 'scale(0.66)', opacity: 0 },
  exited: { transform: 'scale(0.66)', opacity: 0 },
  unmounted: {},
})

interface RootValueProps {
  type: ToastType
  placement: Placement
  transitionDuration: number
  transitionState: TransitionStatus
}

type RootStylers = {
  outerStyler: Styler<RootValueProps> | undefined
  innerStyler: Styler<RootValueProps> | undefined
}

interface RootProps extends RootValueProps, RootStylers {
  onMouseEnter: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (ev: React.MouseEvent<HTMLElement>) => void
}

const Root: React.FC<RootProps> = ({
  type,
  placement,
  transitionDuration,
  transitionState,
  onMouseEnter,
  onMouseLeave,
  outerStyler,
  innerStyler,
}) => {
  const [height, setHeight] = useState('auto')
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && transitionState === 'entered') {
      setHeight(`${wrapperRef.current.offsetHeight + gutter}px`)
    } else if (transitionState === 'exiting') {
      setHeight('0px')
    }
  }, [transitionState])

  return (
    <div
      ref={wrapperRef}
      className={`${toastClassNames.rootOuterClassName} ${toastClassNames.rootOuterClassName}--${type}`}
      style={{ height }}
      css={{
        transition: `height ${transitionDuration - 100}ms 100ms`,
        ...getStylerCSS(outerStyler, { type, placement, transitionDuration, transitionState }),
      }}
    >
      <div
        className={`${toastClassNames.rootInnerClassName} ${toastClassNames.rootInnerClassName}--${type}`}
        css={{
          backgroundColor: types[type].bg,
          borderRadius,
          boxShadow: '0 3px 8px rgba(0, 0, 0, 0.175)',
          color: types[type].text,
          display: 'flex',
          marginBottom: gutter,
          transition: `transform ${transitionDuration}ms cubic-bezier(0.2, 0, 0, 1), opacity ${transitionDuration}ms`,
          width: toastWidth,
          ...toastStates(placement)[transitionState],
          ...getStylerCSS(innerStyler, { type, placement, transitionDuration, transitionState }),
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      />
    </div>
  )
}

export type ToastStyler = {
  rootOuter?: Styler<RootValueProps> | undefined
  rootInner?: Styler<RootValueProps> | undefined
  content?: Styler | undefined
  closeButton?: Styler | undefined
  iconWrapper?: Styler<IconProps> | undefined
  icon?: Styler<IconProps> | undefined
  countdown?: Styler<CountdownProps> | undefined
}

export interface ToastProps extends GenericObject {
  type?: ToastType
  content: React.ReactNode
  autoDismiss: boolean
  autoDismissTimeout: number
  isRunning: boolean
  placement: Placement
  transitionDuration: number
  transitionState: TransitionStatus
  onDismiss: () => void
  onMouseEnter: (ev: React.MouseEvent<HTMLElement>) => void
  onMouseLeave: (ev: React.MouseEvent<HTMLElement>) => void
  styler: ToastStyler | undefined
}

export const Toast: React.FC<ToastProps> = ({
  children,
  type = 'info',
  autoDismiss,
  autoDismissTimeout,
  isRunning,
  onDismiss,
  placement,
  transitionDuration,
  transitionState,
  onMouseEnter,
  onMouseLeave,
  styler,
}) => {
  return (
    <Root
      type={type}
      placement={placement}
      transitionState={transitionState}
      transitionDuration={transitionDuration}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      outerStyler={styler?.rootOuter}
      innerStyler={styler?.rootInner}
    >
      <Icon
        type={type}
        autoDismiss={autoDismiss}
        autoDismissTimeout={autoDismissTimeout}
        isRunning={isRunning}
        wrapperStyler={styler?.iconWrapper}
        iconStyler={styler?.icon}
        countdownStyler={styler?.countdown}
      />
      <Content styler={styler?.content}>{children}</Content>
      {onDismiss && (
        <Button onClick={onDismiss} styler={styler?.closeButton}>
          <CloseIcon className="react-cooked-bread__toast__dismiss-icon" />
        </Button>
      )}
    </Root>
  )
}

Toast.propTypes = {
  children: childrenProps.isRequired,
  type: toastTypesProps,
  content: PropTypes.node.isRequired,
  autoDismissTimeout: PropTypes.number.isRequired,
  isRunning: PropTypes.bool.isRequired,
  placement: placementsProps.isRequired,
  transitionDuration: PropTypes.number.isRequired,
  transitionState: transitionStatusProps.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  styler: toastStylerProps,
}
