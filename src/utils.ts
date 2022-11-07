import { CssNode, Atrule } from 'css-tree'

export function isAtRule(node: CssNode): node is Atrule {
  return node.type === 'Atrule'
}
