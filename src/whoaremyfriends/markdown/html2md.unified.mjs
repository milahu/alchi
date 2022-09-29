/*
based on
https://github.com/rehypejs/rehype-remark#use
https://unifiedjs.com/learn/recipe/remark-html/#how-to-allow-html-embedded-in-markdown
https://unifiedjs.com/explore/package/rehype-remark/#example-keeping-some-html

limitation: *abstract* syntax tree, not *concrete* syntax tree,
so the original code formatting is lost

*/

//import fetch from 'node-fetch'

// transform html to markdown
// keep some html elements like table, svg

import { unified } from 'unified'
import rehypeParse from 'rehype-parse'
//import remarkHtml from 'remark-html' // md -> html
import rehypeRemark from 'rehype-remark'
import { toHtml } from 'hast-util-to-html' // html -> str
//import rehypeStringify from 'rehype-stringify' // html -> str
import remarkStringify from 'remark-stringify' // md -> str

import remarkPrettier from 'remark-prettier';


main()

async function main() {

const html = `
<html>
  <body>
    <table>
      <tr>
        <td>hello</td>
      </tr>
    </table>
  </body>
</html>
`;

  const mdfile = await unified()

    // html string -> html tree
    .use(rehypeParse, {
      //fragment: true,
    })

    // html tree -> markdown tree
    .use(rehypeRemark, {
      handlers: {
        // keep some html elements
        svg(h, node) {
          return h(node, 'html', toHtml(node))
        },
        table(h, node) {
          return h(node, 'html', toHtml(node))
        },
      }
    })

    // markdown tree -> markdown string
    /*
    .use(remarkStringify, {
      bullet: '*',
      fence: '~',
      fences: true,
      incrementListMarker: false,
    })
    */

    // markdown tree -> pretty markdown string
    // remark-prettier registers a unified compiler.
    // This means this plugin is used for formatting the document.
    // Usually this is done by remark-stringify
    // ugly string -> pretty string
    // Format HTML in Markdown
    // https://github.com/prettier/prettier/issues/8480
    // -> open issue!
    .use(remarkPrettier, {
      options: {
        //asdf
      },
    })

    .process(html)

  console.log(String(mdfile))
}
