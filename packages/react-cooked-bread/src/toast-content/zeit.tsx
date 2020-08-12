/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx, keyframes } from '@emotion/core'

import { ToastTypeOption, Styles, StylesObj } from '../types'
import { CloseThinIcon } from './icons'
import { ToastContentProps, toastContentPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { isDev } from '../utils'

/**
 * @note styles mimic source https://react.zeit-ui.co/en-us/components/toast
 */
const typeStyles = {
  success: {
    color: 'white',
    backgroundColor: '#0070f3',
  },
  warning: {
    color: 'white',
    backgroundColor: '#f5a623',
  },
  error: {
    color: 'white',
    backgroundColor: '#e00',
  },
  info: {
    color: 'black',
    backgroundColor: 'white',
  },
}

const classNames = {
  wrapper: `${classNamePrefix}__toast__wrapper`,
  progress: `${classNamePrefix}__toast__progress`,
  title: `${classNamePrefix}__toast__title`,
  subtitle: `${classNamePrefix}__toast__subtitle`,
  text: `${classNamePrefix}__toast__text`,
  buttonsWrapper: `${classNamePrefix}__toast__buttons-wrapper`,
  actionButton: `${classNamePrefix}__toast__button`,
  closeButton: `${classNamePrefix}__toast__close-button`,
  closeButtonIcon: `${classNamePrefix}__toast__close-button-icon`,
}

const shrinkKeyframes = keyframes`from { width: 100%; } to { width: 0% }`

type WrapperProps = {
  type: ToastTypeOption
  styles: Styles
}

const Wrapper: React.FC<WrapperProps> = ({ children, styles, type }) => (
  <div
    className={classNames.wrapper}
    css={{
      boxSizing: 'border-box',
      position: 'relative',
      marginBottom: '0.5rem',
      display: 'flex',
      width: 420,
      maxWidth: 'calc(100vw - 2rem)',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: 'rgba(0, 0, 0, 0.12) 0px 5px 10px',
      borderRadius: '5px',
      padding: '1rem',
      transition: 'transform 400ms ease 0ms, opacity 200ms ease 0ms',
      ...typeStyles[type],
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
      marginLeft: '0.5rem',
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

interface ProgressProps {
  opacity: number
  isRunning: boolean
  timeout: number
  styles: Styles
}

const Progress: React.FC<ProgressProps> = ({ timeout, opacity, isRunning, styles }) => (
  <div
    className={classNames.progress}
    css={{
      animation: `${shrinkKeyframes} ${timeout}ms linear`,
      animationPlayState: isRunning ? 'running' : 'paused',
      backgroundColor: 'rgba(0,0,0,0.05)',
      borderTopLeftRadius: '5px',
      borderBottomLeftRadius: '5px',
      top: 0,
      height: '100%',
      left: 0,
      bottom: 0,
      opacity,
      position: 'absolute',
      width: 0,
      ...styles,
    }}
  />
)

type ButtonProps = {
  text: string
  onClick: (ev: React.MouseEvent<HTMLButtonElement>) => void
  secondary?: boolean
}

const ActionButton: React.FC<ButtonProps> = ({ text, onClick, secondary }) => (
  <button
    className={classNames.actionButton}
    onClick={onClick}
    css={{
      marginLeft: '0.5rem',
      height: '1.5rem',
      lineHeight: '1.5rem',
      minWidth: 'min-content',
      width: 'auto',
      fontWeight: 400,
      fontSize: '0.75rem',
      userSelect: 'none',
      textTransform: 'capitalize',
      display: 'inline-block',
      justifyContent: 'center',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      color: secondary ? 'dimgrey' : 'white',
      backgroundColor: secondary ? 'white' : 'black',
      cursor: 'pointer',
      boxShadow: 'none',
      padding: '0px 0.625rem',
      borderRadius: '5px',
      transition:
        'background-color 200ms ease 0ms, box-shadow 200ms ease 0ms, border 200ms ease 0ms, color 200ms ease 0ms',
      overflow: 'hidden',
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: secondary ? 'dimgrey' : 'black',
      ':hover': {
        color: 'black',
        borderColor: 'black',
        backgroundColor: 'white',
      },
    }}
  >
    {text}
  </button>
)

export type ZeitStyleKeys = keyof typeof classNames
export interface ZeitToastContentProps extends ToastContentProps {
  buttons?: ButtonProps[]
  styles?: StylesObj<ZeitStyleKeys>
}

export const ZeitToastContent: React.FC<ZeitToastContentProps> = ({
  type,
  autoDismiss,
  timeout,
  isRunning,
  styles,
  onDismiss,
  title,
  subtitle,
  buttons,
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
    <div className={classNames.text} css={{ zIndex: 1, ...styles?.text }}>
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
    </div>
    <div
      className={classNames.buttonsWrapper}
      css={{ display: 'flex', alignItems: 'center', zIndex: 1, ...styles?.buttonsWrapper }}
    >
      {buttons?.length &&
        buttons.map((buttonProps, index) => <ActionButton key={index} {...buttonProps} />)}
      <CloseButton onClick={onDismiss} styles={styles?.closeButton}>
        <CloseThinIcon
          className={classNames.closeButtonIcon}
          css={{ ...styles?.closeButtonIcon }}
        />
      </CloseButton>
    </div>
  </Wrapper>
)

if (isDev) {
  ZeitToastContent.propTypes = toastContentPropTypes
}
