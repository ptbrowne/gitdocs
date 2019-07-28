const fs = require('fs-extra')
const syspath = require('path')
const simpleGit = require('simple-git/promise')
const { namespaces } = require('../utils/temp')

module.exports = async (dir, repo, branch, root) => {
  const base = syspath.basename(repo)
  const repoDir = syspath.join(dir, namespaces.repos, base, branch)
  const docsDir = syspath.join(repoDir, root)

  try {
    const existence = fs.existsSync(repoDir)
    if (existence) {
      try {
        await simpleGit(repoDir)
          .silent(process.env.GIT_DOCS_GIT_FETCH_SILENT !== 'false')
          .fetch({ depth: 0 })
      } catch (e) {
        console.warn(`Could not fetch ${repoDir}`)
      }
    } else {
      await simpleGit()
        .silent(true)
        .clone(repo, repoDir, { '--depth': 1 })
    }

    await simpleGit(repoDir)
      .silent(true)
      .checkout(branch)
  } catch (err) {
    console.log(err)
    throw new Error(`Could not find branch in ${repo}: ${branch}`)
  }

  if (!await fs.pathExists(docsDir)) {
    throw new Error(`Could not find ${root}/ in ${repo}`)
  }

  return docsDir
}
