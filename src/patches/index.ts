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

/**
 * This module exports all patches of css-tree for further parse css feature that it simply does not supported yet
 *
 * @module
 */

import { Atrule } from 'css-tree'

import { patchMedia } from './media'

/**
 * Pipe input ast through all patches and hydrade the ast
 * @param ast input css ast
 */
export function pipeThroughAllPatchesSync(ast: Atrule[]) {
  for (const atrule of ast) {
    if (atrule.type !== 'Atrule') continue

    switch (atrule.name) {
      case 'media':
        patchMedia(atrule)
        break
      default:
        break
    }
  }
}

/**
 * Pipe input ast through all patches and hydrade the ast
 * @param _ast input css ast
 */
export function pipeThroughAllPatches(_ast: Atrule[]) {
  /* NOOP */
}
