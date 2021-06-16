
// big five to alchi

// M: maximum value. 1 or 100
function elementOfBigfive({ o, c, e, a, n }, M=1) {

  //console.dir({ bigfive: { o, c, e, a, n }, M });

  /*
  // formula 1
  return {
    e1: (   o  +    e  + (M-n) +    c  + (M-a))/5,
    e2: ((M-o) + (M-e) +    n  + (M-c) + (M-a))/5,
    e3: (   o  +    e  +    n  + (M-c) +    a )/5,
    e4: ((M-o) + (M-e) + (M-n) +    c  +    a )/5,
  };
  */

  /*
  // formula 2 = formula 1 with stronger agreeableness
  return {
    e1: (   o  +    e  + (M-n) +    c  + 2*(M-a))/6,
    e2: ((M-o) + (M-e) +    n  + (M-c) + 2*(M-a))/6,
    e3: (   o  +    e  +    n  + (M-c) + 2*   a )/6,
    e4: ((M-o) + (M-e) + (M-n) +    c  + 2*   a )/6,
  };
  */

  // formula 3 = simplified big five test with three domains
  const eoc = (e + o + (M-c)) / 3; // EOC is one domain
  //const A = 0.9; // weight of agreeableness. lower than 1 -> subtype is stronger than opposite
  //const A = 1; // weight of agreeableness. lower than 1 -> subtype is stronger than opposite
  const A = 2; // weight of agreeableness. lower than 1 -> subtype is stronger than opposite
  const result = {
    e1: ( (0+eoc) + (M-n) + A*(M-a) )/(2+A),
    e2: ( (M-eoc) + (0+n) + A*(M-a) )/(2+A),
    e3: ( (0+eoc) + (0+n) + A*(0+a) )/(2+A),
    e4: ( (M-eoc) + (M-n) + A*(0+a) )/(2+A),
  };

  //console.log(`elementOfBigfive: ${o} o + ${c} c + ${e} e + ${a} a + ${n} n -> eoc ${eoc} -> ${result.e1} e1 + ${result.e2} e2 + ${result.e3} e3 + ${result.e4} e4`);

  return result;
}

const oppositeElement = {
  e1: 'e2',
  e2: 'e1',
  e3: 'e4',
  e4: 'e3',
};

function modalityOfElements(baseElement, secondElement) {
  if (baseElement == secondElement) return 'mutable';
  if (secondElement == oppositeElement[baseElement]) return 'forbidden';
  // cardinal = x plays a childish element (fire or air)
  // fixed = x plays a mature element (earth or water)
  if (secondElement == 'e1' || secondElement == 'e3') return 'cardinal';
  return 'fixed';
}

const nameOfMBTI = {
  e1: { e1: 'INTP', e2: 'INFJ', e3: 'INFP', e4: 'INTJ' },
  e2: { e1: 'ESTP', e2: 'ESFJ', e3: 'ESFP', e4: 'ESTJ' },
  e3: { e1: 'ENTP', e2: 'ENFJ', e3: 'ENFP', e4: 'ENTJ' },
  e4: { e1: 'ISTP', e2: 'ISFJ', e3: 'ISFP', e4: 'ISTJ' },
};

const nameOfZodiac = {
  e1: { e1: 'Sagittarius', e2: 'forbidden', e3: 'Aries', e4: 'Leo' },
  e2: { e1: 'forbidden', e2: 'Virgo', e3: 'Capricorn', e4: 'Taurus' },
  e3: { e1: 'Libra', e2: 'Aquarius', e3: 'Gemini', e4: 'forbidden' },
  e4: { e1: 'Cancer', e2: 'Scorpius', e3: 'forbidden', e4: 'Pisces' },
};

const nameOfDiagonal = {
  '12': 'fire-earth',
  '34': 'air-water',
};

function zodiacOfElements(baseElement, secondElement) {
  return nameOfZodiac[baseElement] && nameOfZodiac[baseElement][secondElement];
}

function mbtiOfElements(baseElement, secondElement) {
  return nameOfMBTI[baseElement] && nameOfMBTI[baseElement][secondElement];
}

