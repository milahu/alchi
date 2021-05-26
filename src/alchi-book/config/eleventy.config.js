// TODO compile to markdown? one file per language
// -> easy to host on gitlab, gitea, etc. - no need for static html hosting

const fs = require('fs');

const staticConfig = {

  // https://github.com/fpapado/eleventy-with-vite/pull/2
  //jsBundleDevServer: 'http://localhost:3000',
  jsBundleEntryDir: "src/js/", // this prefix will be removed in production builds
  jsBundleEntryFiles: [ "main.js" ],
  jsBundleDevserver: null, // will be set on runtime
  isProduction: (process.env.NODE_ENV == 'production'),

  pathPrefix: "", // This will change both Eleventy's pathPrefix, and the one output by the
  // vite-related shortcodes below. Double-check if you change this, as this is only a demo :)



  dir: {
    input: "src",
    output: "build", // not consistent with "default NPM folder layout" where /build contains helper scripts for the build process

    // relative to input https://github.com/11ty/eleventy/issues/232
    includes: "_includes",
    data: "_data",
  },

  templateFormats: [
    "md",
    "njk",
    "html",
    "liquid",
    "txt", // TODO still need this?
  ],

  // If your site lives in a different subdirectory, change this.
  // Leading or trailing slashes are all normalized away, so don’t worry about those.

  // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
  // This is only used for link URLs (it does not affect your file structure)
  // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

  // You can also pass this in on the command line using `--pathprefix`
  // pathPrefix: "/",

  markdownTemplateEngine: "liquid",
  htmlTemplateEngine: "njk",
  dataTemplateEngine: "njk",

  // TODO why not
  // eleventyConfig.jsDataFileBase = 'index';
  jsDataFileBase: 'index',

};



