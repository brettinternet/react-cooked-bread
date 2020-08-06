import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'

import { getDisplayName, error } from './utils'

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
    error('The `useToasts` hook must be called from a descendent of the toast provider.')
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
  Component: React.ComponentType<T>
) => {
  const WrappedComponent = React.forwardRef<
    React.Ref<HTMLElement>,
    Omit<T, keyof WithToastContextProps>
  >((props, ref) => (
    <ToastConsumer>
      {(context) => (
        // issue: https://github.com/microsoft/TypeScript/issues/28938
        <Component ref={ref} {...(props as T)} toastContext={context} />
      )}
    </ToastConsumer>
  ))

  // source: https://reactjs.org/docs/higher-order-components.html#convention-wrap-the-display-name-for-easy-debugging
  WrappedComponent.displayName = `withToastContext(${getDisplayName(Component)})`

  // source: https://reactjs.org/docs/higher-order-components.html#static-methods-must-be-copied-over
  hoistNonReactStatics(WrappedComponent, Component)

  return WrappedComponent
}
