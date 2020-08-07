const path = require('path')
const pkg = require('../react-cooked-bread/package.json') // eslint-disable-line node/no-unpublished-require

const pkgName = pkg.name

module.exports = {
  pathPrefix: `/${pkgName}`,
  siteMetadata: {
    title: pkgName,
    description: pkg.description,
    author: pkg.author.split(' ').slice(0, 1),
    repoUrl: pkg.repository.url,
    editPagesRepoUrl: pkg.repository.url + '/edit/master/packages/docs /src/pages',
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
        'toast-content-examples': path.join(__dirname, 'src/toast-content-examples'),
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
        gatsbyRemarkPlugins: ['gatsby-remark-autolink-headers'],
        rehypePlugins: [require('@mapbox/rehype-prism')],
        defaultLayouts: {
          default: require.resolve('./src/components/layout.tsx'),
        },
      },
    },
    'gatsby-plugin-catch-links',
  ],
}
