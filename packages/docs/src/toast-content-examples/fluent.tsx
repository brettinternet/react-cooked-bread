/**
 * MessageBar component from Fluent UI
 * @source https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react
 */
/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { ToastContentProps, ToastTypeOption } from 'react-cooked-bread'
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar'
import { MessageBarButton, IButtonProps } from '@fluentui/react/lib/Button'
import { initializeIcons } from '@uifabric/icons'

import { getRandom } from 'utils/content'
import { ProgressBar } from './progress-bar'

initializeIcons()

const getMessageBarType = (type: ToastTypeOption) => {
  switch (type) {
    case 'success':
      return MessageBarType.success
    case 'warning':
      return MessageBarType.warning
    case 'error':
      return MessageBarType.error
    case 'info':
    default:
      return MessageBarType.info
  }
}

export interface CustomFluentUiContentProps {
  actions?: IButtonProps[]
  truncated?: boolean
  isMultiline?: boolean
}

export const FluentUiContent: React.FC<ToastContentProps & CustomFluentUiContentProps> = ({
  children,
  type,
  isRunning,
  autoDismiss,
  timeout,
  onDismiss,
  actions,
  truncated,
  isMultiline,
}) => (
  <div css={{ position: 'relative', marginBottom: '0.5rem' }}>
    <MessageBar
      messageBarType={getMessageBarType(type)}
      onDismiss={() => {
        onDismiss()
      }}
      dismissButtonAriaLabel="Close"
      overflowButtonAriaLabel="See more"
      truncated={truncated}
      isMultiline={isMultiline || !truncated}
      actions={
        actions?.length ? (
          <div>
            {actions.map((buttonProps, index) => (
              <MessageBarButton key={index} {...buttonProps} />
            ))}
          </div>
        ) : undefined
      }
      styles={{
        root: {
          width: 350,
        },
      }}
    >
      {children}
    </MessageBar>
    <ProgressBar isHidden={!autoDismiss} timeout={timeout} isRunning={isRunning} />
  </div>
)

export const getFluentUiToastProps = (content: React.ReactNode) => {
  const isLongString = typeof content === 'string' && content.length > 100
  return {
    isMultiline: getRandom([true, false]),
    truncated: isLongString && getRandom([true, false]),
    actions: getRandom<CustomFluentUiContentProps['actions']>(
      [
        [
          {
            text: 'Yes',
            onClick: () => {
              console.log('Yes')
            },
          },
          {
            text: 'No',
            onClick: () => {
              console.log('No')
            },
          },
        ],
      ].concat(new Array(4))
    ),
  }
}

export const fluentUiToastOptions = {
  options: {
    isMultiline: true,
    truncated: false,
    actions: [
      {
        text: 'Cats',
        onClick: () => {
          console.log('Cats')
        },
      },
      {
        text: 'Dogs',
        onClick: () => {
          console.log('Dogs')
        },
      },
    ],
  },
  str: `
      // custom props
      isMultiline: true,
      truncated: false,
      actions: [
        {
          text: 'Cats',
          onClick: () => {
            console.log('Cats')
          },
        },
        {
          text: 'Dogs',
          onClick: () => {
            console.log('Dogs')
          },
        },
      ],`,
}
