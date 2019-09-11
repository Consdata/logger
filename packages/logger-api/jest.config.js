module.exports = {
  rootDir: 'src',
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: [
    'ts',
    'js',
    'jsx',
    'json',
    'node'
  ],
  globals: {
    'ts-jest': {
      tsConfig: 'src/tsconfig.spec.json'
    }
  }
};
