import React, { useState } from 'react'
import { ToastProvider, ToastProviderProps } from 'react-cooked-bread'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Demo } from 'components/demo'
import { Box, Flex } from 'reflexbox'
import { newWindowProps } from 'utils/window'
import { Note } from 'components/note'
import { rootOptions, contentOptions, customContentOptions } from 'components/demo'

const getOptions = <T extends { key: string }>(selectedKey: string, options: T[]) =>
  options.filter(({ key }) => key === selectedKey)[0]

const IndexPage = () => {
  const [selectedToastRoot, setSelectToastRoot] = useState(rootOptions[0])
  const [selectedToastContent, setSelectedToastContent] = useState(contentOptions[0])

  return (
    <Layout>
      <Head title="Docs" />
      <ToastProvider
        {...(selectedToastRoot.providerProps as ToastProviderProps)}
        {...selectedToastContent.providerProps}
      >
        <Note>
          <p>
            I f*ing love toast, what absolute genius took a bite of bread and was like &quot;cook it
            again&quot;, unreal -{' '}
            <a
              href="https://twitter.com/LoserCrew/status/1039294149667770368?s=20"
              {...newWindowProps}
            >
              Josh
            </a>
          </p>
        </Note>
        <h1>Quick Start</h1>
        <h2>Provider</h2>
        <p>Add the toast provider to a top-level position in your app.</p>
        <Demo getContent={getContent} providerProps={{ ...toastRootProps, ...toastContentProps }}>
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
                css={{
                  fontSize: 18,
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
                  setSelectedToastContent(getOptions(ev.currentTarget.value, contentOptions))
                }}
                css={{
                  fontSize: 18,
                }}
              >
                {contentOptions.map(({ key, name }) => (
                  <option key={key} value={key}>
                    {name}
                  </option>
                ))}
              </select>
            </Box>
          </Flex>
        </Demo>
      </ToastProvider>
    </Layout>
  )
}

export default IndexPage
