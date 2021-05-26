// TODO split into smaller files

// this is transformed by babel-plugin-preval
// see /config/vite.config.js and /.babelrc
const metadata = preval`
  module.exports = require("../_data/metadata.js");
`;

console.log('metadata', metadata);

function get_meta() {

  const meta = Array.from(document.querySelectorAll('meta[name]')).reduce((acc, meta) => (
    Object.assign(acc, { [meta.name]: meta.content })), {});

  meta.lang = document.querySelector('html').lang;
  //meta.title = document.querySelector('html > head > title').innerText;

  meta.docname = `${meta['basename.de']}.${meta.version}`; // TODO switch language

  document.title = meta.docname;

  meta.filename = `${meta.docname}.html`;

  Object.keys(meta).forEach(k => console.log(`meta: ${k}: ${meta[k]}`));

  return meta;  
}

// page size. exact values add empty page (TODO why? firefox bug?)
const { print_size, print_orient, print_scale, page_x, page_y } =
  true
  ? {
    print_size: 'A4',

    //print_orient: 'portrait',
    print_orient: 'landscape', // booklet

    print_scale: 1, // no change

    // DIN A5 = one booklet page when printed on A4 sheets

    // TODO you may need to calibrate your printer to get better print results

    //page_x: 147.5, // mm = DIN A5
    page_x: 149.5, // mm = DIN A5 + 2mm

    //page_y: 209.5, // mm = DIN A5
    page_y: 211.1, // mm = DIN A5 + 1.6mm (calibrate page offset. TODO why? better solution?)

    // DIN A4
    //page_x: 209.5, page_y: 296.5, // mm

  }
  : {
    // this is broken
    // TODO scale fonts and SVGs ....
    // din a4 = 210 x 297 mm2
    print_size: 'A4', // used for css print settings
    print_orient: 'portrait',
    print_scale: Math.sqrt(2), // A5 --> A4
    page_x: 209.5, page_y: 296.5, // mm
    // firefox print dialog: A5 = 8.27 x 5.83 inch2 = 211.712 x 149.248 mm2
  };

// TODO change page layout here
//const page_margin = { top: 5, right: 5, bottom: 5, left: 5 }; // mm
//const page_margin = { top: 10, right: 10, bottom: 10, left: 10 }; // mm
//const page_margin = { top: 5, right: 10, bottom: 5, left: 10 }; // mm
//const page_margin = { top: 5, bottom: 5, inside: 10, outside: 5 }; // mm 

//const offset_top = 0; // calibrate for screen and PDF-print
//const offset_inside_only = 0; // calibrate for screen and PDF-print
//const offset_top = 2.75; // calibrate for paper-print
const offset_top = 1; // calibrate for paper-print
const offset_inside_only = 1.5; // calibrate for paper-print
const margin_size = 6; // mm. 5 mm margin -> content is too large for printing area
const page_margin = {
  top: margin_size + offset_top,
  bottom: margin_size - offset_top,
  inside: 1.5*margin_size + offset_inside_only,
  outside: margin_size
};

//const content_x = page_x - page_margin.left - page_margin.right;
const content_x = page_x - page_margin.inside - page_margin.outside;
const content_y = page_y - page_margin.top - page_margin.bottom;

const map_margin = 3;
const map_w = 10;
const map_a = map_w / 8;

const map_x_html = content_x/4;
const map_y_html = map_x_html;

const map_x_svg = 4*map_w + 3*map_margin + 4*map_a;
const map_y_svg = map_x_svg;

const scale_svg_html = map_x_svg / map_x_html;

const table_margin = 4;

const bgpat_w = content_x / 5 / 4;

// TODO scale with content
//const font_size = 3.35; // firefox
const font_size = 3; // firefox


const font_size_page2 = font_size;

const font_size_map = 4;
const footer_y = font_size * 1.25;



// TODO use natural color system

