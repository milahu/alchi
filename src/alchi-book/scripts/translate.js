// FIXME export and import are out of sync
// first paragraph of page-005 is imported to page-000 <div id="book-subtitle">

// FIXME translate <table> and <svg>

// TODO detect when translations get out of sync
// -> extract text fragments to separate database file
// and watch for changes

// TODO add <table> contents to auto-translate
// see page-170.html and page-180.html in src/pages

// alternative to google translate:
// https://www.deepl.com/Translator
// https://www.deepl.com/translator#cs/en/ahoi!%20jak%20se%20mas%3F%0A

// TODO store backup files in /backup/ -> keep /src/pages/ clean

// FIXME should not insert whitespace after closing tags
// FIXME indent before opening tags should be preserved correctly

// TODO backup: keep file names, use folder to store date + time

// TODO automate rollback:
//   move /src/pages/*.html to /trash/
//   move /backup/*.${lastDate}.bak back to /src/pages/

// TODO verify/find source node location with checksum

// TODO store "extra state" in separate json file, e.g. checksums of input nodes

// TODO avoid double inserts

// TODO fix whitespace around tags, fix indents

// TODO allow to reduce charLimit to 1000 for google translate
// to make semi-automatic translations easier
// google translate shows alternative translations only at the bottom of the page

// TODO verify: all text-fragments are inserted

// NOTE bug in deepl: in few cases, deepl translates xml tags, e.g. </fragment> -> </fragmentum> (en -> hu)
// -> use <html>
// TODO verify number of fragments, or verify valid xml

// FIXME indent of one-line inserts, like
// <hu auto t="2021-05-21.16-35-16">Realista kontra idealista</hu>
// <hu auto t="2021-05-21.16-35-16">Támadás és menekülés</hu>

const dryRun = false;
//const dryRun = true; // debug: dont edit files

const showDebug = true;


let useXml = false;
let translatorName = 'google';

function main() {

  const argv = process.argv.slice(1); // argv[0] is node

  const sourceLang = argv[1];
  const targetLang = argv[2];
  const inputFile = argv[3];

  //const translatorName = 'google';
  translatorName = (
    translatorLangs.deepl.includes(targetLang) ? 'deepl' :
    'google'
  );

  // DEBUG
  translatorName = 'google';

  const xmlTranslators = [
    //'deepl', // not really. some xml is preserved, some xml is translated -> not usable
  ];
  useXml = xmlTranslators.includes(translatorName);

  if (sourceLang && targetLang && inputFile && fs.existsSync(inputFile)) {
    importLang(sourceLang, targetLang, inputFile);
  }
  else if (sourceLang && targetLang) {
    exportLang(sourceLang, targetLang);
  }
  else {
    showHelp();
  }
}



function showHelp() {
  const scriptName = 'scripts/' + __filename.split('/').pop();
  console.log(
    'usage:\n' +
    `node ${scriptName} <sourceLang> <targetLang>\n` +
    `node ${scriptName} <sourceLang> <targetLang> <translationFile>\n` +
    '\n' +
    'sample:\n' +
    `node ${scriptName} de en # from source files, generate translate-de2en.html\n` +
    `# manually create translate-de2en.txt\n` +
    `node ${scriptName} de en translate-de2en.txt # add <en auto t="${dateTime()}">...</en> tags to source files\n` +
    `# manually fix the translations, and replace <en auto t="${dateTime()}"> with <en>\n`
    //`node ${scriptName} translate-de2en.txt en\n`
  )
}



const translatorLangs = {
  deepl: [
    // 2021-05-25
    'bg', 'zh', 'cs', 'da', 'nl', 'et', 'fi', 'fr', 'de', 'el', 'hu', 'it', 'ja',
    'lv', 'lt', 'pl', 'pt', 'pt-PT', 'pt-BR', 'ro', 'ru', 'sk', 'sl', 'es', 'sv'
  ],
};

