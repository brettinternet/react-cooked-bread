/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'reflexbox'
import { jsx } from '@emotion/core'

import { appWidth as maxWidth } from 'utils/styles'
import { Link } from 'gatsby'

interface FooterProps {
  pathPrefix: string
  repoUrl: string
}

export const Footer: React.FC<FooterProps> = ({ repoUrl }) => (
  <Flex alignItems="center">
    <Flex
      px={[2, 2, 3]}
      mx="auto"
      width={1}
      justifyContent="center"
      css={{
        maxWidth,
      }}
    >
      <Box mr={3}>
        <Link to="/quick-start" css={{ textDecoration: 'none', fontWeight: 'bold' }}>
          Quick Start
        </Link>
      </Box>
      <Box>
        <a href={repoUrl} css={{ textDecoration: 'none', fontWeight: 'bold' }}>
          GitHub
        </a>
      </Box>
    </Flex>
  </Flex>
)

Footer.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
}
