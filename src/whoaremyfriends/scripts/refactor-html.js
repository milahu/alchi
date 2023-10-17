// based on alchi/src/whoaremyfriends/scripts/translate/translate.js

// FIXME this is really stupid:
// we get a parse tree from lezer-parser-html
// then we walk through the nodes, build or own tree of nodes
// and then stringify that tree of nodes...
// we should only use the parse tree
// and when we find interesting nodes
// then do a "lookahead" or "peek" to analyze and transform these nodes

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// https://github.com/lezer-parser/html
import { parser as lezerParserHtml } from '@lezer/html';

// https://github.com/milahu/nix-eval-js
// https://github.com/milahu/lezer-parser-nix
import { formatErrorContext } from './format-error-context.js';

const debug = false;

function sha1sum(str) {
  //return crypto.createHash("sha1").update(str).digest("base64");
  return crypto.createHash("sha1").update(str).digest("hex");
}

async function main() {

  const argv = process.argv.slice(1); // argv[0] is node

  const inputPath = argv[1];

  if (!inputPath) {
    console.error(`error: missing arguments`);
    console.error(`usage:`);
    console.error(`  node scripts/refactor-html.js wersindmeinefreunde.html`);
    return 1;
  }

  const inputHtml = fs.readFileSync(inputPath, 'utf8');

  // freeze the input for later
  const inputHtmlHash = 'sha1-' + sha1sum(inputHtml);
  const inputPathFrozen = inputPath + '.' + inputHtmlHash;
  console.error(`writing ${inputPathFrozen}`);
  fs.writeFileSync(inputPathFrozen, inputHtml, 'utf8');

  const outputPath = inputPath + '.' + inputHtmlHash + '.output.html';



/*
const outputPath = 'refactor-html.output.html';
const inputHtml = `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>...</title>
  <script>...</script>
  <style>...</style>
</head>
<body>
<!-- asdf -->
<div class="para">
  Nur wenige Weltbilder geben eine Antwort,
  zum Beispiel
  <div class="annotation" onClick="clickAnnotation(this)" title='
    Astrologie:
    Falsch ist der Schluss von Geburtstag auf Persönlichkeitstyp.
  '>Astrologie</div>
  und Sozionik
</div>
</body>
</html>
`
*/



  const htmlParser = lezerParserHtml.configure({
    strict: true, // throw on parse error
  });


  let htmlTree;

  try {
    htmlTree = htmlParser.parse(inputHtml);
  }
  catch (error) {
    // https://github.com/lezer-parser/lr/blob/main/src/parse.ts#L300
    if (error.message.startsWith("No parse at ")) {
      // note: pos is the character position, not the byte position
      const pos = parseInt(error.message.slice("No parse at ".length));
      error.message += '\n\n' + formatErrorContext(inputHtml, pos);
    }
    throw error;
  }

  const topNode = htmlTree.topNode;



  // https://codereview.stackexchange.com/a/97886/205605
  // based on nix-eval-js/src/lezer-parser-nix/src/nix-format.js
  /** @param {Tree | TreeNode} tree */
  function walkHtmlTree(tree, func) {

    const cursor = tree.cursor();
    //if (!cursor) return '';
    if (!cursor) return;

    let depth = 0;

    while (true) {
      // NLR: Node, Left, Right
      // Node
      const cursorTypeId = cursor.type.id;
      if (
        !(
          cursorTypeId == 15 || // Document
          cursorTypeId == 20 || // Element
          cursorTypeId == 23 || // Attribute
          cursorTypeId == 21 || // OpenTag <script>
          cursorTypeId == 30 || // OpenTag <style>
          cursorTypeId == 36 || // OpenTag
          cursorTypeId == 32 || // CloseTag </style>
          cursorTypeId == 29 || // CloseTag </script>
          cursorTypeId == 37 || // CloseTag
          cursorTypeId == 38 || // SelfClosingTag
          // note: this is inconsistent in the parser
          // InvalidEntity is child node
          // EntityReference is separate node (sibling of other text nodes)
          cursorTypeId == 19 || // InvalidEntity: <a href="?a=1&b=2" -> "&" is parsed as InvalidEntity
          //cursorTypeId == 17 || // EntityReference: "&amp;" is parsed as EntityReference
          false
        )
      ) {
        func(cursor)
      }

      // Left
      if (cursor.firstChild()) {
        // moved down
        depth++;
        continue;
      }
      // Right
      if (depth > 0 && cursor.nextSibling()) {
        // moved right
        continue;
      }
      let continueMainLoop = false;
      let firstUp = true;
      while (cursor.parent()) {
        // moved up
        depth--;
        if (depth <= 0) {
          // when tree is a node, stop at the end of node
          // == dont visit sibling or parent nodes
          return;
        }
        if (cursor.nextSibling()) {
          // moved up + right
          continueMainLoop = true;
          break;
        }
        firstUp = false;
      }
      if (continueMainLoop) continue;
      break;
    }
  }



  // note: always set this to zero before calling walkHtmlTree
  let lastNodeTo = 0;



  // debug: print the AST
  if (0) {
    lastNodeTo = 0;
    walkHtmlTree(topNode, (node) => {
      const nodeSource = inputHtml.slice(lastNodeTo, node.to);
      lastNodeTo = node.to;
      console.log(`${node.from}: node ${node.type.id} = ${node.type.name}: ${nodeSource}`)
    });
    //return;
  }



  /*
  let currentTagName = undefined;
  */
  //function newTag(parent) {
  function newTag() {
    const tag = {
      name: undefined,
      attrs: [],
      //parent,
      lang: undefined,
      notranslate: false, // tag has attribute: class="... notranslate ..."
      hasTranslation: false, // tag has attribute: src-lang-id="en:some-id"
      //sources: [],
    };
    return tag;
  }

  function isSelfClosingTagName(tagName) {
    return (
      tagName == 'meta' ||
      tagName == 'link' ||
      tagName == 'img' ||
      tagName == 'hr' ||
      tagName == 'br' ||
      // TODO more
      false
    )
  }

  function stringOfOutputNodes(sources) {
    return sources.map(([type, source]) => {
      if (type == "attr") {
        return source.join("");
      }
      if (type == "child") {
        return stringOfOutputNodes(source);
      }
      return source;
    }).join("");
  }

  lastNodeTo = 0;
  let doTranslate = true;
  let currentTag = undefined;
  let currentAttrName = undefined;
  let currentAttrNameSpace = "";
  let currentAttrIs = undefined;
  let currentAttrIsSpace = "";
  let currentAttrValue = undefined;
  //let currentLang = undefined;
  //const textToTranslateList = [];
  let outputHtml = "";
  let outputNodes = [];
  let tagPath = [];
  let outputNodesPath = [];
  let inStartTag = false;
  //const htmlBetweenReplacementsList = [];
  //let lastReplacementEnd = 0;

  walkHtmlTree(topNode, (node) => {

    let nodeSource = inputHtml.slice(node.from, node.to);
    let nodeSourceSpaceBefore = inputHtml.slice(lastNodeTo, node.from);

    // validate nodeSourceSpaceBefore
    if (nodeSourceSpaceBefore.match(/^\s*$/) == null) {
      console.error((
        `error: nodeSourceSpaceBefore must match the regex "\\s*". ` +
        `hint: add "lastNodeTo = node.to;" before "return;"`
      ), {
        lastNodeTo,
        nodeFrom: node.from,
        nodeTo: node.to,
        nodeSourceSpaceBefore,
        nodeSource,
        nodeSourceContext: inputHtml.slice(node.from - 100, node.to + 100),
      })
      process.exit(1);
    }

    const nodeTypeId = node.type.id;
    const nodeTypeName = node.type.name;

/*
node 6 = StartTag: <
node 22 = TagName: div
node 24 = AttributeName:  class
node 25 = Is: =
node 26 = AttributeValue: "annotation"
node 24 = AttributeName:  onClick
node 25 = Is: =
node 26 = AttributeValue: "clickAnnotation(this)"
node 24 = AttributeName:  title
node 25 = Is: =
node 26 = AttributeValue: '
    Astrologie:
    Falsch ist der Schluss von Geburtstag auf Persönlichkeitstyp.
  '
node 4 = EndTag: >
node 16 = Text: Astrologie
node 11 = StartCloseTag: </
node 22 = TagName: div
node 4 = EndTag: >
*/

    if (
      nodeTypeName == "StartTag"
    ) { // StartTag
      if (
        !(
          nodeTypeId == 6 ||
          nodeTypeId == 7 || // <script>
          nodeTypeId == 8 || // <style>
          nodeTypeId == 10 || // <link>
          false
        )
      ) {
        console.error(`TODO implement: StartTag with nodeTypeId=${nodeTypeId}`);
        process.exit(1);
      }
      currentTag = newTag();

      tagPath.push(currentTag);
      //console.log(`${nodeTypeId} = ${node.type.name}: ${nodeSource}`);
      //console.dir(currentTag?.sources);
      //console.dir(tagPath);

      inStartTag = true;
      // buffer the StartTag nodes before output
      // so we can modify nodes like the AttributeName + AttributeValue nodes lang="..."
      const childOutputNodes = [["tag", nodeSourceSpaceBefore + nodeSource]];
      outputNodesPath.push(childOutputNodes);
      outputNodes.push(["child", childOutputNodes]);
      outputNodes = outputNodes[outputNodes.length - 1][1];
      // dont output
      lastNodeTo = node.to;
      return;
    }
    else if (
      nodeTypeName == "StartCloseTag"
    ) {

      outputNodes.push(["tag", nodeSourceSpaceBefore + nodeSource]);
      lastNodeTo = node.to;
      return;
      /*
      if (
        isSentenceTag(currentTag)
      ) {
        // add "." for joinText, so the translator can split sentences
        textToTranslateList.push([
          textToTranslateList.length,
          "",
          currentLang,
          ".",
          1,
        ]);
        htmlBetweenReplacementsList.push("");
      }
      */
    }
    else if (
      nodeTypeName == "EndTag"
      //nodeTypeId == 4
    ) { // EndTag of StartTag or StartCloseTag
      if (nodeTypeId != 4) {
        console.error(`TODO implement: EndTag with nodeTypeId=${nodeTypeId}`);
        process.exit(1);
      }

      //console.log(`${nodeTypeId} = ${node.type.name}: ${nodeSource}`);
      //console.dir(currentTag?.sources);
      //console.dir(tagPath);

      // handle value-less attributes like "defer" in
      // <script defer src="asdf.js"></script>
      if (inStartTag == true && currentAttrName !== undefined) {
        // the previous AttributeName had no value
        currentTag.attrs.push([currentAttrName, null]);
        outputNodes.push(["attr", [
          currentAttrNameSpace,
          currentAttrName,
        ]]);
      }

      if (
        (
          inStartTag == true && // EndTag of StartTag
          isSelfClosingTagName(currentTag.name)
        )
      ) {
        debug && console.log(`${node.from}: EndTag of StartTag and SelfClosingTag: ${nodeTypeId} = ${node.type.name}: ${nodeSource}: name = ${currentTag.name}: tagPath = /${tagPath.map(t => t.name).join("/")}`);
      }
      else if (inStartTag == false) {
        debug && console.log(`${node.from}: EndTag of StartCloseTag: ${nodeTypeId} = ${node.type.name}: ${nodeSource}: name = ${currentTag.name}: tagPath = /${tagPath.map(t => t.name).join("/")}`);
      }
      else {
        debug && console.log(`${node.from}: EndTag: ${nodeTypeId} = ${node.type.name}: ${nodeSource}: name = ${currentTag.name}: tagPath = /${tagPath.map(t => t.name).join("/")}`);
      }

      if (
        (
          inStartTag == true && // EndTag of StartTag
          isSelfClosingTagName(currentTag.name)
        ) ||
        inStartTag == false // EndTag of StartCloseTag
      ) {
        outputNodes.push(["tag", nodeSourceSpaceBefore + nodeSource]);

        // transform:
        // a: <div class="annotation" onClick="clickAnnotation(this)" title='note'>content</div>
        // b: <span class="note">content<span style="display:none">note</span></span>

        if (currentTag.name == "div") {
          
          const classList = new Set(((currentTag.attrs.find(([name, _value]) => name == "class") || [])[1] || "").split(/\s+/).filter(Boolean));
          //console.log("classList", Array.from(classList));
          if (classList.has("annotation")) {
            // <div class="annotation">
            const classAttr = outputNodes.find(n => n[0] == "attr" && n[1][1] == "class");
            if (!(
              outputNodes[1][0] == "tag" &&
              outputNodes[1][1] == "div" &&
              outputNodes[outputNodes.length - 2][0] == "tag" &&
              outputNodes[outputNodes.length - 2][1] == "div" &&
              classAttr !== undefined &&
              true
            )) {
              console.dir(outputNodes);
              throw new Error('assertion error while transforming outputNodes');
            }
            // <div> -> <span>
            outputNodes[1][1] = "span";
            // </div> -> </span>
            outputNodes[outputNodes.length - 2][1] = "span";
            // class="annotation" -> class="note"
            if (classAttr[1][5] == '"annotation"') {
              classAttr[1][5] = '"note"'
            }
            else {
              console.dir(classAttr);
              throw new Error('TODO implement: parse and modify the class string');
            }
            // remove: onClick="clickAnnotation(this)"
            for (let i = 0; i < outputNodes.length; i++) {
              if (outputNodes[i][0] != "attr") {
                continue;
              }
              if (outputNodes[i][1][1] != "onClick") {
                continue;
              }
              outputNodes[i] = [];
            }
            // remove: title='...'
            let noteBody = null;
            for (let i = 0; i < outputNodes.length; i++) {
              if (outputNodes[i][0] != "attr") {
                continue;
              }
              if (outputNodes[i][1][1] != "title") {
                continue;
              }
              noteBody = outputNodes[i][1][5].slice(1, -1);
              outputNodes[i] = [];
            }
            if (noteBody == null) {
              console.dir(outputNodes);
              throw new Error('failed to parse noteBody');
            }
            // insert before </span>: <span style="display:none">note</span>
            // </span> -> <span>
            outputNodes[outputNodes.length - 3][1] = "<";
            // insert: style="display:none"
            outputNodes[outputNodes.length - 1] = ["attr", [" ", "style", "", "=", "", '"display:none"' ]];
            outputNodes.push(["tag", ">"]);
            outputNodes.push(["text", noteBody]);
            outputNodes.push(["tag", "</"]);
            outputNodes.push(["tag", "span"]);
            outputNodes.push(["tag", ">"]);
            outputNodes.push(["tag", "</"]);
            outputNodes.push(["tag", "span"]);
            outputNodes.push(["tag", ">"]);
            //console.dir(outputNodes); process.exit(1);
          }
        }

        // TODO transform outputNodes and write to outputHtml
        //outputHtml += `<TODO:EndTag:${node.from} currentTag.name="${currentTag.name}"/>`;

        if (outputNodesPath.length == 1) {
        //if (currentTag.name == "html") {
          // output the root node
          // this is wasteful of memory, but simple
          outputHtml += stringOfOutputNodes(outputNodes);
        }

        outputNodesPath.pop();
        outputNodes = outputNodesPath[outputNodesPath.length - 1];

        tagPath.pop();
        //console.error(`- tagPath=/${tagPath.map(tag => tag.name).join('/')}`)
        currentTag = tagPath[tagPath.length - 1];
        // set currentLang of next parent tag with (tag.lang != undefined)
        //currentLang = undefined;
        for (let i = tagPath.length - 1; i >= 0; i--) {
          if (tagPath[i].lang) {
            currentLang = tagPath[i].lang;
            break;
          }
        }

        inStartTag = false;
        lastNodeTo = node.to;
        return;
      }

      outputNodes.push(["tag", nodeSourceSpaceBefore + nodeSource]);
      inStartTag = false;
      lastNodeTo = node.to;
      return;
    }
    else if (nodeTypeId == 22) { // TagName
      if (inStartTag) { // TagName in StartTag
        //currentTag = newTag(currentTag);
        currentTag.name = nodeSource;

        debug && console.log(`${node.from}: TagName + inStartTag: ${nodeTypeId} = ${node.type.name}: ${nodeSource}: name = ${currentTag.name}: tagPath = /${tagPath.map(t => t.name).join("/")}`);
      }
      else {
        debug && console.log(`${node.from}: TagName: ${nodeTypeId} = ${node.type.name}: ${nodeSource}: name = ${currentTag.name}: tagPath = /${tagPath.map(t => t.name).join("/")}`);
      }
      //console.error(`+ tagPath=/${tagPath.map(tag => tag.name).join('/')}`)
      // buffer
      outputNodes.push(["tag", nodeSourceSpaceBefore + nodeSource]);
      lastNodeTo = node.to;
      return;
    }
    else if (nodeTypeId == 24) { // AttributeName in StartTag
      // handle value-less attributes like "defer" in
      // <script defer src="asdf.js"></script>
      if (currentAttrName !== undefined) {
        // the previous AttributeName had no value
        currentTag.attrs.push([currentAttrName, null]);
        outputNodes.push(["attr", [
          currentAttrNameSpace,
          currentAttrName,
        ]]);
      }
      // dont output the AttributeName node yet
      // wait for AttributeValue
      currentAttrName = nodeSource;
      currentAttrNameSpace = nodeSourceSpaceBefore;
      lastNodeTo = node.to;
      return;
    }
    else if (inStartTag && nodeTypeName == "Is") { // Is ("=") in StartTag
      // dont output the Is node yet
      // wait for AttributeValue
      currentAttrIs = nodeSource;
      currentAttrIsSpace = nodeSourceSpaceBefore;
      lastNodeTo = node.to;
      return;
    }
    else if (nodeTypeId == 26) { // AttributeValue in StartTag
      //currentAttrValue = nodeSource;
      currentAttrValue = nodeSource.slice(1, -1); // remove quotes from value
      currentTag.attrs.push([currentAttrName, currentAttrValue]);
      lastNodeTo = node.to;
      outputNodes.push(["attr", [
        currentAttrNameSpace,
        currentAttrName,
        currentAttrIsSpace,
        currentAttrIs,
        nodeSourceSpaceBefore,
        nodeSource,
      ]]);
      // consume the attribute name
      // for attributes with values
      currentAttrName = undefined;
      return;

      //console.log(`${nodeTypeId} = ${node.type.name}: currentAttrName=${currentAttrName}`);

      // clear the output buffer
      /*
      outputHtml += (
        currentAttrNameSpace + currentAttrName +
        currentAttrIsSpace + currentAttrIs
      );
      */
    }

    /*
    // this should be lossless
    //process.stdout.write(nodeSource);
    walkHtmlTreeTestResult += nodeSource;
    lastNodeTo = node.to;
    return;
    */

    if (
      nodeTypeId == 16 || // Text
      nodeTypeId == 17 || // EntityReference
      nodeTypeId == 28 || // ScriptText
      nodeTypeId == 31 || // StyleText
      false
    ) {

      if (currentTag) {
        outputNodes.push(["text", nodeSourceSpaceBefore + nodeSource]);
      }
      else {
        outputHtml += nodeSourceSpaceBefore + nodeSource;
      }
      lastNodeTo = node.to;
      return;

      //if (nodeSource.match(/^\s+$/s)) {
      if ((nodeSourceSpaceBefore + nodeSource).match(/^\s+$/s)) {
        //console.log(`${nodeTypeId} = ${node.type.name} (whitespace): ${nodeSource}`);
        //console.log(`tagPath=/${tagPath.map(tag => tag.name).join('/')}: lang=${currentLang}: type=${nodeTypeId}=${node.type.name}=whitespace: ${(nodeSourceSpaceBefore + nodeSource)}`);
        lastNodeTo = node.to;
        return;
      }
    }

    if (nodeTypeId == 39) { // Comment

      if (currentTag) {
        outputNodes.push(["comment", nodeSourceSpaceBefore + nodeSource]);
      }
      else {
        outputHtml += nodeSourceSpaceBefore + nodeSource;
      }
      lastNodeTo = node.to;
      return;


      if (translateComments == false || doTranslate == false || currentTag.notranslate == true || currentTag.hasTranslation == true) {
        outputHtml += nodeSourceSpaceBefore + nodeSource;
        lastNodeTo = node.to;
        return;
      }
      const commentContentWithPrefix = nodeSource.slice(4, -3);
      const commentLangMatch = commentContentWithPrefix.match(/\(lang="([a-z+]{2,100})"\)/);
      const commentLang = commentLangMatch ? commentLangMatch[1] : undefined;
      const commentLangPrefix = commentLangMatch ? commentLangMatch[0] : "";
      const commentContent = commentContentWithPrefix.slice(commentLangPrefix.length);

      //if (nodeSource.match(/^\s+$/s)) {
      if ((nodeSourceSpaceBefore + commentContent).match(/^\s+$/s)) {
        //console.log(`${nodeTypeId} = ${node.type.name} (whitespace): ${nodeSource}`);
        //console.log(`tagPath=/${tagPath.map(tag => tag.name).join('/')}: lang=${currentLang}: type=${nodeTypeId}=${node.type.name}=whitespace: ${(nodeSourceSpaceBefore + nodeSource)}`);
        outputHtml += nodeSourceSpaceBefore + nodeSource;
        lastNodeTo = node.to;
        return;
      }
    }

    if (node.type.id == 43) { // DoctypeDecl
      outputHtml += nodeSourceSpaceBefore + nodeSource;
      lastNodeTo = node.to;
      return;
    }

    outputHtml += `[node:${node.type.id}=${node.type.name}]`

    //console.log(`${nodeTypeId} = ${node.type.name}: ${nodeSource}`);
    //console.log(`tagPath=/${tagPath.map(tag => tag.name).join('/')}: lang=${currentLang}: type=${nodeTypeId}=${node.type.name}: ${(nodeSourceSpaceBefore + nodeSource)}`);
    outputHtml += nodeSourceSpaceBefore + nodeSource;

    outputHtml += `[/node:${node.type.id}=${node.type.name}]`

    lastNodeTo = node.to;
    return;

  });

  console.log(`writing ${outputPath}`);
  fs.writeFileSync(outputPath, outputHtml, 'utf8');

}

main();
