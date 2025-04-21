import postcss from 'rollup-plugin-postcss';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/index.esm.js', format: 'esm' },
    { file: 'dist/index.cjs.js', format: 'cjs', exports: 'default' }
  ],
  plugins: [
    postcss({
      extract: 'EH-Tooltip.css',
      // extract: true,      // writes dist/index.css
      modules: false,
      minimize: true
    }),
    resolve(),            // must come after postcss
    commonjs(),
    babel({ babelHelpers: 'bundled', extensions: ['.js'], exclude: 'node_modules/**' }),
  ]
};
