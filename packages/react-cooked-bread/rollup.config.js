const typescript = require('rollup-plugin-typescript2')
const pkg = require('./package.json')
const input = 'src/index.ts'

/**
 * @type {import('rollup').RollupOptions}
 */
const config = {
  // CommonJS (for Node) and ES module (for bundlers) build
  input,
  output: [
    { file: pkg.main, format: 'cjs', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  external: [
    'react',
    'react-dom',
    'react-transition-group',
    'react-transition-group/Transition',
    '@emotion/core',
    'prop-types',
  ],
  plugins: [typescript({ useTsconfigDeclarationDir: true })],
}

export default config

// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
// import camelCase from 'lodash.camelcase'
// const { NODE_ENV } = process.env
// const isProd = NODE_ENV === 'production'
//     // browser-friendly UMD build with dependencies
//     {
//       input,
//       output: [{ file: pkg.browser, name: camelCase(pkg.name), format: 'umd', sourcemap: true }],
//       watch: {
//         include: ['src/**'],
//       },
//       plugins: [resolve(), commonjs(), typescript({ useTsconfigDeclarationDir: true })],
//     }
//   )
