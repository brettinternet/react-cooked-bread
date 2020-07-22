const path = require('path')
const sitePkg = require('./package.json')
const libPkg = require('../react-cooked-bread/package.json') // eslint-disable-line node/no-unpublished-require

const pkgName = libPkg.name

module.exports = {
  pathPrefix: `/${pkgName}`,
  siteMetadata: {
    title: pkgName,
    description: sitePkg.description,
    author: sitePkg.author.split(' ').slice(0, 1),
    homepage: sitePkg.homepage,
    repoUrl: sitePkg.repository.url,
    version: libPkg.version,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/bread-512x512.png`,
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
      options: {
        isTSX: true,
        allExtensions: true,
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        components: path.join(__dirname, 'src/components'),
        pages: path.join(__dirname, 'src/pages'),
        images: path.join(__dirname, 'src/images'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
  ],
}
