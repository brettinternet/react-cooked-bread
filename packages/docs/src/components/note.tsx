/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Flex } from 'reflexbox'

export const Note: React.FC = ({ children }) => (
  <Flex
    flexDirection="row"
    css={(theme) => ({
      color: theme.colors.grayDark,
      background: theme.colors.linen,
      borderRadius: '0.3rem',
      fontSize: '1.1rem',
      '> p': { margin: 0 },
      ':before': {
        content: '"🍞"',
        marginRight: '1rem',
      },
    })}
    my="2rem"
    p="1rem"
  >
    {children}
  </Flex>
)
