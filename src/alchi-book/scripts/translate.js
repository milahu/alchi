// TODO translate svg files

// TODO refactor src/pages/*.html to use <lang.de> instead of <de> etc. -> make tags unambiguous
// e.g. <tr> can be turkish or table row

// TODO avoid double inserts

// TODO verify: all text-fragments are inserted

// TODO auto-detect sourceLangList from files in src/pages/*.html

// TODO post-process old and manual translations
// -> add/update rev="en#xxxxxxxx" (revision ID) to keep translations in sync
// use different encoding than base64? base32 or base16 (hex) -> better for filenames
// -> easier to build a content-addressable store to cache old versions
// con: text fragments are small -> use one large database file, e.g. jsonlines format
// collision safety? git uses short IDs of only 7 chars in base16

// 14 safe symbols: '*+-/=_^<>[]{}
const codeNumKey = "'*+-/=_^{}"; // 10 digits
const codeNumRegexCharClass = "'*+-/=_\\^{}"; // escape ^ for regex character class

const removeRegexCharClass = [
  '\u200B', // ZERO WIDTH SPACE from google https://stackoverflow.com/questions/36744793
].join('');
const artifactsRegexCharClass = removeRegexCharClass + [
  ' ', // space
].join('');
const codeNumRegexCharClassImport = codeNumRegexCharClass + artifactsRegexCharClass;

const encodeNumTable = Object.fromEntries(codeNumKey.split('').map((c, i) => [i, c]));
function encodeNum(num) {
  return num.toString().split('').map(i => encodeNumTable[i]).join('');
}
const decodeNumTable = Object.fromEntries(codeNumKey.split('').map((c, i) => [c, i]));
function decodeNum(str) {
  return parseInt(str.replace(/\s+/sg, '').split('').map(c => decodeNumTable[c]).join(''));
}



const dryRunExport = 0;
const dryRunImport = 0;
const showDebug = 1;

const charLimit = 5000; // limit of google, deepl
//const charLimit = 1000; // good page size for manual translations or debugging

let useXml = false;
let translatorName = 'google';

