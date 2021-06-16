<script>

  // TODO formalize: mappings between namespaces (typology systems)
  // TODO formalize: type estimations of people, based on their photos and videos

  // TODO generalize the data format!
  // include translations of domain names
  // compress data: use arrays or make frequent keys short
  // have a separate mapping (interpretation) between original keys and alchi elements
  // allow optional questions (shortest political quiz)
  // ...
  // keep one test per file for a clean structure
  // include source URL, version, description for every test (metadata)
  // how to include assets? (images, links)
  // DONE:
  // deep or flat:
  // * option 1: deep: test is object of domains, domain is array of facets, facet is object with question and/or plus/minus answers - if test domains are private (hidden on the server side), use only one (pseudo-) domain (special key 'singleDomain'? or 'main'? or 'nodomain'?) and store questions+answers in a flat array of objects
  // * option 2: flat: one array of question objects. pro: easier to edit con: order must be stored extra (six facets in big five)
  // keys:
  // * option 1: use original answer-keys (domain name + plus/minus) if possible
  // * option 2: use alchi elements as answer-keys (suggest as new convention), but also include original keys if possible
  // allow translations! use language code as top-level selector. split files? no.
  
  // TODO allow multiple interpretations per test --> array of interpretations from different authors. interpretation = mapping from test result to the four elements

  // TODO add test https://www.archetypes.com/quiz = 12 types
  
  // TODO add test https://www.mynextmove.org/explore/ip = 6 types -> career advice @ https://www.onetonline.org/explore/interests/Artistic/Enterprising/
  
  // TODO use state manager library: https://github.com/buhrmi/query-store or https://github.com/cerebral/overmind/tree/next/packages/node_modules/overmind-svelte
  
  // TODO use translate library: https://github.com/Panya/svelte-intl
  
  // TODO allow to annotate answers

  // TODO store test version in URL, so we can change question IDs in the future, and allow compatibility between versions

  // TODO keirsey mbti: "show more questions" on demand

  // TODO flow profile test: Object.keys(facet.answers).length != 4 (also show questions with only two ansers)

  // TODO input: name, address (websites, email, photos), sex, gender, age, mental age, height, weight

  // TODO result: visualize the "real" zodiac circle

  // TODO result: show pallas (key of seven) and show link to alchi-maps.html

  // TODO allow to shuffle all questions (and hide results)

  // DONE allow to choose color theme. also the choice of colors is expression of personality -> include in test result
  // DONE fix hash reader. reload should keep state!

  export let name;

  import { onMount, tick } from 'svelte';
  import { readable } from 'svelte/store';

  import { debounce } from 'underscore';

  //import Knob from 'svelte-knob';
  import Knob from './svelte-knob/src/Knob.svelte';

  //import { getItems, getInfo, getChoices, getQuestions } from '@alheimsins/b5-johnson-120-ipip-neo-pi-r';
  import b5languages from '@alheimsins/b5-johnson-120-ipip-neo-pi-r/data/languages.json';
  // TODO use extra library for language names?

  import bigfiveData from './test-data/bigfive-johnson-120-ipip-neo-pi-r.generated.json';
  import flowprofileData from './test-data/flowprofile.flowgenomeproject.com.reshaped.json';

  import * as bigfive2alchi from './bigfive2alchi.js';

  import * as ncsColor from 'ncs-color';

  // fix modulo for negative numbers
  Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
  };


