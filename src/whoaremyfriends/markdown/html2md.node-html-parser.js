// FIXME backslash-escaped doublequotes in attributes after removeAttribute
// https://github.com/taoqf/node-html-parser/issues/218
// node.removeAttribute('onClick');
// ... or find a better html parser

// https://gist.github.com/seanh/13a93686bf4c2cb16e658b3cf96807f2

// alternative: https://www.npmjs.com/package/htmlparser2

// based on alchi/src/alchi-book/scripts/transform-html.js

// yeah i know pandoc, but my transform is too complex

// TODO remove empty lines in table, svg, ... this breaks html-in-markdown

// FIXME preserve html comments

// TODO transform html table to markdown list, so we can ue markdown for images/formatting

const fs = require('fs')
const crypto = require('crypto')

const appRoot = require('app-root-path')
const glob = require('fast-glob')

//const { parse: parseHtml } = require('node-html-parser')
// fix: comments are ignored by insertAdjacentHTML
// https://github.com/taoqf/node-html-parser/issues/219
// TODO use a different html parser?
// this one still has bugs
// benchmarks:
/*
htmljs-parser   :13.8834 ms/file ± 31.9733
htmlparser2     :15.0046 ms/file ± 21.5759
html5parser     :20.2041 ms/file ± 37.5642
html-dom-parser :30.6170 ms/file ± 31.5491
node-html-parser:31.1931 ms/file ± 21.3973
high5           :40.8038 ms/file ± 28.1155
parse5          :41.3774 ms/file ± 25.9333
node-html-parser:44.2064 ms/file ± 42.0817 (last release)
cheerio         :85.5875 ms/file ± 73.8088
htmlparser      :124.863 ms/file ± 858.797
html-parser     :419.928 ms/file ± 404.963
*/
const { parse: parseHtml } = require('node-html-parser')

const slugify = require('limax')



function getOuterIndentLevel(s, options) {
  if (!options) options = {};
  const firstLineIdx = options.ignoreFirstLine ? 1 : 0;
  let indents = (s.match(/(^|\n)([ ]+)[^ ]/g) || []).slice(firstLineIdx).map(L => L.match(/^\n?( +)/)[1].length);
  return indents.length > 0 ? Math.min(...indents) : null;
}

function removeOuterIndent(s, options) {
  if (!options) options = {};
  const level = getOuterIndentLevel(s, options);
  if (!level) return s.trim(); // single line
  //console.dir({ level });
  const indent = ' '.repeat(level);
  s = s.replace(RegExp(`(^|\n)${indent}`, 'g'), '$1')
  if (options.ignoreFirstLine) s = s.trim();
  return s;
}

function getInnerHTML(node) {
  return node.innerHTML;
  /*
  // stupid workaround for https://github.com/taoqf/node-html-parser/issues/219
  //console.dir({ firstChild: node.firstChild }) // TODO get index https://github.com/taoqf/node-html-parser/pull/126

  let result = node.toString();

  const firstAttrKey = node.rawAttrs && (node.rawAttrs.split('=') || [])[0];

  const openTag = `<${node.rawTagName}${node.rawAttrs ? ' '+node.rawAttrs : ''}>`;
  console.dir({ rawAttrs: node.rawAttrs, openTag }) // rawAttrs?


  // this breaks on <div title=">">x</div>
  //return node.toString().replace(RegExp(`^<${node.rawTagName}[^>]*>(.*)<\/${node.rawTagName}>$`, 's'), '$1');
  let result = '';
  let child = node.firstChild;
  while (child) {
    result += child.toString();
    //child = child.nextSibling; // also text, comments
    child = child.nextElementSibling;
  }
  //console.dir({result}) // debug
  return result;
  */
}