function main() {

  const argv = process.argv.slice(1); // argv[0] is node

  const langMap = {
    zh: 'zh-CN', // simplified chinese
  };

  function getLang(str) {
    if (str && str in langMap) return langMap[str];
    return str;
  }

  const sourceLang = getLang(argv[1]);
  const targetLang = getLang(argv[2]);
  const inputFile = argv[3];

  //const translatorName = 'google';
  translatorName = (
    translatorLangs.deepl.includes(targetLang) ? 'deepl' :
    'google'
  );

  // DEBUG
  translatorName = 'google';

  // xml is broken in all translators
  // -> encode to "symbols in square braces"
  // which are preserved by all translators
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
    `node ${scriptName} de en translate-de2en.txt # add <en auto t="${nowDate}">...</en> tags to source files\n` +
    `# manually fix the translations, and replace <en auto t="${nowDate}"> with <en>\n`
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
const appRoot = require('app-root-path').path;
const path = require('path');
const glob = require('fast-glob');
const { parse } = require('node-html-parser'); // patched version github:taoqf/node-fast-html-parser#60ea8fee51f07fbc712b5642a0496f12748eb90f
const htmlEntities = require('he');

const elevConf = require(appRoot + '/config/eleventy.config.js')();

process.chdir(appRoot);

const scriptPath = path.relative(appRoot, process.argv[1]);

const inputDir = elevConf.dir.input;
const infilesGlob = inputDir + '/pages/*.html';

const sourceLangList = ['de', 'en']; // TODO get from 11ty metadata



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

const nowDate = dateTime();

const crypto = require("crypto");

function sha1sum(str) {
  return crypto.createHash("sha1").update(str).digest("base64");
}



/////////////////////// export ////////////////////////////

function exportLang(sourceLang = 'de', targetLang = 'en') {

  // TODO more dynamic ...
  // check src/pages/*.html if sourceLang is found
  if (sourceLangList.includes(sourceLang) == false) {
    console.log(`error: sourceLang ${sourceLang} not found. must be one of: ${sourceLangList.join(', ')}`);
    process.exit(1);
  }

  const htmlFile = `translate-${sourceLang}2${targetLang}.html`;
  if (!dryRunExport && fs.existsSync(htmlFile)) {
    console.log(`error: output file exists: ${htmlFile}`);
    console.log(`\nsolutions:`);
    console.log(`mv ${htmlFile} ${htmlFile}.${nowDate}.bak`);
    console.log(`rm ${htmlFile}`);
    process.exit(1);
  }

  console.log(`glob: ${infilesGlob}`);

  const textParts = [];
  //const replacementList = [];

  const replacementData = {};
  replacementData.replacementList = {}; // sparse array due to "safe" ids, see getNextSafeId
  //replacementData.indentList = [];
  replacementData.lastId = -1;

  function fmtNum(num) {
    // split long number in groups of three digits
    // https://stackoverflow.com/a/6786040/10440128
    return `${num}`.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
  }

  // google can translate -- to -
  // so we use "safe" ids without repetition
  function getNextSafeId(lastId) {
    for (let id = (lastId + 1); ; id++) {
      let idStr = id.toString();
      let idSafe = true;
      for (let charIdx = 0; charIdx < (idStr.length - 1); charIdx++) {
        if (idStr[charIdx] == idStr[charIdx + 1]) {
          // found repetition
          idSafe = false;
          //if (showDebug) console.log(`skip unsafe id ${id}`);
          break;
        }
      }
      if (idSafe) return id;
    }
  }

  function getReplace(match) {
    // global: replacementData
    const replacementId = getNextSafeId(replacementData.lastId);
    replacementData.lastId = replacementId;
    replacementData.replacementList[replacementId] = {};
    replacementData.replacementList[replacementId].value = match;
    replacementData.replacementList[replacementId].code = encodeNum(replacementId);
    replacementData.replacementList[replacementId].indentList = [];
    return `\n[${encodeNum(replacementId)}]\n`;
  }

  // loop input files
  glob.sync(infilesGlob)
  //.slice(0, 2) // debug: process less input files
  .forEach((file, fileIdx) => {

    console.log(`input: ${file}`);
    const inputHtml = fs.readFileSync(file, 'utf8');
    const root = parse(inputHtml);

    const parentNodes = root.querySelectorAll('langs, .langs');

    // loop parentNodes -> get textParts
    for (const [pi, p] of parentNodes.entries()) {

      // loop nodes
      p.querySelectorAll(`${sourceLang}, *[lang="${sourceLang}"]`).forEach((n, ni) => {

        const wrap = (n.hasAttribute('lang') == false);

        const nodeStart = n._source.start; // only in patched version of html parser
        const lineStart = inputHtml.lastIndexOf('\n', n._source.start) + 1;
        const indent = inputHtml.slice(lineStart, nodeStart).match(/^\s*/)[0];
        //if (showDebug) console.log(`indent = ${JSON.stringify(indent)}`);

        //const tagName = targetLang;
        const tagName = `lang.${targetLang}`;
        //const tagAttrs = `generator="${translatorName}" t="${nowDate}"`;
        // base of translation = sourceText
        const base = `${sourceLang}#${sha1sum(n.innerHTML).slice(0, 8)}`;
        const extraAttrs = `rev="${base}"`; // add revision ID

        // TODO properly parse + replace attributes if wrap == false
        const sBase = indent + (wrap
          ? `<${tagName} ${extraAttrs}>${n.innerHTML}</${tagName}>`
          : n.outerHTML.replace(new RegExp(`^<([^>\\s]+)\\s+[^>]*lang="${sourceLang}"[^>]*>`, 's'), `<$1 lang="${targetLang}" ${extraAttrs}>`)
        );

        if (showDebug) console.dir({ indent, wrap, tagName, extraAttrs });

        const sXml = `<html f="${fileIdx}" p="${pi}" n="${ni}">\n${sBase}\n</html>`;

        if (showDebug) console.log(`textPart before replace:\n${sXml}`);



        // encode html
        // replace with "symbols in square braces"
        // consume all whitespace around the original value
        let textPart = sXml.replace(
          new RegExp(
            [
              `\\s*`, // space before
              `(?:`,
                `\\[[${codeNumRegexCharClassImport}]+\\]`, // "symbols in square braces"
                `|`,
                `\\n{2,}`, // extra newlines: needed for transliterated translations
                `|`,
                `<.+?>`, // html tags
                `|`,
                `&[^ ]+;`, // html entities
              `)`,
              `\\s*` // space after
            ].join(''),
            'sg'
          ),
          match => getReplace(match)
        );



        // encode indents between replacements
        // use lookahead (?=...) to include delimiter as prefix
        if (1) {
        textPart = (
          textPart
          .split(new RegExp(`(?=\\n\\[[${codeNumRegexCharClass}]+\\]\\n)`))
          .map(str => {
            //console.dir({ str });
            let [_, replacement, idxStr, rest] = str.match(new RegExp(`(\\n\\[([${codeNumRegexCharClass}]+)\\]\\n)(.*)$`, 's'));
            const replaceId = decodeNum(idxStr);
            //console.dir({ rest });
            //replacementData.indentList[replaceId] = [];
            replacementData.replacementList[replaceId].indentList = [];
            // remove indents
            rest = rest.split('\n').map(line => {
              const [_, indent, lineRest] = line.match(/^(\s*)(.*)/);
              replacementData.replacementList[replaceId].indentList.push(indent);
              return lineRest;
            }).join('\n');
            return replacement + rest;
          })
        ).join('');
        }

        if (showDebug) console.log(`textPart after replace:\n${textPart}`);

        textParts.push(textPart);
      })
    } // done loop parentNodes

    //console.dir(replacementData.indentList);
    //if (fileIdx > 1) process.exit(0); // DEBUG

  }); // done loop input files

  if (1 && showDebug) {
    for (const id of Object.keys(replacementData.replacementList)) { // sparse array
      console.log(`[${encodeNum(id)}] = id ${id} = ${replacementData.replacementList[id].value}`)
    }
  }

  if (dryRunExport) return;

  // generate links



  let lastGroupSize = 0;

  const textGroups = (
    textParts.reduce((acc, val) => {
      const nextLen = acc[acc.length - 1].length + val.length + 3*(`\n\n<meta attrrrrrrrr="vallll"/>\n\n`.length);
      if (nextLen >= charLimit) {
        acc.push('');
        lastGroupSize = 0;
      }
      acc[acc.length - 1] += val + '\n\n';
      lastGroupSize++;
      return acc;
    }, [''])

    /* DEBUG is this broken?
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
    */
  );

  if (showDebug) {
    console.log(textGroups.map((s, i) => `textGroup ${i}:\n${s}\n`).join('\n'));
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
    '<!-- replacementData = ' +
    JSON.stringify(replacementData, null, 2) +
    ' = replacementData -->'
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



/////////////////////// import ////////////////////////////

function importLang(sourceLang, targetLang, inputFile) {

  let input = fs.readFileSync(inputFile, 'utf8');

  // remove unwanted characters
  input = input.replace(new RegExp(`[${removeRegexCharClass}]`, 'g'), '');

  // decode replacements
  const htmlFile = `translate-${sourceLang}2${targetLang}.html`;
  if (fs.existsSync(htmlFile) == false) {
    console.log(`error: html file not found: ${htmlFile}`);
    console.log('this file is required to decode replacements');
    process.exit(1);
  }
  const htmlSrc = fs.readFileSync(htmlFile, 'utf8');
  const replacementDataMatch = htmlSrc.match(/<!-- replacementData = (.*) = replacementData -->/s);
  if (replacementDataMatch == null) {
    console.log(`parse error: replacementData not found in ${htmlFile}`);
    process.exit(1);
  }
  const replacementData = JSON.parse(replacementDataMatch[1]);
  console.log(`loaded ${Object.keys(replacementData.replacementList).length} replacements from ${htmlFile}`);

  if (1 && showDebug) {
    for (const id of Object.keys(replacementData.replacementList)) { // sparse array
      console.dir({ id, replacement: replacementData.replacementList[id] })
      console.log(`[${encodeNum(id)}] = id ${id} = ${replacementData.replacementList[id].value}`)
    }
  }

  // quickfix to restore newlines around replacements
  input = ('\n' + input + '\n');

  // decode replacements and indents
  // copy pasta ...
  // use lookahead (?=...) to include delimiter as prefix
  // \n? -> allow missing newlines around replacements -> parse errors! -> revoke
  let lastReplaceId = -1;
  input = (
    input
    .split(new RegExp(`(?=\\n\\[[${codeNumRegexCharClassImport}]+\\]\\n)`)) // add \n to match
    .map(str => {
      console.dir({ blockStr: str });
      const m = str.match(new RegExp(`(\\n?\\[([${codeNumRegexCharClassImport}]+)\\]\\n?)(.*)$`, 's')); // optional \n
      //const m = str.match(new RegExp(`(\\n\\[([${codeNumRegexCharClassImport}]+)\\]\\n)(.*)$`, 's')); // require \n
      if (!m) return str; // no replace
      let [_, _replacement, idxStr, rest] = m;
      const replaceId = decodeNum(idxStr);
      // test for steadiness = simple validation
      if (replaceId < lastReplaceId) {
        console.log(`error: replaceId is not steady. did the translator break our code?`)
        console.log(`lastReplaceId = ${lastReplaceId}`)
        console.log(`replaceId     = ${replaceId}`)
      }
      lastReplaceId = replaceId;
      console.dir({ _replacement, idxStr, replaceId, rest });
      // restore indents
      // FIXME make this more robust against newline removing (transliterated translations)
      //console.dir({ indentsForBlock: replacementData.indentList[replaceId] });
      rest = rest.split('\n').map((lineRest, lineIdx) => {
        //const indent = replacementData.indentList[replaceId][lineIdx] || '';
        const indent = replacementData.replacementList[replaceId].indentList[lineIdx] || '';
        //console.dir({ replaceId, lineIdx, indent, lineRest });
        return indent + lineRest;
      }).join('\n');
      // decode replacement
      const replacement = replacementData.replacementList[replaceId].value;
      //console.dir({ replaceId, replacement, rest });
      return replacement + rest;
    })
  ).join('');

  if (showDebug) {
    console.log('decoded html:');
    console.log(input);
    //return; // DEBUG
  }



  // validate html
  const numOpen = input.match(/<html/g).length;
  const numClose = input.match(/<\/html>/g).length;
  if (numOpen != numClose) {
    console.log(`ERROR: html tags mismatch in ${inputFile}:`);
    console.log(`open   <html> tags: ${numOpen}`);
    console.log(`close </html> tags: ${numClose}`);

    // locate first mismatch
    // assume: html tags are not nested
    const idxList = {};
    input.replace(/<html/g, (_, idx) => (idxList[idx] = 1));
    input.replace(/<\/html>/g, (_, idx) => (idxList[idx] = 0));
    let level = 0;
    // this is a mess :D
    const idxIdxList = Object.keys(idxList);
    //for (const idxStr of Object.keys(idxList)) {
    for (let idxIdx = 0; idxIdx < idxIdxList.length; idxIdx++) {
      const idxStr = idxIdxList[idxIdx];
      const isOpen = (idxList[idxStr] == 1);
      if (isOpen) level++;
      else level--;
      if (level < 0 || 1 < level) {
        const idx = parseInt(idxStr);
        // TODO handle idxIdx out of range ...
        const last2Idx = parseInt(idxIdxList[idxIdx - 2]);
        const lastIdx = parseInt(idxIdxList[idxIdx - 1]);
        const nextIdx = parseInt(idxIdxList[idxIdx + 1]);
        const next2Idx = parseInt(idxIdxList[idxIdx + 2]);
        const m = '='.repeat(30);
        console.log(`html tags mismatch starts at position ${idxStr}. context:`);
        console.log(`${m} pos -2 = ${last2Idx} ${m}`);
        console.log(input.slice(last2Idx, lastIdx));
        console.log(`${m} pos -1 = ${lastIdx} ${m}`);
        console.log(input.slice(lastIdx, idx));
        console.log(`${m} pos 0 = ${idxStr} ${m}`);
        console.log(input.slice(idx, nextIdx));
        console.log(`${m} pos +1 = ${nextIdx} ${m}`);
        console.log(input.slice(nextIdx, next2Idx));
        console.log(`${m} pos +2 = ${next2Idx} ${m}`);
        break; // show only first
      }
    }
    console.log(`fatal error: html tags mismatch. translation was not imported`)
    process.exit(1);
  }



  // parse
  const textParts = [];
  const inputRest = input.replace(
    /<html f="([0-9]+)" p="([0-9]+)" n="([0-9]+)">\n(.+?)\n<\/html>/sg,
    (_, file, part, node, str) => {
      file = parseInt(file);
      part = parseInt(part);
      node = parseInt(node);
      textParts.push({ file, part, node, str });
      return ''; // remove from input
    }
  );

  // should be empty ...
  const inputRestTrimmed = inputRest.trim();
  if (inputRestTrimmed.length > 0) {
    console.log(`inputRest = ${JSON.stringify(inputRestTrimmed.replace(/\n+/sg, '\n'))}`);
  }

  const backupDir = `backup/translate/${nowDate}.${sourceLang}2${targetLang}`;

  const rollbackScriptPath = `${backupDir}/rollback.sh`;
  let rollbackScript = [
    '#!/usr/bin/env bash',
    '# rollback translation',
    'shopt -s expand_aliases',
    `alias mv='mv --verbose'`,
    '',
  ].join('\n');

  const diffScriptPath = `${backupDir}/diff.sh`;
  let diffScript = [
    '#!/usr/bin/env bash',
    '# diff translation',
    'shopt -s expand_aliases',
    `alias diff='diff --unified --color=auto'`,
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

        n.insertAdjacentHTML('afterend', '\n' + textNode.str);
        insertedNodes++;

        if (dryRunImport) {
          const indent = textNode.str.match(/^\s*/)[0]; // quick n dirty ...
          console.log(`old node:`); console.dir({ ...textNode, str: '', file }); console.log(indent + n.toString())
          console.log(`new node:`); console.log(textNode.str)
        }
      })
    }

    if (!dryRunImport && insertedNodes > 0) {
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

  if (!dryRunImport && changedFiles > 0) {
    rollbackScript += `mv ${backupDir} ${backupDir}.rolled-back\n`
    fs.writeFileSync(rollbackScriptPath, rollbackScript, 'utf8');
    console.log(`output: ${rollbackScriptPath}`);
    fs.writeFileSync(diffScriptPath, diffScript, 'utf8');
    console.log(`output: ${diffScriptPath}`);
  }
}

main();
