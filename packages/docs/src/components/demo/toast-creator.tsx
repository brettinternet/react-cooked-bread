/** @jsx jsx */
import React, { useState, useCallback, Fragment } from 'react'
import { useToasts, ToastTypeOption, AddToastOptions, PlacementOption } from 'react-cooked-bread'
import { Flex, Box } from 'reflexbox'
import { jsx } from '@emotion/core'
import { capitalize } from 'lodash'

import { getRandomPhrase, getRandomShortPhrase, getRandomWord, getRandom } from 'utils/content'
import { PlacementSelect, placements } from './placement-select'

const toastTypes: ToastTypeOption[] = ['success', 'info', 'warning', 'error']

const actionColors = {
  success: '#dff6dd',
  info: '#deecf9',
  warning: '#fff4ce',
  error: '#fde7e9',
}

export type ToastCreatorProps = {
  getContent?: (phrase: string) => React.ReactNode
  getToastProps?: (content: React.ReactNode) => Partial<AddToastOptions>
  placement: PlacementOption
  setPlacement: (placement: PlacementOption) => void
}

export const ToastCreator: React.FC<ToastCreatorProps> = ({
  children,
  getContent = getRandomPhrase,
  getToastProps,
  placement,
  setPlacement,
}) => {
  const [autoDismiss, setAutoDismiss] = useState(true)
  const { addToast, removeToast, removeAllToasts, updateToast, toasts } = useToasts()

  const createToast = useCallback(
    (type: ToastTypeOption) => {
      const includeTitle = getRandom([true, false])
      const includeSubtitle = getRandom([true, false])
      const content = getContent(getRandomPhrase())
      addToast(content, {
        autoDismiss,
        type,
        title: includeTitle ? getRandomShortPhrase() : undefined,
        subtitle: includeTitle && includeSubtitle ? getRandomWord() : undefined,
        ...(getToastProps ? getToastProps(content) : {}),
      })
    },
    [addToast, autoDismiss]
  )

  return (
    <div>
      <Flex flexWrap={['wrap', 'wrap', 'wrap', 'wrap', 'wrap', 'nowrap']} mb={3}>
        <Flex alignItems="center" flexWrap="wrap" pr={[0, 0, 0, 0, 0, 3]}>
          {toastTypes.map((type) => (
            <Box key={type} mr={2} mb={3}>
              <button
                onClick={() => {
                  createToast(type)
                }}
                css={{
                  background: actionColors[type],
                  color: 'black',
                }}
              >
                {capitalize(type)}
              </button>
            </Box>
          ))}
        </Flex>

        <Flex alignItems="center" pl={[0, 0, 0, 0, 0, 3]}>
          <Flex mr={3} mb={3}>
            <input
              type="checkbox"
              id="toast-option-auto-dismiss"
              checked={autoDismiss}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                setAutoDismiss(ev.currentTarget.checked)
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-auto-dismiss">autoDismiss</label>
          </Flex>
        </Flex>
      </Flex>

      {children}

      <Flex flexWrap={['wrap', 'wrap', 'wrap', 'wrap', 'wrap', 'nowrap']} mb={4}>
        <Box mb={[3, 3, 3, 3, 3, 0]} pr={[0, 0, 0, 0, 0, 3]}>
          <PlacementSelect
            placement={placement}
            setPlacement={(newPlacement) => {
              toasts.forEach(({ id }) => {
                if (placements.includes(id as PlacementOption)) {
                  updateToast(id, {
                    transitionDuration: 0,
                  })
                  setTimeout(() => {
                    removeToast(id)
                  })
                }
              })
              setTimeout(() => {
                addToast(newPlacement, {
                  id: newPlacement,
                  autoDismiss,
                  type: 'info',
                })
                setPlacement(newPlacement)
              })
            }}
          />
        </Box>

        <Box pl={[0, 0, 0, 0, 0, 3]}>
          <Box mb={2}>Active toasts: {toasts.length}</Box>

          <Flex alignItems="center" flexWrap="wrap">
            <Box mr={2} mb={3}>
              <button
                disabled={!toasts.length}
                onClick={() => {
                  removeAllToasts()
                }}
                css={{
                  padding: '0.25rem 0.75rem',
                }}
              >
                Remove All
              </button>
            </Box>

            <Box mr={2} mb={3}>
              <button
                disabled={!toasts.length}
                onClick={() => {
                  const { id } = toasts[toasts.length - 1]
                  if (id) {
                    removeToast(id)
                  }
                }}
              >
                Remove Recent
              </button>
            </Box>

            <Box mr={2} mb={3}>
              <button
                disabled={!toasts.length}
                onClick={() => {
                  const { id } = toasts[0]
                  if (id) {
                    removeToast(id)
                  }
                }}
              >
                Remove Last
              </button>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </div>
  )
}
