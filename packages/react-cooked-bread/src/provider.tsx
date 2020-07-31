/** @jsx jsx */
import React, { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'
import { jsx } from '@emotion/core'

import { ToastContainer as DefaultContainer, ContainerProps, ContainerStyler } from './container'
import { Toaster } from './toaster'
import { ToastStyler, ToastComponentsProps } from './toast-types'
import { isBrowser, getStylesCSS } from './utils'
import {
  PlacementOption,
  PropsWithRequiredChildren,
  placementsProps,
  stylerProps,
  childrenProps,
  Styler,
} from './types'
import { Context } from './context'
import { useActiveToasts } from './active-toasts-hook'

const transitionGroupClassName = 'react-cooked-bread__toast__transition-group'

interface ToastProviderValueProps {
  defaultAutoDismiss?: boolean
  autoDismissTimeout?: number
  placement?: PlacementOption
  transitionDuration?: number
  pauseAllOnHover?: boolean
}

type TransitionGroupStyler = Styler<ToastProviderValueProps> | undefined

export interface ToastProviderProps extends ToastProviderValueProps, ToastComponentsProps {
  container?: React.ComponentType<ContainerProps>
  containerStyles?: ContainerStyler
  transitionGroupStyles?: TransitionGroupStyler
  toastStyles?: ToastStyler
}

export const ToastProvider: React.FC<PropsWithRequiredChildren<ToastProviderProps>> = ({
  children,
  defaultAutoDismiss = false,
  autoDismissTimeout = 5000,
  toastRoot: ToastRoot,
  toastContent: ToastContent,
  container: Container = DefaultContainer,
  placement = 'bottom-right',
  transitionDuration = 220,
  pauseAllOnHover,
  containerStyles,
  transitionGroupStyles,
  toastStyles,
}) => {
  const [isPaused, setPause] = useState(false)
  const {
    toasts,
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    hasToasts,
  } = useActiveToasts()

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
          ...getStylesCSS(transitionGroupStyles, {
            placement,
            pauseAllOnHover,
            defaultAutoDismiss,
            autoDismissTimeout,
            transitionDuration,
          }),
        }}
      >
        {toasts.map(
          ({
            id,
            type,
            autoDismiss = defaultAutoDismiss,
            onDismiss,
            content,
            ...unknownConsumerProps
          }) => (
            <Transition key={id} appear mountOnEnter timeout={transitionDuration} unmountOnExit>
              {(transitionState) => (
                <Toaster
                  key={id}
                  toastRoot={ToastRoot}
                  toastContent={ToastContent}
                  type={type}
                  autoDismiss={autoDismiss}
                  autoDismissTimeout={autoDismissTimeout}
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
                  styler={toastStyles}
                  {...unknownConsumerProps}
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

ToastProvider.propTypes = {
  defaultAutoDismiss: PropTypes.bool,
  autoDismissTimeout: PropTypes.number,
  toastRoot: PropTypes.func.isRequired,
  toastContent: PropTypes.func,
  container: PropTypes.func,
  placement: placementsProps,
  transitionDuration: PropTypes.number,
  pauseAllOnHover: PropTypes.bool,
  containerStyles: stylerProps,
  transitionGroupStyles: stylerProps,
  toastStyles: stylerProps,
  children: childrenProps.isRequired,
}
