import { readFileSync } from 'node:fs'
import { parseSync } from '../src'
import { Atrule, StyleSheet } from 'css-tree'

// test('test init', () => {
//   const content = readFileSync('./test/__fixtures__/bootstrap.min.css', 'utf-8')
//   expect(content).toBeTruthy()

//   expect(parseSync(content)).toBeTruthy()
// })

test('media with range', () => {
  const content = readFileSync('./test/__fixtures__/media-with-range.css', 'utf-8')
  expect(content).toBeTruthy()

  const parser = parseSync(content)
  expect(parser).toBeTruthy()
  expect(parser.getAst()?.type).toBe('StyleSheet')
  const styleSheet = [...(parser.getAst() as StyleSheet).children]

  expect(styleSheet).toHaveLength(1)
  expect(styleSheet[0].type).toBe('Atrule')
  expect((styleSheet[0] as Atrule).name).toBe('media')

  const mediaPrelude = (styleSheet[0] as Atrule).prelude

  expect(mediaPrelude?.type).toBe('MediaQueryList')
})
