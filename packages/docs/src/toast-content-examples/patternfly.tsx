/**
 * MessageBar component from Fluent UI
 * @source https://github.com/microsoft/fluentui/tree/master/packages/office-ui-fabric-react
 */
/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { ToastContentProps, ToastTypeOption } from 'react-cooked-bread'
import {
  Alert,
  AlertActionCloseButton,
  AlertActionLink,
  AlertActionLinkProps,
  AlertVariant,
  // @ts-ignore
} from '@patternfly/react-core/dist/js/components/Alert'
// import '@patternfly/react-core/dist/styles/base.css'

import { getRandom } from 'utils/content'
// import { ProgressBar } from './progress-bar'

const getAlertVariant = (type: ToastTypeOption) => {
  switch (type) {
    case 'success':
      return AlertVariant.success
    case 'warning':
      return AlertVariant.warning
    case 'error':
      return AlertVariant.danger
    case 'info':
    default:
      return AlertVariant.info
  }
}

export interface CustomPatternflyContentProps {
  actions?: AlertActionLinkProps[]
}

export const PatternflyContent: React.FC<ToastContentProps> = ({
  children,
  type,
  isRunning,
  autoDismiss,
  timeout,
  onDismiss,
  title,
  actions,
}) => {
  const variant = getAlertVariant(type)
  return (
    <div css={{ position: 'relative', marginBottom: '1rem', width: 400 }}>
      <Alert
        css={{
          '.pf-c-alert__title': {
            textTransform: 'capitalize',
          },
        }}
        variant={variant}
        title={title || variant}
        actionClose={<AlertActionCloseButton onClose={onDismiss} />}
        actionLinks={
          <React.Fragment>
            {actions?.map((actionProps: AlertActionLinkProps) => (
              <AlertActionLink {...actionProps} />
            ))}
          </React.Fragment>
        }
      >
        {children}
      </Alert>
    </div>
  )
}

export const getPatternflyToastProps = (content: React.ReactNode) => {
  const isLongString = typeof content === 'string' && content.length > 100
  return {
    isMultiline: getRandom([true, false]),
    truncated: isLongString && getRandom([true, false]),
    actions: getRandom<CustomPatternflyContentProps['actions']>(
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

export const patternflyToastOptions = {
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
