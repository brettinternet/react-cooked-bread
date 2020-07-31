/** @jsx jsx */
import React from 'react'
import { Box } from 'reflexbox'
import { Link } from 'gatsby'
import { jsx, Interpolation } from '@emotion/core'

import { menuMaxWidth as maxWidth } from 'utils/styles'
// import { TypesLink } from 'components/types-link'

const links = [
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
      css={{ maxWidth, minWidth: 120 }}
    >
      {links.map(({ to, name }) => (
        <Link key={to} to={to} css={anchorStyles} activeStyle={activeAnchorStyles}>
          <Box py={2}>{name}</Box>
        </Link>
      ))}
      {/* <TypesLink css={anchorStyles} flexProps={{ py: 2 }} /> */}
    </Box>
  )
}