function main() {

  // repro
  // comments are missing in innerHTML
  // https://github.com/taoqf/node-html-parser/issues/219
  if (0) {
    var insrc = `\
    <html>
      <div id="unwrap-me">
        <!-- keep me -->
        <div>hello</div>
      </div>
    </html>
    `;
    var root = parseHtml(insrc, { comment: true });
    console.log(root.toString()); // ok

    // unwrap content: replace node with node.innerHTML
    var selector = '#unwrap-me';
    root.querySelectorAll(selector).forEach(node => {
      console.dir({ innerHTML: node.innerHTML });
      console.dir({ childNodes: node.childNodes });
      for (const child of node.childNodes) {
        console.dir({ child_toString: child.toString() })
      }
      node.insertAdjacentHTML('afterend', node.innerHTML);
      node.remove();
    });
    console.log(root.toString()); // comments are missing
    return;
  }

  // repro
  // unescaped doublequotes in attributes after xxxx
  // https://github.com/taoqf/node-html-parser/issues
  // this works:
  if (0) {
    var insrc = `\
    <html>
      <div class="wrapper">
        <div title='hello "world" 1'>hover me 1</div>
      </div>
      <div class="wrapper">
        <div title='hello "world" 2'>hover me 2</div>
      </div>
    </html>
    `;
    var root = parseHtml(insrc);

    unwrapElements(root, 'div.wrapper');

    console.log(root.toString());
    return;
  }

  // repro
  // backslash-escaped doublequotes in attributes after removeAttribute
  // https://github.com/taoqf/node-html-parser/issues/218
  if (false) {
    var insrc = `\
    <html>
      <div id="_" title='"world"' onClick='alert("hello")' color="red">nochange</div>
      <div id="e" title='"world"' color="red">expected</div>
      <div id="a" title='"world"' onClick='alert("hello")' color="red">actual</div>
    </html>
    `;
    var root = parseHtml(insrc);
    root.querySelectorAll('#e').forEach(node => {
      node.setAttribute('onClick', "alert('hello')");
    })
    root.querySelectorAll('#a').forEach(node => {
      //node.setAttribute('title', '"replaced"');
      //node.setAttribute('onClick', 'void');
      node.removeAttribute('color'); // FIXME bug in node-html-parser ...
    })
    console.log(root.toString());
    return;
  }

  //glob.sync(appRoot + '/src/pages/page-*.html')
  glob.sync('wersindmeinefreunde.html')
  .forEach(infile => {
    console.log(`infile = ${infile}`);
    //const outfile = infile + '.md' // TODO extension html -> md
    const outfile = 'wersindmeinefreunde.md'
    let insrc = fs.readFileSync(infile, 'utf8')

    // preprocess
    // remove whitespace lines
    insrc = insrc.replace(/(^|\n)[ \t]+(\n|$)/g, '$1$2');

    const root = parseHtml(insrc, {
      comment: true, // preserve html comments
    });

    if (1) { // all transforms





      //console.log(root.toString()); return; // debug

      // html -> html
      /*    
      replaceNodes(root, 'div.fragment', 'lang')
      .forEach(nodeNew => {
        replaceNodes(nodeNew, 'p', (node => node.attributes && node.attributes.lang));
      });
      */
      //replaceNodes(root, 'p', (node => node.attributes && node.attributes.lang));
      //replaceNodes(root, 'div.fragment', 'p')

      if (1) {
        // works better for github markdown renderer
        // div would create new paragraphs
        //replaceNodes(root, 'div.nowrap', 'span', { class: 'nowrap' }); // <span class="nowrap"> is too verbose
        replaceNodes(root, 'div.nowrap', 'tt'); // <tt> - nice and small
      }

      if (1) {
        // html -> markdown
        // remove html head
        var selector = 'head';
        root.querySelectorAll(selector).forEach(node => {
          node.remove();
        });
      }

      if (1) {
        // remove nodes
        for (const selector of [ 'script', 'noscript' ]) {
          root.querySelectorAll(selector).forEach(node => {
            node.remove();
          });
        }
      }

      unwrapElements(root, 'body');

      unwrapElements(root, 'article');

      // <div class="xcenter"></div>
      unwrapElements(root, 'div.xcenter');

      // TODO select comment nodes with querySelector
      // https://github.com/taoqf/node-html-parser/issues/221
      //replaceNodes(root, '!--', 'details'); // make comments visible

      if (1) {
        //var selector = '*'; // FIXME dont remove html comments // too greedy
        var selector = 'div.para, td, span, b';
        root.querySelectorAll(selector).forEach(node => {
          //console.log(node.rawTagName)
          // FIXME comments are missing in innerHTML
          //let innerHTML = node.innerHTML;
          // workaround
          let innerHTML = getInnerHTML(node);
          node.innerHTML = (
            innerHTML
              //.replace(/([\[\]])/g, '\\$1') // escape [ ] for markdown // FIXME too greedy
              .replace(/&mdash;/g, '--') // pretty mdash. TODO in html, render -- as &mdash;
          );
        });
      }

      //annotations2footnotes(root);
      annotations2details(root);

      // workaround for bug in mdbook
      annotationsFixAttributes(root);

      unwrapElements(root, 'div.para', {
        postprocess: innerHTML => {
          // unindent lines - greedy
          //innerHTML = innerHTML.replace(/(^|\n)\s+/g, '$1');
          // unindent lines - remove only one indent step = 2 spaces
          innerHTML = innerHTML.replace(/(^|\n)  /g, '$1');
          // remove empty lines for markdown paragraphs
          innerHTML = innerHTML.replace(/([ \t]*\n){2,}/g, '\n');
          return innerHTML;
        }
      });

      if (1) {
        // replace <b> with markdown **
        var selector = 'b';
        root.querySelectorAll(selector).forEach(node => {
          if (
            node.parentNode.rawTagName != 'html' &&
            node.parentNode.rawTagName != 'body' &&
            node.parentNode.rawTagName != 'article'
          ) return; // dont replace in <div>...</div> etc
          // FIXME comments are missing in innerHTML
          //let innerHTML = node.innerHTML;
          // workaround
          let innerHTML = getInnerHTML(node);
          innerHTML = `**${innerHTML}**`;
          node.insertAdjacentHTML('afterend', innerHTML);
          node.remove();
        });
      }

      if (1) {

        // replace <a> with markdown []()
        var selector = 'a';
        root.querySelectorAll(selector).forEach(node => {
          if (node.parentNode.rawTagName != 'html') return; // dont replace in <div>...</div> etc
          // FIXME comments are missing in innerHTML
          //let innerHTML = node.innerHTML;
          // workaround
          let innerHTML = getInnerHTML(node);
          let target = node.getAttribute('href');
          innerHTML = `[${innerHTML}](${target})`;
          node.insertAdjacentHTML('afterend', innerHTML);
          node.remove();
        });

        // export inlined svg images
        var selector = 'svg';
        function sha1sum(str) {
          var shasum = crypto.createHash('sha1')
          shasum.update(str)
          return shasum.digest('hex')
        }
        root.querySelectorAll(selector).forEach(node => {
          let title = node.getAttribute('title') || '';
          let idOrTitle = node.getAttribute('id') || node.getAttribute('title') || 'image';
          const fileName = slugify(idOrTitle);
          const svgSource = node.toString();
          const svgHash = sha1sum(svgSource);
          const svgPath = `images/${svgHash}-${fileName}.svg`;
          try {
            fs.writeFileSync(svgPath, svgSource, 'utf8');
          }
          catch (error) {
            fs.mkdirSync('images');
            fs.writeFileSync(svgPath, svgSource, 'utf8');
          }
          let innerHTML = `\n\n![${idOrTitle}](${svgPath})\n\n`; // add empty lines for markdown in html
          //node.parentNode.insertAdjacentHTML('afterend', innerHTML);
          // why was this parentNode?
          node.insertAdjacentHTML('afterend', innerHTML);
          node.remove();
        });


        // html table to markdown list
        //root.querySelectorAll('table').forEach(table => {
        //for (const selector of ['table table', 'table']) { // quickfix for nested tables - nah
        for (const selector of ['table']) { // quickfix for nested tables - nah
          root.querySelectorAll(selector).forEach(table => {
            const childTable = table.querySelector('table');
            if (childTable) return;
            const tbody = table.querySelector('tbody') || table;
            let title = table.getAttribute('title') || '';
            let id = table.getAttribute('id');
            let attrs = '';
            attrs += id ? ` id="${id}"` : '';
            attrs += title ? ` title="${title}"` : '';

            let md = '';
            // TODO context
            // dont add empty line before table when "before" is html
            // empty lines break html in markdown
            // add empty line before table when "before" is markdown
            // missing empty lines break markdown

            let trList = tbody.querySelectorAll('tr');

            /* five elements table
            <table>
              <tr>
                <td>1. Multiplikation</td>
                <td></td>
                <td>3. Addition</td>
              </tr>
              <tr>
                <td></td>
                <td>Mathematik</td>
                <td></td>
              </tr>
              <tr>
                <td>4. Subtraktion</td>
                <td></td>
                <td>2. Division</td>
              </tr>
            </table>
            */
            let tdList = trList.map(tr => tr.querySelectorAll('td'));
            //console.dir({ tdList });
            if (
              trList.length == 3 &&
              tdList[0].length == 3 &&
              tdList[1].length == 3 &&
              tdList[2].length == 3 &&
              tdList[0][1].innerHTML.trim() == '' && // top
              tdList[2][1].innerHTML.trim() == '' && // bottom
              tdList[1][0].innerHTML.trim() == '' && // left
              tdList[1][2].innerHTML.trim() == '' // right
            ) {
              // five elements square: only one 01234, 0 in the center
              md += `<div class="square"${attrs}>\n\n`;
              function addLine(idx, tr, td) {
                let content = tdList[tr][td].innerHTML.trim();
                //content = content.replace(RegExp(`^${idx}\\. `), '');
                if (content.startsWith(`${idx}. `)) {
                  content = content.slice(3);
                }
                md += `${idx}. ${content}\n`;
              }
              addLine(0, 1, 1); // center
              addLine(1, 0, 0); // top left
              addLine(2, 2, 2); // bottom right
              addLine(3, 0, 2); // top right
              addLine(4, 2, 0); // bottom left
              md += '\n';
            }
            else {
              // five elements table: many 01234 stacked vertically, 0 on the left
              md += `<div class="table"${attrs}>\n\n`;
              trList.forEach(tr => {
                //md += '*\n';
                let th = tr.querySelector('th');
                if (th) {
                  //md += `  0. ${th.innerHTML.trim()}\n`;
                  md += `0. ${th.innerHTML.trim()}\n`;
                }
                tr.querySelectorAll('td').forEach((td, idx) => {
                  //md += `  ${idx+1}. ${td.innerHTML.trim()}\n`;
                  md += `${idx+1}. ${td.innerHTML.trim()}\n`;
                });
                md += '\n';
              });
            }
            md += '</div>';
            // TODO context
            // dont add empty line after table when "after" is html
            // empty lines break html in markdown
            // add empty line after table when "after" is markdown
            // missing empty lines break markdown
            table.insertAdjacentHTML('afterend', md);
            table.remove();
          });
        }

        // replace <br> with markdown \
        var selector = 'br';
        root.querySelectorAll(selector).forEach(node => {
          if (node.parentNode.rawTagName != 'html') return; // dont replace in <div>...</div> etc
          node.insertAdjacentHTML('afterend', `\\`);
          node.remove();
        });

        // replace <hr> with markdown ---
        var selector = 'hr';
        root.querySelectorAll(selector).forEach(node => {
          if (node.parentNode.rawTagName != 'html') return; // dont replace in <div>...</div> etc
          let innerHTML = `---`;
          node.insertAdjacentHTML('afterend', innerHTML);
          node.remove();
        });

        // trim whitespace in node
        var selector = 'tt';
        root.querySelectorAll(selector).forEach(node => {
          // FIXME comments are missing in innerHTML
          //let innerHTML = node.innerHTML;
          // workaround
          let innerHTML = getInnerHTML(node);
          node.innerHTML = innerHTML.trim();
        });

      }





      //console.log(root.toString()); return; // debug

    } // all transforms

    // stringify

    //let html = root.toString();
    //let html = root.querySelector('html').innerHTML;
    // workaround
    // unwrap html
    let innerHTML = getInnerHTML(root.querySelector('html'));
    let html = innerHTML

    //console.log(html); return; // debug



    // postprocess

    if (1) {
    
      // workaround for https://github.com/taoqf/node-html-parser/issues/218
      html = html.replace(/ onClick="clickAnnotation\(this\)"/g, '');

      // make comments visible: html comment to html detail
      // workaround for https://github.com/taoqf/node-html-parser/issues/221
      // var comment = root.querySelector('!--');
      html = html.replace(/<!--(.*?)-->/sg, (_match0, comment) => {
        //console.dir({ comment });
        comment = removeOuterIndent(comment, { ignoreFirstLine: true });
        comment = comment.replace(/</g, '&lt;');
        comment = comment.replace(/>/g, '&gt;');
        return `\n\n<details class="comment">\n\n${comment}\n\n</details>\n\n`;
        // TODO context
      });

      // remove whitespace lines
      // (?=x): lookahead for x
      html = html.replace(/(^|\n)[ \t]+(?=\n|$)/sg, '$1');

      // normalize newlines
      // either 1 or 3 empty lines between paragraphs
      html = html.replace(/\n{2,}/g, match => match.length < 4 ? '\n\n' : '\n\n\n\n');

      html = html.trim() + '\n'; // add newline before EOF
    }

    // add empty frontmatter header
    // workaround for
    // Allow Hugo to parse "plain" Markdown
    // https://github.com/gohugoio/hugo/issues/6098
    html = `---\n---\n\n` + html;

    console.log(`outfile = ${outfile}`);
    fs.writeFileSync(outfile, html, 'utf8');
  })
}

