import React, { useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { Transition, TransitionGroup } from 'react-transition-group'
import PropTypes from 'prop-types'

import { Container as DefaultContainer, ContainerProps, ContainerStyler } from './container'
import { Toaster } from './toaster'
import { Toast as DefaultToast, ToastProps, ToastStyler } from './toast'
import { getId, isBrowser } from './utils'
import { Options, ActiveToast, Placement, Id, PropsWithRequiredChildren } from './types'
import { Context } from './context'
import { placementsProps, stylerProps, toastStylerProps, childrenProps } from './prop-types'

interface ProviderProps {
  defaultAutoDismiss?: boolean
  autoDismissTimeout?: number
  toast?: React.ComponentType<ToastProps>
  container?: React.ComponentType<ContainerProps>
  placement?: Placement
  transitionDuration?: number
  containerStyles?: ContainerStyler
  toastStyles?: ToastStyler
}

export const Provider: React.FC<PropsWithRequiredChildren<ProviderProps>> = ({
  children,
  defaultAutoDismiss = false,
  autoDismissTimeout = 5000,
  toast: Toast = DefaultToast,
  container: Container = DefaultContainer,
  placement = 'top-right',
  transitionDuration = 220,
  containerStyles,
  toastStyles,
}) => {
  const [toasts, setToasts] = useState<ActiveToast[]>([])
  const hasToasts = Boolean(toasts.length)

  const exists = useCallback(
    (id: Id | undefined) => {
      if (id && hasToasts) {
        return Boolean(toasts.filter((t) => t.id === id).length)
      }
    },
    [toasts, hasToasts]
  )

  const remove = useCallback(
    (id: Id | undefined) => {
      if (exists(id)) {
        setToasts(toasts.filter((t) => t.id !== id))
      }
    },
    [toasts, exists]
  )

  const removeAll = useCallback(() => {
    setToasts([])
  }, [])

  const add = useCallback(
    (content: React.ReactNode, options: Options = {}) => {
      const id = options.id || getId()
      if (!exists(id)) {
        const newToast = { content, id, ...options }
        setToasts([...toasts, newToast])
        return id
      }
    },
    [toasts, exists]
  )

  const update = useCallback(
    (id: Id, options: Options = {}) => {
      if (exists(id)) {
        const index = toasts.findIndex((t) => t.id === id)
        const updatedToast = { ...toasts[index], ...options }
        setToasts([...toasts.slice(0, index), updatedToast, ...toasts.slice(index + 1)])
      }
    },
    [toasts, exists]
  )

  const CookedLoaf = useMemo(
    () => (
      <Container placement={placement} hasToasts={hasToasts} styler={containerStyles}>
        <TransitionGroup>
          {toasts.map(({ id, type, autoDismiss, onDismiss, content, ...unknownConsumerProps }) => (
            <Transition key={id} appear mountOnEnter timeout={transitionDuration} unmountOnExit>
              {(transitionState) => (
                <Toaster
                  key={id}
                  type={type}
                  autoDismiss={autoDismiss === undefined ? defaultAutoDismiss : autoDismiss}
                  autoDismissTimeout={autoDismissTimeout}
                  component={Toast}
                  content={content}
                  onDismiss={() => {
                    remove(id)
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
    ),
    [
      toasts,
      placement,
      hasToasts,
      defaultAutoDismiss,
      transitionDuration,
      Toast,
      autoDismissTimeout,
      containerStyles,
      toastStyles,
      remove,
    ]
  )

  const portalTarget = isBrowser && document.body

  return (
    <Context.Provider
      value={{
        add,
        remove,
        removeAll,
        update,
        toasts,
      }}
    >
      {children}
      {portalTarget ? (
        createPortal(CookedLoaf, portalTarget)
      ) : (
        <Container placement={placement} hasToasts={hasToasts} styler={containerStyles} />
      )}
    </Context.Provider>
  )
}

Provider.propTypes = {
  defaultAutoDismiss: PropTypes.bool,
  autoDismissTimeout: PropTypes.number,
  toast: PropTypes.func,
  container: PropTypes.func,
  placement: placementsProps,
  transitionDuration: PropTypes.number,
  containerStyles: stylerProps,
  toastStyles: toastStylerProps,
  children: childrenProps.isRequired,
}
