/** @jsx jsx */
import React from 'react'
import { Box, Flex } from 'reflexbox'
import { jsx } from '@emotion/core'

import { footerHeight as height } from 'utils/styles'
import { newWindowProps } from 'utils/window'

const badges = [
  {
    src: 'https://github.com/brettinternet/react-cooked-bread/workflows/CI/badge.svg',
    alt: 'CI',
    href: 'https://github.com/brettinternet/react-cooked-bread/actions?query=workflow%3ACI',
    title: 'View test CI',
  },
  {
    src: 'https://github.com/brettinternet/react-cooked-bread/workflows/Publish/badge.svg',
    alt: 'Build',
    href: 'https://github.com/brettinternet/react-cooked-bread/actions?query=workflow%3APublish',
    title: 'View publish CI',
  },
  {
    src: 'https://img.shields.io/npm/v/react-cooked-bread?logo=npm',
    alt: 'NPM',
    href: 'https://www.npmjs.com/package/react-cooked-bread',
    title: 'View NPM release',
  },
  {
    src: 'https://img.shields.io/github/v/release/brettinternet/react-cooked-bread',
    alt: 'Release',
    href: 'https://github.com/brettinternet/react-cooked-bread/releases',
    title: 'View releases',
  },
  {
    src: 'https://img.shields.io/badge/bundle-view-informational',
    alt: 'Bundle',
    href: 'https://brettinternet.com/react-cooked-bread/bundle-analysis',
    title: 'View bundle analysis',
  },
]

export const Footer: React.FC = () => (
  <Flex alignItems="center" css={{ height }}>
    <Flex
      px={[2, 2, 3]}
      mx="auto"
      width={1}
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
    >
      {badges.map(({ href, src, alt, title }) => (
        <Box key={src} mr={3} mb={2}>
          <a href={href} css={{ textDecoration: 'none' }} title={title} {...newWindowProps}>
            <img src={src} alt={alt} />
          </a>
        </Box>
      ))}
    </Flex>
  </Flex>
)
