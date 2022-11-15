# alchi/src/doc/todo

small part of my todo list

## better than html

i want a better toolchain

modular = split files

must be compatible with github/gitlab/gitea blob api

== must be readable on github/gitlab/gitea

alternatives to html:

* markdown
* org-mode
* asciidoc

## markdown

https://github.com/milahu/random/blob/master/markdown/test-github-markdown-renderer.md

warning, this is one large file with 8000 lines of source code

https://github.com/milahu/alchi/blob/master/src/whoaremyfriends/markdown/wersindmeinefreunde.md

## org-mode

https://orgmode.org/

<blockquote>

Org Mode

Your life in plain text

A GNU Emacs major mode for keeping notes, authoring documents, computational notebooks, literate programming, maintaining to-do lists, planning projects, and more — in a fast and effective plain text system.

</blockquote>

Org Mode Syntax Is One of the Most Reasonable Markup Languages to Use for Text

https://karl-voit.at/2017/09/23/orgmode-as-markup-only/

### more complex than markdown

this is a problem for contributors

most people know markdown, but only the "pros" know org-mode

contributing should be as "low barriers" as possible

### images not working in github blob api

example

https://github.com/zzamboni/emacs-org-leanpub/blob/master/book.org#setting-up

actual image

https://github.com/zzamboni/emacs-org-leanpub/raw/master/manuscript/resources/images/leanpub-pricing-plans.png

image expected by github

https://github.com/zzamboni/emacs-org-leanpub/raw/master/images/leanpub-pricing-plans.png

workaround: symlink the images folder to every folder with org files

### org-mode and pandoc

https://pandoc.org/org.html

### org-mode books

https://github.com/zzamboni/emacs-org-leanpub/blob/master/book.org

### org-mode to html

#### ox-leanpub

https://github.com/zzamboni/ox-leanpub

> Note: you should use the Markua exporter, as it’s more mature, complete and actively developed by me. Some Org constructs might not be exported correctly to Markdown.

### leanpub

Publishing with Emacs, Org-mode and Leanpub

Easy and Powerful self-publishing

https://github.com/zzamboni/emacs-org-leanpub

https://leanpub.com/emacs-org-leanpub - commercial??

<blockquote>

Write and Publish on Leanpub
You can use Leanpub to easily write, publish and sell in-progress and completed ebooks and online courses!

Leanpub is a powerful platform for serious authors, combining a simple, elegant writing and publishing workflow with a store focused on selling in-progress ebooks.

Leanpub is a magical typewriter for authors: just write in plain text, and to publish your ebook, just click a button. (Or, if you are producing your ebook your own way, you can even upload your own PDF and/or EPUB files and then publish with one click!) It really is that easy.

</blockquote>

<details>

<summary>tags relevant for my book</summary>

https://leanpub.com/bookstore?type=all&category=organizational_psychology

https://leanpub.com/bookstore?type=all&category=business_and_management

https://leanpub.com/bookstore?type=all&category=leadership

https://leanpub.com/bookstore?type=all&category=psychology

https://leanpub.com/bookstore?type=all&category=psychotherapy

https://leanpub.com/bookstore?type=all&category=anthropology

https://leanpub.com/bookstore?type=all&category=personal_science

https://leanpub.com/bookstore?type=all&category=social_science

https://leanpub.com/bookstore?type=all&category=social_justice

https://leanpub.com/bookstore?type=all&category=social_equity

https://leanpub.com/bookstore?type=all&category=family_and_parenting

https://leanpub.com/bookstore?type=all&category=economics

https://leanpub.com/bookstore?type=all&category=education

https://leanpub.com/bookstore?type=all&category=equality

https://leanpub.com/bookstore?type=all&category=chemistry

https://leanpub.com/bookstore?type=all&category=teamwork

https://leanpub.com/bookstore?type=all&category=startups

https://leanpub.com/bookstore?type=all&category=distributed_systems

https://leanpub.com/bookstore?type=all&category=leadership_agile

https://leanpub.com/bookstore?type=all&category=religion_and_spirituality

https://leanpub.com/bookstore?type=all&category=atheism

https://leanpub.com/bookstore?type=all&category=philosophy

https://leanpub.com/bookstore?type=all&category=selfhelp

https://leanpub.com/bookstore?type=all&category=diy

https://leanpub.com/bookstore?type=all&category=childrens_books

https://leanpub.com/bookstore?type=all&category=teen_and_young_adult

</details>

#### Markua format

example

https://github.com/zzamboni/emacs-org-leanpub/blob/master/manuscript/introduction.markua

https://leanpub.com/lfm/read

On Leanpub, there are two ways to write in plain text:

1. Leanpub Flavoured Markdown (LFM)
2. Markua 0.10

### org-mode to html

#### org-reveal

presentation in slides (slideshow)

https://github.com/yjwen/org-reveal

based on https://github.com/hakimel/reveal.js/ - The HTML Presentation Framework

