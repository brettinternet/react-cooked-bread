/** @jsx jsx */
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { Flex, Box } from 'reflexbox'
import { jsx } from '@emotion/core'

import { ThemeType } from 'utils/theme'
import { headerHeight as height, createMediaQuery, breakpoints } from 'utils/styles'
import GithubSvg from 'assets/github.svg'
import { useApp } from 'utils/app.context'

const hideMobileStyles = {
  [createMediaQuery(breakpoints[2], true)]: {
    display: 'none',
  },
}

interface HeaderProps {
  siteTitle: string
  repoUrl: string
  version: string
  npmLink: string
}

export const Header: React.FC<HeaderProps> = ({ siteTitle, repoUrl, version, npmLink }) => {
  const { themeType, setThemeType } = useApp()

  const isDarkTheme = themeType === ThemeType.DARK

  return (
    <Flex as="header" alignItems="center" css={{ height }}>
      <Flex width={1} px={[2, 2, 3]} mx="auto">
        <Flex alignItems="center" mr="auto">
          <Box as="h1" fontSize={['1rem', '1.4rem', '1.4rem', '2rem']} css={{ margin: 0 }}>
            <Link
              to="/"
              css={(theme) => ({
                color: theme.colors.fg,
                textDecoration: `none`,
              })}
            >
              {siteTitle}
              <Box as="sup" fontSize={['1rem']} ml={1} mr={1} css={hideMobileStyles}>
                toasts
              </Box>
            </Link>
          </Box>
        </Flex>
        <Flex as="nav" alignItems="center">
          <Flex alignItems="center" mr={[3, 3, 3, 4]}>
            <a
              href={npmLink}
              target="_blank"
              rel="noreferrer noopener"
              css={{ textDecoration: 'none' }}
            >
              <Box p={1}>
                <small>v{version}</small>
              </Box>
            </a>
          </Flex>
          <Box mr={3} css={hideMobileStyles}>
            <a href={repoUrl}>
              <GithubSvg height={24} width={24} />
            </a>
          </Box>
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
