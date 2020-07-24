import { join } from 'path'
import { copySync } from 'fs-extra'

const pkg = require('../package.json')

const typedocsBuildPath = join(__dirname, '..', 'packages', pkg.name, 'docs')
const docBuildPath = join(__dirname, '..', 'packages', 'examples', 'public', 'types')

copySync(typedocsBuildPath, docBuildPath)
