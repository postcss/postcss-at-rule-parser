const fs = require('fs').promises
const { performance } = require('perf_hooks')

const { parse } = require('../pkg/index')

async function main() {
  const css = `@media (width <= 1200px)  {}`

  const t = performance.now()
  const ast = parse(css)
  console.info('✨ Done in', performance.now() - t, 'ms')

  const astJson = JSON.stringify(ast, null, 2)
  console.info('input CSS: \n' + css + '\n', astJson)

  fs.writeFile(__dirname + '/ast.json', astJson)
}

main()
