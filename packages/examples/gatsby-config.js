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
    editPagesRepoUrl: sitePkg.repository.url + '/edit/master/packages/examples/src/pages',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: pkgName,
        short_name: pkgName,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/bread-512x512.png`,
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
        assets: path.join(__dirname, 'src/assets'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        rehypePlugins: [require('rehype-slug'), require('@mapbox/rehype-prism')],
        defaultLayouts: {
          default: require.resolve('./src/components/layout.tsx'),
        },
      },
    },
    'gatsby-plugin-catch-links',
  ],
}
