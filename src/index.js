const cssTree = require('css-tree')
const postcss = require('postcss')

module.exports = (opts = {}) => {
  return {
    postcssPlugin: 'postcss-at-rule-parser',
    AtRule(atRule) {
      const { params, source } = atRule
      const { column, line } = source.start

      atRule.preludeCssTreeAst = cssTree.parse(params, {
        atrule: 'media',
        column,
        context: 'atrulePrelude',
        filename: source.input.file,
        line,
        positions: true,
      })
    },
  }
}

module.exports.postcss = true