function diagonalOfAgree(agree) {
  if (agree > 50) return 'air-water';
  if (agree < 50) return 'fire-earth';
  if (agree == 50) return undefined;
}

const cardinalElementOfDiagonal = { '12': 'e3', '34': 'e1' };
const fixedElementOfDiagonal = { '12': 'e4', '34': 'e2' };

// round
function num(n) {
  return Math.round(n);
  return n.toFixed(1);
}

function ambiguousInterpretation(bigfive) {
  const { o, c, e, a, n } = bigfive;

  // TODO verify: result is ambiguous. this is a sign of element earth or element water.

  return `\
result is ambiguous. this is a sign of element earth or element water.

we expect these correlations:

* high O = high E
* high C = low N

generated by [alchi/src/bigfive.html](https://milahu.github.io/alchi/src/bigfive.html#ocean=${o}.${c}.${e}.${a}.${n})
`;
}

function getInterpretation(bigfive, elementObject) {
  const { o, c, e, a, n } = bigfive;
  let res = '';
  const elementList = Object.keys(elementObject).map(elm => [elm, elementObject[elm]]);
  elementList.sort((a, b) => b[1] - a[1]); // sort descending

  const range = elementList[0][1] - elementList[3][1];
  if (range < 10) {
    return ambiguousInterpretation(bigfive);
  }

  const rangeStrong = elementList[0][1] - elementList[2][1];
  const rangeWeak = elementList[1][1] - elementList[3][1];

  // score vs opposite element
  const fireScore = elementObject.e1 - elementObject.e2;
  const airScore = elementObject.e3 - elementObject.e4;

  //const virtualAgree = 50 + 5/8*(Math.abs(airScore) - Math.abs(fireScore)); // formula 1
  const virtualAgree = (200/3 + (Math.abs(airScore) - Math.abs(fireScore)))/(4/3); // formula 2

  const diagonalSign = Math.sign(Math.abs(fireScore) - Math.abs(airScore));

  const diagonalMap = { '-1': '34', '0': '?', '1': '12' };
  const diagonal = diagonalMap[diagonalSign];

  const baseElementFromDiagonal =
    diagonal == '?' ? '?' :
    diagonal == '12'
    ? ( fireScore == 0 ? '?' : fireScore > 0 ? 'e1' : 'e2' )
    : ( airScore == 0 ? '?' : airScore > 0 ? 'e3' : 'e4' )
  ;
  const baseElement = baseElementFromDiagonal;

  const cardinalElement = cardinalElementOfDiagonal[diagonal];
  const fixedElement = fixedElementOfDiagonal[diagonal];

  const modalityRange = elementObject[cardinalElement] - elementObject[fixedElement];
  const modality = Math.abs(modalityRange) < 5 ? 'mutable'
    : modalityRange > 0 ? 'cardinal' : 'fixed';
  const modalityElement =
    modality == 'mutable' ? baseElement :
    modality == 'cardinal' ? cardinalElement : fixedElement
  ;

  res += `\
derivation: element and modality:

* diagonalRange: ${num(fireScore)} fire-earth + ${num(airScore)} air-water
* element ${nameOfElement[baseElementFromDiagonal]}
* valid modalities (cardinal mutable fixed): ${nameOfElement[cardinalElement]} ${nameOfElement[baseElement]} ${nameOfElement[fixedElement]}
* modalityRange: ${num(modalityRange)} ${nameOfElement[cardinalElement]}-${nameOfElement[fixedElement]}
* ${modality} modality
* ${nameOfElement[baseElementFromDiagonal]} plays ${nameOfElement[modalityElement]}

verification: virtual diagonal, computed from O C E N:

* virtualAgree ${num(virtualAgree)}
* virtualDiagonal ${nameOfDiagonal[diagonal]}
`;



  if (Math.sign(virtualAgree - 50) != Math.sign(bigfive.a - 50)) {
    res += `* contradiction: agree ${bigfive.a} + virtualAgree ${num(virtualAgree)}\n`;
  }
  else {
    res += `* symmetry: agree ${bigfive.a} + virtualAgree ${num(virtualAgree)}\n`;
  }

  //console.log(`baseElement ${baseElement}`);
  if (baseElement == '?') {
    return ambiguousInterpretation(bigfive);;
  }
  else {

    // prepend to res
    res = `\
short: ${nameOfElement[baseElement]} plays ${nameOfElement[modalityElement]}

translations:

* ${mbtiOfElements(baseElement, modalityElement)} in MBTI
* ${zodiacOfElements(baseElement, modalityElement)} = ${modalityOfElements(baseElement, modalityElement)} ${nameOfElement[baseElement]} in zodiac (calendar-astrology is fake)
* ${carlJungNameOfModality[modality]} ${carlJungNameOfElement[baseElement]} in Carl Jung

generated by [alchi/src/bigfive.html](https://milahu.github.io/alchi/src/bigfive.html#ocean=${o}.${c}.${e}.${a}.${n})

--
${modality != 'mutable' ? `
note: verbal tests (questionnaires) easily confuse element and modality,
so element and modality can be swapped:

* ${nameOfElement[modalityElement]} plays ${nameOfElement[baseElement]}
* ${mbtiOfElements(modalityElement, baseElement)}
* ${zodiacOfElements(modalityElement, baseElement)}
* ${modalityOfElements(modalityElement, baseElement)} ${nameOfElement[modalityElement]}

to find your element, try to find your body type:

* heart-shape &rarr; fire
* pear-shape &rarr; earth
* endo-morph &rarr; air
* ecto-morph &rarr; water
` : ''}
element ${nameOfElement[baseElement]} translations:

* ${keirseyNameOfElement[baseElement]} in David Keirsey
* ${sheldonNameOfElement[baseElement]} in William Sheldon
* ${dressColorOfElement[baseElement]} in alchi dress color
* ${southParkNameOfElement[baseElement]} in South Park
* ${harryPotterNameOfElement[baseElement]} in Harry Potter
* ${healthtypeNameOfElement[baseElement]} in ph360.me (health type)
* ${flowprofileNameOfElement[baseElement]} in flowgenomeproject (flow profile)

` + res;

  }

/*

[ note: verbal tests (questionnaires) easily confuse element and modality, ]

... or element and modality show your two modalities (cardinal and fixed).

TODO verify

*/

  return res;
}

