import React from 'react'
import PropTypes from 'prop-types'

const { useContext, createContext } = React

import { noop } from './utils'
import { Add, Update, Remove, RemoveAll, ActiveToast } from './types'

export interface ToastContextProps {
  addToast: Add
  removeToast: Remove
  removeAllToasts: RemoveAll
  updateToast: Update
  toasts: ActiveToast[]
}

export const Context = createContext<ToastContextProps>({
  addToast: () => '',
  removeToast: noop,
  removeAllToasts: noop,
  updateToast: noop,
  toasts: [],
})

export const useToasts = () => {
  const context = useContext(Context)

  if (!context) {
    throw Error('The `useToasts` hook must be called from a descendent of the toast provider.')
  }

  const { addToast, removeToast, removeAllToasts, updateToast, toasts } = context
  return {
    addToast,
    removeToast,
    removeAllToasts,
    updateToast,
    toasts,
  }
}

export interface ToastConsumerProps {
  children: (context: ToastContextProps) => React.ReactNode
}

export const ToastConsumer: React.FC<ToastConsumerProps> = ({ children }) => (
  <Context.Consumer>{(context) => children(context)}</Context.Consumer>
)

ToastConsumer.propTypes = {
  children: PropTypes.func.isRequired,
}

export interface WithToastContextProps {
  toastContext: ToastContextProps
}

export const withToastContext = <T extends WithToastContextProps>(
  WrappedComponent: React.ComponentType<T>
) =>
  React.forwardRef<React.Ref<HTMLElement>, Omit<T, keyof WithToastContextProps>>((props, ref) => (
    <ToastConsumer>
      {(context) => (
        // issue: https://github.com/microsoft/TypeScript/issues/28938
        <WrappedComponent ref={ref} {...(props as T)} toastContext={context} />
      )}
    </ToastConsumer>
  ))
