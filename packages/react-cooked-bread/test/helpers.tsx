import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { render, RenderOptions } from '@testing-library/react'
import { config as transitionGroupConfig } from 'react-transition-group'

import { ToastProvider } from '../src/provider'
import { SlideShrinkToastRoot } from '../src/toast-root'
import { GlossyToastContent } from '../src/toast-content'

transitionGroupConfig.disabled = true

export const ProviderWrapper: React.FC = ({ children }) => (
  <ToastProvider toastRoot={SlideShrinkToastRoot} toastContent={GlossyToastContent}>
    {children}
  </ToastProvider>
)

export const renderWithProvider = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: ProviderWrapper, ...options })

export const setupPortals = () => {
  // source: https://github.com/facebook/react/issues/11565#issuecomment-380143358
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ReactDOM.createPortal = jest.fn((element, _node) => element as React.ReactPortal)
}

/**
 * @usage For testing props from function as a child, pass the
 * function here as callback and it can be invoked on mount
 */
export const MountCallback: React.FC<{ callback: (() => void) | Array<() => void> }> = ({
  callback,
}) => {
  useEffect(
    () => {
      if (Array.isArray(callback)) {
        callback.forEach((cb) => {
          cb()
        })
      } else {
        callback()
      }
    },
    [] // eslint-disable-line react-hooks/exhaustive-deps
  )
  return <></>
}
