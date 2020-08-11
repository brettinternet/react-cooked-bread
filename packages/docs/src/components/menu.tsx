/** @jsx jsx */
import React from 'react'
import { Box } from 'reflexbox'
import { Link } from 'gatsby'
import { jsx, Interpolation } from '@emotion/core'

import { menuMaxWidth as maxWidth } from 'utils/styles'

const Ul: React.FC<{ sub?: boolean }> = ({ children, sub }) => (
  <ul css={{ margin: 0, padding: 0, marginLeft: sub ? '1rem' : 0 }}>{children}</ul>
)
const Li: React.FC = ({ children }) => <li css={{ listStyle: 'none' }}>{children}</li>

type SiteLink = {
  to: string
  name: string
  subLinks?: SiteLink[]
}

const links: SiteLink[] = [
  { to: '/', name: 'Demo' },
  {
    to: '/quick-start',
    name: 'Quick Start',
  },
  {
    to: '/provider',
    name: 'Provider',
  },
  {
    to: '/hook',
    name: 'Hook',
  },
  {
    to: '/consumer',
    name: 'Consumer',
  },
  {
    to: '/extend',
    name: 'Extend',
  },
  {
    to: '/troubleshoot',
    name: 'Troubleshoot',
  },
]

const anchorStyles: Interpolation = {
  textDecoration: 'none',
  fontWeight: 'bold',
  display: 'block',
  '> div': {
    height: 40,
    opacity: 'inherit',
  },
}

const activeAnchorStyles = { color: 'tomato' }

export const Menu: React.FC = () => {
  return (
    <Box
      as="menu"
      mt={3}
      mb={4}
      px={[2, 2, 3]}
      width={['auto', 'auto', 'auto', 'auto', 1 / 2, 1]}
      css={{ maxWidth, minWidth: 140 }}
    >
      <Ul>
        {links.map(({ to, name, subLinks }) => (
          <Li key={to}>
            <Link to={to} css={anchorStyles} activeStyle={activeAnchorStyles}>
              <Box py={2} px={[1, 1, 2]}>
                {name}
              </Box>
            </Link>
            {subLinks && (
              <Ul sub>
                {subLinks.map(({ to, name }) => (
                  <Li key={to}>
                    <Link to={to} css={anchorStyles} activeStyle={activeAnchorStyles}>
                      <Box py={2} px={[1, 1, 2]}>
                        {name}
                      </Box>
                    </Link>
                  </Li>
                ))}
              </Ul>
            )}
          </Li>
        ))}
      </Ul>
    </Box>
  )
}
