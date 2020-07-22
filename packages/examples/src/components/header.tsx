/** @jsx jsx */
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Flex, Box } from 'reflexbox'
import { jsx } from '@emotion/core'

import { ThemeType } from 'utils/theme'
import { headerHeight as height } from 'utils/styles'
import GithubSvg from 'images/github.svg'
import { useApp } from 'utils/app.context'

interface HeaderProps {
  siteTitle: string
  repoUrl: string
  version: string
}

export const Header: React.FC<HeaderProps> = ({ siteTitle, repoUrl, version }) => {
  const { themeType, setThemeType } = useApp()

  const isDarkTheme = themeType === ThemeType.DARK

  return (
    <Flex as="header" alignItems="center" css={{ height }}>
      <Flex width={1} px={[2, 2, 3]} mx="auto">
        <Box mr="auto">
          <Box as="h1" fontSize={['1.4rem', '1.4rem', '1.4rem', '2rem']} css={{ margin: 0 }}>
            <Link
              to="/"
              css={(theme) => ({
                color: theme.colors.fg,
                textDecoration: `none`,
              })}
            >
              {siteTitle}
              <Box as="sup" fontSize={['1rem']} ml={1} mr={1}>
                toasts
              </Box>
            </Link>
          </Box>
        </Box>
        <Flex alignItems="center" mr={4}>
          <small>v{version}</small>
        </Flex>
        <Flex as="nav" alignItems="center" mr={3}>
          <a href={repoUrl}>
            <GithubSvg height={24} width={24} />
          </a>
        </Flex>
        <Flex alignItems="center">
          <Box
            as="button"
            onClick={() => {
              setThemeType(isDarkTheme ? ThemeType.LIGHT : ThemeType.DARK)
            }}
            p={1}
            css={{
              appearance: 'none',
              border: 'none',
              background: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            aria-label="toggle theme"
          >
            <span role="img" aria-label={isDarkTheme ? 'lights on' : 'lights of'}>
              {isDarkTheme ? '☀️' : '🌙'}
            </span>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
}
