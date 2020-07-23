/** @jsx jsx */
import React, { useState } from 'react'
import { useToasts, ToastType } from 'react-cooked-bread'
import { Flex, Box } from 'reflexbox'
import { jsx } from '@emotion/core'
import { capitalize } from 'lodash'

import { getRandomPhrase } from 'utils/content'

const toastTypes: ToastType[] = ['success', 'info', 'warning', 'error']

export const Library: React.FC = () => {
  const [toastType, setToastType] = useState<ToastType>('success')
  const [autoDismiss, setAutoDismiss] = useState(true)
  const { addToast, removeToast, removeAllToasts, toasts } = useToasts()

  return (
    <Box>
      <Flex alignItems="center" mb={3}>
        {toastTypes.map((type) => {
          const id = `toast-option-${type}`
          return (
            <Box key={id} mr={2}>
              <input
                type="radio"
                id={id}
                name={type}
                value={type}
                checked={toastType === type}
                onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                  setToastType(ev.currentTarget.value as ToastType)
                }}
              />
              <label htmlFor={id}>{capitalize(type)}</label>
            </Box>
          )
        })}
      </Flex>

      <Flex alignItems="center" mb={4}>
        <Box mr={3}>
          <button
            onClick={() => {
              addToast(getRandomPhrase(), {
                autoDismiss,
                type: toastType,
              })
            }}
          >
            Add
          </button>
        </Box>

        <Box mr={3}>
          <input
            type="checkbox"
            id="toast-option-auto-dismiss"
            name="auto-dismiss"
            checked={autoDismiss}
            onChange={(ev: React.FormEvent<HTMLInputElement>) => {
              setAutoDismiss(ev.currentTarget.checked)
            }}
            css={{
              marginRight: '0.5rem',
            }}
          />
          <label htmlFor="toast-option-auto-dismiss">Auto dismiss</label>
        </Box>
      </Flex>

      <Flex alignItems="center">
        <Box mr={3}>
          <button
            disabled={!toasts.length}
            onClick={() => {
              removeAllToasts()
            }}
          >
            Remove All
          </button>
        </Box>

        <Box mr={3}>
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

        <Box mr={3}>
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

        <div>Active toasts: {toasts.length}</div>
      </Flex>
    </Box>
  )
}