function unwrapElements(root, selector, options) {
  if (!options) options = {};
  // unwrap content: replace node with node.innerHTML
  // FIXME comments are missing in innerHTML
  // https://github.com/taoqf/node-html-parser/pull/13#issuecomment-1251184381
  // fixed in patched version of node-html-parser
  root.querySelectorAll(selector).forEach(node => {
    // FIXME comments are missing in innerHTML
    //let innerHTML = node.innerHTML;
    // workaround
    let innerHTML = getInnerHTML(node);
    if (options.postprocess) {
      innerHTML = options.postprocess(innerHTML);
    }
    node.insertAdjacentHTML('afterend', innerHTML);
    node.remove();
  });
}

function annotations2details(root) {
  // html annotations -> markdown footnotes
  // this must come before unwrapping div.para
  var selector = 'div.annotation';
  const idsUsed = new Set();
  const footnotesStack = new Map();
  root.querySelectorAll(selector).forEach(node => {
    // fixme? markdown in html: add empty lines before + after footnote link
    //console.log(`annotation parent: <${node.parentNode.rawTagName} id="${node.parentNode.getAttribute('id') || ''}" class="${node.parentNode.getAttribute('class') || ''}"`);
    if (!(
      node.parentNode.rawTagName == 'html' ||
      node.parentNode.rawTagName == 'body' ||
      node.parentNode.rawTagName == 'article' ||
      (
        node.parentNode.rawTagName == 'div' &&
        node.parentNode.classList.contains('para')
      )
    )) {
      // dont replace in <div>...</div> etc
      // TODO render annotations in static html
      // FIXME https://github.com/taoqf/node-html-parser/issues/218
      //node.removeAttribute('onClick');
      return;
    }
    // FIXME
    /* a:
      <div class="annotation" onClick="clickAnnotation(this)" title='

        Der Begriff Polyamorie beschreibt das
        Gegenteil
    */
    // b: <div class="annotation" title="\n\n    Der Begriff Polyamorie beschreibt das\n    Gegenteil
    // FIXME comments are missing in innerHTML
    //let innerHTML = node.innerHTML;
    // workaround
    let innerHTML = getInnerHTML(node);
    const annotationSource = innerHTML;
    let annotation = node.getAttribute('title');
    // TODO refactor "slug" to "id"
    const slugNumWords = 10; // use first N words for slug
    const slugBase = slugify(annotation).split('-').slice(0, slugNumWords).join('-');
    // footnode ids must be unique
    let slug = slugBase;
    let slugNumber = 1;
    while (idsUsed.has(slug)) {
      slugNumber++;
      slug = `${slugBase}-${slugNumber}`;
    }
    idsUsed.add(slug);
    // https://gist.github.com/seanh/13a93686bf4c2cb16e658b3cf96807f2#footnotes
    //innerHTML = `${innerHTML} [^${slug}]`; // footnote
    // TODO add later in rendering: <span id="reference-${slug}"></span>
    //innerHTML = `<span id="reference-${slug}"></span>[${innerHTML}](#${slug})`; // link
    innerHTML = `[${innerHTML}](#${slug})`; // link
    node.insertAdjacentHTML('afterend', innerHTML);
    // FIXME replace first \n
    // TODO unindent
    annotation = removeOuterIndent(annotation);
    annotation = annotation.trim(); // now we can trim
    // (?=x): lookahead for x
    //annotation = annotation.replace(/\n(?=\n)/g, '\n\\'); // add hardbreaks between paragraphs
    const indent = '  ';
    //annotation = indent + annotation.replace(/\n/g, '\n' + indent); // add indent
    // no. extra indent can break markdown. 4 spaces indent = <pre>
    // find topmost parent
    let topParent = node;
    //console.log(`node`, JSON.stringify(node.toString().slice(0, 100)))
    while (
      topParent.parentNode.rawTagName != 'html' &&
      topParent.parentNode.rawTagName != 'body' &&
      topParent.parentNode.rawTagName != 'article'
    ) {
      //console.log(`topParent?`, JSON.stringify(topParent.toString().slice(0, 100)))
      topParent = topParent.parentNode;
    }
    //console.log(`topParent!`, JSON.stringify(topParent.toString().slice(0, 100)))

    //let footnoteDescription = `\n\n[^${slug}]: \\\n${indent}\\\n${annotation}\n`;
    const annotationSourceStart = annotationSource.trim().split(/\s+/).slice(0, 5).join(' ').trim(); // first 5 words
    // TODO add later in rendering: summary
    //let summary = `<a href="#reference-${slug}" onclick="this.parentNode.parentNode.open=false">${annotationSourceStart}</a> &mdash; ` + annotation.trim().split(/\s+/).slice(0, 10).join(' ').trim(); // first 10 words
    let summary = '';
    // note: annotation is surrounded by empty lines, to enable markdown in annotation
    // TODO add style to mdbook
    // <div tabindex="-1"> is focusable
    // <details tabindex="-1"> is focusable
    // https://allyjs.io/data-tables/focusable.html
    // <div id="x" tabindex="-1" onfocus="var details = this.querySelector('details'); if (!details.open) { details.open = true; }">
    //let footnoteDescription = `\n\n<details id="${slug}" onfocus="alert(this)" style="border:solid 1px grey;margin:1em 0;padding:0.5em;padding-left:1em">\n  <summary>\n    ${summary}\n  </summary>\n  <!--<span id="${slug}"></span>-->\n\n${annotation}\n\n</details>\n\n`;
    //let footnoteDescription = `\n\n<div id="${slug}"\n  tabindex="-1" onfocus="var details = this.querySelector('details'); if (!details.open) { details.open = true; }" style="border:solid 1px grey;margin:1em 0;padding:0.5em;padding-left:1em">\n<details>\n<summary>${summary}</summary>\n\n${annotation}\n\n</details>\n</div>\n\n`;
    // TODO set attributes dynamically for details.annotation: tabindex="-1" onfocus="if (!this.open) { this.open = true; }"
    // TODO add later in rendering: tabindex="-1" onfocus="if (!this.open) { this.open = true; }"\n  style="border:solid 1px grey;margin:1em 0;padding:0.5em;padding-left:1em"\n>\n<summary>${summary}</summary>
    //let footnoteDescription = `\n\n<details class="annotation" id="${slug}"\n  tabindex="-1" onfocus="if (!this.open) { this.open = true; }"\n  style="border:solid 1px grey;margin:1em 0;padding:0.5em;padding-left:1em"\n>\n<summary>${summary}</summary>\n\n${annotation}\n\n</details>\n\n`;
    let footnoteDescription = `\n\n<details class="annotation" id="${slug}">\n\n${annotation}\n\n</details>\n\n`;
    //topParent.insertAdjacentHTML('afterend', footnoteDescription); // wrong order
    if (!footnotesStack.has(topParent)) {
      footnotesStack.set(topParent, []);
    }
    footnotesStack.get(topParent).push(footnoteDescription)
    node.remove();
  });

  // add footnote descriptions in the right order
  for (const [topParent, footnoteDescriptionList] of footnotesStack.entries()) {
    for (const footnoteDescription of footnoteDescriptionList.reverse()) {
      topParent.insertAdjacentHTML('afterend', footnoteDescription);
    }
  }
}


