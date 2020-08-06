/** @jsx jsx */
import React, { useState } from 'react'
import { ToastProvider, ToastProviderProps, Placement, PlacementOption } from 'react-cooked-bread'
import { jsx } from '@emotion/core'

import { ToastCreator, ToastCreatorProps } from './toast-creator'
import { Flex, Box } from 'reflexbox'

type DemoProps = {
  providerProps: ToastProviderProps
  getContent: ToastCreatorProps['getContent']
}

export const Demo: React.FC<DemoProps> = ({ providerProps, ...creatorProps }) => {
  const [placement, setPlacement] = useState<PlacementOption>(Placement.BOTTOM_RIGHT)
  const [pauseAllOnHover, setPauseAllOnHover] = useState(false)
  const [pauseOnFocusLoss, setPauseOnFocusLoss] = useState(false)
  const [reverseColumn, setReverseColumn] = useState(false)
  const [maxToasts, setMaxToasts] = useState('')

  return (
    <ToastProvider
      placement={placement}
      pauseAllOnHover={pauseAllOnHover}
      pauseOnFocusLoss={pauseOnFocusLoss}
      reverseColumn={reverseColumn}
      maxToasts={maxToasts ? parseInt(maxToasts) : undefined}
      {...providerProps}
    >
      <ToastCreator {...creatorProps} placement={placement} setPlacement={setPlacement}>
        <Flex alignItems="center" mb={3}>
          <Flex mr={3}>
            <input
              type="checkbox"
              id="toast-option-pause-all-on-hover"
              checked={pauseAllOnHover}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                setPauseAllOnHover(ev.currentTarget.checked)
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-pause-all-on-hover">pauseAllOnHover</label>
          </Flex>

          <Flex mr={3}>
            <input
              type="checkbox"
              id="toast-option-pause-on-focus-loss"
              checked={pauseOnFocusLoss}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                setPauseOnFocusLoss(ev.currentTarget.checked)
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-pause-on-focus-loss">pauseOnFocusLoss</label>
          </Flex>

          <Flex mr={3}>
            <input
              type="checkbox"
              id="toast-option-reverse-container"
              checked={reverseColumn}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                setReverseColumn(ev.currentTarget.checked)
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-reverse-container">reverseColumn</label>
          </Flex>

          <Flex alignItems="center" mr={3}>
            <Box mr={2}>
              <label htmlFor="toast-option-max-toasts">maxToasts:</label>
            </Box>
            <input
              type="number"
              id="toast-option-max-toasts"
              min="0"
              max="9"
              value={maxToasts}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                setMaxToasts(ev.currentTarget.value)
              }}
              css={{
                marginRight: '0.5rem',
                width: 35,
              }}
            />
          </Flex>
        </Flex>
      </ToastCreator>
    </ToastProvider>
  )
}