### org-brain

mindmapping tool

https://github.com/Kungsgeten/org-brain

## asciidoc

* https://github.com/TalAter/awesome-book-authoring/issues
  * https://medium.com/hackernoon/living-the-future-of-technical-writing-2f368bd0a272
    * local copy: [living-the-future-of-technical-writing](living-the-future-of-technical-writing)
    * https://github.com/git/git-scm.com
    * https://github.com/progit/progit2

<blockquote>

Asciidoc

So I switched large portions of Pro Git to Asciidoc. The issue with Markdown was that it was too simple. It didn’t specify things like table formatting, cross references, indexing, callouts, source code examples, etc. All of which Asciidoc does in a format that is just as easy to write.

</blockquote>

problem: not really compatible with github blob api

example: images are missing in

https://github.com/progit/progit2/blob/main/book/01-introduction/sections/about-version-control.asc

for example, this image is not visible

```asc
.Local version control
image::images/local.png[Local version control diagram]
```

actual location:
https://github.com/progit/progit2/raw/main/images/local.png

location expected by github renderer:
https://github.com/progit/progit2/raw/main/book/01-introduction/sections/images/local.png

so, image paths in asciidoc are relative to the project root
but github interprets the image path as relative to the asc file

### asciidoctor

render asciidoc to html, docbook, manpages, pdf, epub

https://github.com/asciidoctor

https://github.com/asciidoctor/asciidoctor in ruby

https://github.com/asciidoctor/asciidoctor.js in javascript

### asciidoc vs markdown vs org-mode

https://duckduckgo.com/?q=asciidoc+vs+markdown+limitations

https://duckduckgo.com/?q=asciidoc+vs+markdown+vs+org-mode

https://www.slant.co/versus/8769/23065/~org-mode_vs_asciidoc

https://www.slant.co/versus/1903/23065/~markdown_vs_asciidoc

slant.co

* 130 org-mode
* 60 markdown
* 30 asciidoc

## remove bindery

bindery is old, slow

slow: 50 seconds to render 70 pages

for better performance:
strict separation of
"screen" and "print" presentation
&rarr; render the print presentation only on demand

screen: modular, one html file per chapter

print: monolith, all pages

current plan:

* mdbook for screen
* pagedjs for print

### pagedjs

narrow focus on book layout rendering

https://github.com/pagedjs/pagedjs

### mdbook

written in rust = fast

render static html

https://github.com/rust-lang/mdBook

10K stars

demo

https://rust-lang.github.io/mdBook/

todo:

* editable content via prosemirror
* live coding via figwheel, avoid page reload, see instant updates on "save"

### crowbook

written in rust = fast

https://github.com/lise-henry/crowbook

500 stars

### html

still the best format, IMHO

more verbose than markdown, but also more flexible?

just: split into multiple html files

best of both worlds? use markdown with html for tables, annotations, ...

### markdown

started converting html to markdown:

[src/whoaremyfriends/markdown/](../whoaremyfriends/markdown/)

more notes there

### unified

code transformer

parsing, inspecting, transforming, and serializing content through syntax trees

https://github.com/unifiedjs/unified

problem:
original formatting is lost (indents + newlines),
cannot prettify output (markdown with embedded html)

Format HTML in Markdown
https://github.com/prettier/prettier/issues/8480

#### remark

transform markdown to other formats

https://github.com/remarkjs/remark

https://github.com/remarkjs/remark#example-turning-markdown-into-html

https://github.com/remarkjs/remark-rehype - markdown to html

#### rehype

transform html to other formats

https://github.com/rehypejs/rehype

https://github.com/rehypejs/rehype-remark - html to markdown

rehype-inline — inline JS, CSS, and image files

### latex

old school

ugly syntax, markdown is prettier

### scholarlymarkdown

markdown for scholars

fork of pandoc

https://github.com/timtylin/scholdoc

It essentially understands a new input format markdown_scholarly
(implemented in the markdown reader a superset of markdown_pandoc features),
and limits itself to HTML5/LaTeX/Docx output

https://github.com/scholmd/scholmd/wiki

> Markdown is a fantastic and minimalist tool for authoring scientific documents. This repository is a collection of tools, resources, and tutorials to simplfy your workflow.

### pandoc

convert between many formats

example: md &larr;&rarr; html

https://github.com/hieplpvip/pandoc-markdown-book

```sh
mkdir -p build/html

pandoc \
    -f markdown+smart -t markdown-smart \
    -o build/html/index.html \
    --highlight-style tango \
    --filter pandoc-crossref \
    -s -t slidy \
    metadata.yml \
    src/*/*.md

cp -r img build/html/
```

https://pianomanfrazier.com/post/write-a-book-with-markdown/

https://thorstenball.com/blog/2018/09/04/the-tools-i-use-to-write-books/

https://learnbyexample.github.io/customizing-pandoc/

