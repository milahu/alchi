# alchi

**humans and their relations** are the last secret of this world ...

lets decode this last secret!

in our view, **psychology and sociology** must be seen as one science.  
both psychology and sociology are only two sides of one coin.  
this one science is the science of mental chemistry, in short: alchemy

## packages

this repository is organized as a monorepo of multiple packages

* [src/alchi-book/](src/alchi-book/)
* [src/alchi-flyer/](src/alchi-flyer/)
* [src/alchi-tables/](src/alchi-tables/)
* [src/alchi-maps/](src/alchi-maps/)
* [src/alchi-test/](src/alchi-test/)

a monorepo is easier to backup, and usually our readers need all packages

### releases

we try to release all our content as **single file apps**
which can be simply opened in any web browser,  
without [installing node.js](https://nodejs.org/en/download/package-manager/)
and without starting a local web server

[//]: # ( usually with `npm install` and `npm run start` or `npm run dev` )
[//]: # ( cost: larger repository )

we can open markdown files offline with (for example) the [Markdown Preview Plus](https://www.crx4chrome.com/extensions/febilkbfcbhebfnokafefeacimjdckgl/) chrome extension  
(in `chrome://extensions` enable `Allow access to file URLs`)

### recent publications

<details>

subscribe to the [RSS feed](https://github.com/milahu/alchi/commits/master.atom) for notifications of project commits,
or use github's [watch repo](https://docs.github.com/en/github/managing-subscriptions-and-notifications-on-github/setting-up-notifications/configuring-notifications#configuring-your-watch-settings-for-an-individual-repository) function

* 2021-07-29
  * alchi flyer html: [github](https://milahu.github.io/alchi/src/alchi-flyer/alchi-flyer.html)

* 2021-07-06
  * alchi game html: [github](https://milahu.github.io/alchi/src/alchi-flyer/alchi-game.html)

* 2021-05-16
  * alchi book html: [github](https://milahu.github.io/alchi/src/alchi-book/build/), [gitlab](https://milahu.gitlab.io/alchi/src/alchi-book/build/)

* 2021-04-11
  * alchi-book html: [github](https://milahu.github.io/alchi/src/alchi-book/dist/pallas.me-and-my-six-friends.2021-04-11.html), [gitlab](https://milahu.gitlab.io/alchi/src/alchi-book/dist/pallas.me-and-my-six-friends.2021-04-11.html) - first public release - successor of the alchi-flyer
  * alchi-test html: [github](https://milahu.github.io/alchi/src/alchi-test/public/), [gitlab](https://milahu.gitlab.io/alchi/src/alchi-test/public/) - first public release - combine multiple personality tests, show result with the four elements

* 2020-09-01
  * alchi tables html: [github](https://milahu.github.io/alchi/english/alchi-tables.html), [gitlab](https://milahu.gitlab.io/alchi/english/alchi-tables.html)
  * alchi flyer html (german): [github](https://milahu.github.io/alchi/deutsch/alchi-flyer.html), [gitlab](https://milahu.gitlab.io/alchi/deutsch/alchi-flyer.html)
  * alchi-maps 2020-09-02 html+svg+js: [github](https://milahu.github.io/alchi/src/alchi-maps/dist/alchi-maps.2020-09-02.html#A1_e/bxinout_s+m_1110_0_en_np), [gitlab](https://milahu.gitlab.io/alchi/src/alchi-maps/dist/alchi-maps.2020-09-02.html#A1_e/bxinout_s+m_1110_0_en_np) - new: with fotos (format `e/bxfoto`)

* 2020-08-10
  * [finger test - three hands svg](../src/images/finger%20test%20-%20three%20hands.svg) (25 KB) is the most simple test for the three sheldon-types

* 2020-03-10
  * [alcimaps html+svg+js](https://milahu.github.io/alchi/src/alchi-maps/dist/alcimaps.2020-03-10.html) (130 KB)
  * [alcimaps preview webp](https://milahu.github.io/alchi/src/alchi-maps/dist/alcimaps-2020-03-10.html.preview.webp) (68 KB)
  * [alcimaps source code](../src/alchi-maps) (550 KB) for [svelte - the javascript compiler](https://svelte.dev/repl/hello-world)

* 2019-05-13
  * [matrix viewer html+js](https://milahu.github.io/alchi/src/alchi-maps/dist/alchi-matrix-viewer.2019-05-13.html) (22 KB)
  * [matrix viewer screenshot gif](https://milahu.github.io/alchi/src/alchi-maps/dist/alchi-matrix-viewer.2019-05-08.html.M3.gif) (33 KB)

* 2019-04-11
  * [english synth notes txt](alchi%20synth%20english%202019-04-11.txt) (260 KB)
  * [various svg graphics](../src/images) (650 KB)
  * [python script](../src/scripts/alchi-web.py) (20 KB) to render matrix views

</details>

### more content

this project is still a work-in-progress.
ideally, all the text-files and images
would be merged into the alchi-book:

* [english/](english/)
* [deutsch/](deutsch/)
* [src/images/](src/images/) (todo: remove old files)

### permalinks

a note to myself and other contributors:

when moving files, make sure that the old URLs are still reachable

ideally replace the old file with a relative link to the new location, like

```html
<html>
moved to <a href="path/to/new/file.html">path/to/new/file.html</a>
</html>
```

## download

all files and versions can be downloaded with the linux command

```txt
git clone https://github.com/milahu/alchi.git
```

the program `git` is also available for [Windows, Android, Apple, etc.](https://git-scm.com/downloads/guis/)

this also works with our [repo mirrors](#repo-mirrors)

## future work

* english synth (see [src/alchi-book](src/alchi-book))
* handout = one page summary (see [de](deutsch/alchi-flyer.html) and [en](english/alchi-flyer.en.html), but they are very hard to read)
* video (for example: how to [Construct the Map Of Sixteen Types](src/alchi-book/src/pages/page-020.html) from scratch)
* proof of concept

## work in progress

finishing my project is my "running away balloon":

[<img
  width="250"
  src="src/images/meme.running-away-balloon.finish-my-project-vs-distractions.jpeg"
  alt="meme: running away balloon: finish my project vs distractions"
  title="meme: running away balloon: finish my project vs distractions"
/>](src/images/meme.running-away-balloon.finish-my-project-vs-distractions.jpeg)

the closer i get to my finish line, the harder becomes my work,
and that with an exponential increase

i guess that is why broad-tops (fire and air) like me (fire)
need long-tops (earth and water):  
broad-tops easily start new work (find new distractions)
and long-tops easily "get shit done",  
assuming the long-top has experience with this job

## translations

i am in the process of making english the default language

i started this project in german, since german is my native language,
and i wanted to publish my work offline to the people in my region,
to realize and test my concept ...
this approach has failed, since

* most "interesting subjects" (children)
are ridiculously overprotected by their parents, teachers and police
* most people in my region have a ridiculous trust in their government,
so they are zero prepared for the coming collapse

plan B:
publish my work to online communities (doomsday preppers, personality psychology, ...)
where my work can at least be preserved for future generations,
and where my work can be reviewed (at least superficially) by other psychology scholars

the [alchi-book](src/alchi-book/) package is the current focus of my work.
the english and german versions are about 80% ready.
i have already added auto-translations for:
chinese, spanish, russian, turkish, farsi, arabic, czech, hungarian.
adding a new auto-translation with [translate.js](src/alchi-book/scripts/translate.js)
can now be done in five minutes or less.

* [src/alchi-book/scripts/translate.js](src/alchi-book/scripts/translate.js)  
node.js script to export text fragments to [google translate](http://translate.google.com/),
and to import translations back to [src/alchi-book/src/pages/](src/alchi-book/src/pages/).
the imported text fragments look like `<lang.ar rev="en#L1S/h9eR">`
and must be fixed manually, since auto-translate is never perfect.
* [src/alchi-book/src/\_data/metadata.js](src/alchi-book/src/_data/metadata.js) - see `languages`.
this is a space-separeted list of all languages codes for the language menu

## mirrors

in the rare case that this project (https://github.com/milahu/alchi)
is censored by github (owned by microsoft ...), here are some mirror locations

only some mirrors allow users to send feedback, for example `gitlab.com` or `galaxy*.onion`

### repo mirrors

the `github.com/milahu/alchi` repository is mirrored to

* gitlab: https://gitlab.com/milahu/alchi
* gitea.io: https://try.gitea.io/milahu/alchi
* darktea (with Tor Browser): [http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi](http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi)
* ~~rootgit (with Tor Browser): [http://rootgit4rghbuenb.onion/milahu/alchi](http://rootgit4rghbuenb.onion/milahu/alchi)~~ offline since [2021-05-23](http://auutohrgxfoc4zap.onion/cap.php?cat=1&pageno=1)

### clone commands

```
# github.com
git clone https://github.com/milahu/alchi.git

# gitlab.com
git clone https://gitlab.com/milahu/alchi.git

# gitea.io
git clone https://try.gitea.io/milahu/alchi.git

# darktea
torsocks git clone http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi.git

# rootgit - offline since 2021-05-23
torsocks git clone http://rootgit4rghbuenb.onion/milahu/alchi.git
```

### static mirrors

* archive.org: https://web.archive.org/web/*/https://github.com/milahu/alchi

### discussions

dont worry, its very empty there ...
blame `milahu`, who is just too damn lazy to push his project

* github: https://github.com/milahu/alchi/issues
* gitlab: https://gitlab.com/milahu/alchi/-/issues
* lemmy: https://lemmy.ml/c/alchi
* personalitycafe: [alchi. a general theory of interpersonal compatibility
](https://www.personalitycafe.com/threads/alchi-a-general-theory-of-interpersonal-compatibility.1354920/#post-44121050)

### contact

* mastodon: https://freespeechextremist.com/milahu
* ruqqus: https://ruqqus.com/@milahu
* galaxy (with Tor Browser): `http://galaxy3m2mn5iqtn.onion/profile/milahu`
* minds: https://www.minds.com/milahu

if you really want to reach me, better send your request to multiple sites

### absence

In case of milahu's absence ... milahu cannot help you, and you are on your own

milahu does have some enemies, who want him broken, in jail or dead ...

What milahu has published here is only a part of his hand-written diary,  
but it should be enough information to realize and test his concept

### wrong

In case milahu's concept is wrong:

Let him quote the alchi-book ([src/alchi-book/src/pages/page-150.html](src/alchi-book/src/pages/page-150.html)):

> Doubt: Just a theory / vision / daydream?
>
> When our map is wrong:  
> The 16 types of people are real
> (4 bodies times 4 elements),  
> and when you put them all in one place  
> then they will
> find the natural order by themself
> (self-organisation).  
>  
> Other worldviews are also "just a theory"
> and only because other experiments  
> have been running for a long time,
> they are not automatically better.  
> More competition please!  
>  
> And, trying is better than studying:  
> We can compare a theory
> only after we have tried it.  
>  
> When someone wants to attack a good theory  
> he will distract from the topic
> and argue with false reasons  
> (superficial, formal criticism, pseudo-problems).

#### keepalive

Technically, milahu could publish "keepalive messages" every day,
but for that he would need a "perfect private key".

In reality, an attacker would only need to torture him,
so he reveals his private key,
and then the attacker could takeover all his accounts (ID theft)

Or milahu could setup a "dead man switch", but ... nah

milahu prefers to rely on his reader's brains,
and he hopes that people [download the full alchi repository](#download),
so they can see the full edit history of all files

An attacker would leave traces in the edit history,
similar to Wikipedia,
or he would have to rewrite the git history,
in that case a `git pull` would fail to update any local files

The best way to authenticate milahu is to meet him in person.
milahu's location is near Munich, Germany.
(See [Contact](#contact))

## keywords

some keywords (tags) for search engine optimization (SEO):

* [interpersonal compatibility](https://en.wikipedia.org/wiki/Interpersonal_compatibility), intertype compatibility, compatibility algorithm, candidate for a "general theory of interpersonal compatibility"
* [arranged friendship (talk by Dr. Vas Taras)](https://www.youtube.com/watch?v=JlEJbC5k914), prescriptive parenting, invasive parenting, directive parenting, authoritarian education, how should parents select friends for their kids
* who are my friends, what is my circle of friends, what is my inner circle
* who are my ideal parents, who are my ideal teachers, who are my ideal students
* matchmaking, procuring, procuration, arranged marriage
* dating platform algorithm
* human combinatorics, human relations
* stable match problem, stable matching problem, stable marriage problem, stable roommates problem, game theory
* organization theory
* social psychology, psycho sociology
* socionics, social engineering
* communication theory, systems theory
* small state, utopia, paradise on earth
* non-calendar astrology (calendar astrology is wrong, personality type is NOT related to birthday)
* alternative to calendar astrology
* what is natural order
* primitive culture, minimalism, natural religion
* physiognomy, anthropometry, body types, stigmata
* anthropology, science of humans
* sacred geometry, natural patterns
* a perfect synthesis
* alchemy, humorology, four classical elements
* numerology, trinity (three modalities), quaternio (four elements)
* comparative cultural studies, meta politics, cultural theory
* simple but effective, realistic reductionism
* intuitive factor analysis (the project author is element fire, who dreams to be a benevolent dictator)
* border science, borderline science, between all the worlds
* claim of perfection, totalitarian approach, a theory for every body
* search for the one universal truth, monotheism, monism
* natural Human Resource Management (HRM)

### more keywords

taken from [src/alchi-book/src/pages/page-005-my-last-words.html](src/alchi-book/src/pages/page-005-my-last-words.html)

* community building
* community organization
* group organization
* offline community
* communism (not socialism!)
* organized resistance
* self organization
* primitive culture
* minimalism
* psychology and sociology
* humans and their relations
* relationship advice
* matchmaking
* mating ritual
* courtship ritual
* spiritual mating
* interpersonal compatibility
* who are my friends
* where are my friends
* natural order
* natural attraction
* natural sharing of work
* natural division of labor
* mutual completion
* group dynamics
* group movement
* group dance
* group game
* parlor game
* choreography
* dualism
* justice
* balance
* small states
* cultural mosaic
* natural education
* school of life
* post collapse
* family versus friends
* bottom-up organization
* small is beautiful
* paradise on earth
* permaculture
* human resources management
* world formula
* basic principles