function annotationsFixAttributes(root) {

  // escape doublequotes in title='..."..'
  // workaround for bug in mdbook
  // 
  var selector = 'div.annotation';
  const footnotesStack = new Map();
  root.querySelectorAll(selector).forEach(node => {
    // opposite condition of annotations2details
    // keep raw html in annotations2details
    if ((
      node.parentNode.rawTagName == 'html' ||
      node.parentNode.rawTagName == 'body' ||
      node.parentNode.rawTagName == 'article' ||
      (
        node.parentNode.rawTagName == 'div' &&
        node.parentNode.classList.contains('para')
      )
    )) {
      return;
    }
    let innerHTML = getInnerHTML(node);
    const annotationSource = innerHTML;
    let title = node.getAttribute('title');
    //title = title.replace(/"/g, '&quot;'); // TODO test. this should be done in setAttribute
    // escape empty lines for markdown
    // see also
    // https://github.com/jgm/pandoc/issues/8307
    // assume: trailing whitespace has been removed
    title = title.replace(/\n\n/g, '&#10;\n');
    node.setAttribute('title', title);
  });

  // add footnote descriptions in the right order
  for (const [topParent, footnoteDescriptionList] of footnotesStack.entries()) {
    for (const footnoteDescription of footnoteDescriptionList.reverse()) {
      topParent.insertAdjacentHTML('afterend', footnoteDescription);
    }
  }
}


