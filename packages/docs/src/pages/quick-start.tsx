/** @jsx jsx */
import React, { useState } from 'react'
import { jsx } from '@emotion/core'
import { ToastProvider, useToasts, ToastTypeOption, AddToastOptions } from 'react-cooked-bread'
import { Link } from 'gatsby'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Box, Flex } from 'reflexbox'
import { Code } from 'components/code'
import { getOption, rootOptions, contentOptions, customContentOptions } from 'components/demo'
import { HeaderLink } from 'components/header-link'
import { EditLink } from 'components/edit-link'

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

const QuickStartPage = () => {
  const [selectedToastRoot, setSelectToastRoot] = useState(rootOptions[0])
  const [selectedToastContent, setSelectedToastContent] = useState(contentOptions[0])
  const [toastContent, setToastContent] = useState('Wow!')
  const [toastType, setToastType] = useState(typeOptions[0])
  const [autoDismiss, setAutoDismiss] = useState(true)

  return (
    <Layout>
      <Head title="Docs" />
      <ToastProvider {...selectedToastRoot.providerProps} {...selectedToastContent.providerProps}>
        <HeaderLink id="quick-start" as="h1">
          Quick Start
        </HeaderLink>
        <HeaderLink id="provider" as="h2">
          Provider
        </HeaderLink>
        <Flex alignItems="center" mb={3}>
          <Box mr={3}>
            <Box mb={2}>
              <label htmlFor="toast-root-select">Root style:</label>
            </Box>
            <select
              id="toast-root-select"
              onChange={(ev) => {
                setSelectToastRoot(getOption(ev.currentTarget.value, rootOptions))
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
                  getOption(ev.currentTarget.value, contentOptions) ||
                  getOption(ev.currentTarget.value, customContentOptions)
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
        <HeaderLink id="toasts" as="h2">
          Toasts
        </HeaderLink>
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
        <p>
          Consumers, such as the <Link to="/hook">hook</Link>, must be descendants of the provider.
        </p>
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
        <EditLink ext="tsx" />
      </ToastProvider>
    </Layout>
  )
}

export default QuickStartPage