const color = {

  // light2 = lightness 80/100
  // light = lightness 67/100
  // dark  = lightness 33/100
  // dark2 = lightness 20/100
  map: {
    // variant: blue=black, yellow=white
    4: "#000066", // dark2 blue = 240deg
    3: "#ffff99", // light2 yellow = 240deg
    1: "#ff0000", // medium red
    2: "#00ff00", // medium green
    24: "#00a9a9", // dark turc
    23: "#abff57", // light lime = 90deg
    13: "#ffab57", // light lime = 90deg
    14: "#a800a8", // dark purple = 300deg
  },

  map_v2: {
    // variant: purple=black, lime=white
    1: "#a80000", // dark red = 0deg
    2: "#58ff58", // light green = 120deg
    3: "#ffff58", // light yellow = 60deg
    4: "#0000a8", // dark blue = 240deg
    //14: "#a800a8", // dark purple = 300deg
    14: "#660066", // dark2 purple = 300deg
    //23: "#abff58", // light lime = 90deg
    23: "#ccff99", // light2 lime = 90deg
    13: "#ff8000", // medium orange = 30deg
    24: "#00ffff", // medium turc = 180deg
  },

  light: {
    1: "#ffc0c0", // light red
    2: "#c0ffc0", // light green
    3: "#ffff80", // light yellow
    4: "#c0c0ff", // light blue

    13: "#ffdfc0", // light orange
    24: "#c0ffff", // light turc
    14: "#ffc0ff", // light purple
    23: "#dfffc0", // light lime
  },

  dark: {
    1: "#800000", // dark red
    2: "#008000", // dark green
    3: "#808000", // dark yellow
    4: "#000080", // dark blue
  },

  text: {
    1: "#cc0000", // red (40% lightness in HSL)
    2: "#008000", // dark green (25% lightness in HSL)
    3: "#808000", // dark yellow (25% lightness in HSL)
    //3: "#cdcd00", // dark yellow (40% lightness in HSL) -> too light on white ground
    4: "#0000cb", // blue (40% lightness in HSL)
  },

  medium: {
    1: "#ff0000", // red
    2: "#00ff00", // green
    3: "#ffff00", // yellow
    4: "#0000ff", // blue
    
    // deviations from "exact" values come from print color matching
    // printer = canon G5000

    //13: "#ff8000", // orange 30deg
    13: "#ff9100", // orange 34deg

    //24: "#00ffff", // turc 180deg
    24: "#00ffee", // turc 176deg
    
    //14: "#ff00ff", // purple 300deg
    14: "#ea00ff", // purple 295deg

    //23: "#80ff00", // lime 90deg
    23: "#aaff00", // lime 80deg
    
  },

};


//color.map = color.medium;

color.map.A = color.map[1];
color.map.B = color.map[2];
color.map.C = color.map[3];
color.map.D = color.map[4];

// old
const opposite = {
  1: 2,
  2: 1,
  3: 4,
  4: 3,
  "A": "B",
  "B": "A",
  "C": "D",
  "D": "C",
};



// escape hex color for svg inline data url
function sesc(s) {
  return s.replace("#", "%23");
}

// define css colors: --medium1: red;
function cssVarsOfColorMap(mapname){
  const mapval = color[mapname];
  return Object.keys(mapval).reduce((acc, key) => {
    return acc + "--" + mapname + key + ": " + mapval[key] + ";\n";
  }, "");
}



// dashed border
const dash_length = 6;






function setStyle(key, styleString) {
  const id = `${key}-style`;
  const style = document.querySelector(`#${id}`) || (
    (() => {
      const style = document.createElement('style');
      style.id = id;
      document.querySelector('head').appendChild(style);
      return style;
    })()
  );
  style.innerHTML = styleString;
}



function setRootStyle() {

  setStyle('root', `

    /* set css variables */
    :root {

      --print_size: ${print_size};
      --print_scale: ${print_scale};

      --font-size: ${font_size}mm;
      /* TODO use points? like 10pt
        for better print quality? */

      --page-width: ${page_x}mm;
      --page-height: ${page_y}mm;

      --page-width-base: ${page_x}mm;
      --page-height-base: ${page_y}mm;

      --page-margin-top: ${page_margin.top}mm;
      --page-margin-bottom: ${page_margin.bottom}mm;

      --page-margin-inside: ${page_margin.inside}mm;
      --page-margin-outside: ${page_margin.outside}mm;

      ${cssVarsOfColorMap("light")}
      ${cssVarsOfColorMap("dark")}
      ${cssVarsOfColorMap("medium")}
      ${cssVarsOfColorMap("text")}

    }
  `);
}



function setPrintStyle(props = {}) {

  console.log(`setPrintStyle: print_orient -> ${props.print_orient || print_orient}`);
  setStyle('print', `

    /* print settings */
    /* css variables dont work here */
    @page {
      margin: 0; /* no print margin */
      size: ${props.print_size || print_size} ${props.print_orient || print_orient};
      /* workaround for broken pattern-offsets in pdfnup/bookletimposer TODO verify */
      body {transform: scale(${props.print_scale || print_scale});
    }

  `);
}



// init
setRootStyle();
setPrintStyle();



// alchi.js

// age sense move gender, origin 11
// signs: 0 = same, 1 = diff
// these factors are XOR-ed with the origin asmg
const ac_bits_asmg_11 = [
    0b1001, 0b0111, 0b1011, 0b0101,
    0b1110, 0b0000, 0b1100, 0b0010,
    0b1101, 0b0011, 0b1111, 0b0001,
    0b1010, 0b0100, 0b1000, 0b0110,
];

// XOR factors for "key of 10 friends" aka "double pallas"
// five bits! XOR only last three bits!
//
// typeList index vs position in double-pallas
//
//   0 1 2 3 // parents
//   4  5  6 // same age
//   7 8 9 A // kids

