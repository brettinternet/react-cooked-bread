/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx, keyframes } from '@emotion/react'

import { ToastTypeOption, Styles, StylesObj } from '../types'
import { CheckIcon, FlameIcon, InfoIcon, CloseIcon, AlertIcon } from './icons'
import { ToastContentProps, toastContentPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { isDev } from '../utils'

const borderRadius = 3
const typeColors = {
  success: '#51a351',
  error: '#bd362f',
  warning: '#f89406',
  info: '#2f96b4',
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

const shrinkKeyframes = keyframes`from { width: 100%; } to { width: 0% }`

const icons = {
  success: CheckIcon,
  error: FlameIcon,
  warning: AlertIcon,
  info: InfoIcon,
}

interface WrapperProps {
  type: ToastTypeOption
  styles: Styles
}

const Wrapper: React.FC<WrapperProps> = ({ children, type, styles }) => (
  <div
    className={`${classNames.wrapper} ${classNames.wrapper}--${type}`}
    css={{
      boxSizing: 'border-box',
      position: 'relative',
      borderRadius,
      width: 350,
      maxWidth: 'calc(100vw - 2rem)',
      display: 'flex',
      backgroundColor: typeColors[type],
      color: 'white',
      boxShadow: '0 0 12px #999',
      marginBottom: '0.5rem',
      opacity: '0.8',
      ':hover': {
        opacity: '1',
        boxShadow: '0 0 12px #000',
      },
      ...styles,
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
      color: 'white',
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'flex-start',
      opacity: 1,
      padding: '0.5rem',
      transition: 'opacity 150ms',
      ':hover': { opacity: 0.8 },
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
      lineHeight: 1.6,
      minHeight: 40,
      paddingTop: '1rem',
      paddingBottom: '1rem',
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
      backgroundColor: 'rgba(0,0,0,0.4)',
      bottom: 0,
      height: 4,
      left: 0,
      opacity,
      position: 'absolute',
      width: 0,
      ...styles,
    }}
  />
)

interface IconProps {
  type: ToastTypeOption
  wrapperStyles: Styles
  iconStyles: Styles
}

const Icon: React.FC<IconProps> = ({ type, wrapperStyles, iconStyles }) => {
  const Glyph = icons[type]
  return (
    <div
      className={classNames.iconWrapper}
      css={{
        color: 'white',
        flexShrink: 0,
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        ...wrapperStyles,
      }}
    >
      <Glyph
        className={classNames.icon}
        width={24}
        height={24}
        css={{
          ...iconStyles,
        }}
      />
    </div>
  )
}

export type ClassicStyleKeys = keyof typeof classNames
export interface ClassicToastContentProps extends ToastContentProps {
  styles?: StylesObj<ClassicStyleKeys>
}

export const ClassicToastContent: React.FC<ClassicToastContentProps> = ({
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
  <Wrapper type={type} styles={styles?.wrapper}>
    <Progress
      key={timeout}
      opacity={autoDismiss ? 1 : 0}
      timeout={timeout}
      isRunning={isRunning}
      styles={styles?.progress}
    />
    <Icon type={type} wrapperStyles={styles?.iconWrapper} iconStyles={styles?.icon} />
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
  ClassicToastContent.propTypes = toastContentPropTypes
}
