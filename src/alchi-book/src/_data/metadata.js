const fs = require('fs');
//const appRoot = require('app-root-path').path; // fails when the eleventy package is linked (edge case)
const glob = require('fast-glob');

// find nearest package.json
function findNearestPackageDir() {
  const dirs = __dirname.split('/');
  while (dirs.length > 0) {
    const d = dirs.join('/');
    const f = d + '/package.json';
    if (fs.existsSync(f)) return d;
    dirs.pop();
  }
}
const appRoot = findNearestPackageDir();

// use last modify-time as version
const version = glob.sync(appRoot + '/src/pages/page-*.html')
  .map(file => ({ file, mtime: fs.statSync(file).mtime }))
  .sort((a, b) => (b.mtime - a.mtime)) // sort descending
  [0]
  .mtime
  .toLocaleDateString('af')
;

console.log(`metadata.js: version = ${version}`)

module.exports = {

  "languages": "de en", // TODO add new languages here
  "primarylanguage": "de", // TODO change to en when en translation is complete

  "title": "Your Blog Name", // TODO

  //"version": "2021-03-15",
  version,

  "basename": {
    "de": "pallas.ich-und-meine-sechs-freunde"
  },

  "url": "https://example.com/",
  "description": "TODO",
  "keywords": "TODO",
  "feed": {
    "subtitle": "I am writing about my experiences as a naval navel-gazer.",
    "filename": "feed.xml",
    "path": "/feed/feed.xml",
    "id": "https://example.com/"
  },
  "jsonfeed": {
    "path": "/feed/feed.json",
    "url": "https://example.com/feed/feed.json"
  },
  "author": {
    "name": "Milan Hauth",
    "email": "milahu@gmail.com",
    "url": ""
  },
};
