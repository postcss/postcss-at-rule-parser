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

import { Atrule, AtrulePrelude, MediaQuery, MediaQueryList, List, parse, CssNode } from 'css-tree'
import { assert } from '../utils'
import { Tokenizer } from './tokenizer'

function parseMediaQueryList(input: string): MediaQueryList {
  const commaSeperated = input.split(',')
  const result: List<MediaQuery> = new List()
  for (const mediaQuery of commaSeperated) {
    try {
      const mediaQueryAst = parse(mediaQuery.trim(), { context: 'mediaQuery' })
      if (mediaQueryAst.type === 'MediaQuery') {
        result.push(mediaQueryAst)
      }
    } catch {
      // try parsing as range
      const range = mediaQuery.trim()
      const tokenizer = new Tokenizer(range)
      tokenizer.peek()
      // TODO(CGQAQ): do the patching here
    }
  }
  return {
    type: 'MediaQueryList',
    children: result,
  }
}

export function patchMedia(ast: Atrule) {
  assert(ast.type === 'Atrule', 'patchMedia: ast is not an Atrule')
  assert(ast.name === 'media', 'patchMedia: can only be used on @media atrule')

  const mediaPrelude = ast.prelude

  if (mediaPrelude?.type === 'Raw') {
    // Need patch
    // 1. parse media query list
    const mediaQueryList = parseMediaQueryList(mediaPrelude.value)
    // 2. replace prelude with media query list
    const newPreludeChildren = new List<CssNode>()
    newPreludeChildren.push(mediaQueryList)
    const newPrelude: AtrulePrelude = {
      type: 'AtrulePrelude',
      children: newPreludeChildren,
    }
    ast.prelude = newPrelude
  }
}
