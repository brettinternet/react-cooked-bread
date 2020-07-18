import React, { useContext, createContext } from 'react'
import PropTypes from 'prop-types'

import { noop } from './utils'
import { Add, Update, Remove, Options, GenericObject } from './types'

interface ContextProps {
  add: Add
  remove: Remove
  removeAll: () => void
  update: Update
  toasts: Options[]
}

export const Context = createContext<ContextProps>({
  add: noop,
  remove: noop,
  removeAll: noop,
  update: noop,
  toasts: [],
})

interface CustomerProps {
  children: (context: ContextProps) => React.ReactNode
}

export const useToasts = () => {
  const context = useContext(Context)

  if (!context) {
    throw Error('The `useToasts` hook must be called from a descendent of the toast provider.')
  }

  const { add, remove, removeAll, update, toasts } = context
  return {
    addToast: add,
    removeToast: remove,
    removeAllToasts: removeAll,
    updateToast: update,
    toasts,
  }
}

export const Consumer: React.FC<CustomerProps> = ({ children }) => (
  <Context.Consumer>{context => children(context)}</Context.Consumer>
)

Consumer.propTypes = {
  children: PropTypes.func.isRequired,
}

export const withContext = <T extends GenericObject>(Component: React.ComponentType<T>) =>
  React.forwardRef((props: T, ref: React.Ref<HTMLElement>) => (
    <Consumer>{context => <Component ref={ref} toastContext={context} {...props} />}</Consumer>
  ))
