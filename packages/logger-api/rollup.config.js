import cleanup from 'rollup-plugin-cleanup';

export default {
  input: './.build/tsc-out/lib/index.js',
  output: [
    {
      name: 'logger-api',
      file: 'dist/index.umd.js',
      format: 'umd'
    },
    {
      name: 'logger-api',
      file: 'dist/index.esm.js',
      format: 'esm'
    }
  ],
  plugins: [
    cleanup()
  ]
};
