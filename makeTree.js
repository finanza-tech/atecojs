const codici = require('./ateco.json')

const menu = []
codici.forEach((code, i) => {
  const chunks = code._id.split('.')
  const root = chunks[0]
  const firstLevel = chunks[1]
  const secondLevel = chunks[2]
  const thirdLevel = chunks[3]
  let key, el, index, rootIndex, subIndex, firstLevelIndex, secondLevelIndex, thirdLevelIndex

  //console.log('\nget chunks', root, firstLevel, secondLevel, thirdLevel)

  if (firstLevel === undefined) {
    //console.log('------------\nRoot changed to:', code._id)
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
    // console.log('First level', el, root)
    menu[index].children.push({ value: el[0]._id, label: el[0].desc, children: [] })
  }

  if (firstLevel && secondLevel && secondLevel.length === 1) {
    key = root + '.' + firstLevel + '.' + secondLevel
    el = codici.filter(c => c._id === key)
    rootIndex = menu.findIndex(m => m.value === root)
    subIndex = menu[rootIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel)
    menu[rootIndex].children[subIndex].children.push({ value: el[0]._id, label: el[0].desc, children: [] })
    // console.log('Second level one char', key, el, rootIndex, subIndex)
  }

  if (firstLevel && secondLevel && secondLevel.length === 2 && thirdLevel === undefined) {
    key = root + '.' + firstLevel + '.' + secondLevel
    el = codici.filter(c => c._id === key)
    rootIndex = menu.findIndex(m => m.value === root)
    firstLevelIndex = menu[rootIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel)
    secondLevelIndex = menu[rootIndex].children[firstLevelIndex].children.findIndex(
      subchild => subchild.value === root + '.' + firstLevel + '.' + secondLevel.substr(0, 1)
    )
    menu[rootIndex].children[firstLevelIndex].children[secondLevelIndex].children.push({ value: el[0]._id, label: el[0].desc, children: [] })
    // console.log('Second level two chars', key, el, rootIndex, firstLevelIndex, secondLevelIndex)
  }

  if (thirdLevel) {
    key = root + '.' + firstLevel + '.' + secondLevel + '.' + thirdLevel
    el = codici.filter(c => c._id === key)
    rootIndex = menu.findIndex(m => m.value === root)
    firstLevelIndex = menu[rootIndex].children.findIndex(subchild => subchild.value === root + '.' + firstLevel)
    secondLevelIndex = menu[rootIndex].children[firstLevelIndex].children.findIndex(
      subchild => subchild.value === root + '.' + firstLevel + '.' + secondLevel.substr(0, 1)
    )
    thirdLevelIndex = menu[rootIndex].children[firstLevelIndex].children[secondLevelIndex].children.findIndex(
      subchild => subchild.value === root + '.' + firstLevel + '.' + secondLevel
    )
    // console.log('Third Level', menu[rootIndex].children[firstLevelIndex], secondLevelIndex, thirdLevelIndex)
    menu[rootIndex].children[firstLevelIndex].children[secondLevelIndex].children[thirdLevelIndex].children.push({ value: el[0]._id, label: el[0].desc })
  }
})

console.log(JSON.stringify(menu, null, 2))
