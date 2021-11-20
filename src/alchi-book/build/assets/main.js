const metadata = {
  languages: "en es de tr ru ar fa cs ro hu zh",
  defaultLanguage: "en",
  primarylanguage: "en",
  basename: {
    de: "alchi-book"
  },
  iconSvgPath: "alchi-pallas-symbol.small.svg",
  title: "Your Blog Name",
  version: "2021-11-20",
  url: "https://example.com/",
  description: "description",
  keywords: "keywords",
  feed: {
    subtitle: "I am writing about my experiences as a naval navel-gazer.",
    filename: "feed.xml",
    path: "/feed/feed.xml",
    id: "https://example.com/"
  },
  jsonfeed: {
    path: "/feed/feed.json",
    url: "https://example.com/feed/feed.json"
  },
  author: {
    name: "Milan Hauth",
    email: "milahu@gmail.com",
    url: "https://github.com/milahu"
  }
};
console.log("metadata", metadata);
function get_meta() {
  const meta2 = Array.from(document.querySelectorAll("meta[name]")).reduce((acc, meta3) => Object.assign(acc, {
    [meta3.name]: meta3.content
  }), {});
  meta2.lang = document.querySelector("html").lang;
  meta2.docname = `${meta2["basename.de"]}.${meta2.version}`;
  document.title = meta2.docname;
  meta2.filename = `${meta2.docname}.html`;
  Object.keys(meta2).forEach((k) => console.log(`meta: ${k}: ${meta2[k]}`));
  return meta2;
}
const {
  print_size,
  print_orient,
  print_scale,
  page_x,
  page_y
} = {
  print_size: "A4",
  print_orient: "landscape",
  print_scale: 1,
  page_x: 149.5,
  page_y: 211.1
};
const offset_top = 1;
const offset_inside_only = 1.5;
const margin_size = 6;
const page_margin = {
  top: margin_size + offset_top,
  bottom: margin_size - offset_top,
  inside: 1.5 * margin_size + offset_inside_only,
  outside: margin_size
};
const font_size = 3.8;
const color = {
  map: {
    4: "#000066",
    3: "#ffff99",
    1: "#ff0000",
    2: "#00ff00",
    24: "#00a9a9",
    23: "#abff57",
    13: "#ffab57",
    14: "#a800a8"
  },
  map_v2: {
    1: "#a80000",
    2: "#58ff58",
    3: "#ffff58",
    4: "#0000a8",
    14: "#660066",
    23: "#ccff99",
    13: "#ff8000",
    24: "#00ffff"
  },
  light: {
    1: "#ffc0c0",
    2: "#c0ffc0",
    3: "#ffff80",
    4: "#c0c0ff",
    13: "#ffdfc0",
    24: "#c0ffff",
    14: "#ffc0ff",
    23: "#dfffc0"
  },
  dark: {
    1: "#800000",
    2: "#008000",
    3: "#808000",
    4: "#000080"
  },
  text: {
    1: "#cc0000",
    2: "#008000",
    3: "#808000",
    4: "#0000cb"
  },
  medium: {
    1: "#ff0000",
    2: "#00ff00",
    3: "#ffff00",
    4: "#0000ff",
    13: "#ff9100",
    24: "#00ffee",
    14: "#ea00ff",
    23: "#aaff00"
  }
};
color.map.A = color.map[1];
color.map.B = color.map[2];
color.map.C = color.map[3];
color.map.D = color.map[4];
function cssVarsOfColorMap(mapname) {
  const mapval = color[mapname];
  return Object.keys(mapval).reduce((acc, key) => {
    return acc + "--" + mapname + key + ": " + mapval[key] + ";\n";
  }, "");
}
function setStyle(key, styleString) {
  const id = `${key}-style`;
  const style = document.querySelector(`#${id}`) || (() => {
    const style2 = document.createElement("style");
    style2.id = id;
    document.querySelector("head").appendChild(style2);
    return style2;
  })();
  style.innerHTML = styleString;
}
function setRootStyle() {
  setStyle("root", `

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
  setStyle("print", `

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
setRootStyle();
setPrintStyle();
Array.prototype.contains = function(needle) {
  return this.indexOf(needle) !== -1;
};
Number.prototype.mod = function(n) {
  return (this % n + n) % n;
};
const langMap = {
  zh: "zh-CN"
};
function getLang(str) {
  if (str && str in langMap)
    return langMap[str];
  return str;
}
function add_footers() {
  const page_array = Array.from(document.querySelectorAll(".page-container"));
  const num_pages = page_array.length;
  const booklet_last_idx = Math.ceil(num_pages / 4) * 4 - 1;
  page_array.forEach((page_div, page_idx) => {
    if (page_idx == 0 || page_idx == booklet_last_idx)
      return;
    const span_page = `<span>Seite ${page_idx + 1}</span>`;
    const span_license = `<span>${meta["license.shortname"]}</span>`;
    const span_title = page_idx % 2 == 0 ? `<span class="url">${meta.filename}</span>` : `<span class="url">${meta.homepage}</span>`;
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
  return lang == "fa";
}
var current_lang = "en";
const languages = new Set(metadata.languages.split(" "));
function set_language(lang) {
  if (!lang)
    lang = metadata.defaultLanguage;
  if (!languages.has(lang)) {
    const shortLang = (lang || "").split("-")[0];
    if (languages.has(shortLang))
      lang = shortLang;
    else
      lang = "en";
  }
  if (current_lang == lang)
    return;
  current_lang = lang;
  document.dir = isRtlLang(lang) ? "rtl" : "ltr";
  const fullLang = getLang(lang);
  console.log(`set_language: lang = ${lang}, fullLang = ${fullLang}`);
  document.querySelectorAll(".langs").forEach((fragment) => {
    let langFound = 0;
    Array.prototype.forEach.apply(fragment.children, [(node) => {
      if (node.lang) {
        if (node.lang == fullLang) {
          node.classList.remove("hidden");
          langFound++;
        } else
          node.classList.add("hidden");
      }
    }]);
    if (langFound == 0) {
      Array.prototype.forEach.apply(fragment.children, [(node) => {
        if (node.lang) {
          if (node.lang == metadata.defaultLanguage) {
            node.classList.remove("hidden");
            langFound++;
          } else
            node.classList.add("hidden");
        }
      }]);
    } else if (langFound > 1) {
      console.warn(`found multiple translations for lang "${lang}" in`, fragment);
    }
  });
  document.querySelectorAll(".language-menu button").forEach((b) => b.classList.remove("active"));
  document.querySelector("#language-button-" + lang).classList.add("active");
}
let meta;
let query;
function toggleModal(id, action = null) {
  const target = document.getElementById(id);
  if (!target)
    return console.error(`modal ${id} not found`);
  if (action == "open")
    target.classList.add("show");
  else if (action == "close")
    target.classList.remove("show");
  else
    target.classList.toggle("show");
}
function openModal(id) {
  toggleModal(id, "open");
}
function closeModal(id) {
  toggleModal(id, "close");
}
window.openModal = openModal;
window.closeModal = closeModal;
function add_language_menu() {
  document.querySelector(".language-menu").innerHTML = meta.languages.split(/\s+/).map((lang) => `<button class="language-button" id="language-button-${lang}" onclick="add_query({ lang: '${lang}' })">${lang}</button>`).join("\n");
  const lang_list = meta.languages.split(/\s+/);
  document.querySelector("#screen-menu").addEventListener("wheel", (event) => {
    if (event.target.classList.contains("language-button")) {
      event.preventDefault();
      const sign = Math.sign(event.deltaY);
      const next_lang_id = (lang_list.indexOf(current_lang) + sign).mod(lang_list.length);
      const next_lang = lang_list[next_lang_id];
      add_query({
        lang: next_lang
      });
    }
  });
}
function make_booklet() {
  const page_list = document.querySelectorAll(".page-container");
  const num_pages = page_list.length;
  const num_sheets = Math.ceil(num_pages / 4);
  function sheet_of_page(page_idx) {
    const print_pages = num_sheets * 4;
    if (page_idx < print_pages / 2) {
      return Math.floor(page_idx / 2);
    } else if (print_pages / 2 <= page_idx && page_idx <= print_pages / 2 + 1) {
      return Math.floor((page_idx - 2) / 2);
    } else {
      return Math.floor((print_pages - page_idx - 1) / 2);
    }
  }
  function is_right_page(page_idx) {
    return (page_idx + 1) % 2;
  }
  function is_sheet_back(page_idx) {
    const print_pages = num_sheets * 4;
    if (page_idx < print_pages / 2) {
      return page_idx % 2;
    } else {
      return (page_idx + 1) % 2;
    }
  }
  function is_page_center_left(page_idx) {
    const print_pages = num_sheets * 4;
    return page_idx == print_pages / 2 - 1;
  }
  for (const [page_idx, page] of page_list.entries()) {
    const top_idx = sheet_of_page(page_idx) * 2 + is_sheet_back(page_idx);
    const left_idx = is_right_page(page_idx);
    page.style.gridColumn = `${left_idx + 1}`;
    page.style.gridRow = `${top_idx + 1}`;
    if (is_page_center_left(page_idx)) {
      page.classList.add("booklet-center-left");
    }
  }
  document.querySelector("#pages-container").classList.add("booklet-grid");
}
function make_twopage() {
  const page_list = document.querySelectorAll(".page-container");
  page_list.length;
  function sheet_of_page(page_idx) {
    return Math.floor((page_idx + 1) / 2);
  }
  function is_right_page(page_idx) {
    return (page_idx + 1) % 2;
  }
  for (const [page_idx, page] of page_list.entries()) {
    const top_idx = sheet_of_page(page_idx);
    const left_idx = is_right_page(page_idx);
    page.style.gridColumn = `${left_idx + 1}`;
    page.style.gridRow = `${top_idx + 1}`;
  }
  document.querySelector("#pages-container").classList.add("booklet-grid");
}
const layoutData = {
  twopage: {
    name: "Two Page",
    set: () => {
      document.querySelector("#pages-container").classList.add("twopage-grid");
      document.querySelector("#layout-button-twopage").classList.add("active");
      make_twopage();
    }
  },
  booklet: {
    name: "Booklet",
    set: () => {
      document.querySelector("#pages-container").classList.add("booklet-grid");
      document.querySelector("#layout-button-booklet").classList.add("active");
      make_booklet();
    }
  },
  linear: {
    name: "Linear",
    set: () => {
      document.querySelector("#layout-button-linear").classList.add("active");
    }
  }
};
const state = {
  auditMode: false,
  showFiles: false
};
function handleChangeAuditMode(target) {
  state.auditMode = target.checked;
  if (state.auditMode) {
    document.querySelector("html").classList.add("audit-mode");
    setPrintStyle({
      print_orient: "portrait"
    });
  } else {
    document.querySelector("html").classList.remove("audit-mode");
    setPrintStyle();
  }
}
window.handleChangeAuditMode = handleChangeAuditMode;
function handleChangeShowFiles(target) {
  state.showFiles = target.checked;
  if (state.showFiles) {
    document.querySelector("#pages-container").classList.add("show-files");
  } else {
    document.querySelector("#pages-container").classList.remove("show-files");
  }
}
window.handleChangeShowFiles = handleChangeShowFiles;
function add_layout_menu() {
  document.querySelector(".layout-menu").innerHTML = Object.entries(layoutData).map(([layoutKey, layout]) => {
    return `<button id="layout-button-${layoutKey}" onclick="add_query({ layout: '${layoutKey}' })">${layout.name}</button>`;
  }).join("\n") + `<label id="audit-mode-button"><input onChange="handleChangeAuditMode(this)" type="checkbox" id="audit-mode-checkbox"/> Audit Mode</label><label id="show-files-button"><input onChange="handleChangeShowFiles(this)" type="checkbox" id="show-files-checkbox"/> Show Files</label>`;
}
function add_query(obj) {
  const new_query = Object.assign(query, obj);
  document.location.hash = "#" + Object.keys(new_query).map((k) => {
    return k + "=" + new_query[k];
  }).join("&");
}
window.add_query = add_query;
function get_query() {
  const query2 = Object.fromEntries(document.location.hash.slice(1).split("&").map((kv) => {
    const i = kv.indexOf("=");
    const k = kv.slice(0, i);
    const v = kv.slice(i + 1);
    return [k, v];
  }).filter((kv) => Boolean(kv[0])));
  return query2;
}
document.body.onload = function handle_body_loaded() {
  console.log("body loaded");
  meta = get_meta();
  query = get_query();
  add_language_menu();
  add_layout_menu();
  const userLang = query.lang || navigator.language || navigator.userLanguage;
  set_language(userLang);
  add_footers();
  color.middle = {};
  {
    color.middle.fire = "#ff0000";
    color.middle.earth = "#00ff00";
    color.middle.air = "#ffff00";
    color.middle.water = "#0000ff";
  }
  Array.from(document.getElementsByTagName("nw")).forEach((e) => {
    e.outerHTML = '<span class="nowrap-element">' + e.innerHTML + "</span>";
  });
  function replaceOnDocument(pattern, string, target = document.body) {
    [target, ...target.querySelectorAll("*:not(script):not(noscript):not(style)")].forEach(({
      childNodes: [...nodes]
    }) => nodes.map((node) => {
      if (node.nodeType === document.ELEMENT_NODE) {
        node.innerHTML = node.innerHTML.replace(pattern, string);
      }
    }));
  }
  document.querySelectorAll("pre").forEach((pre) => {
    pre.innerHTML = pre.innerHTML.replace(/^\./gm, " ");
  });
  document.querySelectorAll("pre.xo").forEach((pre) => {
    pre.innerHTML = pre.innerHTML.replace(/o/g, "&square;");
  });
  document.querySelectorAll("pre.xod").forEach((pre) => {
    pre.innerHTML = pre.innerHTML.replace(/\+/g, '<span class="plus-sign">+</span>').replace(/o/g, '<span class="diamond-sign">&diamond;</span>');
  });
  replaceOnDocument(/&amp;xmark;/g, '<span class="xmark-sign">&#x2A2F;</span>');
  replaceOnDocument(/&square;/g, '<span class="square-sign">&#x25A1;</span>');
  var div_eight_colors = document.getElementById("div_eight_colors");
  var color_name = ["Lime", "Gelb", "Orange", "Gr\xFCn", "", "Rot", "T\xFCrkis", "Blau", "Lila"];
  var color_element = [23, 3, 13, 2, "", 1, 24, 4, 14];
  var color_text_black = [1, 1, 1, 1, , 1, 0, 0, 0];
  var colormap = color.map;
  var a = 80;
  var s = 10;
  var f = 20;
  div_eight_colors.innerHTML += `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="36mm" height="36mm"
        viewBox="0 0 ${3 * a + 2 * s} ${3 * a + 2 * s}"
      >
  ${color_element.map((element, i) => {
    var x = i % 3;
    var y = i / 3 | 0;
    if (i != 4)
      return `<rect fill="${colormap[element]}" x="${x * (a + s)}" y="${y * (a + s)}" width="${a}" height="${a}" />`;
  }).join("\n")}    
      <g
        text-anchor="middle"
        dominant-baseline="central"
        font-size="${f}"
      >
    ${color_name.map((name, i) => {
    var x = i % 3;
    var y = i / 3 | 0;
    const text_color = color_text_black[i] ? "#000000" : "#ffffff";
    const text_weight = color_text_black[i] ? "" : "bold";
    if (i == 4)
      return "";
    return `
        <text fill="${text_color}" font-weight="${text_weight}" x="${(x + 0.5) * (a + s) - 0.5 * s}" y="${(y + 0.5) * (a + s) - 0.5 * s - 0.6 * f}">${color_element[i]}</text>
        <text fill="${text_color}" font-weight="${text_weight}" x="${(x + 0.5) * (a + s) - 0.5 * s}" y="${(y + 0.5) * (a + s) - 0.5 * s + 0.6 * f}">${name}</text>
      `;
  }).join("\n")}
      </g>
      </svg>
  `;
  var div_eight_colors, color_name, color_element, color_text_black, colormap, a, s, f;
  document.querySelectorAll("pre.map16").forEach((pre) => {
    pre.innerHTML = pre.innerHTML.replace(/[1234ABCD]/g, (char) => {
      return `<span class="color-${char}">${char}</span>`;
    });
  });
  function set_layout(layout) {
    if (!(layout in layoutData)) {
      layout = "twopage";
    }
    document.querySelector("#pages-container").classList.remove("booklet-grid");
    document.querySelector("#pages-container").classList.remove("twopage-grid");
    document.querySelectorAll(".layout-menu button").forEach((b) => b.classList.remove("active"));
    layoutData[layout].set();
  }
  function parse_query() {
    const query2 = get_query();
    console.log(`query: ${Object.keys(query2).map((key) => `${key} = ${query2[key]}`).join(" & ")}`);
    set_layout(query2.layout);
    set_language(query2.lang);
  }
  parse_query();
  window.addEventListener("hashchange", (event) => parse_query(), {});
  (() => {
    const head = document.querySelector("head");
    const handleMutation = () => {
      const darkreaderSelector = 'meta[name="darkreader"]';
      const darkreaderActive = head.querySelector(darkreaderSelector) != null;
      document.body.classList.toggle("dark-reader", darkreaderActive);
    };
    handleMutation();
    new MutationObserver(handleMutation).observe(head, {
      childList: true
    });
  })();
};
