import React from 'react'
import { ToastProvider, DefaultToastRoot, DefaultToastContent } from 'react-cooked-bread'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { Library } from 'components/library'
import { Box } from 'reflexbox'

const IndexPage = () => {
  return (
    <Layout>
      <Head title="docs" />
      <h1>Demo</h1>
      <Box my={4}>
        <ToastProvider toastRoot={DefaultToastRoot} toastContent={DefaultToastContent}>
          <Library />
        </ToastProvider>
      </Box>
    </Layout>
  )
}

export default IndexPage
