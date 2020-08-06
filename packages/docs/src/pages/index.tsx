import React, { useState } from 'react'
import {
  SlideShrinkToastRoot,
  FadeToastRoot,
  GlossyToastContent,
  BootstrapToastContent,
  ClassicToastContent,
} from 'react-cooked-bread'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Demo } from 'components/demo'
import { Box, Flex } from 'reflexbox'
import { newWindowProps } from 'utils/window'
import { Note } from 'components/note'
import { getRandomPhrase, getRandomShortPhrase } from 'utils/content'

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

const rootOptions = [
  {
    key: 'slide-shrink',
    name: 'Slide shrink',
    props: {
      toastRoot: SlideShrinkToastRoot,
    },
  },
  {
    key: 'fade',
    name: 'Fade',
    props: {
      toastRoot: FadeToastRoot,
    },
  },
]

const contentOptions = [
  {
    key: 'glossy',
    name: 'Glossy',
    props: {
      toastContent: GlossyToastContent,
    },
  },
  {
    key: 'classic',
    name: 'Classic',
    props: {
      toastContent: ClassicToastContent,
    },
  },
  {
    key: 'bootstrap',
    name: 'Bootstrap',
    props: {
      toastContent: BootstrapToastContent,
    },
  },
]

const getOptions = <T extends { key: string }>(selectedKey: string, options: T[]) =>
  options.filter(({ key }) => key === selectedKey)[0]

const IndexPage = () => {
  const [toastRootProps, setToastRootProps] = useState(rootOptions[0].props)
  const [toastContentProps, setToastContentProps] = useState(contentOptions[0].props)

  return (
    <Layout>
      <Head title="Docs" />
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
      <h1>Demo</h1>
      <Box my={4}>
        <Flex alignItems="center" mb={4}>
          <Box mr={3}>
            <Box mb={2}>
              <label htmlFor="toast-root-select">Root style:</label>
            </Box>
            <select
              id="toast-root-select"
              onChange={(ev) => {
                setToastRootProps(getOptions(ev.currentTarget.value, rootOptions).props)
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
                setToastContentProps(getOptions(ev.currentTarget.value, contentOptions).props)
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
        <Demo getContent={getContent} providerProps={{ ...toastRootProps, ...toastContentProps }} />
      </Box>
    </Layout>
  )
}

export default IndexPage
