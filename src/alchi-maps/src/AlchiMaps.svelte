<script preval="preval">

  // preval: see rollup.config.js

  /*

  TODO

  fix fast multi moves
    like right+right
    without waiting for the first move to finish
    allow to move fast
    better separation of state and animation = static + dynamic

  make compatible with firefox darkreader
    darkreader in dynamic mode preserves colors (not perfect)
    but drops background line color

  dont capture ctrl+wheel events = browser zoom

  move "control" divs to background
    allow click access to visible elements
    handle click and drag events on visible elements
    avoid transparent control divs in foreground

  complete "click not move" handling
    on click, pass click event down to background layers

  firefox is slow at counter-rotate.
    add option to "rotate faster"
    = counter-rotate without transition at the middle/end of rotation

  fix svg export
    include transforms, before export repaint svg with transformed matrix?

  done:
  generate standalone svg image from current map view
    = svg screenshot
    copy svg source to clipboard
    or provide download link? size limit?

  firefox. respect var(--fg) color for text

  rename or alias?
    from sympatonia/vagotonia [group, noun, integral]
    to sympatone/vagotone [property, factor, part]

  have a global state object like "map"
    to set map parameters with click handlers aka links
    <a href="javascript: map.format = 'mbti';">set format to mbti</a>

  make svg use the css variables --fg and --bg
    use css variables to colorize all svg images
    also those included/inlined from external svg files
    or inline these files manually? or with sveltePreval?
    use css variable for foreground + background color
    var(--fg) and var(--bg)

  moved to alchi-tables
  add "pallas sign" in all eight rotations
    each as separate svg file
    with square size = 1:1 aspect ratio
    or 16:10 ratio, like font glyph ratio of monospace char X

  add prefix "map_" to fragment ID before map parameters
    like "map_A1_e/bxinout_etc_etc"
    allow to use other fragment IDs to navigate in description text
    remember map parameters also without map_x fragment ID

  cosmetic: make fragment ID parameters optional
    and/or make parameters non-positional with key-value pairs
    like query string #map&k1=v1&k2=v2&....
    or single char prefixed values like #map_oA1_fe/b_a0
    for origin, format, angle
    or #map&o=A1&f=e/b&a=0
    escape special chars (# & = .... and unicode) with %xx hex codes

  also inline external svg image assets
    not done by "npm run inline" command

  moved to alchi-tables
  done: test-hands-long-or-broad.svg [and others] is NOT inlined
  verify inline of svg image + bitmap images (jpg png gif webp)
    via <img src="image.svg" /> tag
    inline = pack all content into on html file
    single file output

  change light/dark mode more slowly
    and on double press of "L",
      change back from "current state"
      and not from "final state"

  done: listen on <div id="transform-mask"
    use `tabindex="-1"` to allow keydown listener
    handle key events only when grid is visible
    allow to scroll page with arrow keys, without moving the grid
    = unbind arrow keys?
    = ignore arrow keys for (pageScroll > 0)?

  allow to disable all animations = show next state now

  done: not, use "change position" code
    cos rotate3d is not counter-rotatable, no real 3D transform
    do flipBodies() with translate-rotate layer and css: rotate3d(x,y,z,a)

  moved to alchi-tables
  "fill this with some helpful text"
  probably the hardest part of all ....
  cos human language is so imperfect and dirty

  flip: also flip background pattern

  cosmetic: make zooming smooth
    use css transition on "transform: scale(f)"
    and after transition, set svg viewport to render sharp

  add touch gestures
    two finger zoom
    double tap to zoom in

  allow to switch "line mode" between monlog and dialog
    also animate diagonal monologs
    show dialogs with double line? = double bond in chemistry

  done: change with zoom level, better: do not change, cos internal sizes dont change
    change moveStep with zoom level / "odd angle" view
  
  critical: fix "zoom center"
    always zoom relative to center of map
    define "center of map"? origin = (x = 1 && y = 1) ?
    before rotation!
    allow to "center-and-zoom map" with double click/tap?
    allow to "center map" only? center = origin from url parameter

  critical: fix "flip center"
    always flip relative to center of map

  allow to paint pathos-flows as arrows
    so the flow direction is visible in a static screenshot

  fit text to boxes? auto-scale font size

  add shortcuts to switch nameFormat
    avoid expanding the control menu

  make more narrow the collapsed menu button
    three dots, not three bars [hamburger icon]

  cosmetic: animate zoom with css `transform: scale(1.5)` = blurred view
    and set zoom-state with svg-viewbox = re-render to sharp view

  zoom relative to visible center,
    and/or relative to mouse position?

  in rare cases, mousemove handler
    is not activated after mousedown
    only after mouseup

  done: handle mouseleave only on document
  keep moving after mouseleave

  in progress:
  add zoomBodies function

  move control boxes to background
    make foreground layers transparent for events
    css: pointer-events: none;

  critical: allow fast move
    moves always must recover
    cancel last animation?
    better handle state diffs

  code splitting? outsource components:
    * render asmg-body by nameFormat + number
    * transform logic: pan zoom rotate flip snap
    * mouse event handlers
    * control menu
    * svg symbols
    * translations = i18n

  critical:
  add mousemove listeners for rotate + zoom + flip

  done:
  critical: fix distant moves
    like moveBodies(+2, +2); moveBodies(+2, +2)
    or   moveBodies(+2, -2); moveBodies(+2, -2)
    or   moveBodies(+2,  0); moveBodies(+2,  0)

  cosmetic: animate snapping, avoid flicker

  done: just remove "promiseTimeout(1).then({ .... })"
  cosmetic: avoid flicker on back/forth transforms
    use requestAnimationFrame ?
    to set transforms in one frame

  done?
  critical:
    really disable animation to reset translate [modulo]

  fixme: in rare cases, mouseup is not handled
    and mousemove gets a strange offset

  handle mouseup on document

  allow to set frame rate for mousemove throttling
    advanced: do animations in javascript and throttle FPS

  inject source.zip into inlined.html
    total around 500 KByte
    200 build + 300 source
    bundle everything into html

  use matrix3d transforms to solve the "transformOrigin problem"?
    library candidates
      rematrix - 4 KByte - 300 stars
      snabbt.js - 16 KByte - 5k stars
      svg-pan-zoom-rotate - 32 KByte - 1k stars for svg-pan-zoom
    or use multiple transform layers?

  add tour / intro / splash / welcome / first use tips / quickstart guide

  done: use a separate layer for rotate transforms
  fix rotate origin

  fix "click to move"

  done:
  fix init angle / angle_id
    read from URL fragment

  svelte bug?
    ignores whitespace between two template variables
    workaround with <span style="margin-left: 0.33em">
    or {' '} {@html '&#x20;'}

  fix rotate + move back

  fix rotation center = transform-origin, set in moveBodies

  fix "move to rotate"

  done: calculate scale factors in setSize
  "remove this scale factor" 2.666666 and 0.375
    = 800/300 and 300/800
    = width_in/width
    performance should benefit from a 1:1 ratio
    but then we want to zoom in/out
    = recalculate all the sizes? naah, only few sizes
    scale_in  = width_in / width    // = 800/300 = 2.66666
    scale_out = width    / width_in // = 300/800 = 0.375

  done:
  put pattern + bodies in one <div> or <svg>
    inside only one viewport
    so we only must transform once
    use "real" rotate3d transforms?
    instead of manual flipBodies
    bad idea cos:
      flipping bodies is a different transform
      and a simple rotate3d transform
        would look less pretty
        fix: counter-rotate bodies
    good idea cos:
      better performance??

  refactor event listeners around mousemove + touchmove
    use hammer.js?

  use hammer.js for touch gestures?
    or avoid dependency? bundle size vs tree shaking

  add touchend, etc. event --> event.touches[0]

  done:
  allow to set "flow direction" = one of
    N > P = from neuro to psycho
    E > I = from extra to intro

    // back flow
    P > N
    I > E

  throttle mousemove events. compare performance:
    1. remove + sleep + restore move listener
    2. keep move listener, test boolean flag in every call
         set boolean flag in timeout function
    3. keep move listener, test deltaT in every call

  done: zero cpu solution: one tic per second
  flow animation with best performance
    use webGL? gsap @ 25 fps still needs 20% cpu
    which is better than 70% for svg+css
    but still not optimal

  done: removed from control menu
  remove groupFormat
    normally, we want to sync names+colors anyway
    so we have no need for a separate "color format"
    also, now we can show components direct/explicit

  done:
  propagate click event to lower layers

  show "same component" lines
    stripes for age + gender
    hexagon-grid for sense + move

  done:
  also use touchstart, touchmove, touchend, touchleave, touchcancel

  in progress:
  make interface more map-like
    like openstreetmap, openlayers, etc.
    doubletap to zoom in
    (+) and (-) buttons to zoom in/out
    [|||] hamburger menu in other corner
    zoom in to show more detail
      = expand short-names
    drag to pan = move, translate map
    internal zoom control

  fixme. control menu: scroll is broken after expand

  done: fixed "wrong direction", but still not smooth
  rotation repeated is not smooth
    sometimes rotates back = wrong direction
      --> bad modulo calculation

  scroll/expand of "select input"s is broken in some cases

  proper expand/collapse for navigation buttons

  handle mouseScroll on "select input"s
    to scroll/loop/rotate values

  done:
  critical:
  animation of same-class-circle flows
    needs too much CPU power [+30% cpu], optimize?
    GPU accelerated variant?
    off by default?

  done:
  exact box sizes for nameParts == 2
    exact positions for color + text

  generalize "flex" layout generation
    for nameFormat values like

      long format:                        short:
      e|b   e/b   s/m|a/g   s/e/m|a/b/g   123/456   asmg

      short form + minus as split sign:
      e-b    eb    sm-ag      sem-abg     123-456   asmg

      result layout:
      e b    e      s a         s a         1 4     a
             b      m g         e b         2 5     s
                                m g         3 6     m
                                                    g

      here:
      left: element, sense, move, emotion, left hand path
      right: body, gender, age, reason, right hand path

      auto-detect splitting?
      so we can write sem|abg or sa/eb/mg
      instead of s/e/m|a/b/g
      in doubt, use vertical split
      asmg = a/s/m/g = asmg/ [implicit slash suffix]
      use "pipe suffix" to default to horizontal split
      so asmg| = a|s|m|g

      use "minus sign" as split sign?

      use splitting by default [implicit splitting]
      allow to "merge" components like
      s+m/a+g = "extravert psychotic / young male"
      with s+m in one color, and a+g in other color
      but "merged" components (s+m) have same color

  remove sveltePreval?
    is `npm run build` already doing a "preval" optimization?

  done:
  detect locale from browser

  read/write flip state from/to querystring
    relative to angle_id == 0

  hide animation on initial rotate + flip

  toggle padding, default off --> save space
    or auto-detect padding from angle?
    slowly increase padding for odd angles
    slowly = only when odd angle is wanted / stable / kept

  done:
  read paramaters from changed URL fragment
    allow to navigate back/forth in web browser
    --> solve the problem of "cyclic dependency"
    maybe use .... ?
    https://github.com/ItalyPaleAle/svelte-spa-router#querystring-parameters

  done:
  allow to collapse/expand the navigation buttons
    to get more space for other menu items

  in progress:
  i18n = add translations. use `svelte-i18n` = readable store

  done:
  squares not circles = more space for text
    show two halfs: body + mind = son/mother/daughter/father + fire/earth/air/water

  problem with double click: text focus
    use "double click to move" only on touchscreens?
      = "double tap"
    --> no, keep interface consistent across devices
      use double tap/click to zoom in

  in progress:
  add "drag to move bodies"
    on touchscreens, this is more intuitive than "click to move"
    maybe add gestures to rotate + mirror?

  fixme: pattern moves wrong in some rare cases
    probably when moving too fast

  cosmetic: android chrome: "selected" body has no stroke

  scrollbars, horizontal scrollbar almost invisible
    vertical scrollbar too large

  done:
  android bug: zodiac signs are orange
    and do not use color from style
    --> use custom svg symbols, with custom stroke color

  cosmetic: provide a horizontal menu
    for "portrait orientation" screens

  move grid to the side
    opposite of the menu
    to better use "landscape orientation" screens

  allow to set nameFormat / groupFormat
    when menu is hidden?
    via hotkeys shift+N and shift+G
    + enter to finish

  add buttons to zoom in/out
    keep menu size
    allow "click to pan" like a 2dim map?
    or use scrollbars
    always show zoom buttons?
      like in osmAnd = openstreetmap for android app

  done:
  cosmetic: show "background circle" only on rotation

  cosmetic:
    use lowercase text for special nameFormat
    like cg-jung, shape, zodiac
    --> add boolean value "isSpecialFormat" to nameFormatPresets

  done: format character "b" for "body"
  add nameFormat "outside element"
    A = MS = son
    B = FL = mother
    C = FS = daughter
    D = ML = father
    other dims: A S M G E [C = Class]
    outside element = material = body = family role

  done:
  allow to disable "flow" animation
    for better perormance on old devices
    with play/stop button

  allow to make animations slower
    tweenDurShort = 500      // JS
    animation-duration: 0.5s // CSS
    --> set CSS with JS, use CSS variable for a-duration

  done:
  build "single file app". with sapper?
    no, sapper is overkill.
    use `inliner` from https://github.com/remy/inliner
    alternative: https://github.com/posthtml/posthtml
      https://github.com/jonathantneal/posthtml-inline-assets
    move <script defer> behind <body>
    on android, inlined.html must be stored on internal memory
      otherwise browser fails with "access denied"
    build inline html:
      npm run build && npm run start &
      sleep 10 && npm run inline
      # sleep to wait for build + start

  done:
  add flipD and flipA functions

  allow to set groupFormat for pathos
    sample = S+MPM = colorize body by element, pathos by move
    like for nameFormat

  critical:
  tooltips for tap devices
    add click-mode "info"
    https://stackoverflow.com/questions/37551869
    also "fancy tooltips" = better to read
    or: use zoom-in to show more detail

  done: set flow dir
  allow to configure the flow animation
    direction of flow? now: N >> P
    animate at all? or show solid lines

  FIXME when doing "click to move bodies"
    after some time, rotate silently stops working

  FIXME when i "save file" the app
    then moveBodies does not move the pattern
    should be fixed by "build + inline", todo verify

  add tooltips/titles to bodies
    to explain abbreviations like "F3L"
    and show "full names" for zodiac signs
    good for learning, to play "memory"
    add clickmode "title" for tap devices [touchscreen]

  FIXME groupFormat "+" dont set text color

  FIXME click-to-center does not always finish
    probable cause: FIXME k_angleFromPos[3][2] is undefined

  flipBodies. keep `patternTransform` short

  use less space [top margin/padding] at even angles
    add padding/margin only on odd angles
      slowly, with a timeout, after rotate is done

  add long name to every short name
    sample: names of zodiac signs, M = Male, S = Short, etc
    show single names on hover/click
    show all names via menu button, like a "map legend"
    --> zoom in to show more detail

  done:
  make menu smaller by about 30%

  done:
  flip the pathos circles, currently are wrong after flip

  done:
  pathos circles: make optional, also allow MBTI labels

  performance: use CSS transitions where possible
    todo: javascript with 30FPS should be faster
    problem with CSS: runs at much higher frame rates
    imitate gsap.js as ideal solution

  done:
  cosmetic: use sine-in-out for all transition + tweened
    $ease-in-out-sine:  cubic-bezier( 0.445,  0.050,  0.550,  0.950 );
    https://gist.github.com/terkel/4377409
    source: penner equations

  pattern: set clipPath concentric to center body
    add option to switch on/off the clipPath
    either show "key of seven" or whole pattern

  done:
  move pattern: compensate flip state

  in progress:
  manage "app state" more systematic --> refactor
    have global state for move + rotate + flip + ....
    keep "translate" functions
    to directly translate from "visible" to "internal" coordinates
    [ outward vs invert translations ]
    without middle steps like out --> unflip --> unrotate --> unmove

  done:
  flip pattern along diagonal for odd angles

  temporary deactivate CSS transition
    to set angle to angle.mod(360)

  done:
  add "mirror" operation aka flipX flipY
    not possible with rotate + translate
    --> need separate operation

  cosmetic: avoid transitions on zoom?
    in browser zoom, bodies "transit" to their new position
    which is not perfect
    --> enable transitions only when needed, default off

  cosmetic: in "move back clipped bodies"
    set z-index to topmost layer
    so the back-moved bodies are in front of the grid

  add debounce/throttle function
    to limit fire rate of move commands?
    or keep the fun of "lets move it fast!"

  combine bodyPath and text label?
    bodyPath instead of photo

  click modes: center, label, photo, hide?

  fit caption text in circle? = scale font-size
    https://stackoverflow.com/questions/15430189/

  allow to add captions to bodies --> custom names
    easier than photos

  auto mode: shuffle settings by random, "party mode", "demo mode"

  hover effect for bodies / groups-of-four

  even size view: center by group-of-four
    odd size view: center by single body

  done: blame "dark reader" addon in "static plus" mode
  fix colors in firefox

  done:
  switch body shape: circle vs bodyPath [body components]
    done via pseudo nameFormat "shape"

  do color transition (black/white)
    more with CSS
      div {
        transition: background-color 0.5s ease;
        background-color: red;
      }
      div:hover {
        background-color: green;
      }

  add option to "sync names and goups"

  add "print" button to
    hide menu, print page, restore menu

  allow custom body count?
    next to presets of 7, 11, 25, 16, 36, 64
    zoom-out to show more bodies

  done:
  fix the "move" operation
    fix move direction after rotate
      translate relative to gravity
      after rotate, change "move" handlers
    keep bodies on screen, dont clip
      add padding to SVG
      keep bodies visible in "move" operation

  scroll on input-list to change value

  done:
  more padding for buttons

  cosmetic:
  proper clipping for "same class lines"
    relative to view mode / body count: 7, 11, 16, 25, etc

  done:
  critical:
  read/write config from/to URL fragment
    = allow to bookmark the current state
    url format: app.html#of.ngea.gs+m.a0
    o = origin, n = nameFormat, g = groupFormat
    a = angle, h = h-flip, v = v-flip, l = light

  add solid color background to text labels
    to overlay a background photo

  done:
  move "same class lines" to be visible

  done:
  bundle to single file
    deploy to mobile - working :D
    --> use "build + inline"

  done: smaller menu, scale svg with width/width_in
  make everything smaller, by factor 2
    quickfixed by svg.width and div.scale
      con: main scrollbar too large
    make "body grid" zoomable?

  done:
  support "no groups" color mode, groupFormat = "+"

  mobile: allow to zoom out? can only zoom in
    --> use custom zoom logic, disable browser zoom

  mobile firefox: scrollbars are transparent, should be solid

  done: not
  button for fullscreen? why? on desktop, F11 key is nuff

  mobile chrome + firefox: lines color dont change in light mode
    --> change manually in javascript, like scrollbar color



  allow to add photos
    crop, resize
    convert to black/white
    apply custom clipPath to photo
    adjust brightness/contrast
    move text label
    label color, opposite of image colors?
      css background mix blend mode
      solid background for text label?

  persistence
    PWA = progressive web app?
    browser extension?
      browse all sites, add photos / screenshots
    save zip file
      https://davidwalsh.name/javascript-zip
    save state in browser aka localStorage
      https://higsch.me/2019/06/22/2019-06-21-svelte-local-storage/
      allow to download zip file
      not possible in browser? --> move to android app
    node.js progressive web app
      https://www.twilio.com/blog/2018/06/installable-web-apps-practical-introduction-progressive-web-apps.html
      install / native
      --> direct acces to filesystem
    svelte native?

  done: "control" menu - add expand/collapse
    expand/collapse the whole menu

  detect dark mode
    also from hour-of-day?
    in night time, always assume dark mode
    in day time, follow browser's "media" config

  set all colors with css variables?
    --fg21 = foreground x4=2 y4=1
    con: not working for same_class_lines pattern
      in mobile browsers = browser bug?

  done: avoid tween
  add option "fast rotate or sync rotate"
    to only tween the large rotation
    and the small rotates without tween
    done by not doing. dont use "svelte/tweened"
    instead use CSS transition with CSS transform rotate

  svelte bug? sveltePreval bug? [svelte preprocessor]
    when <script> is not in first line
    then line numbers are relative to script tag
    not relative to file start

  */



  import { tweened } from 'svelte/motion';
  import { sineInOut } from 'svelte/easing';
  
  // TODO FIXME CRITICAL
  import { readable, writable } from 'svelte/store';

  import * as alchi from './alchi.js';

  // body + element = asmg
  const C3 = 0b0000;
  const A3 = 0b0001;
  const C1 = 0b0010;
  const A1 = 0b0011;
  const C2 = 0b0100;
  const A2 = 0b0101;
  const C4 = 0b0110;
  const A4 = 0b0111;
  const B3 = 0b1000;
  const D3 = 0b1001;
  const B1 = 0b1010;
  const D1 = 0b1011;
  const B2 = 0b1100;
  const D2 = 0b1101;
  const B4 = 0b1110;
  const D4 = 0b1111;

  // TODO better. explicitly make svelte commit diffs
  //   wait for svelte to commit diffs
  const svelteCommitTime = 50; // milli seconds
  const svelteCommitTime2 = 1; // milli seconds

  // app state. default values
  let origin = 0b0011
  let nameFormat = 'e/bxinout'
  let groupFormat = 's+m'

  let isMenuHidden = true
  let isDark = true
  let doAnimateDash = true
  let showOddAngles = false

  let angle_id = 0 // range 0 to 7
  let angle_id_in = 0 // will exceed range [0 to 7] for short times

  const localeName = {
    en: 'English',
    de: 'Deutsch',
    ar: 'العربية',
    ar_r: 'Arabia',
    ru: 'Pусский',
    ru_r: 'Russkiy',
    cz: 'český',
    cn: '中国',
    cn_r: 'Zhōngguó',
    es: 'Español',
    it: 'Italiano',
    nl: 'Nederlands',
    el: 'ελληνικά',
    el_r: 'Elleniká',
    da: 'Dansk',
    tr: 'Türk',
    ar: 'հայերեն',
    ar_r: 'hayeren',
    hi: 'हिंदी',
    hi_r: 'Hindi',
    ayur: 'Ayurveda',
  }

  // TODO is the key order preserved or changed?
  //   preserved --> use Object.keys() directly
  //   changed --> store [key, val] in sorted array
  const localePresets = Object.keys(localeName)

  let locale = (
    navigator.language ||
    navigator.userLanguage ||
    'en-US'
  ).split('-')[0]
  console.log(`browser locale is ${locale}`)
  if (!(locale in localePresets)) {
    console.log(`FIXME locale ${locale} is not supported`)
    locale = 'en'
  }
  alchi.setLocale(locale)



  let nameFromN = [];
  let nameParts = 1;
  let nameFromSM = [];
  let nameFromAG = [];
  let pathosFromSM = [];
  let showPathos = true;



  // get url fragment ID and parse arguments
  const arg_sep = '_'

  // nameFormat in URL
  const nameFromN_url = alchi.tableNameFromN('(be)').map(
  //const nameFromN_url = alchi.tableNameFromN('(asmg)').map(
    (x) => x[0][0])

  const nameFromN_url_back = nameFromN_url.reduce(
    (acc, val, idx) => {
      acc[val] = idx
      return acc
    }, {})



  function parseHash(init=false) {

    const argv = window.location.hash.substr(1).split(arg_sep)

    if (!argv) { return }

    console.log('got args from url: '+argv)

    if (argv[0]) {
      const origin_new = nameFromN_url_back[argv[0]]
      if (origin_new !== origin) {

        console.log(`origin: ${origin} --> ${origin_new}`)

        origin = origin_new

        if (init === false) {
          // TODO verify
          const num = origin
          const idx = matrix.indexOf(origin)
          const x = idx % 4
          const y = (idx / 4)|0

          // move bodies
          handleClickBody (null, x, y, num, idx)
        }
      }
    }

    if (argv[1] && argv[1] !== nameFormat) {
      nameFormat = argv[1]
      if (init === false) {
        change_nameFormat() // TODO use store + subscribe
      }
    }

    if (argv[2] && argv[2] !== groupFormat) {
      groupFormat = argv[2]
      if (init === false) {
        change_groupFormat() // TODO use store + subscribe
      }
    }

    if (argv[3]) {
      [
        isMenuHidden,
        isDark,
        doAnimateDash,
        showOddAngles
      ] = argv[3].split('').map(s => s === '1')
      console.log('argv[3] = '+argv[3].split(''))
      console.log('isMenuHidden, isDark, doAnimateDash = '+[isMenuHidden, isDark, doAnimateDash])
    }

    if (argv[4]) {
      const angle_id_new = parseInt(argv[4])
      if (angle_id_new !== angle_id) {
        
        angle_id_in = angle_id_new
        angle_id = angle_id_in.mod(8)
      }
    }

    // TODO parse flip state = flip- x y d a

    if (argv[5] && argv[5] !== locale) {
      locale = argv[5];
      alchi.setLocale(locale);
      if (init === false) {
        change_nameFormat(); // TODO use store + subscribe
      }
    }
  }

  parseHash(true); // init






  let centerBody = [-1, -1]; // TODO derive from origin

  let width, height, gridPadding;
  width = height = 300;

  //width = height = '80%'

  //let gridPadding = 200 // show clipped bodies for even angles
  //let gridPadding = 110
  //$: gridPadding = showOddAngles ? 168 : 80
  //$: gridPadding = showOddAngles ? 168 : 0
  $: gridPadding = showOddAngles ? 400 : 0;

  const tweenFunc = sineInOut;
  //const tweenFunc = quadInOut
  //const tweenFunc = cubicInOut

  const tweenDurShort = 500;
  const tweenDurLong = 2000;


  const rotateStep = 45;
  let rotate = [0, 0]; // positive, negative // TODO remove?
  //let angle = [0, 0] // positive, negative

  // reactive declare
  //$: angle = [angle_id * rotateStep, angle_id * rotateStep * -1]
  $: angle = [
    angle_id_in * rotateStep,
    angle_id_in * rotateStep * -1,
  ];

  // flip state
  // chenged in flipBodies
  let flipOut = [1, 1];

  // state of rotate vectors
  // chenged in flipBodies
  let rotVecFromAngle = ['0,1', '1,1', '1,0', '1,-1']

  let doingRotate = false
  let rotateEndTimer = null

  function rotateLeft() { rotateBodies(+1) }
  function rotateRight(){ rotateBodies(-1) }

  function rotateBodies(k) {
    // positive k = rotate left = counter clockwise
    // negative k = rotate right = clockwise
    
    doAnimateMoves = true

    if (k === 0 || k === -8 || k === 8) {
      return
    }


    const k2 = k
    const k3 = angle_id - k2
    console.log(`rotateBodies from ${angle_id} to ${k3} via ${k} = ${k2}`)
    angle = [angle[0] - k2*rotateStep, angle[1] + k2*rotateStep]
    angle_id_in = ((angle[0]/rotateStep)|0)
    angle_id = angle_id_in.mod(8)



    if (0) {
      const scale_odd = (angle_id % 2 == 1) ? Math.sqrt(2) : 1

      // compute new matrix
      transform_matrix = [
        transform_matrix,
        Rematrix.rotateZ(
          -1*k*rotateStep,
        )
      ].reduce(
        Rematrix.multiply
      );

      // apply new matrix
      move_container.style.transform = Rematrix.toString(transform_matrix);
    }

    if (0) {
      doAnimateMoves = false
      gsap.to(move_container, {
        // TODO use absolute values
        rotation: '+='+(-1*k*rotateStep),
        //rotation: angle,
        //transformOrigin: transformOriginStr,
        duration: tweenDurShort/1000,
        ease: 'none',
      })
    }


    return

    /*

    console.log(`rotateBodies(${k})`)

    if (rotateEndTimer) {
      clearTimeout(rotateEndTimer)
    }

    doingRotate = true

    rotateEndTimer = setTimeout(
      function(){
        doingRotate = false
      },
      tweenDurShort
    )

    //const k2 = (k+4).mod(8)-4 // TODO?
    const k2 = k
    const k3 = angle_id - k2
    console.log(`rotateBodies from ${angle_id} to ${k3} via ${k} = ${k2}`)
    angle = [angle[0] - k2*rotateStep, angle[1] + k2*rotateStep]
    angle_id_in = ((angle[0]/rotateStep)|0)
    angle_id = angle_id_in.mod(8)
    //.mod(8) // TODO?
    //console.log('angle = '+angle)
  
    // wait for animation, disable CSS transition
    promiseTimeout(tweenDurShort)
    .then(() => {
      doAnimateMoves = false
      angle_id_in = angle_id_in.mod(8)
    })

  */

  }



  /* TODO remove
    function focusName(){
      promiseTimeout(100).then(()=>(
        document.getElementById('inf').focus()))
    }

    function focusGroup(){
      document.getElementById('igf').focus()
    }
  */



  // FIXME when moving too fast
  //   `posInFromOut[xOut]` is undefined
  //   set earlier? use `try{} catch{}`?
  //   this is NOT critical, movement does recover + continue
  //   also `posInFromOut[xOut][yOut]` can be undefined

  // TODO improve?
  function isCenter(xOut, yOut) {

    console.log(`isCenter: xOut = ${xOut}   yOut = ${yOut}`)
    
    try {
      return posInFromOut[xOut][yOut].equals([2, 2])
    }
    catch (e) {
      console.error(`FIXME posInFromOut[${xOut}][${yOut}] is undefined`)
      throw (e)
      return false
    }

    const [x, y] = posInFromOut[xOut][yOut]


    //const [x, y] = [xOut, yOut]
    // note: xMin == 0, xMax == xSize-1
    for (let [a, aSize] of [[x, xSize], [y, ySize]]) {
      if (aSize%2===1) {
        // odd size
        if (2*a+1 !== aSize) {
          return false
        }
      } else {
        // even size
        if (2*a !== aSize && 2*(a+1) !== aSize) {
          return false
        }      
      }
    }
    return true
  }



  // grid size
  // TODO rename vars
  // TODO dynamic size - infinite scroll ?
  let ySize = 0;
  let xSize = 0; // init later



  // bodies mask
  // TODO re-implement
  const bodiesMaskPresetsKeys = [7, 11, 25, 16, 18]
  const bodiesMaskPresets = {
    7: [ // origin is (2, 2)
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 1, 0],
      [0, 0, 0, 0, 0],
    ],
    11: [ // origin is (2, 2)
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 1, 1, 1, 1],
      [0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    25: 1, // show all bodies

    // even numbers = center is group-of-four
    16: 1, // show all bodies
    18: 1, // show all bodies
  }

  let bodiesMask = bodiesMaskPresets[11]
  
  function setBodiesMask(n){
    //console.log(btn.innerHTML)
    //const n = parseInt(btn.innerHTML)
    if (n in bodiesMaskPresets) {
      bodiesMask = bodiesMaskPresets[n]
    }
  }



  let xRange, yRange, bodyPosStatic
  let width_in, height_in
  let scale_in, scale_out

  // 200 = internal grid step

  $: scale_in  = (width_in + 2*gridPadding) / width
  $: scale_out = 1/scale_in

  function setSize(xSizeNew, ySizeNew) {

    if (xSizeNew !== xSize) { // new xSize
      width_in = 200 * xSizeNew
      xRange = Array.from(Array(xSizeNew).keys())
    }

    if (ySizeNew !== ySize) { // new ySize
      height_in = 200 * ySizeNew
      yRange = Array.from(Array(ySizeNew).keys())
    }

    // set scale factor
    scale_in  = width_in / width    // = 800/300
    scale_out = width    / width_in // = 300/800

    // 200 = grid step
    console.log('bodyPosStatic 1067:')
    bodyPosStatic = Array.from(Array(xSizeNew).keys())
      .map((x) => Array.from(Array(ySizeNew).keys())
      .map((y) => [x*200, y*200]))
    console.dir(bodyPosStatic)

    if (xSizeNew === 5 && ySizeNew === 5) {
      bodiesMask = bodiesMaskPresets[11]
    } else {
      bodiesMask = 1
    }

    xSize = xSizeNew
    ySize = ySizeNew
  }

  // init
  setSize(4, 4)



  // animate translate, rotate, zoom
  // only activated on demand
  // to avoid animation on browser zoom
  let doAnimateMoves = false

  function handleDoubleClickBody (event, x, y, num, idx) {
    // TODO show tooltips for body + pathos
    //   or use double-click to zoom-in

    console.dir(event);
  }

  

  // TODO split this function
  //   extract a "focusBody(num)" function
  function handleClickBody (event, x, y, num, idx) {

    // event.target is ambiguous

    origin = num

    centerBody = centerBody.equals([x, y]) ? (
      [-1, -1] // unselect
    ) : (
      [x, y]
    )

    const n = nameFromN[num][0]
    const isc = isCenter(x, y)
    const [xPos, yPos] = bodyPosStatic[x][y]
    const [xOut, yOut] = [(xPos/200)|0, (yPos/200)|0]

    // find same-element body in same-class four
    // one of the four diagonal next-ones

    const _element = num & 0b0110
    const element = _element >> 1 // 0 1 2 3 = 3 1 2 4

    let d_diag = [0, 0] // invalid
    let [dx_diag, dy_diag] = [0, 0] // invalid

    for ([dx_diag, dy_diag] of [
      [+1, +1], [+1, -1], [-1, -1], [-1, +1]
    ]) {

      const num_diag = matrix[idxFromPos(x+dx_diag, y+dy_diag)]
      const _element_diag = num_diag & 0b0110

      if (_element == _element_diag) {
        d_diag = [dx_diag, dy_diag]
        break
      }
    }

    console.log({ ddg0: d_diag[0], ddg1: d_diag[1],
      dx_diag, dy_diag })

    // compensate flip
    const d_out = bodyPosStatic[(x+dx_diag).mod(4)][(y+dy_diag).mod(4)].map(
      a => (a/200)|0 )
    d_diag = [d_out[0]-xOut, d_out[1]-yOut]

    console.log({ ddg0f: d_diag[0], ddg1f: d_diag[1] })

    // first move step
    const x_new = (1.5 + 0.5*d_diag[0])|0
    const y_new = (1.5 + 0.5*d_diag[1])|0

    const x_move = x_new-xOut
    const y_move = y_new-yOut

    //console.log({ dgx: d_diag[0], dgy: d_diag[1], x_move, y_move })
    console.log({ x_move, y_move, x_new, y_new,
      x_dd: d_diag[0], y_dd: d_diag[1] })

    moveBodies(x_move, y_move, false) // false = dont rotate (x, y)

    const sleep1 = (x_move == 0 && y_move == 0) ? (
      0) : (2*tweenDurShort)

    // wait for move end
    promiseTimeout(sleep1).then(() => {

      const k_angleFromElement = [1, 3, 7, 5] // 3 1 2 4

      const k_angleFromPos = [ 0,
        [0, 2, 0],
        [0, 4, 6],
      ]

      const k_angleOld = (angle[0]/45)|0

      let k_new = k_angleOld
      try {
        k_new = (
          - k_angleFromElement[element]
          + k_angleFromPos[x_new][y_new]
          // FIXME when moving fast
          //   `k_angleFromPos[x_new]` is undefined
          //   this is NOT critical, movement does recover + continue
          //   also `k_angleFromPos[x_new][y_new]` can be undefined
          + k_angleOld

          + 1 // TODO make this toggle-able
          // +1 = even angle, fire=topleft, water=topright, etc.
          // +0 = odd angle, fire=top, water=right, etc.

        )
      }
      catch (e) {
        console.error(`FIXME k_angleFromPos[${x_new}][${y_new}] is undefined`)
        throw (e)
      }

      rotateBodies(k_new)

      const sleep2 = (k_new == 0) ? (0) : (tweenDurShort)



      // TODO move to function
      // invert array to object = swap keys / values

      posInFromOut = bodyPosStatic.reduce(
      (acc, col, x) => (
        //col.forEach( ([xp, yp], y, arr) => {
        col.reduce(
        (acc, [xp, yp], y) => {

          // TODO generalize "200"
          // or use "raw" index 0,1,2,3 as SVG coordinate
          const [xi, yi] = [xp/200, yp/200]

          if (!(xi in acc)) { acc[xi] = {} }
          acc[xi][yi] = [x, y]
          return acc
        }, acc) // pass first acc to second reduce
      ), {})



      const k_angle = angle_id // TODO rename k_angle to angle_id

      // wait for rotate end
      promiseTimeout(sleep2).then(() => {

        // flip

        // TODO rename "element" to sm or sense_move
        // element: 1 fire, 2 earth, 3 air, 4 water
        // sense_move: 0 air, 1 fire, 2 earth, 3 water

        if (element === 0 || element === 3) {
          // center is water or air

          // TODO make this shorter
          // use lookup table
          // from k_angle to (x, y) position

          // 00 01 10 11 = 3 1 2 4
          // 0b0010 == fire
          try {
            
            if (k_angle == 0 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[3][3])])) {
                flipA()
            }
            else if (k_angle == 1 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[3][3])])) {
                flipY()
            }

            //

            else if (k_angle == 2 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[3][0])])) {
                flipA()
            }
            else if (k_angle == 3 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[3][0])])) {
                flipY()
            }

            //

            else if (k_angle == 4 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[0][0])])) {
                flipA()
            }
            else if (k_angle == 5 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[0][0])])) {
                flipY()
            }

            //

            else if (k_angle == 6 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[0][3])])) {
                flipA()
            }
            else if (k_angle == 7 && 0b0010 == (
              0b0110 & matrix[idxFromPos(posInFromOut[0][3])])) {
                flipY()
            }

          }
          catch (e) {
            // FIXME when moving too fast
            //   posInFromOut[3][3] is undefined
            console.error(`FIXME posInFromOut is undefined`)
            throw (e)
          }

        }

        else {
          // center is fire or earth

          // TODO
          // 00 01 10 11 = 3 1 2 4
          // 0b0000 == air

          // TODO make this shorter
          // save "reference positions" in array
          // here, the reference element is air --> se == 00


          switch (k_angle) {

            case 0:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[3][0])])
              ) { flipD() }
              break

            case 1:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[3][0])])
              ) { flipX() }
              break

            //

            case 2:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[0][0])])
              ) { flipD() }
              break

            case 3:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[0][0])])
              ) { flipX() }
              break

            //

            case 4:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[0][3])])
              ) { flipD() }
              break

            case 5:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[0][3])])
              ) { flipX() }
              break

            //

            case 6:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[3][3])])
              ) { flipD() }
              break

            case 7:
              if (0b0000 == (0b0110 & matrix[
                idxFromPos(posInFromOut[3][3])])
              ) { flipX() }
              break

          }
  }})})}



  function idxFromPos(_x, _y) {

    const [x, y] = Array.isArray(_x) ? _x : [_x, _y]

    const yIdx = (y%4)*4
    const x4 = x%4
    const idx = yIdx+x4

    return idx
  }



  // map between "visible" and "internal" positions
  // opposite of bodyPosStatic array
  let posInFromOut = preval(() => Array.from(Array(4).keys())
    .map((x) => Array.from(Array(4).keys())
      .map((y) => [x, y])));



  let moveStep = 200 // = grid step, TODO rename

  // TODO remove this scale factor?
  //   synchronize all coordinate systems?
  //   should be good for performance
  let moveStep_pat = scale_out*moveStep

  /* javascript modulo function also for negative numbers */
  Number.prototype.mod = function(n) {
    return ((this%n)+n)%n
  }



  let scaleFactor = [1, 1]
  let gridRotate3D = [0, 0, 0, 0]
  let gridRotate3DBodies = [0, 0, 0, 0]



  const promiseTimeout = time => new Promise(resolve => setTimeout(resolve, time))



  let flipIn = [1, 0, 0, 1] // identic = no flip
  
  let anim_dash_offset = 0; // set in animateDashStep()

  let anim_dash_factor_key = 'np';

  const anim_dash_factor_presets = {
    // top-left, top-right, bottom-left, bottom-right
    np: [ -1, +1, -1, +1 ],
    pn: [ +1, -1, +1, -1 ],
    ei: [ -1, -1, +1, +1 ],
    ie: [ +1, +1, -1, -1 ],
  }

  $: anim_dash_factor = anim_dash_factor_presets[anim_dash_factor_key]

  let pathosPos = [
    [ 45, 100],
    [155, 100],
    [100,  45],
    [100, 155],
  ]

  function productMatrixVector(m, v){
    // assert dimensions: dim(m) = 2x2, dim(v) = 2
    return [
      v[0] * m[0] + v[1] * m[2],
      v[0] * m[1] + v[1] * m[3],
    ]
  }



  const moveMatrixFromAngle = [
  // dx  dx  dy  dy
    [ 1,  0,  0, +1], // identity matrix
    [ 1, -1, +1, +1],
    [ 0, -1, +1,  0],
    [-1, -1, +1, -1],
    [-1,  0,  0, -1],
    [-1, +1, -1, -1],
    [ 0, +1, -1,  0],
    [+1, +1, -1, +1],
  ]

  const rotate3DVectorFromAngle_flipX = moveMatrixFromAngle.map(
    ([a, b, c, d]) => [c, a])

  const rotate3DVectorFromAngle_flipY = moveMatrixFromAngle.map(
    ([a, b, c, d]) => [d, b])



  let move_container = null // init later

  let translate_x = 0
  let translate_y = 0

  let translate_origin_x = 0
  let translate_origin_y = 0

  let dxSum = 0
  let dySum = 0

  // move state of clipped bodies
  let idxClipped = Array.from(Array(4).keys()).map(
    (x) => Array.from(Array(4).keys()).map(
      (y) => ([x, y])
    )
  )

  let moveEndTimer = null

  // TODO init
  let transformOrigin = [1.5*width, 1.5*height]
  let transformOriginStr = `${transformOrigin[0]}px ${transformOrigin[1]}px`;

  /**/
  function moveLeft()  { moveBodies(-1,  0) }
  function moveRight() { moveBodies(+1,  0) }
  function moveUp()    { moveBodies( 0, -1) }
  function moveDown()  { moveBodies( 0, +1) }
  /**/

  /* DEBUG * /
    function moveLeft()  { moveBodies(-2,  0) }
    function moveRight() { moveBodies(+2,  0) }
    function moveUp()    { moveBodies( 0, -2) }
    function moveDown()  { moveBodies( 0, +2) }
  /**/

  /* DEBUG * /
    function moveLeft()  { moveBodies(-3,  0) }
    function moveRight() { moveBodies(+3,  0) }
    function moveUp()    { moveBodies( 0, -3) }
    function moveDown()  { moveBodies( 0, +3) }
  /**/


  const moveStepByZoom = {
    "-4": 200 - 100,
    "-3": 200 - 85,
    "-2": 200 - 66.6666666,
    "-1": 200 - 40,
    0: 200,
    1: 200 + 66.666666,
    2: 200 + 200,
    3: 200 + 200 + 400,
  };


  // change moveStep with zoomLevel
  //$: moveStep = 200 + zoomLevel*(zoomLevel % 2 === 0 ? 100 : 66.6666666);
  let moveStepIntern = 200;

  $: {
    moveStep = (zoomLevel in moveStepByZoom) ? (moveStepByZoom[zoomLevel]) : 200;
    //moveStepIntern = 400 - moveStep;
  }

  // zoom state
  let zoomLevel = 0;
  let svg_viewbox = [0, 0, 0, 0];
  let move_odd = 0;
  $: {

    /*
    // force center for every zoom step
    move_odd = (zoomLevel % 2 === 0) ? 0 : (
      100
    );
    */

    /*
    move_odd = 0; // disable "force center"

    svg_viewbox = [
      -gridPadding + zoomLevel*300 + move_odd,
      -gridPadding + zoomLevel*300 + move_odd,
      3*width_in +2*gridPadding - 2*zoomLevel*300,
      3*height_in+2*gridPadding - 2*zoomLevel*300,
    ];
    */

    /*
    svg_viewbox = [
      -gridPadding + zoomLevel*300, // TODO use zoomEvent?
      -gridPadding + zoomLevel*300,
      3*width_in +2*gridPadding - 2*zoomLevel*300,
      3*height_in+2*gridPadding - 2*zoomLevel*300,
    ];
    */

    svg_viewbox = [
      -gridPadding + zoomLevel*300, // TODO use zoomEvent?
      -gridPadding + zoomLevel*300,
      3*width_in +2*gridPadding - 2*zoomLevel*300,
      3*height_in+2*gridPadding - 2*zoomLevel*300,
    ];

    console.log(`svg_viewbox = ${svg_viewbox.join(' ')}`);
  }

  //dxSum, dySum

  const max_zoomLevel = 3;

  // TODO
  function zoomBodies(zoomStep=+1) {
    // TODO use <svg viewBox="a b c d"> to zoom
    //   viewBox or viewPort ?
    if (zoomStep < 0 || zoomLevel < max_zoomLevel ) {
      zoomLevel += zoomStep;
    }
    console.log(`zoomLevel = ${zoomLevel}`)
  }
  window.zoomBodies = zoomBodies; // make global



  // rename: "skipMove" to "animateMove" [positive name]
  // remove hideMove ?
  function moveBodies(dxOut=0, dyOut=0, rotate=true, skipMove=false, hideMove=false) {

    if (dxOut == 0 && dyOut == 0) {
      // no change
      return;
    }

    //angle_id = ((angle[0]/rotateStep)|0).mod(8)

    let [dx, dy] = rotate ? (
      productMatrixVector(
        moveMatrixFromAngle[angle_id],
        [dxOut, dyOut]
      )
    ) : (
      [dxOut, dyOut]
    );

    if (0) {
      if (angle_id % 2 == 1) {
        // odd angle
        dx *= Math.sqrt(2);
        dy *= Math.sqrt(2);
      }
    }

    dxSum += dx;
    dySum += dy;

    //dxSum += dxOut;
    //dySum += dyOut;

    //const scale_odd = (angle_id % 2 == 1) ? Math.sqrt(2) : 1;
    const scale_odd = (angle_id % 2 == 1) ? 1 : 1;
    let waitForModulo = false;

    if (1) {
      // modulo = reset to center
      
      doAnimateMoves = false;
      //doAnimateDash = false;
      // TODO really disable animation
      //   wait for svelte to commit diffs?

      const moveModX = (Math.abs(dxSum) < 4) ? 0 : (
        Math.sign(dxSum) * +4
      );

      const moveModY = (Math.abs(dySum) < 4) ? 0 : (
        Math.sign(dySum) * +4
      );

      // TODO
      //if (moveModX) { dxSum = dxSum.mod(4) }
      //if (moveModY) { dySum = dySum.mod(4) }
      //if (moveModX) { dxSum = (dxSum+2).mod(4)-2; }
      //if (moveModY) { dySum = (dySum+2).mod(4)-2; }

      /**/
      if (moveModX !== 0) { dxSum -= moveModX }
      if (moveModY !== 0) { dySum -= moveModY }
      /**/

      console.log(`moveMod ${moveModX} ${moveModY}`);
      console.log(`d_Sum ${dxSum} ${dySum}`);

      if (1) {
        if (moveModX !== 0 || moveModY !== 0) {

          // wait for svelte to commit diffs
          waitForModulo = true;
          //promiseTimeout(svelteCommitTime2).then(() => {

          if (1) {
            bodyPosStatic = bodyPosStatic.map(
              (col, x) => col.map(
                ([xPos, yPos], y) => {
                  console.log(`bps ${x} ${y} = ${xPos} ${yPos} --> ${xPos + moveModX*moveStep} ${yPos + moveModY*moveStep} . ${moveModX} * ${moveStep} = ${moveModX * moveStep}`)
                  return [
                    //0, 0, // DEBUG
                    (xPos + moveModX*moveStep),
                    (yPos + moveModY*moveStep),
                  ]
                }
              )
            );
          }

          if (1) {
            //transform_translate.style.transform += `translate(${moveX*75}px,${moveY*75}px) `;
            //transform_translate.style.transform += `translate(${-1*moveModX}px,${-1*moveModY}px) `;
            //transform_translate.style.transform += `translate(${moveModX}px,${moveModY}px) `;
            //transform_translate.style.transform += `translate(${-1*dx*scale_out*moveStep*scale_odd}px,${-1*dy*scale_out*moveStep*scale_odd}px) `;
            //console.log('modulo:')
            //console.dir({scale_odd,tlx: (-4*dx*scale_out*moveStep*scale_odd), tly: (-4*dy*scale_out*moveStep*scale_odd), dx, dy, scale_out, moveStep})
            //transform_translate.style.transform += `translate(${-1*dx*scale_out*moveStep*scale_odd}px,${-1*dy*scale_out*moveStep*scale_odd}px) `;
            //transform_translate.style.transform += `translate(${-4*dx*scale_out*moveStep*scale_odd}px,${-4*dy*scale_out*moveStep*scale_odd}px) `;
            /*
              ${-1*moveModX*scale_out*moveStepIntern*scale_odd}px,
              ${-1*moveModY*scale_out*moveStepIntern*scale_odd}px
            */
            transform_translate.style.transform += `translate(
              ${-1*moveModX*scale_out*moveStep*scale_odd}px,
              ${-1*moveModY*scale_out*moveStep*scale_odd}px
            ) `;

            /*
            moveModX;
            translate_y = translate_y - moveModY*/
          }
          //})
        }
      }


      //translate_x = translate_x.mod(4*moveStep_pat)
      //translate_y = translate_y.mod(4*moveStep_pat)


      // TODO FIXME



      if (0) {
        
        const scale_odd = (angle_id % 2 == 1) ? Math.sqrt(2) : 1;

        // compute new matrix
        transform_matrix = [
          transform_matrix,
          Rematrix.translate(
            -1*moveModX*scale_out*moveStep,
            -1*moveModY*scale_out*moveStep,
          )
        ].reduce(
          Rematrix.multiply
        );

        // apply new matrix
        move_container.style.transform = Rematrix.toString(transform_matrix);

      }

      if (0) {
        translate_x = translate_x - moveModX;
        translate_y = translate_y - moveModY;
      }

      if (0) {
        doAnimateMoves = false;
        gsap.set(move_container, {
          //x: dx * moveStep,
          //y: dy * moveStep,
          // TODO use absolute values
          x: '+='+(-moveModX*scale_out*moveStep),
          y: '+='+(-moveModY*scale_out*moveStep),
          //duration: 0,
          //repeat: -1,
          //ease: 'none',
        });
        transformOrigin = [
          transformOrigin[0]-1*(-moveModX*scale_out*moveStep),
          transformOrigin[1]-1*(-moveModY*scale_out*moveStep),
        ];
      }

    }

    // wait for svelte to commit diffs
    // TODO move to svelte.afterUpdate function?
    //promiseTimeout(waitForModulo ? 2*svelteCommitTime2 : 0).then(() => {
    promiseTimeout(waitForModulo ? svelteCommitTime2 : 0).then(() => {

      console.log(`dx = ${dx}   dy = ${dy}`);

      //dx = (dx+2).mod(4)-2
      //dy = (dy+2).mod(4)-2

      if (skipMove === false) {
        doAnimateMoves = true;
      }

      // sleep
      // wait for svelte to set translate_x, translate_y
      // so later, we can set doAnimateMoves
      // TODO how to flush state in svelte? [force render, stop batching diffs]

      // TODO restore?
      //promiseTimeout(1).then(() => {

        /*
          if (skipMove === false) {
            doAnimateMoves = true;
          }
          else {
            doAnimateMoves = false;
          }
        */

        //const moveBackTimeout = skipMove ? 0 : tweenDurShort;
        // 1 ms pseudo timeout
        //const moveBackTimeout = skipMove ? 10 : tweenDurShort;

        // move bodies
        /* old stuff
        bodyPosStatic = bodyPosStatic.map(
          (row, x) => row.map(
          ([xPos, yPos], y) => {
            return [
              xPos + dx * moveStep,
              yPos + dy * moveStep,
            ]
        }))
        */



        // new stuff

        if (1) {
          //transform_translate.style.transform += `translate(${moveX*75}px,${moveY*75}px) `;
          //console.log(`translate(${dx*scale_out*moveStep*scale_odd}px,${dy*scale_out*moveStep*scale_odd}px) `)
          transform_translate.style.transform += `translate(${dx*scale_out*moveStep*scale_odd}px,${dy*scale_out*moveStep*scale_odd}px) `;

          // DEBUG
          //return

          //transform_translate.style.transform += `translate(${-1*moveModX}px,${-1*moveModY}px) `;

          //translate_x += dx * moveStep_pat
          //translate_y += dy * moveStep_pat

        }

        if (0) {

          const scale_odd = (angle_id % 2 == 1) ? Math.sqrt(2) : 1

          // compute new matrix
          transform_matrix = [
            transform_matrix,
            Rematrix.translate(
              dx*scale_out*moveStep*scale_odd,
              dy*scale_out*moveStep*scale_odd,
            )
          ].reduce(
            Rematrix.multiply
          );

          // apply new matrix
          move_container.style.transform = Rematrix.toString(transform_matrix);

        }



        // TODO FIXME rotate+move

        if (0) {
          //gsap.ticker.fps(30); // TODO move to global
          doAnimateMoves = false;
          const scale_odd = (angle_id % 2 == 1) ? Math.sqrt(2) : 1
          gsap.to(move_container, {
            //x: dx * moveStep,
            //y: dy * moveStep,
            //x: -300+dxSum*scale_out*moveStep,
            //y: -300+dySum*scale_out*moveStep,
            // TODO use absolute values
            //x: '+='+(dx*scale_out*moveStep),
            //y: '+='+(dy*scale_out*moveStep),
            x: '+='+(dxOut*scale_out*moveStep*scale_odd),
            y: '+='+(dyOut*scale_out*moveStep*scale_odd),
            duration: tweenDurShort/1000,
            //repeat: -1,
            ease: 'none',
          });
          transformOrigin = [
            transformOrigin[0]-1*(dxOut*scale_out*moveStep*scale_odd),
            transformOrigin[1]-1*(dyOut*scale_out*moveStep*scale_odd),
          ];
          transformOriginStr = `${transformOrigin[0]}px ${transformOrigin[1]}px`;
        }


        if (0) {
          //translate_x += dx * moveStep_pat
          //translate_y += dy * moveStep_pat
          
          translate_x -= dx * moveStep_pat
          translate_y -= dy * moveStep_pat
        }

        console.log(`d_Out = ${dxOut} ${dyOut}   d_ = ${dx} ${dy}   flip = ${flipIn[0]} ${flipIn[1]} ${flipIn[2]} ${flipIn[3]}`);

        if (1) {
          // move back clipped bodies
          // wait for svelte to commit diffs, delta T = 10 ms
          //promiseTimeout(moveBackTimeout)
          promiseTimeout(skipMove ? svelteCommitTime : tweenDurShort)
          .then(() => {

            if (doAnimateMoves == false) {
              doAnimateMoves = true
            }

            /* old stuff
            bodyPosStatic = bodyPosStatic.map(
              (row, x) => row.map(
              ([xPos, yPos], y) => {
                return [
                  xPos.mod(4*moveStep),
                  yPos.mod(4*moveStep),
                ]
            }))
            */



            // new stuff
            // find clipped bodies + move back

            // dx = -3 --> move lines 0,1,2 to 4,5,6
            // dx = -2 --> move lines 0,1 to 4,5
            // dx = -1 --> move line  0 to  4
            // dx = +1 --> move line  3 to -1
            // dx = +2 --> move lines 3,2 to -1,-2
            // dx = +3 --> move lines 3,2,1 to -1,-2,-3
            //
            // always add/sub 4


            /*
            idxClipped = idxClipped.map(
              (row, x) => row.map(
                ([xPos, yPos], y) => ([
                  (xPos + dx).mod(4),
                  (yPos + dy).mod(4),
                ])
            ))
            */


            console.log(`move back. moveStep = ${moveStep}`)

            // TODO use dx or dxOut ?

            if (dx !== 0) {
            //if (dxOut !== 0) {

              const sdx = Math.sign(dx)

              Array.from(Array(Math.abs(dx)).keys())
              .forEach((ix) => {

                const ix2 = (dx < 0)
                  ? ((3-ix)-dxSum).mod(4)
                  : (ix-dxSum).mod(4);

                bodyPosStatic[ix2] = bodyPosStatic[ix2].map(
                  ([xPos, yPos], y) => ([
                    xPos - sdx*4*moveStepIntern,
                    yPos,
                  ])
                );
              });

            }

            if (dy !== 0) {

              const sdy = Math.sign(dy)

              Array.from(Array(Math.abs(dy)).keys()).forEach(
                (iy) => {

                  const iy2 = (dy < 0)
                    ? ((3-iy)-dySum).mod(4)
                    : (iy-dySum).mod(4);

                  //const iy2 = (+1.5-1.5*sdy+iy-dySum).mod(4)
                  console.dir({iy,iy2,sdy,dySum,dy,dyOut})
                  //console.log(`iy = ${iy}   iy2 = ${iy2}`)
                  console.log('bodyPosStatic 2086:')
                  bodyPosStatic = bodyPosStatic.map(
                    (col, x) => col.map(
                      ([xPos, yPos], y) => ([
                        xPos,
                        //yPos - ((y === iy2) ? (sdy*4*moveStep) : (0)),
                        yPos - ((y === iy2) ? (sdy*4*moveStepIntern) : (0)),
                        //yPos,
                      ])
                  ))
                  console.dir(bodyPosStatic)
                })

            }

            // TODO add code for dy !== 0



            /*
              if (dy > 0) {
                Array.from(Array(Math.abs(dy)).keys()).forEach(
                  (iy) => {
                    //
                })
              }
            */

            /*
            bodyPosStatic = bodyPosStatic.map(
              (row, x) => row.map(
              ([xPos, yPos], y) => {
                return [
                  xPos.mod(4*moveStep),
                  yPos.mod(4*moveStep),
                ]
            }))
            */

          })
        }


        // wait for animation, disable CSS transition

        // TODO dynamic, wait only as short as needed
        //   also, cancel old timeout when moving fast
        
        if (moveEndTimer) {
          clearTimeout(moveEndTimer)
        }

        moveEndTimer = setTimeout(() => {
          doAnimateMoves = false

console.log(`doAnimateMoves is`, doAnimateMoves);

          // snap background pattern
          moveEndTimer = null
        }, 3*tweenDurShort)

        /*
        promiseTimeout(3*tweenDurShort)
        .then(() => {
          //
        })
        */

      //})
    })
  } // end function moveBodies





  function flipX() { flipBodies(1, 0); }

  function flipY() { flipBodies(0, 1); }

  function flipD() { flipBodies(1, 0, 1); }
  /* flip diagonal */
  // quickfix via (angle - 1) + flipX ?

  function flipA() { flipBodies(0, 1, 1); }
  /*TODO flip anti-diagonal */

  let transform_rotate = null; // set later in handleWindowLoad


  function flipBodies(dxOut, dyOut, angleBias=0) {

    doAnimateMoves = true;

console.log(`flipBodies: doAnimateMoves is`, doAnimateMoves);

    // set new flip state
    flipOut = [
      flipOut[0] * (dxOut ? -1 : 1),
      flipOut[1] * (dyOut ? -1 : 1),
    ];

    //console.log(`flipBodies(${dxOut}, ${dyOut})`)

    // compensate rotation
    //angle_id = ((angle[0]/rotateStep)|0).mod(8)

    const angle_id_b = angle_id + angleBias;

    const m = moveMatrixFromAngle[angle_id_b];
    const [dx, dy] = productMatrixVector(m, [dxOut, dyOut]);



    console.log(`flipBodies   d ${dx} ${dy}   dOut ${dxOut} ${dyOut}   angle ${angle_id_b}`);
    console.log(`flipBodies old flipIn ${flipIn[0]} ${flipIn[1]} ${flipIn[2]} ${flipIn[3]}`);



    if (1) {

      let get_xPos = null;
      let get_yPos = null;

      if (angle_id_b % 2 == 0) {
        // even angle
        // flip along row or column
        get_xPos = (dx !== 0) ? (

          // FIXME change 3 to dynamic value
          //(xPos, yPos) => 3*moveStep - xPos // flipX
          (xPos, yPos) => (3-2*dxSum)*moveStep - xPos // flipX
        
        ) : (
          (xPos, yPos) => xPos // no change
        );
        
        get_yPos = (dy !== 0) ? (

          // FIXME change 3 to dynamic value
          (xPos, yPos) => (3-2*dySum)*moveStep - yPos // flipY

        ) : (
          (xPos, yPos) => yPos // no change
        );



        // set flip state
        // to flip pattern [etc?]

        // TODO remove?

        flipIn = [
          flipIn[0] * (dx ? -1 : 1),
          flipIn[1] * (dx ? -1 : 1),
          flipIn[2] * (dy ? -1 : 1),
          flipIn[3] * (dy ? -1 : 1),
        ];
      }

      else {
        // odd angle
        // flip along diagonal

        // FIXME
        // wrong at angle == 1

        get_xPos = (dx === dy) ? (

          // FIXME change 3 to dynamic value
          (xPos, yPos) => (3-2*dxSum)*moveStep - yPos // anti diagonal

        ) : (
          (xPos, yPos) => yPos // diagonal
        );
        
        get_yPos = (dx === dy) ? (

          // FIXME change 3 to dynamic value
          (xPos, yPos) => (3-2*dySum)*moveStep - xPos // anti diagonal

        ) : (
          (xPos, yPos) => xPos // diagonal
        );

        /*
        if (angle_id_b == 1) {
          flipIn = [
            flipIn[0] * (dx ? -1 : 1),
            flipIn[1] * (dx ? -1 : 1),
            flipIn[2] * (dy ? -1 : 1),
            flipIn[3] * (dy ? -1 : 1),
          ]
        }
        else {
        */
        
        // FIXME?
        flipIn = [
          flipIn[1] * ((dx === dy) ? -1 : 1),
          flipIn[0] * ((dx === dy) ? -1 : 1),
          flipIn[3] * ((dx === dy) ? -1 : 1),
          flipIn[2] * ((dx === dy) ? -1 : 1),
        ];

        /*
        pathosPos = [
          pathosPos[2],
          pathosPos[3],
          pathosPos[0],
          pathosPos[1],
        ]
        */
        
        promiseTimeout(0.5*tweenDurShort).then(() => {
          pathosPos = pathosPos.reverse();
        });

      }

      // flip bodies .... finally

      // set all body positions. slow cos many small moves
      console.log('bodyPosStatic 2294:')
      bodyPosStatic = bodyPosStatic.map(
        (row, x) => row.map(
        ([xPos, yPos], y) => {
          return [
            get_xPos(xPos, yPos),
            get_yPos(xPos, yPos),
          ];
      }));
      console.dir(bodyPosStatic);

    } // end function flipBodies






    // FIXME wrong flip vector on the first flip, after other flip
    //   other flip = different flip direction
    //   sample: flip.... x x y x y x y
    //   sample: flip.... y y x y x y x
    //   problem is:
    //     patternRotate3D = 1,0,0,0
    //     patternRotate3D = 0,1,0,180
    //                       ^^^^^ ^^^
    //                      vector angle
    //   this "double change" of vector and angle
    //   will produce a bad flip
    //   simple solution:
    //     overlay four flip containers:
    //     horizontal vertical diagonal antidiagonal
    //   risky solution:
    //     in CSS, chain four transforms
    //     or only two? scale + rotate3D


    let angle_id_b_m4 = (dxOut) ? (
      angle_id_b % 4) : (
      (angle_id_b + 2) % 4);


    const v = rotVecFromAngle[angle_id_b_m4];
    //console.log(`v ${v}   angle ${angle_id_b_m4}`)


    // flip via rotate3d
    /*
    transform_rotate.style.transform += 'rotate3d('+v+',0,180deg)';
    */


    // TODO better
    /*
    Array.from(document.getElementsByClassName('body_wrapper')).forEach(e => {
      e.style.transform += 'rotate3d('+v+',0,-180deg)';
    })
    */


    if (angle_id_b % 2 == 0) {
      rotVecFromAngle = [
        rotVecFromAngle[0],
        rotVecFromAngle[3],
        rotVecFromAngle[2],
        rotVecFromAngle[1],
      ];
    }
    else {
      rotVecFromAngle = [
        rotVecFromAngle[2],
        rotVecFromAngle[1],
        rotVecFromAngle[0],
        rotVecFromAngle[3],
      ];
    }

    // wait for animation, disable CSS transition
    // TODO allow to cancel promise / clear timeout
    promiseTimeout(tweenDurShort)
    .then(() => {
      doAnimateMoves = false;
    });

  }



  var fotoOverlayHide = true;

  function editFoto (num) {
    // TODO show overlay to edit foto
    //fotoOverlayHide = false
    alert(`edit foto for num = ${num}`);
  }



  // TODO use `event.key` instead of `event.keyCode`
  //   = avoid magic numbers
  const keyHandler = {

    /*
      38: moveUp, // arrow up
      40: moveDown, // arrow down
      37: moveLeft, // arrow left
      39: moveRight, // arrow right    

      69: moveUp, // e
      68: moveDown, // d
      83: moveLeft, // s
      70: moveRight, // f
    */

    38: (e=>e.shiftKey?rotateRight():moveUp()), // arrow up
    40: (e=>e.shiftKey?flipY():moveDown()), // arrow down
    37: (e=>e.shiftKey?rotateLeft():moveLeft()), // arrow left
    39: (e=>e.shiftKey?flipX():moveRight()), // arrow right    

    69: (e=>e.shiftKey?flipY():moveUp()), // e
    68: (e=>e.shiftKey?flipY():moveDown()), // d
    83: (e=>e.shiftKey?flipX():moveLeft()), // s
    70: (e=>e.shiftKey?flipX():moveRight()), // f



    87: rotateLeft, // w
    82: rotateRight, // r

    65: flipX, // a
    71: flipY, // g

    76: changeDark, // l
    77: changeMenu, // m

    78: (e=>e.shiftKey?focusName():null), // shift + n
    //71: (e=>e.shiftKey?focusGroup():null), // shift + g

    //TODO let focus name/group format with shift+N or shift+G
    // --> select whole text

    187: (e=>zoomBodies(+1)), // +
    189: (e=>zoomBodies(-1)), // -
  };



  // handle keyboard input
  function handleKeydown(event) {
    if (
         event.target.nodeName === 'INPUT'
      || event.ctrlKey
      || event.altKey
      || event.metaKey
      || event.isComposing // TODO verify - src https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
    ) {
      return;
    }
    console.log('handleKeydown');
    console.dir(event);
    /*
    event.ctrlKey
    event.altKey
    event.metaKey
    event.shiftKey
    */

    try {
      console.log(`event key ${event.key} keyCode ${event.keyCode}`);
      keyHandler[event.keyCode](event);
      event.preventDefault();
    }
    catch (e) {
      console.log(`ignore event key ${event.key}`);
      throw(e);
    }

  }



  //let yRange = preval(() => Array.from(Array(5).keys()))
  //let xRange = preval(() => Array.from(Array(5).keys()))

  /* todo make preval accept variables = aware of "init environment"
    let matrix = preval(() => {
        const alchi = require('./src/alchi.cjs')
        const origin = 0b0000
        return alchi.ac_xor(origin, alchi.ac_bits_asmg_11)
    })
  */

  let matrix = alchi.ac_xor(origin, alchi.ac_bits_asmg_11);
  // now origin is at position (1, 1) = index 5
  // rotate + flip matrix to the "normal view"
  //   fire  water  =     top-left     top-right
  //   air   earth  =  bottom-left  bottom-right
  
  const matrixIdxRotateRight = [
    12,  8,  4,  0,
    13,  9,  5,  1,
    14, 10,  6,  2,
    15, 11,  7,  3,
  ];

  const matrixIdxRotateLeft = [
     3,  7, 11, 15,
     2,  6, 10, 14,
     1,  5,  9, 13,
     0,  4,  8, 12,
  ];

  const matrixIdxFlipD = [
     0,  4,  8, 12,
     1,  5,  9, 13,
     2,  6, 10, 14,
     3,  7, 11, 15,
  ];

  const matrixIdxFlipA = [
    15, 11,  7,  3,
    14, 10,  6,  2,
    13,  9,  5,  1,
    12,  8,  4,  0
  ];

  const matrixIdxFlipX = [
     3,  2,  1,  0,
     7,  6,  5,  4,
    11, 10,  9,  8,
    15, 14, 13, 12,
  ];

  const matrixIdxFlipY = [
    12, 13, 14 ,15,
     8,  9, 10, 11,
     4,  5,  6,  7,
     0,  1,  2,  3,
  ];

  const origin_sm = (origin & 0b0110) >> 1;
  switch(origin_sm) {
    case 0:
      // air --> rotate 90deg ccw
      matrix = matrix.map(
        (val, idx, matrix) => matrix[
          matrixIdxRotateLeft[idx]
      ]);
      break;
    case 1:
      // fire --> no change
      break;
    case 2:
      // earth --> rotate 180deg
      matrix = matrix.reverse();
      break;
    case 3:
      // water --> rotate 90deg cw
      matrix = matrix.map(
        (val, idx, matrix) => matrix[
          matrixIdxRotateRight[idx]
      ]);
      break;
  }

  if (origin_sm == 0 || origin_sm == 3) {
    // air or water
    if ((matrix[0] & 0b0110) >> 1 == 2) { // 2 == earth
      matrix = matrix.map(
        (val, idx, matrix) => matrix[
          matrixIdxFlipA[idx]
        ]);
    }
  } else {
    // fire or earth
    if ((matrix[3] & 0b0110) >> 1 == 0) { // 0 == air
      matrix = matrix.map(
        (val, idx, matrix) => matrix[
          matrixIdxFlipD[idx]
        ]);
    }
  }

  //let groupFormat = 'A+S+M+G'
  //let groupFormat = 'G+M+S'
  // TODO use descriptins as tooltip / title / status bar text
  let groupFormatPresets = {
    'M+S': 'same ( Move + Sense ) = same "element" [4 groups]',
    'GA': 'same ( Gend x Age ) = same "body" [2 groups]',
    'G+A': 'same ( Gend + Age )',
    'GMA+GSA': 'same ( Gend x Move x Age + Gend x Sense x Age ) = same "sleep" [4 groups]',
    'GM+SA': 'same ( Gend x Move + Sense x Age ) = same "wake" [4 groups]',
    'MS': 'same ( Move x Sense ) = same "class" [2 groups]',
    'GMSA': 'same ( Gend x Move x Sense x Age ) = same "wake" [2 groups]',
    'M': 'same Move [2 groups]',
    'S': 'same Sense [2 groups]',
    'GM': 'same ( Gend x Move ) = same "gender congruence" [2 groups]',
    'SA': 'same ( Sense x Age ) = same "age congruence" [2 groups]',
    'G+M+S+A': 'TODO 16 groups',
    '+': 'no groups',
  };

  let groupFromN;
  let numGroups;
  let temp_groupFromN;

  const colorTable = preval(({baseDir}) => {
    const colorTable = require(baseDir+'/src/colorTable.cjs')
    return colorTable.colors
  });

  let groupColor = []; //  = colorTable[numGroups]
  let groupColorNode = [];
  
  //let numSmOfAg = []



  // map between "sense + move" and "age + gender"
  const sagm_of_asmg = Array.from(Array(16).keys()).map(
    (asmg) => (
      ((asmg & 0b0100) << 1) |
      ((asmg & 0b1000) >> 1) |
      ((asmg & 0b0001) << 1) |
      ((asmg & 0b0010) >> 1)
    )
  );

      /*
      const mgas = (
        ((asmg & 0b0010) << 2) |
        ((asmg & 0b0001) << 2) |
        ((asmg & 0b1000) >> 2) |
        ((asmg & 0b0100) >> 2)
      )
      return mgas

      const mags = (
        ((asmg & 0b0010) << 2) |
        ((asmg & 0b1000) >> 1) |
        ((asmg & 0b0001) << 1) |
        ((asmg & 0b0100) >> 2)
      )
      return mags
      */


  function setLocale(l) {
    locale = l;
    alchi.setLocale(l);

    change_nameFormat();
  }


  const valColor = {

    // light-orange, dark-turc
    a: [['#ff8409', '#000000'], ['#008080', '#ffffff']],
    s: [['#ff8409', '#000000'], ['#008080', '#ffffff']],

    // light-lime, dark-purple
    m: [['#a8e000', '#000000'], ['#800080', '#ffffff']],
    g: [['#a8e000', '#000000'], ['#800080', '#ffffff']],

    // light-yellow, red, green, dark-blue
    ag: [['#ffff00', '#000000'], ['#c00000', '#ffffff'], ['#00c000', '#000000'], ['#000080', '#ffffff']],
    sm: [['#ffff00', '#000000'], ['#c00000', '#ffffff'], ['#00c000', '#000000'], ['#000080', '#ffffff']],
    
    // from colorTable.cjs
    //ag: ['#ffff55', '#aa0000', '#55ff55', '#0000aa'],
    //sm: ['#ffff55', '#aa0000', '#55ff55', '#0000aa'],

    // default colors
    //ag: ['#ffff00', '#ff0000', '#00c000', '#0000ff'],
    //sm: ['#ffff00', '#ff0000', '#00c000', '#0000ff'],
  };

  groupColor = colorTable[numGroups];


  function change_groupFormat () {
    //console.log('groupFormat has changed')
    temp_groupFromN = alchi.tableGroupFromN(groupFormat)
    if (temp_groupFromN && temp_groupFromN[16] !== 0) {
      console.log('groupFormat is valid')
      groupFromN = temp_groupFromN
      numGroups = groupFromN[16]
      groupColor = colorTable[numGroups]


    }
  }

  change_groupFormat() // init



  //TODO add titles/tooltips/descriptors to name/group formats

  let nameFormatPresets = {
    'e/b': 'Element + Body. split in Top + Bottom',
    // TODO swap element <> body, to body | element
    's/m|a/g': 'Sense / Move | Age / Gender = Element | Body. split in four',
    'smagxshape': 'Sense Move Age Gender + shape',
    'e/bxinout': 'Element / Body = In / Out',
    'e/bxfoto': 'Element / Body x Foto',
    'be': 'Body | Element',
    //'bexfoto': 'Body | Element \\ Foto',
    // TODO swap element <> body, to body | element
    'ebxorbit': 'Element | Body x orbit = Out ( In In ) Out',
    // TODO swap element <> body, to body | element
    'ebxshape': 'Element | Body x shape',
    // TODO swap element <> body, to body | element
    's/e/m|a/b/g': 'Sense / Element / Move | Age / Body / Gender. split in six',
    'ep': 'Element + Pathos: Element',
    'cg-jung': 'CG Jung. Element = function, pathos = "introvert" or "extravert"',
    'zodiac': 'Zodiac signs of astrology. Element = mutable signs, Neurotic pathos = cardinal signs, Psychotic pathos = fixed signs',
    'mbti': 'Myers Briggs Type Indicator. AB = element, CD = gender + age',
    '(ms)p': 'Move + Sense + Pathos: Move + Sense',
    'a/e/g': 'Age / Element / Gender',
    'a/s/m/g': 'Age / Sense / Move / Gender. split in four',
    'a/s/m/gxbody': 'Age / Sense / Move / Gender. in terms of body',
    'e': 'Element = Move + Sense',
    'e|b': 'Element + Body. split in Left + Right',
    'be': 'Body + Element. body = family role',
    '(gea)pe': 'Gender + Element + Age + Pathos: Element',
    'epm': 'Element + Pathos: Move',
    'eps': 'Element + Pathos: Sense',
    'gmsa': 'Gender + Move + Sense + Age',
    'shape': 'body shape = Age / Gender / Sense / Move = top down',
    'ge': 'Gender + Element',
    'ea': 'Element + Age',
    '(ms)': 'Move + Sense = Element',
    'ga': 'Gender + Age = Outside',
    'gm': 'Gender + Move = Lower',
    'sa': 'Sense + Age = Upper',
    'x': 'no names',
  }


  function change_nameFormat () {
    const temp_nameFromN = alchi.tableNameFromN(nameFormat)
    if (temp_nameFromN) {
      nameFromN = temp_nameFromN
      nameParts = nameFromN[0].length
      console.log('nameFormat "'+nameFormat+'" is valid. nameFromN:')
      //console.dir(nameFromN)
      //console.log(`nameParts = ${nameParts}`)
    } else {

      // special case
      if (nameFormat === 'shape') {
        showPathos = false
      }

      return
      // dont parse pathosFormat from invalid nameFormat
    }

    const temp_pathosFromSM = alchi.tablePathosFromSM(nameFormat)
    //console.log('temp_nameFromN = '+temp_nameFromN)
    if (temp_pathosFromSM) {
      const pathosFormat = nameFormat.split('p')[1] || nameFormat
      if (pathosFormat == 's') {
        anim_dash_factor_key = 'ei'
      }
      else if (pathosFormat == 'm') {
        anim_dash_factor_key = 'np'
      }
      showPathos = true
      pathosFromSM = temp_pathosFromSM
      console.log('nameFormat "'+nameFormat+'" has pathosFormat. pathosFromSM = '+pathosFromSM)
    } else {
      showPathos = false
    }
  }

  change_nameFormat() // init



  // TODO use CSS transition? possible with CSS variable?

  let lightSteps = preval(() => {
    const N = 8
    return [...Array.from(Array(256/N).keys())
      .map((idx) => [
        '#'+(idx*N).toString(16).padStart(2, '0').repeat(3),
        '#'+(255-idx*N).toString(16).padStart(2, '0').repeat(3),
      ]),
      ['#ffffff', '#000000']]
  })

  let col_rgba33 = ['255,255,255,0.33', '0,0,0,0.33']
  //let col_rgb = ['rgba(1,1,1, 0.33)', 'rgba(0,0,0, 0.33)']
  

  function changeAnim (event) {

    doAnimateDash = !doAnimateDash

    if (doAnimateDash === false) {
      // stop timer
      animateDashOff()
    }
    else {
      // start timer
      animateDashStep()
    }

    /*
      // event.target is one of: use, svg, button
      let button = event.target
      while (button.nodeName !== 'BUTTON') {
        button = button.parentNode
      }

      const svg = button.childNodes[0]
      const title = svg.childNodes[0]
      const use = svg.childNodes[1]
      const grid = document.getElementById('grid')

      if (use.getAttribute('xlink:href') == '#stop') {
        // stop animation
        grid.classList.remove('animate')
        title.innerHTML = 'Animation Start'
        use.setAttribute('xlink:href', '#play')
      }
      else {
        // start animation
        grid.classList.add('animate')
        title.innerHTML = 'Animation Stop'
        use.setAttribute('xlink:href', '#stop')
      }
    */
  }



  var exportOverlayHide = true;
  
  function exportSvg () {
    
    console.log('export svg');
    
    // get svg element
    var svg = document.getElementById("content");

    // get svg source
    var serializer = new XMLSerializer();
    var source = serializer.serializeToString(svg);

    // add name spaces
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    // add xml declaration
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    // patch svg viewBox
    source = source.replace(
      ' viewBox="0 0 2400 2400" ',
      ' viewBox="800 800 1600 1600" '
    );

    //convert svg source to URI data scheme.
    var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);

    //window.location = url;
    //set url value to a element's href attribute.
    document.getElementById("export-link").href = url;
    //you can download svg file by right click menu.

    exportOverlayHide = false;
  }


  function changeDark () {
    console.log('changeDark')
    isDark = !isDark
    colors2dyn.set(colors2 = colorTable[2][( isDark|0 )])

    // for transition, set alpha to zero
    col_rgba33 = ['0,0,0,0', '0,0,0,0']

    promiseTimeout(0.5*tweenDurLong).then(() => {
      changeStyle()
    })
    
    promiseTimeout(tweenDurLong).then(() => {
      col_rgba33 = isDark ? ['255,255,255,0.33', '0,0,0,0.33'] : ['0,0,0,0.33', '255,255,255,0.33']
    })

  }

  let colors2 = colorTable[2][isDark|0] // [frontColor, backColor]
  let colors2dyn = tweened(colors2, {
    duration: tweenDurLong,
    easing: tweenFunc,
    interpolate: (from, to) => {
      lightSteps.reverse() // in place
      const N = lightSteps.length
      return (t) => {
        //console.log(t+' '+lightSteps[(t*N)|0])
        return lightSteps[(t*N)|0]
      }
      //console.log(`from ${from} to ${to} t ${t}`)
    }
  })

  let menuSize = [-1, -1]


  function changeMenu (/*event*/) {

    // event.target is one of:
    // undefined, svg, use, button
    //console.log(`event.target.nodeName = ${event.target.nodeName}`)

    const button = document.getElementById('menuBtn')

    const menu = button.parentNode.parentNode

    const h_btn = button.clientHeight
    const w_btn = button.clientWidth

    console.log(`menu.clientHeight = ${menu.clientHeight}`)
    console.log(`button.clientHeight = ${button.clientHeight}`)
    console.log(`menuSize = ${menuSize}`)

    // TODO move styles to CSS classes
    // add css class "collapsing"

    if (menu.classList.contains('collapsing')) {
      return
    }

    // TODO move all this to html?

    if (!menu.classList.contains('collapsed')) {
      // TODO exact numbers?
      // +100 to compensate padding
      
      menu.classList.toggle('collapsing')
      
      // remember menu size
      //menuSize = [menu.clientWidth, menu.clientHeight]
      menuSize = [menu.style.width, menu.style.height]
      
      // collapse menu
      menu.style.width = 0 // start animation
      // TODO exact numbers?
      // +20 to compensate padding

      menu.style.overflow = 'hidden' // hide scrollbars
      
      // hide body after collapse
      // so we dont focus the buttons with tab key
      promiseTimeout(tweenDurShort).then(()=>{
        
        menu.classList.toggle('collapsed')

        menu.style.height = (h_btn + 4)+'px'
        menu.style.padding = 0
        
        button.style.borderLeft = 'none'
        button.style.borderTop = 'none'
        button.style.margin = 0

        // expand button
        menu.style.width = (w_btn + 4)+'px' // start animation
        
        promiseTimeout(tweenDurShort).then(()=>{
          menu.classList.toggle('collapsing')
          isMenuHidden = true
        })
      })
    }

    else {

      // collapse button
      menu.style.width = 0 // start animation
      menu.classList.toggle('collapsing')

      promiseTimeout(tweenDurShort).then(()=>{

        button.style.borderLeft = ''
        button.style.borderTop = ''
        button.style.margin = '4px'

        // expand menu
        //body.style.display = ''
        // expand only part of the menu - scroll the rest
        //expand.style.height = (0.5*content.clientHeight)+'px'
        menu.classList.toggle('collapsing')
        menu.classList.toggle('collapsed')

        menu.style.padding = '12px'

        //menu.style.height = menuSize[1]+'px'
        menu.style.height = menuSize[1]

        //menu.style.width = menuSize[0]+'px' // start animation
        menu.style.width = menuSize[0] // start animation
        
        promiseTimeout(tweenDurShort).then(()=>{
          //menu.style.overflow = 'auto' // show scrollbars
          isMenuHidden = false
        })
      })

    }

  }


  function childByClassPrefix(parent, _class) {
    for (let child of Array.from(parent.childNodes)) {
      //if (child.classList.contains(_class)) {
      //console.log(`childByClassPrefix child.nodeName = ${child.nodeName}`)
      //console.log(`childByClassPrefix child.className = ${child.className}`)
      if (child.className && child.className.startsWith(_class)) {
        return child
      }
    }
    return null
  }

  // TODO scroll only the body, keep head fixed
  //   show scrollbar below the [ + ] button
  // TODO expand only one menu
  //   when expanding both menus, close the old menu
  /* FIXME clicking the button too fast will hide the menu body, and confuse +/- */
  function changeExpand (event) {
    const button = event.target
    console.log(`changeExpand event.target.nodeName = ${event.target.nodeName}`)
    const head = button.parentNode
    const content = head.parentNode
    const expand = content.parentNode
    const body = childByClassPrefix(content, 'body')
    //const body = content.childNodes[2] // 1 = white space

    console.log('body display = '+body.style.display)

    //TODO precise numbers
    if (body.clientHeight > 0) {
      // collapse
      button.innerHTML = '+'
      body.style.overflow = 'hidden'

      // remember height
      body.setAttribute('data-height', body.style.height)
      
      body.style.height = 0 // start animation

      // hide body after collapse
      // so we dont focus the buttons with tab key
      promiseTimeout(tweenDurShort).then(()=>(
        body.style.display = 'none'
        //body.style.overflow = 'hidden' // remove scrollbar
      ))
    }
    else {
      // expand
      button.innerHTML = '&ndash;'
      body.style.display = ''
      // expand only part of the menu - scroll the rest
      //expand.style.height = (0.5*content.clientHeight)+'px'
      //body.style.height = (4.4*head.clientHeight)+'px' // start animation
      body.style.height = body.getAttribute('data-height')
      //body.style.overflow = 'auto' // add scrollbar //TODO static/always?
      promiseTimeout(tweenDurShort).then(()=>(
        body.style.overflow = 'scroll-y'
      ))
    }
  }

  function setNamePreset({target}){
    nameFormat = target.innerHTML
    change_nameFormat()
  }

  function setGroupPreset({target}){
    groupFormat = target.innerHTML
    change_groupFormat()
  }

  let styleRuleIdx = -1

  // workaround: scrollbars dont respond to CSS variables
  function changeStyle(){
    
    console.log('changeStyle')

    const sheet = window.document.styleSheets[0];
    console.log('rules len = '+sheet.cssRules.length)
    if (styleRuleIdx !== -1) {
      sheet.deleteRule(styleRuleIdx)
    }
    // '%23' == urlencode( '#' )
    // # is url fragment marker
    // https://codepen.io/gunnarbittersmann/pen/BoovjR
    const fgEsc = '%23'+(colors2[0].substring(1))
    //TODO preval this string to one line
    // scrollbar thumb background image
    styleRuleIdx = sheet.insertRule([
      '.scroll::-webkit-scrollbar-thumb',
      '{background: center no-repeat url(',
      "'data:image/svg+xml;utf8,",
      '<svg xmlns="http://www.w3.org/2000/svg" ',
      'viewBox="0 0 24 24" x="0px" y="0px" ',
      'height="24px" width="24px">',
      '<g stroke="'+fgEsc+'" stroke-width="1">',
      '<line x1="4" y1="8" x2="20" y2="8" />',
      '<line x1="4" y1="16" x2="20" y2="16" />',
      "</g></svg>') !important}",
    ].join(''))
  }

  // TODO refactor
  let moveStartEvent = { clientX: 0, clientY: 0 }
  let moveEndEvent = { clientX: 0, clientY: 0 }
  let moveEvent = { clientX: 0, clientY: 0 }
  let rotateEventRight = { clientX: 0, clientY: 0 }
  let rotateEventRightStart = { clientX: 0, clientY: 0 }
  let rotateEventRightEnd = { clientX: 0, clientY: 0 }
  let rotateEventLeft = { clientX: 0, clientY: 0 }
  let rotateEventLeftStart = { clientX: 0, clientY: 0 }
  let rotateEventLeftEnd = { clientX: 0, clientY: 0 }

  /* the zero-cpu solution ....
    cos ALL other solutions
    need too much cpu/gpu work */
  let animateDashTime = 1000
  let animateDashTimer = null

  function animateDashStep(){
    anim_dash_offset += 5
    animateDashTimer = setTimeout(
      animateDashStep,
      animateDashTime
    )
  }

  function animateDashOff(){
    clearTimeout(animateDashTimer)
    animateDashTimer = null
  }



  //let transform_matrix = null

  let grid_elem = null
  let transform_translate = null

  function handleWindowLoad(){

    move_container = document.getElementById(
      'transform-move')
    console.log(`move_container = ${move_container}`)

    transform_rotate = document.getElementById('transform-rotate');
    window.transform_rotate = transform_rotate; // make global

    /**/
    // moved: add keydown handler to control-* elements
    //let keydown_element = document.getElementById('transform-mask');
    let keydown_element = document;
    keydown_element.addEventListener('keydown', handleKeydown);
    console.log('done adding keydown handler to '+keydown_element.id)
    /**/

    // init Rematrix

    if (0) {
      transform_matrix = Rematrix.fromString(
        getComputedStyle(move_container).transform);
    }



    if (doAnimateDash) {
      // start dash animation
      animateDashStep()
    }



    // TODO auto-zoom to fit window?

    // hide menu on start
    // TODO avoid animation on initial hide
    if (isMenuHidden) {
      changeMenu()
    }



    // TODO remove? what is the right position? clientXY? pageXY?
    const key_event_x = 'clientX', key_event_y = 'clientY'

    /*
      const key_event_x = 'screenX', key_event_y = 'screenY'
      const key_event_x = 'pageX', key_event_y = 'pageY'
      const key_event_x = 'offsetX', key_event_y = 'offsetY'
      const key_event_x = 'movementX', key_event_y = 'movementY'
    */



    // custom mousemove handlers
    if (1) {

      let active_move_listeners = [
        // [element, event, callback]
      ];

      function remove_all_listeners(event) {
        //console.log(`remove_all_listeners ${active_move_listeners.length}`)
        //console.dir(event)
        active_move_listeners.forEach(
          ([element, event, callback]) => (
            element.removeEventListener(event, callback, false)
          ))
        active_move_listeners = []
      }

      function add_move_listener(element, event, callback) {
        element.addEventListener(event, callback, false)
        active_move_listeners.push(
          [element, event, callback]
        )
      }

      function remove_move_listener(element, event, callback) {
        element.removeEventListener(event, callback, false)
        active_move_listeners.some(
          ([e, v, c], idx) => {
            if (element === e && event === v) {
              active_move_listeners.pop(idx)
              return false // stop loop
            }
          }
        )
      }



      grid_elem = document.getElementById('grid');

      transform_translate = document.getElementById('transform-translate');
      


      // mousemove handlers

      /*
      ;['mouseleave'].forEach(e => (
        grid_elem.addEventListener(
          e, remove_all_listeners, false)
      ))
      */
      
      // global events
      // touch events [except touchstart] are always global --> target == document
      ['mouseup', 'mouseleave', 'touchend', 'touchleave', 'touchcancel'].forEach(v => {
        //;['mouseup'].forEach(v => {
        document.addEventListener(v, () => {
            
            if (!isMoving) {
              return;
            }

            console.log(`${v} document. eventTarget = ${eventTarget && eventTarget.id}`)
            
            // quick + dirty
            //if (v[0] === 't') {
                
            if (eventTarget !== null
              && eventTarget !== document) {

              const e2 = document.createEvent('MouseEvent')

              // touchend event has no position
              // so we use position of last touchmove event

              e2.initMouseEvent(
                'mouseup', // type
                false, // bubbles
                true, // cancelable
                /*elem.ownerDocument.defaultView*/ null, // view
                0, // detail
                moveEvent.screenX, // screenX
                moveEvent.screenY, // screenY
                moveEvent.clientX, // clientX
                moveEvent.clientY, // clientY
                false, // ctrl
                false, // alt
                false, // shift
                false, // meta
                0, // button
                null // relatedTarget
              )

              // touchend.target == document
              // so we use touchstart.target
              //console.dir(eventTarget)
              if (eventTarget) {
                eventTarget.dispatchEvent(e2)
                eventTarget = null
              }
            }
            //}

            remove_all_listeners()

            isMoving = false
          }, false);
      });

      // throttle/debounce mousemove events
      //   for less precision and better performance
      //   unthrottled FPS is avg 100, max 125 FPS
      //   needs way too much CPU power
      //   around 60% cpu on my old laptop
      //   and un-usable on my old android phone
      // 125 FPS =  8 MSPF
      // 100 FPS = 10 MSPF
      //  60 FPS = 16 MSPF
      //  50 FPS = 20 MSPF
      //  40 FPS = 25 MSPF
      //  33 FPS = 30 MSPF
      //  30 FPS = 33 MSPF
      //  25 FPS = 40 MSPF
      //  15 FPS = 66 MSPF
      //const mousemoveFrameTime = 40 // = 25 FPS, real: 18 fps
      //const mousemoveFrameTime = 30 // = 33 FPS, real: 28 fps
      //const mousemoveFrameTime = 35 // = 28 FPS, real: 22 fps

      //const mousemoveFrameTime = 32 // = 31 FPS, real: 25 fps
      const mousemoveFrameTime = 100; // = 10 FPS
      // TODO expose this to control menu

      // measure FPS
      let moveCounter = 0;
      let moveStartTime = 0;



      const moveListenerMouse = (event) => {

        // update position
        moveEvent = event

        //console.log(`${event.type} ${event.clientX} ${event.clientY} ${event.target.id}`)
        //console.dir(event)

        // measure FPS
        moveCounter += 1

        // disable move handler
        //;['mousemove'].forEach(v => {
          //event.target.removeEventListener('mousemove', moveListener, false)
          //remove_move_listener(grid_elem, 'mousemove', moveListener)
          //remove_move_listener(event.target, v, moveListener)
        //})
        remove_move_listener(document, 'mousemove', moveListenerMouse)

        // wait
        // TODO in mouseup, cancel promise
        //   or: only restore listener when still moving
        promiseTimeout(mousemoveFrameTime).then(() => {
          
          // re-enable move handler
          //['mousemove'].forEach(v => {
            //event.target.addEventListener('mousemove', moveListener, false)
            //add_move_listener(event.target, 'mousemove', moveListener)
            //add_move_listener(grid_elem, 'mousemove', moveListener)
            //add_move_listener(event.target, v, moveListener)
          //})
          if (isMoving) {
            add_move_listener(document, 'mousemove', moveListenerMouse);
          }
        })

        // dont "bubble" event to parent nodes
        //event.stopPropagation()

        //event.preventDefault()
      };

      const moveListenerTouch = (event) => {

        console.log('moveListenerTouch')

        // update position
        //const _event = event.touches[0]
        moveEvent = event.touches[0]

        //console.log(`${event.type} ${_event.clientX} ${_event.clientY} ${event.target.id}`)
        //console.dir(event)

        // measure FPS
        moveCounter += 1

        // disable move handler
        //;['touchmove'].forEach(v => {
          //event.target.removeEventListener('mousemove', moveListener, false)
          //remove_move_listener(grid_elem, 'mousemove', moveListener)
          //remove_move_listener(event.target, v, moveListener)
        //})
        remove_move_listener(document, 'touchmove', moveListenerTouch)

        // wait
        promiseTimeout(mousemoveFrameTime).then(()=>(
          
          // re-enable move handler
          //['mousemove', 'touchmove'].forEach(v => {
            //event.target.addEventListener('mousemove', moveListener, false)
            //add_move_listener(event.target, 'mousemove', moveListener)
            //add_move_listener(grid_elem, 'mousemove', moveListener)
            //add_move_listener(event.target, v, moveListener)
          //})
          add_move_listener(document, 'touchmove', moveListenerTouch)
        ))

        // dont "bubble" event to parent nodes
        //event.stopPropagation()

        //event.preventDefault()
      };

      const moveListener = {
        mousemove: moveListenerMouse,
        touchmove: moveListenerTouch,
      };


      const rotateListenerRightTouch = (event) => {
        // TODO
      };

      const rotateListenerRightMouse = (event) => {
        moveCounter += 1

        rotateEventRight = event

        // TODO add rotateListener for touchmove
        ;['mousemove', 'touchmove'].forEach(v => {
          //event.target.removeEventListener('mousemove', rotateListenerRight, false)
          //remove_move_listener(grid_elem, 'mousemove', rotateListenerRight)
          remove_move_listener(document, v, rotateListenerRight)
        })

        promiseTimeout(mousemoveFrameTime).then(()=>(

          ['mousemove', 'touchmove'].forEach(v => {
            //event.target.addEventListener('mousemove', rotateListenerRight, false)
            //add_move_listener(grid_elem, 'mousemove', rotateListenerRight)
            add_move_listener(document, v, rotateListenerRight)
          })

        ))    
      };

      const rotateListenerRight = {
        mousemove: rotateListenerRightMouse,
        touchmove: rotateListenerRightTouch,
      }



      const rotateListenerLeftTouch = (event) => {
        // TODO
      };

      const rotateListenerLeftMouse = (event) => {
        moveCounter += 1

        rotateEventLeft = event

        ;['mousemove', 'touchmove'].forEach(v => {
          //event.target.removeEventListener('mousemove', rotateListenerLeft, false)
          //remove_move_listener(grid_elem, 'mousemove', rotateListenerLeft)
          remove_move_listener(document, v, rotateListenerLeft)
        })

        promiseTimeout(mousemoveFrameTime).then(()=>(

          ['mousemove', 'touchmove'].forEach(v => {
            //event.target.addEventListener('mousemove', rotateListenerLeft, false)
            //add_move_listener(grid_elem, 'mousemove', rotateListenerLeft)
            add_move_listener(document, v, rotateListenerLeft)
          })

        ))    
      };

      const rotateListenerLeft = {
        mousemove: rotateListenerLeftMouse,
        touchmove: rotateListenerLeftTouch,
      };


      let zoomEvent = { clientX: 0, clientY: 0 };

      function handleWheelBodies(event) {
        console.dir(event);
        
        zoomEvent = event;
        // TODO set zoom center from position
        // event.clientX, event.clientY

        zoomBodies(
          (event.deltaY > 0) ? -1 : +1
        );
        event.stopPropagation();
        event.preventDefault();
      }


      let mouseDownTime = 0;
      let isMoving = false;
      let eventTarget = null;

      const add_listeners_by_control_id = {

        'top-left': e => {
          //
        },

        'top-center': e => {

          const L = rotateListenerRight;

          // TODO also use touchstart, touchmove, touchend,
          //   touchleave, touchcancel
          ['mousedown', 'touchstart'].forEach(v => {

            const v2 = (v[0] === 'm') ? 'mousemove' : 'touchmove';

            // e = control-top-center
            e.addEventListener(v, (event) => {

              //console.log(`${v} ${e.id || e.nodeName+' .'+e.class}`);

              if (isMoving) {
                console.log('already moving - exit handler');
                return;
              }

              isMoving = true;
              doAnimateMoves = false; // disable css transitions

              const _event = (v[0] === 't') ? event.touches[0] : event;

              // remember target for touchmove, touchend, etc.
              eventTarget = _event.target;

              mouseDownTime = _event.timeStamp;

              // measure FPS
              moveCounter = 0;
              moveStartTime = _event.timeStamp;

              //moveStartEvent = event
              //moveEvent = event
              
              rotateEventRightStart = _event;
              rotateEventRight = _event;

              add_move_listener(document, v2, L[v2]);
            
            }, false);
          });

          //['mouseup', 'mouseleave'].forEach(v => {
          //['mouseup', 'mouseleave', 'touchend', 'touchleave', 'touchcancel'].forEach(v => {
          ['mouseup'].forEach(v => {

            const v2 = (v[0] === 'm') ? 'mousemove' : 'touchmove';

            // e = control-top-center
            e.addEventListener(v, (event) => {

              if (!isMoving) {
                // dont "bubble" event to parent nodes
                event.stopPropagation();

                return;
              }

              isMoving = false;
              eventTarget = null;

              console.log(`rEL document ${v2}`);

              //;['mousemove', 'touchmove'].forEach(v => {
              //event.target.removeEventListener('mousemove', L, false)
              //remove_move_listener(grid_elem, 'mousemove', L)
              remove_move_listener(document, v2, L[v2]);
              
              //console.log(`${v} ${e.id || e.nodeName+' .'+e.class}`);

              console.dir(event);

              // FIXME touchend has no touches --> no positions
              const _event = (v[0] === 'm') ? event : event.touches[0];

              const dt = event.timeStamp - mouseDownTime;
              
              const [dx, dy] = [
                (
                  _event.clientX
                   - rotateEventRightStart.clientX
                ),
                (
                  _event.clientY
                   - rotateEventRightStart.clientY
                )
              ];

              let isClick = false;
              let ele2 = null;

              if (dt < 500 &&
                -10 < dx && dx < 10 &&
                -10 < dy && dy < 10
              )
              {
                // click not move

                // TODO use click to zoom
                
                console.log('click not move');
                isClick = true;

                console.log(`event.target.style.display = ${event.target.style.display}`);
                console.dir(event);

                // make transparent for click events
                event.target.style.pointerEvents = 'none';

                ele2 = document.elementFromPoint(
                  _event.clientX, _event.clientY);
                
                // restore click events
                event.target.style.pointerEvents = 'all';

                // manually "bubble" up to parent svg
                while (ele2 && ele2.nodeName !== 'svg') {
                  ele2 = ele2.parentNode;
                }
              }

              else
              {
                // move not click
                rotateEventRightEnd = {
                  clientX: (
                    Math.round((rotateEventRightEnd.clientX
                     - _event.clientX
                     + rotateEventRightStart.clientX
                    ) / 45.0)*45.0 // snap rotation
                  )
                };
              }

              rotateEventRightStart = { clientX: 0 };

              rotateEventRight = { clientX: 0 };

              // measure FPS
              const deltaT = event.timeStamp - moveStartTime;
              const fps = moveCounter / deltaT * 1000;
              //console.log(`move-end ${fps.toFixed(2)} fps`);
              // FPS test results:
              // fps max is 125
              // fps avg is 100 ! = much too high
              // --> throttle down to 25 fps

              // dont "bubble" event to parent nodes
              event.stopPropagation();

              // TODO
              // Alcimaps.svelte:3526 Uncaught TypeError:
              // Cannot read property 'dispatchEvent' of null
              // at HTMLDivElement.<anonymous>
              // (Alcimaps.svelte:3526)
              if (isClick && v == 'mouseup') {
                ele2.dispatchEvent(new Event('click'));
              }

            }, false);
          });
        }, // TODO brace?

        'top-right': e => {
          //
        },

        'center-left': e => {
          //
        },

        'center-center': e => {

          // TODO add touch gestures
          //   two finger zoom
          //   double tap to zoom in

          /* add mousewheel listener, TODO implement zoom
          ['wheel'].forEach(v => {
            e.addEventListener(
              v, handleWheelBodies, false
            )
          });
          */

          ['mousedown', 'touchstart'].forEach(v => {
          //e.addEventListener('mousedown', (event)=>{

            const v2 = (v[0] === 'm') ? 'mousemove' : 'touchmove';

            console.log(`${e} aEL ${v} + ${v2}`)

            // e = control-center-center
            e.addEventListener(v, (event) => {
              
              // always start moving?
              //if (isMoving) { return }
              
              isMoving = true;
              doAnimateMoves = false; // disable css transitions

              console.log(`${v} ${e.id || e.nodeName+' .'+e.class}`);

              // normalize properties .clientX .clientY etc
              const _event = (v[0] === 'm') ? event : event.touches[0];

              // remember target for touchmove, touchend, etc. as target for dispatchEvent
              eventTarget = _event.target;

              // measure FPS
              moveCounter = 0;
              moveStartTime = _event.timeStamp;

              moveStartEvent = _event; // remember start
              moveEvent = _event;
              
              //;['mousemove', 'touchmove'].forEach(v => {
              //event.target.addEventListener('mousemove', moveListener, false)
              //add_move_listener(grid_elem, 'mousemove', moveListener)
              
              console.log(`add_move_listener ${v2}`);

              //add_move_listener(event.target, v2, moveListener[v2])
              add_move_listener(document, v2, moveListener[v2]);
              //})
              
            }, false);
          });

          // TODO add touch with document.addEventListener
          //;['mouseup', 'mouseleave', 'touchend', 'touchleave', 'touchcancel'].forEach(v => {
          //;['mouseup', 'mouseleave'].forEach(v => {
          ['mouseup'].forEach(v => {

            const v2 = (v[0] === 'm') ? 'mousemove' : 'touchmove';

            // e = control-center-center
            e.addEventListener(v, (event) => {

              if (!isMoving) {
                return;
              }

              console.log(v+' '+(e.id || e.nodeName+' .'+e.class));

              isMoving = false;

              const _event = (v[0] === 'm') ? event : moveEvent;

              // snap move
              // TODO animate snapping

              const moveX = Math.round((
                moveStartEvent.clientX
                 - _event.clientX
              )/75);

              const moveY = Math.round((
                moveStartEvent.clientY
                 - _event.clientY
              )/75);
              
              moveStartEvent = {clientX: 0, clientY: 0};
              moveEvent = {clientX: 0, clientY: 0};

              if (moveX !== 0 || moveY !== 0) {
                moveBodies(-moveX, -moveY, true, true);
              }

              // measure FPS
              const deltaT = event.timeStamp - moveStartTime;
              const fps = moveCounter / deltaT * 1000;
              console.log(`move-end ${fps.toFixed(2)} fps`);

              // FPS test results:
              // fps max is 125
              // fps avg is 100 ! = much too high
              // --> throttle down to 25 fps

              remove_move_listener(document, v2, moveListener[v2]);

              // dont "bubble" event to parent nodes
              event.stopPropagation();

              eventTarget = null;

            }, false);
          });
        },

        'center-right': e => {
          //
        },

        'bottom-left': e => {
          //
        },

        'bottom-center': e => {
          const L = rotateListenerLeft;

          ['mousedown', 'touchstart'].forEach(v => {
            //e.addEventListener('mousedown', (event) => {

            e.addEventListener(v, (event) => {

              // remember target for touchmove, touchend, etc.
              eventTarget = event.target;

              const v2 = (v[0] === 'm') ? 'mousemove' : 'touchmove';

              if (isMoving) { return; }
              isMoving = true;
              doAnimateMoves = false;

              console.log(`${v} ${e.id || e.nodeName+' .'+e.class}`);
              const _event = (v[0] === 'm') ? event : event.touches[0];

              // measure FPS
              moveCounter = 0;
              moveStartTime = event.timeStamp;

              rotateEventLeftStart = _event;
              rotateEventLeft = _event;

              //moveStartEvent = _event
              //moveEvent = _event

              //;['mousemove', 'touchmove'].forEach(v => {
                //event.target.addEventListener('mousemove', L, false)
                //add_move_listener(grid_elem, 'mousemove', L)
                add_move_listener(document, v2, L[v2]);
              //})

            }, false);
          });

          //;['mouseup', 'mouseleave', 'touchend', 'touchleave', 'touchcancel'].forEach(v => {
          //['mouseup', 'mouseleave'].forEach(v => {
          ['mouseup'].forEach(v => {
            //e.addEventListener('mouseup', (event)=>{

            const v2 = (v[0] === 'm') ? 'mousemove' : 'touchmove';

            e.addEventListener(v, (event) => {

              eventTarget = null;

              if (!isMoving) {
                return;

                // dont "bubble" event to parent nodes
                event.stopPropagation();
              }
              isMoving = false;

              console.log(`${v} ${e.id || e.nodeName+' .'+e.class}`);
              //const _event = (v[0] === 'm') ? event : event.touches[0]

              // measure FPS
              const deltaT = event.timeStamp - moveStartTime;
              const fps = moveCounter / deltaT * 1000;
              console.log(`move-end ${fps.toFixed(2)} fps`);
              // FPS test results:
              // fps max is 125
              // fps avg is 100 ! = much too high
              // --> throttle down to 25 fps

              //;['mousemove', 'touchmove'].forEach(v => {
                //event.target.removeEventListener('mousemove', L, false)
                //remove_move_listener(grid_elem, 'mousemove', L)
                remove_move_listener(document, v2, L[v2]);
              //})

              // dont "bubble" event to parent nodes
              event.stopPropagation();

            }, false);
          });
        },

        'bottom-right': e => {
          //
        },

      }; // TODO brace?

      [

        ['top-left', 'none', 0, 0, width_in/8, height_in/8],
        ['top-center', 'none', width_in/8, 0, width_in/8*6, height_in/8],
        ['top-right', 'none', width_in/8*7, 0, width_in/8, height_in/8],

        ['center-left', 'none', 0, height_in/8, width_in/8, height_in/8*6],
        ['center-center', 'move', width_in/8, height_in/8, width_in/8*6, height_in/8*6],
        ['center-right', 'none', width_in/8*7, height_in/8, width_in/8, height_in/8*6],

        ['bottom-left', 'none', 0, height_in/8*7, width_in/8, height_in/8],
        ['bottom-center', 'none', width_in/8, height_in/8*7, width_in/8*6, height_in/8],
        ['bottom-right', 'none', width_in/8*7, height_in/8*7, width_in/8, height_in/8],
      
      ].forEach(([control_id, ..._]) => {

        const control_element = document.getElementById('control-'+control_id)
        //const control_element = document // TEST

        add_listeners_by_control_id[
          control_id](control_element);

        // add keydown handler to every control-* element
        control_element.addEventListener('keydown', handleKeydown);


      });
    }
  }



  // ASMG
  // SENF = 0000
  // LIPM = 1111



  /* the sixteen shapes */

  const bodyPath = ((width, height, wBox, hBox) => { // IIFE closure
    
    const dots = [
      [[1   , 0.75], [0   , 0.25]], // age: short, long
      [[0.75, 0.5 ], [0.25, 0.5 ]], // sense: extra, intro
      [[0.5 , 0.75], [0.5 , 0.25]], // move: neuro, psycho
      [[0.75, 1   ], [0.25, 0   ]], // gend: female, male
    ]

    const R = width / 2
    const dH = height / 4

    const X = wBox / 2 // x center
    const Y = hBox / 2 - height / 2 // y origin

    return Array.from(Array(16).keys()).map((num) => {
    
      // decimal num = binary ASMG
      const asmg = num.toString(2)
        .padStart(4, '0').split('')
        .map(s => s|0) // cast string to integer
      
      let p1 = ['M '+X+' '+Y]
      let p2 = ['z'] // back path

      let last_r2 = 0
      // idx = current height in path
      for (const [idx, bit] of asmg.entries()) {
        const [r1, r2] = dots[idx][bit]
        
        // continue back line
        if (r1 !== 0) {
          p2.push('L '+(X-r1*R)+' '+(Y+idx*dH))
        }
        // look behind
        if (r1 !== last_r2) {
          // step == add dot
          p1.push('L '+(X+r1*R)+' '+(Y+idx*dH))
        }
        
        // look ahead
        if (idx < 3) {
          const [next_r1, _] = dots[idx+1][asmg[idx+1]]
          if (r2 !== next_r1) {
            // back step
            p2.push('L '+(X-r2*R)+' '+(Y+(idx+1)*dH))
          }
        }
        if (idx === 3 && r2 !== 0) {
          // back step
            p2.push('L '+(X-r2*R)+' '+(Y+(idx+1)*dH))
        }
        
        // continue line
        p1.push('L '+(X+r2*R)+' '+(Y+(idx+1)*dH))

        last_r2 = r2
      }

      const res = p1.concat(p2.reverse()).join(' ')
      //const res = p1.join(' ')
      //console.log('bodyPath['+num+'] = '+res)

      return res
    })
  })(160/Math.sqrt(2), 160/Math.sqrt(2), 200, 200) // TODO get from global variable
  //})(200, 200) // TODO get from global variable


  // the four shapes
  // used in nameFormat "ebxshape"
  const pathDataShapeLarge = [
    'M 20,20 h 160 l -40,80 l 40,80 h -160 l 40,-80 z', // 00 = 3 = air
    'M 20,20 h 160 l -80,160 z', // 01 = 1 = fire
    'M 20,180 h 160 l -80,-160 z', // 10 = 2 = earth
    'M 100,20 l 40,80 l -40,80 l -40,-80 z', // 11 = 4 = water
  ];
  const pathDataShapeSmall= [
    'M 80,80 h 40 l -10,20 l 10,20 h -40 l 10,-20 z', // 00 = 3 = air
    'M 80,80 h 40 l -20,40 z', // 01 = 1 = fire
    'M 80,120 h 40 l -20,-40 z', // 10 = 2 = earth
    'M 100,80 l 10,20 l -10,20 l -10,-20 z', // 11 = 4 = water
  ];



  // letters of the four dimensions
  const letter_asmg = [
      ['S', 'L'], // age   = Short  or Long
      ['E', 'I'], // sense = Extra  or Intro
      ['N', 'P'], // move  = Neuro  or Psycho
      ['F', 'M'], // gen   = Female or Male
  ]

  // init empty TODO implement user data
  const captionText = Array.from(Array(xSize).keys()).map(x => Array.from(Array(ySize).keys()).map(y => {
    return ''
  }))

  const addNamePrefix = nameShortLong => (
    (
      nameShortLong[0] === nameShortLong[1][0]
    ) ? (
      // skip prefix, only set first letter to monospace
      //nameShortLong[1]
      '<tt>'+nameShortLong[1][0]+'</tt>'+nameShortLong[1].substring(1)
    ) : (
      // add prefix
      //nameShortLong[0]+' '+nameShortLong[1]
      '<tt>'+nameShortLong[0]+'</tt>&nbsp;'+nameShortLong[1]
    )
  );

  // array_1.equals(array_2)
  // https://stackoverflow.com/a/14853974
  // Warn if overriding existing method
  if(Array.prototype.equals)
      console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
  // attach the .equals method to Array's prototype to call it on any array
  Array.prototype.equals = function (array) {
      // if the other array is a falsy value, return
      if (!array)
          return false;

      // compare lengths - can save a lot of time 
      if (this.length != array.length)
          return false;

      for (var i = 0, l=this.length; i < l; i++) {
          // Check if we have nested arrays
          if (this[i] instanceof Array && array[i] instanceof Array) {
              // recurse into the nested arrays
              if (!this[i].equals(array[i]))
                  return false;       
          }           
          else if (this[i] != array[i]) { 
              // Warning - two different object instances will never be equal: {x:20} != {x:20}
              return false;   
          }           
      }       
      return true;
  }
  // Hide method from for-in loops
  Object.defineProperty(Array.prototype, "equals", {enumerable: false});



  let hashReaderActive = true

  // TODO move code to right location

  function getHash() {
      return window.location.hash.substr(1)
  }

  // stolen from https://github.com/ItalyPaleAle/svelte-spa-router/blob/master/Router.svelte
  const hashReader = readable(
    getHash(),
    function start(set) {
      const update = () => set(getHash())
      window.addEventListener('hashchange', update, false)
      return function stop() {
        window.removeEventListener('hashchange', update, false)
      }
    }
  )

  // Listen to changes in the location
  hashReader.subscribe((value) => {
      // stop hashWriter?
      hashReaderActive && parseHash()
      // start hashWriter?
  })

  // writeHash
  // set url fragment ID via svelte reactive assignment
  $: {
    
    hashReaderActive = false

    window.location.hash = [
      '#',
      
      nameFromN_url[origin] + arg_sep,
      // FIXME `nameFromN_url[origin]` is undefined

      nameFormat + arg_sep,
      
      groupFormat + arg_sep,
      
      (isMenuHidden|0),
        (isDark|0),
        (doAnimateDash|0),
        (showOddAngles|0),
        arg_sep,
      
      angle_id + arg_sep,

      // TODO save flip state = flip- x y d a

      locale + arg_sep,

      anim_dash_factor_key

    ].join('')
    console.log('done setting url')

    hashReaderActive = true
  }



  // TODO add more svg assets

  /*
  const asset_svg = preval(
    () => (
      require('fs')
      .readFileSync(
        'public/test-hands-long-or-broad.svg'
      ).toString()
      .replace(/^<\?xml[^>]*>/, '')
      .replace(/#000000/sg, 'var(--fg)')
      .replace(/#ffffff/sg, 'var(--bg)')
    )
  );
  */



  // TODO make fotoData editable

  // keep inlined images at end of script
  // for faster page loads

  let fotoData = preval(function(options) {

    // index 0 = foto url, index 1 = foto title
    let fotoData = Array.from(Array(16))
    .map(x => ['data:image/jpeg,', 'empty foto']);

    // body + element = asmg
    const C3 = 0b0000;
    const A3 = 0b0001;
    const C1 = 0b0010;
    const A1 = 0b0011;
    const C2 = 0b0100;
    const A2 = 0b0101;
    const C4 = 0b0110;
    const A4 = 0b0111;
    const B3 = 0b1000;
    const D3 = 0b1001;
    const B1 = 0b1010;
    const D1 = 0b1011;
    const B2 = 0b1100;
    const D2 = 0b1101;
    const B4 = 0b1110;
    const D4 = 0b1111;

    fotoData[D1] = ['/d1-bender.webp', 'Bender']; // D1 = fire father

    // south park
    fotoData[A1] = ['/a1-kenny.webp', 'Kenny']; // A1 = fire son
    fotoData[A2] = ['/a2-stan.webp', 'Stan']; // A2 = earth son
    fotoData[A3] = ['/a3-cartman.webp', 'Cartman']; // A3 = air son
    fotoData[A4] = ['/a4-kyle.webp', 'Kyle']; // A4 = water son
    fotoData[C3] = ['/c3-heidi-turner.webp', 'Heidi Turner']; // C3 = air daughter
    fotoData[B2] = ['/b2-sharon-marsh.webp', 'Sharon Marsh']; // B2 = earth mother

    // simpsons
    fotoData[C4] = ['/c4-lisa.webp', 'Lisa']; // C4 = water daughter
    fotoData[D2] = ['/d2-homer.webp', 'Homer']; // D2 = earth father
    fotoData[B1] = ['/b1-marge.webp', 'Marge']; // B1 = fire mother

    // american dad
    fotoData[B3] = ['/b3-francine.webp', 'Francine']; // B3 = air mother

    // family guy
    fotoData[D3] = ['/d3-peter.webp', 'Peter Griffin']; // D3 = air father
    fotoData[B4] = ['/b4-lois.webp', 'Lois Griffin']; // B4 = water mother
    fotoData[C2] = ['/c2-meg-griffin.webp', 'Meg Griffin']; // C2 = earth daughter

    // disenchantment
    fotoData[C1] = ['/c1-bean.webp', 'Bean']; // C1 = fire daughter
    fotoData[D4] = ['/d4-odval.webp', 'Odval']; // D4 = water father



    // inline images to javascript
    // TODO move to end of script for faster page load

    const fs = require('fs');
    const mime = require('mime-types');

    return fotoData.map(([file, name]) => {

      // options.baseDir is defined in rollup.config.js
      const file_abs = options.baseDir + '/src/images' + file;

      if (!fs.existsSync(file_abs)) {
        console.log('error: no such file: '+file_abs);
        console.log('baseDir: '+options.baseDir);
        return [file, name];
      }

      const file_type = mime.lookup(file_abs)
        || 'application/octet-stream';

      const base64data = fs.readFileSync(
        file_abs, {encoding: 'base64'}
      );

      const data_uri = 'data:'+file_type+';base64,'+base64data;

      //console.log('good: inlining file: '+file_abs+' as '+data_uri.substring(0,100)+' ....');

      return [data_uri, name];

    });

  });

  window.sourceCode = preval(
    ({baseDir}) => {
      const sourceFileĹist = [
        'src/AlchiMaps.svelte',
        'src/main.js',
        'src/alchi.js',
        'src/colorTable.cjs',
        'rollup.config.js',
        'package.json',
        'README.md',
        'LICENSE',
        'public/alchi-maps.html',
        'public/index.html',
      ];
      const fs = require('fs');
      return sourceFileĹist.reduce(
        (acc, sourceFile) => {
          acc[sourceFile] = fs.readFileSync(
            baseDir+'/'+sourceFile, {
            encoding: 'utf-8',
          });
          return acc;
        },
        {}
      );
    }
  );

