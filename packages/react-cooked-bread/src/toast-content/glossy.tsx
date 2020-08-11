/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx, keyframes } from '@emotion/core'

import { ToastTypeOption, Styles, StylesObj } from '../types'
import { CheckIcon, FlameIcon, InfoIcon, CloseIcon, AlertIcon } from './icons'
import { ToastContentProps, toastContentPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { isDev } from '../utils'

const borderRadius = 4
const toastWidth = 360
const typeColors = {
  success: {
    text: '#006644',
    accent: '#36B37E',
    bg: '#E3FCEF',
  },
  error: {
    text: '#BF2600',
    accent: '#FF5630',
    bg: '#FFEBE6',
  },
  warning: {
    text: '#FF8B00',
    accent: '#FFAB00',
    bg: '#FFFAE6',
  },
  info: {
    text: '#505F79',
    accent: '#2684FF',
    bg: 'white',
  },
}

const classNames = {
  wrapper: `${classNamePrefix}__toast__wrapper`,
  iconWrapper: `${classNamePrefix}__toast__icon-wrapper`,
  icon: `${classNamePrefix}__toast__icon`,
  progress: `${classNamePrefix}__toast__progress`,
  title: `${classNamePrefix}__toast__title`,
  subtitle: `${classNamePrefix}__toast__subtitle`,
  text: `${classNamePrefix}__toast__text`,
  closeButtonWrapper: `${classNamePrefix}__toast__close-button-wrapper`,
  closeButton: `${classNamePrefix}__toast__close-button`,
  closeButtonIcon: `${classNamePrefix}__toast__close-button-icon`,
}

const shrinkKeyframes = keyframes`from { height: 100%; } to { height: 0% }`

const icons = {
  success: CheckIcon,
  error: FlameIcon,
  warning: AlertIcon,
  info: InfoIcon,
}

interface WrapperProps {
  type: ToastTypeOption
}

const Wrapper: React.FC<WrapperProps> = ({ children, type }) => (
  <div
    className={classNames.wrapper}
    css={{
      borderRadius,
      width: toastWidth,
      display: 'flex',
      backgroundColor: typeColors[type].bg,
      color: typeColors[type].text,
      boxShadow: '0 3px 8px rgba(0, 0, 0, 0.175)',
      marginBottom: '0.5rem',
    }}
  >
    {children}
  </div>
)

interface CloseButtonProps {
  onClick: () => void
  styles: Styles
}

const CloseButton: React.FC<CloseButtonProps> = ({ children, onClick, styles }) => (
  <button
    className={classNames.closeButton}
    aria-label="close"
    css={{
      cursor: 'pointer',
      color: 'black',
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'flex-start',
      opacity: 0.5,
      padding: '0.5rem',
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

const Text: React.FC<TextProps> = ({ children, styles }) => (
  <div
    className={classNames.text}
    css={{
      flexGrow: 1,
      fontSize: 14,
      lineHeight: 1.4,
      minHeight: 40,
      padding: '0.5rem 0.75rem',
      ...styles,
    }}
  >
    {children}
  </div>
)

interface ProgressProps {
  opacity: number
  isRunning: boolean
  timeout: number
  styles: Styles
}

/**
 * @note invoke animation when NOT `autoDismiss` with opacity of 0
 * to avoid a paint bug in FireFox. https://bugzilla.mozilla.org/show_bug.cgi?id=625289
 */
const Progress: React.FC<ProgressProps> = ({ timeout, opacity, isRunning, styles }) => (
  <div
    className={classNames.progress}
    css={{
      animation: `${shrinkKeyframes} ${timeout}ms linear`,
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
  type: ToastTypeOption
  wrapperStyles: Styles
  iconStyles: Styles
}

const Icon: React.FC<IconProps> = ({ children, type, wrapperStyles, iconStyles }) => {
  const Glyph = icons[type]
  return (
    <div
      className={classNames.iconWrapper}
      css={{
        backgroundColor: typeColors[type].accent,
        borderTopLeftRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        color: typeColors[type].bg,
        flexShrink: 0,
        paddingBottom: '0.5rem',
        paddingTop: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        width: 30,
        ...wrapperStyles,
      }}
    >
      {children}
      <Glyph
        className={classNames.icon}
        css={{
          position: 'relative',
          zIndex: 1,
          ...iconStyles,
        }}
      />
    </div>
  )
}

export type GlossyStyleKeys = keyof typeof classNames
export interface GlossyToastContentProps extends ToastContentProps {
  styles?: StylesObj<GlossyStyleKeys>
}

export const GlossyToastContent: React.FC<GlossyToastContentProps> = ({
  type,
  autoDismiss,
  timeout,
  isRunning,
  styles,
  title,
  subtitle,
  onDismiss,
  children,
}) => (
  <Wrapper type={type}>
    <Icon type={type} wrapperStyles={styles?.iconWrapper} iconStyles={styles?.icon}>
      <Progress
        key={timeout}
        opacity={autoDismiss ? 1 : 0}
        timeout={timeout}
        isRunning={isRunning}
        styles={styles?.progress}
      />
    </Icon>
    <Text styles={styles?.text}>
      {title && (
        <Fragment>
          <strong className={classNames.title} css={{ ...styles?.title }}>
            {title}
          </strong>{' '}
        </Fragment>
      )}
      {subtitle && (
        <Fragment>
          <span className={classNames.subtitle} css={{ ...styles?.subtitle }}>
            ({subtitle})
          </span>{' '}
        </Fragment>
      )}
      {children}
    </Text>
    {onDismiss && (
      <div css={{ marginTop: '0.25rem', marginRight: '0.25rem', ...styles?.closeButtonWrapper }}>
        <CloseButton onClick={onDismiss} styles={styles?.closeButton}>
          <CloseIcon className={classNames.closeButtonIcon} css={{ ...styles?.closeButtonIcon }} />
        </CloseButton>
      </div>
    )}
  </Wrapper>
)

if (isDev) {
  GlossyToastContent.propTypes = toastContentPropTypes
}
