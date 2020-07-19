/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'reflexbox'
import { jsx } from '@emotion/core'

import { footerHeight as height, appWidth as maxWidth } from 'utils/styles'

interface FooterProps {
  pathPrefix: string
  repoUrl: string
}

export const Footer: React.FC<FooterProps> = ({ pathPrefix, repoUrl }) => (
  <Flex
    alignItems="center"
    css={(theme) => ({ height, background: theme.colors.fg, color: theme.colors.bg })}
  >
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
        <a href={`${pathPrefix}/types`} css={{ textDecoration: 'none', fontWeight: 'bold' }}>
          Types
        </a>
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
