import CT from 'css-tree'

export const tokenize: (source: string, onToken: (type: string, start: number, end: number) => void) => void = (
  CT as any
).tokenize

// enum TokenType {
//   ident = 'ident',
//   value = 'value',
//   operator = 'operator',
// }

// interface Token {
//   type: string
// }
// TODO(CGQAQ): use css-tree tokenizer when possible
type Token = any

export class Tokenizer {
  pos: number = 0
  private readonly input: string

  constructor(input: string) {
    this.input = input
  }

  next(): Token | undefined {
    // tokenize(this.input, (type, start, end) => {})

    this.pos++
  }

  peek() {
    console.log()
    return this.input[this.pos]
  }

  skipWhitespace() {
    for (let i = this.pos; i < this.input.length; i++) {
      const char = this.peek()
      if (char === ' ' || char === '\t' || char === '\n' || char === '\r') {
        // whitespace
        this.pos++
      } else {
        break
      }
    }
  }
}