const ac_bits_aasmg_double_pallas = [
    0b01001, 0b01110, 0b01100, 0b01111, // D3 B4  B2 D4
    0b10111,    0b10000,       0b10011, // M4   F3   M1
    0b00001, 0b00110, 0b00100, 0b00111, // A3 C4  C2 A4
];

/*
// young age: aa = 00
const C3 = 0b0000, A3 = 0b0001, C1 = 0b0010, A1 = 0b0011;
const C2 = 0b0100, A2 = 0b0101, C4 = 0b0110, A4 = 0b0111;
// old age: aa = 01
const B3 = 0b1000, D3 = 0b1001, B1 = 0b1010, D1 = 0b1011;
const B2 = 0b1100, D2 = 0b1101, B4 = 0b1110, D4 = 0b1111;
// no age: aa = 10 (five bits)
const F3 = 0b10000, M3 = 0b10001, F1 = 0b10010, M1 = 0b10011;
const F2 = 0b10100, M2 = 0b10101, F4 = 0b10110, M4 = 0b10111;
*/



function get_bit(num, idx) {
    return (num & (1 << idx)) >> idx;
}



function decode_bitstring(asmg) {
    return parseInt(asmg, 2);
}



function ac_xor(factor, list) {
    return list.map(function (n) {
        return factor ^ n
    })
}



// letters of the four dimensions
const letter_asmg = [
    ['S', 'L'], // age   = Short  or Long
    ['E', 'I'], // sense = Extra  or Intro
    ['N', 'P'], // move  = Neuro  or Psycho
    ['F', 'M'], // gen   = Female or Male
]



// element = sense + move
const element = [
    [
      '3', // _00_ = EN = 3
      '1', // _01_ = EP = 1
    ], [
      '2', // _10_ = IN = 2
      '4', // _11_ = IP = 4
    ],
]



// body = age + gender
const element_outside = [
    [
      'C', // 0__0 = SF = C
      'A', // 0__1 = SM = A
    ], [
      'B', // 1__0 = LF = B
      'D', // 1__1 = LM = D
    ],
]



const idxFromDim = {
  'A': 0,
  'S': 1,
  'M': 2,
  'G': 3,

  'a': 0,
  's': 1,
  'm': 2,
  'g': 3,}


function getDimBit(asmg, dim) {
  //global idxFromDim
  return asmg[idxFromDim[dim]]
}

function letterFromASMG(dim, asmg) { //TODO change to (asmg, dim)
  // ASMG
  const i = idxFromDim[dim]
  //document.write('dim '+dim+'   idx '+i)
  if (i !== undefined) {
    return letter_asmg[i][asmg[i]]
  }
  // element
  if (dim == 'E' || dim == 'e') {
    return element[asmg[1]][asmg[2]]
  }
  // outside element = Body = material = family role
  if (dim == 'B' || dim == 'b') {
    return element_outside[asmg[0]][asmg[3]]
  }
}



/*
if(Array.prototype.contains) {
  console.warn("Overriding existing Array.prototype.contains. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}
*/
Array.prototype.contains = function(needle) {
  return this.indexOf(needle) !== -1
};

// modulo function, also for negative numbers
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n
}



// body + element = asmg
// young age: aa = 00
const C3 = 0b0000;
const A3 = 0b0001;
const C1 = 0b0010;
const A1 = 0b0011;
const C2 = 0b0100;
const A2 = 0b0101;
const C4 = 0b0110;
const A4 = 0b0111;
// old age: aa = 01
const B3 = 0b1000;
const D3 = 0b1001;
const B1 = 0b1010;
const D1 = 0b1011;
const B2 = 0b1100;
const D2 = 0b1101;
const B4 = 0b1110;
const D4 = 0b1111;
// no age: aa = 10
const F3 = 0b10000;
const M3 = 0b10001;
const F1 = 0b10010;
const M1 = 0b10011;
const F2 = 0b10100;
const M2 = 0b10101;
const F4 = 0b10110;
const M4 = 0b10111;



// sync with /scripts/translate.js
const langMap = {
  zh: 'zh-CN', // simplified chinese
};

function getLang(str) {
  if (str && str in langMap) return langMap[str];
  return str;
}



function add_footers() {
  // add page footers
  const page_array = Array.from(document.querySelectorAll('.page-container'));
  const num_pages = page_array.length;
  const booklet_last_idx = (Math.ceil(num_pages / 4) * 4) - 1;
  page_array.forEach((page_div, page_idx) => {
    if (page_idx == 0 || page_idx == booklet_last_idx) return; // skip first and last page

    // TODO translate
    const span_page = `<span>Seite ${page_idx + 1}</span>`;

    const span_license = `<span>${meta['license.shortname']}</span>`;
    //const span_title = `<span>${meta.filename}</span>`;
    const span_title = (page_idx % 2 == 0)
      ? `<span class="url">${meta.filename}</span>`
      : `<span class="url">${meta.homepage}</span>`
    ;

    if (page_idx % 2 == 1) {
      page_div.innerHTML += `
        <div class="footer">
          ${span_page}
          ${span_license}
          ${span_title}
        </div>
      `;
    } else {
      page_div.innerHTML += `
        <div class="footer">
          ${span_title}
          ${span_license}
          ${span_page}
        </div>
      `;
    }
  });
}



