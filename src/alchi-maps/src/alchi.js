
// TITLE perfekte sitzordnung, vision vom paradies auf erden
// TITLE seating-arrangements matchmaking compatibility

// age sense move gen, origin 11
// signs: 0 = same, 1 = diff
export const ac_bits_asmg_11 = [
    0b1001, 0b0111, 0b1011, 0b0101,
    0b1110, 0b0000, 0b1100, 0b0010,
    0b1101, 0b0011, 0b1111, 0b0001,
    0b1010, 0b0100, 0b1000, 0b0110,
]
export const get_bit = function (num, idx) {
    return (num & (1 << idx)) >> idx;
    // TODO benchmark - just for fun
    // parseInt(num.toString(2).padStart(4,0)[idx],10)
}
export const decode_bitstring = function (asmg) {
    return parseInt(asmg, 2);
}
export const ac_xor = function(factor, list) {
    return list.map(function (n) {
        return factor ^ n
    })
}
// letters of the four dimensions
export const letter_asmg = [
    ['S', 'L'], // age   = Short  or Long
    ['E', 'I'], // sense = Extra  or Intro
    ['N', 'P'], // move  = Neuro  or Psycho
    ['F', 'M'], // gen   = Female or Male
]



// element = sense + move
export const element = [
    [
      '3', // _00_ = EN = 3
      '1', // _01_ = EP = 1
    ], [
      '2', // _10_ = IN = 2
      '4', // _11_ = IP = 4
    ],
]


export const element_outside = [
    [
      'C', // 0__0 = SF = C
      'A', // 0__1 = SM = A
    ], [
      'B', // 1__0 = LF = B
      'D', // 1__1 = LM = D
    ],
]



// moved to colorTable.js

// TODO add front/back colors
// light colors: yellow + green
// dark  colors: blue + red
// TODO auto-generate color table?

export const group_color = {
  2: [
    0x000000, // black
    0xffffff, // white
  ],
  4: [
    // quickfix element color
    // "problem": no more rainbow color scale
    //   = no mix-colors between red/green and blue/yellow
    //   = opposite colors not easy to find for text vs back color
              // color    E   SM   SM
    0xffff00, // yellow   3   EN   00
    0xff0000, // red      1   EP   01
    0x00ff00, // green    2   IN   10
    0x0000ff, // blue     4   IP   11
/*
    0xffff00, // yellow   3   EN   00
    0xff0000, // red      1   EP   01
    0x00ff00, // green    2   IN   10
    0x0000ff, // blue     4   IP   11
*/
    /* rainbow color scale
    0xff0000, // red
    0xffff00, // yellow
    0x00ff00, // green
    0x0000ff, // blue
    */
  ],
  8: [
    // rainbow color scale
    0xff0000, // red
    0xff8000, //   orange
    0xffff00, // yellow
    0x80ff00, //   lime
    0x00ff00, // green
    0x00ffff, //   turc
    0x0000ff, // blue
    0xff00ff, //   purp
  ],
  16: [
    // rainbow color scale
    0xff0000, // red
    0xff4000, //     red-orange
    0xff8000, //   orange
    0xffc000, //     orange-yellow
    
    0xffff00, // yellow
    0xc0ff00, //     yellow-lime
    0x80ff00, //   lime
    0xc0ff00, //     lime-green
    
    0x00ff00, // green
    0x00ff80, //     green-turc
    0x00ffff, //   turc
    0x0080ff, //     turc-blue
    
    0x0000ff, // blue
    0x8000ff, //     blue-purp
    0xff00ff, //   purp
    0xff0080, //     purp-red
  ],
}



export const group_color_html = ( function(group_color) {
  return Object.entries(group_color).reduce(
    (acc, [numGroups, colors]) =>
    {
      acc[numGroups] = colors.map((col) => {
        return '#'+col.toString(16).padStart(6, '0')
      })
      return acc
    }, {})
} )(group_color)



export const idxFromDim = {
  'A': 0,
  'S': 1,
  'M': 2,
  'G': 3,

  'a': 0,
  's': 1,
  'm': 2,
  'g': 3,}


function getDimBit (asmg, dim) {
  //global idxFromDim
  return asmg[idxFromDim[dim]]
}

function nameFromGroup (g) {
  // GxMSxA <-- GM+SA
  // GxMxSxA <-- GMSA
  // GMSA <-- G+M+S+A
  return g.split('').join('x').replace('x+x', '')
}

function groupFromName (n) {
  // GM+SA <-- GxMSxA
  // G+M+S+A <-- GMSA
  // GMSA <-- GxMxSxA
  return n.split('').join('+').replace('+x+', '')
}

