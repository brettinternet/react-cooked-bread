import React, { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

import { Container as DefaultContainer, ContainerProps, ContainerStyler } from './container'
import { Toaster } from './toaster'
import { ToastStyler, ToastComponentsProps } from './toast.types'
import { getId, isBrowser } from './utils'
import {
  ToastOptions,
  ActiveToast,
  Placement,
  Id,
  PropsWithRequiredChildren,
  placementsProps,
  stylerProps,
  childrenProps,
} from './types'
import { Context } from './context'

export interface ToastProviderProps extends ToastComponentsProps {
  container?: React.ComponentType<ContainerProps>
  defaultAutoDismiss?: boolean
  autoDismissTimeout?: number
  placement?: Placement
  transitionDuration?: number
  containerStyles?: ContainerStyler
  toastStyles?: ToastStyler
}

export const ToastProvider: React.FC<PropsWithRequiredChildren<ToastProviderProps>> = ({
  children,
  defaultAutoDismiss = false,
  autoDismissTimeout = 5000,
  toastRoot: ToastRoot,
  toastContent: ToastContent,
  container: Container = DefaultContainer,
  placement = 'top-right',
  transitionDuration = 220,
  containerStyles,
  toastStyles,
}) => {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const hasToasts = Boolean(toasts.length)

  const exists = (id: Id | undefined) => {
    if (id && hasToasts) {
      return Boolean(toasts.filter((t) => t.id === id).length)
    }
  }

  const removeToast = (id: Id | undefined) => {
    if (exists(id)) {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id))
    }
  }

  const removeAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  const addToast = (content: React.ReactNode, options: ToastOptions = {}) => {
    const id = options.id || getId()
    if (!exists(id)) {
      const newToast = { content, id, ...options }
      setToasts((prevToasts) => [...prevToasts, newToast])
      return id
    }
  }

  const updateToast = (id: Id, options: ToastOptions = {}) => {
    if (exists(id)) {
      const index = toasts.findIndex((t) => t.id === id)
      const updatedToast = { ...toasts[index], ...options }
      setToasts((prevToasts) => [
        ...prevToasts.slice(0, index),
        updatedToast,
        ...prevToasts.slice(index + 1),
      ])
    }
  }

  const cookedLoaf = (
    <Container placement={placement} hasToasts={hasToasts} styler={containerStyles}>
      <TransitionGroup>
        {toasts.map(({ id, type, autoDismiss, onDismiss, content, ...unknownConsumerProps }) => (
          <Transition key={id} appear mountOnEnter timeout={transitionDuration} unmountOnExit>
            {(transitionState) => (
              <Toaster
                key={id}
                toastRoot={ToastRoot}
                toastContent={ToastContent}
                type={type}
                autoDismiss={autoDismiss === undefined ? defaultAutoDismiss : autoDismiss}
                autoDismissTimeout={autoDismissTimeout}
                content={content}
                onDismiss={() => {
                  removeToast(id)
                  if (onDismiss) {
                    onDismiss(id)
                  }
                }}
                placement={placement}
                transitionDuration={transitionDuration}
                transitionState={transitionState}
                styler={toastStyles}
                {...unknownConsumerProps}
              >
                {content}
              </Toaster>
            )}
          </Transition>
        ))}
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
  containerStyles: stylerProps,
  toastStyles: stylerProps,
  children: childrenProps.isRequired,
}