function isRtlLang(lang) {
  return lang == 'fa'; // TODO more ...
}

var current_lang = 'en'; // global state
const languages = new Set(metadata.languages.split(' '));

function set_language(lang) {

  if (!lang) lang = metadata.defaultLanguage;

  // lang can be 'en-US' or similar from browser language settings
  if (!languages.has(lang)) {
    const shortLang = (lang || '').split('-')[0];
    if (languages.has(shortLang)) lang = shortLang;
    else lang = 'en'; // fallback
  }

  if (current_lang == lang) return; // noop

  current_lang = lang;

  // right to left -- left to right
  document.dir = isRtlLang(lang) ? 'rtl' : 'ltr';

  // language code as used in html sources
  // e.g. en, de, ru, zh-CN, ...
  const fullLang = getLang(lang);

  //const shortLang = (fullLang || '').split('-')[0]; // = lang before getLang ...
  console.log(`set_language: lang = ${lang}, fullLang = ${fullLang}`)



  document.querySelectorAll('.langs').forEach(fragment => {
    // TODO more efficient?
    // only change css class of body -> show/hide lang fragments with css
    let langFound = 0;
    Array.prototype.forEach.apply(fragment.children, [node => {
      if (node.lang) {
        if (node.lang == fullLang) {
          node.classList.remove('hidden');
          langFound++;
        }
        else node.classList.add('hidden');
      }
    }]);
    if (langFound == 0) {
      // set default lang
      Array.prototype.forEach.apply(fragment.children, [node => {
        if (node.lang) {
          if (node.lang == metadata.defaultLanguage) {
            node.classList.remove('hidden');
            langFound++;
          }
          else node.classList.add('hidden');
        }
      }]);
    }
    else if (langFound > 1) {
      console.warn(`found multiple translations for lang "${lang}" in`, fragment);
    }

  });

  document.querySelectorAll('.language-menu button').forEach(b => b.classList.remove('active'));
  document.querySelector('#language-button-'+lang).classList.add('active');

}



let meta;
let query;



function toggleModal(id, action = null) {
  const target = document.getElementById(id);
  if (!target) return console.error(`modal ${id} not found`);
  if (action == 'open') target.classList.add('show');
  else if (action == 'close') target.classList.remove('show');
  else target.classList.toggle('show');
}
function openModal(id) {
  toggleModal(id, 'open');
}
function closeModal(id) {
  toggleModal(id, 'close');
}
window.openModal = openModal; // global
window.closeModal = closeModal; // global



function add_language_menu() {
  document.querySelector('.language-menu').innerHTML = meta.languages.split(/\s+/).map(lang =>
    `<button class="language-button" id="language-button-${lang}" onclick="add_query({ lang: '${lang}' })">${lang}</button>`
  ).join('\n');
  /* not working. why?
  const langMenu = document.querySelector('.language-menu');
  meta.languages.split(/\s+/).forEach(lang => {
    const button = document.createElement('button');
    button.classList.add('language-button');
    button.id = `language-button-${lang}`;
    button.onclick = (event) => {
      console.log('onclick', event.target)
      add_query({ lang })
    };
    button.innerHTML = lang;
    langMenu.appendChild(button);
  })
  */

  // scroll to change language

  /* not working. (why??)
  document.querySelector('.language-menu').addEventListener('wheel', event => {
    console.log('menu wheel ' + event.deltaY);
  });
  */

  const lang_list = meta.languages.split(/\s+/);
  document.querySelector('#screen-menu').addEventListener('wheel', event => {
    if (event.target.classList.contains('language-button')) {
      event.preventDefault();
      const sign = Math.sign(event.deltaY);
      //const next_lang_id = (lang_list.indexOf(current_lang) + sign) % lang_list.length;
      const next_lang_id = (lang_list.indexOf(current_lang) + sign).mod(lang_list.length);
      const next_lang = lang_list[next_lang_id];
      //console.log(`onwheel: next_lang = ${next_lang}, next_lang_id = ${next_lang_id}, current_lang_id = ${lang_list.indexOf(current_lang)}`)
      //set_language(next_lang);
      add_query({ lang: next_lang })
    }
  });

}