const previewTextLength = 500;

const fs = require('fs');
//const net = require('net');
//const child_process = require('child_process');
const appRoot = require('app-root-path').path;
//const npmRun = require('npm-run');
const path = require('path');
const glob = require('fast-glob');
const { parse } = require('node-html-parser');
const htmlEntities = require('he');

const elevConf = require(appRoot + '/config/eleventy.config.js')();
//console.dir({ elevConf });

process.chdir(appRoot);

const scriptPath = path.relative(appRoot, process.argv[1]);

//const inputDir = appRoot + '/' + elevConf.dir.input;
const inputDir = elevConf.dir.input;
const infilesGlob = inputDir + '/pages/*.html';

const sourceLangList = ['de', 'en']; // TODO get from 11ty metadata

// group numbers in three (translator services can split long numbers)
// use numbers > 256 to avoid collisions with ascii charcodes (matching is non-greedy)
// note. regex special chars like ()[]{}.*+? are not yet supported
const mark = {
  node1: '981 982',
  node2: '983 984',
  node3: '985 986',
  tagZ1: '987 988',
  tagZ2: '989 990',
  //tagZ3: '989 990', // close tag + space after
  //tagA0: '', // open tag + space before
  tagA1: '991 992',
  tagA2: '993 994',
  enti1: '995 996',
  enti2: '997 998',
};



// https://github.com/iansan5653/unraw/issues/29
// deepl.com:
//   / -> \/
//   \ -> \\
function deeplBackslashEncode(str) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    const char16bit = str[i];
    const code = char16bit.charCodeAt(0);
    res += (
      (code == 47) ? '\\/' : // forward slash
      (code == 92) ? '\\\\' : // backslash
      char16bit
    );
  }
  return res;
}

function dateTime(date = null) {
  // sample result: '2021-03-21.21-05-36'
  if (!date) date = new Date();
  return date.toLocaleString('lt').replace(/:/g, '-').replace(' ', '.');
}

function dateStr(date = null) {
  // sample result: '2021-03-21'
  if (!date) date = new Date();
  return date.toLocaleString('lt').split(' ')[0];
}

const crypto = require("crypto");

function sha1sum(str) {
  return crypto.createHash("sha1").update(str).digest("base64");
}



