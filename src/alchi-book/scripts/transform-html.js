// alternative: https://www.npmjs.com/package/htmlparser2

const fs = require('fs')
const appRoot = require('app-root-path')
const glob = require('fast-glob')
const { parse } = require('node-html-parser')

function main() {
  glob.sync(appRoot + '/src/pages/page-*.html')
  .forEach(infile => {
    const outfile = infile + '.out'
    const insrc = fs.readFileSync(infile, 'utf8')
    const root = parse(insrc);

    /*    
    replaceNodes(root, 'div.fragment', 'lang')
    .forEach(nodeNew => {
      replaceNodes(nodeNew, 'p', (node => node.attributes && node.attributes.lang));
    });
    */

    replaceNodes(root, 'p', (node => node.attributes && node.attributes.lang));
    replaceNodes(root, 'div.fragment', 'p')

    fs.writeFileSync(outfile, root.toString(), 'utf8');
    console.log(outfile);
  })
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
    const nodeNew = parse(`<html><${nameNew}></${nameNew}></html>`).childNodes[0].childNodes[0];
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