function make_booklet() {

  const page_list = document.querySelectorAll('.page-container');

  const num_pages = page_list.length;
  const num_sheets = Math.ceil(num_pages / 4);

  //console.log(`${num_sheets} sheets + ${num_pages} pages + ${4*num_sheets} print-pages`);

  function sheet_of_page(page_idx) {
    // global: num_sheets
    // return: sheet_idx
    const print_pages = num_sheets * 4;
    if (page_idx < print_pages/2) {
      return Math.floor(page_idx/2);
    }
    else if (print_pages/2 <= page_idx && page_idx <= print_pages/2+1) {
      return Math.floor((page_idx - 2)/2);
    }
    else {
      return Math.floor((print_pages - page_idx - 1)/2);
    }
  }
  //console.log(Array.from({ length: num_pages }).map((_, i) => `${i} -> ${sheet_of_page(i)}`).join('\n'))

  function is_right_page(page_idx) {
    return (page_idx + 1) % 2;
  }

  function is_sheet_back(page_idx) {
    const print_pages = num_sheets * 4;
    if (page_idx < print_pages/2) {
      return page_idx % 2;
    }
    else {
      return (page_idx + 1) % 2;
    }
  }
  //console.log(Array.from({ length: num_pages }).map((_, i) => `${i} -> ${is_sheet_back(i)}`).join('\n'))

  function is_page_center_left(page_idx) {
    const print_pages = num_sheets * 4;
    return page_idx == print_pages/2 - 1;
  }

  for (const [page_idx, page] of page_list.entries()) {
    const page_num = page_idx + 1;

    const top_idx = sheet_of_page(page_idx) * 2 + is_sheet_back(page_idx);
    const left_idx = is_right_page(page_idx);
    //console.log(`page ${page_num}: ${top_idx} top + ${left_idx} left. ${is_sheet_back(page_idx)} back. ${is_right_page(page_idx)} right`);
    page.style.gridColumn = `${left_idx+1}`;
    page.style.gridRow = `${top_idx+1}`;
    
    if (is_page_center_left(page_idx)) {
      page.classList.add('booklet-center-left');
    }
  }

  document.querySelector('#pages-container').classList.add('booklet-grid');

}



function make_twopage() {

  const page_list = document.querySelectorAll('.page-container');

  const num_pages = page_list.length;

  function sheet_of_page(page_idx) {
    return Math.floor((page_idx + 1)/2);
  }

  function is_right_page(page_idx) {
    return (page_idx + 1) % 2;
  }

  //console.log(Array.from({ length: num_pages }).map((_, i) => `sheet_of_page: ${i} -> ${sheet_of_page(i)}`).join('\n'))
  //console.log(Array.from({ length: num_pages }).map((_, i) => `is_right_page: ${i} -> ${is_right_page(i)}`).join('\n'))

  for (const [page_idx, page] of page_list.entries()) {
    const page_num = page_idx + 1;

    //const top_idx = sheet_of_page(page_idx) * 2 + is_sheet_back(page_idx);
    const top_idx = sheet_of_page(page_idx);
    const left_idx = is_right_page(page_idx);
    //console.log(`page ${page_num}: ${top_idx} top + ${left_idx} left. ${is_sheet_back(page_idx)} back. ${is_right_page(page_idx)} right`);
    page.style.gridColumn = `${left_idx+1}`;
    page.style.gridRow = `${top_idx+1}`;
  }

  document.querySelector('#pages-container').classList.add('booklet-grid');

}



const layoutData = {

  twopage: {
    name: 'Two Page',
    set: () => {
      document.querySelector('#pages-container').classList.add('twopage-grid');
      document.querySelector('#layout-button-twopage').classList.add('active');
      make_twopage();
    },
  },

  booklet: {
    name: 'Booklet',
    set: () => {
      document.querySelector('#pages-container').classList.add('booklet-grid');
      document.querySelector('#layout-button-booklet').classList.add('active');
      make_booklet();
    },
  },

  linear: {
    name: 'Linear',
    set: () => {
      document.querySelector('#layout-button-linear').classList.add('active');
    },
  },
};



const state = {
  auditMode: false,
  showFiles: false,
};

function handleChangeAuditMode(target) {
  //console.dir(event);
  state.auditMode = target.checked;
  //console.log(`audit mode: target.checked = ${target.checked}`);
  if (state.auditMode) {
    document.querySelector('html').classList.add('audit-mode');
    setPrintStyle({ print_orient: 'portrait' });
    // TODO force "linear" layout
  }
  else {
    document.querySelector('html').classList.remove('audit-mode');
    setPrintStyle(); // reset
  }
}
window.handleChangeAuditMode = handleChangeAuditMode; // global

// TODO add "two language" layout: compare two languages side by side



function handleChangeShowFiles(target) {
  state.showFiles = target.checked;
  if (state.showFiles) {
    document.querySelector('#pages-container').classList.add('show-files');
  }
  else {
    document.querySelector('#pages-container').classList.remove('show-files');
  }
}
window.handleChangeShowFiles = handleChangeShowFiles; // global