function exportLang(sourceLang = 'de', targetLang = 'en') {

  // TODO more dynamic ...
  // check src/pages/*.html if sourceLang is found
  if (sourceLangList.includes(sourceLang) == false) {
    console.log(`error: sourceLang ${sourceLang} not found. must be one of: ${sourceLangList.join(', ')}`);
    process.exit(1);
  }

  const htmlFile = `translate-${sourceLang}2${targetLang}.html`;
  if (fs.existsSync(htmlFile)) {
    console.log(`error: output file exists: ${htmlFile}`);
    console.log(`\nsolutions:`);
    console.log(`mv ${htmlFile} ${htmlFile}.${dateTime()}.bak`);
    console.log(`rm ${htmlFile}`);
    process.exit(1);
  }

  console.log(`glob: ${infilesGlob}`);

  const textParts = [];
  const replacementList = [];

  // NOTE in right-to-left scripts (arabic, ...)
  // the order of groups will *appear* to be reversed
  // english: [(123 456) hello world (563 323)]
  // arabic: [(323563) xxxxxx (456123)] // also the spaces are removed
  // uigur: [(323 563) xxxxxx (456 123)]

  function fmtNum(num) {
    // split long number in groups of three digits
    // https://stackoverflow.com/a/6786040/10440128
    return `${num}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }

  function getReplace(match) {
    replacementId = replacementList.length;
    replacementList.push(match);
    return `\n[${fmtNum(replacementId)}]\n`;
    // google translate will fail if replacements and text are in one line
    // e.g. when translating to japanese:
    // (123 456) hello world (563 323) -> (123 456) hello world (563 323)
    // (123 456) \n hello world \n (563 323) ->（123 456）\n こんにちは世界 \n（563 323）

    // kurdish breaks with round braces (adds "Polonî"):
    // (123 456) \n hello world \n (563 323) -> Polonî (123 456) \n silav dinya \n (563 323)
    // [123 456] \n hello world \n [563 323] -> [123 456] \n silav dinya \n [563 323]

  }

  // loop input files
  glob.sync(infilesGlob)
  //.slice(0, 2) // debug: process less input files
  .forEach((file, fileIdx) => {

    console.log(`input: ${file}`);
    const root = parse(fs.readFileSync(file, 'utf8'));

    /*
    const childSelectors = sourceLangList;
    // get unique array. this should preserve the order of array items
    const parentNodes = [...new Set(
      root.querySelectorAll(childSelectors.join(','))
      .map(node => node.parentNode)
    )];
    */

    const parentNodes = root.querySelectorAll('langs, .langs');

    // loop parentNodes -> get textParts
    for (const [pi, p] of parentNodes.entries()) {

      p.querySelectorAll(`${sourceLang}, *[lang="${sourceLang}"]`).forEach((n, ni) => {

        const wrap = (n.hasAttribute('lang') == false);
        const sBase = wrap ? n.innerHTML : n.outerHTML;

        const base = `${sourceLang}#${sha1sum(n.innerHTML).slice(0, 8)}`;

        const sXml = `<html f="${fileIdx}" p="${pi}" n="${ni}" w="${wrap ? 1 : 0}" b="${base}">${sBase}</html>`;

        const textPart = (
          useXml
          ? sXml
          : sXml
          // replace xml
          // space can be removed by the translator -> replace

          .replace(/\s*(\([\d ]+\)|<(.+?)>|&([^ ]+);)\s*/sg, match => getReplace(match))

          //.replace(/\s*\([\d ]+\)\s*/sg, match => getReplace(match)) // numbers in braces. we use this pattern for replacements
          //.replace(/\s*<\/(.+?)>\s*/sg, match => getReplace(match)) // close tags
          //.replace(/\s*<(.+?)>\s*/sg, match => getReplace(match)) // open tags
          //.replace(/\s*&([^ ]+);\s*/g, match => getReplace(match)) // html entities
        );

        if (1 && showDebug) console.log(`textPart:\n${textPart}\n`);

        textParts.push(textPart);
      })
    } // done loop parentNodes

    // DEBUG
    return;

  }); // done loop input files

  if (0 && showDebug) {
    for (let i = 0; i < replacementList.length; i++) {
      console.log(`[${fmtNum(i)}] = ${replacementList[i]}`)
    }
  }



  // generate links
  const charLimit = 5000; // google, deepl



  // TODO remove <meta> ... but how to encode?

  let lastGroupSize = 0;

  const textGroups = (
    textParts.reduce((acc, val) => {
      const nextLen = acc[acc.length - 1].length + val.length + 3*(`\n\n<meta attrrrrrrrr="vallll"/>\n\n`.length);
      if (nextLen >= charLimit) {
        if (useXml) {
          const nextNumber = acc.length + 1;
          acc[acc.length - 1] += `<meta lastsize="${lastGroupSize}"/>\n\n<meta nextpage="${nextNumber}"/>\n\n`;
          acc.push(`<meta page="${nextNumber}"/>\n\n`);
        }
        else {
          acc.push('');
        }
        lastGroupSize = 0;
      }
      acc[acc.length - 1] += val + '\n\n';
      lastGroupSize++;
      return acc;
    }, [useXml ? `<meta nextpage="1"/>\n\n` : ''])

    // group siblings
    .map(textGroup => textGroup.replace(/\n(?:\[[\d ]+\]\s*){2,}\n/sg, matchStr => {
      const replaceIdList = [];
      // preserve extra whitespace between replacements
      matchStr.replace(/(\s*)\n\[([\d ]+)\]\n(\s*)/g, (_, spaceBefore, idStr, spaceAfter) => {
        const replaceId = parseInt(idStr.replace(/ /g, ''));
        if (0 && showDebug) console.dir({ replaceId }); // verbose
        replacementList[replaceId] = (
          spaceBefore + replacementList[replaceId] + spaceAfter
        );
        replaceIdList.push(replaceId);
      });
      if (0 && showDebug) console.dir({ matchStr, replaceIdList }); // verbose
      const firstId = replaceIdList.shift();
      // move all replacements to firstId
      for (const replaceId of replaceIdList) {
        replacementList[firstId] += replacementList[replaceId];
        replacementList[replaceId] = '';
      }
      return `\n[${fmtNum(firstId)}]\n`;
    }))
  );

  if (showDebug) {
    console.log(textGroups.map((s, i) => `textGroup ${i}:\n${s}\n`).join('\n'));
  }

  if (useXml) {
    textGroups[textGroups.length - 1] += `<meta end/>\n\n`;
  }

  const translateUrl = t => (
    translatorName == 'google' ? `https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&text=${encodeURIComponent(t)}&op=translate` :
    translatorName == 'deepl' ? `https://www.deepl.com/translator#${sourceLang}/${targetLang}/${encodeURIComponent(deeplBackslashEncode(t))}` :
    '#invalid-translatorName'
  );

  const translateLinks = textGroups.map(t => (
    `<li><a target="_blank" href="${translateUrl(t)}">${htmlEntities.encode(t.slice(0, previewTextLength/2))} ... ${htmlEntities.encode(t.slice(-previewTextLength/2))}</a></li>`
  ));

  const htmlSrc = (
    '<style>' +
      'a:visited { color: green; }' +
      'a { text-decoration: none; }' +
      'a:hover { text-decoration: underline; }' +
      'li { margin-bottom: 1em; }' +
    '</style>' +
    '<ol>\n\n' + translateLinks.join('\n\n') + '</ol>\n' +
    // embed replacements in html comment
    '<!-- replacementList = ' +
    JSON.stringify(replacementList) +
    ' = replacementList -->'
  );

  fs.writeFileSync(htmlFile, htmlSrc, 'utf8');
  const htmlFileUrl = encodeURI('file://' + path.resolve(htmlFile));
  console.log(`output: ${htmlFile}`);
  console.log(`
next steps:

1. open in your browser:
   ${htmlFileUrl}
2. click the first link
3. fix the translation on the translator website,
   so the translator can learn to translate better
4. scroll down, on the bottom right, click on: copy translation
5. paste the translation to your text editor
   remove the footers:
   Translated with www.DeepL.com/Translator (free version)
6. repeat for all links (append translations to text file)
7. save the text file, for example as translate-${sourceLang}2${targetLang}.txt
8. run this script again with the text file, for example:
node ${scriptPath} ${sourceLang} ${targetLang} translate-${sourceLang}2${targetLang}.txt
9. add the new language code to src/_data/metadata.js -> metadata.languages
10. restart the dev server (hot reload is not working here)

note:
translators will change the order of words,
so in some cases, html markup tags like <b>....</b>
will be in a wrong position.

note:
the ${htmlFile} file is valid only for one iteration.
if you added nodes to the html files,
then you must generate a new ${htmlFile} file
`)
}



