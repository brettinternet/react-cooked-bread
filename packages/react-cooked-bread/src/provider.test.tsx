import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProvider, setupPortals, MountCallback } from '../test/helpers'
import { ToastProvider } from './provider'
import { ToastContainer, ContainerProps } from './container'
import { DefaultToastRoot } from './toast-root'
import { ToastConsumer } from './context'

describe('Provider', () => {
  jest.useFakeTimers()

  beforeAll(() => {
    setupPortals()
  })

  test('should render a container', () => {
    const testId2 = 'container'
    render(
      <div data-testid={testId2}>
        <ToastProvider toastRoot={DefaultToastRoot}>
          <div />
        </ToastProvider>
      </div>
    )

    expect(screen.getByTestId(testId2)).not.toBeEmptyDOMElement()
  })

  test('should render a custom container', () => {
    const testId1 = 'container'
    const Container: React.FC<ContainerProps> = ({ children, ...props }) => (
      <ToastContainer {...props} data-testid={testId1}>
        {children}
      </ToastContainer>
    )

    render(
      <ToastProvider container={Container} toastRoot={DefaultToastRoot}>
        <div />
      </ToastProvider>
    )
    expect(screen.getByTestId(testId1)).not.toBeEmptyDOMElement()
  })

  test('should render an auto-dismissing and a persistent, dismissable toast', () => {
    const contents = ['Cheers!', 'Cheers?']
    renderWithProvider(
      <ToastConsumer>
        {(context) => (
          <MountCallback
            callback={[
              () => {
                context.addToast(contents[0], {
                  autoDismiss: true,
                })
              },
              () => {
                context.addToast(contents[1], {
                  autoDismiss: false,
                })
              },
            ]}
          />
        )}
      </ToastConsumer>
    )
    expect(screen.getByRole('alert')).toHaveTextContent(contents[0])
    expect(screen.getByRole('alertdialog')).toHaveTextContent(contents[1])
    screen.getAllByRole('document').forEach((el, i) => {
      expect(el).toHaveTextContent(contents[i])
    })
  })

  test('should invoke an onDismiss callback and remove the toast when the close button is clicked', async () => {
    const handleDismiss = jest.fn()
    const content = 'Cheers!'
    const { container } = renderWithProvider(
      <ToastConsumer>
        {(context) => (
          <MountCallback
            callback={() => {
              context.addToast(content, {
                onDismiss: handleDismiss,
              })
            }}
          />
        )}
      </ToastConsumer>
    )
    const button = container.querySelector('[aria-label="close"]')
    expect(button).toBeTruthy()
    fireEvent.click(button!) // eslint-disable-line @typescript-eslint/no-non-null-assertion
    expect(handleDismiss).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(screen.queryByRole('document')).not.toBeInTheDocument()
    })
  })
})