function add_layout_menu() {
  document.querySelector('.layout-menu').innerHTML = (
    Object.entries(layoutData).map(([layoutKey, layout]) => {
      return `<button id="layout-button-${layoutKey}" onclick="add_query({ layout: '${layoutKey}' })">${layout.name}</button>`
    }).join('\n')
    +
    `<label id="audit-mode-button"><input onChange="handleChangeAuditMode(this)" type="checkbox" id="audit-mode-checkbox"/> Audit Mode</label>`
    +
    `<label id="show-files-button"><input onChange="handleChangeShowFiles(this)" type="checkbox" id="show-files-checkbox"/> Show Files</label>`
  );

  /* not working ... probably setting innerHTML is (slightly) async
  function handleChangeAuditMode(event) {
    console.log(`audit mode: event.target.checked = ${event.target.checked}`);
  }
  const auditModeCheckbox = document.querySelector('#audit-mode-checkbox')
  auditModeCheckbox.onchange = handleChangeAuditMode;
  */
}



/*
  <a id="layout-button-booklet" href="#layout=booklet" class="layout-button">Booklet</a>
  <a id="layout-button-twopage" href="#layout=twopage" class="layout-button active">Two Page</a>
  <a id="layout-button-linear" href="#layout=linear" class="layout-button">Linear</a>
*/




// TODO listen for hashchange event
// TODO add function set_query, add_query

function add_query(obj) {
  //console.log('add_query', obj)
  const new_query = Object.assign(query, obj);
  document.location.hash = '#' + Object.keys(new_query).map(k => {
    return k + '=' + new_query[k];
  }).join('&');
}
window.add_query = add_query; // global

function get_query() {
  const query = Object.fromEntries(
    document.location.hash.slice(1).split('&').map(kv => {
      const i = kv.indexOf('=');
      const k = kv.slice(0, i);
      const v = kv.slice(i + 1);
      return [k, v];
    })
    .filter(kv => Boolean(kv[0]))
  );
  return query;
}



// https://stackoverflow.com/a/62700928/10440128
// restore cursor position after edit
class Cursor {
  static getCurrentCursorPosition(parentElement) {
      var selection = window.getSelection(),
          charCount = -1,
          node;
      
      if (selection.focusNode) {
          if (Cursor._isChildOf(selection.focusNode, parentElement)) {
              node = selection.focusNode; 
              charCount = selection.focusOffset;
              
              while (node) {
                  if (node === parentElement) {
                      break;
                  }

                  if (node.previousSibling) {
                      node = node.previousSibling;
                      charCount += node.textContent.length;
                  } else {
                      node = node.parentNode;
                      if (node === null) {
                          break;
                      }
                  }
              }
          }
      }
      
      return charCount;
  }
  
  static setCurrentCursorPosition(chars, element) {
      if (chars >= 0) {
          var selection = window.getSelection();
          
          let range = Cursor._createRange(element, { count: chars });

          if (range) {
              range.collapse(false);
              selection.removeAllRanges();
              selection.addRange(range);
          }
      }
  }
  
  static _createRange(node, chars, range) {
      if (!range) {
          range = document.createRange()
          range.selectNode(node);
          range.setStart(node, 0);
      }

      if (chars.count === 0) {
          range.setEnd(node, chars.count);
      } else if (node && chars.count >0) {
          if (node.nodeType === Node.TEXT_NODE) {
              if (node.textContent.length < chars.count) {
                  chars.count -= node.textContent.length;
              } else {
                  range.setEnd(node, chars.count);
                  chars.count = 0;
              }
          } else {
              for (var lp = 0; lp < node.childNodes.length; lp++) {
                  range = Cursor._createRange(node.childNodes[lp], chars, range);

                  if (chars.count === 0) {
                  break;
                  }
              }
          }
      } 

      return range;
  }
  
  static _isChildOf(node, parentElement) {
      while (node !== null) {
          if (node === parentElement) {
              return true;
          }
          node = node.parentNode;
      }

      return false;
  }
}



