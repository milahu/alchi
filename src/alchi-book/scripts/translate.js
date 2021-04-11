// TODO add <table> contents to auto-translate
// see page-170.html and page-180.html in src/pages

const fs = require('fs');
//const net = require('net');
//const child_process = require('child_process');
const appRoot = require('app-root-path');
//const npmRun = require('npm-run');
const glob = require('fast-glob');
const { parse } = require('node-html-parser');

const elevConf = require(appRoot + '/config/eleventy.config.js')();
//console.dir({ elevConf });

const inputDir = appRoot + '/' + elevConf.dir.input;
const infilesGlob = inputDir + '/pages/*.html';

const langCodes = ['de', 'en']; // TODO get from 11ty metadata

// group numbers in three (translator services can split long numbers)
// use numbers > 256 to avoid collisions with ascii charcodes (matching is non-greedy)
// note. regex special chars like ()[]{}.*+? are not yet supported
const mark = {
  node1: '981 982',
  node2: '983 984',
  node3: '985 986',
  tagZ1: '987 988',
  tagZ2: '989 990',
  tagA1: '991 992',
  tagA2: '993 994',
  enti1: '995 996',
  enti2: '997 998',
};

function exportLang(sourceLang = 'de', targetLang = 'en') {

  if (langCodes.includes(sourceLang) == false) {
    console.log(`error: sourceLang ${sourceLang} not found. must be one of: ${langCodes.join(', ')}`);
    process.exit(1);
  }

  const htmlFile = `translate-${sourceLang}2${targetLang}.html`;
  if (fs.existsSync(htmlFile)) {
    console.log(`error: output file exists: ${htmlFile}`);
    process.exit(1);
  }

  console.log(`glob: ${infilesGlob}`);

  const textParts = [];

  glob.sync(infilesGlob)
  //([glob.sync(infilesGlob)[4]]) // debug
  .forEach((file, fileIdx) => {
    console.log(`file: ${file}`);
    const root = parse(fs.readFileSync(file, 'utf8'));

    const childSelectors = langCodes;
    const parentNodes = [...new Set(
      root.querySelectorAll(childSelectors.join(','))
      .map(node => node.parentNode)
    )];

    for (const [pi, p] of parentNodes.entries()) {
      p.querySelectorAll(sourceLang).forEach((n, ni) => {
        const s = n.innerHTML
          // encode html for translator service
          // encode html markup
          .replace(/<\/(.+?)>/sg, (_, m) => ( // close tags
            ` ${mark.tagZ1} `+m.split('').map(c => c.charCodeAt(0)).join(' ')+` ${mark.tagZ2} `;
          ))
          .replace(/<(.+?)>/sg, (_, m) => ( // open tags
            ` ${mark.tagA1} `+m.split('').map(c => c.charCodeAt(0)).join(' ')+` ${mark.tagA2} `;
          ))
          // encode html entities
          .replace(/&([^ ]+);/g, (_, m) => (
            ` ${mark.enti1} `+m.split('').map(c => c.charCodeAt(0)).join(' ')+` ${mark.enti2} `;
          ))
        ;
        const tp = `${mark.node1} ${fileIdx} ${pi} ${ni} ${mark.node2} ${s} ${mark.node3}`;

        //console.log(tp);
        textParts.push(tp);
      })
    }

  });

  // generate links
  // google translate: 5000 character limit
  const charLimit = 5000;

  // https://translate.google.com/?sl=en&tl=de&text=mass%20versus%20class&op=translate
  const textGroups = textParts.reduce((acc, val) => {
    const nextLen = acc[acc.length - 1].length + val.length + 2;
    if (nextLen >= charLimit) acc.push('');
    acc[acc.length - 1] += val + '\n\n';
    return acc;
  }, ['']);

  const translateLinks = textGroups.map(t => (
    //`https://translate.google.com/?sl=en&tl=de&text=${encodeURIComponent(t)}&op=translate`
    `<li><a target="_blank" href="https://translate.google.com/?sl=${sourceLang}&tl=${targetLang}&text=${encodeURIComponent(t)}&op=translate">${t.slice(0, 160)} ...</a></li>`
  ));


  const htmlSrc = (
    '<style>' +
      'a:visited { color: green; }' +
      'a { text-decoration: none; }' +
      'a:hover { text-decoration: underline; }' +
    '</style>' +
    '<ol>\n\n' + translateLinks.join('\n\n') + '</ol>\n'
  );

  fs.writeFileSync(htmlFile, htmlSrc, 'utf8');
  const htmlFileUrl = encodeURI('file://' + require('path').resolve(htmlFile));
  console.log(`done: ${htmlFile}`);
  console.log(`
next steps:

1. open in your browser: ${htmlFileUrl}
2. click the first link
3. scroll down, on the bottom right: copy translation
4. paste the translation to your text editor
5. repeat for all links

note:
translators will change the order of words,
so in some cases, html markup tags like <b>....</b>
will be in a wrong position.
`)
}

function dateTime(date = null) {
  // sample result: '2021-03-21.21-05-36'
  if (!date) date = new Date();
  return date.toLocaleString('af').replace(/:/g, '-').replace(' ', '.');
}

