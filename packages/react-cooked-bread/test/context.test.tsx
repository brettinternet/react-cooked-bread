import React from 'react'
import { render, screen } from '@testing-library/react'
import { renderHook, act } from '@testing-library/react-hooks'

import { ProviderWrapper, setupPortals } from '../test/helpers'
import {
  Context,
  ToastConsumer,
  withToastContext,
  WithToastContextProps,
  useToasts,
} from '../src/context'
import { ToastType } from '../src/types'
const utils = require('../src/utils')
const { noop } = jest.requireActual('../src/utils')

let id: number = 1
jest.mock('../src/utils')
utils.getFocusEvents.mockImplementation(() => ({ bind: noop, unbind: noop }))
utils.getId.mockImplementation(() => String(++id))
utils.getStylesMapCSS.mockImplementation(() => ({}))

describe('ToastConsumer', () => {
  beforeAll(() => {
    setupPortals()
  })
  beforeEach(() => {
    id = 1
  })

  test('has an empty/noop default values', () => {
    const testId = 'empty-toast-wrapper'
    render(
      <ToastConsumer>
        {({ addToast, removeToast, removeAllToasts, updateToast, toasts }) => {
          const toastId = addToast('Cheers!')
          updateToast(toastId, {
            type: 'error',
          })
          removeToast(toastId)
          removeAllToasts()
          return (
            <div data-testid={testId}>
              {toasts.map(({ id }) => (
                <div key={id}>{id}</div>
              ))}
            </div>
          )
        }}
      </ToastConsumer>
    )
    expect(screen.getByTestId(testId)).toBeEmptyDOMElement()
  })

  test('withToastContext shows values from provider', () => {
    const toast = {
      id: 'what',
      content: 'Cheers!',
      type: ToastType.INFO,
      autoDismiss: false,
    }

    const Inner: React.FC<WithToastContextProps> = ({ toastContext }) => {
      const { toasts } = toastContext
      return (
        <>
          {toasts.map(({ id, content }) => (
            <div key={id} data-testid={id}>
              {content}
            </div>
          ))}
        </>
      )
    }
    const InnerContext = withToastContext(Inner)

    render(
      <Context.Provider
        value={{
          addToast: () => '',
          removeToast: noop,
          removeAllToasts: noop,
          updateToast: noop,
          toasts: [toast],
        }}
      >
        <InnerContext />
      </Context.Provider>
    )
    expect(screen.getByTestId(toast.id)).toHaveTextContent(toast.content)
  })

  test('useToasts hook returns empty/noop default values', () => {
    const { result } = renderHook(() => useToasts(), { wrapper: ProviderWrapper })
    act(() => {
      const toastId = result.current.addToast('Cheers!')
      result.current.updateToast(toastId, {
        content: 'Cheers?',
      })
      result.current.removeToast(toastId)
      result.current.removeAllToasts()
      result.current.addToast('Cheers again!')
    })

    expect(result.current.toasts.length).toBe(1)
    expect(result.current.toasts).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "Cheers again!",
          "id": "3",
          "type": "info",
        },
      ]
    `)
  })

  test('shows values from provider', () => {
    const toast = {
      id: 'what',
      content: 'Cheers!',
      type: ToastType.INFO,
      autoDismiss: false,
    }

    render(
      <Context.Provider
        value={{
          addToast: () => '',
          removeToast: noop,
          removeAllToasts: noop,
          updateToast: noop,
          toasts: [toast],
        }}
      >
        <ToastConsumer>
          {({ toasts }) =>
            toasts.map(({ id, content }) => (
              <div key={id} data-testid={id}>
                {content}
              </div>
            ))
          }
        </ToastConsumer>
      </Context.Provider>
    )
    expect(screen.getByTestId(toast.id)).toHaveTextContent(toast.content)
  })
})
