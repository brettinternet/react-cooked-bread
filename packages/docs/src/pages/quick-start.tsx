/** @jsx jsx */
import React, { useState } from 'react'
import { jsx } from '@emotion/core'
import {
  ToastProvider,
  useToasts,
  ToastTypeOption,
  ToastProviderProps,
  AddToastOptions,
} from 'react-cooked-bread'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Box, Flex } from 'reflexbox'
import { Code } from 'components/code'
import { rootOptions, contentOptions, customContentOptions } from 'components/demo'

const typeOptions = ['success', 'info', 'warning', 'error']

type CreatorProps = {
  content: string
  options: AddToastOptions
}

const Creator: React.FC<CreatorProps> = ({ content, options }) => {
  const { addToast } = useToasts()
  const handleRun = () => {
    addToast(content, options)
  }
  const type = options?.type
  return (
    <button
      onClick={handleRun}
      css={(theme) => (type ? { color: 'black', background: theme.colors[type] } : {})}
    >
      Run
    </button>
  )
}

const getOptions = <T extends { key: string }>(selectedKey: string, options: T[]) =>
  options.filter(({ key }) => key === selectedKey)[0]

const QuickStartPage = () => {
  const [selectedToastRoot, setSelectToastRoot] = useState(rootOptions[0])
  const [selectedToastContent, setSelectedToastContent] = useState(contentOptions[0])
  const [toastContent, setToastContent] = useState('Wow!')
  const [toastType, setToastType] = useState(typeOptions[0])
  const [autoDismiss, setAutoDismiss] = useState(true)

  return (
    <Layout>
      <Head title="Docs" />
      <ToastProvider
        {...(selectedToastRoot.providerProps as ToastProviderProps)}
        {...selectedToastContent.providerProps}
      >
        <h1>Quick Start</h1>
        <h2>Provider</h2>
        <Flex alignItems="center" mb={3}>
          <Box mr={3}>
            <Box mb={2}>
              <label htmlFor="toast-root-select">Root style:</label>
            </Box>
            <select
              id="toast-root-select"
              onChange={(ev) => {
                setSelectToastRoot(getOptions(ev.currentTarget.value, rootOptions))
              }}
            >
              {rootOptions.map(({ key, name }) => (
                <option key={key} value={key}>
                  {name}
                </option>
              ))}
            </select>
          </Box>

          <Box>
            <Box mb={2}>
              <label htmlFor="toast-content-select">Content style:</label>
            </Box>
            <select
              id="toast-content-select"
              onChange={(ev) => {
                const options =
                  getOptions(ev.currentTarget.value, contentOptions) ||
                  getOptions(ev.currentTarget.value, customContentOptions)
                setSelectedToastContent(options)
              }}
            >
              <optgroup label="From library">
                {contentOptions.map(({ key, name }) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Third party libraries">
                {customContentOptions.map(({ key, name }) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </optgroup>
            </select>
          </Box>
        </Flex>
        <p>Add the toast provider to a top-level position in your app.</p>
        <Code>{`import {
  ToastProvider, // Provider
  ${selectedToastRoot.str}, // Toast shell (animates transitions)${
          !selectedToastContent.custom
            ? `
  ${selectedToastContent.str}, // Inner content (icons, buttons, text, color)`
            : ''
        }
} from 'react-cooked-bread'

const MyApp = () => (
  <ToastProvider toastRoot={${selectedToastRoot.str}} toastContent={${selectedToastContent.str}}>
    <Example />
  </ToastProvider>
)`}</Code>
        <h2>Toast</h2>
        <p>Creat a toast!</p>
        <Flex justifyContent="space-between" flexWrap="wrap">
          <Flex alignItems="center" flexWrap="wrap">
            <Box mr={3} mb={3}>
              <input
                value={toastContent}
                placeholder="message content"
                type="text"
                onChange={(ev) => {
                  setToastContent(ev.currentTarget.value)
                }}
              />
            </Box>
            <Box mr={3} mb={3}>
              <select
                id="toast-type-select"
                onChange={(ev) => {
                  setToastType(ev.currentTarget.value)
                }}
              >
                {typeOptions.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Box>
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
          <Box>
            <Creator
              content={toastContent}
              options={{
                type: toastType as ToastTypeOption,
                autoDismiss,
                ...selectedToastContent.toastOptions?.options,
              }}
            />
          </Box>
        </Flex>
        <Code>{`import { useToasts } from 'react-cooked-bread'

const Example = () => {
  const { addToast } = useToasts()

  const handleClick = async () => {
    addToast('${toastContent}', {
      type: '${toastType}',${
          autoDismiss
            ? `
      autoDismiss: true,`
            : ''
        }${selectedToastContent.toastOptions?.str || ''}
    })
  }

  return <button onClick={handleClick}>Run</button>
}`}</Code>
      </ToastProvider>
    </Layout>
  )
}

export default QuickStartPage