/*
  // https://github.com/CherryKatatonic/keirsey-sorter-react-client
  // src/res/assessment-questions/keirsey-classic.json
  // TODO remove negations
  // * Does it bother you more having things: incomplete or complete
  //   -> Do you prefer your work: complete/finished/done or in-progress
  import keirseyData from './tests/keirsey-classic.json';

  // https://www.flowgenomeproject.com/flow-profile#Take-quiz-now
  // TODO show question with two answers
  import flowprofileData from './tests/flowprofile.flowgenomeproject.com.json';

  // https://healthtype.ph360.me/test
  // TODO
  import healthtypeData from './tests/healthtype.ph360.me.json';

  // https://bc20questions.deloitte.com/
  // TODO
  import businesschemistryData from './tests/businesschemistry.deloitte.com.json';
*/

  const data = {
    questions: [],
    questions_dfk: {},
    //result_df: {},
    query: {},
    state: {},
  };

  // app state
  let colorDegrees = 100;
  let colorDegreesInput = 100;

  //$: console.log('colorDegreesInput = ', colorDegreesInput);

  

  const testData = {
    bigfive: bigfiveData,
    flowprofile: flowprofileData,
  };

  //console.log(`loaded ${Object.keys(bigfiveData.languages).length} languages`);

  const facet_list = Array.from({ length: 6 }).map((_, facet_id) => facet_id + 1);
  const facet_count = facet_list.length;
  //console.log(`facet_count = ${facet_count}`);

  const domainOfMbtiType = {
    E: 'E', I: 'E',
    N: 'N', S: 'N',
    F: 'F', T: 'F',
    P: 'P', J: 'P',
  };

  /*
  function title_is_trivial(title) {
    const trivial_titles = [
      'Do you prefer',
      'Do you',
      'Are you more inclined to be',
      'Are you more',
    ];
    return (trivial_titles.indexOf(title) >= 0);
  }
  */





  const minusKey = 1;
  const plusKey = 0;

  const result = {
    test: {},
  };

  //$: console.log('result.test = ' + JSON.stringify(result.test));

  Object.keys(testData).forEach(testKey => {

    const test = testData[testKey];

    // init result object
    result.test[testKey] = {
      domain: {},
    };
    const testResult = result.test[testKey];

    test.domainKeys.map(domain => {

      // circular domains (width > 2) need `NaN` as neutral value
      const neutralValue = testData[testKey].domainWidths[domain] == 2 ? 0 : NaN;

      // init domain object
      testResult.domain[domain] = {
        sum: neutralValue,
        score: neutralValue,
        facet: facetList(test, domain).map(_ => neutralValue),
      };
    });

//console.dir({ result });
  
  });

  
  /*
    
    // TODO remove old code
    data.keirsey_result_df = {};
    data.keirsey_questions_dfk = keirseyData.reduce((acc, question) => {
      const domain = domainOfMbtiType[question.answers[0].type];
      const plusKey = (question.answers[0].type == domain) ? 0 : 1;
      const minusKey = 1 - plusKey;

      (domain in acc) || ( acc[domain] = [], data.keirsey_result_df[domain] = { score: 0, sum: 0 } );
      // TODO verify
      // TODO reduce complexity? simply use array for plus-text and minus-text
      const facet = acc[domain].length;

      // TODO provide an interactive way to show more questions
      const num_questions = 6; // bigfive also has six facets. keirsey has 10 facets for M + 20 facets for each BTI
      if (facet >= num_questions) return acc;

      acc[domain][facet] = {
        title: question.text,
        minus: { text: question.answers[minusKey].text },
        plus: { text: question.answers[plusKey].text },
        //minus: { text: `${question.text}:<br>${question.answers[0].text}` },
        //plus: { text: `${question.text}:<br>${question.answers[1].text}` },
      };

      data.keirsey_result_df[domain][facet] = 0;

      return acc;
    }, {});

    const keirsey_facet_count = Object.keys(data.keirsey_questions_dfk).reduce((acc, domain) => {
      acc[domain] = data.keirsey_questions_dfk[domain].length;
      return acc;
    }, {});
    const keirsey_facet_list = Object.keys(keirsey_facet_count).reduce((acc, domain) => {
      acc[domain] = Array.from({ length: keirsey_facet_count[domain] }).map((_, idx) => idx);
      return acc;
    }, {});

  */



  // TODO more complex?
  //data.flowprofile_result = [];
  // TODO detect length
  data.flowprofile_result = Array.from({ length: 10 }).map(_ => undefined);



  let hashReaderActive = true

  //let update_sum = () => console.log('update_sum: noop');
  let update_sum = () => null;

  let bigfive2alchiResultElement;
  let svg_of_bigfive = '';

  async function update_sum_real() {
    console.log(`update_sum_real`);
    for (const testKey of Object.keys(result.test)) {
      const test = testData[testKey];
      const testResult = result.test[testKey];
      for (const domainKey of Object.keys(testResult.domain)) {

        const domainWidth = testData[testKey].domainWidths[domainKey];
        // circular domains (width > 2) need `NaN` as neutral value
        //const neutralValue = domainWidth == 2 ? 0 : NaN;
        const neutralValue = domainWidth == 2 ? 50 : NaN;

        //console.log(`update_sum_real: test ${testKey} domain ${domainKey} facetList:`, facetList(test, domainKey));

        const domainResult = testResult.domain[domainKey];
        const neutralFilter = isNaN(neutralValue)
          ? (val => !isNaN(val))
          : (val => val != neutralValue)
        ;

        if (domainWidth == 4) {
          const sumArray = Array.from({ length: domainWidth }).fill(0);
          domainResult.facet.forEach(facetValue => {
            for (let i = 0; i < domainWidth; i++) {
              sumArray[i] += knob_value(facetValue, i + 1);
            }
          });
          domainResult.sumArray = sumArray;
          const sumScale = 100 / (sumArray.reduce((a, v) => (a + v), 0));
          domainResult.scoreArray = sumArray.map(sum => sum * sumScale);

          const scoreRight = domainResult.scoreArray[2] - domainResult.scoreArray[3]; // 3 - 4
          const scoreRightAbs = Math.abs(scoreRight);
          const scoreTop = domainResult.scoreArray[1] - domainResult.scoreArray[0]; // 2 - 1
          const angleRadians = Math.atan(scoreTop/scoreRightAbs);
          const angleDegrees = (scoreRight > 0
            ? (angleRadians / (2 * Math.PI) * -16 - 4)
            : (angleRadians / (2 * Math.PI) *  16 + 4)
          ).mod(16);
          domainResult.scoreDegrees = angleDegrees;
        }
        else if (domainWidth == 2) {
          //console.log('domainResult.facet = ', domainResult.facet.slice(), domainResult.facet.filter(neutralFilter))
          const facetValues = domainResult.facet.filter(neutralFilter);
          domainResult.sum = facetValues.length == 0 ? neutralValue : facetValues.reduce((acc, val) => (acc + val), 0);

          /*
          domainResult.sum = facetList(test, domainKey).reduce((acc, facet) => {
            const val = domainResult.facet[facet];
            if (val != neutralValue) acc += val;
            return acc + domainResult.facet[facet];
          }, 0);
          */

          // TODO generalize? this assumes an input value range of -2 to +2:
          //domainResult.score = Math.round(50 + (domainResult.sum / facetCount(test, domainKey) * 25));
          // TODO convert circular value to degrees. width is 3 or 4 -> period 400, width is 6 or 8 -> period 800

          domainResult.score = facetValues.length == 0 ? neutralValue :
            Math.round(50 + (domainResult.sum / facetCount(test, domainKey) * 25))
          ;
        }

        else {
          console.warn(`update_sum_real: test ${testKey} domain ${domainKey}: TODO handle domainWidth ${domainWidth}`)
        }
      }
    }

    writeHash();

    const bigfive = {
      // EOC is one domain
      o: result.test['bigfive'].domain['e'].score,
      c: (100 - result.test['bigfive'].domain['e'].score),
      e: result.test['bigfive'].domain['e'].score,

      a: result.test['bigfive'].domain['a'].score,
      n: result.test['bigfive'].domain['n'].score,
    };

    svg_of_bigfive = bigfive2alchi.svg_of_bigfive(bigfive);

    //bigfive2alchi.handle_new_bigfive(bigfive, bigfive2alchiResultElement);

  }

  $: (result), update_sum();

  Math._sumArray = array => array.reduce((a, v) => (a + v), 0);

  function sleepMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function setDomainAverage(domain, changeEvent) {
    const averageValue = changeEvent.target.valueAsNumber / domain.facetCount;
    console.log('setDomainAverage', { domain, averageValue });
    domain.result.facet = Array.from({ length: domain.facetCount }).reduce((acc) => {
      const accAvg = (acc.length == 0) ? 0 : Math._sumArray(acc) / acc.length;
      if (accAvg < averageValue) acc.push(Math.ceil(averageValue));
      else acc.push(Math.floor(averageValue));
      return acc;
    }, []);

    result = result; // trigger update_sum()
  }



  /*
  function encodeScore__slow(n) {
    // assert: n is one of -2 -1 0 1 2
    const encodeScoreMap = {
      '-2': 'b',
      '-1': 'a',
      '0': '0',
      '1': '1',
      '2': '2',
    };
    //console.log(`encodeScore: ${n} -> ${encodeScoreMap[n]} -> ${encodeScoreMap[n] || '?'}`);
    return encodeScoreMap[n] || '?';
  }
  */

  // 20x faster than lookup object
  function encodeScore(n) {
    // assert: n is one of -2 -1 0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15
    const encodeScoreArray = 'yz0123456789abcdef';
    return encodeScoreArray[2 + n] || '?';
    // NOTE this is why `null` does not work as neutral value:
    // (2 + null) == 2
    // (2 + NaN) == NaN
    // (2 + undefined) == NaN
    // `undefined` is a bad choice, cos values can be `undefined` by accident (not explicit enough)
    // performance: isNan(v) == !isNaN(v) == (v == null) == (v != null)
  }

  /*
  var decodeScore__slow = function decodeScore(str, neutralValue = 0) {
    // assert: n is one of -2 -1 0 1 2
    const decodeScoreMap = {
      'b': -2,
      'a': -1,
      '0': 0,
      '1': 1,
      '2': 2,
      '?': NaN,
    };
    //console.log(`encodeScore: ${n} -> ${encodeScoreMap[n]} -> ${encodeScoreMap[n] || '?'}`);
    return decodeScoreMap[str] || neutralValue;
  }
  */

  // 20x faster than lookup object
  const decodeScore = (() => {
    const decodeScore_2_map = {
      'y': -2, 'z': -1,
      '0': 0, '1': 1, '2': 2,
      '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
      a: 10, b: 11, c: 12, d: 13, e: 14, f: 15,
      '?': NaN };
    const decodeScore_2_cache_chars = new Set(Object.keys(decodeScore_2_map).map(s => s.charCodeAt(0)));
    const decodeScore_2_cache = Array.from({ length : 1+Math.max(...decodeScore_2_cache_chars.values()) }).map((_, i) => (
      decodeScore_2_cache_chars.has(i) ? decodeScore_2_map[String.fromCharCode(i)] : 0)
    );
    return function decodeScore(str, neutralValue = 0) {
      //console.log(`decodeScore(${str}, ${neutralValue}): charcode ${str.charCodeAt(0)} + raw ${decodeScore_2_cache[str.charCodeAt(0)]} + res ${decodeScore_2_cache[str.charCodeAt(0)] || neutralValue}`)
      const val = decodeScore_2_cache[str.charCodeAt(0)];
      return (val == undefined) ? neutralValue : val;
    }
  })();



  // TODO simpler code?

  const getHash = () => window.location.hash.slice(1);

  // stolen from https://github.com/ItalyPaleAle/svelte-spa-router/blob/master/Router.svelte
  const hashReader = readable(
    getHash(),
    function start(set) {
      const update = () => set(getHash());
      window.addEventListener('hashchange', update, false);
      return function stop() {
        window.removeEventListener('hashchange', update, false)
      };
    }
  );

  // Listen to changes in the location
  hashReader.subscribe((value) => {
    //console.log(`hashReader changed. hashReaderActive = ${hashReaderActive}. hash = ${getHash()}`);
    hashReaderActive && parseHash()
    //parseHash();
  });

  function formatNumber(n) {
    return Math.round(n);
    return parseFloat(n.toFixed(1));
  }

  function parseHash() {

    //console.log('parseHash');

    const query = document.location.hash.slice(1).split('&').filter(Boolean).reduce((acc, keyval) => {
      const cutIdx = keyval.indexOf('=');
      const key = keyval.slice(0, cutIdx);
      let val = keyval.slice(cutIdx + 1);
      if ('OCEAN'.indexOf(key) >= 0) { // TODO remove
        val = val.split('.').map(s => parseInt(s));
      }
      acc[key] = val;
      return acc;
    }, {});

    console.log('parseHash: query = '+Object.keys(query).map(key => `${key} = ${query[key]}`).join(' & '));

    // TODO write to result object

    Object.keys(result.test).forEach(testKey => {
      const test = testData[testKey];
      const testResult = result.test[testKey];
      //const queryKey = testData[testKey].domainKeys.join('');
      //const queryKey = testKey; // TODO also use testKey in hash writer
      const queryKey = testKey + '.' + testData[testKey].domainKeys.join(''); // TODO also use testKey in hash writer
      if (!(queryKey in query)) return;
      const queryData = query[queryKey].split('.').reduce((acc, domainStr, domainIdx) => {
        const domainKey = testData[testKey].domainKeys[domainIdx];
        const neutralValue = testData[testKey].domainWidths[domainKey] == 2 ? 0 : NaN;
        acc[domainKey] = domainStr.split('').map(s => decodeScore(s, neutralValue));
        //console.log(`queryKey ${queryKey} + domain ${domainKey} + domainStr ${domainStr} + neutralValue ${neutralValue}: decodeScore = `, domainStr.split('').map(s => decodeScore(s, neutralValue)));
        return acc;
      }, {});
      console.log('queryData = ' + JSON.stringify(queryData));
      Object.keys(testResult.domain).forEach(domainKey => {
        const domainResult = testResult.domain[domainKey];
        
        facetList(test, domainKey).forEach(facetKey => {
          domainResult.facet[facetKey] = queryData[domainKey][facetKey];
        });

      });
    });

    update_sum();

    data.query = query; // TODO remove?
    
    if (query.lang) data.state.lang = query.lang;

    if (query.color) {
      data.state.color = query.color;
      colorDegrees = colorDegreesInput = degreesOfNcsHue(query.color);
    }

  }



  //let writeHash = () => null;
  let writeHash = () => console.log('writeHash: noop');
  let hashWriterActive = true;

  // FIXME should be called only once on form change (now is called twice)
  function writeHash_real() {

    if (!hashWriterActive) return;

    //console.log(`writeHash_real: lang = ${data.state.lang} (${data.state.lang || 'en'})`);
    //console.log(`writeHash_real: color = ${data.state.color} (${data.state.color || 'B'})`);

    hashReaderActive = false;

    const newHash = (
      '#' +
      Object.keys(result.test).map(testKey => {
        const testResult = result.test[testKey];
        const testResStr = Object.keys(testResult.domain).map(domainKey => {
          const domainResult = testResult.domain[domainKey];
          return domainResult.facet.map(encodeScore).join('');
        }).join('.');
        const queryKey = testKey + '.' + testData[testKey].domainKeys.join('');
        return queryKey + '=' + testResStr;
      }).join('&') +
      `&lang=${data.state.lang || 'en'}` +
      `&color=${data.state.color || 'B'}` +
      ''
    ); // TODO lang is always en after reload

    //console.log(`writeHash: ` + newHash);

    document.location.hash = newHash;

    hashReaderActive = true;
  }

  $: (data.query), writeHash();



  function loadLang(lang) {

    //console.log(`loadLang: lang = ${lang}`);
  
    if (!lang) lang = 'en'; // default language
    if (lang == data.state?.lang) {
      //console.log(`loadLang: lang is already ${lang}`);
      return;
    }

    /*
    // decompress arrays to objects
    const keyList = bigfiveData.keys.questions.join(', ');
    const questionOFA = new Function('a', `
      const [ ${keyList} ] = a;
      return { ${keyList}, keyed: isPlus ? 'plus' : 'minus' };
    `);
    data.questions = bigfiveData.language[lang].questions.map(qa => questionOFA(qa));
    */

    /*
      //console.log(`loadLang lang = ${lang}`);
      data.choices = await (await fetch(`/data/${lang}/choices.json`)).json();
      data.questions = await (await fetch(`/data/${lang}/questions.json`)).json();
    */

    //data.bigfive = bigfiveData;
    
    //data.questions_dfk = bigfiveData.languages[lang].domains;
    
    /*
    data.questions_dfk = data.questions.reduce((acc, question) => {
      const { domain, facet, keyed } = question;
      (domain in acc) || (acc[domain] = {});
      (facet in acc[domain]) || (acc[domain][facet] = {});
      acc[domain][facet][keyed] = question;

      (domain in data.result_df) || (data.result_df[domain] = { sum: 0, score: 50 });
      (facet in data.result_df[domain]) || (data.result_df[domain][facet] = 0);
      
      return acc;
    }, {});
    */

    // start reactive assignments
    //update_sum = update_sum_real;
    //writeHash = writeHash_real;

    data.state || (data.state = {});
    data.state.lang = lang;

    //data.query || (data.query = {});
    //data.query.lang = lang;

    //console.log(`loadLang data.state.lang = ${data.state.lang}`);
    
    
    writeHash();
  }

  onMount(async () => {
    //console.log(getInfo()) // returns test info
    //console.log(await getChoices()) // returns choices in English

    //loadLang(data.query?.lang);
    data.query || (data.query = {});
    ///////data.query.lang = 'en';

    //data.choices = await (await fetch(`/data/${lang}/choices.json`)).json();
    //data.questions = await (await fetch(`/data/${lang}/questions.json`)).json();

    //console.dir({ data });


  });

  /*
  console.log(getQuestions()) // returns questions in English

  console.log(getItems()) // returns English

  console.log(getItems('no')) // returns Norwegian

  console.log(getItems('en', true)) // returns English shuffeled
  */

  // TODO use arrays? like ['Extravert', 'Introvert'] -> show extremes on left and right side
  const nameOfMbtiDomain = {
    E: { plus: 'Extravert', minus: 'Introvert' },
    N: { plus: 'Ntuitive', minus: 'Sensing' },
    F: { plus: 'Feel', minus: 'Think' },
    P: { plus: 'Perceive', minus: 'Judge' },
  };

  // TODO generalize
  function get_mbti_code(keirsey_result_df) {
    // TODO better
    const mbti_unknown = '_';
    //console.dir({ keirsey_result_df });
    const E = keirsey_result_df.E.score;
    const N = keirsey_result_df.N.score;
    const F = keirsey_result_df.F.score;
    const P = keirsey_result_df.P.score;
    let res = '';
    res += (E > 52) ? 'E' : (E < 48) ? 'I' : mbti_unknown;
    res += (N > 52) ? 'N' : (N < 48) ? 'S' : mbti_unknown;
    res += (F > 52) ? 'F' : (F < 48) ? 'T' : mbti_unknown;
    res += (P > 52) ? 'P' : (P < 48) ? 'J' : mbti_unknown;
    return res;
  }

  function copyMarkdown() {
    console.log('todo');
  }



  function knob_value(angle, element) {
    // angle: 0 to 15. 0 == 16
    const result = [ undefined,
      // 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15
      [100, 75, 50, 25,  0,  0,  0,  0,  0,  0,  0,  0,  0, 25, 50, 75 ],
      [  0,  0,  0,  0,  0, 25, 50, 75,100, 75, 50, 25,  0,  0,  0,  0 ],
      [  0,  0,  0,  0,  0,  0,  0,  0,  0, 25, 50, 75,100, 75, 50, 25 ],
      [  0, 25, 50, 75,100, 75, 50, 25,  0,  0,  0,  0,  0,  0,  0,  0 ],
    ];
    return result[element][angle] || 0;
  }



  function get_translate(lang) {
  
    return function translate(testObj, ...keyList) {
      const test = testObj.data;
      function getVal(obj, keyList) {
        let i;
        for (i = 0; i < keyList.length-1; i++) {
          obj = obj[keyList[i]];
          if (!obj) return;
        }
        return obj[keyList[i]];
      }
      const firstKey = keyList.shift();
      if (test[firstKey] && lang in test[firstKey]) {
        const val = getVal(test, [firstKey, lang, ...keyList]);
        if (val !== undefined) return val;
      }
      return getVal(test, [firstKey, test.defaultLanguage, ...keyList]) || '';
    }
  }

  $: translate = get_translate(data.state.lang);



  function is_positive_domain(testKey, domain) {
    // default true
    if (testKey == 'bigfive' && domain == 'c') return false;
    return true;
    return !(['e14', 'e24', 'e4'].includes(test.convert?.domains[domain]));
  }
  
  function facetList(testData, domain) {
    //console.dir({ domain, lang: test.languages[test.defaultLanguage] });
    const facetArray = testData.domainItems[testData.defaultLanguage][domain];
    return Array.from({ length: facetArray.length }).map((_, idx) => idx);
  }

  function facetCount(testData, domainKey) {
    //console.dir({ testData, domainKey });
    return testData.domainItems[testData.defaultLanguage][domainKey].length;
  }





  // start reactive assignments
  update_sum = update_sum_real;
  writeHash = writeHash_real;

  $: loadLang(data.query?.lang);


  function ncsOfDegrees(d) {
    // d: 0 == 400
    if (d <=  10) return 'R';                  // red
    if (d <=  90) return 'R' + (     d) + 'B'; // red-blue
    if (d <= 110) return 'B';                  // blue
    if (d <= 190) return 'B' + (-100+d) + 'G'; // blue-green
    if (d <= 210) return 'G';                  // green
    if (d <= 290) return 'G' + (-200+d) + 'Y'; // green-yellow
    if (d <= 310) return 'Y';                  // yellow
    if (d <= 390) return 'Y' + (-300+d) + 'R'; // yellow-red
    if (d <= 400) return 'R';                  // red
    return ''; // bad input
  }

  
  const colorDegreesSet = debounce(function colorDegreesSet(colorDegreesInput) {
    colorDegrees = colorDegreesInput;
  }, 5);

  $: colorDegreesSet(colorDegreesInput);

  $: themeColorHex = (() => {
    const ncs = 'NCS 0580-' + ncsOfDegrees(colorDegrees);
    //const hex = ncsColor.hex('NCS 0580-' + n);
    const hex = ncsColor.hex(ncs);
    //const rgb = ncsColor.rgb(ncs);
    //console.log(`${colorDegrees}/400 -> ${ncs} -> ${hex} hex = ${rgb} rgb`);
    //console.log(`${colorDegrees}/400 -> ${ncs} -> ${hex} hex`);
    return hex;

    // TODO set state + url hash

  })();

  $: themeColorHexOpposite = (() => {
    //const ncs = 'NCS 0510-' + ncsOfDegrees((colorDegrees + 200) % 400);
    const ncs = 'NCS 9430-' + ncsOfDegrees((colorDegrees + 200) % 400);
    return ncsColor.hex(ncs);
  })();