module.exports = function(eleventyConfig) {

  // make staticConfig reusable outside of eleventy
  if (!eleventyConfig) return staticConfig;

  const appRoot = require('app-root-path').path;

  // https://v0-6-0.11ty.dev/docs/collections/
  eleventyConfig.addCollection("pages", collection => (
    collection
      .getFilteredByTag("pages")
      .sort((a, b) => {
        //return a.date - b.date; // sort by date - ascending
        //return b.date - a.date; // sort by date - descending
        return a.inputPath.localeCompare(b.inputPath); // sort by path - ascending
        //return b.inputPath.localeCompare(a.inputPath); // sort by path - descending
      })
  ));

  const { DateTime } = require("luxon");
  const fs = require("fs");
  //const pluginRss = require("@11ty/eleventy-plugin-rss");
  //const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  //const pluginNavigation = require("@11ty/eleventy-navigation");
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");

  const CleanCSS = require("clean-css");
  const transformDomPlugin = require('eleventy-plugin-transformdom');

  // TODO
  eleventyConfig.dataExtensions = new Map([
    ["txt", function parse(str) {
      return { str };
      // wait for https://github.com/11ty/eleventy/pull/1691
    }],
  ]);

  // parsed by EleventyExtensionMap.js fn extensionToKeyMap
  eleventyConfig.extensionMap = [
    // entry:
    {
      key: "txt",
      extension: "txt",
      // called in Engines/Custom.js fn compile:
      // compile.bind({ config: this.config })(str, inputPath);
      compile: function compile(str, inputPath, preTemplateEngine, bypass) {
        //const config = this.config;
        // called in TemplateContent.js fn render:
        // let rendered = await fn(data);
        return function render(data) {
          // file header is parsed by 11ty, simply return file source
          return str;
        }
      },
      //init: function init() { const config = this.config; },
      //getData: function getData(inputPath) { return { key: 'val' }; }, // default: getJavaScriptData
  /* parse email from textfile
  getData: async function getData(inputPath) {
    // https://nodemailer.com/extras/mailparser/
    const simpleParser = require('mailparser').simpleParser;
    const source = require('fs').readFileSync(inputPath, 'utf8');
    let parsed = await simpleParser(source);
    return parsed;
    // parsed = { subject: 'foo', from: 'bar' }
  },
  */
      //read: true, // read file contents?
    },
  ];




  //eleventyConfig.addPlugin(pluginRss);
  //eleventyConfig.addPlugin(pluginSyntaxHighlight);
  //eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");



  // https://www.11ty.dev/docs/quicktips/inline-css/
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter('inputPathPretty', function(inputPath) {
    return inputPath.replace(/^\.\//, ''); // remove leading './'
  });

  // https://www.11ty.dev/docs/quicktips/inline-css/
  eleventyConfig.addFilter("dump", function(obj) {
    return JSON.stringify(obj, null, 2);
  });



  eleventyConfig.addFilter("pages", function(array) {
    return array;
    //console.dir({ filter_pages_array: array }, { depth: 3 });
    //array.map(collectionItem => console.log(`url ${collectionItem.url} + filePathStem ${collectionItem.filePathStem}`))
    return array.filter(collectionItem => (
      collectionItem.url.slice(0, 7) == '/pages/' &&
      collectionItem.url.indexOf('ignore') == -1
    ))
  });
  /*
    collectionItem = {
      template: Template {
        inputPath: './src/pages/page-190.html',
        fileSlugStr: 'page-190',
        filePathStem: '/pages/page-190',
      },
      fileSlug: 'page-190',
      filePathStem: '/pages/page-190',
      url: '/pages/page-190/',
    }
  */

  // https://www.npmjs.com/package/eleventy-plugin-transformdom

  /*
  */


  function getElementTransformer(selector, options = {}) {
    const domTransformer = {
      selector,
      transform: ({ elements, document }) => {

        const defaultOptions = {
          name: 'div',
          attributes: (e => Object.fromEntries(Array.from(e.attributes).map(a => [a.name, a.value]))),
          class: (e => e.localName),
        };
        options = Object.assign(defaultOptions, options);
        const getName = (typeof options.name == 'function') ? (e => options.name(e, document)) : (() => options.name);
        const getAttributes = (
          (typeof options.attributes == 'function') ? (e => options.attributes(e, document)) :
          (typeof options.attributes == 'object') ? (() => options.attributes) :
          (() => false)
        );
        const getExtraClass = (
          (typeof options.class == 'function') ? (e => options.class(e, document)) :
          (typeof options.class == 'string') ? (() => options.class) :
          (() => false)
        );

        for (let e = 0; e < elements.length; e++) {
          const element = elements[e];
          const nameNew = getName(element);
          if (!nameNew || nameNew == e.localName) continue; // no replace
          const attributesNew = getAttributes(element) || {};
          const extraClassNew = getExtraClass(element);
          const elementNew = document.createElement(nameNew);

          for (let a = 0; a < element.attributes.length; a++) {
            const attr = element.attributes[a];
            elementNew.setAttribute(attr.name, attr.value); // copy attribute
          }

          for (const [name, value] of Object.entries(attributesNew)) {
            elementNew.setAttribute(name, value);
          }
          elementNew.innerHTML = element.innerHTML;
          if (extraClassNew) elementNew.classList.add(extraClassNew);
          //element.parentNode.replaceChild(elementNew, element);
          element.replaceWith(elementNew);
        }
      },
    };
    return domTransformer;
  }

  function getSvgInlineTransformer() {
    const srcRoot = staticConfig.dir.input; // global
    // https://stackoverflow.com/a/54579530/10440128
    const getAllAttributes = el => (el.getAttributeNames()
      .reduce((obj, name) => ({ ...obj, [name]: el.getAttribute(name) }), {}));
    const domTransformer = {
      selector: 'svg[src]', // <svg src="path/to/file.svg">
      transform: ({ elements, document }) => {
        for (const element of elements) {
          const attributes = getAllAttributes(element);
          //console.dir({ svg_src_attributes: attributes });
          const srcPath = srcRoot + '/' + attributes.src;
          delete attributes.src;
          attributes['data-srcpath'] = srcPath;
          // read svg file + remove xml header
          const srcText = fs.readFileSync(srcPath, 'utf8').replace(/<\?xml.*?\?>/, '');
          const elementTemp = document.createElement('div');
          elementTemp.innerHTML = srcText;
          const elementNew = elementTemp.querySelector('svg');
          const { width, height } = attributes;
          if (width || height) {
            elementNew.removeAttribute('width');
            elementNew.removeAttribute('height');
            if (width) elementNew.setAttribute('width', width);
            if (height) elementNew.setAttribute('height', height);
            delete attributes.width;
            delete attributes.height;
          }
          if (attributes.class) {
            const c1 = elementNew.getAttribute('class');
            const c2 = attributes.class;
            elementNew.setAttribute('class', (c1 ? `${c1} ${c2}` : c2));
            delete attributes.class;
          }
          for (const [key, val] of Object.entries(attributes)) {
            elementNew.setAttribute(key, val);
          }
          element.replaceWith(elementNew);
        }
      },
    };
    return domTransformer;
  }

  const metadata = require(appRoot + '/src/_data/metadata.js');

  eleventyConfig.addPlugin(transformDomPlugin, [

    getElementTransformer('page', { class: 'page-element' }),

    // <langs> -> <div class="langs">
    getElementTransformer('langs', {
      attributes: (e, document) => {
        //e.children.forEach(cn => {
        Array.prototype.forEach.apply(e.children, [ cn => {
          // <en> -> <div lang="en"> etc.
          // <lang.en> -> <div lang="en"> etc.
          const elementNew = document.createElement('div');
          const langCode = cn.localName.startsWith('lang.') ? cn.localName.slice(5) : cn.localName;
          if (cn.attributes) {
            for (let a = 0; a < cn.attributes.length; a++) {
              const attr = cn.attributes[a];
              elementNew.setAttribute(attr.name, attr.value); // copy attribute
            }
          }
          elementNew.setAttribute('lang', langCode);
          if (langCode != metadata.defaultLanguage) {
            elementNew.setAttribute('class', 'hidden');
          }
          elementNew.innerHTML = cn.innerHTML;
          cn.replaceWith(elementNew);
        } ]);
      }}
    ),

    getElementTransformer('nw', { name: 'span', class: 'nowrap-element' }),

    /*
    // use language list from metadata.json
    ...(metadata.languages.split(' ')).map(langKey => 

      getElementTransformer(langKey,
        //{ name: 'span', attributes: (e => ({ lang: e.localName })), class: (e => {
        // <span> tag is too limiting, e.g. cannot contain <pre> tags -> use <div> tags
        {
          name: 'div',
          attributes: e => {
            const attrs = {};
            attrs.lang = e.localName;
            return attrs;
          },
          class: e => {
            e.parentNode.classList.add('langs');
            if (e.localName != metadata.defaultLanguage) {
              return 'hidden';
            }
            return false; // no extra class for the new element
          },
        })
    ),
    */

    getSvgInlineTransformer(),
  ]);




  // https://github.com/11ty/eleventy/issues/1265
  const isDevelopment = process.env.NODE_ENV == `development`;
  const isProduction = !isDevelopment;

  const doMinifyJs = false;

  if (isProduction && doMinifyJs) {
    // https://www.11ty.dev/docs/quicktips/inline-js/
    const { minify } = require("terser");
    eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
      code,
      callback
    ) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    });
  }
  else {
    eleventyConfig.addFilter("jsmin", code => code); // noop
  }









  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  eleventyConfig.addCollection("tagList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });



  //eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("src/css");
  //eleventyConfig.addPassthroughCopy("src/js"); // -> jsbundler

  /* -> jsbundler
  eleventyConfig.addPassthroughCopy({
    //"node_modules/diff/dist/diff.js": "js/lib/diff.js", // included in book.njk
    //"node_modules/htmldiff/js/htmldiff.js": "js/lib/htmldiff.js", // included in book.njk
    "patched_modules/mblink--htmldiff.js/htmldiff.js/dist/htmldiff.js": "js/lib/htmldiff.js",
    "patched_modules/mblink--htmldiff.js/htmldiff.js/dist/htmldiff.js.map": "js/lib/htmldiff.js.map",

    "node_modules/xregexp/": "js/lib/xregexp",
    // FIXME bundle javascript https://github.com/fpapado/eleventy-with-vite

  }, { expand: true });
  */
  
  // https://github.com/11ty/eleventy/issues/768
  // How to include node_modules for use in js files
  // https://www.11ty.dev/docs/copy/
  eleventyConfig.setUseGitIgnore (false);
  //eleventyConfig.addPassthroughCopy("node_modules/@fontsource/noto-sans", { expand: true });
  //eleventyConfig.addPassthroughCopy("node_modules/@fontsource/noto-mono", { expand: true });



  // wait for https://github.com/11ty/eleventy/pull/1686
  // when we use pnpm to install npm packages,
  // the node_modules/@fontsource/noto-sans is a symlink
  // and we must pass { expand: true } to recursive-copy
  eleventyConfig.addPassthroughCopy({
    // source paths are relative to the project root
    // we must copy all files, so css includes can be resolved
    
    // this would copy too many files
    //"node_modules/@fontsource/noto-sans": "css/noto-sans",
    //"node_modules/@fontsource/noto-mono": "css/noto-mono",

    // copy only needed files
    // what files are needed? see output of: npm run dev
    "node_modules/@fontsource/noto-sans/latin.css": "css/noto-sans/latin.css",
    "node_modules/@fontsource/noto-sans/latin-700.css": "css/noto-sans/latin-700.css", // bold font
    "node_modules/@fontsource/noto-sans/files/noto-sans-latin-400-normal.woff2": "css/noto-sans/files/noto-sans-latin-400-normal.woff2",
    "node_modules/@fontsource/noto-mono/latin.css": "css/noto-mono/latin.css",
  }, { expand: true });

  eleventyConfig.addPassthroughCopy({
    // source paths are relative to the project root
    // we must copy all files, so css includes can be resolved
    
    // this would copy too many files
    //"src/images": "images",
    // svg images are inlined in the build process
    // raster images (jpg, png, gif) could also be inlined as base64 data urls ...
    // but for now, we keep them as external files
    // we only need to inline svg files to fix svg viewports
    // that would be broken with <img src="img/file.svg">
    // TODO: make the svg files better accessible in the web interface
    // -> click to zoom
    // -> allow to share only the svg image: add public URL to https://milahu.github.io/alchi/src/alchi-book/images/...

    // copy only needed files
    // what files are needed? see output of: npm run dev
    "src/images/should-vs-is.disgust-fight.disgusto-pelea.more-contrast.turc-orange.gif": "images/should-vs-is.disgust-fight.disgusto-pelea.more-contrast.turc-orange.gif",
    "src/images/milahu-orange.jpg": "images/milahu-orange.jpg",
  }, { expand: true });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  })
  .disable("code") // Disable whitespace-as-code-indicator, which breaks a lot of markup @ https://github.com/fpapado/eleventy-with-vite
  ;
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync(staticConfig.dir.output + '/404.html');

        browserSync.addMiddleware("*", (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });



  // https://github.com/fpapado/eleventy-with-vite/pull/2
  staticConfig.jsBundleDevserver = process.env.NODE_BUNDLER_DEVSERVER;
  new JsBundle(staticConfig).addNunjucksShortcodes(eleventyConfig);



  return staticConfig;
};



