const staticConfig = {

  dir: {
    input: "src",
    output: "eleventy-output",

    // relative to input:
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
  const pluginRss = require("@11ty/eleventy-plugin-rss");
  const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  const pluginNavigation = require("@11ty/eleventy-navigation");
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




  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

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
            for (let a = 0; a < element.attributes.length; a++) {
               const attr = element.attributes[a];
               elementNew.setAttribute(attr.name, attr.value); // copy attribute
            }
  */


  function getElementTransformer(selector, options = {}) {
    const defaultOptions = {
      name: 'div',
      attributes: (e => Object.fromEntries(Array.from(e.attributes).map(a => [a.name, a.value]))),
      class: (e => e.localName),
    };
    options = Object.assign(defaultOptions, options);
    const getName = (typeof options.name == 'function') ? (e => options.name(e)) : (() => options.name);
    const getAttributes = (
      (typeof options.attributes == 'function') ? (e => options.attributes(e)) :
      (typeof options.attributes == 'object') ? (() => options.attributes) :
      (() => false)
    );
    const getExtraClass = (
      (typeof options.class == 'function') ? (e => options.class(e)) :
      (typeof options.class == 'string') ? (() => options.class) :
      (() => false)
    );
    const domTransformer = {
      selector,
      transform: ({ elements, document }) => {
        for (let e = 0; e < elements.length; e++) {
          const element = elements[e];
          const nameNew = getName(element);
          if (!nameNew) continue; // no replace
          const attributesNew = getAttributes(element) || {};
          const extraClassNew = getExtraClass(element);
          const elementNew = document.createElement(nameNew);
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

  eleventyConfig.addPlugin(transformDomPlugin, [
    getElementTransformer('page', { class: 'page-element' }),
    getElementTransformer('nw', { name: 'span', class: 'nowrap-element' }),
    ...(['de', 'en']).map(langKey => 
      getElementTransformer(langKey,
        { name: 'span', attributes: (e => ({ lang: e.localName })), class: (e => {
          e.parentNode.classList.add('langs');
          return false; // no extra class for the new element
        }) })
    )
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
  eleventyConfig.addPassthroughCopy("src/js");

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
    "node_modules/@fontsource/noto-sans": "css/noto-sans",
    "node_modules/@fontsource/noto-mono": "css/noto-mono",
  }, { expand: true });

  eleventyConfig.addPassthroughCopy({
    // source paths are relative to the project root
    // we must copy all files, so css includes can be resolved
    "src/images": "images",
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
  });
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync('_site/404.html');

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

  return staticConfig;
};