/*
//test for https://github.com/m90/ncs-color/issues/5
//for (let d = 0; d < 400; d++) {
for (let d = 275; d < 278; d++) {
  const ncs = 'NCS 0580-' + ncsOfDegrees(d);
  const hex = ncsColor.hex(ncs);
  const rgb = ncsColor.rgb(ncs);
  //const [_, r, g, b] = rgb.match(/rgb\((\d+),(\d+),(\d+)\)/).map(s => parseInt(s));
  //if (255 < r || 255 < g || 255 < b || hex.length > 7) {
  if (true) {
    console.log(`${d}/400 deg -> ${ncs} -> ${hex} hex = ${rgb} rgb`);
  }
}
/**/

function degreesOfNcsHue(str) {
  const base = str[0];
  const phi = parseInt('0' + str.slice(1, -1));
  const degreesOfBase = { 'R': 0, 'B': 100, 'G': 200, 'Y': 300 };
  return degreesOfBase[base] + phi;
}

function ncsHueOfDegreesFactory(enableCache = true) {
  function ncsHueOfDegrees(d) {
    // full circle = 400 degrees
    const phi = d % 100;
    if (d ==   0) return 'R';         // red
    if (d <  100) return 'R'+phi+'B'; // red    + phi * blue
    if (d == 100) return 'B';         // blue
    if (d <  200) return 'B'+phi+'G'; // blue   + phi * green
    if (d == 200) return 'G';         // green
    if (d <  300) return 'G'+phi+'Y'; // green  + phi * yellow
    if (d == 300) return 'Y';         // yellow
    if (d <  400) return 'Y'+phi+'R'; // yellow + phi * red
    if (d <= 400) return 'R';         // red
  }
  if (!enableCache) return ncsHueOfDegrees;
  // cache results. faster by factor 10
  const ncsHueOfDegreesArray = (
    Array.from({ length: 401 })
    .map((_, d) => ncsHueOfDegrees(d))
  );
  return d => ncsHueOfDegreesArray[d];
}
const ncsHueOfDegrees = ncsHueOfDegreesFactory();

