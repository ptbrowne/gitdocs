const sourceGit = require('../sources/git')
const sourceLocal = require('../sources/local')
const { dirTree } = require('./filesystem')
// const { log, styles } = require('../utils/emit')

async function walkSource (tempDir, currentDir, data) {
  try {
    const {
      source,
      source_type: type,
      source_root: root,
      source_branch: branch,
    } = data

    // log(`Fetching ${type} source: ${styles.note(source)}`)

    let resultDir
    switch (type) {
      case 'git': {
        resultDir = await sourceGit(tempDir, source, branch, root)
        break
      }

      case 'http':
      case 'https':
      case 'static': {
        throw new Error('HTTP sources are not supported yet.')
      }

      case 'local':
      default: {
        resultDir = await sourceLocal(source, currentDir)
        break
      }
    }

    return dirTree(resultDir)
  } catch (e) {
    console.error('Error while walking source', source)
    throw e
  }
}

module.exports = {
  walkSource,
}
