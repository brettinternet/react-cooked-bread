import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default [
  // browser-friendly UMD build
  {
    input: `src/index.ts`,
    output: [{ file: pkg.browser, name: camelCase(pkg.name), format: 'umd', sourcemap: true }],
    watch: {
      include: 'src/**',
    },
    plugins: [
      resolve({
        extensions: ['.js', '.ts', '.tsx'],
      }),
      commonjs(),
      typescript({ useTsconfigDeclarationDir: true }),
    ],
  },
  // CommonJS (for Node) and ES module (for bundlers) build
  {
    input: `src/index.ts`,
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
  },
]
