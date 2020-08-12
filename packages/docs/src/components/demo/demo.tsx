/** @jsx jsx */
import React, { useState, Fragment, useCallback } from 'react'
import {
  ToastProvider,
  ToastProviderProps,
  Placement,
  useToasts,
  ToastTypeOption,
  PlacementOption,
} from 'react-cooked-bread'
import { jsx } from '@emotion/core'
import { Flex, Box } from 'reflexbox'
import { capitalize } from 'lodash'
import { Link } from 'gatsby'

import { getOption, rootOptions, contentOptions, customContentOptions } from 'components/demo'
import { HeaderLink } from 'components/header-link'
import { getRandomPhrase, getRandomShortPhrase, getRandomWord, getRandom } from 'utils/content'

import { PlacementSelect, placements } from './placement-select'

const ExampleReactNode = () => {
  const phrase = getRandomShortPhrase()
  return (
    <Box my={1}>
      <button
        onClick={() => {
          console.log(phrase)
        }}
      >
        {phrase}
      </button>
    </Box>
  )
}

const getContent = () => (Math.random() > 0.8 ? <ExampleReactNode /> : getRandomPhrase())

const actionColors = {
  success: '#dff6dd',
  info: '#deecf9',
  warning: '#fff4ce',
  error: '#fde7e9',
}

const toastTypes: ToastTypeOption[] = ['success', 'info', 'warning', 'error']

type LibraryProps = {
  providerProps: ToastProviderProps
  setProviderProps: React.Dispatch<React.SetStateAction<ToastProviderProps>>
}

const Library: React.FC<LibraryProps> = ({ providerProps, setProviderProps }) => {
  const [selectedToastContent, setSelectedToastContent] = useState(contentOptions[0])
  const { placement, pauseAllOnHover, pauseOnFocusLoss, reverseColumn, maxToasts } = providerProps
  const { addToast, removeToast, removeAllToasts, updateToast, toasts } = useToasts()
  const [autoDismiss, setAutoDismiss] = useState(true)
  const [timeoutValue, setTimeoutValue] = useState(5000)

  const patchProviderProps = (props: Partial<ToastProviderProps>) => {
    setProviderProps({ ...providerProps, ...props })
  }

  const createToast = useCallback(
    (type: ToastTypeOption) => {
      const includeTitle = getRandom([true, false])
      const includeSubtitle = getRandom([true, false])
      const { getToastProps } = selectedToastContent
      const content = selectedToastContent.custom ? getContent() : getRandomPhrase()
      addToast(content, {
        autoDismiss,
        timeout: timeoutValue,
        type,
        title: includeTitle ? getRandomShortPhrase() : undefined,
        subtitle: includeTitle && includeSubtitle ? getRandomWord() : undefined,
        ...(getToastProps ? getToastProps(content) : {}),
      })
    },
    [addToast, autoDismiss, timeoutValue]
  )

  return (
    <Fragment>
      <div>
        <div>
          <HeaderLink id="toasts" as="h2">
            Toasts
          </HeaderLink>
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

            <Flex alignItems="center" mr={3} mb={3}>
              <Box mr={2}>
                <label htmlFor="toast-option-timeout">timeout:</label>
              </Box>
              <input
                disabled={!autoDismiss}
                type="number"
                id="toast-option-timeout"
                min="1000"
                step="1000"
                max="10000"
                value={timeoutValue || '5000'}
                onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                  setTimeoutValue(parseInt(ev.currentTarget.value) || 5000)
                }}
                css={{
                  marginRight: '0.5rem',
                  width: 60,
                }}
              />
            </Flex>
          </Flex>
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
          <p>
            <Link to="/hook#props">View all props</Link>
          </p>
        </div>
        <HeaderLink id="provider" as="h2">
          Provider
        </HeaderLink>
        <Flex alignItems="center" flexWrap="wrap" mb={3}>
          <Box mr={3} mb={3}>
            <Box mb={2}>
              <label htmlFor="toast-root-select">Root theme:</label>
            </Box>
            <select
              id="toast-root-select"
              onChange={(ev) => {
                const options = getOption(ev.currentTarget.value, rootOptions)
                patchProviderProps(options.providerProps)
              }}
            >
              {rootOptions.map(({ key, name }) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </Box>

          <Box mr={3} mb={3}>
            <Box mb={2}>
              <label htmlFor="toast-content-select">Content theme:</label>
            </Box>
            <select
              id="toast-content-select"
              onChange={(ev) => {
                const options =
                  getOption(ev.currentTarget.value, contentOptions) ||
                  getOption(ev.currentTarget.value, customContentOptions)
                patchProviderProps(options.providerProps)
                setSelectedToastContent(options)
              }}
            >
              <optgroup label="react-cooked-bread">
                {contentOptions.map(({ key, name }) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Custom examples">
                {customContentOptions.map(({ key, name }) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </optgroup>
            </select>
          </Box>
        </Flex>
        <Flex flexWrap="wrap">
          <Flex mr={3} mb={3}>
            <input
              type="checkbox"
              id="toast-option-pause-all-on-hover"
              checked={pauseAllOnHover}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                patchProviderProps({ pauseAllOnHover: ev.currentTarget.checked })
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-pause-all-on-hover">pauseAllOnHover</label>
          </Flex>

          <Flex mr={3} mb={3}>
            <input
              type="checkbox"
              id="toast-option-pause-on-focus-loss"
              checked={pauseOnFocusLoss}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                patchProviderProps({ pauseOnFocusLoss: ev.currentTarget.checked })
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-pause-on-focus-loss">pauseOnFocusLoss</label>
          </Flex>

          <Flex mr={3} mb={3}>
            <input
              type="checkbox"
              id="toast-option-reverse-container"
              checked={reverseColumn}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                patchProviderProps({ reverseColumn: ev.currentTarget.checked })
              }}
              css={{
                marginRight: '0.5rem',
              }}
            />
            <label htmlFor="toast-option-reverse-container">reverseColumn</label>
          </Flex>

          <Flex alignItems="center" mr={3} mb={3}>
            <Box mr={2}>
              <label htmlFor="toast-option-max-toasts">maxToasts:</label>
            </Box>
            <input
              type="number"
              id="toast-option-max-toasts"
              min="0"
              max="9"
              value={maxToasts || ''}
              onChange={(ev: React.FormEvent<HTMLInputElement>) => {
                patchProviderProps({ maxToasts: parseInt(ev.currentTarget.value) })
              }}
              css={{
                marginRight: '0.5rem',
                width: 35,
              }}
            />
          </Flex>
        </Flex>
        <Box mb={4}>
          <PlacementSelect
            placement={placement || Placement.BOTTOM_RIGHT}
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
                patchProviderProps({ placement: newPlacement })
              })
            }}
          />
        </Box>
        <p>
          <Link to="/provider#props">View all props</Link>
        </p>
      </div>
    </Fragment>
  )
}

export const Demo: React.FC = () => {
  const [providerProps, setProviderProps] = useState<ToastProviderProps>({
    ...rootOptions[0].providerProps,
    ...contentOptions[0].providerProps,
    placement: Placement.BOTTOM_RIGHT,
    pauseAllOnHover: false,
    pauseOnFocusLoss: false,
    reverseColumn: false,
    maxToasts: 0,
  })
  return (
    <ToastProvider {...providerProps}>
      <Library providerProps={providerProps} setProviderProps={setProviderProps} />
    </ToastProvider>
  )
}