</script>

<!--
  on:keydown={handleKeydown}
-->
<svelte:window
  on:load={handleWindowLoad}
/>

<!-- set css variables -->
<!-- TODO instead of $colors2dyn, use CSS transition for colors -->
<main style="
    --fg: {$colors2dyn[0]};

    --bg: {$colors2dyn[1]};
    --bg-alpha33: rgba({col_rgba33[1]});
  "><!--<div class="scroll">--><div>

  <!-- define svg symbols -->
  <svg style="display: none">

    <symbol id="element-and-pathos" viewBox="0 0 400 300">
      <!--
      <circle cx="50" cy="100" r="40" style="stroke: var(--fg)" />
      <rect x="50" y="150" width="20" height="20" style="stroke: var(--fg)" />
      -->

      <!-- svg path arc commands:
      A rx ry x-axis-rotation large-arc-flag sweep-flag x y
      a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
      -->

      <!--
      <g style="stroke: var(--fg); fill: none" >
        {#each Array.from(Array(10).keys()) as idx}
          <line x1="{idx*50}" x2="{idx*50}" y1="0" y2="300" />
        {/each}
        {#each Array.from(Array(10).keys()) as idx}
          <line x1="0" x2="400" y1="{idx*50}" y2="{idx*50}" />
        {/each}
      </g>
      -->

      <path d="
        M 10 150 
        a 20 20 0 0 1 40 0 
        a 20 20 0 0 1 40 0
        a 20 20 0 0 1 -20 20
        a 20 20 0 0 0 -20 20
        a 20 20 0 0 0 -20 -20
        a 20 20 0 0 1 -20 -20
        z
      " style="
        stroke: var(--fg); fill: red"/>


      <path d="
        M 10 50 
        a 20 20 0 0 1 40 0 
        a 20 20 0 0 1 40 0
        a 20 20 0 0 1 -40 0
        a 20 20 0 0 1 -40 0
        z
      " style="
        stroke: var(--fg); fill: none"/>

      <path d="
        M 10 250 
        a 20 20 0 0 1 20 -20 
        a 20 20 0 0 0 20 -20 
        a 20 20 0 0 0 20 20 
        a 20 20 0 0 1 20 20 
        a 20 20 0 0 1 -20 20 
        a 20 20 0 0 0 -20 20 
        a 20 20 0 0 0 -20 -20 
        a 20 20 0 0 1 -20 -20 
        z
      " style="
        stroke: var(--fg); fill: none"/>

      <path d="
        M 110 150 
        a 20 20 0 0 1 20 -20 
        a 20 20 0 0 0 20 -20 
        a 20 20 0 0 0 20 20 
        a 20 20 0 1 1 -20 20 
        a 20 20 0 0 1 -40 0 
        z
      " style="
        stroke: var(--fg); fill: green"/>

      <path d="
        M 110 50 
        a 20 20 0 0 1 40 0 
        a 20 20 0 0 1 40 0
        a 20 20 0 0 1 -40 0
        a 20 20 0 0 1 -40 0
        z
      " style="
        stroke: var(--fg); fill: none"/>

      <path d="
        M 110 250 
        a 20 20 0 0 1 20 -20 
        a 20 20 0 0 0 20 -20 
        a 20 20 0 0 0 20 20 
        a 20 20 0 0 1 20 20 
        a 20 20 0 0 1 -20 20 
        a 20 20 0 0 0 -20 20 
        a 20 20 0 0 0 -20 -20 
        a 20 20 0 0 1 -20 -20 
        z
      " style="
        stroke: var(--fg); fill: none"/>

      <path d="
        M 210 150 
        a 20 20 0 0 1 40 0 
        a 20 20 0 0 1 40 0
        a 20 20 0 0 1 -40 0
        a 20 20 0 0 1 -40 0
        z
      " style="
        stroke: var(--fg); fill: yellow"/>

      <path d="
        M 210 50 
        a 20 20 0 0 1 20 -20 
        a 20 20 0 0 0 20 -20 
        a 20 20 0 0 0 20 20 
        a 20 20 0 1 1 -20 20 
        a 20 20 0 0 1 -40 0 
        z
      " style="
        stroke: var(--fg); fill: none"/>

      <path d="
        M 210 250 
        a 20 20 0 0 1 40 0 
        a 20 20 0 0 1 40 0
        a 20 20 0 0 1 -20 20
        a 20 20 0 0 0 -20 20
        a 20 20 0 0 0 -20 -20
        a 20 20 0 0 1 -20 -20
        z
      " style="
        stroke: var(--fg); fill: none"/>


      <path d="
        M 310 150 
        a 20 20 0 0 1 20 -20 
        a 20 20 0 0 0 20 -20 
        a 20 20 0 0 0 20 20 
        a 20 20 0 0 1 20 20 
        a 20 20 0 0 1 -20 20 
        a 20 20 0 0 0 -20 20 
        a 20 20 0 0 0 -20 -20 
        a 20 20 0 0 1 -20 -20 
        z
      " style="
        stroke: var(--fg); fill: blue"/>

      <path d="
        M 310 50 
        a 20 20 0 0 1 20 -20 
        a 20 20 0 0 0 20 -20 
        a 20 20 0 0 0 20 20 
        a 20 20 0 1 1 -20 20 
        a 20 20 0 0 1 -40 0 
        z
      " style="
        stroke: var(--fg); fill: none"/>

      <path d="
        M 310 250 
        a 20 20 0 0 1 40 0 
        a 20 20 0 0 1 40 0
        a 20 20 0 0 1 -20 20
        a 20 20 0 0 0 -20 20
        a 20 20 0 0 0 -20 -20
        a 20 20 0 0 1 -20 -20
        z
      " style="
        stroke: var(--fg); fill: none"/>

    </symbol>

    <g id="pallas-sign-collection">

      <symbol id="pallas-sign-rotate7" viewBox="0 0 16 16">
        <!--
          <rect fill="#000000" x="0" y="0"
            width="16" height="16" style="fill: var(--bg)" />
        -->
        <g stroke-width="1.4" fill="none" style="stroke: var(--fg)">
          <!-- square -->
          <rect x="2" y="2" width="6" height="6" />
          <!-- cross -->
          <line x1="8" y1="8" x2="14" y2="14" />
          <line x1="8" y1="14" x2="14" y2="8" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate5" viewBox="0 0 16 16">
        <g stroke-width="1.4" fill="none" style="stroke: var(--fg)">
          <rect x="2" y="8" width="6" height="6" />
          <line x1="14" y1="8" x2="8" y2="2" />
          <line x1="14" y1="2" x2="8" y2="8" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate3" viewBox="0 0 16 16">
        <g stroke-width="1.4" fill="none" style="stroke: var(--fg)">
          <rect x="8" y="8" width="6" height="6" />
          <line x1="8" y1="8" x2="2" y2="2" />
          <line x1="8" y1="2" x2="2" y2="8" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate1" viewBox="0 0 16 16">
        <g stroke-width="1.4" fill="none" style="stroke: var(--fg)">
          <rect x="8" y="2" width="6" height="6" />
          <line x1="8" y1="14" x2="2" y2="8" />
          <line x1="8" y1="8" x2="2" y2="14" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate0" viewBox="0 0 16 16">
        <g stroke-width="1" fill="none" style="stroke: var(--fg)">
          <path d="M 8 8 l 3 -3 l -3 -3 l -3 3 z" />
          <line x1="8" y1="8" x2="8" y2="14" />
          <line x1="5" y1="11" x2="11" y2="11" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate2" viewBox="0 0 16 16">
        <g stroke-width="1" fill="none" style="stroke: var(--fg)">
          <path d="M 11 11 l 3 -3 l -3 -3 l -3 3 z" />
          <line x1="8" y1="8" x2="2" y2="8" />
          <line x1="5" y1="5" x2="5" y2="11" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate4" viewBox="0 0 16 16">
        <g stroke-width="1" fill="none" style="stroke: var(--fg)">
          <path d="M 8 14 l 3 -3 l -3 -3 l -3 3 z" />
          <line x1="8" y1="8" x2="8" y2="2" />
          <line x1="5" y1="5" x2="11" y2="5" />
        </g>
      </symbol>

      <symbol id="pallas-sign-rotate6" viewBox="0 0 16 16">
        <g stroke-width="1" fill="none" style="stroke: var(--fg)">
          <path d="M 5 11 l 3 -3 l -3 -3 l -3 3 z" />
          <line x1="8" y1="8" x2="14" y2="8" />
          <line x1="11" y1="11" x2="11" y2="5" />
        </g>
      </symbol>
    </g>

    <g id="arrow-collection">
      <symbol id="circle-arrow-left" viewbox="0 -10 100 110">
        <path d="m 20 80 A 40 40 0 1 0 20 20"
          fill="none" stroke-width="10"
          style="stroke: var(--fg)" />
        <path d="M 10 0 v 40 h 40"
          style="fill: var(--fg)" />
      </symbol>
      
      <symbol id="line-arrow-left" viewbox="0 0 100 100">
        <line x1="25" x2="90" y1="50" y2="50"
          style="stroke: var(--fg)"
          stroke-width="10"
        />
        <path d="M 40 20 L 10 50 L 40 80"
          style="fill: var(--fg)"
        />
      </symbol>
      
      <symbol id="line-arrow-horiz" viewbox="0 0 100 100">
        <line x1="25" x2="75" y1="50" y2="50"
          style="stroke: var(--fg)"
          stroke-width="10"
        />
        <path d="M 30 25 L 10 50 L 30 75"
          style="fill: var(--fg)"
        />
        <path d="M 70 25 L 90 50 L 70 75"
          style="fill: var(--fg)"
        />
      </symbol>
    </g>

    <g id="symbol-collection">
      <symbol id="light-sun" viewbox="0 0 100 100">
        <g style="stroke: var(--fg)" stroke-width="8">
          <line x1="5" y1="50" x2="95" y2="50" />
          <line y1="5" x1="50" y2="95" x2="50" />
          <line x1="18.2" y1="18.2" x2="81.8" y2="81.8" />
          <line x1="18.2" y1="81.8" x2="81.8" y2="18.2" />
          <circle cx="50" cy="50" r="20" style="fill: var(--bg)"/>
        </g>
      </symbol>

      <symbol id="menu" viewbox="0 0 100 100">
        <g style="stroke: var(--fg)" stroke-width="8">
          <line x1="15" x2="85" y1="25" y2="25" />
          <line x1="15" x2="85" y1="50" y2="50" />
          <line x1="15" x2="85" y1="75" y2="75" />
        </g>
      </symbol>

      <symbol id="stop" viewbox="0 0 100 100">
        <g fill="none" stroke="var(--fg)" stroke-width="8">
          <rect x="20" y="20" width="60" height="60" />
        </g>
      </symbol>

      <symbol id="play" viewbox="0 0 100 100">
        <g fill="none" stroke="var(--fg)" stroke-width="8">
          <path d="M 20,20 L 80,50 L 20,80 z" />
        </g>
      </symbol>

      <symbol id="odd-hide" viewbox="0 0 100 100">
        <g fill="none" stroke="var(--fg)" stroke-width="8">
          <!--<path d="M 10 50 L 50 10 L 90 50 L 50 90 z" />-->
          <path d="
            M 20 40 L 40 20
            M 60 20 L 80 40
            M 80 60 L 60 80
            M 40 80 L 20 60
          " />
        </g>
      </symbol>

      <symbol id="odd-show" viewbox="0 0 100 100">
        <g fill="none" stroke="var(--fg)" stroke-width="8">
          <path d="M 20 50 L 50 20 L 80 50 L 50 80 z" />
        </g>
      </symbol>

      <symbol id="export" viewbox="0 0 100 100">
        <g fill="none" stroke="var(--fg)" stroke-width="8">
          <path d="M 50 20 V 80 M 20 50 L 50 80 L 80 50 M 20 90 H 80" />
        </g>
      </symbol>
    </g>

  </svg>


  <!-- control menu -->
  <!-- TODO add buttons to zoom ? -->
  <!-- empty comments to avoid white space. TODO better? -->

  <!-- handle collapse/expand in html
    class:collapsed="{isMenuHidden}"
  -->

  <div class="control scroll" id="control0">

    <div class="nohide"><!--
   --><button
          id="menuBtn"
          on:click="{changeMenu}" class="square nohide"
        ><svg>
          <title>Menu [ M ]</title>
            <use xlink:href="#menu" />
        </svg><!--
   --></button><!--
   --><button
          on:click="{changeDark}" class="square"
        ><svg>
          <title>Light / Dark [ L ]</title>
          <use xlink:href="#light-sun" />
        </svg><!--
   --></button><!--
   --><button
          on:click="{changeAnim}" class="square"
        ><svg>
          <title>Animation {doAnimateDash ? 'Stop' : 'Start'}</title>
          <use xlink:href="#{doAnimateDash ? 'stop' : 'play'}" />
        </svg><!--
   --></button><!--
   - TODO restore -><button
        on:click={changeExpand} class="square"
      >&ndash;</button><!- -
 --></div><!--

 --><div class="collapse"><!--
   --><div class="content"><!--

     --><div class="head" style="margin-bottom: 16px"><!--
          -->

          <button
              on:click="{()=>{showOddAngles = !showOddAngles}}" class="square"
            ><svg>
              <title>{showOddAngles ? 'Hide' : 'Show'} odd angles</title>
              <use xlink:href="#{showOddAngles ? 'odd-hide' : 'odd-show'}" />
            </svg>
          </button><!--

       --><button
              on:click="{exportSvg}" class="square"
            ><svg>
              <title>Export SVG Image</title>
              <use xlink:href="#export" />
            </svg>
          </button><!--

       --><div class="square" /><!--

       --><button
            on:click={changeExpand}
            class="square"
            title="show/hide transforms"
          >&ndash;</button><!--
     
     --></div><!--

     --><div class="body"><!--

       --><div><!--
         --><button
                on:click="{moveUp}" class="square"
              ><svg style="transform: rotate(90deg)">
                <title>Move Up [ E ] [ Up ]</title>
                <use xlink:href="#line-arrow-left" />
              </svg><!--
         --></button><!--
         --><button
              on:click="{moveLeft}" class="square">
              <svg>
                <title>Move Left [ S ] [ Left ]</title>
                <use xlink:href="#line-arrow-left" />
              </svg><!--
         --></button><!--
         --><button
                on:click="{moveDown}" class="square"
              ><svg style="transform: rotate(270deg)">
                <title>Move Down [ D ] [ Down ]</title>
                <use xlink:href="#line-arrow-left" />
              </svg><!--
         --></button><!--
         --><button
                on:click="{moveRight}" class="square"
              ><svg style="transform: rotate(180deg)">
                <title>Move Right [ F ] [ Right ]</title>
                <use xlink:href="#line-arrow-left" />
              </svg><!--
         --></button><!--
       --></div><!--

       --><div class="last-row"><!--
         --><button
                on:click="{rotateRight}" class="square"
              ><svg style="transform: scale(-1, 1)">
                <title>Rotate Right [ R ] [ Shift + Up ]</title>
                <use xlink:href="#circle-arrow-left" />
              </svg><!--
         --></button><!--
         --><button
                on:click="{rotateLeft}" class="square"
              ><svg>
                <title>Rotate Left [ W ] [ Shift + Left ]</title>
                <use xlink:href="#circle-arrow-left" />
              </svg><!--
         --></button><!--
         --><button
                on:click="{flipY}" class="square"
              ><svg style="transform: rotate(90deg)">
                <title>Flip Vertical [ G ] [ Shift + Down ]</title>
                <use xlink:href="#line-arrow-horiz" />
              </svg><!--
         --></button><!--
         --><button
              on:click="{flipX}" class="square">
              <svg>
                <title>Flip Horizontal [ A ] [ Shift + Right ]</title>
                <use xlink:href="#line-arrow-horiz" />
              </svg><!--
         --></button><!--
       --></div><!--
      
     --></div><!--
   --></div><!--

    --></div><!--

    - -><div class="expand uppercase">
    --><div class="expand">
      <!-- todo avoid repeat, use a loop, or better: use components -->
      <div class="content">
        <div class="head">
          <input
            id="inf" title="Name Format = Shape"
            type="text"
            bind:value="{nameFormat}"
            on:keyup="{change_nameFormat}"
          /><button
            on:click={changeExpand}
          >+</button>
        </div>
        <div class="body scroll" data-height="10em">
          {#each Object.entries(nameFormatPresets) as [n, t]}
            <button on:click={setNamePreset} title={t}>{n}</button>
          {/each}
        </div>
      </div>
    </div><!--



    -->{#if false}

      <!-- groupFormat selector -->

      <div class="expand uppercase">
        <!--
        TODO why no bottom-border on second text input ?
        bottom-border is missing in expanded menu
        but not in the first menu .... what?
        -->
        <div class="content">
          <div class="head">
            <input
              id="igf" title="Group Format = Color"
              type="text"
              bind:value="{groupFormat}"
              on:keyup="{change_groupFormat}"
            /><button
              on:click={changeExpand}
            >+</button>
          </div>
          <div class="body scroll" data-height="10em">
            {#each Object.entries(groupFormatPresets) as [n, t]}
              <button on:click={setGroupPreset} title={t}>{n}</button>
            {/each}
          </div>
        </div>
      </div>

    {/if}<!--

    --><div class="expand">
      <!-- todo avoid repeat, use a loop, or better: use components -->
      <div class="content">
        <div class="head">
          <input
            readonly
            title="Local Language"
            bind:value="{localeName[locale]}"
          /><button
            on:click={changeExpand}
          >+</button>
        </div>
        <div class="body scroll" data-height="10em">
          {#each Object.keys(localeName) as l}
            <button
              on:click={()=>setLocale(l)}
              title="{l} = {localeName[l]}"
            >{localeName[l]}</button>
          {/each}
        </div>
      </div>
    </div><!--

    --><div class="numbtn first-row">
      {#each Object.keys(anim_dash_factor_presets) as n}
        <button on:click={()=>{anim_dash_factor_key = n}}>{n}</button>
      {/each}
    </div>

  </div><!-- close #control0 -->

<!--
  keydown comes before keyup
  keyup = value has changed
  keydown = value has "maybe" changed
-->

<!-- #wrapper for alcimaps TODO rename -->
<!--
  TODO svelte: attribute "on:keydown"
    only working for <svelte:window> tag?
    on:keydown={handleKeydown}
-->
<div
  id="wrapper"
  class:animate_dash="{doAnimateDash}"
  class:animate_moves="{doAnimateMoves}"
  style="

    /* set css variables */

    --fg: {$colors2dyn[0]};
    --bg: {$colors2dyn[1]};

    --angle: {angle[0]}deg;
    --angleBack: {angle[1]}deg;
  "
>



<!-- TODO move controls out of move-container -->

<!--
  tabindex="-1"
  allow to handle keydown events on a div
  https://stackoverflow.com/questions/51267273
-->

<div id="transform-mask"
  tabindex="-1"
  style="
    width: {width}px;
    height: {height}px;

    overflow: hidden;
    margin: auto; /* center */
  "
>

<div id="transform-move"
  style="
    will-change: transform;
    
    transform:
      translate(
        {moveEvent.clientX}px,
        {moveEvent.clientY}px
      )
      ;
  "
>

<div id="transform-down"
  style="
    /*will-change: transform; no need for accel */
    
    transform:
      translate(
        {-1*moveStartEvent.clientX}px,
        {-1*moveStartEvent.clientY}px
      )
      ;

  "
>

<div id="transform-rotate"
  style="
    will-change: transform;

    /* TODO verify */
    /*transform-origin: {0.5*width}px {1.5*height}px;*/
    transform-origin: {0.5*width}px {1.5*height}px;
    
    transform: rotate( var(--angle) );
  "
>

<div id="transform-translate"
  style="
    will-change: transform;

    /* center bias */
    margin-left: {-1*width}px;
    margin-top: {-1*height}px;

  "
>

<!--
    viewbox="
      {-gridPadding}
      {-gridPadding}
      {3*width_in +2*gridPadding}
      {3*height_in+2*gridPadding}
    "
-->

  <!-- #content -->
  <svg id="content"

    width="{3*width}px"
    height="{3*height}px"

    viewbox="{svg_viewbox.join(' ')}"

    style="

/* TODO revoke transforms? */

      /* TODO variable */
      /*transform-origin: {1.5*width}px {1.5*height}px;*/
      /*
        transform-origin:
          {1.5*width }px
          {1.5*height}px
        */
        /*
        {1.5*width -translate_x}px
        {1.5*height-translate_y}px
        {1.5*width -translate_origin_x}px
        {1.5*height-translate_origin_y}px
        */
        /*
          ;
      */

      /* translate_x */

    "
  >
    <defs>

      <!--
        x="{$patternPos[0]}"
        y="{$patternPos[1]}"
      -->

      <!-- background lines of "same class" -->
      <pattern id="same_class_lines"
        width="800" height="800"
        patternUnits="userSpaceOnUse"
        >
        <g style="stroke: var(--fg)" stroke-width="8" fill="none">

          <!-- diff class cross -->
          <line x1="500" y1="500" x2="300" y2="300" />
          <line x1="500" y1="300" x2="300" y2="500" />

          <line x1="0" y1="0" x2="100" y2="100" />
          <line x1="800" y1="800" x2="700" y2="700" />
          <line x1="0" y1="800" x2="100" y2="700" />
          <line x1="800" y1="0" x2="700" y2="100" />

          <line x1="400" y1="0" x2="300" y2="100" />
          <line x1="400" y1="0" x2="500" y2="100" />

          <line x1="400" y1="800" x2="300" y2="700" />
          <line x1="400" y1="800" x2="500" y2="700" />

          <line x1="0" y1="400" x2="100" y2="300" />
          <line x1="0" y1="400" x2="100" y2="500" />

          <line x1="800" y1="400" x2="700" y2="300" />
          <line x1="800" y1="400" x2="700" y2="500" />

          <!-- same class square 1 -->
          <rect x="100" y="100" width="200" height="200" 
            class="anim_dash1"
            style="stroke-dashoffset: {anim_dash_factor[0]*anim_dash_offset}"
          />

          <!-- same class square 2 -->
          <rect x="500" y="100" width="200" height="200" 
            class="anim_dash2"
            style="stroke-dashoffset: {anim_dash_factor[1]*anim_dash_offset}"
          />

          <!-- same class square 3 -->
          <rect x="100" y="500" width="200" height="200" 
            class="anim_dash1"
            style="stroke-dashoffset: {anim_dash_factor[2]*anim_dash_offset}"
          />

          <!-- same class square 4 -->
          <rect x="500" y="500" width="200" height="200" 
            class="anim_dash2"
            style="stroke-dashoffset: {anim_dash_factor[3]*anim_dash_offset}"
          />

        </g>
      </pattern>
    </defs>

    <rect id="bg-pattern"
      x="0" y="0"
      width="{3*width_in}" height="{3*height_in}"
      fill="url(#same_class_lines)"
      style="
        /*
          transition: transform .5s linear;
        */
      "
      transform-origin="center"
    />

    <!-- center marker -->
    <!-- - ->
    <rect
      x="{1.25*width_in}" y="{1.25*height_in}"
      width="{0.5*width_in}" height="{0.5*height_in}"
      stroke="green"
      stroke-width="4"
      fill="none"
      />
    <!- - -->

<!-- have both pattern and bodies in one <svg>

  </svg>
</div>

<div
  id="panzoom-wrapper"
  style="
    /* overlay over background div */
    margin-top: -{height}px;
  "
>
<svg id="panzoom"

  width="{width}px"
  height="{height}px"

  viewbox="
    0
    0
    {width_in}
    {height_in}
  "
>
-->

<!--
<g id="panzoom-viewport">
-->

  <!-- grid of bodies -->
  <g
    id="grid_wrap"
    style="

      padding: 2px; /* TODO remove? */

      height: {height}px;
      width: {width}px;
      overflow: hidden;
      /*margin: auto; /* center */

      /* debug
        border: solid 1px green;
      */
      
      /* move to center */
      /** /
      transform:
        translateX({+1*width}px)
        translateY({+1*height}px)
        ;
      /**/
      transform:
        /* move to center */
        translateX({width_in}px)
        translateY({height_in}px)
        ;

    "
  >


<!--
    <rect
      id="bg-pattern"
      x="0" y="0"
      width="{3*width_in}" height="{3*height_in}"
      fill="url(#same_class_lines)"
      style="
        /*
          transition: transform .5s linear;
        */
      "
      transform-origin="center"
    />

      "

cannot rotate <g> around center?

-->

<!--
    <svg id="grid"
      width="{width_in}" height="{height_in}"
      class:animate="{doAnimateDash}"
      viewbox="
        0
        0
        {width_in}
        {height_in}
      "
      style="

        position: relative;
        transform:
          /*
          translateX( var(--translateGridX) )
          translateY( var(--translateGridY) )
          */
          translateX({pos[0][1]-gridPadding})
          translateY({pos[1][1]-gridPadding})

          /* FIXME make this work again */
          /* broken with panzoomrotate wrapper */
          rotate( var(--angle) )



        ;
        transform-origin: center;
    ">

-->

      <!--
          transform:
          
          /* center */
          /** /
          translateX({+1*width}px)
          translateY({+1*height}px)
          /**/


          translateX({pos[0][1]-gridPadding}px)
          translateY({pos[1][1]-gridPadding}px)



          /* TODO remove this scale factor
            synchronize coordinate systems */

          translateX({-2.66*moveEndEvent.clientX}px)
          translateY({-2.66*moveEndEvent.clientY}px)

          translateX({-2.66*moveStartEvent.clientX}px)
          translateY({-2.66*moveStartEvent.clientY}px)

          translateX({2.66*moveEvent.clientX}px)
          translateY({2.66*moveEvent.clientY}px)



          rotate3d(0,0,+1, {-1*rotateEventRightEnd.clientX}deg)
          rotate3d(0,0,-1, {-1*rotateEventLeftEnd.clientX}deg)
          
          rotate3d(0,0,+1, {-1*rotateEventRightStart.clientX}deg)
          rotate3d(0,0,-1, {-1*rotateEventLeftStart.clientX}deg)

          rotate3d(0,0,+1, {rotateEventRight.clientX}deg)
          rotate3d(0,0,-1, {rotateEventLeft.clientX}deg)

          /*
          scaleX({scaleFactor[0]})
          scaleY({scaleFactor[1]})
          */

          rotate3d(1,0,0, {gridRotate3D[0]}deg)

          rotate( var(--angle) )
        ;
        transform-origin: center;
      -->

    <g id="grid"
      style="

        /*position: relative;*/


      "
    >

      <defs>

        <clipPath id="clip_circle">
          <circle cx="100" cy="100" r="80" />
        </clipPath>

        <!--
          multiply is a nice and useful one, 
          but there is also: 
          screen, overlay, darken, lighten, 
          color-dodge, color-burn, hard-light, 
          soft-light, difference, exclusion, 
          hue, saturation, color, and luminosity. 
          And also normal which reset it.
        -->

        <!-- filters to colorize images -->
        {#each colorTable[16] as [fg, bg]}
          <filter id="spotlight-{fg.substring(1)}">
            <feFlood result="floodFill"
              x="0" y="0" width="100%" height="100%"
              flood-color="{fg}" flood-opacity="1"
            />
            <!--
              <feBlend mode="multiply" in="SourceGraphic" in2="floodFill" />
              <feBlend mode="color-burn" in="SourceGraphic" in2="floodFill" />
              <feBlend mode="hard-light" in="SourceGraphic" in2="floodFill" />
              <feBlend mode="luminosity" in="SourceGraphic" in2="floodFill" />
            -->
            <feBlend mode="luminosity" in="SourceGraphic" in2="floodFill" />
          </filter>
        {/each}



        <!-- TODO pattern offset relative to view? -->
        <!--
          x="300" y="300"
          x="{flipIn[0] * ($patternPos[0] + 100)}"
          y="{flipIn[1] * ($patternPos[1] + 100)}"

          x="{flipIn[0] * ($patternPos[0])}"
          y="{flipIn[1] * ($patternPos[1])}"

          x="{$patternPos[0]}"
          y="{$patternPos[1]}"



        -->


        <marker id="arrowhead" orient="auto"
          markerWidth="2" markerHeight="4"
          refX="0.1" refY="2">
          <!-- triangle pointing right (+x) -->
          <path d="M0,0 V4 L2,2 Z" fill="black" />
        </marker>



        <radialGradient id="circle_double_stroke">
          <stop id="a" offset="99%" style="stop-color: var(--bg)"/>
          <stop id="b" offset="90%" style="stop-color: var(--fg)"/>
        </radialGradient>



        <!-- define custom symbols for zodiac signs
          cos android shows utf8 zodiac signs
          only in orange color -->

        <symbol id="gemini" class="zodiac mutable air" viewbox="0 0 100 100">
          <path d="M 32,20 V 80 M 68,20 V 80 M 5 10 A 150 150 0 0 0 95 10 M 5 90 A 150 150 0 0 1 95 90" />
        </symbol>

        <symbol id="taurus" class="zodiac fixed earth" viewbox="0 0 100 100">
          <circle cx="50" cy="60" r="30" />
          <path d="M 10 10 A 50 50 0 0 0 90 10" />
        </symbol>

        <symbol id="aries" class="zodiac cardinal fire" viewbox="0 0 100 100">
          <path d="M 5,40 C 45,-50 50,95 50,95 50,90 55,-50 95,40" />
        </symbol>

        <symbol id="cancer" class="zodiac cardinal water" viewbox="0 0 100 100">
          <circle cx="20" cy="50" r="15" />
          <circle cx="80" cy="50" r="15" />
          <path d="M 5,50 C 5,20 50,5 80,10 M 95,50 C 95,80 50,95 20,90" />
        </symbol>

        <symbol id="pisces" class="zodiac mutable water" viewbox="0 0 100 100">
          <path d="M 5 5 A 50 50 0 0 1 5 95 M 95 5 A 50 50 0 0 0 95 95 M 15,50 H 85" />
        </symbol>

        <symbol id="aquarius" class="zodiac fixed air" viewbox="0 0 100 100">
          <path d="M 10,35 L 30,15 50,35 70,15 90,35 M 10,85 L 30,65 50,85 70,65 90,85" />
        </symbol>

        <symbol id="sagittarius" class="zodiac mutable fire" viewbox="0 0 100 100">
          <path d="M 10,90 L 90,10 M 50,10 L 90,10 90,50 M 10,40 L 60,90" />
        </symbol>

        <symbol id="libra" class="zodiac cardinal air" viewbox="0 0 100 100">
          <line x1="0" x2="100" y1="75" y2="75" />
          <path d="M 0,50 H 30 A 23 23 0 1 1 70,50 H 100" />
        </symbol>

        <symbol id="leo" class="zodiac fixed fire" viewbox="0 0 100 100">
          <circle cx="27" cy="60" r="20" />
          <path d="M 45,51 C 10,-10 130,0 80,60 C 57,90 90,90 100,90" />
        </symbol>

        <symbol id="scorpius" class="zodiac fixed water" viewbox="0 0 100 100">
          <path d="M -10,30 A 10 10 0 0 1 15,30 V 75 M 15,30 A 10 10 0 0 1 40,30 V 75 M 40,30 A 10 10 0 0 1 65,30 V 30 C 65,70 80,85 90,90 M 95,50 V 95 H 50" />
        </symbol>

        <symbol id="virgo" class="zodiac mutable earth" viewbox="0 0 100 100">
          <path d="M -10,30 A 10 10 0 0 1 15,30 V 75 M 15,30 A 10 10 0 0 1 40,30 V 75 M 40,30 A 10 10 0 0 1 65,30 V 30 C 65,70 80,85 95,90 M 55,95 L 95,55" />
        </symbol>

        <symbol id="capricorn" class="zodiac cardinal earth" viewbox="0 0 100 100">
          <path d="M -20,30 A 10 10 0 0 1 20,30 V 65 M 20,30 A 10 10 0 0 1 55,30 V 70 A 18 18 0 1 0 62,56 L 25,95" />
        </symbol>

      </defs>



      <!-- background circle for doingRotate == true -->
      <circle cx="{width_in/2}" cy="{height_in/2}"
        r="{height_in/2*Math.sqrt(2)}"
        stroke="var(--fg)" stroke-width="2"
        fill="none"
        visibility="{doingRotate ? 'visible' : 'hidden'}"
        style="
          /**/
            transform:
              translateX({-1*scale_in*translate_x}px)
              translateY({-1*scale_in*translate_y}px)
            ;
          /**/
        "
      />



      <!-- TODO switch numBodies 11 or 16 -->
      <!-- (x, y) dont move the pattern, only translate does -->

      <!-- center pattern at center body -->

      <!--
            transform: rotate3d({patternRotate3D[0]}, {patternRotate3D[1]}, {patternRotate3D[2]}, {patternRotate3D[3]}deg);

            rotateY({patternRotate[0]}deg)
            rotate3d(1,1,0,{patternRotate[1]}deg)
            rotateX({patternRotate[2]}deg)
            rotate3d(1,-1,0,{patternRotate[3]}deg)
            rotate3d(-1,1,0,{patternRotate[4]}deg)
            rotate3d(-1,-1,0,{patternRotate[5]}deg)

      -->

      <!-- TODO why are all bodies offset by 4 pixels? -->

      <!--
        <svg>
          <rect
            x="0" y="0"
            width="800" height="800"
            fill="url(#same_class_lines)"
            style="
              transition: transform .5s linear;
            "
            transform-origin="400 400"
          />
        </svg>
      -->

      <!--
        transform="scale({$patternScale[0]}, {$patternScale[1]})"
        transform="scale({$patternScale[0]}, {$patternScale[1]})"
        clip-path="url(#clip_scl)"
      -->

      {#if console.log(`render grid`)}<!-- noop -->
      {/if}

      {#each yRange.map((y) => [y, y%4, (y%4)*4])
        as [y, y4, yIdx]
      }
        {#each xRange.map((x) => {

            const x4 = x%4
            const idx = yIdx+x4
            const num = matrix[idx]
            const grp = groupFromN ? groupFromN[num] : 0

            // pathos = next plus one
            const num_p1 = matrix[yIdx+((x+2)%4)]
            const num_p2 = matrix[((y+2)%4)*4+x4]

            const sm = (num & 0b0110) >> 1
            const sm_p1 = (num_p1 & 0b0110) >> 1
            const sm_p2 = (num_p2 & 0b0110) >> 1

            const ag = ((num & 0b1000) >> 2) | (num & 0b0001)
            
            const a = num >> 3 & 1
            const s = num >> 2 & 1
            const m = num >> 1 & 1
            const g = num      & 1

            //console.log(`a, s, m, g = ${a} ${s} ${m} ${g}`)

            //const [nump1, nump2] = alchi.N_pathosFromN[num]

            //console.log('idx '+idx+' --> pathos '+(yIdx+((x+2)%4))+' '+(((y+2)%4)*4+x4))

            //console.log(`x ${x} y ${y} x4 ${x4} y4 ${y4} idx ${idx} num ${num}`)

            // TODO use object instead of array
            //   object is easier to maintain

            return [y, x, y*200, x*200, y%4, x4, idx, num, num_p1, num_p2, sm, ag, a, s, m, g, sm_p1, sm_p2]
          })
          as [y, x, yPos, xPos, y4, x4, idx, num, num_p1, num_p2, sm, ag, a, s, m, g, sm_p1, sm_p2]
        }

          {#if bodiesMask === 1 || bodiesMask[x][y] === 1}
            <!-- workaround for chrome, to transform nested svg -->
            <g
              class="body_wrapper"
              style="
                transform:
                  translateX({bodyPosStatic[x][y][0]}px)
                  translateY({bodyPosStatic[x][y][1]}px)

                  rotate3d(0,1,0, {gridRotate3DBodies[0]}deg)
                ;
                transform-origin: 100px 100px;
              "
            >

              <!-- get visible position -->
              <!--
              posInFromOut[x][y] === [2, 2]
              class="body{(x==2&&y==2)?' center':''}"
              -->


              <!--
                class="body{isCenter(x, y) ? ' center':''}"
              -->



              <!-- TODO is this efficient?
                handle "centerBody" state
                  {centerBody.equals([x, y]) ? ' center':''}
                ideally we only need two operations:
                  1. unfocus last centerBody
                  2. focus new centerBody
                "focus" means: add CSS class "center"
              -->




<!--
                on:click="{(event)=>handleClickBody(event, x, y, num, idx)}"
                on:dblclick="{(event)=>handleDoubleClickBody(event, x, y, num, idx)}"
-->

              <svg
                class="body"
                class:center="{centerBody.equals([x, y])}"
                x="0" y="0"
                width="200" height="200"
                on:click="{(event)=>handleClickBody(event, x, y, num, idx)}"
              >

                {#if showPathos}

                  {#each ([
                    [0, sm_p1, num_p1],
                    [1, sm_p1, num_p1],
                    [2, sm_p2, num_p2],
                    [3, sm_p2, num_p2]
                  ]) as [id_p, sm_p, num_p]}

                    <circle
                      r="30" cx="{pathosPos[id_p][0]}" cy="{pathosPos[id_p][1]}"
                      fill="{groupColor[groupFromN[num_p]][0]}"
                      stroke="{groupColor[groupFromN[num_p]][1]}"
                      stroke-width="{numGroups === 2 ? 1 : 0}"
                    ><title>.... plays {pathosFromSM[sm][sm_p][0][1]}</title></circle>


                    {#if nameFormat === 'zodiac'}

                      <!-- TODO handle "name is image filename"
                        = south park, simpsons, etc.
                      -->

                      <!-- name is symbol id -->
                      <use 
                        xlink:href="#{pathosFromSM[sm][sm_p][0][0]}"
                        stroke="{groupColor[groupFromN[num_p]][1]}"
                        x="{pathosPos[id_p][0]-20}" y="{pathosPos[id_p][1]-20}"
                        width="40" height="40"
                        style="
                          transform-origin: {pathosPos[id_p][0]}px {pathosPos[id_p][1]}px;
                          transform: rotate( var(--angleBack) );
                          transition: transform .5s cubic-bezier(0.445, 0.050, 0.550, 0.950);
                        "
                      ><title>.... plays {pathosFromSM[sm][sm_p][0][1]}</title></use>

                    {:else}

                      <text
                        x="{pathosPos[id_p][0]}" y="{pathosPos[id_p][1]}"
                        width="100" height="100"
                        style="
                          font-size: 40px;
                          transform-origin: {pathosPos[id_p][0]}px {pathosPos[id_p][1]}px;
                          transform: rotate( var(--angleBack) );
                          transition: transform .5s cubic-bezier(0.445, 0.050, 0.550, 0.950);
                        "
                        fill="{groupColor[groupFromN[num_p]][1]}"
                        alignment-baseline="mathematical"
                        text-anchor="middle"
                      ><title>.... plays {pathosFromSM[sm][sm_p][0][1]}</title><tspan
                        dominant-baseline="central"
                      >{pathosFromSM[sm][sm_p][0][0]}</tspan></text>
                    <!--
                      >{pathosFromSM[sm][sm_p][0][0]}</tspan></text>
                                               | -->
                      <!--                     | -->
                      <!-- TODO why idx 0 ? ---+ -->

                      <!-- TODO translate ".... plays ${pathos}" -->

                    {/if}
                  
                  {/each}

                  <!-- center color -->
                  <circle
                    r="36" cx="100" cy="100"
                    fill="{groupColor[groupFromN[num]][0]}"
                    stroke="{groupColor[groupFromN[num]][1]}"
                    stroke-width="{numGroups===2 ? 1 : 0}"
                  ><title>{nameFromN[num][0][1]}</title></circle>

                {:else}
                
                  <!-- TODO remove groupFormat -->

                  {#if groupFormat !== '+'}

                    <!-- big circle for showPathos == false -->

                    <g
                      class="rotateBack"
                      style="
                        transform: rotate( var(--angleBack) );
                        transform-origin: 100px 100px;

                        
                        /* TODO activate only for 'click to move'
                        transition: transform .5s cubic-bezier(0.445, 0.050, 0.550, 0.950);
                        */
                      "
                    >



                      {#if nameParts === 1}

                        <circle
                          r="75" cx="100" cy="100"
                          fill="{groupColor[groupFromN[num]][0]}"
                          stroke="{groupColor[groupFromN[num]][1]}"
                          stroke-width="{numGroups===2 ? 1 : 0}"
                        ><title>{nameFromN[num][1]}</title></circle>



                      {:else if nameParts === 2 && nameFormat == 'e/b'}

                        <!-- top half = sense + move = element, soul, inside --->
                        <!-- height 82, cos height 80 leaves a small gap -->
                        <path d="M 20 102 v -62 a 20 20 0 0 1 20 -20 h 120 a 20 20 0 0 1 20 20 v 62 z"
                          fill="{valColor.sm[sm][0]}"
                        />

                        <!-- bottom half = age + gender = body, surface, outside --->
                        <path d="M 20 100 v 60 a 20 20 0 0 0 20 20 h 120 a 20 20 0 0 0 20 -20 v -60 z"
                          fill="{valColor.ag[ag][0]}"
                        />



                      {:else if nameParts === 2 && nameFormat == 'e/bxinout'}

                        <!-- outside = age + gender = body, surface, outside --->
                        <path d="M 20 100 v 60 a 20 20 0 0 0 20 20 h 120 a 20 20 0 0 0 20 -20 v -120 a 20 20 0 0 0 -20 -20 h -120 a 20 20 0 0 0 -20 20 z"
                          fill="{valColor.ag[ag][0]}"
                        />

                        <!-- inside -->
                        <!-- top half = sense + move = element, soul, inside --->
                        <!-- height 82, cos height 80 leaves a small gap -->
                        <path d="M 30 70 v -30 a 10 10 0 0 1 10 -10 h 120 a 10 10 0 0 1 10 10 v 50 a 10 10 0 0 1 -10 10 h -120 a 10 10 0 0 1 -10 -10 z"
                          fill="{valColor.sm[sm][0]}"
                          stroke="{valColor.sm[sm][1]}"
                          stroke-width="{sm === ag ? 2 : 0}"
                        />



                      {:else if nameParts === 2 && nameFormat == 'be'}

                        <!-- left = body --->
                        <!-- width 80 + 1 to fill gap -->
                        <rect x="20" y="20" width="81" height="160"
                          fill="{valColor.ag[ag][0]}"
                        />
                        
                        <!-- right = element --->
                        <rect x="100" y="20" width="80" height="160"
                          fill="{valColor.sm[sm][0]}"
                        />



                      {:else if nameParts === 2 && nameFormat == 'e/bxfoto'}

                        <!-- left = foto -->
                        <!-- width +10 to overpaint right stroke -->
                        <rect x="21" y="21" width="129" height="158"
                          stroke="var(--fg)"
                          stroke-width="2"
                        />
                        <!-- outer frame = body -->
                        <!-- stroke-width +2 to fill gap -->
                        <!--
                          <rect x="23" y="23" width="115" height="154"
                            stroke="{valColor.ag[ag][0]}"
                            stroke-width="6"
                          />
                        -->
                        <!-- inner frame = element -->
                        <!--
                          <rect x="26" y="26" width="108" height="148"
                            stroke="{valColor.sm[sm][0]}"
                            stroke-width="4"
                          />
                        -->

                        <!-- top = element --->
                        <rect x="140" y="20" width="40" height="81"
                          fill="{valColor.ag[ag][0]}"
                        />

                        <!-- bottom = body --->
                        <!-- width 80 + 1 to fill gap -->
                        <rect x="140" y="100" width="40" height="80"
                          fill="{valColor.sm[sm][0]}"
                        />



                      {:else if nameParts === 2 && nameFormat == 'bexfoto'}

                        <!-- top = foto -->
                        <!-- outer frame = body -->
                        <!-- stroke-width +2 to fill gap -->
                        <rect x="23" y="23" width="154" height="115"
                          stroke="{valColor.ag[ag][0]}"
                          stroke-width="6"
                        />
                        <!-- inner frame = element -->
                        <rect x="26" y="26" width="148" height="108"
                          stroke="{valColor.sm[sm][0]}"
                          stroke-width="4"
                        />

                        <!-- left = body --->
                        <!-- width 80 + 1 to fill gap -->
                        <rect x="20" y="140" width="81" height="40"
                          fill="{valColor.ag[ag][0]}"
                        />
                        
                        <!-- right = element --->
                        <rect x="100" y="140" width="80" height="40"
                          fill="{valColor.sm[sm][0]}"
                        />



                      {:else if nameParts === 2 && nameFormat == 'ebxorbit'}

                        <!-- outside = age + gender = body, surface, outside --->
                        <circle cx="100" cy="100" r="80"
                          fill="{valColor.ag[ag][0]}"
                        />

                        <!-- radius 55 / 80 = circle with half area -->

                        <!-- inside -->
                        <!-- top half = sense + move = element, soul, inside --->
                        <!-- height 82, cos height 80 leaves a small gap -->
                        <!--<circle cx="100" cy="100" r="55"-->
                        <circle cx="100" cy="100" r="40"
                          fill="{valColor.sm[sm][0]}"
                          stroke="{valColor.sm[sm][1]}"
                          stroke-width="{sm === ag ? 2 : 0}"
                        />



                      {:else if nameParts === 2 && nameFormat == 'ebxshape'}

                        <!-- outside = age + gender = body, surface, outside --->
                        <path d="{pathDataShapeLarge[ag]}"
                          fill="{valColor.ag[ag][0]}"
                        />

                        <!-- inside = sense + move = element, soul, inside --->
                        <path d="{pathDataShapeSmall[sm]}"
                          fill="{valColor.sm[sm][0]}"
                          stroke="{valColor.sm[sm][1]}"
                          stroke-width="{sm === ag ? 2 : 0}"
                        />

                      <!--{:else if nameParts === 2 && nameFormat == '[pol]/b'}-->
                      {:else if nameParts === 2 && nameFormat.match(/[^/]+\/[^/]+/)}

                        <!-- top half = sense + move = element, soul, inside --->
                        <!-- height 82, cos height 80 leaves a small gap -->
                        <path d="M 20 102 v -62 a 20 20 0 0 1 20 -20 h 120 a 20 20 0 0 1 20 20 v 62 z"
                          fill="{valColor.sm[sm][0]}"
                        />
                        
                        <!-- bottom half = age + gender = body, surface, outside --->
                        <path d="M 20 100 v 60 a 20 20 0 0 0 20 20 h 120 a 20 20 0 0 0 20 -20 v -60 z"
                          fill="{valColor.ag[ag][0]}"
                        />

                      {:else if nameParts === 2 && nameFormat == 'e|b'}

                        <!-- left half = element, inside, soul, emotions, inner values, spirit -->
                        <path d="
                          M 102 20 
                          h -62 
                          a 20 20 0 0 0 -20 20 
                          v 120 
                          a 20 20 0 0 0 20 20 
                          h 62 z
                          " 
                          fill="{valColor.sm[sm][0]}"
                        />

                        <!-- right half = body, surface, outside, material -->
                        <path d="
                          M 100 20 
                          h 60
                          a 20 20 0 0 1 20 20 
                          v 120 
                          a 20 20 0 0 1 -20 20 
                          h -60 z
                          " 
                          fill="{valColor.ag[ag][0]}"
                        />

                      {:else if nameParts === 3 && nameFormat == 'a/e/g'}

                        <!-- top third = age. height 55 + overlap 2 - corner 20 = height 37 -->
                        <path d="M 20 77 v -37 a 20 20 0 0 1 20 -20 h 120 a 20 20 0 0 1 20 20 v 37 z"
                          fill="{valColor.a[a][0]}"
                        />

                        <!-- center third = element = sense+move. height 50 +2 = 52 -->
                        <path d="M 20 75 h 160 v 52 h -160 z"
                          fill="{valColor.sm[sm][0]}"
                        />

                        <!-- bottom third = gender --->
                        <path d="M 20 125 v 35 a 20 20 0 0 0 20 20 h 120 a 20 20 0 0 0 20 -20 v -35 z"
                          fill="{valColor.g[g][0]}"
                        />

                      {:else if nameParts === 4 && (nameFormat === 'a/s/m/g' || nameFormat === 'a/s/m/gxbody')}

                        <!-- top half = sense + move = element, soul, inside --->
                        <!-- height 22, cos height 20 leaves a small gap -->
                        <!--
                        <path d="M 20 62 v -22 a 20 20 0 0 1 20 -20 h 120 a 20 20 0 0 1 20 20 v 22 z"
                        -->
                        <path d="M 20 62 v -32 a 10 10 0 0 1 10 -10 h 140 a 10 10 0 0 1 10 10 v 32 z"
                          fill="{valColor.a[a][0]}"
                        />

                        <rect x="20" y="60" width="160" height="42"
                          fill="{valColor.s[s][0]}"
                        />

                        <rect x="20" y="100" width="160" height="42"
                          fill="{valColor.m[m][0]}"
                        />

                        <!-- bottom half = age + gender = body, surface, outside --->
                        <!--
                        <path d="M 20 140 v 20 a 20 20 0 0 0 20 20 h 120 a 20 20 0 0 0 20 -20 v -20 z"
                        -->
                        <path d="M 20 140 v 30 a 10 10 0 0 0 10 10 h 140 a 10 10 0 0 0 10 -10 v -30 z"
                          fill="{valColor.g[g][0]}"
                        />

                      {:else if nameParts === 4 && nameFormat == 'smagxshape'}

                        <!-- +2 pixels to avoid gaps between colors -->

                        <!-- left top -->
                        <path d="M20 102v-62a20 20 0 0 1 20 -20h62v82z"
                          fill="{valColor.s[s][0]}"
                        />

                        <!-- left bottom -->
                        <path d="M20 100v60a20 20 0 0 0 20 20h62v-80z"
                          fill="{valColor.m[m][0]}"
                        />

                        <!-- right top -->
                        <path d="M100 102v-82h60a20 20 0 0 1 20 20v62z"
                          fill="{valColor.a[a][0]}"
                        />

                        <!-- right bottom -->
                        <path
                          d="M100 100v80h60a20 20 0 0 0 20 -20v-60z"
                          fill="{valColor.g[g][0]}"
                        />

                        {#if s === 1}
                          <!-- introvert sense = top left -->
                          <!--
                            bezier curve:
                            d="M25 100 c 75,0 75,0 75,-75"
                          -->
                          <path
                            d="M20 100 h 60 a 20 20 0 0 0 20 -20 v -60"
                            stroke="{valColor.s[s][1]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {:else}
                          <!-- extravert sense = top left -->
                          <!-- TODO use foreground color for extravert stroke -->
                          <path
                            d="M 20 102 v -62 a 20 20 0 0 1 20 -20 h 62"
                            stroke="{colors2[0]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {/if}

                        {#if m === 1}
                          <!-- introvert move = bottom left -->
                          <!--
                            bezier curve:
                            d="M25 100 c 75,0 75,0 75,75"
                          -->
                          <path
                            d="M 20 100 h 60 a 20 20 0 0 1 20 20 v 60"
                            stroke="{valColor.m[m][1]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {:else}
                          <!-- extravert move = bottom left -->
                          <path
                            d="M 20 98 v 62 a 20 20 0 0 0 20 20 h 62"
                            stroke="{colors2[0]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {/if}

                        {#if a === 1}
                          <!-- introvert age = top right -->
                          <!--
                            bezier curve:
                            d="M170 100 c -70,0 -70,0 -70,-70"
                          -->
                          <path
                            d="M 100,20 v 60 a 20 20 0 0 0 20 20 h 60"
                            stroke="{valColor.a[a][1]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {:else}
                          <!-- extravert age = top right -->
                          <path
                            d="M 98 20 h 62 a 20 20 0 0 1 20 20 v 62"
                            stroke="{colors2[0]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {/if}

                        {#if g === 1}
                          <!-- introvert gender = bottom right -->
                          <path d="M 100 180 v -60 a 20 20 0 0 1 20 -20 h 60"
                            stroke="{valColor.g[g][1]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {:else}
                          <!-- extravert gender = bottom right -->
                          <path
                            d="M 98 180 h 62 a 20 20 0 0 0 20 -20 v -62"
                            stroke="{colors2[0]}"
                            stroke-width="4"
                            fill="none"
                          />
                        {/if}

                        <!-- centers last, to overpaint other colors -->

                        <!-- left center -->
                        <!--
                        <rect x="20" y="90" width="82" height="20"
                          fill="{valColor.sm[sm][0]}">
                          <title>{nameFromSM[sm]}</title></rect>
                        -->

                        <!-- right center -->
                        <!--
                        <rect x="100" y="90" width="80" height="20"
                          fill="{valColor.ag[ag][0]}">
                          <title>{nameFromAG[ag]}</title></rect>
                        -->

                      {:else if nameParts === 4 && nameFormat == 's/m|a/g'}

                        <!-- +2 pixels to avoid gaps between colors -->

                        <!-- left top -->
                        <path d="M20 102v-62a20 20 0 0 1 20 -20h62v82z"
                          fill="{valColor.s[s][0]}"
                        />

                        <!-- left bottom -->
                        <path d="M20 100v60a20 20 0 0 0 20 20h62v-80z"
                          fill="{valColor.m[m][0]}"
                        />

                        <!-- right top -->
                        <path d="M100 102v-82h60a20 20 0 0 1 20 20v62z"
                          fill="{valColor.a[a][0]}"
                        />

                        <!-- right bottom -->
                        <path
                          d="M100 100v80h60a20 20 0 0 0 20 -20v-60z"
                          fill="{valColor.g[g][0]}"
                        />

                        <!-- centers last, to overpaint other colors -->

                        <!-- left center -->
                        <rect x="20" y="90" width="82" height="20"
                          fill="{valColor.sm[sm][0]}">
                          <title>{nameFromSM[sm]}</title></rect>

                        <!-- right center -->
                        <rect x="100" y="90" width="80" height="20"
                          fill="{valColor.ag[ag][0]}">
                          <title>{nameFromAG[ag]}</title></rect>


                      {:else if nameParts === 6 && nameFormat === 's/e/m|a/b/g'}

                        <!-- TODO generalize -->

                        <!-- left top -->
                        <path d="M20 102v-62a20 20 0 0 1 20 -20h62v82z"
                          fill="{valColor.s[s][0]}"
                        />

                        <!-- left bottom -->
                        <path d="M20 100v60a20 20 0 0 0 20 20h62v-80z"
                          fill="{valColor.m[m][0]}"
                        />

                        <!-- right top -->
                        <path d="M100 102v-82h60a20 20 0 0 1 20 20v62z"
                          fill="{valColor.a[a][0]}"
                        />

                        <!-- right bottom -->
                        <path
                          d="M100 100v80h60a20 20 0 0 0 20 -20v-60z"
                          fill="{valColor.g[g][0]}"
                        />

                        <!-- centers last, to overpaint other colors -->

                        <!-- left center -->
                        <rect x="20" y="75" width="82" height="50"
                          fill="{valColor.sm[sm][0]}">
                          <title>{nameFromSM[sm]}</title></rect>

                        <!-- right center -->
                        <rect x="100" y="75" width="80" height="50"
                          fill="{valColor.ag[ag][0]}">
                          <title>{nameFromAG[ag]}</title></rect>



                      {/if}

                    </g>


                  {/if}

                {/if}

                  <!-- TODO this is working. use bitmap image as background + colorize image
                    <image
                      href="m1-bender.jpg"
                      x="20" y="20"
                      height="160" width="160"
                      opacity="0.75"
                      clip-path="url(#clip_circle)"
                      style="filter:url(#spotlight-{groupColor[groupFromN[num]][0].substring(1)})"/>
                    />
                  -->

                
                <!-- text container with rotateBack -->
                <g style="
                  transform-origin: center;
                  transform: rotate(var(--angleBack));
                ">

                  {#if nameFormat !== 'x'}

                    {#if nameFormat === 'shape'}

                      <g style="
                        transform: scale({captionText[x][y] ? 0.6 : 1});
                        transform-origin: top;
                      ">
                        <path d="{bodyPath[num]}"
                          fill="none"
                          stroke="{groupColor[groupFromN[num]][1]}"
                          stroke-width="4"
                        />
                      </g>

                    {:else if nameFormat === 'zodiac'}

                      <!-- name is symbol id -->

                      <use 
                        xlink:href="#{nameFromN[num][0][0]}"
                        stroke="{groupColor[groupFromN[num]][1]}"
                        x="75" y="75"
                        width="50" height="50"
                      ><title>{nameFromN[num][0][1]}</title></use>

                    {:else if nameParts === 1 || (nameParts === 2 && showPathos === true)}<!--

                   --><text
                        style="
                          font-size: {showPathos ? 48 : 38}px;
                          font-family: sans-serif;
                        "
                        x="100" y="100"
                        width="200" height="200"
                        text-anchor="middle"
                        alignment-baseline="mathematical"
                      ><tspan
                        y="50%" x="50%" dominant-baseline="central"
                        fill="{groupColor[groupFromN[num]][1]}"
                      ><!--
                     --><title>{nameFromN[num][0][1]}</title><!--
                     -->{nameFromN[num][0][0]}<!--
                   --></tspan></text><!--
                 
                 -->{:else if nameParts === 2 && nameFormat === 'e/b'}<!--

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 80px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                          >{nameFromN[num][0][1]}</div>
                          
                          <div
                            style="
                              height: 80px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                          "
                          >{nameFromN[num][1][1]}</div>
                        
                        </div>

                      </foreignObject>

                      <!--
                 -->{:else if nameParts === 2 && nameFormat === 'e/bxinout'}<!--

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              margin-top: 10px;
                              height: 70px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                          >{nameFromN[num][0][1]}</div>
                          
                          <div
                            style="
                              height: 70px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                        "
                          >{nameFromN[num][1][1]}</div>
                        
                        </div>

                      </foreignObject>



                    {:else if nameParts === 2 && nameFormat === 'be'}

                      <foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 54px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          
                          <div
                            style="
                              height: 160px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                            "
                            title="{nameFromN[num][0][1]}"
                          >{nameFromN[num][0][0]}</div>
                          
                          <div
                            style="
                              height: 160px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                            title="{nameFromN[num][1][1]}"
                            >{nameFromN[num][1][0]}</div>

                        </div>

                      </foreignObject>



                    {:else if nameParts === 2 && nameFormat === 'e/bxfoto'}

                      <foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 27px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: row;
                          "
                        >
                          
                          <div
                            class="foto-container-high"
                            style="
                              height: 160px; width: 122px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            "
                            on:click="{() => editFoto(num)}"
                            
                          ><img class="foto" src="{fotoData[num][0]}" alt="foto of {nameFromN[num][0][1]} {nameFromN[num][1][1]}" title="{fotoData[num][1]}" /></div>

                          <div
                            style="
                              height: 160px; width: 38px;
                              display: flex;
                              flex-wrap: wrap;
                              flex-direction: column;
                            "
                          >

                            <div
                              style="
                                height: 80px; width: 38px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: {valColor.ag[ag][1]};
                              "
                              title="{nameFromN[num][1][1]}"
                              >{nameFromN[num][1][0]}</div>

                            <div
                              style="
                                height: 80px; width: 40px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: {valColor.sm[sm][1]};
                              "
                              title="{nameFromN[num][0][1]}"
                            >{nameFromN[num][0][0]}</div>

                          </div>
                        
                        </div>

                      </foreignObject>



                    {:else if nameParts === 2 && nameFormat === 'bexfoto'}

                      <foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 27px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          
                          <div
                            class="foto-container-broad"
                            style="
                              height: 120px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                            "
                            on:click="{() => editFoto(num)}"
                            
                          ><img class="foto" src="{fotoData[num][0]}" alt="foto of {nameFromN[num][1][1]} {nameFromN[num][0][1]}" title="{fotoData[num][1]}" /></div>

                          <div
                            style="
                              height: 40px; width: 160px;
                              display: flex;
                              flex-wrap: wrap;
                              flex-direction: row;
                            "
                          >

                            <div
                              style="
                                height: 40px; width: 80px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: {valColor.ag[ag][1]};
                              "
                              title="{nameFromN[num][0][1]}"
                            >{nameFromN[num][0][0]}</div>
                            
                            <div
                              style="
                                height: 40px; width: 80px;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                color: {valColor.sm[sm][1]};
                              "
                              title="{nameFromN[num][1][1]}"
                              >{nameFromN[num][1][0]}</div>

                          </div>
                        
                        </div>

                      </foreignObject>



                    {:else if nameParts === 2 && nameFormat === 'ebxorbit'}

                      <foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-direction: row;
                          "
                        >
                          
                          <div
                            style="
                              height: 160px; width: 40px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                            "
                          >{nameFromN[num][1][0]}</div>

                          <div
                            style="
                              height: 160px; width: 40px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                          >{nameFromN[num][0][0]}</div>
                          
                          <div
                            style="
                              height: 160px; width: 40px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                          >{nameFromN[num][0][0]}</div>
                          
                          <div
                            style="
                              height: 160px; width: 40px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                            "
                          >{nameFromN[num][1][0]}</div>
                        
                        </div>

                      </foreignObject>

                      <!--

                 - ->{:else if nameParts === 2 && nameFormat === '[pol]/b'}<!- -
                 -->{:else if nameParts === 2 && nameFormat.match(/[^/]+\/[^/]+/)}<!--

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 80px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                          >{nameFromN[num][0][1]}</div>
                          
                          <div
                            style="
                              height: 80px; width: 160px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                          "
                          >{nameFromN[num][1][1]}</div>
                        
                        </div>

                      </foreignObject>

                      <!--

                 -->{:else if nameParts === 2 && nameFormat === 'e|b'}<!--

                      TODO generalize "flex" layout generation

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                          "
                        >
                          <div
                            style="
                              height: 160px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                          >{nameFromN[num][0][1]}</div>
                          
                          <div
                            style="
                              height: 160px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                          "
                          >{nameFromN[num][1][1]}</div>
                        
                        </div>

                      </foreignObject>

                      <!--

                 -->{:else if nameParts === 3 && nameFormat === 'a/e/g'}<!--

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 55px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.a[a][1]};
                              overflow: hidden;
                              word-break: keep-all;
                              padding: 0 4px;
                            "
                            title="{nameFromN[num][0][1]}"
                          >{nameFromN[num][0][1]}</div>
                          
                          <div
                            style="
                              height: 50px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                              overflow-x: hidden;
                              word-break: keep-all;
                              padding: 0 4px;

                              white-space: pre;
                            "
                            title="{nameFromN[num][1][1]}"
                            >{nameFromN[num][1][0]+' '+nameFromN[num][1][1]}</div>

                            <!--
                              bug: svelte ignores whitespace between template vars, in svg context
                              >{nameFromN[num][1][0]} {nameFromN[num][1][1]}</div>

                              workaround:
                              title="{nameFromN[num][1][1]}"
                              ><span>{nameFromN[num][1][0]}</span><span style="margin-left: 0.33em /* force white-space */">{nameFromN[num][1][1]}</span></div>
                            -->

                          <div
                            style="
                              height: 55px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.g[g][1]};
                              overflow-x: hidden;
                              word-break: keep-all;
                              padding: 0 4px;
                            "
                            title="{nameFromN[num][2][1]}"
                          >{nameFromN[num][2][1]}</div>

                        </div>
                        
                      </foreignObject><!--

                 -->{:else if nameParts === 4 && (nameFormat === 'a/s/m/g' || nameFormat === 'a/s/m/gxbody')}<!--

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 40px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.a[a][1]};
                              overflow: hidden;
                              word-break: keep-all;
                              padding: 0 4px;
                            "
                            title="{nameFromN[num][0][1]}"
                          >{@html addNamePrefix(nameFromN[num][0])}</div>
                          <div
                            style="
                              height: 40px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.s[s][1]};
                              overflow: hidden;
                              word-break: keep-all;
                              padding: 0 4px;
                            "
                            title="{nameFromN[num][1][1]}"
                            >{@html addNamePrefix(nameFromN[num][1])}</div>
                          
                          <div
                            style="
                              height: 40px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.m[m][1]};
                              overflow: hidden;
                              word-break: keep-all;
                              padding: 0 4px;
                            "
                            title="{nameFromN[num][2][1]}"
                          >{@html addNamePrefix(nameFromN[num][2])}</div>

                          
                          <div
                            style="
                              height: 40px; width: 160px;
                              display: flex;
                              justify-content: left;
                              align-items: center;
                              color: {valColor.g[g][1]};
                              overflow: hidden;
                              word-break: keep-all;
                              padding: 0 4px;
                            "
                            title="{nameFromN[num][3][1]}"
                          >{@html addNamePrefix(nameFromN[num][3])}</div>

                        </div>
                        
                      </foreignObject><!--

                 -->{:else if nameParts === 4 && nameFormat === 'smagxshape'}<!--

                      TODO generalize
                        also allow 's-a-m-g' = top sense+age + left sense+move [inner values, emotions]
                          then the combined values are horizontal not vertical
                        no!
                          use the "normal format" by default:
                            top sense+age + left sense+move
                            use notation 's/e/m|a/b/g' for
                              s a
                              e b
                              m g

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.s[s][1]};
                            "
                            title="{nameFromN[num][0][1]}"
                          >{nameFromN[num][0][0]}</div>
                          
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.m[m][1]};
                            "
                            title="{nameFromN[num][1][1]}"
                            >{nameFromN[num][1][0]}</div>
                          
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.a[a][1]};
                            "
                            title="{nameFromN[num][2][1]}"
                          >{nameFromN[num][2][0]}</div>

                          
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.g[g][1]};
                            "
                            title="{nameFromN[num][3][1]}"
                          >{nameFromN[num][3][0]}</div>

                        </div>
                        
                      </foreignObject><!--

                 -->{:else if nameParts === 4 && nameFormat === 's/m|a/g'}<!--

                      TODO generalize
                        also allow 's-a-m-g' = top sense+age + left sense+move [inner values, emotions]
                          then the combined values are horizontal not vertical
                        no!
                          use the "normal format" by default:
                            top sense+age + left sense+move
                            use notation 's/e/m|a/b/g' for
                              s a
                              e b
                              m g


                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.s[s][1]};
                            "
                            title="{nameFromN[num][0][1]}"
                          >{nameFromN[num][0][0]}</div>
                          
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.m[m][1]};
                            "
                            title="{nameFromN[num][1][1]}"
                            >{nameFromN[num][1][0]}</div>
                          
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.a[a][1]};
                            "
                            title="{nameFromN[num][2][1]}"
                          >{nameFromN[num][2][0]}</div>

                          
                          <div
                            style="
                              height: 80px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.g[g][1]};
                            "
                            title="{nameFromN[num][3][1]}"
                          >{nameFromN[num][3][0]}</div>

                        </div>
                        
                      </foreignObject><!--

                 -->{:else if nameParts === 6 && nameFormat === 's/e/m|a/b/g'}<!--

                      only nameFormat 's/e/m|a/b/g'
                        s a
                        e b
                        m g

                   --><foreignObject
                        x="20" y="20"
                        width="160" height="160"
                      >

                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            line-height: 1em;
                            font-family: sans-serif;

                            font-size: 36px;

                            padding: 0; margin: 0;

                            word-break: break-all;
                            width: 160px; height: 160px;

                            text-align: center;
                            display: flex;
                            flex-wrap: wrap;
                            flex-direction: column;
                          "
                        >
                          <div
                            style="
                              height: 55px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.s[s][1]};
                            "
                            title="{nameFromN[num][0][1]}"
                          >{nameFromN[num][0][0]}</div>
                          
                          <div
                            style="
                              height: 50px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.sm[sm][1]};
                            "
                            title="{nameFromN[num][1][1]}"
                          >{nameFromN[num][1][0]}</div>
                          
                          <div
                            style="
                              height: 55px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.m[m][1]};
                            "
                            title="{nameFromN[num][2][1]}"
                            >{nameFromN[num][2][0]}</div>
                          
                          <div
                            style="
                              height: 55px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.a[a][1]};
                            "
                            title="{nameFromN[num][3][1]}"
                          >{nameFromN[num][3][0]}</div>

                          
                          <div
                            style="
                              height: 50px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.ag[ag][1]};
                            "
                            title="{nameFromN[num][4][1]}"
                          >{nameFromN[num][4][0]}</div>

                          <div
                            style="
                              height: 55px; width: 80px;
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              color: {valColor.g[g][1]};
                            "
                            title="{nameFromN[num][5][1]}"
                          >{nameFromN[num][5][0]}</div>

                        </div>
                        
                      </foreignObject><!--

                 -->{/if}

                    {#if captionText[x][y]}

                      <!-- TODO cosmetic: fit text to circle -->

                      <foreignObject
                        x="20" y="80"
                        width="160" height="160"
                      >
                        <div
                          xmlns="http://www.w3.org/1999/xhtml"
                          style="
                            font-size: 48px;
                            color: {groupColor[groupFromN[num]][1]};
                          "
                        >{captionText[x][y]}</div>
                      </foreignObject>
                    {/if}
                  {/if}
                </g>
              </svg>
            </g>
          {/if}
        {/each}
      {/each}
    </g><!-- close #grid -->
  </g><!-- close #grid_wrap -->

</svg><!-- close #content -->

</div><!-- close #transform-translate -->
</div><!-- close #transform-rotate -->
</div><!-- close #transform-down -->
</div><!-- close #transform-move -->

<div id="control-wrapper"

  style="
    width: {width}px; height: {height}px;
    margin-top: {-2*height -4.5}px;/* TODO why -4? */
    
    line-height: 0; /* remove vertical spacing */

    transform: translateZ(1px);
  "
>

{#if true}

  {#each [

    // frame width = 1/4
    ['top-left', 'none', 0, 0, width/4, height/4],
    ['top-center', 'none', width/4, 0, width/4*2, height/4],
    ['top-right', 'none', width/4*3, 0, width/4, height/4],

    ['center-left', 'none', 0, height/4, width/4, height/4*2],
    ['center-center', 'move', width/4, height/4, width/4*2, height/4*2],
    ['center-right', 'none', width/4*3, height/4, width/4, height/4*2],

    ['bottom-left', 'none', 0, height/4*3, width/4, height/4],
    ['bottom-center', 'none', width/4, height/4*3, width/4*2, height/4],
    ['bottom-right', 'none', width/4*3, height/4*3, width/4, height/4],

  ] as [name, touchAction, x, y, w, h]}

    <!-- control targets -->
    <div
      id="control-{name}"
      class="control-target"
      style="
        display: inline-block;

        background: transparent;
        touch-action: none;

        width: {w -2}px;
        height: {h -2}px;
        
        padding: 0; margin: 0;
        font-size: 0;
        line-height: 0;
      "
    ></div>

  {/each}

{/if}
</div><!-- close #control-wrapper -->

</div><!-- close #transform-mask -->
</div><!-- close #wrapper -->

<div
  class="overlay-box"
  class:hidden="{exportOverlayHide}"
>
  <div class="title">export SVG image</div>
  <div class="close" on:click="{()=>{exportOverlayHide=true;}}">✕</div>
  <div class="content">
    <!-- svelte will complain: <a href="javascript: null" id="export-link">right click and save link</a>-->
    <a href="empty.html" id="export-link">right click and save link</a>
  </div>
</div>

</main>



<style>

  .overlay-box.hidden {
    display: none;
  }
  .overlay-box {
    z-index: +2;
    padding: 0.25em;
    /*transform: translateZ(+2px);*/
    position: absolute;
    top: 50%; left: 50%;
    width: 12em; height: 6em;
    margin: -3em 0 0 -6em;
    border: solid 1px var(--fg);
    background: var(--bg);
  }
  .overlay-box .title {
    width: 10.5em; height: 1em;
    line-height: 0.9em;
    border-bottom: solid 1px var(--fg);
    float: left;
    padding: 0.25em;
    margin: -0.25em 0 0.25em -0.25em;
  }
  .overlay-box .close {
    cursor: pointer;
    width: 1em; height: 1em;
    padding: 0.25em;
    line-height: 0.9em;
    border: solid 1px var(--fg);
    margin-left: -1px;
    margin: -0.25em -0.25em 0.25em -1px;
    border-top: none;
    border-right: none;
    float: right;
  }
  .overlay-box .content {
    clear: both;
    height: 4em;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: var(--fg);
    border-bottom: dotted 1px var(--fg);
  }
  a:hover {
    text-decoration: none;
    border-bottom: solid 1px var(--fg);
  }






  tr.empty, tr.empty td {
    height: 0;
    padding: 0;
    margin: 0;
  }



  /* css variables. init here + change later in javascript */
  
  :root {
    --bg: #000000;
    --fg: #ffffff;
    --bg-alpha33: rgba(0,0,0, 0.33);
    --angle: 0deg;
    --angleBack: 0deg;
  }



  html, body {
    margin: 0;
    padding: 0;
  }

  main {
    background-color: var(--bg);
    color: var(--fg);

    min-height: 100%;
  }

  p {
    margin-bottom: 2em;
  }

  main, p, tt {
    font-size: 16px;
  }

  .uppercase, .uppercase * {
    text-transform: uppercase;
  }



  :global(.animate_dash .anim_dash1),
  :global(.animate_dash .anim_dash2) {
    stroke-dasharray: 30, 10;
  }

  /* this needs way too much CPU power [70% cpu]
    cos of buggy svg implementations
    workaround:
    use javascript with a low frame-rate

    .animate .anim_dash1,
    .animate .anim_dash2 {
      animation: anim_dash2 4s linear infinite;
    }
    @keyframes anim_dash1 {
      100% { stroke-dashoffset: -80 }
    }
    @keyframes anim_dash2 {
      100% { stroke-dashoffset:  80 }
    }
  */

  /* expand = collapsed by default */
  .expand {
    /* get compositor layer for GPU animation */
    /* will-change: transform; */
    margin-bottom: 10px;
  }

  .expand .body{
    /*transition: height .5s ease-in-out;*/
    transition: height .5s cubic-bezier(0.445, 0.050, 0.550, 0.950 );
    /* = penner equation for easeInOutSine */
    height: 0; /* start value */
    overflow: auto; /* add scrollbar */
  }

  /* collapse = expanded by default */
  .collapse .body{
    /*transition: height .5s ease-in-out;*/
    transition: height .5s cubic-bezier(0.445, 0.050, 0.550, 0.950 );
    /* = penner equation for easeInOutSine */
    /* height: 0; /* start value */
    /* overflow: auto; /* add scrollbar */
  }

  /* TODO rename to body-translate */
  :global(.animate_moves g.body_wrapper),

  /* TODO rename to body-rotate */
  :global(.animate_moves g.rotateBack),
  :global(.animate_moves svg.body > g),

  /* TODO rename to group-translate, group-rotate */
  :global(.animate_moves #transform-translate),
  :global(.animate_moves #transform-rotate)
  {
    /*transition: transform .5s cubic-bezier(0.445, 0.050, 0.550, 0.950 );*/
    transition: transform .5s linear;
  }



  /* scrollbars */

  .scroll::-webkit-scrollbar {
      width: 20px;
      height: 20px;
  }

  .body.scroll::-webkit-scrollbar-track,
  .body.scroll::-webkit-scrollbar-thumb{
    border-left: none; /* avoid double borders */
  }

  .scroll::-webkit-scrollbar-track {
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); */
    border: solid 1px var(--fg);
    background: var(--bg);
  }

  .scroll::-webkit-scrollbar-thumb {
    outline: 1px solid slategrey;
    border: solid 1px var(--fg);
    background: center no-repeat url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" x="0px" y="0px" height="24px" width="24px"><g style="stroke: %23ffffff" stroke-width="1"><line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" /></g></svg>')
  }



  /* expand + collapse */

  .expand .head {
    padding: 0;
  }

  .expand .head * {
    margin: 0;
  }

  .expand .head button {
    width: 20px;
    border-left: none !important;
    padding: 2px;
  }

  .expand .head input {
    width: 120px;
    padding: 2px 4px;
  }

  .expand .body button {
    margin: 0;
    width: 120px;
    padding: 2px 4px;
    text-align: left;
    vertical-align: center;
    border-top: none;
    display: block;
  }

  .expand--expanded, .expand--collapsed {
    animation-name: a_expand;
    animation-duration: 0.5s;
    animation-timing-function: linear;
  }



  /* control menu */

  #control0 {
    /*
    position: fixed;
    */
    position: absolute;
    top: 0%; left: 0%;
    
    /* TODO android workaround for position:fixed
      with javascript scroll+zoom handler? */

  }

  .control {
    /*
    position: fixed;
    */
    z-index: +1;

    /* TODO FIXME scroll broken after expand */

    background-color: var(--bg-alpha33);

    white-space: nowrap;

    width: 160px;
    overflow-x: hidden;

    /* scroll vertical */
    max-height: 100%;
    overflow-y: auto;

    padding: 2px;

    /* TODO show control menu always next to grid, use css "flex" layout? */
    
    /* TODO set height to auto? max-height: 100%, overflow auto */

    transform-origin: top left;

    transition:
      width .5s cubic-bezier(0.445, 0.050, 0.550, 0.950 )
    ;
    /* = penner equation for easeInOutSine */

  }

  .control.collapsed > *:not(.nohide) {
    display: none;
  }

  .control.collapsed > .nohide button:not(.nohide) {
    display: none;
  }

  /* FIXME buttons without svg look odd */
  .control button.square {
    padding: 2px; margin: 2px;
    width: 30px; height: 30px;
    overflow: hidden;
  }

  .control button.square > svg {
    width: 20px; height: 20px;
    margin: 0;
  }

  .control div.square {
    margin: 2px;
    width: 30px; height: 22px;
    display: inline-block;
  }

  .control button, .control input {
    background-color: var(--bg);
    border: solid 1px  var(--fg);
    color: var(--fg);
  }

  .control {
    font-size: 16px;
    text-align: left;
  }

  main > div {
    text-align: center;
    margin: 0;
    top: 0; left: 0;
    overflow: auto;
  }

  svg.body.center circle {
    stroke-width: 12px;
    stroke: url(#circle_double_stroke);
  }

  .control .first-row {
    margin-top: 16px
  }

  .control .last-row {
    margin-bottom: 16px
  }

  symbol.zodiac {
    fill: none;
    stroke-width: 12;
  }

  div#description {
    /** / text-align: left; /**/
    margin: 1em;
  }

  .foto-container-broad .foto {
    /* size depends on scale factor html vs svg [TODO verify] */
    max-height: 105px;
    max-width: 145px;
  }

  .foto-container-high .foto {
    /* size depends on scale factor html vs svg [TODO verify] */
    height: 157px;
    width: 119px;
  }

</style>
