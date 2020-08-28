"use strict";

function rgbOfHsv(h, s, v) {
  var r, g, b, i, f, p, q, t;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v, g = t, b = p;
      break;

    case 1:
      r = q, g = v, b = p;
      break;

    case 2:
      r = p, g = v, b = t;
      break;

    case 3:
      r = p, g = q, b = v;
      break;

    case 4:
      r = t, g = p, b = v;
      break;

    case 5:
      r = v, g = p, b = q;
      break;
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function hexOfRgb([r, g, b]) {
  return [r, g, b].reduce((acc, val) => {
    return acc + val.toString(16).padStart(2, '0');
  }, '#');
}

function hexOfHsv(h, s, v) {
  return hexOfRgb(rgbOfHsv(h, s, v));
} // 16 colors = hue steps of 15 degrees
// from 0 deg = red, to 315 deg = purple-red


const num = 16;
const numHalf = Math.round(0.5 * num);
const f_hue1 = 120 / 360 / numHalf;
const f_hue2 = 240 / 360 / numHalf;
const b_hue2 = 0.3333333333333333;
const s = 0.9; // natural saturation
//const V_min = 0.85
//const V_min = 0.8
//const V_min = 0.75
//const V_min = 0.6666666666666666666
//const V_min = 0.6
//const V_min = 0.5
const V_min = 0.25
//const V_min = 0.333333333333333333
//const V_min = 0.0

const V_max = 1.0;
const V_num = num * 0.5 + 1; //const html_1 = '<div style="background-color: '
//const html_2 = '"></div>'
//console.log('numHalf = '+numHalf)
//for (let V_min = 0.0; V_min <= 1.0; V_min += 0.1) {

const V_step = (V_max - V_min) / (V_num - 1);
let colors = {};
colors[16] = Array.from(Array(num).keys()).map(idx => {
  // FIXME lime should have V_max
  // TEST purple has V_min
  let h = 0;
  let v = 0;

  if (idx < numHalf) {
    h = idx * f_hue1;
  } else {
    h = b_hue2 + (idx - numHalf) * f_hue2;
  }

  const V_idx = (idx + 2) % num; // range 0 to 15
  // TODO avoid "2"
  // get value from hue

  if (V_idx < numHalf) {
    // value is rising
    v = V_min + V_idx * V_step;
  } else {
    // value is falling
    v = V_min + (num - V_idx) * V_step;
  }

  return hexOfHsv(h, s, v); //return [h, s, v]
  //console.log(html_1 + hexOfHsv(h, s, v) + html_2)
});
colors[8] = colors[16].filter((_, idx) => idx % 2 == 0);
colors[4] = colors[16].filter((_, idx) => idx % 4 == 0);
colors[2] = ['#000', '#fff']; //console.error('colors:')
//console.error(colors)
// add opposite color to every color

colors = Object.entries(colors).reduce((acc, [numCols, cols]) => {
  const n2 = Math.round(0.5 * numCols) | 0; // integer cast

  /*
    console.error('numCols:')
    console.error(numCols)
    console.error('cols:')
    console.error(cols)
  */

  acc[numCols] = cols.map((col, idx, arr) => {
    const opp = arr[(idx + n2) % numCols];
    return [col, opp];
  });
  return acc;
}, {});
/*
console.error('colors:')
console.error(colors)
*/
// reorder colors to match four elements

const x = colors[4];
colors[4] = [x[1], x[0], x[2], x[3]];
//           yel   red   green blue


// red/green give too little contrast
// use red/white and green/black
colors[4][1][1] = '#ffffff'; // red white
colors[4][2][1] = '#000000'; // green black

colors[4][3][1] = '#ffffff'; // blue white
colors[4][0][1] = '#000000'; // yell black

// make yell+green the brightest colors

//colors[4][2][0] = '#00ff00'; // green
//colors[4][2][0] = '#80ff80'; // green
colors[4][2][0] = '#55ff55'; // green
//colors[4][2][0] = '#40ff40'; // green

//colors[4][0][0] = '#ffff00'; // yell
//colors[4][0][0] = '#ffff40'; // yell
//[4][0][0] = '#ffff80'; // yell
colors[4][0][0] = '#ffff55'; // yell

//colors[4][3][0] = '#0000ff'; // blue
//colors[4][3][0] = '#0000c0'; // blue
//colors[4][3][0] = '#000080'; // blue
colors[4][3][0] = '#0000aa'; // blue

//colors[4][1][0] = '#ff0000'; // red L=1/2
//colors[4][1][0] = '#c00000'; // red L=1/2-1/8
//colors[4][1][0] = '#800000'; // red L=1/2-1/4
colors[4][1][0] = '#aa0000'; // red L=1/3



module.exports.colors = colors;
/*
Object.entries(colors).forEach(([numCols, colors]) => {

  if (numCols != 16) { return } // TODO rm

  console.log('<div>\n<div>'+numCols+'</div>')
  colors.forEach((hex, idx, arr) => {
    const hex2 = arr[Math.round((idx + 0.5*numCols) % numCols)]
    console.log([
      '<div style="background-color: ',
      hex,
      '; color: ',
      hex2,
      '">O X</div>',
    ].join(''))
  })
  console.log('</div>\n')

})
*/
//} // end for loop

/*
const HL = [

  // diff 30 deg
  [  0, L2], // red
  [ 15,   ], //      red-orange
  [ 30, L3], //   orange
  [ 45,   ], //     orange-yellow
  [ 60, L4], // yellow
  [ 75,   ], //     yellow-lime
  [ 90, L5], //   lime
  [105,   ], //     lime-green

  // step 30 deg
  [120, L4], // green
  [150,   ], //     green-turc
  [180, L3], //   turc
  [210,   ], //     turc-blue
  [240, L2], // blue
  [270,   ], //     blue-purple
  [300, L1], //   purple
  [330,   ], //     purple-red
]
*/