async function handleColorChangeDone(...args) {
  data.state.color = ncsHueOfDegrees(colorDegreesInput);
  writeHash();
}

const style_var = {
  'theme-color-knob-pixel-size': 80,
}

//console.dir(b5languages);

</script>

<main
  style="
    --theme-color: {themeColorHex};
    --theme-opposite-color: {themeColorHexOpposite};
    --theme-color-knob-size: {style_var['theme-color-knob-pixel-size']}px;
  "
>


<!--
[
        b5languages.find(l => l.id == 'en'),
        ...(
          b5languages.filter(l => l.id != 'en')
          .sort((a, b) => a.text.localeCompare(b.text))
        ),
      ]
    -->

  <div class="result-svg-container">{@html svg_of_bigfive}</div>

  <div class="menu">
    <!-- global language for all tests -->
    <div class="lang-menu">
      Language:
      {#each b5languages.sort((a, b) => a.text.localeCompare(b.text)) as language}
        <a on:click={() => (data.query.lang = language.id)} class:active={data.state?.lang == language.id}>{language.text}</a>{' '}
      {/each}
    </div>
  </div>

  <div class="menu">
    Theme color:
    <div class="theme-color-knob-container">
      <Knob class="theme-color-knob" circular={true} colorWheel={true} bind:value={colorDegreesInput}
      max={400} modulo={400} step={1} valueDisplayFunction={ncsHueOfDegrees}
      size={style_var['theme-color-knob-size']}
      on:afterChange={handleColorChangeDone} />
    </div>
  </div>

  <ol class="domain-list">

  <!-- loop tests -->

  

  {#each Object.keys(testData).map(testKey => {
      const test = {};
      test.key = testKey;
      test.data = testData[testKey];
      test.result = result.test[testKey];
      return test;
    }) as test
  }

    <li class="test">
      <h3>{test.data.meta.name}</h3>
      {#if test.data.meta.description}
        <div class="description">{@html test.data.meta.description}</div>
      {/if}
    </li>

    <!-- loop domains -->

    {#each test.data.domainKeys.map(domainKey => {

        /*
        // init domain object
        testResult.domain[domain] = {
          sum: 0,
          score: 0,
          facet: facetList(test, domain).map(_ => 0),
        };
        */
        const domain = {};

        domain.key = domainKey;
        domain.facetCount = facetCount(test.data, domain.key);
        domain.isPositive = is_positive_domain(test.key, domain.key);
        domain.result = test.result.domain[domain.key];
        domain.width = test.data.domainWidths[domain.key];

        //console.log(`testKey ${testKey} : domainKey ${domainKey} : domain_is_positive ${domain.isPositive}`);
        //console.log(`test.key ${test.key} : domainKey ${domainKey} : domainNames ${JSON.stringify(translate(test, 'domainNames', domain.key))} : domainNames 1 ${JSON.stringify(translate(test, 'domainNames', domain.key, 1))}`);

        return domain;
      }) as domain
    }

      <li class="domain domain-width-{domain.width}">

        <!-- domain head: average value -->

        {#if domain.width == 4}

          <div class="knob-facet">
            <div class="knob-facet-body">
              <div class="text top">
                <span class="value">{formatNumber(domain.result.scoreArray[2-1])}</span>
                <span class="answer">{translate(test, 'domainNames', domain.key, 2)}</span>
              </div>
              <div class="middle">
                <div class="text left">
                  <span class="value">{formatNumber(domain.result.scoreArray[4-1])}</span>
                  <span class="answer">{translate(test, 'domainNames', domain.key, 4)}</span>
                </div>

                <!-- TODO bind value: set average -> change precise values -->
                <Knob
                  class="center"
                  value={domain.result.scoreDegrees}
                  circular={true} min={0} max={16} modulo={16} step={1}
                  showNumber={false} allowUndefined={true}
                  strokeWidth={16} strokeWidthBack={4}
                  readonly={false}
                  primaryColor="#808080"
                />

                <div class="text right">
                  <span class="value">{formatNumber(domain.result.scoreArray[3-1])}</span>
                  <span class="answer">{translate(test, 'domainNames', domain.key, 3)}</span>
                </div>
              </div>
              <div class="text bottom">
                <span class="value">{formatNumber(domain.result.scoreArray[1-1])}</span>
                <span class="answer">{translate(test, 'domainNames', domain.key, 1)}</span>
              </div>
            </div>
          </div>

        {:else if domain.width == 2}

          <!--
            // index 0: neutral
            // index 1: positive
            // index 2: negative
          -->
          <h4>{
            translate(test, 'domainNames', domain.key, 0) ||
            (
              domain.isPositive
              ? translate(test, 'domainNames', domain.key).slice(1).reverse().join(' ↔ ')
              : translate(test, 'domainNames', domain.key).slice(1).join(' ↔ ')
            ) 
          }</h4>

          <!-- "with" block -->
          {#each [translate(test, 'domainDescriptions', domain.key)].filter(Boolean) as domainDescription}
            <div class="domain-description">{domainDescription}</div>
          {/each}

        {/if}

        <ol class="facet-list">

          {#if domain.width == 4}

            <!-- TODO initial value should be undefined
              = neutral value in even answer count
              ... but also odd answer count can need a undef value
            -->

            <!-- domain body: exact values -->

            {#each facetList(test.data, domain.key).map(facetId => {

              //console.log(`test ${test.key} : domain ${domain.key} : result = `, domain.result);

              return {
                id: facetId,
                question: translate(test, 'domainItems', domain.key, facetId, 0),
                answers: {
                  e1: translate(test, 'domainItems', domain.key, facetId, 1),
                  e2: translate(test, 'domainItems', domain.key, facetId, 2),
                  e3: translate(test, 'domainItems', domain.key, facetId, 3),
                  e4: translate(test, 'domainItems', domain.key, facetId, 4),
                },
                result: domain.result.facet[facetId],
              }
            }) as facet}

              <!-- domain body -> facet: exact value -->

              <li class="knob-facet">
                {#if facet.question}
                  <div class="knob-facet-head">{facet.question}</div>
                {/if}
                <div class="knob-facet-body">
                  <div class="text top">
                    <span class="value">{knob_value(domain.result.facet[facet.id], 2)}</span>
                    <span class="answer">{facet.answers.e2}</span>
                  </div>
                  <div class="middle">
                    <div class="text left">
                      <span class="value">{knob_value(domain.result.facet[facet.id], 4)}</span>
                      <span class="answer">{facet.answers.e4}</span>
                    </div>

                    <Knob
                      class="center"
                      bind:value={domain.result.facet[facet.id]}
                      circular={true} min={0} max={16} modulo={16} step={1}
                      showNumber={false} allowUndefined={true}
                      strokeWidth={20} strokeWidthBack={3} circularHandle="circle"
                      primaryColor={themeColorHex}
                      on:afterChange={() => {
                        // force reactivity. TODO why do we need this workaround?
                        // why does bind:value not trigger? as with the other knob + other inputs ...
                        domain.result.facet[facet.id] = domain.result.facet[facet.id];
                      }}
                    />

                    <div class="text right">
                      <span class="value">{knob_value(domain.result.facet[facet.id], 3)}</span>
                      <span class="answer">{facet.answers.e3}</span>
                    </div>
                  </div>
                  <div class="text bottom">
                    <span class="value">{knob_value(domain.result.facet[facet.id], 1)}</span>
                    <span class="answer">{facet.answers.e1}</span>
                  </div>
                </div>
              </li>

            {/each}

          {:else if domain.width == 2}

            <!-- domain head: average value -->

            <li class="facet domain-result">
              {#if domain.isPositive}
                <span class="text result">
                  <!-- TODO negative result -->
                  {translate(test, 'domainNames', domain.key, 2)}
                  <!--{100 - data.result_df[domain].score}-->
                </span>

                <!-- average disabled:
                  <input type="range" min="{-2 * domain.facetCount}" max="{2 * domain.facetCount}" disabled
                    bind:value={domain.result.sum}>
                -->

                <!-- average editable: -->
                <!-- TODO reactive assign: domain.result.sum -> domain.result.facet[facet.id] -->
                <input type="range" min="{-2 * domain.facetCount}" max="{2 * domain.facetCount}"
                  value={domain.result.sum} on:input={event => setDomainAverage(domain, event)}>

                <!-- exact value:
                  <input type="range" min="-2" max="2" step="1" bind:value={domain.result.facet[facet.id]}>
                -->

                <span class="text result">
                  {domain.result.score}
                  {translate(test, 'domainNames', domain.key, 1)}
                </span>
              {:else}
                <span class="text result">
                  {translate(test, 'domainNames', domain.key, 1)}
                  {domain.result.score}
                </span>
                <input type="range" min="{-2 * domain.facetCount}" max="{2 * domain.facetCount}" disabled 
                  bind:value={domain.result.sum}
                  class="reverse"
                >
                <span class="text result">
                  <!-- TODO negative result -->
                  {translate(test, 'domainNames', domain.key, 2)}
                </span>
              {/if}
            </li>

            <!-- domain body: exact values -->

            <!--{#each facetList(test, domain.key) as facet}-->
            {#each facetList(test.data, domain.key).map(facetId => {
              return {
                id: facetId,
                question: translate(test, 'domainItems', domain.key, facetId, 0),
                answers: {
                  minus: translate(test, 'domainItems', domain.key, facetId, 2),
                  plus: translate(test, 'domainItems', domain.key, facetId, 1),
                }
              }
            }) as facet}

              <!-- domain body -> facet: exact value -->

              <li class="facet">
                {#if domain.isPositive}
                  <span class="text minus">{facet.answers.minus}</span>
                  <input type="range" min="-2" max="2" step="1" bind:value={domain.result.facet[facet.id]}>
                  <span class="text plus">{facet.answers.plus}</span>
                {:else}
                  <span class="text plus">{facet.answers.plus}</span>
                  <input class="reverse" type="range" min="-2" max="2" step="1" bind:value={domain.result.facet[facet.id]}>
                  <span class="text minus">{facet.answers.minus}</span>
                {/if}
              </li>

            {/each}

          {/if}

          <!--
          {#each facetList(test, domain) as facet}
            <li class="facet">
              {#if domain.isPositive}
                <span class="text minus">{translate(test, 'domainItems', domain, facet, minusKey) || ' '}</span>
                <input type="range" min="-2" max="2" step="1" bind:value={domain.result.facet[facet]}>
                <span class="text plus">{@html translate(test, 'domainItems', domain, facet, plusKey) || '&nbsp;'}</span>
              {:else}
                <span class="text plus">{translate(test, 'domainItems', domain, facet, plusKey) || ' '}</span>
                <input class="reverse" type="range" min="-2" max="2" step="1" bind:value={domain.result.facet[facet]}>
                <span class="text minus">{translate(test, 'domainItems', domain, facet, minusKey) || ' '}</span>
              {/if}
            </li>
          {/each}
        -->

        </ol>
      </li>

    {/each}

    <li class="domain total-result">
      <h4>Result: {test.data.meta.name}</h4>
      <p>
        {test.data.domainKeys.join('')}
        <!-- TODO support flowprofile -->
        {#each test.data.domainKeys as domainKey}
          {test.result.domain[domainKey].score}{' '}
        {/each}
      </p>
      <ol class="domain total-result">
        {#each test.data.domainKeys as domainKey}
          <li class="facet total-result">
            <span>&nbsp;</span><!-- workaround for chrome bug: empty span creates extra top-margin -->
            <!-- TODO support flowprofile -->
            <input type="range" min="{-2 * facetCount(test.data, domainKey)}" max="{2 * facetCount(test.data, domainKey)}" disabled bind:value={test.result.domain[domainKey].sum}>
            <span class="text result">
              {test.result.domain[domainKey].score}
              {translate(test, 'domainNames', domainKey, 0)}
            </span>
          </li>
        {/each}
      </ol>
    </li>
    <!--
      <li class="domain text-result" style="display: block; text-align: center">
        <h4>Result as Markdown Text</h4>
        <pre style="display: inline-block; text-align: left">
          {#each data.questions_dfk.O ? Array.from('OCEAN') : [] as domain}
            * {data.result_df[domain].score} {nameOfDomain[domain]}{'\n'}
          {/each}
        </pre>
        <p><a on:click={copyMarkdown} style="cursor: pointer; color: blue">Copy to Clipboard</a></p>
      </li>
    -->
{/each}

    
  </ol>
  
</main>

<style>

  :global(body) {
    margin: 0;
    padding: 0;
  }

  main {
    text-align: left;
    font-family: sans-serif !important;
    padding: 1em;
    max-width: 240px;
    /*margin: 0 auto;*/
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  li.test {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  li.test div.description :global(details) {
    text-align: left;
  }

  /* TODO prettier
  li.test div.description :global(details) :global(summary) {
    text-align: center;
  }
  */

  li.test div.description :global(details) > :global(*) {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  .domain-description{
    margin-bottom: 1.5em;
  }

  li.domain {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .knob-facet {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  }

  .knob-facet-head {
    margin-top: 1em;
    margin-bottom: 0.5em;
  }

  .knob-facet-body {
    display: inline-flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3em;
    margin-top: 1em;
  }

  .knob-facet-body > .middle {
    display: flex;
    align-items: center;
  }



  .knob-facet-body > .top {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
  }
  .knob-facet-body > .top > .value {
    margin: 0.5em 0;
  }



  .knob-facet-body > .middle > .text {
    width: 20em;
  }



  .knob-facet-body > .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .knob-facet-body > .bottom > .value {
    margin: 0.5em 0;
  }



  .knob-facet-body > .middle > .left {
    text-align: right;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: flex-start;
  }
  .knob-facet-body > .middle > .left > .value {
    margin: 0 0.5em;
  }



  .knob-facet-body > .middle > .right {
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }
  .knob-facet-body > .middle > .right > .value {
    margin: 0 0.5em;
  }
  .knob-facet-body > .middle > .right {
    text-align: left;
  }



  .knob-facet-body > div {
    text-align: center;
  }

  .facet-list {
    display: flex;
    flex-direction: column;
  }

  .facet {
    display: inline-flex;
    /*align-content: space-between;*/
    /*justify-content: space-between;*/
    justify-content: center;
    align-items: flex-start;
    margin-bottom: 1em;
  }

  ol, ul {
    margin: 0;
    padding: 0;

  }
  .facet > span {
    display: inline-block;
    width: 25em;
  }
  .facet > span:nth-child(1) {
    text-align: right;
  }
  .facet > span:nth-child(3) {
    text-align: left; /* TODO why child 3, not child 2? */
  }
  .facet > input {
    width: 10em !important;
    margin: 0 0.5em;
  }

  /*
    * {
      border: solid 1px red;
    }
  */


  /* fix style for links with no href */
  a:hover {
    text-decoration: underline;
  }
  a {
    color: var(--theme-color) !important;
    cursor: pointer;
  }

  main {
    background-color: var(--theme-opposite-color);
  }

  .menu {
    display: flex;
    align-items: flex-start;
/*
    margin-left: calc(2em + var(--theme-color-knob-size));
*/
  }
  
  .menu > * {
    margin-right: 1em;
  }

/*
  .theme-color-knob-container {
    position: fixed;
    top: 1em;
    left: 1em;
  }
*/

  /* we need :global() to style the knob div */
/*
  :global(.menu > div) {
    margin-right: 1em !important;
  }
*/

  .lang-menu a.active {
    color: black !important;
    cursor: default;
    text-decoration: none;
  }

  .bigfive2alchi-result {
    display: inline-block;
    text-align: left !important;
    border: solid 1px grey;
    padding: 0 1em;
  }

  .result-svg-container {
    display: inline-block;
    position: fixed;
    bottom: 0.5em;
    left: 0.5em;
    
    /*
    width: 4em; height: 4em;
    background: transparent;
    */

    width: 16em; height: 16em;
    background: white;
}

  .result-svg-container:hover {
    display: inline-block;
    position: fixed;
    bottom: 0.5em;
    left: 0.5em;

    width: 16em; height: 16em;
    background: white;
  }

  .result-svg-container + * {
    /*margin-top: -10em; /* SYNC with height of result-svg-container */
  }





input[type=range].reverse {
  transform: rotateY(180deg);
}

/* generated by http://danielstern.ca/range.css */

input[type=range] {
  width: 100%;
  margin: 4px 4px;
  background-color: transparent;
  -webkit-appearance: none;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  background: white;
  border: 0.2px solid rgba(1, 1, 1, 0.3);
  border-radius: 5px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}

/* hover color */
input[type=range]:hover::-webkit-slider-runnable-track {
  background: rgb(220, 220, 220);
}

/* TODO darker than theme color. shadow?
input[type=range]:hover::-webkit-slider-thumb {
  background: #005ecc;
}
*/

/* disable color + cursor */
input[type=range][disabled]::-webkit-slider-thumb {
  background: grey;
  cursor: default;
}
input[type=range][disabled]::-webkit-slider-runnable-track {
  cursor: default;
}
/* disable hover color */
input[type=range][disabled]:hover::-webkit-slider-runnable-track {
  background: white;
}
input[type=range][disabled]:hover::-webkit-slider-thumb {
  background: grey;
}



input[type=range]::-webkit-slider-thumb {
  margin-top: -4.2px;
  width: 16px;
  height: 16px;

  /*
  background: #0075ff;
  */

  background-color: var(--theme-color);

  border: 0;
  border-radius: 9px;
  cursor: pointer;
  -webkit-appearance: none;
}

/*
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #ffffff;
}
*/

input[type=range]::-moz-range-track {
  background: rgba(255, 255, 255, 0.78);
  border: 0.2px solid rgba(1, 1, 1, 0.3);
  border-radius: 5px;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type=range]::-moz-range-thumb {
  width: 16px;
  height: 16px;
  background: #0075ff;
  border: 0;
  border-radius: 9px;
  cursor: pointer;
}
input[type=range]::-ms-track {
  background: transparent;
  border-color: transparent;
  border-width: 4.9px 0;
  color: transparent;
  width: 100%;
  height: 8px;
  cursor: pointer;
}
input[type=range]::-ms-fill-lower {
  background: #f2f2f2;
  border: 0.2px solid rgba(1, 1, 1, 0.3);
  border-radius: 10px;
}
input[type=range]::-ms-fill-upper {
  background: rgba(255, 255, 255, 0.78);
  border: 0.2px solid rgba(1, 1, 1, 0.3);
  border-radius: 10px;
}
input[type=range]::-ms-thumb {
  width: 16px;
  height: 16px;
  background: #0075ff;
  border: 0;
  border-radius: 9px;
  cursor: pointer;
  margin-top: 0px;
  /*Needed to keep the Edge thumb centred*/
}
input[type=range]:focus::-ms-fill-lower {
  background: rgba(255, 255, 255, 0.78);
}
input[type=range]:focus::-ms-fill-upper {
  background: #ffffff;
}
/*TODO: Use one of the selectors from https://stackoverflow.com/a/20541859/7077589 and figure out
how to remove the virtical space around the range input in IE*/
@supports (-ms-ime-align:auto) {
  /* Pre-Chromium Edge only styles, selector taken from hhttps://stackoverflow.com/a/32202953/7077589 */
  input[type=range] {
    margin: 0;
    /*Edge starts the margin from the thumb, not the track as other browsers do*/
  }
}




</style>
