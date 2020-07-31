import React from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { ToastProvider } from '../src/provider'
import { DefaultToastRoot } from '../src/toast-root'
import { DefaultToastContent } from '../src/toast-content'

export const ProviderWrapper: React.FC = ({ children }) => (
  <ToastProvider toastRoot={DefaultToastRoot} toastContent={DefaultToastContent}>
    {children}
  </ToastProvider>
)

export const renderWithProvider = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: ProviderWrapper, ...options })
