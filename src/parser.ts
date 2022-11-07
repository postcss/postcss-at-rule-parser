/**
 * The MIT License (MIT)
 *
 * Copyright 2022 yisibl(一丝) https://github.com/yisibl
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 */

import autoBind from 'auto-bind'
import { ParseOptions, parse, CssNode, generate, GenerateOptions, Atrule } from 'css-tree'
import { Root } from 'postcss'

import { pipeThroughAllPatchesSync, pipeThroughAllPatches } from './patches'
import { isAtRule } from './utils'

class Parser {
  private readonly input: string
  private readonly opts?: ParseOptions

  private ast?: CssNode

  constructor(input: string, opts?: ParseOptions) {
    this.input = input
    this.opts = opts
    autoBind(this)
  }

  /**
   * Parsing input css string into css-tree ast
   * @returns {this}
   */
  parseSync(): Parser {
    this.ast = parse(this.input, this.opts)
    if (this.ast.type === 'StyleSheet') {
      pipeThroughAllPatchesSync(this.ast.children.filter(isAtRule) as unknown as Atrule[])
    }

    return this
  }

  /**
   * Parsing input css string into css-tree ast asynchronously
   */
  async parse(): Promise<Parser> {
    this.ast = parse(this.input, this.opts)
    if (this.ast.type === 'StyleSheet') {
      await pipeThroughAllPatches(this.ast.children.filter(isAtRule) as unknown as Atrule[])
    }
    return this
  }

  /**
   * Get parsed ast in css-tree representation
   * @returns Css-tree ast
   */
  getAst(): CssNode | undefined {
    return this.ast
  }

  /**
   * Transform css-tree ast into postcss style equivalent
   * @returns Postcss ast
   */
  toPostcssAst(): Root {
    throw Error('Unimplemented')
  }

  /**
   * Serilizing css-tree ast to string
   * @param opts css-tree generate options
   * @returns { string | undefined } string if we have ast, otherwise it's undefined
   */
  toCssString(opts?: GenerateOptions): string | undefined {
    if (!this.ast) {
      return undefined
    }

    return generate(this.ast, opts)
  }
}

export default Parser
