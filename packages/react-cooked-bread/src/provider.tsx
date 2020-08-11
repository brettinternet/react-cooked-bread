/** @jsx jsx */
import React, { useState, useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

import { ToastContainer as DefaultContainer, ContainerProps, ContainerStyler } from './container'
import { Toaster } from './toaster'
import { ToastComponentsProps, transitionDurationPropsType } from './toast-types'
import {
  PlacementOption,
  PropsWithRequiredChildren,
  placementsProps,
  stylerProps,
  childrenProps,
  Styler,
  TransitionDuration,
} from './types'
import { Context } from './context'
import { useActiveToasts } from './active-toasts-hook'
import { isBrowser, getStylesCSS, getFocusEvents, isDev } from './utils'

const transitionGroupClassName = 'react-cooked-bread__toast__transition-group'

interface ToastProviderValueProps {
  autoDismiss?: boolean
  timeout?: number
  placement?: PlacementOption
  transitionDuration?: TransitionDuration
  pauseAllOnHover?: boolean
  reverseColumn?: boolean
  pauseOnFocusLoss?: boolean
  maxToasts?: number
}

type TransitionGroupStyler = Styler<ToastProviderValueProps> | undefined

export interface ToastProviderProps extends ToastProviderValueProps, ToastComponentsProps {
  container?: React.ComponentType<ContainerProps>
  containerStyles?: ContainerStyler
  transitionGroupStyles?: TransitionGroupStyler
}

export const ToastProvider: React.FC<PropsWithRequiredChildren<ToastProviderProps>> = ({
  children,
  autoDismiss: defaultAutoDismiss = false,
  timeout: defaultTimeout = 5000,
  toastRoot: ToastRoot,
  toastContent: ToastContent,
  container: Container = DefaultContainer,
  placement = 'bottom-right',
  transitionDuration: defaultTransitionDuration = { appear: 200, exit: 200 },
  pauseAllOnHover,
  containerStyles,
  transitionGroupStyles,
  toastRootStyles,
  toastContentStyles,
  reverseColumn,
  pauseOnFocusLoss,
  maxToasts,
}) => {
  const [isPaused, setPause] = useState(false)
  const {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    hasToasts,
  } = useActiveToasts(maxToasts)

  useEffect(() => {
    const { bind, unbind } = getFocusEvents(setPause)
    if (pauseOnFocusLoss) {
      bind()
    }
    return unbind
  }, [pauseOnFocusLoss])

  const handleMouseEnter = useCallback(() => {
    if (pauseAllOnHover) {
      setPause(true)
    }
  }, [pauseAllOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseAllOnHover) {
      setPause(false)
    }
  }, [pauseAllOnHover])

  const cookedLoaf = (
    <Container
      placement={placement}
      hasToasts={hasToasts}
      styler={containerStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TransitionGroup
        className={transitionGroupClassName}
        css={{
          ...(reverseColumn
            ? {
                display: 'flex',
                flexDirection: 'column-reverse',
              }
            : {}),
          ...getStylesCSS(transitionGroupStyles, {
            placement,
            pauseAllOnHover,
            autoDismiss: defaultAutoDismiss,
            timeout: defaultTimeout,
            transitionDuration: defaultTransitionDuration,
          }),
        }}
      >
        {toasts.map(
          ({
            id,
            autoDismiss = defaultAutoDismiss,
            timeout = defaultTimeout,
            transitionDuration = defaultTransitionDuration,
            onDismiss,
            content,
            ...props
          }) => (
            <Transition key={id} appear mountOnEnter timeout={transitionDuration} unmountOnExit>
              {(transitionState) => (
                <Toaster
                  key={id}
                  id={id}
                  toastRoot={ToastRoot}
                  toastContent={ToastContent}
                  autoDismiss={autoDismiss}
                  timeout={timeout}
                  content={content}
                  placement={placement}
                  transitionDuration={transitionDuration}
                  transitionState={transitionState}
                  isPaused={isPaused}
                  onDismiss={() => {
                    removeToast(id)
                    if (onDismiss) {
                      onDismiss(id)
                    }
                  }}
                  rootStyles={toastRootStyles}
                  contentStyles={toastContentStyles}
                  {...props}
                >
                  {content}
                </Toaster>
              )}
            </Transition>
          )
        )}
      </TransitionGroup>
    </Container>
  )

  const portalTarget = isBrowser && document.body

  return (
    <Context.Provider
      value={{
        addToast,
        removeToast,
        removeAllToasts,
        updateToast,
        toasts,
      }}
    >
      {children}
      {portalTarget ? (
        createPortal(cookedLoaf, portalTarget)
      ) : (
        <Container placement={placement} hasToasts={hasToasts} styler={containerStyles} />
      )}
    </Context.Provider>
  )
}

if (isDev) {
  ToastProvider.propTypes = {
    autoDismiss: PropTypes.bool,
    timeout: PropTypes.number,
    toastRoot: PropTypes.func.isRequired,
    toastContent: PropTypes.func,
    container: PropTypes.func,
    placement: placementsProps,
    transitionDuration: transitionDurationPropsType,
    pauseAllOnHover: PropTypes.bool,
    containerStyles: stylerProps,
    transitionGroupStyles: stylerProps,
    toastRootStyles: stylerProps,
    toastContentStyles: stylerProps,
    reverseColumn: PropTypes.bool,
    pauseOnFocusLoss: PropTypes.bool,
    maxToasts: PropTypes.number,
    children: childrenProps.isRequired,
  }
}
