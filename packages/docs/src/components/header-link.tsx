/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'

import LinkSvg from 'assets/link.svg'

type HeaderLinkProps = {
  id: string
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children: React.ReactNode
}

export const HeaderLink: React.FC<HeaderLinkProps> = ({ children, id, as: Component }) => {
  return (
    <Component
      id={id}
      css={{
        position: 'relative',
        svg: {
          visibility: 'hidden',
        },
        ':hover': {
          svg: {
            visibility: 'visible',
          },
        },
      }}
    >
      <a
        href={`#${id}`}
        aria-label={`${id} permalink`}
        css={(theme) => ({
          position: 'absolute',
          paddingRight: '0.25rem',
          transform: 'translateX(-100%)',
          color: theme.colors.fg,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        })}
      >
        <LinkSvg />
      </a>
      {children}
    </Component>
  )
}
