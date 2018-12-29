const tmp = require('tmp')

const namespaces = {
  codegen: '@codegen',
  static: '@static',
  repos: '@repos',
}

function tempDir () {
  // tmp.setGracefulCleanup()

  // const dir = tmp.dirSync({
  //   prefix: 'gitdocs-',
  // })

  return '/tmp/gitdocs/'
}

module.exports = {
  namespaces,
  tempDir,
}
