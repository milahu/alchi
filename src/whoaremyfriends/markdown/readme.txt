Static Site Generators
https://jamstack.org/generators/

iles
svelte, solid (the only SSG for solid)
https://github.com/ElMassimo/iles

elder.js
svelte SSG
https://github.com/elderjs/elderjs

Publii
CMS, desktop app, beginner friendly
https://github.com/GetPublii/Publii

Silex
html editor, browser based
problem: not based on markdown, but it should be "markdown first" for github blob api
https://github.com/silexlabs/Silex

https://github.com/gohugoio/hugo
written in go = less hackable than javascript

https://github.com/rust-lang/mdBook
written in rust = less hackable than javascript

TODO javascript ssg's

docusaurus by facebook: react as tempate lang?

hexo: many templates

gitbook: jinja2 tpl

astro: svelte (yay!)

eleventy: many templates, also used for alchi-book

sveltekit, svelte: can it parse markdown inputs?
search:
render markdown with svelte

TODO: CMS based on markdown

simple markdown to html
https://github.com/astronomersiva/lego

nice to have feature:
incremental builds,
incremental static generation,
incremental static regeneration,
...
https://stackoverflow.com/questions/64834001/is-there-any-static-site-generator-that-supports-incremental-builds
candidates:
next.js, based on react (boo! but its popular)
nikola in python (meh)
jekyll in ruby (ugh!)

html attributes with single quotes produce invalid output
https://github.com/rust-lang/mdBook/issues/1898
-> my bad. problem was newlines in html fragments, which breaks markdown

