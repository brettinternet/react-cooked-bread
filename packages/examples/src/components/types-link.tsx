import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Flex, BoxProps, BoxType } from 'reflexbox'

import NewWindowSvg from 'assets/arrow-up-right.svg'

interface TypesLinkProps {
  className?: string
  flexProps?: BoxProps
}

export const TypesLink: React.FC<TypesLinkProps> = ({
  children = 'Types',
  className,
  flexProps,
}) => {
  const { site } = useStaticQuery(graphql`
    query TypesLinkQuery {
      site {
        pathPrefix
      }
    }
  `)

  return (
    <a className={className} href={`${site.pathPrefix}/types`}>
      <Flex alignItems="center" {...(flexProps as BoxType)}>
        {children}
        <Flex alignItems="center" css={{ transform: 'scale(0.5)' }}>
          <NewWindowSvg />
        </Flex>
      </Flex>
    </a>
  )
}
