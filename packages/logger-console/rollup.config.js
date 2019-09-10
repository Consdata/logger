import cleanup from 'rollup-plugin-cleanup';

export default {
  input: './.build/tsc-out/lib/index.js',
  output: [
    {
      name: 'logger-console',
      file: 'dist/index.umd.js',
      format: 'umd',
      external: ['@consdata/logger-api']
    },
    {
      name: 'logger-console',
      file: 'dist/index.esm.js',
      format: 'esm',
      external: ['@consdata/logger-api']
    }
  ],
  plugins: [
    cleanup()
  ]
};
