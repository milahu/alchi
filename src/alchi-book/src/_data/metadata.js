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



const metadata = {};

metadata.languages = "en de hu"; // TODO add new languages here

metadata.defaultLanguage = "en";
metadata.primarylanguage = metadata.defaultLanguage; // TODO rename to defaultLanguage

// TODO translate
metadata.basename = {};
metadata.basename.de = "pallas.ich-und-meine-sechs-freunde";

metadata.title = "Your Blog Name"; // TODO
metadata.version = version;

metadata.url = "https://example.com/";

// TODO SEO
metadata.description = "description"; // TODO
metadata.keywords = "keywords"; // TODO

metadata.feed = {};
metadata.feed.subtitle = "I am writing about my experiences as a naval navel-gazer.";
metadata.feed.filename = "feed.xml";
metadata.feed.path = "/feed/feed.xml";
metadata.feed.id = "https://example.com/";

metadata.jsonfeed = {};
metadata.jsonfeed.path = "/feed/feed.json";
metadata.jsonfeed.url = "https://example.com/feed/feed.json";

metadata.author = {};
metadata.author.name = "Milan Hauth";
metadata.author.email = "milahu@gmail.com";
metadata.author.url = "https://github.com/milahu";

//export default metadata;
module.exports = metadata;
