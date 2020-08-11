const typescript = require('rollup-plugin-typescript2')
const cleanup = require('rollup-plugin-cleanup')
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
    cleanup({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    analyze({ writeTo }),
    visualizer({
      filename: bundleGraphPath,
      template: 'sunburst',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
}
