import { readFileSync } from 'node:fs'
import { parseSync } from '../src'

test('test init', () => {
  const content = readFileSync('./test/__fixtures__/bootstrap.min.css', 'utf-8')
  expect(content).toBeTruthy()

  expect(parseSync(content)).toBeTruthy()
})