document.body.onload = function handle_body_loaded() {

  console.log('body loaded');

  meta = get_meta();
  query = get_query();

  add_language_menu();
  add_layout_menu();

  const userLang = query.lang || navigator.language || navigator.userLanguage;
  set_language(userLang); // must run after add_layout_menu



  add_footers();

  // attached/inlined SVG files to have only one HTML file
  // TODO make SVGs smaller, inkscape is too verbose

  // TODO move all this code to functions

  //color = {};
  color.middle = {};
  if (1) {
    // variant: eigencolor is middle
    color.middle.fire = "#ff0000";
    color.middle.earth = "#00ff00";
    color.middle.air = "#ffff00";
    color.middle.water = "#0000ff";
  } else {
    // variant: gegencolor is middle
    color.middle.fire = "#00ff00";
    color.middle.earth = "#ff0000";
    color.middle.air = "#0000ff";
    color.middle.water = "#ffff00";
  }

  // TODO verify leg positions. who has x-legs? wo has o-legs?
  // current variant: 14 have x-legs and 23 have o-legs
  // weak legs = x legs, strong legs = o legs



  // post process

  // transform custom element <nw>content</nw>
  Array.from(document.getElementsByTagName("nw")).forEach(e => {
    e.outerHTML = '<span class="nowrap-element">' + e.innerHTML + '</span>';
  });

  // replace innerHTML in all document nodes
  // https://stackoverflow.com/a/41886794/10440128
  function replaceOnDocument(pattern, string, target = document.body) {
    [ target, ...target.querySelectorAll(
      "*:not(script):not(noscript):not(style)")
    ].forEach(({ childNodes: [...nodes] }) => nodes.map(node => {
      if (node.nodeType === document.ELEMENT_NODE) {
        node.innerHTML = node.innerHTML.replace(pattern, string);
  }}));};

  // XO = X and square
  document.querySelectorAll('pre.xo').forEach(pre => {
    pre.innerHTML = pre.innerHTML
      //.replace(/x/g, '&xmark;') // too broad
      //.replace(/x/g, 'X')
      .replace(/o/g, '&square;')
    ;
  });

  // XO diagonal = plus and diamond/rhombus
  document.querySelectorAll('pre.xod').forEach(pre => {
    pre.innerHTML = pre.innerHTML
      //.replace(/\+/g, '+')
      //.replace(/\+/g, '<span class="plus-sign">&#x2A2F;</span>') // xmark + rotate 45deg
      .replace(/\+/g, '<span class="plus-sign">+</span>')
      
      .replace(/o/g, '<span class="diamond-sign">&diamond;</span>')
      //.replace(/o/g, '<span class="diamond-sign">&#x25A1;</span>') // square + rotate 45deg
    ;
  });



  // &xmark; = ⨯
  //replaceOnDocument(/&xmark;/g, '<span class="xmark-sign">&#x2A2F;</span>');
  replaceOnDocument(/&amp;xmark;/g, '<span class="xmark-sign">&#x2A2F;</span>');

  // &square; = □
  replaceOnDocument(/&square;/g, '<span class="square-sign">&#x25A1;</span>');

  // WHITE DIAMOND (U+25C7)
  //replaceOnDocument(/&diamond;/g, '<span class="diamond-sign">&#x25C7;</span>');

  // &rarr; = →
  //replaceOnDocument(/&rarr;/g, '<span class="rarr">&rarr;</span>');
  // not working. why?

  //    width="${120 * 0.5}mm" height="${120 * 0.5}mm"

  var svg_pallas_sign = `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 220"
    >
      <g transform="translate(110, 110)">
        <path fill="none" stroke="black" stroke-width="12" stroke-linejoin="round" stroke-linecap="round" d="
          M0+0 l50-50 l-50-50 l-50+50 z
          M0+0 v100
          M-50+50 h100
        "/>
      </g>
    </svg>
  `;
  document.querySelectorAll('div.pallas-sign').forEach(div => div.innerHTML = svg_pallas_sign);



  // variant 1
  // pro:
  //  * air = white = endomorph, hairless. yellow is virtual color in human nervous system (receptors detect red green blue)
  //  * water = black = ectomorph, hairy
  var div_eight_colors = document.getElementById('div_eight_colors');
  /*
  var color_name = [
    'Rot', 'Lila', 'Blau',
    'Orange', '', 'Türkis',
    'Gelb', 'Lime', 'Grün'
  ];
  var color_element = [
    1,  14,  4,
    13, '', 24,
    3, 23, 2
  ];
  */
  var color_name = [
    'Lime', 'Gelb', 'Orange',
    'Grün', '', 'Rot',
    'Türkis', 'Blau', 'Lila'
  ];
  var color_element = [
    23, 3, 13,
    2, '', 1,
    24, 4, 14
  ];
  var color_text_black = [
    1, 1, 1,
    1,  , 1,
    0, 0, 0
  ];
  var colormap = color.map;
  var a = 80; // grid constant
  var s = 10; // spacing
  var f = 20; // font size
  div_eight_colors.innerHTML += `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36mm" height="36mm"
        viewBox="0 0 ${3*a+2*s} ${3*a+2*s}"
      >
  ${color_element.map((element, i) => {
    var x = i % 3;
    var y = (i / 3) | 0; // |0 = round down to integer
    if (i != 4) return `<rect fill="${colormap[element]}" x="${x*(a+s)}" y="${y*(a+s)}" width="${a}" height="${a}" />`;
  }).join('\n')}    
      <g
        text-anchor="middle"
        dominant-baseline="central"
        font-size="${f}"
      >
    ${color_name.map((name, i) => {
      var x = i % 3;
      var y = (i / 3) | 0; // |0 = round down to integer
      const text_color = color_text_black[i] ? '#000000' : '#ffffff';
      const text_weight = color_text_black[i] ? '' : 'bold'; // TODO use bold font or larger font size?
      if (i == 4) return ''; // skip center of array
      return `
        <text fill="${text_color}" font-weight="${text_weight}" x="${(x+0.5)*(a+s)-0.5*s}" y="${(y+0.5)*(a+s)-0.5*s -0.6*f}">${color_element[i]}</text>
        <text fill="${text_color}" font-weight="${text_weight}" x="${(x+0.5)*(a+s)-0.5*s}" y="${(y+0.5)*(a+s)-0.5*s +0.6*f}">${name}</text>
      `;
    }).join('\n')}
      </g>
      </svg>
  `;



  if (false) {
    // variant 2

    var div_eight_colors = document.getElementById('div_eight_colors_v2');
    /*
    var color_name = [
      'Rot', 'Lila', 'Blau',
      'Orange', '', 'Türkis',
      'Gelb', 'Lime', 'Grün'
    ];
    var color_element = [
      1,  14,  4,
      13, '', 24,
      3, 23, 2
    ];
    */
    var color_name = [
      'Lime', 'Gelb', 'Orange',
      'Grün', '', 'Rot',
      'Türkis', 'Blau', 'Lila'
    ];
    var color_element = [
      23, 3, 13,
      2, '', 1,
      24, 4, 14
    ];
    var color_text_black = [
      1, 1, 1,
      1,  , 0,
      1, 0, 0
    ];
    var colormap = color.map_v2;
    var a = 80; // grid constant
    var s = 10; // spacing
    var f = 20; // font size
    div_eight_colors.innerHTML += `
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36mm" height="36mm"
          viewBox="0 0 ${3*a+2*s} ${3*a+2*s}"
        >
    ${color_element.map((element, i) => {
      var x = i % 3;
      var y = (i / 3) | 0; // |0 = round down to integer
      if (i != 4) return `<rect fill="${colormap[element]}" x="${x*(a+s)}" y="${y*(a+s)}" width="${a}" height="${a}" />`;
    }).join('\n')}    
        <g
          text-anchor="middle"
          dominant-baseline="central"
          font-size="${f}"
        >
    ${color_name.map((name, i) => {
      var x = i % 3;
      var y = (i / 3) | 0; // |0 = round down to integer
      const text_color = color_text_black[i] ? '#000000' : '#ffffff';
      const text_weight = color_text_black[i] ? '' : 'bold'; // TODO use bold font or larger font size?
      if (i == 4) return ''; // skip center of array
      return `
        <text fill="${text_color}" font-weight="${text_weight}" x="${(x+0.5)*(a+s)-0.5*s}" y="${(y+0.5)*(a+s)-0.5*s -0.6*f}">${color_element[i]}</text>
        <text fill="${text_color}" font-weight="${text_weight}" x="${(x+0.5)*(a+s)-0.5*s}" y="${(y+0.5)*(a+s)-0.5*s +0.6*f}">${name}</text>
      `;
    }).join('\n')}
        </g>
        </svg>
    `;
  }






  // postprocess: colorize <pre class="map16">
  document.querySelectorAll('pre.map16').forEach(pre => {
    //const fragment = document.createDocumentFragment();
    pre.innerHTML = pre.innerHTML.replace(/[1234ABCD]/g, char => {
      return `<span class="color-${char}">${char}</span>`;
    });
  });

  // reorder pages for booklet printing
  // TODO solve with CSS only?
  // print settings:
  //  * A4 landscape
  //  * duplex + flip on short edge


  function set_layout(layout) {
    if (!(layout in layoutData)) {
      layout = 'twopage'; // default layout
    }

    document.querySelector('#pages-container').classList.remove('booklet-grid');
    document.querySelector('#pages-container').classList.remove('twopage-grid');
    document.querySelectorAll('.layout-menu button').forEach(b => b.classList.remove('active'));

    layoutData[layout].set();
  }


  //const toggle_link = document.getElementById('toggle-booklet-mode');

  function parse_query() {
  
    const query = get_query();
    
    console.log(`query: ${Object.keys(query).map(key => `${key} = ${query[key]}`).join(' & ')}`);

    set_layout(query.layout);
    set_language(query.lang);
  }



  parse_query();
  window.addEventListener('hashchange', event => parse_query(), {});



  // detect darkreader style
  // https://github.com/darkreader/darkreader/issues/4342
  (() => {
    const head = document.querySelector('head');
    const handleMutation = () => {
      const darkreaderSelector = 'meta[name="darkreader"]';
      //darkreaderSelector = 'style#dark-reader-style',
      const darkreaderActive = (head.querySelector(darkreaderSelector) != null);
      //console.log(`darkreader active? ` + darkreaderActive),
      document.body.classList.toggle('dark-reader', darkreaderActive);
    };
    handleMutation();
    new MutationObserver(handleMutation).observe(head, { childList: true });
  })();

} // handle_body_loaded
