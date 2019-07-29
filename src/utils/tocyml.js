const yaml = require('js-yaml')

const insertItem = (tree, item) => {
  const path = item.path.split('/')
  let curPath
  for (const tok of path.slice(0, -1)) {
    curPath = curPath ? `${curPath}/${tok}` : tok
    tree[tok] = tree[tok] || { path: curPath, children: [] }
    tree = tree[tok]
  }
  tree.children.push({
    ...item,
    path: path[path.length - 1]
  })
}

const asTree = items => {
  const tree = { children: [] }
  for (const item of items) {
    insertItem(tree, item)
  }
  return tree
}

/**
 * Reads toc.yml and returns tree like structure from item listed
 *
 * - path
 * - children
 *   - path
 *   - children
 */
function getItemsFromTocYml (content) {
  const items = []
  yaml.safeLoad(content.trim()).map(obj => {
    const entries = Object.entries(obj)
    for (let [title, path] of entries) {
      path = path.indexOf('./') === 0 ? path.slice(2, path.length) : path
      items.push({ title, path })
    }
  })
  const { children, ...restTree } = asTree(items)
  const res = [...children, ...Object.values(restTree)]
  return res
}

module.exports = {
  getItemsFromTocYml
}