const nameOfElement = {
  e1: 'fire',
  e2: 'earth',
  e3: 'air',
  e4: 'water',
};

const keirseyNameOfElement = {
  e1: 'Artisan',
  e2: 'Guardian',
  e3: 'Idealist',
  e4: 'Rational',
};

const carlJungNameOfElement = {
  e1: 'Ntuiting',
  e2: 'Sensing',
  e3: 'Feeling',
  e4: 'Thinking',
};

const carlJungNameOfModality = {
  'cardinal': 'extraverted',
  'mutable': 'ambiverted',
  'fixed': 'introverted',
};

const sheldonNameOfElement = {
  e1: 'heart-shape mesomorph',
  e2: 'pear-shape mesomorph',
  e3: 'hourglass-shape endomorph',
  e4: 'rhombus-shape ectomorph',
};

const dressColorOfElement = {
  e1: 'yellow top + blue bottom',
  e2: 'blue bottom + yellow top',
  e3: 'red top + green bottom',
  e4: 'green top + red bottom',
};

const southParkNameOfElement = {
  e1: 'Kenny',
  e2: 'Stan',
  e3: 'Eric',
  e4: 'Kyle',
};

const harryPotterNameOfElement = {
  e1: 'Gryffindor',
  e2: 'Hufflepuff',
  e3: 'Ravenclaw',
  e4: 'Slytherin',
};

const healthtypeNameOfElement = {
  e1: 'Crusader',
  e2: 'Guardian',
  e3: 'Connector',
  e4: 'Sensor',
};

const flowprofileNameOfElement = {
  e1: 'Hard Charger',
  e2: 'Flow Goer',
  e3: 'Crowd Pleaser',
  e4: 'Deep Thinker',
};



