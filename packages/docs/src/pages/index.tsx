import React from 'react'

import { Layout } from 'components/layout'
import { Head } from 'components/head'
import { newWindowProps } from 'utils/window'
import { Note } from 'components/note'
import { Demo } from 'components/demo'
import { HeaderLink } from 'components/header-link'

const IndexPage = () => (
  <Layout>
    <Head title="Demo" />
    <Note>
      <p>
        I f*ing love toast, what absolute genius took a bite of bread and was like &quot;cook it
        again&quot;, unreal -{' '}
        <a href="https://twitter.com/LoserCrew/status/1039294149667770368?s=20" {...newWindowProps}>
          Josh
        </a>
      </p>
    </Note>
    <HeaderLink id="demo" as="h1">
      Demo
    </HeaderLink>
    <Demo />
  </Layout>
)

export default IndexPage