// https://github.com/fpapado/eleventy-with-vite/pull/2

class JsBundle {

  constructor(staticConfig) {
    this.staticConfig = staticConfig;
    if (this.staticConfig.jsBundleDevserver)
      console.log(`use bundler on ${this.staticConfig.jsBundleDevserver}`)
    else
      console.log(`${__filename}: NODE_BUNDLER_DEVSERVER is empty`); // debug
    this.manifest = this.staticConfig.isProduction && JSON.parse(
      fs.readFileSync(this.staticConfig.dir.output + "/manifest.json")
    );
    // default entrypoint for the bundler. in practice you might have multiple entrypoints
    // then in the template, use
    // {% jsBundleHead "src/client/some-entrypoint.js" %}
    // {% jsBundleFoot "src/client/some-entrypoint.js" %}

    this.defaultFile = this.staticConfig.jsBundleEntryFiles[0];
  }

  chunk(file) {
    if (!file) throw new Error("file is empty");
    // file can be relative to project root, or relative to jsBundleEntryDir
    const chunk = this.manifest[file] || this.manifest[this.staticConfig.jsBundleEntryDir + file];
    if (chunk) return chunk;
    const possibleEntries = JSON.stringify(Object.values(this.manifest).filter(chunk => chunk.isEntry).map(chunk => chunk.src));
    throw new Error(`No entry for ${file} found in ${this.staticConfig.dir.output}/manifest.json. Valid entries in manifest: ${possibleEntries}`);
  }

