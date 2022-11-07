import { CssNode, Atrule } from 'css-tree'

export function isAtRule(node: CssNode): node is Atrule {
  return node.type === 'Atrule'
}

export function assert(condition: unknown, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message)
  }
}
