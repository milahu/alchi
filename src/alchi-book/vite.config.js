// TODO move to config folder

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

// defined in .eleventy.js
const eleventyDirOutput = process.env.NODE_ELEVENTY_DIR_OUTPUT;
const bundlerEntryDir = process.env.NODE_BUNDLER_ENTRY_DIR || '';
const bundlerEntryFiles = process.env.NODE_BUNDLER_ENTRY_FILES?.split(',');

if (!eleventyDirOutput) throw new Error('error: empty NODE_ELEVENTY_DIR_OUTPUT');
if (!bundlerEntryFiles || bundlerEntryFiles.length == 0) throw new Error('error: empty NODE_BUNDLER_ENTRY_FILES');

// This is critical: overwrite default index.html entry
// https://vitejs.dev/guide/build.html#multi-page-app
const assetPath = path => path.replace(/\.[^./]+$/, '');
const rollupOptions = {
  input: Object.fromEntries(bundlerEntryFiles.map(entryFile => (
    [assetPath(entryFile), (bundlerEntryDir + entryFile)]
  ))),

  plugins: [],

  // disable "filenames with hash" for assets
  // so we can commit the "build" folder
  // and dont have to delete/rename the old build files
  // https://github.com/vitejs/vite/issues/378#issuecomment-768816653
  // TODO maybe enable in development mode?
  output: {
    entryFileNames: `assets/[name].js`,
    chunkFileNames: `assets/[name].js`,
    assetFileNames: `assets/[name].[ext]`
  },

};
// debug
Object.entries(rollupOptions.input).forEach(([key, path]) => {
  console.log(`build.rollupOptions.input[${JSON.stringify(key)}]: ${path}`);
});
console.log(`build.outDir: ${eleventyDirOutput}`);

// https://vitejs.dev/config/
export default defineConfig({

  // This is not critical, but I include it because there are more HTML transforms via plugins, that templates must handle
  // TODO: For legacy() to work without a hitch, we set a known @babel/standalone version in package.json
  // Remove that once https://github.com/vitejs/vite/issues/2442 is fixed
  //plugins: [legacy()],
  // disabled the legacy plugin cos it generates "filenames with hash" for asset files
  // https://github.com/vitejs/vite/issues/378
  // sync with: alchi-book/config/eleventy.config.js footTags(file) {

  build: {
    // This is important: Generate directly to _site and then assetsDir.
    // You could opt to build in an intermediate directory,
    // and have Eleventy copy the flies instead.
    outDir: eleventyDirOutput,
    // This is the default assetsDir. If you are using assets
    // for anything else, consider renaming assetsDir.
    // This can help you set cache headers for hashed output more easily.
    // assetsDir: "assets",

    sourcemap: false, // save 50 KByte

    manifest: true, // required for eleventy JsBundle

    // https://vitejs.dev/guide/build.html#multi-page-app
    rollupOptions,
  },
});
