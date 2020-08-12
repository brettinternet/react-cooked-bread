import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, PageProps } from 'gatsby'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Flex, Box } from 'reflexbox'
import { MDXProvider } from '@mdx-js/react'

import { Header } from 'components/header'
import { getTheme } from 'utils/theme'
import {
  headerHeight,
  footerHeight,
  appWidth as maxWidth,
  menuMaxWidth,
  createMediaQuery,
  breakpoints,
  getGlobalStyles,
} from 'utils/styles'
import { AppContext, defaultThemeType } from 'utils/app.context'
import { Footer } from 'components/footer'
import { Menu } from 'components/menu'
import { SkipLink } from 'components/skip-link'
import { EditLink } from 'components/edit-link'
import { useStorage } from 'utils/storage.hook'
import { LocalStorageKey } from 'utils/storage'
import { getPrismStyles } from 'utils/prism-theme'
import { Head } from 'components/head'
import { Note } from 'components/note'

export const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        pathPrefix
        siteMetadata {
          title
          repoUrl
        }
      }
    }
  `)

  const [themeType, setThemeType] = useStorage(LocalStorageKey.THEME_TYPE, defaultThemeType)
  const { title, repoUrl } = site.siteMetadata

  return (
    <ThemeProvider theme={getTheme(themeType)}>
      <AppContext.Provider value={{ themeType, setThemeType }}>
        <Global styles={getGlobalStyles} />
        <Global styles={getPrismStyles} />
        <SkipLink />
        <Header siteTitle={title} repoUrl={repoUrl} />
        <Flex
          as="main"
          flexGrow={1}
          mx="auto"
          css={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
          flexDirection={['column', 'column', 'row']}
        >
          <Menu />
          <Box
            as="article"
            id="content"
            mx="auto"
            px={[2, 2, 3]}
            css={{
              maxWidth,
              [createMediaQuery(breakpoints[5])]: {
                transform: `translateX(-${menuMaxWidth / 2}px)`,
              },
            }}
            width={1}
          >
            {children}
          </Box>
        </Flex>
        <Footer pathPrefix={site.pathPrefix} />
      </AppContext.Provider>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

interface MDXLayoutProps extends PageProps {
  pageContext: {
    frontmatter: {
      title: string
    }
  }
}

const MDXLayout: React.FC<MDXLayoutProps> = ({ children, pageContext }) => (
  <Layout>
    <Head title={pageContext.frontmatter.title} />
    <MDXProvider components={{ Note }}>
      {children}
      <EditLink />
    </MDXProvider>
  </Layout>
)

export default MDXLayout
