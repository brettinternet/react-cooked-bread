import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { Global } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import { Flex, Box } from 'reflexbox'

import { Header } from 'components/header'
import { getTheme, getGlobalStyles } from 'utils/theme'
import {
  headerHeight,
  footerHeight,
  appWidth as maxWidth,
  menuMaxWidth,
  createMediaQuery,
  breakpoints,
} from 'utils/styles'
import { AppContext, systemThemeType } from 'utils/app.context'
import { Footer } from 'components/footer'
import { Menu } from 'components/menu'
import { useStorage } from 'utils/storage.hook'
import { LocalStorageKey } from 'utils/storage'

export const Layout: React.FC = ({ children }) => {
  const { site } = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        pathPrefix
        siteMetadata {
          title
          repoUrl
          version
        }
      }
    }
  `)

  const [themeType, setThemeType] = useStorage(LocalStorageKey.THEME_TYPE, systemThemeType)
  const { title, repoUrl, version } = site.siteMetadata

  return (
    <ThemeProvider theme={getTheme(themeType)}>
      <AppContext.Provider value={{ themeType, setThemeType }}>
        <Global styles={getGlobalStyles} />
        <Header siteTitle={title} repoUrl={repoUrl} version={version} />
        <Flex
          as="main"
          flexGrow={1}
          mx="auto"
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          css={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
        >
          <Menu pathPrefix={site.pathPrefix} />
          <Box
            as="article"
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
        <Footer pathPrefix={site.pathPrefix} repoUrl={repoUrl} />
      </AppContext.Provider>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
