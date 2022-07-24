import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

/** @type { import("rollup").RollupOptions } */
export default {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/index.cjs',
      format: 'commonjs',
    },
  ],

  plugins: [typescript(/*{ plugin options }*/), commonjs(), nodeResolve()],
}