function annotations2footnotes(root) {
  // html annotations -> markdown footnotes
  // this must come before unwrapping div.para
  var selector = 'div.annotation';
  const idsUsed = new Set();
  const footnotesStack = new Map();
  root.querySelectorAll(selector).forEach(node => {
    // fixme? markdown in html: add empty lines before + after footnote link
    //console.log(`annotation parent: <${node.parentNode.rawTagName} id="${node.parentNode.getAttribute('id') || ''}" class="${node.parentNode.getAttribute('class') || ''}"`);
    if (!(
      node.parentNode.rawTagName == 'html' || (
        node.parentNode.rawTagName == 'div' &&
        node.parentNode.classList.contains('para')
      )
    )) {
      // dont replace in <div>...</div> etc
      // TODO render annotations in static html
      // FIXME https://github.com/taoqf/node-html-parser/issues/218
      //node.removeAttribute('onClick');
      return;
    }
    // FIXME
    /* a:
      <div class="annotation" onClick="clickAnnotation(this)" title='

        Der Begriff Polyamorie beschreibt das
        Gegenteil
    */
    // b: <div class="annotation" title="\n\n    Der Begriff Polyamorie beschreibt das\n    Gegenteil
    // FIXME comments are missing in innerHTML
    //let innerHTML = node.innerHTML;
    // workaround
    let innerHTML = getInnerHTML(node);
    let annotation = node.getAttribute('title');
    // TODO refactor "slug" to "id"
    const slugNumWords = 10; // use first N words for slug
    const slugBase = slugify(annotation).split('-').slice(0, slugNumWords).join('-');
    // footnode ids must be unique
    let slug = slugBase;
    let slugNumber = 1;
    while (idsUsed.has(slug)) {
      slugNumber++;
      slug = `${slugBase}-${slugNumber}`;
    }
    idsUsed.add(slug);
    innerHTML = `${innerHTML} [^${slug}]`;
    node.insertAdjacentHTML('afterend', innerHTML);
    // FIXME replace first \n
    // TODO unindent
    annotation = removeOuterIndent(annotation);
    annotation = annotation.trim(); // now we can trim
    // (?=x): lookahead for x
    annotation = annotation.replace(/\n(?=\n)/g, '\n\\'); // add hardbreaks between paragraphs
    const indent = '  ';
    annotation = indent + annotation.replace(/\n/g, '\n' + indent); // add indent
    // find topmost parent
    let topParent = node;
    console.log(`node`, JSON.stringify(node.toString().slice(0, 100)))
    while (
      topParent.parentNode.rawTagName != 'html' &&
      topParent.parentNode.rawTagName != 'body' &&
      topParent.parentNode.rawTagName != 'article'
    ) {
      console.log(`topParent?`, JSON.stringify(topParent.toString().slice(0, 100)))
      topParent = topParent.parentNode;
    }
    console.log(`topParent!`, JSON.stringify(topParent.toString().slice(0, 100)))
    let footnoteDescription = `\n\n[^${slug}]: \\\n${indent}\\\n${annotation}\n`;
    //topParent.insertAdjacentHTML('afterend', footnoteDescription); // wrong order
    if (!footnotesStack.has(topParent)) {
      footnotesStack.set(topParent, []);
    }
    footnotesStack.get(topParent).push(footnoteDescription)
    node.remove();
  });

  // add footnote descriptions in the right order
  for (const [topParent, footnoteDescriptionList] of footnotesStack.entries()) {
    for (const footnoteDescription of footnoteDescriptionList.reverse()) {
      topParent.insertAdjacentHTML('afterend', footnoteDescription);
    }
  }
}




