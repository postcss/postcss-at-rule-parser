const postcss = require('postcss')

const atRuleParser = require('./src/index.js')

const css = `@media (width >= 100px) {
  .foo {
    display: flex;
  }
}`

postcss()
  .use(atRuleParser())
  .process(css)
  .then((result) => {
    const output = result.css
    console.info('output🚀: \n', output)
  })
