import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';

import sveltePreval from 'svelte-preval';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => {
        css.write('bundle.css');
      },
      preprocess: [
        sveltePreval({
          baseDir: __dirname,
        }),
      ],
    }),

    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),

    commonjs(),

    !production && serve({
      open: true, // open browser
      verbose: false,
      contentBase: 'public',
      // Options used in setting up server
      //host: 'localhost',
      host: '0.0.0.0', // listen on all interfaces
      port: 5000,
    }),

    !production && livereload('public'),

    production && terser()
  ],
  watch: {
    clearScreen: false, // keep build logs in terminal
    chokidar: false, // push all changes to browser
    // https://github.com/sveltejs/template/issues/77
  },
};
