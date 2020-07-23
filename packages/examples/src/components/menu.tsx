/** @jsx jsx */
import React from 'react'
import { Box, Flex } from 'reflexbox'
import { Link } from 'gatsby'
import { jsx, Interpolation } from '@emotion/core'
import PropTypes from 'prop-types'

import { menuMaxWidth as maxWidth } from 'utils/styles'
import NewWindowSvg from 'images/arrow-up-right.svg'

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

interface MenuProps {
  pathPrefix: string
}

export const Menu: React.FC<MenuProps> = ({ pathPrefix }) => {
  return (
    <Box
      as="menu"
      mt={3}
      px={[2, 2, 3]}
      width={['auto', 'auto', 'auto', 'auto', 1 / 2, 1]}
      css={{ maxWidth, minWidth: 120 }}
    >
      <Link to="/" css={anchorStyles} activeStyle={activeAnchorStyles}>
        <Box py={2}>Quick Start</Box>
      </Link>
      <Link to="/provider" css={anchorStyles} activeStyle={activeAnchorStyles}>
        <Box py={2}>Provider</Box>
      </Link>
      <Link to="/hook" css={anchorStyles} activeStyle={activeAnchorStyles}>
        <Box py={2}>Hook</Box>
      </Link>
      <Link to="/consumer" css={anchorStyles} activeStyle={activeAnchorStyles}>
        <Box py={2}>Consumer</Box>
      </Link>
      <Link
        to="/customize"
        css={(theme) => ({ ...anchorStyles, color: theme.colors.bread })}
        activeStyle={activeAnchorStyles}
      >
        <Box py={2}>Customize</Box>
      </Link>
      <a href={`${pathPrefix}/types`} css={anchorStyles}>
        <Flex alignItems="center" py={2}>
          Types
          <Flex alignItems="center" css={{ transform: 'scale(0.5)' }}>
            <NewWindowSvg />
          </Flex>
        </Flex>
      </a>
      <Link to="/hints" css={anchorStyles} activeStyle={activeAnchorStyles}>
        <Box py={2}>Hints</Box>
      </Link>
    </Box>
  )
}

Menu.propTypes = {
  pathPrefix: PropTypes.string.isRequired,
}
