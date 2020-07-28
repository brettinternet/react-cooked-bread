import { join, basename } from 'path'
import { copySync } from 'fs-extra'

const docBuildRootDir = join(__dirname, '..', 'packages', 'examples', 'public')

const bundleChartPath = join(__dirname, '..', 'bundle-analysis.txt')
const bundleGraphPath = join(__dirname, '..', 'bundle-analysis.html')

const staticFiles = [bundleChartPath, bundleGraphPath]
staticFiles.forEach((path) => {
  const fileName = basename(path)
  const dest = join(docBuildRootDir, fileName)
  copySync(path, dest)
})
