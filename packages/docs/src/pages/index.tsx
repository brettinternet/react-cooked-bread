import React from 'react'
import { ToastProvider, DefaultToastRoot, DefaultToastContent } from 'react-cooked-bread'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Library } from 'components/library'
import { Box } from 'reflexbox'
import { newWindowProps } from 'utils/window'

const IndexPage = () => {
  return (
    <Layout>
      <Head title="docs" />
      <blockquote>
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
      </blockquote>
      <h1>Demo</h1>
      <Box my={4}>
        <ToastProvider toastRoot={DefaultToastRoot} toastContent={DefaultToastContent}>
          <Library full />
        </ToastProvider>
      </Box>
    </Layout>
  )
}

export default IndexPage
