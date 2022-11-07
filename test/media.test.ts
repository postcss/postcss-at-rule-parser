import { readFileSync } from 'node:fs'

test('test init', () => {
  const content = readFileSync('./test/__fixtures__/bootstrap.min.css', 'utf-8')
  expect(content).toBeTruthy()
})