function sortedElements(elementObject) {
  const elementList = Object.keys(elementObject).map(elm => [elm, elementObject[elm]]);
  elementList.sort((a, b) => b[1] - a[1]); // sort descending
  return elementList.map(([elm, val]) => `${num(val)} ${nameOfElement[elm]}`).join(' + ');
}

export function handle_form_change(form) {
  console.dir({ form });
  const bigfive = Array.from(form).reduce((acc, input) => {
    acc[input.name] = input.valueAsNumber;
    document.getElementById(input.name).innerHTML = input.value;
    return acc;
  }, {});

  handle_new_bigfive(bigfive);
}



export function svg_of_bigfive(bigfive) {

  const elements = elementOfBigfive(bigfive, 100);
  const { o, c, e, a, n } = bigfive;
  const { e1, e2, e3, e4 } = elements;



  // scale the coordinate system ...

  // upscale
  //const scale_x = (a > 50) ? 1 : (2 - (a / 50));
  //const scale_y = (a < 50) ? 1 : (0 + (a / 50));

  // downscale to 50%
  //const scale_x = (a > 50) ? 1 : 1/(2 - (a / 50));
  //const scale_y = (a < 50) ? 1 : 1/(0 + (a / 50));

  // downscale to 75%
  //const scale_x = (a > 50) ? 1 : ((1/(2 - (a / 50)) - 1) * 0.5 + 1);
  //const scale_y = (a < 50) ? 1 : ((1/(0 + (a / 50)) - 1) * 0.5 + 1);

  // no scale
  const scale_x = 1;
  const scale_y = 1;

  const sortedElements = [
    { e: 1, v: e1 },
    { e: 2, v: e2 },
    { e: 3, v: e3 },
    { e: 4, v: e4 },
  ].sort((a, b) => b.v - a.v); // sort descending

  const basetype = sortedElements[0];
  const virtualAgree = ([1, 2]).includes(basetype.e) ? 0 : 100;

  const subtype = ((virtualAgree == 0)
    ? sortedElements.find(({ e, v }) => ([3, 4]).includes(e))
    : sortedElements.find(({ e, v }) => ([1, 2]).includes(e))
  );

  var sumpointX = 0;
  var sumpointY = 0;

  if (basetype.e == 1) {
    sumpointY = e1;
    sumpointX = (e3-e4);
  } else
  if (basetype.e == 2) {
    sumpointY = -e2;
    sumpointX = (e3-e4);
  } else
  if (basetype.e == 3) {
    sumpointX = e3;
    sumpointY = (e1-e2);
  } else
  if (basetype.e == 4) {
    sumpointX = -e4;
    sumpointY = (e1-e2);
  }

  // normalize radius of sumpoint vector
  const sumpointRadius = 100;
  const sumpointLength = Math.sqrt(sumpointX*sumpointX + sumpointY*sumpointY);
  const sumpointScale = sumpointRadius / sumpointLength;
  sumpointX = sumpointX * sumpointScale;
  sumpointY = sumpointY * sumpointScale;

  const sumvectorX = 0.8 * sumpointX;
  const sumvectorY = 0.8 * sumpointY;

  const sumpointShow = (
    !(e1 == 50 && e1 == 50 && e3 == 50 && e4 == 50)
    // && !(sortedElements[0].v == sortedElements[1].v)
  );

  //console.log(`basetype ${basetype.e} ${basetype.v} + subtype ${subtype.e} ${subtype.v} -> sumpoint ${sumpointX} ${sumpointY} show ${sumpointShow}`)

  //console.log(`a = ${a}   scale_x = ${scale_x}   scale_y = ${scale_y}`);

  // get signed number string of number
  function s(number, factor = +1) {
    const product = factor * number;
    return `${(product >= 0 ? '+' : '-')}${Math.abs(number)}`
  }

  const zodiacNameOfN = {
    "11": "3x2",
    "0": "3x3",
    "1": "3x1",

    "2": "1x3 Aries",
    "3": "1x1 Sagittarius",
    "4": "1x4 Leo",

    "5": "4x1",
    "6": "4x4",
    "7": "4x2",

    "8": "2x4",
    "9": "2x2",
    "10": "2x3",
  };

  const zodiacNameOfN16 = {
    "15": "3x2 = Aquarius = fixed air",
    "0":  "3x3 = Gemini = mutable Air",
    "1":  "3x1 = Libra = cardinal Air",

    "3":  "1x3 = Aries = cardinal Fire",
    "4":  "1x1 = Sagittarius = mutable Fire",
    "5":  "1x4 = Leo = fixed Fire",

    "7":  "4x1 = Cancer = cardinal water",
    "8":  "4x4 = Pisces = mutable Water",
    "9":  "4x2 = Scorpius = fixed water",

    "11": "2x4 = Taurus = fixed earth",
    "12": "2x2 = Virgo = mutable Earth",
    "13": "2x3 = Capricorn = cardinal earth",
  };

  // half diagonals
  const e1h = e1/2;
  const e2h = e2/2;
  const e3h = e3/2;
  const e4h = e4/2;

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-30 -30 300 300"
    >
      <defs>
        <clipPath id="clip-colors">
          <!-- one rhombus
            <path fill="none" stroke="black" stroke-width="5" d="
              M+0${s(e1 * scale_y)} L${s(e3 * scale_x)}+0 L+0${s(e2 * scale_y, -1)} L${s(e4 * scale_x, -1)}+0 z
            "/>
          -->
          <!-- four squares -->
          <path fill="none" stroke="black" stroke-width="5" d="
            M 0 0 L ${e1h} ${e1h} L 0 ${e1} L -${e1h} ${e1h} z
            M 0 0 L ${e2h} -${e2h} L 0 -${e2} L -${e2h} -${e2h} z
            M 0 0 L ${e3h} ${e3h} L ${e3} 0 L ${e3h} -${e3h} z
            M 0 0 L -${e4h} -${e4h} L -${e4} 0 L -${e4h} ${e4h} z
          "/>
        </clipPath>
        <style>
          circle.zodiac {
            cursor: pointer;

            stroke: black;
            stroke-width: 0;
          }
          circle.zodiac:hover {
            stroke-width: 3;
          }
        </style>
        <marker id="arrow" markerWidth="10" markerHeight="10" refX="0" refY="2" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,4 L6,2 z" fill="black" />
        </marker>
      </defs>

      <g transform="translate(120, 120) scale(${scale_x}, ${scale_y})">
        <!-- stroke-linejoin="round" stroke-linecap="round" -->

        <!-- coordinate axis -->
        <!--
        <path fill="none" stroke="black" stroke-width="2" d="
          M+0+100 L+0-100
          M+100+0 L-100+0
        "/>
        -->

        <!-- sum point orbit -->
        <circle r="${sumpointRadius}" fill="none" stroke="black" cx="0" cy="0"/>

        <!-- twelve signs of the zodiac -->
        <!-- [1, 2, 4, 5, 7, 8, 10, 11] -->
        ${Array.from({ length: 16 }).map((_, idx) => idx).map(n => ((n + 2) % 4 == 0) ? '' : `
          <circle r="3" fill="black" class="zodiac"
            cx="${sumpointRadius * Math.cos(Math.PI * 2 / 16 * n)}"
            cy="${sumpointRadius * Math.sin(Math.PI * 2 / 16 * n)}"
          >
            <title>${zodiacNameOfN16[n]}</title>
          </circle>
        `)}

        <!-- sum point -->
        <!--
        ${!sumpointShow ? '' : `
          <circle r="8" stroke="black" cx="${sumpointX}" cy="${sumpointY}"/>
        `}
        -->

        <!-- sum vector -->
        ${!sumpointShow ? '' : `
          <line marker-end="url(#arrow)" stroke="black" stroke-width="2" x1="0" y1="0"
            x2="${sumvectorX}" y2="${sumvectorY}"
          />
        `}

        <!-- background colors -->
        <g clip-path="url(#clip-colors)">
          <path fill="green" d="M+0+0 L+100-100 L-100-100 z"/>
          <path fill="red" d="M+0+0 L+100+100 L-100+100 z"/>
          <path fill="yellow" d="M+0+0 L+100+100 L+100-100 z"/>
          <path fill="blue" d="M+0+0 L-100+100 L-100-100 z"/>
        </g>

        <!-- diamond frame -->
        <!--
        <path fill="none" stroke="black" stroke-width="3" d="
          M+0+100 L+100+0 L+0-100 L-100+0 z
        "/>
        -->

        <!-- labels. explicit color to make darkreader work -->
        <text x="0" y="0" fill="black" alignment-baseline="mathematical" text-anchor="middle">

          <tspan dominant-baseline="central" x="0" y="118">${Math.round(e1)}</tspan>
          <tspan dominant-baseline="central" x="0" y="137">Fire</tspan>

          <tspan dominant-baseline="central" x="0" y="-137">Earth</tspan>
          <tspan dominant-baseline="central" x="0" y="-118">${Math.round(e2)}</tspan>

          <tspan dominant-baseline="central" x="118" y="0">${Math.round(e3)}</tspan>
          <tspan dominant-baseline="central" x="137" y="-15">A</tspan>
          <tspan dominant-baseline="central" x="137" y="0">i</tspan>
          <tspan dominant-baseline="central" x="137" y="15">r</tspan>

          <tspan dominant-baseline="central" x="-118" y="0">${Math.round(e4)}</tspan>
          <tspan dominant-baseline="central" x="-137" y="-30">W</tspan>
          <tspan dominant-baseline="central" x="-137" y="-15">a</tspan>
          <tspan dominant-baseline="central" x="-137" y="0">t</tspan>
          <tspan dominant-baseline="central" x="-137" y="15">e</tspan>
          <tspan dominant-baseline="central" x="-137" y="30">r</tspan>
        </text>

      </g>
    </svg>
  `;
}



export function handle_new_bigfive(bigfive, target = null) {
  //console.dir({ bigfive });
  const elements = elementOfBigfive(bigfive, 100);
  const { o, c, e, a, n } = bigfive;
  const { e1, e2, e3, e4 } = elements;
  console.log(`o ${o} + c ${c} + e ${e} + a ${a} + n ${n} -> e1 ${e1} + e2 ${e2} + e3 ${e3} + e4 ${e4}`);

  // set URL
  document.location.hash = `#ocean=${o}.${c}.${e}.${a}.${n}`;
  
  //document.getElementById('result').innerHTML = `o ${o} + c ${c} + e ${e} + a ${a} + n ${n} &rarr; e1 ${e1} + e2 ${e2} + e3 ${e3} + e4 ${e4}`;
  //document.getElementById('result').innerHTML = `${o} open + ${c} conscient + ${e} extravert + ${a} agree + ${n} neuro &rarr; ${e1} fire + ${e2} earth + ${e3} air + ${e4} water`;

//${o} open + ${c} conscient + ${e} extravert + ${a} agree + ${n} neuro &nbsp;
//ocean ${o}.${c}.${e}.${a}.${n} &rarr; ${sortedElements(elements)}

  target || (target = document.getElementById('result'));

  target.innerHTML = `

<pre>
ocean ${o} ${c} ${e} ${a} ${n} &rarr; ${sortedElements(elements)}

${getInterpretation(bigfive, elements)}
</pre>
  `;

  return;

  //console.dir({ bigfive });
  const outform = document.getElementById('output');
  Array.from(outform).forEach(input => {
    //console.dir({ input: { name: input.name, value: input.value, elm: input.name[1] } });
    input.value = elements[input.name];
    document.getElementById(input.name).innerHTML = input.value;
  });
}

const bigfiveOfElement = {
  e1: { o: 100, c: 100, e: 100, a:   0, n:   0 },
  e2: { o:   0, c:   0, e:   0, a:   0, n: 100 },
  e3: { o: 100, c:   0, e: 100, a: 100, n: 100 },
  e4: { o:   0, c: 100, e:   0, a: 100, n:   0 },
};


function setInput(bigfive) {
  const inputForm = document.getElementById('input');
  Array.from(inputForm).forEach(input => {
    input.value = bigfive[input.name];
  });
  inputForm.dispatchEvent(new Event('change'));
}

function e(elm) {
  const bigfive = bigfiveOfElement['e'+elm];
  setInput(bigfive);
}


