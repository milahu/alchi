import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import serve from 'rollup-plugin-serve';
import css from 'rollup-plugin-css-only';

import sveltePreval from 'svelte-preval';

const production = !process.env.ROLLUP_WATCH;

import findFreePort from 'find-free-port-sync';

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
      compilerOptions: {
        dev: !production,
      },
      preprocess: [
        sveltePreval({
          baseDir: __dirname,
        }),
      ],
    }),

    css({ output: 'bundle.css' }),

    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),

    commonjs(),

    !production && serve({
      open: true, // open browser
      verbose: false,
      contentBase: 'public',
      // Options used in setting up server
      //host: 'localhost',
      host: '0.0.0.0', // listen on all interfaces
      port: findFreePort({ start: 5000 }),
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