export const letterFromASMG = function (dim, asmg) { //TODO change to (asmg, dim)
  // ASMG
  const i = idxFromDim[dim]
  //console.log('dim '+dim+'   idx '+i)
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



// pathos: [same-move pathos, same-sense pathos]
// pathos == the TWO next-plus-one types
// one pathos type is horizontal next-plus-one
// other pathos type is vertical next-plus-one
export const N_pathosFromN = [
  [ 4,  2], [ 5,  3], [ 6,  0], [ 7,  1], // FNES, MNES, FPES, MPES,
  [ 0,  6], [ 1,  7], [ 2,  4], [ 3,  5], // FNIS, MNIS, FPIS, MPIS,
  [12, 10], [13, 11], [14,  8], [15,  9], // FNEL, MNEL, FPEL, MPEL,
  [ 8, 14], [ 9, 15], [10, 12], [11, 13], // FNIL, MNIL, FPIL, MPIL
]

// zodiac
// 12 zodiac signs = 4 elements x 3 modalities
// modality "mutable" = 4 elements
// modality "fixed" = 4 pathos with psychotic move
// modality "cardinal" = 4 pathos with neurotic move
// [how to diff the two pathos types? here: by move]
// four elements = four "mutable" signs
// idx 0 1 2 3 = elm 3 1 2 4

/*
export const zodiacMutableFromSM = [
  ['♊︎', 'Gemini = mutable air'],
  ['♐︎', 'Sagittarius = mutable fire'],
  ['♍︎', 'Virgo = mutable earth'],
  ['♓︎', 'Pisces = mutable water'],
]
export const zodiacCardinalFromSM = [
  ['♎︎', 'Libra = cardinal air'],
  ['♈︎', 'Aries = cardinal fire'],
  ['♑︎', 'Capricorn = cardinal earth'],
  ['♋︎', 'Cancer = cardinal water'],
]
export const zodiacFixedFromSM = [
  ['♒︎', 'Aquarius = fixed air'],
  ['♌︎', 'Leo = fixed fire'],
  ['♉︎', 'Taurus = fixed earth'],
  ['♏︎', 'Scorpius = fixed water'],
]
*/




/*
https://www.cosmopolitan.com/uk/entertainment/horoscopes-monthly/a29383721/star-sign-dates/

1 Aries dates: March 21 – April 19
2 Taurus dates: April 20 – May 20
3 Gemini dates: May 21 – June 20
4 Cancer dates: June 21 – July 22

1 Leo dates: July 23 – August 22
2 Virgo dates: August 23 – September 22
3 Libra dates: September 23 – October 22
4 Scorpio dates: October 23 – November 21

1 Sagittarius dates: November 22 – December 21
2 Capricorn dates: December 22 – January 19
3 Aquarius dates: January 20 – February 18
4 Pisces dates:February 19 – March 20

Anton Szandor LaVey
  born 1930-04-11
  calendar astrology:
    aries = cardinal fire
    but LaVey is water, and only is playing fire = 4p1

Gneedl
  born 2017-03-13
  calendar astrology:
    Pisces = mutable water
    but Gneedl is fire
    also was forced to birth 5 weeks too early
    birth was predicted around 2017-04-17 = aries
    will be forced to "play water"

mila
  born 1989-08-23
  calendar astrology:
    virgo = mutable earth
    but mila is fire
    parents said Leo = fixed fire
    earth is "impossible to play" for fire



*/

export const zodiacMutableFromSM = [
  ['gemini', 'Gemini = mutable air'],
  ['sagittarius', 'Sagittarius = mutable fire'],
  ['virgo', 'Virgo = mutable earth'],
  ['pisces', 'Pisces = mutable water'],
]

export const zodiacCardinalFromSM = [
  ['libra', 'Libra = cardinal air'],
  ['aries', 'Aries = cardinal fire'],
  ['capricorn', 'Capricorn = cardinal earth'],
  ['cancer', 'Cancer = cardinal water'],
]

export const zodiacFixedFromSM = [
  ['aquarius', 'Aquarius = fixed air'],
  ['leo', 'Leo = fixed fire'],
  ['taurus', 'Taurus = fixed earth'],
  ['scorpius', 'Scorpius = fixed water'],
]



// names and translations
// key path = locale, scope, key

// names and translations
// key path = locale, scope, key
const nameByLocaleData = {

  en: {
    asmg: {
      "A": "Son",
      "B": "Mother",
      "C": "Daughter",
      "D": "Father",

      "1": "Fire", //  = son inside
      "2": "Earth", //  = mother inside
      "3": "Air", //  = daughter inside
      "4": "Water", //  = father inside

      "M": "Male",
      "F": "Female",
      "S": "Small", // TODO young
      "L": "Large", // TODO old

      "P": "Psychotic", //  = male inside
      "N": "Neurotic", //  = female inside
      "E": "Extravert", //  = young inside
      "I": "Introvert", //  = old inside
    },

    // Robert Moore, Douglas Gillette: King, Warrior, Magician, Lover
    // via Elliott Hulse, The-Four-Layers-of-Strength.pdf
    moore_gillette: {
      "A": "Son",
      "B": "Mother",
      "C": "Daughter",
      "D": "Father",

      "1": "Warrior",
      "2": "Lover",
      "3": "Magician",
      "4": "King",
    },

    mbti: {
      // first half = sense + move
      "N": "Ntuit", //  = extravert sense = young inside
      "S": "Sense", //  = introvert sense = old inside
      "E": "'Extravert'", //  = neurotic move = female inside
      "I": "'Introvert'", //  = psychotic move = male inside

      // second half = (sense + move) of pathos
      "P": "Perceive", //  = extravert sense = young inside
      "J": "Judge", //  = introvert sense = old inside
      "F": "Feel", //  = neurotic move = female inside
      "T": "Think", //  = psychotic move = male inside
      // note. four combinations are impossible:
      // INFJ, ESTP, ENTJ, ISFP
      // cos you never can play your opposite type
      // fire can never play earth, and vice versa
      // air can never play water, and vice versa
      // these impossible results serve
      // as control parameter for the MBTI test
      // so yes, MBTI is "only astrology with extra steps" :P

      // 16 names

      // first/left half = body, center, "nomos", name, self
      // second/right half = pathos

      // IN = 1 = TP
      // ES = 2 = FJ
      // EN = 3 = FP
      // IS = 4 = TJ

      "INTP": "Designer, Theorizer, Architect", // 1p1
      "INFJ": "Foreseer, Developer, Counselor", // 1p2 [forbidden in alchi]
      "INTJ": "Conceptualizer, Director, Mastermind", // 1p4
      "INFP": "Harmonizer, Clarifier, Healer", // 1p3

      "ESFJ": "Facilitator, Caretaker, Provider", // 2p2
      "ESFP": "Motivator, Presenter, Performer", // 2p3
      "ESTJ": "Implementor, Supervisor", // 2p4
      "ESTP": "Promoter, Executor", // 2p1 [forbidden in alchi]

      "ENFP": "Discoverer, Advocate, Champion", // 3p3
      "ENFJ": "Envisioner, Mentor, Teacher", // 3p2
      "ENTJ": "Strategist, Mobilizer, Fieldmarshal", // 3p4 [forbidden in alchi]
      "ENTP": "Explorer, Inventor", // 3p1

      "ISTJ": "Planner, Inspector", // 4p4
      "ISTP": "Analyzer, Operator, Crafter", // 4p1
      "ISFJ": "Protector, Supporter", // 4p2
      "ISFP": "Composer, Producer", // 4p3 [forbidden in alchi]

    },

    pol: {
      "1": "Communist", //  = son inside
      "2": "Capitalist", //  = mother inside
      "3": "Socialist", //  = daughter inside
      "4": "Fascist", //  = father inside
    },

    body: {
      "M": "Male",
      "F": "Female",
      "S": "Child",
      "L": "Elder",

      "P": "masculine",
      "N": "feminine",
      "E": "childish",
      "I": "mature",
    },

    hormones: {
      "1": "Testosterone, Adrenaline",
      "2": "Estrogen, Oxytocin",
      "3": "Dopamine",
      "4": "Serotonine",
    },

    // Elliot Abravanel - Endocrine Gland Types
    glands: {
      "1": "adrenal",
      "2": "gonad",
      "3": "pituitary",
      "4": "thyroid",
    },

    sheldonMorph: {
      "1": "heartshape-meso",
      "2": "pearshape-meso",
      "3": "endo",
      "4": "ecto",
    },

    flowProfile: {
      "1": "hard charger",
      "2": "flow goer",
      "3": "crowd pleaser",
      "4": "deep thinker",
    },

    deloitteBC: {
      "1": "Guardian",
      "2": "Driver",
      "3": "Pioneer",
      "4": "Integrator",
    },

    sevenChakras: {
      "1": "solar plexus ?",
      "2": "root chakra",
      "3": "heart chakra ?",
      "4": "third eye ?",
    },

    simpsons: {
      "1": "Marge",
      "2": "Homer",
      "3": "Bart",
      "4": "Lisa",
    },

    southPark: {
      "1": "kenny",
      "2": "stan",
      "3": "eric",
      "4": "kyle",
    },

    americanDad: {
      "1": "steve",
      "2": "stan",
      "3": "francine",
      "4": "hailey",
    },

    // TODO plato?
    keirseyTemperament: {
      "1": "Artisan",
      "2": "Guardian",
      "3": "Idealist",
      "4": "Rational",
    },

    // TODO hans eysenck
    // TODO two factor personality models

    keirseyTemperamentOld: {
      "1": "Dionysos (artist)",
      "2": "Epimetheus (duty)",
      "3": "Apollon (soul)",
      "4": "Prometheus (technic)",
    },

    jungianFunction: {
      "1": "N-tuition",
      "2": "Sensing",
      "3": "Feeling [or Thinking]",
      "4": "Thinking [or Feeling]",
    },

    ph360me: {
      "1": "Crusader",
      "2": "Diplomat",
      "3": "Connector",
      "4": "Sensor",
    },

    bodyWeight: {
      "1": "upper gainer",
      "2": "lower gainer",
      "3": "fast gainer",
      "4": "hard gainer",
    },

    ayurvedaDoshas: {
      "1": "pitta",
      "2": "Prithvi",
      "3": "kapha",
      "4": "vata",
    },

    eigenColor: {
      "1": "red",
      "2": "green",
      "3": "yellow",
      "4": "blue",
    },

    dressColor: {
      "1": "yellow/blue",
      "2": "blue/yellow",
      "3": "red/green",
      "4": "green/red",
    },

    harryPotter: {
      "1": "gryffindor",
      "2": "hufflepuff",
      "3": "ravenclaw",
      "4": "slytherin",
    },

    // TODO
    // https://en.wikipedia.org/wiki/Rumi
    // https://books.google.de/books?id=8DJ-CwAAQBAJ&pg=PT279&lpg=PT279&dq=islam+four+spirits&source=bl&ots=v7TFAG61iJ&sig=ACfU3U1NcMrssknJ_6yIg0o-tiolf-RFFg&hl=de&sa=X&ved=2ahUKEwiGi5Sc9ennAhXSoFwKHSn_BK0Q6AEwEXoECAkQAQ#v=onepage&q=islam%20four%20spirits&f=false
    // Practical Mysticism in Islam and Christianity
    // by Saeed Zarrabi-Zadeh
    // A Comparative Study of Jalal al-Din Muhammad Rumi and Meister Eckhart
    // four progressive degrees of spirit, i.e. the spirit of animals,
    // the human spirit, the spirit of angels, and the height of the spirit of mystical adepts, that is also the spirit of adam and the object of the worship of the angel; [32]
    // [32] 
    // https://en.wikipedia.org/wiki/Exorcism_in_Islam
    // Jinn is an Arabic collective noun
    // deriving from the Semitic root jnn
    // (Arabic: جَنّ / جُنّ, jann),
    // whose primary meaning is "to hide"
    // Jinn exist invisibly amongst humans,
    // only detectable with the sixth sense.
    // The jinn are subtile creatures
    // created from smokeless fire (fire and air)
    // thought to be able to
    // possess animate and inanimate objects.
    // Unlike demons, they are not necessarily evil,
    // but own a capacity of free-will.
    islamSufiJalalAlDinMuhammadRumi: {
      "1": "Animal",
      "2": "Human",
      "3": "Angel",
      "4": "Mystic",
    },

    // https://en.wikipedia.org/wiki/Classification_of_demons#The_Satanic_Bible
    // LaVey utilized the symbolism of the Four Crown Princes of Hell
    satanicBibleByAntonSzandorLaVey: {

      "1": "Satan",
      // Satan (Hebrew)
      // "Lord of the Inferno".
      // The adversary, representing opposition,
      // the element of fire,
      // the direction of the south,
      // and the Sigil of Baphomet during ritual.
      // The Infernal Diatribe

      // https://en.wikipedia.org/wiki/Dante%27s_Satan
      // frozen mid-breast in ice
      //   = hot top / cold bottom = yellow / blue
      // the ultimate sinner
      // "Satan was formerly the Angel of Light [Lucifer]
      //   and once tried to usurp/take the power of God."
      //   = misunderstood as "air plays fire"
      //     but "playing fire" is held privilege for water
      //     = "hetero ideal" and homophobia
      //     m4p1 + f3p2
      //     f4p1 + m3p2
      // he is slobbering [mouth full slime], wordless,
      //   and receives the same punishments in Hell
      //   as the rest of the sinners.

      "2": "Belial",
      // Belial (Hebrew)
      // "Without a Master".
      // The baseness of the earth,
      // independence and self-sufficiency,
      // the element of earth,
      // the direction of the north,
      // and the sword during ritual.
      // Mastery of the Earth

      "3": "Lucifer",
      // Lucifer (Roman)
      // "The Morning Star".
      // The bringer of light,
      // representing pride and enlightenment,
      // the element of air,
      // the direction of the east,
      // and candles during ritual.
      // The Enlightenment

      "4": "Leviathan",
      // Leviathan (Hebrew)
      // "Serpent of the Abyss".
      // The great dragon,
      // representing primal secrecy,
      // the element of water,
      // the direction of the west,
      // and the chalice during ritual.
      // The Raging Sea

    },

    /*
      Paracelsus and his subsequent followers,
      there are four categories of elementals,
      which are
      gnomes, undines, sylphs, and salamanders.[1]
      These correspond to the
      four Empedoclean elements of antiquity:
      earth, water, air, and fire, respectively.
      https://en.wikipedia.org/wiki/Elemental
      Nymphis, sylphis, pygmaeis et salamandris
      
      These ideas were adopted in Rosicrucianism
      and were widely encountered
      in subsequent hermetic literature.
    */
    paracelsus: {
      "1": "Salamander",
      "2": "Gnome, Pygmae, dwarf, midget",
      "3": "Sylph, forest nymph, silvia/silvio",
      "4": "Undine, water nymph, mermaid",
    },

    attachmentStyle: {
      "1": "",
      "2": "anxious",
      "3": "",
      "4": "avoidant",
    },

    // naf, nef = soul, self
    // seven nafs = seven chakras?
    // https://en.wikipedia.org/wiki/Nafs
    /*
      1 A inciting ʾammārah tamaara
           = air? driven by instinct, hyper active
           = neurotic pathos?
           = extravert pathos?
           = cardinal modality in zodiac
          1.1 iblis = sub-animal,
              lower than the animal state, 
              because the self seeks to replace God 
              in the love for itself
              = fire
          1.2 hayawan
              Al nafs al-hayawaniyya ("the animal state") 
              describes the self, 
              which runs after material possessesion, 
              sensual desires and animalistic pleasures.
              lust, desire, greed, EMOTION, hunger, need, libido
              = air
      2 B self-accusing luwwāmah // TODO names
          = earth?
          = balance of pathos = mutable modality in zodiac
          the stage where 
          "the conscience is awakened 
          and the self accuses one 
          for listening to one’s ego. 
          One repents and asks for forgiveness."[17] 
      3 inspired mulhamah 
      4 C peace muṭma-innah
           = psychotic pathos?
           = introvert pathos?
           = fixed modality in zodiac
          In Sura al-Fajr the Quran mentions 
          "the nafs at peace".[Quran 89:27] 
          This is the ideal stage of ego for Muslims. 
          On this level one is firm in one’s faith 
          and leaves bad manners behind.[17] 
          The soul becomes tranquil, at peace.[17] 
          At this stage, followers of Sufism 
          have relieved themselves 
          of all materialism and worldly problems 
          and are satisfied with the will of God.
      5 pleased raḍīyyah radii-jach
      6 pleasing marḍīyyah mardii-jach
      7 pure ṣāfīyyah saafii-jach --> sufi? sofia, wisdom
    */

    /*
      greater jihad
      culture war
      cold war
      Jihad Akbar
      the big struggle
      The struggle against nafs
       = anti air/daughter
       = anti neurotic/feminine
      
      the worst enemy you have 
      is [the nafs] between your sides
      
      Rumi warns of the nafs in its guise of 
      religious hypocrisy, 
      saying "the nafs has a rosary and a Koran 
      in its right hand, 
      and a scimitar and dagger in the sleeve."[15]

      In classical Islamic law, 
      the term refers to 
      armed struggle against unbelievers,[2][3] 
      while modernist Islamic scholars 
      generally equate military jihad with 
      defensive warfare.[7][8] 

      In Sufi and pious circles, 
      spiritual and moral jihad 
      has been traditionally emphasized 
      under the name of greater jihad.[9][3] 

      The term has gained additional attention 
      in recent decades 
      through its use by terrorist groups.
    */

    /*
      a specific part of our self and it is 
      that part of our self that has desires, appetite, 
      some people call it ego. 

      It has anger, it has passion, it has lust, desire, 
      it has all these things. 
      Some people may even call it the 
      carnal self or the carnal soul. 

      This nafs is not part of the Ruh, 
      its part of the physical human being. 

      So if we wanted to say that we have 
      some physical part of our creation, 
      that is our body and our nafs 
      and then Allah Almighty has also put 

      inside of ourselves an 
      inner or spiritual part of our creation, 
      that is our ruh.

      naf = neurotic
      ruh = psychotic ?

    */

    // animal, satan?, behima, cattle = drink eat breed sleep

    islamNafs: {
      "1": "iblis", // 
      "2": "",
      "3": "",
      "4": "",
    },

    // https://en.wikipedia.org/wiki/Classification_of_demons#Dictionnaire_Infernal
    dictionnaireInfernal: {
      "1": "Pluton the prince of Fire, Hades the lord of Underworld", // Princes and dignitaries: Belzebub, supreme chief of the empire of hell, founder of the order of the Fly. Satan, prince dethroned and chief of the opposition party. Eurynome,[23] prince of death, Grand Cross of the order of the Fly. Moloch, prince of the country of tears, Grand Cross of the order. Pluton, Prince of Fire, also Grand Cross of the order and governor of the regions in flames. Pan, prince of incubi and Lilith, princess of succubi. Leonard, the great lord of the Sabbath, Knight of the Fly. Balberith, great pontiff, lord of alliances. Proserpina, archdiablesse, princess of evil spirits.
      "2": "Belial",
      "3": "Lucifer",
      "4": "Leviathan",
    },

    psychiatry: {
      "1": "manic bipolar, ADDD = depressed attention-seeking, obsessive?",
      "2": "borderline bipolar.",
      "3": "hysteric, affective, ADHD = active attention-seeking.",
      "4": "schizoid",
    },

    racesByLinnee: {
      "1": "Americanus. red choleric honest",
      "2": "Asiaticus. yellow melancholic tense stiff",
      "3": "Europaeus. white sanguinic muscular",
      "4": "Afer. black phlegmatic slacky relaxed",
    },

    // TODO verify Hippocrates, Galen, Kant: CMSP or SMCP
    humorsByGalenCMSP: {
      "1": "Choleric",
      "2": "Melancholic",
      "3": "Sanguinic",
      "4": "Phlegmatic",
    },

    humorsByHippocratesAndKantSMCP: {
      "1": "Sanguinic",
      "2": "Melancholic",
      "3": "Choleric",
      "4": "Phlegmatic",
    },

    characterStylesByErnstKretschmer: {
      "1": "cyclothymic-athletic 1",
      "2": "cyclothymic-athletic 2",
      "3": "schizothymic Hyperesthetic",
      "4": "schizothymic Anesthetic",
    },

    EduardSprangerAndValueAttitudes: {
      "1": "artist",
      "2": "econom",
      "3": "religion",
      "4": "theory",
    },

    mistakenGoalsByAlfredAdler: {
      "1": "retaliation",
      "2": "service",
      "3": "recognition",
      "4": "power",
    },

    worldViewsByErichAdickes: {
      "1": "innovative",
      "2": "traditional",
      "3": "doctrinaire",
      "4": "skeptical",
    },

    characterByPlatoOfAthens: {
      "1": "artistic (iconic)",
      "2": "sensible (pistic)",
      "3": "intuitive (noetic)",
      "4": "reasoning (dianoetic)",
    },

    livingCreaturesByEzekielTheProphet: {
      "1": "lion (bold)",
      "2": "ox (sturdy)",
      "3": "man (spiritual)",
      "4": "eagle (far-seeing)",
    },

    PersonalityStyleByTonyAlessandra: {
      "1": "Director",
      "2": "Thinker",
      "3": "Socializer",
      "4": "Relater",
    },

    // aka Thomas-Kilmann, Conflict Modes
    conflictManagementByJayHall: {
      "1": "Compete, control-win/lose",
      "2": "Avoid, leave-lose/lose",
      "3": "Collaborate, synergy-win/win",
      "4": "Accommodate, yield-lose/win",
    },

    interactionStylesByLindaVBerens: {
      "1": "In Charge",
      "2": "Chart the Course",
      "3": "Get Things Going",
      "4": "Behind the Scenes",
    },

    // == eigen colors
    personalityProfileByHartman: {
      "1": "Red",
      "2": "Green",
      "3": "Yellow",
      "4": "Blue",
    },

    brainDominanceByHerrmann: {
      "1": "Imaginative",
      "2": "Analytical",
      "3": "Interpersonal",
      "4": "Sequential",
    },

    managerialGridByBlakeMouton: {
      "1": "Produce or Perish",
      "2": "Impoverished", // poor, victim
      "3": "Team Type",
      "4": "Country Club",
    },

    socialStyleByDavidMerrill: {
      "1": "Driving",
      "2": "Analytical",
      "3": "Expressive",
      "4": "Amiable",
    },

    orientationToLifeByStuartAtkinsLIFO: {
      "1": "Controlling-Taking",
      "2": "Conserving-Holding",
      "3": "Adapting-Dealing",
      "4": "Supporting-Giving",
    },

    /*
    : {
      "1": "",
      "2": "",
      "3": "",
      "4": "",
    },

    : {
      "1": "",
      "2": "",
      "3": "",
      "4": "",
    },
    */

    sourceOfHappinessByAristotelesOfStagira: {
      "1": "sensual (hedone)",
      "2": "material (propraietari)",
      "3": "ethical (ethikos)",
      "4": "logical (dialogike)",
    },

    temperamentByIrenaeusOfSmyrna: {
      "1": "spontaneous",
      "2": "historical",
      "3": "spiritual",
      "4": "scholarly",
    },

    totemSpiritsByParacelsusOfHohenheim: {
      "1": "changeable salamanders",
      "2": "industrious gnomes",
      "3": "inspired nymphs",
      "4": "curious sylphs",
    },

    bigFive: {
      "E": "extravert, open for experience",
      "I": "conscientious, agreeable",
      "N": "neurotic",
      "P": "anti-neurotic",
    },

    // 
    nexusLearningStylesByGordonBull: {
      "1": "Gamma",
      "2": "Beta",
      "3": "Delta",
      "4": "Alpha",
    },

    // TODO learning styles
    alfredAdler: {
      "1": "Ruling or Dominant",
      "2": "Avoiding",
      "3": "Socially Useful",
      "4": "Getting or Leaning",
    },

    discByWilliamMarston: {
      "1": "Dominance",
      "2": "Conscientiousness",
      "3": "Influence",
      "4": "Steadiness",
    },

    erichFromm: {
      "1": "Exploitative",
      "2": "Hoarding",
      "3": "Marketing", // market screamer, montebank
      "4": "Receptive",
    },

    cpi260: {
      "1": "Leader",
      "2": "Visualizer",
      "3": "Innovator",
      "4": "Supporter",
    },

    interactionStylesByLindaBerens: {
      "1": "Improviser",
      "2": "Stabilizer",
      "3": "Catalyst",
      "4": "Theorist",
    },

    loveStylesByHelenFisher: {
      "1": "Director", // Directors are dominant in testosterone.
      "2": "Negotiator", // And negotiators are dominant in estrogen.
      "3": "Explorer", // Explorers are dominant in dopamine.
      "4": "Builder", // Builders are dominant in serotonin.
    },

    christianDemonology: {
      "1": "son of god, adversary demon", // In the period immediately preceding the composition of the New Testament, some sects of Judaism, as well as many Christian Church Fathers, identified the "sons of God" of Genesis 6:1–4 as fallen angels.
      "2": "mother, god-mother, goddess",
      "3": "guardian angel",
      "4": "father, god-father",
    },

  },

  de: {
    asmg: {
      "A": "Sohn",
      "B": "Mutter",
      "C": "Tochter",
      "D": "Vater",

      "1": "Feuer", //  = Sohn innen
      "2": "Erde", //  = Mutter innen
      "3": "Luft", //  = Tochter innen
      "4": "Wasser", //  = Vater innen

      "M": "Mann",
      "F": "Frau",
      "S": "Jung",
      "L": "Alt",

      "P": "Psychotiker", //  = Mann innen
      "N": "Neurotiker", //  = Frau innen
      "E": "Extravert", //  = Jung innen
      "I": "Introvert", //  = Alt innen
    },
    mbti: {
      "N": "Ntuition", //  = Extravertierte Sensorik = Jung innen
      "S": "Spüren", //  = Introvertierte Sensorik = Alt innen
      "E": "Extravert", //  = Neurotische Motorik = Frau innen
      "I": "Introvert", //  = Psychotische Motorik = Mann innen

      "P": "Empfinden", //  = Extravertierte Sensorik = Jung innen
      "J": "Urteilen", //  = Introvertierte Sensorik = Alt innen
      "F": "Fühlen", //  = Neurotische Motorik = Frau innen
      "T": "Denken", //  = Psychotische Motorik = Mann innen
    },
    pol: {
      "1": "Kommunist", //  = son inside
      "2": "Kapitalist", //  = mother inside
      "3": "Sozialist", //  = daughter inside
      "4": "Faschist", //  = father inside
    },
    body: {
      "M": "Mann",
      "F": "Frau",
      "S": "Kind",
      "L": "Elter",

      "P": "männlich",
      "N": "weiblich",
      "E": "kindisch",
      "I": "altklug",
    },
  },

  nl: {
    asmg: {
      "A": "zoon",
      "B": "moeder",
      "C": "dochter",
      "D": "vader",
      "1": "Vuur", //  = zoon 'inside'
      "2": "Aarde", //  = moeder 'inside'
      "3": "Wind", //  = dochter 'inside'
      "4": "Water", //  = vader 'inside'
    },
  },

  el: {
    asmg: {
      "A": "γιος",
      "B": "μητέρα",
      "C": "κόρη",
      "D": "πατέρα",
      "1": "Φωτιά", //  = γιος 'inside'
      "2": "Γη", //  = μητέρα 'inside'
      "3": "Αέρας", //  = κόρη 'inside'
      "4": "Νερό", //  = πατέρα 'inside'
    },
  },

  el_r: {
    asmg: {
      "A": "gios",
      "B": "miteera",
      "C": "koori",
      "D": "pateera",
      "1": "Fotiaa", //  = gios 'inside'
      "2": "Ye", //  = miteera 'inside'
      "3": "Aeeras", //  = koori 'inside'
      "4": "Neroo", //  = pateera 'inside'
    },
  },

  da: {
    asmg: {
      "A": "søn",
      "B": "mor",
      "C": "datter",
      "D": "far",
      "1": "Ild", //  = søn 'inside'
      "2": "Jord", //  = mor 'inside'
      "3": "Luft", //  = datter 'inside'
      "4": "Vand", //  = far 'inside'
    },
  },

  ru: {
    asmg: {
      "A": "сын",
      "B": "мать",
      "C": "дочь",
      "D": "отец",
      "1": "Огонь", //  = сын 'inside'
      "2": "Земля", //  = мать 'inside'
      "3": "Воздух", //  = дочь 'inside'
      "4": "Вода", //  = отец 'inside'
    },
  },

  ru_r: {
    asmg: {
      "A": "syn",
      "B": "mat'",
      "C": "doch'",
      "D": "otets",
      "1": "Ogonn", //  = syn 'inside'
      "2": "Zemlja", //  = mat' 'inside'
      "3": "Vozdukh", //  = doch' 'inside'
      "4": "Voda", //  = otets 'inside'
    },
  },

  cz: {
    asmg: {
      "A": "syn",
      "B": "matka",
      "C": "dcera",
      "D": "otec",
      "1": "Oheň", //  = syn 'inside'
      "2": "Země", //  = matka 'inside'
      "3": "Vzduch", //  = dcera 'inside'
      "4": "Voda", //  = otec 'inside'
    },
  },

  tr: {
    asmg: {
      "A": "oğlu",
      "B": "anne",
      "C": "kızı",
      "D": "baba",
      "1": "Ateş", //  = oğlu 'inside'
      "2": "Toprak", //  = anne 'inside'
      "3": "Hava", //  = kızı 'inside'
      "4": "Su", //  = baba 'inside'
    },
  },

  ar: {
    asmg: {
      "A": "որդի",
      "B": "մայր",
      "C": "դուստր",
      "D": "հայր",
      "1": "حريق", //  = որդի 'inside'
      "2": "أرض", //  = մայր 'inside'
      "3": "هواء", //  = դուստր 'inside'
      "4": "ماء", //  = հայր 'inside'
    },
  },

  ar_r: {
    asmg: {
      "A": "vordi",
      "B": "mayr",
      "C": "dustr",
      "D": "hayr",
      "1": "hariq", //  = vordi 'inside'
      "2": "'ard", //  = mayr 'inside'
      "3": "hawa'", //  = dustr 'inside'
      "4": "ma'an", //  = hayr 'inside'
    },
  },

  cn: {
    asmg: {
      "A": "儿子",
      "B": "母亲",
      "C": "女儿",
      "D": "父亲",
      "1": "火", //  = 儿子 'inside'
      "2": "土", //  = 母亲 'inside'
      "3": "金", //  = 女儿 'inside'
      "4": "水", //  = 父亲 'inside'
    },
  },

  cn_r: {
    asmg: {
      "A": "érzi",
      "B": "mǔqīn",
      "C": "nǚ'ér",
      "D": "Fùqīn",
      "1": "huǒ", //  = érzi 'inside'
      "2": "tǔ", //  = mǔqīn 'inside'
      "3": "jīn", //  = nǚ'ér 'inside'
      "4": "shuǐ", //  = Fùqīn 'inside'
    },
  },

  // three ayurveda doshas + Prithivi as earth
  ayur: {
    asmg: {
      "1": "Pitta",
      "2": "Prithivi",
      "3": "Kapha",
      "4": "Vata",
    },
  },

  hi: {
    asmg: {
      "A": "बेटा",
      "B": "मां",
      "C": "बेटी",
      "D": "पिता",
      "1": "आग", //  = बेटा 'inside'
      "2": "पृथ्वी", //  = मां 'inside'
      "3": "वायु", //  = बेटी 'inside'
      "4": "पानी", //  = पिता 'inside'
    },
  },

  hi_r: {
    asmg: {
      "A": "beta",
      "B": "maan",
      "C": "betee",
      "D": "pita",
      "1": "aag", //  = beta 'inside'
      "2": "prthvee", //  = maan 'inside'
      "3": "vaayu", //  = betee 'inside'
      "4": "paanee", //  = pita 'inside'
    },
  },

}



// get translation for key
// or fallback to english name
function localName(key, fallback=false) {
  // global: locale
  let ka = Array.isArray(key) ? key : key.split('.')
  
  let parent = nameByLocaleData
  const loc = fallback ? 'en' : locale
  for (let key of [loc, ...ka.slice(0,-1)]) {
    parent = parent[key]
    if (!parent) {
      break
    }
  }

  const lastKey = ka.slice(-1)[0]

  if (!parent || !(lastKey in parent)) {
    console.log(`FIXME add translation for ${locale}.${key}`)
    if (fallback) {
      console.log(`ERROR missing fallback translation for ${key}`)
      return ''
    }
    return localName(key, true)
  }

  const res = parent[ka.slice(-1)[0]]
  //console.log(`localName(${key}) = ${res}`)

  return parent[ka.slice(-1)[0]]
}



// usage of result:
// pathosFromSM[sm_body][sm_pathos]
export function tablePathosFromSM (nameFormat) {

  // sm 0 1 2 3 = elm 3 1 2 4

  if (nameFormat === 'mbti') {
    // MBTI "pathos" is independent of "body"
    // so we have four identic arrays
    return Array(4).fill(
      // 3    1     2     4   : element of pathos
      ['FP', 'TP', 'FJ', 'TJ'].map(
        s => [[s, s.split('').map(s => localName(['mbti', s])).join(' ')]]
      )
    )
  }

  if (nameFormat === 'cg-jung') {
    // MBTI "pathos" is independent of "body"
    // so we have four identic arrays
    return Array(4).fill(
    //  3    1    2    4   : element of pathos
      ['e', 'i', 'e', 'i'].map(
        s => [[s, s.split('').map(s => localName(['mbti', s.toUpperCase()])).join(' ')]]
      )
    )
  }

  // pathos in zodiac terms is more complex
  // cos the "base element" is included in the pathos type
  // base elements = mutable signs = no pathos is played
  // pathos types = cardinal signs + fixed signs
  if (nameFormat === 'zodiac') {
    return Array.from(Array(4).keys()).map(
      (sm) => (
        Array.from(Array(4).keys()).map(
          (p_sm) => {

            if (p_sm == sm) {
              // "false pathos"
              // where the pathos has "same element"
              // as the body
              // this is the "mbti way"
              // to say "no pathos"
              // in zodiac: "mutable modality"
              return [zodiacMutableFromSM[sm]]
            }

            // sm 0 1 2 3 = elm 3 1 2 4
            if (p_sm == 0 || p_sm == 2) {
              // neurotic move pathos
              return [zodiacCardinalFromSM[sm]]
            }

            // psychotic move pathos
            return [zodiacFixedFromSM[sm]]

            // quick + dirty
            // also define "false pathos"
            // when p_sm is the opposite element
            // == diff sense and diff move
            // this "false pathos"
            // is used in MBTI
            // as a "test quality" control parameter
            // cos, for example, "fire plays earth" is not possible
            // and indicates a misunderstood test / questionnaire

        })
    ))
  }

  //const p_pos = nameFormat.indexOf('p')
  const x_pos = nameFormat.indexOf('x');
  const p_pos = nameFormat.substring(0, (
    x_pos === -1 ? nameFormat.length : x_pos
    )).indexOf('p')

  if (p_pos == -1) {
    // fallback: no pathosFormat was found in nameFormat
    return false
  }

  const pathosFormat = (
    (p_pos == nameFormat.length-1) ? (
      // "p" is suffix of pathosFormat
      nameFormat.substring(0, p_pos)
    ) : (
      // "p" is prefix of pathosFormat
      nameFormat.substring(p_pos + 1)
    )
  ).replace(/[ag]/g, '') // remove age + gender
  // pathos always has "same age" and "same gender"

  if (pathosFormat === '') {
    // fallback: pathosFormat is empty
    return false
  }

  console.log('pathosFormat = '+pathosFormat)

  const nameFromN = tableNameFromN(pathosFormat)

  if (nameFromN) {
    // repeat array four times
    // here, pathos is independent of the base element
    return Array(4).fill([
      nameFromN[0b0000],
      nameFromN[0b0010],
      nameFromN[0b0100],
      nameFromN[0b0110],
    ])
  } else {
    return false
  }
}

// helper function
// repeat array values
const makeRepeated = (arr, repeats) =>
  [].concat(...Array.from({ length: repeats }, () => arr));

// generate translation table
// name format is "additive" by default
// implicit concat
//   GMSA --> G+M+S+A
// explicit multiply
//   GxMSxA --> (GxM)+(SxA)

const nameFormatSpecialChars = [
  'x',
  'X',
  '/',
  '|',
  ',',
  '.',
  '-',
  '(', ')', // group components to "compound string", like (GEA) = M1S, F3L, etc.
]



export function tableNameFromN (nameFormat) {

  // TODO replace if-branches with lookup-object (faster)

  // TODO move special cases to separate function

  // MBTI special case
  // https://www.reddit.com/r/mbti/comments/ds3r3o/decoding_mbti_four_elements_alchemy_physiognomy/
  // myers briggs vs. gender move sense age
  // mbti Introvert = mbti Thinking   = Psychotic move  = fire  + water
  // mbti Extravert = mbti Feeling    = Neurotic  move  = earth + air
  // mbti Ntuiting  = mbti Perceiving = Extravert sense = fire  + air
  // mbti Sensing   = mbti Judging    = Introvert sense = earth + water
  // so, mbti describes only INNER values == move + sense + pathos
  // so, THIS is a WRONG translation to MBTI:
  // move + sense:   PE = IN   NI = ES   NE = EN   PI = IS
  // gender + age:   MS = TP   FL = FJ   FS = FP   ML = TJ
  // cos MBTI does NOT desribe gender or age
  if (nameFormat === 'mbti') {
    /*
    return [                          // GMSA =
      'ENFP', 'ENTP', 'INFP', 'INTP', // FNES, MNES, FPES, MPES,
      'ESFP', 'ESTP', 'ISFP', 'ISTP', // FNIS, MNIS, FPIS, MPIS,
      'ENFJ', 'ENTJ', 'INFJ', 'INTJ', // FNEL, MNEL, FPEL, MPEL,
      'ESFJ', 'ESTJ', 'ISFJ', 'ISTJ', // FNIL, MNIL, FPIL, MPIL
    ]
    */

    // letters 1+2 = element = inner values = sense + move
    return [                  // GMSA =
      'EN', 'EN', 'IN', 'IN', // FNES, MNES, FPES, MPES,
      'ES', 'ES', 'IS', 'IS', // FNIS, MNIS, FPIS, MPIS,
      'EN', 'EN', 'IN', 'IN', // FNEL, MNEL, FPEL, MPEL,
      'ES', 'ES', 'IS', 'IS', // FNIL, MNIL, FPIL, MPIL
    ].map(
      s => [[s, s.split('').map(s => localName(['mbti', s])).join(' ')]]
    )
  }

  // Robert Moore, Douglas Gillette: King, Warrior, Magician, Lover
  // via Elliott Hulse, The-Four-Layers-of-Strength.pdf
  // 1234 = warrior lover magician king
  if (nameFormat == 'moore-gillette') {
    return [                  // GMSA =
      'C3', 'A3', 'C1', 'A1', // FNES, MNES, FPES, MPES,
      'C2', 'A2', 'C4', 'A4', // FNIS, MNIS, FPIS, MPIS,
      'B3', 'D3', 'B1', 'D1', // FNEL, MNEL, FPEL, MPEL,
      'B2', 'D2', 'B4', 'D4', // FNIL, MNIL, FPIL, MPIL
    ].map(
      s => [
        [s[1], localName(['moore_gillette', s[1]])],
        [s[0], localName(['moore_gillette', s[0]])],
      ]
    );
  }

  if (nameFormat === 'a/s/m/gxbody') {
    return tableNameFromN('[ab]/[sb]/[mb]/[gb]')
    //return false // TODO implement
  }

  // zodiac special case
  if (nameFormat == 'zodiac') {
    
    return Array.from(Array(16).keys()).map(
      (asmg) => (
        [
          zodiacMutableFromSM[
            (asmg & 0b0110) >> 1
          ]
        ]
    ))
  }

  // CG Jung special case
  if (nameFormat === 'cg-jung') {
    return makeRepeated(
      [
        'F', 'F', 'N', 'N',
        'S', 'S', 'T', 'T',
      ].map(
        s => [[s, s.split('').map(s => localName(['mbti', s])).join(' ')]]
      ),
      2 // repeat twice
    )
  }

  // South Park special case
  if (nameFormat === 'south-park') {
    // letters 1+2 = element = inner values = sense + move
    return [
      /* FNES */ ['bebe|henrietta|heidi|tammy|honey', 'Bebe Stevens|Henrietta Biggle|Heidi Turner|Tammy Warner|Honey Boo Boo'],
      /* MNES */ ['cartman|tweek', 'Eric Theodore Cartman|Tweek Tweak'],
      /* FPES */ ['wendy|leslie|lizzy', 'Wendy Testaburger|Leslie Meyers?|Lizzy'],
      /* MPES */ ['kenny|jimmy', 'Kenneth "Mysterion" McCormick|Jimmy Valmer'],

      /* FNIS */ ['isla|esther', 'Isla?|Esther?'],
      /* MNIS */ ['stan|butters', 'Stanley Randolph Marsh|Leopold "Butters" Stotch'],
      /* FPIS */ ['red|sally', 'Red Girl|Sally'],
      /* MPIS */ ['kyle', 'Kyle Broflovski'],

      /* FNEL */ ['sheila|liane', 'Sheila "S-Wow Tittybang" Broflovski|Liane Cartman'],
      /* MNEL */ ['chef|garrison', 'Jerome "Chef" McElroy|Herbert Garrison'],
      /* FPEL */ ['carol', 'Carol McCormick?'],
      /* MPEL */ ['stuart', 'Stuart McCormick'],

      /* FNIL */ ['sharon', 'Sharon Marsh'],
      /* MNIL */ ['pc-principal|towelie|slave', 'PC Principal|Towelie?|Mr. Slave'],
      /* FPIL */ ['mayor', 'Mayor McDaniels'],
      /* MPIL */ ['randy|gerald|mackey', 'Randall "Randy" Marsh|Gerald Broflovski|Mr. Mackey'],
    ]
  }

  // Simpsons special case
  if (nameFormat === 'simpsons') {
    // letters 1+2 = element = inner values = sense + move
    return [
      /* FNES */ ['EN', ''],
      /* MNES */ ['bart', ''],
      /* FPES */ ['IN', ''],
      /* MPES */ ['MPES', ''],

      /* FNIS */ ['ES', ''],
      /* MNIS */ ['MNIS', ''],
      /* FPIS */ ['lisa', ''],
      /* MPIS */ ['MPIS', ''],

      /* FNEL */ ['patty|selma', 'Patty Bouvier|Selma Bouvier'],
      /* MNEL */ ['snake', 'Chester "Snake" Turley?'],
      /* FPEL */ ['marge', ''],
      /* MPEL */ ['skinner|krusty', 'Seymour Skinner|Krusty the Clown?'],

      /* FNIL */ ['ES', ''],
      /* MNIL */ ['homer', ''],
      /* FPIL */ ['sideshow-bob', 'Robert Underdunk Terwilliger Jr., PhD'],
      /* MPIL */ ['burns', 'Burns|The Blue-Haired Lawyer'],
    ]
  }

  // Futurama special case
  if (nameFormat === 'futurama') {
    // letters 1+2 = element = inner values = sense + move
    return [
      /* FNES */ ['EN', ''],
      /* MNES */ ['MNES', ''],
      /* FPES */ ['IN', ''],
      /* MPES */ ['nibbler', 'Lord Nibbler?'],

      /* FNIS */ ['ES', ''],
      /* MNIS */ ['MNIS', ''],
      /* FPIS */ ['IS', ''],
      /* MPIS */ ['MPIS', ''],

      /* FNEL */ ['amy', 'Amy Wong'],
      /* MNEL */ ['fry|zapp', 'Philip J. Fry|Zapp Brannigan'],
      /* FPEL */ ['leela', 'Turanga Leela'],
      /* MPEL */ ['bender|scruffy', 'Bender Bending Rodriguez|Scruffy'],

      /* FNIL */ ['ES', ''],
      /* MNIL */ ['ES', ''],
      /* FPIL */ ['mom', 'Carol "Mom"'],
      /* MPIL */ ['professor|kif', 'Professor Hubert J. Farnsworth|Kif Kroker'],
    ]
  }

  // American Dad special case
  if (nameFormat === 'american-dad') {
    // letters 1+2 = element = inner values = sense + move
    return [
      /* FNES */ ['EN', ''],
      /* MNES */ ['MNES', ''],
      /* FPES */ ['IN', ''],
      /* MPES */ ['steve', ''],

      /* FNIS */ ['ES', ''],
      /* MNIS */ ['MNIS', ''],
      /* FPIS */ ['hayley', ''],
      /* MPIS */ ['MPIS', ''],

      /* FNEL */ ['francine', ''],
      /* MNEL */ ['roger', ''],
      /* FPEL */ ['FPEL', ''],
      /* MPEL */ ['klaus?', ''],

      /* FNIL */ ['ES', ''],
      /* MNIL */ ['stan', ''],
      /* FPIL */ ['IS', ''],
      /* MPIL */ ['MPIL', ''],
    ]
  }

  // Family Guy special case
  if (nameFormat === 'family-guy') {
    // letters 1+2 = element = inner values = sense + move
    return [
      /* FNES */ ['', ''],
      /* MNES */ ['', ''],
      /* FPES */ ['', ''],
      /* MPES */ ['', ''],

      /* FNIS */ ['', ''],
      /* MNIS */ ['', ''],
      /* FPIS */ ['', ''],
      /* MPIS */ ['', ''],

      /* FNEL */ ['', ''],
      /* MNEL */ ['peter', 'Peter Griffin'],
      /* FPEL */ ['', ''],
      /* MPEL */ ['', ''],

      /* FNIL */ ['', ''],
      /* MNIL */ ['', ''],
      /* FPIL */ ['lois', 'Lois Griffin'],
      /* MPIL */ ['', ''],
    ]
  }





  // TODO special case
  if (nameFormat === 'TODO') {
    // letters 1+2 = element = inner values = sense + move
    return [
      /* FNES */ ['', ''],
      /* MNES */ ['', ''],
      /* FPES */ ['', ''],
      /* MPES */ ['', ''],

      /* FNIS */ ['', ''],
      /* MNIS */ ['', ''],
      /* FPIS */ ['', ''],
      /* MPIS */ ['', ''],

      /* FNEL */ ['', ''],
      /* MNEL */ ['', ''],
      /* FPEL */ ['', ''],
      /* MPEL */ ['', ''],

      /* FNIL */ ['', ''],
      /* MNIL */ ['', ''],
      /* FPIL */ ['', ''],
      /* MPIL */ ['', ''],
    ]
  }



  let la = nameFormat.split('') // letter array
  let pa = []
  let braceRoundLevel = 0
  let braceSquareLevel = 0
  let braceRoundStr = ''
  let braceSquareStr = ''

  // test format string
  for (let li = 0; li < la.length; li++) {
    const val = la[li]
    //if (val == 'x' || val == '-') {

    if (val === 'x') {
      // end of format string
      break;
    }

    if (val === '(') {
      braceRoundLevel += 1
      continue
    }
    else if (val === ')') {
      braceRoundLevel -= 1
    }
    else if (val === '[') {
      braceSquareLevel += 1
      continue
    }
    else if (val === ']') {
      braceSquareLevel -= 1
    }
    else if (nameFormatSpecialChars.includes(val)) {
      // TODO why 'x' ?
      // '-' is separator for nameParts
      continue
    }
    if (val === 'p' && braceRoundLevel === 0 && braceSquareLevel === 0) { // marker for pathosFormat
      la = la.slice(0, li)
      console.log('reduced nameFormat to '+la.join(''))
      break
    }
    //if (!(val in idxFromDim)){ // 'E' would fail
    if (val !== ')' && val !== ']' && braceSquareLevel === 0 && undefined === letterFromASMG(val, ['0','0','0','0'])) {
      console.log('bad letter '+val)
      return undefined
    }
    if (braceRoundLevel > 0) {
      braceRoundStr += val
    }
    else if (braceSquareLevel > 0) {
      braceSquareStr += val
    }
    else if (braceRoundStr !== '') {
      pa.push(braceRoundStr)
      braceRoundStr = ''
    }
    else if (braceSquareStr !== '') {
      pa.push({braceSquareStr})
      braceSquareStr = ''
    }
    else {
      pa.push(val)
    }
  }

  if (braceRoundLevel !== 0 || braceSquareLevel !== 0) {
    // brace not closed
    return false
  }

  /*
  //let pa = la.join('').split('-') // nameParts array
  let pa = la.join('').split(/[-/|,.]/) // nameParts array
  while (pa.slice(-1)[0] === '') {
    pa = pa.slice(0, -1) // remove last empty part
  }
  console.log(`pa = ${pa}   pa.length ${pa.length}`)
  */

  return Array.from(Array(16).keys()).map(
    num => {
      return (
        //pa.map(p => p.split('')).map(
        pa.map(p => {
          
          //if ('braceSquareStr' in p) {
          if ((typeof p) === 'object') {
            // TODO handle [special_format]
            return specialShortLong(p.braceSquareStr, num);
          }

          //if ((typeof p) === 'string') {
          else {
            return asmgShortLong(p, num);
          }
  }))})

  /*.map(pa => pa.map(
    s => [s, s.split('').map(
      s => localName(['asmg', s])).join(' ')]
  ))
  */
}



if(Array.prototype.contains) {
  console.warn("Overriding existing Array.prototype.contains. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
}

/*
Array.prototype.contains = needle => (
  this.indexOf(needle) !== -1
);
*/
Array.prototype.contains = function(needle) {
  return this.indexOf(needle) !== -1
};



function specialShortLong(partFormat, num) {

  // element as political attitude
  if (partFormat === 'pol') {
    const [short, long] = asmgShortLong('e', num);
    return [short, localName(['pol', short])]
  }

  // asmg in terms of body
  if (['ab', 'sb', 'mb', 'gb'].contains(partFormat)) {
    const [short, long] = asmgShortLong(partFormat[0], num);
    return [short, localName(['body', short])]
  }
}



function asmgShortLong(partFormat, num) {
  const asmg = num.toString(2).padStart(4, 0).split('')
  return [partFormat.split('').reduce((acc, val, idx, arr) => {
    // look ahead
    if (arr[idx+1] == 'x' || val == 'x') {
      // we are inside a multiply list
      return acc
    }
    // look behind + ahead
    if (arr[idx-1] == 'x' && arr[idx+1] != 'x') {
      // last value of multiply list
      let res = getDimBit(asmg, val) // dim=val

      for (let i = idx-1; -1 < i; i--) {
        if (arr[i] == 'x') {
          i--
          // "multiply" = binary XOR operation
          res = res ^ getDimBit(asmg, arr[i])
        }
        else {
          break
        }
      }

      return acc + res // concat

    }
    return acc + letterFromASMG(val, asmg)
  }, '')].map(
    s => [
      // short name:
      s,
      // long name:
      s.split('').map(
        s => localName(['asmg', s])
      ).join(' ')
    ]
  )[0]
}



function isDict(v) {
  return (typeof v)==='object' && v!==null && !(v instanceof Array) && !(v instanceof Date);
}



let locale = 'de'
export const localePresets = ['en', 'de']
export function setLocale(l){
  locale = l
}



function translate (obj) {
  if (isDict(obj)) {
    if (locale in obj) {
      return obj[locale]
    }
    return obj['en']
  }
  return obj
}



// generate translation table
// group format is multiplicative by default
// = sum of products
// GMSA --> GxMxSxA
// GM+SA --> (GxM)+(SxA)

export const tableGroupFromN = function(groupFormat) {
  if (groupFormat == 'E' || groupFormat == 'e') {
    // quickfix
    groupFormat = 'S+M'
  }
  const la = groupFormat.split('') // letter array
  // test format string
  for (let li = 0; li < la.length; li++) {
    const val = la[li]
    if (val == 'x') {
      // end of format string
      break
    }

    if (val == '+') {
      // group name concat operator
      continue
    }

    if (!(val in idxFromDim)){ // 'E' would fail
    //if (undefined === letterFromASMG(val, ['0','0','0','0'])) {
      console.log('bad letter '+val)
      return undefined
    }
  }

  const tmp = [...Array(16).keys()]
  .map(function (num) {
      const asmg = num.toString(2).padStart(4, 0).split('')

      return parseInt(groupFormat.split('+')
      .reduce(function(acc, val){
        // TODO use bitmask? for ASMG format letters, but for letter E?
        // sample val = 'GMA'
        const la = val.split('') // letter array

        // concat to bitstring
        return acc + la.reduce(function(acc2, val2){

          if (acc2 === undefined) {
            // first bit
            return asmg[idxFromDim[val2]]
          }

          // ^ = binary XOR function
          return acc2 ^ asmg[idxFromDim[val2]]

        }, undefined)
        /*
        return acc + la.reduce(function(a2, v2){
          return acc + asmg[idxFromDim[v2]]
        }, '')
        */
      }, ''),
      2) // parseInt from bitstring

      /*
      return la.reduce(function(acc, val){
        return acc + letterFromASMG(val, asmg)
      }, '')
      */
  })



  // unique values
  // map from value to index
  const idxFromVal = tmp.filter(function(val, idx, self){
    return self.indexOf(val) === idx
  }).reduce(function(acc, val, idx){

    // TODO

    acc[val] = idx

    // 65 = 'A'.charCodeAt(0)
    //acc[val] = String.fromCharCode(65 + idx)

    return acc
  }, {})

  //console.log('idxFromVal = '+idxFromVal)
  //console.log('idxFromVal.length = '+idxFromVal.length)

/* old version
  return [
    tmp.map(function(val){
      return idxFromVal[val]
    }),
    Object.values(idxFromVal).length
    //idxFromVal.length
  ]
*/

  return tmp.map(function(val){
      return idxFromVal[val]
    }).concat(
      Object.values(idxFromVal).length)
}

// swap: keys <--> values
export const invertTable = function(table) {
  return table.reduce(function(acc, cur, idx) {
      acc[cur] = idx
      return acc
  }, {})
}

// modulo function, also for negative numbers
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n
}




// TODO remove. old code for pixi.js / phaser.js
export const ac_render = function (target, data) {
  let {origin, flipH, flipV, wake} = data

    let matrix = ac_xor(origin, ac_bits_asmg_11)

    // transform
    if (flipH) { matrix = flip_h(matrix) }
    if (flipV) { matrix = flip_v(matrix) }
    if (!wake) { matrix = move_d(matrix) }

    // repeat the "matrix" array
    // N=4 --> 4*16 = 64 points
    // N=5 --> 5*16 = 80 points
    // N=6 --> 5*16 = 96 points
    // ....
    // TODO make control-able
    const N_repeat = app.data.repeat


    app.data.contain.levelParent.position.x =
    app.data.contain.levelParent.position.y =
    app.data.contain.levelParent.pivot.x =
    app.data.contain.levelParent.pivot.y = 50*(N_repeat*4 - 1)
    // 150 for N=1. 150 = 300/2 = (4-1)*100/2

    app.data.contain.groups.position.x =
    app.data.contain.groups.position.y =
    app.data.contain.groups.pivot.x =
    app.data.contain.groups.pivot.y = 50*(N_repeat*4 - 1)

  //app.data.contain.rotate.pivot.set(150, 150)
    app.data.contain.rotate.position.x =
    app.data.contain.rotate.position.y =
    app.data.contain.rotate.pivot.x =
    app.data.contain.rotate.pivot.y = 50*(N_repeat*4 - 1)
    // 150 for N=1. 150 = 300/2 = (4-1)*100/2

    /* TODO fix "lines" position, aka "key of seven"
    app.data.contain.lines.position.x =
    app.data.contain.lines.position.y =
    app.data.contain.lines.pivot.x =
    app.data.contain.lines.pivot.y = 50*(N_repeat*4 - 1)
    */

   //const N_repeat_2 = Math.pow(N_repeat, 2);
    // multiply is faster than divide --> precompute
    //const idx_factor = (1 / (N_repeat_2*8)); // works for N_repeat=2
    const idx_factor = (1 / (N_repeat*16));

    [...Array(N_repeat * N_repeat)]
    .reduce(function(acc){
    return acc.concat(matrix)
  }, [])
    //matrix.map(function (num, idx) {
    .map(function (num, idx) {

      /*
      // right
      const x0 = -400*Math.floor(idx / 32)
      const y0 = -800*Math.floor(idx / 32)

      // down
      const y0 = -400*Math.floor(idx / 16)
      const x0 = -400*Math.floor((idx % 32) / 16)
             -400*Math.floor(idx / 32)
      */

      // up
      //const tmp = Math.floor(idx / 32)
      const tmp = Math.floor(idx * idx_factor)
      const x0 = +400*tmp
      const y0 = -400*tmp*N_repeat //-800*Math.floor(idx / 4)

      //console.log(num+'   g: '+app.data.groupFromN[num])

        let x = x0 + 100*(idx % 4)
        let y = y0 + 100*Math.floor(idx / 4)

        if (app.data.groupFromN) {
          // background rectangle
          const groupIdx = app.data.groupFromN[num]

          // TODO in one command?
          var rect = new PIXI.Sprite(PIXI.Texture.WHITE)
      rect.tint = data.groupColor[groupIdx]
      rect.width = 100
      rect.height = 100
      app.data.contain.groups.addChild(rect)
      //rect.pivot.set(0.5)
      rect.pivot.set(5)
      rect.position.set(x, y)
    }

        let text = addBitmapText(
          target,

          // TODO revoke
          app.data.nameFromN[num],
          //app.data.groupFromN[num].toString(),

          //name_gea[num], // TODO dynamic
          x,
          y,

          0.75 * Math.PI
          //1.75 * Math.PI
        )

    // Opt-in to interactivity
    text.interactive = true;

    // Shows hand cursor
    text.buttonMode = true;

    // pointer = mouse or touch
    text.on('pointerdown', textOnPointerDown);
    text.on('pointerup', textOnPointerUp);
    //text.on('pointerupoutside', textOnPointerUp);

    // Alternatively, use the mouse & touch events:
    // text.on('click', onClick); // mouse-only
    // text.on('tap', onClick); // touch-only

    // TODO add object later?
    //app.stage.addChild(text);

    })
}


