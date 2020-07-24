import { join } from 'path'
import { copySync } from 'fs-extra'

const pkg = require('../package.json')

const rootReadmePath = join(__dirname, '..', 'README.md')
const pkgDir = join(__dirname, '..', 'packages', pkg.name)

copySync(rootReadmePath, pkgDir)
