import { join } from 'path'
import { copyFileSync } from 'fs-extra'

const pkg = require('../package.json')

const rootReadmePath = join(__dirname, '..', 'README.md')
const pkgDir = join(__dirname, '..', 'packages', pkg.name, 'README.md')

copyFileSync(rootReadmePath, pkgDir)
