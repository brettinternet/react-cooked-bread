import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'

import { renderWithProvider, setupPortals, MountCallback } from './helpers'
import { ToastProvider } from '../src/provider'
import { ToastContainer, ContainerProps } from '../src/container'
import { SlideShrinkToastRoot } from '../src/toast-root'
import { ToastConsumer } from '../src/context'

describe('Provider', () => {
  jest.useFakeTimers()

  beforeAll(() => {
    setupPortals()
  })

  test('should render a container', () => {
    const testId2 = 'container'
    render(
      <div data-testid={testId2}>
        <ToastProvider toastRoot={SlideShrinkToastRoot}>
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
      <ToastProvider container={Container} toastRoot={SlideShrinkToastRoot}>
        <div />
      </ToastProvider>
    )
    expect(screen.getByTestId(testId1)).not.toBeEmptyDOMElement()
  })

  test('should render toasts', () => {
    const contents = ['Cheers!', 'Cheers?']
    renderWithProvider(
      <ToastConsumer>
        {(context) => (
          <MountCallback
            callback={[
              () => {
                context.addToast(contents[0], {
                  type: 'info',
                })
              },
              () => {
                context.addToast(contents[1], {
                  type: 'error',
                })
              },
            ]}
          />
        )}
      </ToastConsumer>
    )
    expect(screen.getByRole('status')).toHaveTextContent(contents[0])
    expect(screen.getByRole('alert')).toHaveTextContent(contents[1])
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
