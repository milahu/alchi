# fork search

## static list

static list of known forks

## dynamic list

dynamic list of possible forks
on different git forges

- https://duckduckgo.com/?q=milahu*+alchi+site%3Agithub.com&ia=web
- https://duckduckgo.com/?q=milahu*+alchi+site%3Agitlab.com&ia=web

### search by tree hash

try to find this

```
git tags

todo: keep this section up to date

11. b1ffdcd5dc14527dbee3f6e16a98344f93f03ce1 3fb3c3af96bc015ae2ef3e277b5a75f410e5cc49 2023-08-28
```

problem:
the full tree hash `3fb3c3af96bc015ae2ef3e277b5a75f410e5cc49` is too long for most search engines

google finds only the main repo

https://www.google.com/search?q=%223fb3c3af96bc015ae2ef3e277b5a75f410e5cc49%22

ddg finds nothing

https://duckduckgo.com/?q=%223fb3c3af96bc015ae2ef3e277b5a75f410e5cc49%22&ia=web

bing finds nothing

https://www.bing.com/search?q=%223fb3c3af96bc015ae2ef3e277b5a75f410e5cc49%22

yandex ignores the doublequotes
and returns lots of garbage

https://yandex.com/search/touch/?text=%223fb3c3af96bc015ae2ef3e277b5a75f410e5cc49%22

### search by readme text

try to find this

<blockquote>

alchi

humans and their relations
are the last secret of this world ...

lets decode this last secret!

in our view,
psychology and sociology
must be seen as one science.
both psychology and sociology
are only two sides of one coin.
this one science is
the science of mental chemistry,
in short: alchemy

</blockquote>

ddg finds only the main repo on github and codeberg

https://duckduckgo.com/?q=milahu*+alchi+%22humans+and+their+relations+are+the+last+secret+of+this+world%22+%22mental+chemistry%2C+in+short%3A+alchemy%22&ia=web

### search on forges

github requires login to search

TODO run a scraper github action every week to find forks on github

#### codeberg.org

- https://codeberg.org/milahu/alchi/forks
- https://codeberg.org/explore/repos?q=alchi

#### darktea.onion

- http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/
  - http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/milahu/alchi/forks
  - http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion/explore/repos?q=alchi
- http://it7otdanqu7ktntxzm427cba6i53w6wlanlh23v5i3siqmos47pzhvyd.onion.ly/
  - note: onion.ly is protected by captcha
  - note: darktea requires login to block ddos attacks
  - note: onion.ly breaks the darktea login form: the captcha image is not loaded

#### righttoprivacy.onion

- http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion/
- http://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion.ly/
  - note: onion.ly is protected by captcha
  - https://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion.ly/milahu/alchi
  - https://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion.ly/milahu/alchi/forks
  - https://gg6zxtreajiijztyy5g6bt5o6l3qu32nrg7eulyemlhxwwl6enk6ghad.onion.ly/explore/repos?q=alchi

## related

- https://github.com/milahu/alchi/forks
- https://github.com/techgaun/active-forks
  - https://techgaun.github.io/active-forks/index.html#https://github.com/milahu/alchi
  - limited to github
