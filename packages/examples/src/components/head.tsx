import React from 'react'
import PropTypes from 'prop-types'
import { Helmet, MetaProps } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

interface HeadProps {
  description?: string
  lang?: string
  meta?: MetaProps[]
  title: string
}

interface HeadQuery {
  site: {
    siteMetadata: {
      title: string
      description: string
      author: string
    }
  }
}

export const Head: React.FC<HeadProps> = ({ description, lang = 'en', meta = [], title }) => {
  const { site }: HeadQuery = useStaticQuery(
    graphql`
      query HeadQuery {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const metas: MetaProps[] = [
    {
      name: `description`,
      content: metaDescription,
    },
    {
      property: `og:title`,
      content: title,
    },
    {
      property: `og:description`,
      content: metaDescription,
    },
    {
      property: `og:type`,
      content: `website`,
    },
    {
      name: `twitter:card`,
      content: `summary`,
    },
    {
      name: `twitter:creator`,
      content: site.siteMetadata.author,
    },
    {
      name: `twitter:title`,
      content: title,
    },
    {
      name: `twitter:description`,
      content: metaDescription,
    },
  ]

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={metas.concat(meta)}
    />
  )
}

Head.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object.isRequired),
  title: PropTypes.string.isRequired,
}
