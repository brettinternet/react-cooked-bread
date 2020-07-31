const typescript = require('rollup-plugin-typescript2')
const analyze = require('rollup-plugin-analyzer')
const visualizer = require('rollup-plugin-visualizer')
const fs = require('fs')
const path = require('path')

const pkg = require('./package.json')

const bundleChartPath = path.join(__dirname, '..', '..', 'bundle-analysis.txt')
const bundleGraphPath = path.join(__dirname, '..', '..', 'bundle-analysis.html')
const writeTo = (analysisString) => {
  fs.writeFile(bundleChartPath, analysisString, (err) => err && console.error(err))
}

/**
 * @type {import('rollup').RollupOptions}
 */
module.exports = {
  // CommonJS (for Node) and ES module (for bundlers) build
  input: 'src/index.ts',
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
  plugins: [
    typescript({ useTsconfigDeclarationDir: true }),
    analyze({ writeTo }),
    visualizer({
      filename: bundleGraphPath,
      template: 'sunburst',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
}

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