//function importLang(sourceLang, targetLang, inputFile, tagName) {
function importLang(sourceLang, targetLang, inputFile) {
  let input = fs.readFileSync(inputFile, 'utf8');
  const inputTime = dateTime(fs.statSync(inputFile).birthtime);

  //if (!tagName) tagName = `${targetLang}-${sourceLang}2${targetLang}`;
  const tagName = targetLang;
  const tagAttrs = `generator="${translatorName}" t="${inputTime}"`;

  // validate
  if (useXml) {
    const numOpen = input.match(/<html/g).length;
    const numClose = input.match(/<\/html>/g).length;
    if (numOpen != numClose) {
      console.log(`ERROR in ${inputFile}: tags mismatch`);
      console.log(`open   <html> tags: ${numOpen}`);
      console.log(`close </html> tags: ${numClose}`);
      process.exit(1);
    }
  }



  // decode replacements
  const htmlFile = `translate-${sourceLang}2${targetLang}.html`;
  if (fs.existsSync(htmlFile) == false) {
    console.log(`error: html file not found: ${htmlFile}`);
    console.log('this file is required to decode replacements');
    process.exit(1);
  }
  const htmlSrc = fs.readFileSync(htmlFile, 'utf8');
  const replacementListMatch = htmlSrc.match(/<!-- replacementList = (.*) = replacementList -->/s);
  if (replacementListMatch == null) {
    console.log(`parse error: replacementList not found in ${htmlFile}`);
    process.exit(1);
  }
  console.dir({ replacementListMatch }); // huuuuge
  const replacementList = JSON.parse(replacementListMatch[1]);

  input = input.replace(/\n\[([\d ]+)\]\n/sg, (_match, idStr) => {
    const replaceId = parseInt(idStr.replace(/ /g, ''));
    return replacementList[replaceId];
  });



  // parse
  // TODO escape special regex chars in `mark.node1` etc
  // FIXME positions are wrong (en2hu)
  const textParts = [];
  const inputRest = input.replace(
    ///(?:<!-- .+? -->\n\n)?<html f="([0-9]+)" p="([0-9]+)" n="([0-9]+)" w="([0-9]+)" b="([^"]+)">(.+?)<\/html>(?:\n\n<!-- .+? -->)?/sg,
    /<html f="([0-9]+)" p="([0-9]+)" n="([0-9]+)" w="([0-9]+)" b="([^"]+)">(.+?)<\/html>/sg,
    (_, file, pi, ni, wrap, base, str) => {
      file = parseInt(file);
      part = parseInt(part);
      node = parseInt(node);
      wrap = (wrap == '0') ? false : true;
      str = (
        true
        ? str // no decode

        // old stuff:
        : str
        // FIXME whitespace around braces/numbers/... its a mess!
        // decode html markup
        .replace(
          // close tag: consume whitespace before
          new RegExp(` ?\\(${mark.tagZ1} ([0-9 ]+?) ${mark.tagZ2}\\)`, 'g'),
          (_, m) => {
            const decStr = m.split(' ').map(c => String.fromCharCode(c)).join('');
            const [, tag, spaceAfter] = decStr.match(/^(.*\S)(\s*)$/sg);
            return `</${tag}>${spaceAfter}`;
          }
        )
        .replace(
          // open tag: consume whitespace after
          //new RegExp(`${mark.tagA1} ([0-9 ]+?) ${mark.tagA2} ?`, 'g'), // TODO restore
          new RegExp(` ?\\(${mark.tagA1} ([0-9 ]+?) ${mark.tagA2}\\) ?`, 'g'),
          (_, m) => {
            const decStr = m.split(' ').map(c => String.fromCharCode(c)).join('');
            //console.log(`DEBUG decStr = ${JSON.stringify(decStr)}`)
            //console.log(`DEBUG decStr match:`); console.dir(decStr.match(/^(\s*)(\S.*)$/sg))
            const [, spaceBefore, tag] = decStr.match(/^(\s*)(\S.*)$/sg);
            return `${spaceBefore}<${tag}>`;
          }
        )
        // decode html entities
        .replace(
          new RegExp(` ?\\(${mark.enti1} ([0-9 ]+?) ${mark.enti2}\\) ?`, 'g'),
          (_, m) => '&'+m.split(' ').map(c => String.fromCharCode(c)).join('')+';',
        )
      );
      textParts.push({ file, part, node, str, wrap, base });
      return ''; // remove from input
    }
  ); // done parse

  //console.dir(textParts);
  console.log(`inputRest = ${JSON.stringify(inputRest.replace(/\n+/sg, '\n'))}`);

  const backupDir = `backup/translate/${dateTime()}-${sourceLang}2${targetLang}`;

  const rollbackScriptPath = `${backupDir}/rollback.sh`;
  let rollbackScript = [
    '#!/usr/bin/env bash',
    '# rollback translation',
    '',
  ].join('\n');

  const diffScriptPath = `${backupDir}/diff.sh`;
  let diffScript = [
    '#!/usr/bin/env bash',
    '# diff translation',
    'shopt -s expand_aliases',
    `alias diff='diff -u --color=always'`,
    '',
  ].join('\n');

  console.log(`glob: ${infilesGlob}`);
  // we assume that source files did not change since we called exportLang()
  // TODO verify automatic, mismatch is fatal error
  let changedFiles = 0;

  glob.sync(infilesGlob)
  //.slice(0, 2) // debug: process less input files
  .forEach((file, fileIdx) => {

    //console.log(`input: ${file}`);
    const sourceBefore = fs.readFileSync(file, 'utf8');
    const root = parse(sourceBefore);

    const parentNodes = root.querySelectorAll('langs, .langs');

    let insertedNodes = 0;
    // loop parentNodes -> get textParts
    for (const [pi, p] of parentNodes.entries()) {
      p.querySelectorAll(`${sourceLang}, *[lang="${sourceLang}"]`).forEach((n, ni) => {

        const textNode = textParts.find(o => (
          o.file == fileIdx &&
          o.part == pi &&
          o.node == ni
        ));
        if (!textNode) {
          //console.log(`warning: no imported translation for ${fileIdx} ${pi} ${ni} ${n.toString().slice(0, 100)} ...`);
          return; // continue
        }

        const extraAttrs = `base="${base}"`;

        // FIXME indent is wrong for one-liners
        const indent = n.toString().split('\n').slice(-1)[0].match(/^\s*/)[0];
        const newHtml = textNode.wrap
          ? `\n${indent}<${tagName} ${tagAttrs} ${extraAttrs}>${textNode.str}</${tagName}>`
          : `\n${indent}${textNode.str.replace(/^<([^>]+)>/, `<$1 ${tagAttrs} ${extraAttrs}>`)}`
        ;
        n.insertAdjacentHTML('afterend', newHtml);
        insertedNodes++;

        if (dryRun == true) {
          console.log(`old node:`); console.dir({ ...textNode, str: '', file }); console.log(n.toString())
          console.log(`new node:`); console.log(`\n${indent}<${tagName} ${tagAttrs}>${textNode.str}</${tagName}>`)
        }
      })
    }

    if (dryRun == false && insertedNodes > 0) {
      // move original to backup
      const backupFile = `${backupDir}/${file}`;
      fs.mkdirSync(path.dirname(backupFile), { recursive: true });
      fs.renameSync(file, backupFile);
      console.log(`output: ${backupFile}`);
      rollbackScript += `mv ${backupFile} ${file}\n`
      diffScript += `diff ${backupFile} ${file}\n`
      changedFiles++;

      //const outFile = file + '.add-' + targetLang + '.txt'; // use *.txt extension to avoid *.html glob match
      const outFile = file; // replace input file (after creating a backup copy)
      fs.writeFileSync(outFile, root.toString(), 'utf8');
      console.log(`output: ${outFile}`);
    }
  });

  if (dryRun == false && changedFiles > 0) {
    fs.writeFileSync(rollbackScriptPath, rollbackScript, 'utf8');
    console.log(`output: ${rollbackScriptPath}`);
    fs.writeFileSync(diffScriptPath, diffScript, 'utf8');
    console.log(`output: ${diffScriptPath}`);
  }
}

main();
