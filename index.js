const codici = require('./ateco.json')

module.exports = {
  desc: function (code) {
    code = this._normCode(code, true)
    const found = codici.find(el => el._id === code)
    return found.desc
  },
  format: function (code, letter) {
    return this._normCode(code, !!letter)
  },
  _normCode: function (code, letter) {
    code = code.toUpperCase()
    code = code.replace(/[A-Z]\./g, '')
    code = code.replace(/\./g, '')

    if (code.match(/\d\d\d/)) {
      code = code.padEnd(6, '0')
    }
    const chunks = this._chunk(code)
    code = chunks.join('.')
    console.log(chunks)
    const fst = code.substr(0, 2)
    if (letter) {
      if (['01', '02', '03'].includes(fst)) {
        code = 'A.' + code
      } else if (['05', '06', '07', '08', '09'].includes(fst)) {
        code = 'B.' + code
      } else if (
        [
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30',
          '31',
          '32',
          '33'
        ].includes(fst)
      ) {
        code = 'C.' + code
      } else if (['35'].includes(fst)) {
        code = 'D.' + code
      } else if (['36', '37', '38', '39'].includes(fst)) {
        code = 'E.' + code
      } else if (['41', '42', '43'].includes(fst)) {
        code = 'F.' + code
      } else if (['45', '46', '47'].includes(fst)) {
        code = 'G.' + code
      } else if (['49', '50', '51', '52', '53'].includes(fst)) {
        code = 'H.' + code
      } else if (['55', '56'].includes(fst)) {
        code = 'I.' + code
      } else if (['58', '59', '60', '61', '62', '63'].includes(fst)) {
        code = 'J.' + code
      } else if (['64', '65', '66'].includes(fst)) {
        code = 'K.' + code
      } else if (['68'].includes(fst)) {
        code = 'L.' + code
      } else if (['69', '70', '71', '72', '73', '74', '75'].includes(fst)) {
        code = 'M.' + code
      } else if (['77', '78', '79', '80', '81', '82'].includes(fst)) {
        code = 'N.' + code
      } else if (['84'].includes(fst)) {
        code = 'O.' + code
      } else if (['85'].includes(fst)) {
        code = 'P.' + code
      } else if (['86', '87', '88'].includes(fst)) {
        code = 'Q.' + code
      } else if (['90', '91', '92', '93'].includes(fst)) {
        code = 'R.' + code
      } else if (['94', '95', '96'].includes(fst)) {
        code = 'S.' + code
      } else if (['97', '98'].includes(fst)) {
        code = 'T.' + code
      } else if (['99'].includes(fst)) {
        code = 'U.' + code
      }
    }
    return code
  },

  _chunk: function (code) {
    code = code.split('')
    const results = []
    while (code.length) {
      results.push(code.splice(0, 2).join(''))
    }
    return results
  },
  tree: function () {

    let menu = []

    const tree = codici.map((code, i) => {
      const chunks = code._id.split('.')
      const root = chunks[0]
      const firstLevel = chunks[1]
      const secondLevel = chunks[2]
      const thirdLevel = chunks[3]
      let key, el, index, rootIndex, subIndex, firstLevelIndex, secondLevelIndex, thirdLevelIndex

      console.log('\nget chunks', root, firstLevel, secondLevel, thirdLevel)

      if (firstLevel === undefined) {
        console.log('------------\nRoot changed to:', code._id)
        menu.push({
          value: root,
          label: code.desc,
          children: []
        })
      } 
      
      if (firstLevel && secondLevel === undefined) {
        key = root + '.' + firstLevel
        el = codici.filter(c => c._id === key)
        index = menu.findIndex(m => m.value === root)
        console.log('First level', el, root)
        menu[index].children.push({ value: el[0]._id, label: el[0].desc, children: [] })
      } 

      if (firstLevel && secondLevel && secondLevel.length === 1) {
        key = root + '.' + firstLevel + '.' + secondLevel
        el = codici.filter(c => c._id === key)
        rootIndex = menu.findIndex(m => m.value === root)
        subIndex = menu[rootIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel)
        menu[rootIndex].children[subIndex].children.push({ value: el[0]._id, label: el[0].desc, children: [] })
        console.log("Second level one char", key, el, rootIndex, subIndex)
      } 

      if (firstLevel && secondLevel && secondLevel.length === 2 && thirdLevel===undefined) {
        key = root + '.' + firstLevel + '.' + secondLevel
        el = codici.filter(c => c._id === key)
        rootIndex = menu.findIndex(m => m.value === root)
        firstLevelIndex = menu[rootIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel)
        secondLevelIndex = menu[rootIndex].children[firstLevelIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel + '.' + secondLevel.substr(0,1))
        menu[rootIndex].children[firstLevelIndex].children[secondLevelIndex].children.push({ value: el[0]._id, label: el[0].desc, children: [] })
        console.log("Second level two chars", key, el, rootIndex, firstLevelIndex, secondLevelIndex)
      } 

      if (thirdLevel) {
        key = root + '.' + firstLevel + '.' + secondLevel + '.' + thirdLevel
        el = codici.filter(c => c._id === key)
        rootIndex = menu.findIndex(m => m.value === root)
        firstLevelIndex = menu[rootIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel)
        secondLevelIndex = menu[rootIndex].children[firstLevelIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel + '.' + secondLevel.substr(0,1))
        thirdLevelIndex = menu[rootIndex].children[firstLevelIndex].children[secondLevelIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel + '.' + secondLevel)
        console.log('Third Level', menu[rootIndex].children[firstLevelIndex], secondLevelIndex, thirdLevelIndex)
        menu[rootIndex].children[firstLevelIndex].children[secondLevelIndex].children[thirdLevelIndex].children.push({ value: el[0]._id, label: el[0].desc })
      } 
    })

    // console.log("menu", JSON.stringify(menu, null, 2))

    return menu
  }
}
