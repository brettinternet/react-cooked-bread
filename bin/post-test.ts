import { join } from 'path'
import { copyFileSync } from 'fs-extra'

const jestOutputFilename = 'jest.results.json'

const testResultFile = join(__dirname, '..', 'packages', 'react-cooked-bread', jestOutputFilename)
const rootPath = join(__dirname, '..', jestOutputFilename)

copyFileSync(testResultFile, rootPath)