  moduleScriptTag(file, attr) {
    if (!file) file = this.defaultFile;
    const chunk = this.chunk(file);
    const html = `<script ${attr} src="${this.staticConfig.pathPrefix}${chunk.file}"></script>`;
    console.log(`JsBundle moduleScriptTag: html = ${html}`)
    return html;
  }

  moduleTag(file) { return this.moduleScriptTag(file, 'type="module"'); }

  scriptTag(file) { return this.moduleScriptTag(file, 'nomodule'); }

  styleTag(file) {
    if (!file) file = this.defaultFile;
    const chunk = this.chunk(file);
    if (!chunk.css || chunk.css.length === 0) {
      console.warn(`No css found for ${file} entry. Is that correct?`);
      return "";
    }
    /* There can be multiple CSS files per entry, so assume many by default */
    return chunk.css.map(cssFile => `<link rel="stylesheet" href="${this.staticConfig.pathPrefix}${cssFile}"></link>`).join("\n");
  }

  preloadTag(file) {
    if (!file) file = this.defaultFile;
    /* Generate link[rel=modulepreload] tags for a script's imports */
    /* TODO(fpapado): Consider link[rel=prefetch] for dynamic imports, or some other signifier */
    const chunk = this.chunk(file);
    if (!chunk.imports || chunk.imports.length === 0) {
      console.log(`The script for ${file} has no imports. Nothing to preload.`);
      return "";
    }
    /* There can be multiple import files per entry, so assume many by default */
    /* Each entry in .imports is a filename referring to a chunk in the manifest; we must resolve it to get the output path on disk.
    */
    return (chunk.imports.map((importfile) => {
      const chunk = this.chunk(importfile);
      return `<link rel="modulepreload" href="${this.staticConfig.pathPrefix}${chunk.file}"></link>`;
    })).join("\n");
  }