// https://github.com/taoqf/node-html-parser/pull/104
function replaceNodes(root, selector, name = 'div', attributes = {}) {
  const getName = (typeof name == 'function') ? (node => name(node)) : (() => name);
  const getAttributes = (typeof attributes == 'function') ? (node => attributes(node)) : (() => attributes);
  const result = [];
  root.querySelectorAll(selector).forEach(node => {
    const nameNew = getName(node);
    if (!nameNew || !node.innerHTML) return; // no replace
    const attributesNew = getAttributes(node);
    const nodeNew = parseHtml(`<html><${nameNew}></${nameNew}></html>`).childNodes[0].childNodes[0];
    for (const [name, value] of Object.entries(attributesNew)) {
       nodeNew.setAttribute(name, value);
    }
    nodeNew.innerHTML = node.innerHTML;
    if (1) {
      // working
      node.insertAdjacentHTML('afterend', nodeNew.toString());
      const nodeNewReal = node.nextElementSibling;
      result.push(nodeNewReal);
      node.remove();
    }
  });
  return result;
}

/*
    else if (0) {
      // breaks when called multiple times
      node.replaceWith(nodeNew);
      result.push(nodeNew);
    }
    else {
      // breaks when called multiple times
      node.insertAdjacentHTML('afterend', `<${nameNew}></${nameNew}>`);
      const nodeNew = node.nextElementSibling;
      for (const [name, value] of Object.entries(attributesNew)) {
        nodeNew.setAttribute(name, value);
      }
      nodeNew.innerHTML = node.innerHTML;
      result.push(nodeNew);
      node.remove();
    }
*/

main();
