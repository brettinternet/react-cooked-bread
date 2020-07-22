/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx, keyframes } from '@emotion/core'

import { colors } from '../styles'
import { ToastType, Styles } from '../types'
import { CheckIcon, FlameIcon, InfoIcon, CloseIcon, AlertIcon } from '../icons'
import { ToastContentProps, toastContentPropTypes } from '../toast.types'

import { gutter, borderRadius } from '../toast-root/default'

export const toastClassNames = {
  iconWrapperClassName: 'react-cooked-bread__toast__icon-wrapper',
  iconClassName: 'react-cooked-bread__toast__icon',
  countdownClassName: 'react-cooked-bread__toast__countdown',
  textClassName: 'react-cooked-bread__toast__text',
  closeButtonClassName: 'react-cooked-bread__toast__dismiss-button',
}

const shrinkKeyframes = keyframes`from { height: 100%; } to { height: 0% }`

const icons = {
  success: CheckIcon,
  error: FlameIcon,
  warning: AlertIcon,
  info: InfoIcon,
}

interface CloseButtonProps {
  onClick: () => void
  styles: Styles
}

const CloseButton: React.FC<CloseButtonProps> = ({ children, onClick, styles = {} }) => (
  <button
    className={toastClassNames.closeButtonClassName}
    css={{
      cursor: 'pointer',
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'flex-start',
      opacity: 0.5,
      padding: `${gutter}px ${gutter * 1.5}px`,
      transition: 'opacity 150ms',
      ':hover': { opacity: 1 },
      ...styles,
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

type TextProps = {
  styles: Styles
}

const Text: React.FC<TextProps> = ({ children, styles = {} }) => (
  <div
    className={toastClassNames.textClassName}
    css={{
      flexGrow: 1,
      fontSize: 14,
      lineHeight: 1.4,
      minHeight: 40,
      padding: `${gutter}px ${gutter * 1.5}px`,
      ...styles,
    }}
  >
    {children}
  </div>
)

interface CountdownProps {
  opacity: number
  isRunning: boolean
  autoDismissTimeout: number
  styles: Styles
}

/**
 * @note invoke animation when NOT `autoDismiss` with opacity of 0
 * to avoid a paint bug in FireFox. https://bugzilla.mozilla.org/show_bug.cgi?id=625289
 */
const Countdown: React.FC<CountdownProps> = ({
  autoDismissTimeout,
  opacity,
  isRunning,
  styles,
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
      ...styles,
    }}
  />
)

interface IconProps {
  type: ToastType
  autoDismiss: boolean
  autoDismissTimeout: number
  isRunning: boolean
  wrapperStyles: Styles
  iconStyles: Styles
  countdownStyles: Styles
}

const Icon: React.FC<IconProps> = ({
  type,
  autoDismiss,
  autoDismissTimeout,
  isRunning,
  wrapperStyles = {},
  iconStyles = {},
  countdownStyles,
}) => {
  const meta = colors[type]
  const Glyph = icons[type]

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
        ...wrapperStyles,
      }}
    >
      <Countdown
        opacity={autoDismiss ? 1 : 0}
        autoDismissTimeout={autoDismissTimeout}
        isRunning={isRunning}
        styles={countdownStyles}
      />
      <Glyph
        className={toastClassNames.iconClassName}
        css={{
          position: 'relative',
          zIndex: 1,
          ...iconStyles,
        }}
      />
    </div>
  )
}

export const DefaultToastContent: React.FC<ToastContentProps> = ({
  type,
  autoDismiss,
  autoDismissTimeout,
  isRunning,
  styles,
  onDismiss,
  children,
}) => (
  <Fragment>
    <Icon
      type={type}
      autoDismiss={autoDismiss}
      autoDismissTimeout={autoDismissTimeout}
      isRunning={isRunning}
      wrapperStyles={styles?.iconWrapper}
      iconStyles={styles?.icon}
      countdownStyles={styles?.countdown}
    />
    <Text styles={styles?.content}>{children}</Text>
    {onDismiss && (
      <div css={{ marginTop: gutter / 2, marginRight: gutter / 2, ...styles?.closeButtonWrapper }}>
        <CloseButton onClick={onDismiss} styles={styles?.closeButton}>
          <CloseIcon className="react-cooked-bread__toast__dismiss-icon" />
        </CloseButton>
      </div>
    )}
  </Fragment>
)

DefaultToastContent.propTypes = toastContentPropTypes