  headTags(file) {
    if (!file) file = this.defaultFile;
    if (this.staticConfig.isProduction) {
      console.log(`JsBundle headTags: file = ${file}`)
      return [
        this.styleTag(file),
        this.preloadTag(file)
      ].join('\n');
    } else return `<!-- JsBundle.headTags: no head includes in dev mode -->`;
  }

  footTags(file) {
    if (!file) file = this.defaultFile;
    console.log(`JsBundle footTags: file = ${file}`)
    // We must split development  and production scripts
    // In development, vite runs a server to resolve and reload scripts
    // In production, the scripts are statically replaced at build-time 
    //
    // The build.env variable is assigned in src/_data/build.js
    // @see https://vitejs.dev/guide/backend-integration.html#backend-integration
    // @see https://www.11ty.dev/docs/data-js/#example-exposing-environment-variables
    if (this.staticConfig.isProduction) {
      return [
        this.moduleTag(file),

        // TODO only needed with @vitejs/plugin-legacy -> auto detect?
        //this.scriptTag("vite/legacy-polyfills"),
        //this.scriptTag(file.replace(/\.js$/, '-legacy.js'))

      ].join('\n');
    } else {
      return [
        `<!-- JsBundle.footTags: file = ${file} -->`,
        `<script type="module" src="${this.staticConfig.jsBundleDevserver}/@vite/client"></script>`,
        
        // TODO verify
        //`<script type="module" src="${this.staticConfig.jsBundleDevserver}/${file}"></script>`,
        `<script type="module" src="${this.staticConfig.jsBundleDevserver}/${this.staticConfig.jsBundleEntryDir}${file}"></script>`,
        
      ].join('\n');
    }
  }

  addNunjucksShortcodes(eleventyConfig, shortcode) {
    const shortcodeDefault = {
      //module: 'jsBundleModule', script: 'jsBundleScript',
      //style: 'jsBundleStyle', preload: 'jsBundlePreload',
      head: 'jsBundleHead', foot: 'jsBundleFoot',
    };
    shortcode = Object.assign({}, shortcodeDefault, shortcode || {});
    //eleventyConfig.addNunjucksShortcode(shortcode.module, (...a) => this.moduleTag(...a));
    //eleventyConfig.addNunjucksShortcode(shortcode.script, (...a) => this.scriptTag(...a));
    //eleventyConfig.addNunjucksShortcode(shortcode.style, (...a) => this.styleTag(...a));
    //eleventyConfig.addNunjucksShortcode(shortcode.preload, (...a) => this.preloadTag(...a));
    eleventyConfig.addNunjucksShortcode(shortcode.head, (...a) => this.headTags(...a));
    eleventyConfig.addNunjucksShortcode(shortcode.foot, (...a) => this.footTags(...a));
    return this; // chainable
  }
}
