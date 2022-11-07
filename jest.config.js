/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    // '^.+\\.[tj]sx?$' to process js/ts with `ts-jest`
    // '^.+\\.m?[tj]sx?$' to process js/ts/mjs/mts with `ts-jest`
    '^.+\\.(j|t)sx?$': [
      'ts-jest',
      {
        // ts-jest configuration goes here
        useESM: false,
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!auto-bind)'],
}
