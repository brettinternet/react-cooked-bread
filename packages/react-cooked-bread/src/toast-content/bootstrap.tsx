/** @jsx jsx */
import React from 'react'
import { jsx, keyframes } from '@emotion/core'

import { ToastTypeOption, Styles, StylesObj } from '../types'
import { CloseIcon } from './icons'
import { ToastContentProps, toastContentPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { isDev } from '../utils'

/**
 * @note styles mimic source https://getbootstrap.com/docs/4.3/components/toasts/
 */
const typeColors = {
  success: {
    accent: '#28a745',
  },
  error: {
    accent: '#dc3545',
  },
  warning: {
    accent: '#ffc107',
  },
  info: {
    accent: '#007bff',
  },
}

const classNames = {
  wrapper: `${classNamePrefix}__toast__wrapper`,
  iconWrapper: `${classNamePrefix}__toast__icon-wrapper`,
  icon: `${classNamePrefix}__toast__icon`,
  progress: `${classNamePrefix}__toast__progress`,
  header: `${classNamePrefix}__toast__header`,
  title: `${classNamePrefix}__toast__title`,
  subtitle: `${classNamePrefix}__toast__subtitle`,
  text: `${classNamePrefix}__toast__text`,
  closeButton: `${classNamePrefix}__toast__close-button`,
  closeButtonIcon: `${classNamePrefix}__toast__close-button-icon`,
}

const shrinkKeyframes = keyframes`from { width: 100%; } to { width: 0% }`

type WrapperProps = {
  styles: Styles
}

const Wrapper: React.FC<WrapperProps> = ({ children, styles }) => (
  <div
    className={classNames.wrapper}
    css={{
      overflow: 'hidden',
      borderRadius: '0.25rem',
      width: 350,
      backgroundColor: 'white',
      boxShadow: '0 0.1rem 0.75rem rgba(0,0,0,.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(0,0,0,.1)',
      marginBottom: '0.5rem',
      fontSize: '0.875rem',
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
      color: 'black',
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      display: 'flex',
      alignItems: 'flex-start',
      opacity: 0.5,
      padding: '0.5rem',
      transition: 'opacity 150ms',
      marginLeft: '0.25rem',
      ':hover': { opacity: 1 },
      ...styles,
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

const Header: React.FC = ({ children }) => (
  <div
    className={classNames.header}
    css={{
      colors: '#6c757d',
      display: 'flex',
      alignItems: 'center',
      padding: '0.25rem 0.75rem',
      borderBottom: '1px solid rgba(0,0,0,.05)',
    }}
  >
    {children}
  </div>
)

type TextProps = {
  styles: Styles
}

const Text: React.FC<TextProps> = ({ children, styles }) => (
  <div
    className={classNames.text}
    css={{
      color: '#212529',
      position: 'relative',
      lineHeight: 1.4,
      padding: '0.75rem',
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
      top: 0,
      height: 2,
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
  hasTitle: boolean
  wrapperStyles: Styles
  iconStyles: Styles
}

const Icon: React.FC<IconProps> = ({ type, hasTitle, wrapperStyles, iconStyles }) => (
  <div
    className={classNames.iconWrapper}
    css={{ marginRight: hasTitle ? '.5rem' : 'auto', ...wrapperStyles }}
  >
    <svg
      className={`${classNames.icon} ${classNames.icon}--${type}`}
      css={{
        fontSize: '1.125rem',
        textAnchor: 'middle',
        userSelect: 'none',
        borderRadius: '0.25rem',
        ...iconStyles,
      }}
      width="20px"
      height="20px"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
      role="img"
    >
      <rect width="100%" height="100%" fill={typeColors[type].accent}></rect>
    </svg>
  </div>
)

export type BootstrapStyleKeys = keyof typeof classNames
export interface BootstrapToastContentProps extends ToastContentProps {
  styles?: StylesObj<BootstrapStyleKeys>
}

export const BootstrapToastContent: React.FC<BootstrapToastContentProps> = ({
  type,
  autoDismiss,
  timeout,
  isRunning,
  styles,
  onDismiss,
  title,
  subtitle,
  children,
}) => (
  <Wrapper styles={styles?.wrapper}>
    <Header>
      <Icon
        type={type}
        wrapperStyles={styles?.iconWrapper}
        iconStyles={styles?.icon}
        hasTitle={!!title}
      />
      {title && (
        <strong
          className={classNames.title}
          css={{ color: '#6c757d', marginRight: 'auto', ...styles?.title }}
        >
          {title}
        </strong>
      )}
      {subtitle && (
        <small
          className={classNames.subtitle}
          css={{ color: '#6c757d', fontWeight: 400, paddingLeft: '0.25rem', ...styles?.subtitle }}
        >
          {subtitle}
        </small>
      )}
      {onDismiss && (
        <CloseButton onClick={onDismiss} styles={styles?.closeButton}>
          <CloseIcon className={classNames.closeButtonIcon} css={{ ...styles?.closeButtonIcon }} />
        </CloseButton>
      )}
    </Header>
    <Text styles={styles?.text}>
      <Progress
        key={timeout}
        opacity={autoDismiss ? 1 : 0}
        timeout={timeout}
        isRunning={isRunning}
        styles={styles?.progress}
      />
      {children}
    </Text>
  </Wrapper>
)

if (isDev) {
  BootstrapToastContent.propTypes = toastContentPropTypes
}
