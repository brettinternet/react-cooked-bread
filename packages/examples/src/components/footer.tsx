/** @jsx jsx */
import React from 'react'
import PropTypes from 'prop-types'
import { Box, Flex } from 'reflexbox'
import { jsx, ObjectInterpolation } from '@emotion/core'

import { footerHeight as height, appWidth as maxWidth } from 'utils/styles'
import { Link } from 'gatsby'

const linkStyles: ObjectInterpolation<undefined> = { textDecoration: 'none', fontWeight: 'bold' }

interface FooterProps {
  pathPrefix: string
  repoUrl: string
}

export const Footer: React.FC<FooterProps> = ({ repoUrl, pathPrefix }) => (
  <Flex alignItems="center" css={{ height }}>
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
        <Link to="/quick-start" css={linkStyles}>
          Quick Start
        </Link>
      </Box>
      <Box mr={3}>
        <a href={`${pathPrefix}/bundle-analysis`} css={linkStyles}>
          Bundle Analysis
        </a>
      </Box>
      <div>
        <a href={repoUrl} css={linkStyles}>
          GitHub
        </a>
      </div>
    </Flex>
  </Flex>
)

Footer.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
  repoUrl: PropTypes.string.isRequired,
}
