import { ParseOptions } from 'css-tree'

import Parser from './parser'

const parse = (input: string, opts?: ParseOptions): Parser => {
  return new Parser(input, opts).parse()
}

export { default as Parser } from './parser'
export default parse
