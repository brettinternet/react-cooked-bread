/** @jsx jsx */
import React, { Fragment } from 'react'
import { jsx } from '@emotion/react'

import { ToastTypeOption, Styles, StylesObj } from '../types'
import { ToastContentProps, toastContentPropTypes } from '../toast-types'
import { classNamePrefix } from '../styles'
import { isDev } from '../utils'

const typeColors = {
  success: '#dff6dd',
  info: '#deecf9',
  warning: '#fff4ce',
  error: '#fde7e9',
}

const classNames = {
  wrapper: `${classNamePrefix}__toast__wrapper`,
  title: `${classNamePrefix}__toast__title`,
  subtitle: `${classNamePrefix}__toast__subtitle`,
  text: `${classNamePrefix}__toast__text`,
  closeButton: `${classNamePrefix}__toast__close-button`,
}

type WrapperProps = {
  type: ToastTypeOption
  styles: Styles
}

const Wrapper: React.FC<WrapperProps> = ({ children, styles, type }) => (
  <div
    className={`${classNames.wrapper} ${classNames.wrapper}--${type}`}
    css={{
      boxSizing: 'border-box',
      position: 'relative',
      marginBottom: '0.5rem',
      padding: '0.80rem',
      width: 420,
      maxWidth: 'calc(100vw - 2rem)',
      backgroundColor: typeColors[type],
      color: 'black',
      border: '3px ridge',
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
      fontFamily: 'monospace',
      fontSize: 16,
      width: 20,
      height: 20,
      textAlign: 'center',
      cursor: 'pointer',
      color: 'black',
      appearance: 'none',
      border: 'none',
      background: 'transparent',
      opacity: 0.5,
      padding: 0,
      position: 'absolute',
      top: 0,
      right: 0,
      ':hover': { opacity: 1 },
      ...styles,
    }}
    onClick={onClick}
  >
    {children}
  </button>
)

export type HtmlyStyleKeys = keyof typeof classNames
export interface HtmlyToastContentProps extends ToastContentProps {
  styles?: StylesObj<HtmlyStyleKeys>
}

export const HtmlyToastContent: React.FC<HtmlyToastContentProps> = ({
  type,
  styles,
  onDismiss,
  title,
  subtitle,
  children,
}) => (
  <Wrapper type={type} styles={styles?.wrapper}>
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
    <CloseButton onClick={onDismiss} styles={styles?.closeButton}>
      x
    </CloseButton>
  </Wrapper>
)

if (isDev) {
  HtmlyToastContent.propTypes = toastContentPropTypes
}
