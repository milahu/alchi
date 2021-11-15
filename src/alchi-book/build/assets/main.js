const e={languages:"en es de tr ru ar fa cs ro hu zh",defaultLanguage:"en",primarylanguage:"en",basename:{de:"alchi-book"},iconSvgPath:"alchi-pallas-symbol.small.svg",title:"Your Blog Name",version:"2021-11-15",url:"https://example.com/",description:"description",keywords:"keywords",feed:{subtitle:"I am writing about my experiences as a naval navel-gazer.",filename:"feed.xml",path:"/feed/feed.xml",id:"https://example.com/"},jsonfeed:{path:"/feed/feed.json",url:"https://example.com/feed/feed.json"},author:{name:"Milan Hauth",email:"milahu@gmail.com",url:"https://github.com/milahu"}};console.log("metadata",e);const{print_size:n,print_orient:t,print_scale:o,page_x:a,page_y:r}={print_size:"A4",print_orient:"landscape",print_scale:1,page_x:149.5,page_y:211.1},s=7,l=5,i=10.5,c=6,d={map:{4:"#000066",3:"#ffff99",1:"#ff0000",2:"#00ff00",24:"#00a9a9",23:"#abff57",13:"#ffab57",14:"#a800a8"},map_v2:{1:"#a80000",2:"#58ff58",3:"#ffff58",4:"#0000a8",14:"#660066",23:"#ccff99",13:"#ff8000",24:"#00ffff"},light:{1:"#ffc0c0",2:"#c0ffc0",3:"#ffff80",4:"#c0c0ff",13:"#ffdfc0",24:"#c0ffff",14:"#ffc0ff",23:"#dfffc0"},dark:{1:"#800000",2:"#008000",3:"#808000",4:"#000080"},text:{1:"#cc0000",2:"#008000",3:"#808000",4:"#0000cb"},medium:{1:"#ff0000",2:"#00ff00",3:"#ffff00",4:"#0000ff",13:"#ff9100",24:"#00ffee",14:"#ea00ff",23:"#aaff00"}};function u(e){const n=d[e];return Object.keys(n).reduce(((t,o)=>t+"--"+e+o+": "+n[o]+";\n"),"")}function m(e,n){const t=`${e}-style`;(document.querySelector(`#${t}`)||(()=>{const e=document.createElement("style");return e.id=t,document.querySelector("head").appendChild(e),e})()).innerHTML=n}function f(e={}){console.log(`setPrintStyle: print_orient -> ${e.print_orient||t}`),m("print",`\n\n    /* print settings */\n    /* css variables dont work here */\n    @page {\n      margin: 0; /* no print margin */\n      size: ${e.print_size||n} ${e.print_orient||t};\n      /* workaround for broken pattern-offsets in pdfnup/bookletimposer TODO verify */\n      body {transform: scale(${e.print_scale||o});\n    }\n\n  `)}d.map.A=d.map[1],d.map.B=d.map[2],d.map.C=d.map[3],d.map.D=d.map[4],m("root",`\n\n    /* set css variables */\n    :root {\n\n      --print_size: ${n};\n      --print_scale: ${o};\n\n      --font-size: 3.8mm;\n      /* TODO use points? like 10pt\n        for better print quality? */\n\n      --page-width: ${a}mm;\n      --page-height: ${r}mm;\n\n      --page-width-base: ${a}mm;\n      --page-height-base: ${r}mm;\n\n      --page-margin-top: ${s}mm;\n      --page-margin-bottom: ${l}mm;\n\n      --page-margin-inside: ${i}mm;\n      --page-margin-outside: ${c}mm;\n\n      ${u("light")}\n      ${u("dark")}\n      ${u("medium")}\n      ${u("text")}\n\n    }\n  `),f(),Array.prototype.contains=function(e){return-1!==this.indexOf(e)},Number.prototype.mod=function(e){return(this%e+e)%e};const g={zh:"zh-CN"};var p="en";const h=new Set(e.languages.split(" "));function y(n){if(n||(n=e.defaultLanguage),!h.has(n)){const e=(n||"").split("-")[0];n=h.has(e)?e:"en"}if(p==n)return;p=n,document.dir=function(e){return"fa"==e}(n)?"rtl":"ltr";const t=(o=n)&&o in g?g[o]:o;var o;console.log(`set_language: lang = ${n}, fullLang = ${t}`),document.querySelectorAll(".langs").forEach((o=>{let a=0;Array.prototype.forEach.apply(o.children,[e=>{e.lang&&(e.lang==t?(e.classList.remove("hidden"),a++):e.classList.add("hidden"))}]),0==a?Array.prototype.forEach.apply(o.children,[n=>{n.lang&&(n.lang==e.defaultLanguage?(n.classList.remove("hidden"),a++):n.classList.add("hidden"))}]):a>1&&console.warn(`found multiple translations for lang "${n}" in`,o)})),document.querySelectorAll(".language-menu button").forEach((e=>e.classList.remove("active"))),document.querySelector("#language-button-"+n).classList.add("active")}let $,b;function w(e,n=null){const t=document.getElementById(e);if(!t)return console.error(`modal ${e} not found`);"open"==n?t.classList.add("show"):"close"==n?t.classList.remove("show"):t.classList.toggle("show")}window.openModal=function(e){w(e,"open")},window.closeModal=function(e){w(e,"close")};const L={twopage:{name:"Two Page",set:()=>{document.querySelector("#pages-container").classList.add("twopage-grid"),document.querySelector("#layout-button-twopage").classList.add("active"),function(){const e=document.querySelectorAll(".page-container");function n(e){return Math.floor((e+1)/2)}function t(e){return(e+1)%2}e.length;for(const[o,a]of e.entries()){const e=n(o),r=t(o);a.style.gridColumn=`${r+1}`,a.style.gridRow=`${e+1}`}document.querySelector("#pages-container").classList.add("booklet-grid")}()}},booklet:{name:"Booklet",set:()=>{document.querySelector("#pages-container").classList.add("booklet-grid"),document.querySelector("#layout-button-booklet").classList.add("active"),function(){const e=document.querySelectorAll(".page-container"),n=e.length,t=Math.ceil(n/4);function o(e){const n=4*t;return e<n/2?Math.floor(e/2):n/2<=e&&e<=n/2+1?Math.floor((e-2)/2):Math.floor((n-e-1)/2)}function a(e){return(e+1)%2}function r(e){return e<4*t/2?e%2:(e+1)%2}function s(e){return e==4*t/2-1}for(const[l,i]of e.entries()){const e=2*o(l)+r(l),n=a(l);i.style.gridColumn=`${n+1}`,i.style.gridRow=`${e+1}`,s(l)&&i.classList.add("booklet-center-left")}document.querySelector("#pages-container").classList.add("booklet-grid")}()}},linear:{name:"Linear",set:()=>{document.querySelector("#layout-button-linear").classList.add("active")}}},v={auditMode:!1,showFiles:!1};function q(e){const n=Object.assign(b,e);document.location.hash="#"+Object.keys(n).map((e=>e+"="+n[e])).join("&")}function S(){return Object.fromEntries(document.location.hash.slice(1).split("&").map((e=>{const n=e.indexOf("=");return[e.slice(0,n),e.slice(n+1)]})).filter((e=>Boolean(e[0]))))}window.handleChangeAuditMode=function(e){v.auditMode=e.checked,v.auditMode?(document.querySelector("html").classList.add("audit-mode"),f({print_orient:"portrait"})):(document.querySelector("html").classList.remove("audit-mode"),f())},window.handleChangeShowFiles=function(e){v.showFiles=e.checked,v.showFiles?document.querySelector("#pages-container").classList.add("show-files"):document.querySelector("#pages-container").classList.remove("show-files")},window.add_query=q,document.body.onload=function(){console.log("body loaded"),$=function(){const e=Array.from(document.querySelectorAll("meta[name]")).reduce(((e,n)=>Object.assign(e,{[n.name]:n.content})),{});return e.lang=document.querySelector("html").lang,e.docname=`${e["basename.de"]}.${e.version}`,document.title=e.docname,e.filename=`${e.docname}.html`,Object.keys(e).forEach((n=>console.log(`meta: ${n}: ${e[n]}`))),e}(),b=S(),function(){document.querySelector(".language-menu").innerHTML=$.languages.split(/\s+/).map((e=>`<button class="language-button" id="language-button-${e}" onclick="add_query({ lang: '${e}' })">${e}</button>`)).join("\n");const e=$.languages.split(/\s+/);document.querySelector("#screen-menu").addEventListener("wheel",(n=>{if(n.target.classList.contains("language-button")){n.preventDefault();const t=Math.sign(n.deltaY),o=(e.indexOf(p)+t).mod(e.length);q({lang:e[o]})}}))}(),document.querySelector(".layout-menu").innerHTML=Object.entries(L).map((([e,n])=>`<button id="layout-button-${e}" onclick="add_query({ layout: '${e}' })">${n.name}</button>`)).join("\n")+'<label id="audit-mode-button"><input onChange="handleChangeAuditMode(this)" type="checkbox" id="audit-mode-checkbox"/> Audit Mode</label><label id="show-files-button"><input onChange="handleChangeShowFiles(this)" type="checkbox" id="show-files-checkbox"/> Show Files</label>';function e(e,n,t=document.body){[t,...t.querySelectorAll("*:not(script):not(noscript):not(style)")].forEach((({childNodes:[...t]})=>t.map((t=>{t.nodeType===document.ELEMENT_NODE&&(t.innerHTML=t.innerHTML.replace(e,n))}))))}y(b.lang||navigator.language||navigator.userLanguage),function(){const e=Array.from(document.querySelectorAll(".page-container")),n=e.length,t=4*Math.ceil(n/4)-1;e.forEach(((e,n)=>{if(0==n||n==t)return;const o=`<span>Seite ${n+1}</span>`,a=`<span>${$["license.shortname"]}</span>`,r=n%2==0?`<span class="url">${$.filename}</span>`:`<span class="url">${$.homepage}</span>`;e.innerHTML+=n%2==1?`\n        <div class="footer">\n          ${o}\n          ${a}\n          ${r}\n        </div>\n      `:`\n        <div class="footer">\n          ${r}\n          ${a}\n          ${o}\n        </div>\n      `}))}(),d.middle={},d.middle.fire="#ff0000",d.middle.earth="#00ff00",d.middle.air="#ffff00",d.middle.water="#0000ff",Array.from(document.getElementsByTagName("nw")).forEach((e=>{e.outerHTML='<span class="nowrap-element">'+e.innerHTML+"</span>"})),document.querySelectorAll("pre.xo").forEach((e=>{e.innerHTML=e.innerHTML.replace(/o/g,"&square;")})),document.querySelectorAll("pre.xod").forEach((e=>{e.innerHTML=e.innerHTML.replace(/\+/g,'<span class="plus-sign">+</span>').replace(/o/g,'<span class="diamond-sign">&diamond;</span>')})),e(/&amp;xmark;/g,'<span class="xmark-sign">&#x2A2F;</span>'),e(/&square;/g,'<span class="square-sign">&#x25A1;</span>');var n=document.getElementById("div_eight_colors"),t=[23,3,13,2,"",1,24,4,14],o=[1,1,1,1,,1,0,0,0],a=d.map;function r(){const e=S();var n;console.log(`query: ${Object.keys(e).map((n=>`${n} = ${e[n]}`)).join(" & ")}`),(n=e.layout)in L||(n="twopage"),document.querySelector("#pages-container").classList.remove("booklet-grid"),document.querySelector("#pages-container").classList.remove("twopage-grid"),document.querySelectorAll(".layout-menu button").forEach((e=>e.classList.remove("active"))),L[n].set(),y(e.lang)}n.innerHTML+=`\n      <svg\n        xmlns="http://www.w3.org/2000/svg"\n        width="36mm" height="36mm"\n        viewBox="0 0 260 260"\n      >\n  ${t.map(((e,n)=>{var t=n%3,o=n/3|0;if(4!=n)return`<rect fill="${a[e]}" x="${90*t}" y="${90*o}" width="80" height="80" />`})).join("\n")}    \n      <g\n        text-anchor="middle"\n        dominant-baseline="central"\n        font-size="20"\n      >\n    ${["Lime","Gelb","Orange","Grün","","Rot","Türkis","Blau","Lila"].map(((e,n)=>{var a=n%3,r=n/3|0;const s=o[n]?"#000000":"#ffffff",l=o[n]?"":"bold";return 4==n?"":`\n        <text fill="${s}" font-weight="${l}" x="${90*(a+.5)-5}" y="${90*(r+.5)-5-12}">${t[n]}</text>\n        <text fill="${s}" font-weight="${l}" x="${90*(a+.5)-5}" y="${90*(r+.5)-5+12}">${e}</text>\n      `})).join("\n")}\n      </g>\n      </svg>\n  `,document.querySelectorAll("pre.map16").forEach((e=>{e.innerHTML=e.innerHTML.replace(/[1234ABCD]/g,(e=>`<span class="color-${e}">${e}</span>`))})),r(),window.addEventListener("hashchange",(e=>r()),{}),(()=>{const e=document.querySelector("head"),n=()=>{const n=null!=e.querySelector('meta[name="darkreader"]');document.body.classList.toggle("dark-reader",n)};n(),new MutationObserver(n).observe(e,{childList:!0})})()};