https://jaantollander.com/post/scientific-writing-with-markdown/

http://gbraad.gitlab.io/blog-content/0013-document-generation.html

> $ pandoc --template resume-template.html -o resume.html resume.md

> $ pandoc -V geometry:margin=1in -o deploying-OpenStack.pdf deploying-openstack.md

#### extract svg from html

pandoc --extract-media=path/to/output/images

https://github.com/jgm/pandoc/issues/6770

pandoc --extract-media=assets -s -f html -t html -o out.html "https://www.nouvelobs.com/coronavirus-de-wuhan/20201023.OBS35141/bientot-un-million-de-cas-de-covid-en-france-mais-ce-n-est-pas-le-chiffre-le-plus-inquietant.html"

pandoc --extract-media=assets -s -f html -t html -o out.html "https://create.piktochart.com/embed/44693036-les-foyers-de-coronavirus-en-france"

#### keep html tables

--to markdown_strict

pandoc --extract-media=assets --to markdown_strict ../wersindmeinefreunde.html -o wersindmeinefreunde.md

#### keep line breaks in source

https://stackoverflow.com/questions/26066621/preserve-line-breaks-in-pandoc-markdown-latex-conversion

> pandoc --wrap=preserve

#### code blocks in backticks or pre

#### markdown variants

https://pandoc.org/MANUAL.html#markdown-variants

pandoc --list-extensions=markdown_strict

#### annotations

https://pandoc.org/MANUAL.html#extension-inline_notes

### bookdown

con: large complex program, high entry barrier for contributors
step 1: download a million R packages

https://github.com/rstudio/bookdown

https://bookdown.org/yihui/bookdown/html.html

> a book will generate multiple HTML pages by default—normally one HTML file per chapter. This makes it easier to bookmark a certain chapter or share its URL with others as you read the book, and faster to load a book into the web browser.

#### svg

https://bookdown.org/yihui/rmarkdown-cookbook/graphical-device.html

> vector graphics have higher quality than raster graphics, and you can scale vector graphics without loss of quality. For HTML output, you may consider using dev = "svg" or dev = "svglite" for SVG plots

#### examples

https://github.com/jeroenjanssens/data-science-at-the-command-line

https://github.com/hadley/adv-r

## svg

### generate svg files from template

allow to add/remove groups on condition

### refactor title

move titles from `<title>...</title>` to `title="..."`

use a tool for automatic refactoring of xml or svg

## inplace editing

when people are reading my text,
they should be able to edit my text immediately, here and now

no page reload,
no "go to github, create an account,
go to my repo, find the file, click edit" ...
this is too far away

editing must be here and now

todo:

* add prosemirror editor
* store edits in the browser localcache, so edits are persistent across page reloads
* allow the user to export a patch file, so the user can send his patch file to me, via email, or chat, or github, or whatever

## markdown editors

### prosemirror

6K stars

lightweight

modular

plugins for live collaboration https://prosemirror.net/examples/collab/#edit-Example

https://github.com/ProseMirror/prosemirror

https://github.com/milahu/prosemirror-track-changes-demo

### tui.editor

15K stars

live preview of html

https://github.com/nhn/tui.editor

demo https://ui.toast.com/tui-editor



### github apps

#### hackmd-hub

https://github.com/marketplace/hackmd-hub

requires "order for zero dollars" and asks for postal address ... wtf

#### gitbook

github app, free for personal use

https://github.com/marketplace/gitbook-com

static html generator

menu, sync with git, connect github, select account, select repo, 

Deprecated
https://github.com/GitbookIO/gitbook

example

https://ryantm.github.io/nixpkgs/languages-frameworks/perl/

#### truegit-app

https://github.com/marketplace/truegit-app

blogging platform

Collaborative publishing:
Users can suggest edits to your posts directly on your blog. This creates a PR which can you merge to your master branch to publish.

### dokieli

looks messy

https://github.com/linkeddata/dokieli

### BookStack

Simple & Free Wiki Software

BookStack is a simple, self-hosted, easy-to-use platform for organising and storing information.

The page editor has a simple WYSIWYG interface and all content is broken into three simple real world groups:
Books Chapters Pages

The page editor within BookStack has [diagrams.net](https://www.diagrams.net/) drawing capability built-in, allowing the quick and easy creation of diagrams within your documentation.





centralized, but i want something based on git and maybe github/gitea/gitlab

https://github.com/BookStackApp/BookStack

### gitnote

last commit 2019 = dead project

https://github.com/zhaopengme/gitnote

https://gitnoteapp.com/


## done

### heften statt nähen

aktuell habe ich 72 seiten A5 = 18 blatt A4

das heft ist jetzt so dick, dass bei der nähmaschine immer der faden reisst

also: heften statt nähen

wanted specs:

* langarmhefter
* einlegetiefe mindestens 150 mm
* heftleistung 50 blatt
* preis um 15 eur
