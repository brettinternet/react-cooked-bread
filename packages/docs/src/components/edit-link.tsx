import React from 'react'
import { Location } from '@reach/router'
import { Box } from 'reflexbox'
import { useStaticQuery, graphql } from 'gatsby'

const getPageUrl = (base: string, location: Window['location']) => {
  if (location.pathname !== '/') {
    const pathnameFolders = location.pathname.replace(/\/+$/, '').split('/')
    const pageName = pathnameFolders[pathnameFolders.length - 1]
    return `${base}/${pageName}.mdx`
  }
}

export const EditLink: React.FC = () => {
  const { site } = useStaticQuery(graphql`
    query EditLinkQuery {
      site {
        siteMetadata {
          editPagesRepoUrl
        }
      }
    }
  `)

  return (
    <Location>
      {({ location }) => {
        const href = getPageUrl(site.siteMetadata.editPagesRepoUrl, location)
        if (href) {
          return (
            <Box my={5}>
              <a href={href} target="_blank" rel="noreferrer noopener">
                Edit this page on GitHub
              </a>
            </Box>
          )
        }
      }}
    </Location>
  )
}