//function importLang(sourceLang, targetLang, inputFile, tagName) {
function importLang(sourceLang, targetLang, inputFile) {
  const input = fs.readFileSync(inputFile, 'utf8');
  const inputTime = dateTime(fs.statSync(inputFile).birthtime);

  //if (!tagName) tagName = `${targetLang}-${sourceLang}2${targetLang}`;
  const tagName = targetLang;
  const tagAttrs = `auto t="${inputTime}"`;

  // parse
  // TODO escape special regex chars in `mark.node1` etc
  const textParts = [];
  const inputRest = input.replace(
    new RegExp(`${mark.node1} ([0-9]+) ([0-9]+) ([0-9]+) ${mark.node2}(.+?) ${mark.node3}`, 'sg'),
    ///234 567 ([0-9]+) ([0-9]+) ([0-9]+) 345 678(.+?) 875 432/sg,
    (_, fi, pi, ni, s) => {
      fi = parseInt(fi);
      pi = parseInt(pi);
      ni = parseInt(ni);
      s = (
        s
        // decode html markup
        .replace(
          // close tag: consume whitespace before
          new RegExp(` ?${mark.tagZ1} ([0-9 ]+?) ${mark.tagZ2}`, 'g'),
          (_, m) => '</'+m.split(' ').map(c => String.fromCharCode(c)).join('')+'>',
        )
        .replace(
          // open tag: consume whitespace after
          //new RegExp(`${mark.tagA1} ([0-9 ]+?) ${mark.tagA2} ?`, 'g'), // TODO restore
          new RegExp(` ?${mark.tagA1} ([0-9 ]+?) ${mark.tagA2} ?`, 'g'),
          (_, m) => '<'+m.split(' ').map(c => String.fromCharCode(c)).join('')+'>',
        )
        // decode html entities
        .replace(
          new RegExp(` ?${mark.enti1} ([0-9 ]+?) ${mark.enti2} ?`, 'g'),
          (_, m) => '&'+m.split(' ').map(c => String.fromCharCode(c)).join('')+';',
        )
      );
      textParts.push({ file: fi, part: pi, node: ni, str: s });
      return ''; // remove from input
    }
  );
  //console.dir(textParts);
  console.dir({ inputRest: inputRest.trim() });

  console.log(`glob: ${infilesGlob}`);
  // we assume that source files did not change since we called exportLang()
  glob.sync(infilesGlob)
  //([glob.sync(infilesGlob)[4]]) // debug
  .forEach((file, fileIdx) => {

    // create backup file
    const backupFile = `${file}.${dateTime()}.bak`;
    fs.copyFileSync(file, backupFile);
    // paranoid mode:
    if (fs.readFileSync(file, 'utf8') != fs.readFileSync(backupFile, 'utf8')) {
      console.log(`error: backup file != source file: ${backupFile}`);
      return; // next file
    }
    console.log(`done: ${backupFile}`);

    console.log(`file: ${file}`);
    const root = parse(fs.readFileSync(file, 'utf8'));

    const childSelectors = langCodes;
    const parentNodes = [...new Set(
      root.querySelectorAll(childSelectors.join(','))
      .map(node => node.parentNode)
    )];

    for (const [pi, p] of parentNodes.entries()) {
      p.querySelectorAll(sourceLang).forEach((n, ni) => {
        const textNode = textParts.find(o => (
          o.file == fileIdx &&
          o.part == pi &&
          o.node == ni
        ));
        if (!textNode) {
          console.log(`warning: no imported translation for ${fileIdx} ${pi} ${ni} ${n.toString().slice(0, 100)} ...`);
          return; // continue
        }
        const indent = n.toString().split('\n').slice(-1)[0].match(/^\s*/)[0];
        n.insertAdjacentHTML('afterend', `\n${indent}<${tagName} ${tagAttrs}>${textNode.str}</${tagName}>`);
      })
    }

    //const outFile = file + '.add-' + targetLang + '.txt'; // use *.txt extension to avoid *.html glob match
    const outFile = file; // replace input file (after creating a backup copy)
    fs.writeFileSync(outFile, root.toString(), 'utf8');
    console.log(`done: ${outFile}`);
  });
}

const scriptName = 'scripts/' + __filename.split('/').pop();

const argv = process.argv.slice(1); // argv[0] is node

if (argv[1] && argv[2] && argv[3] && fs.existsSync(argv[3])) {
  importLang(argv[1], argv[2], argv[3], argv[4]);
}
else if (argv[1] && argv[2]) {
  exportLang(argv[1], argv[2]);
}
else {
  console.log(
    'usage:\n' +
    `node ${scriptName} <sourceLang> <targetLang>\n` +
    `node ${scriptName} <sourceLang> <targetLang> <translationFile> <tagName>\n` +
    '\n' +
    'sample:\n' +
    `node ${scriptName} de en # from source files, generate translate-de2en.html\n` +
    `node ${scriptName} de en translate-de2en.txt en+ # add <en+>...</en+> tags to source files\n`
    //`node ${scriptName} translate-de2en.txt en\n`
  )
}
