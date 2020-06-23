const codici = require('./ateco.json')

module.exports = {
  desc: function (code) {
    code = this._normCode(code)
    const found = codici.find(el => el._id.startsWith(code))
    return found.desc
  },
  _normCode: function (code) {
    code = code.replace(/\./g, '')
    code = code.replace(/\w\./g, '')

    code = code.padEnd(6, '0')
    const fst = code.substr(0, 2)
    if (['01', '02', '03'].includes(fst)) {
      code = 'A.' + code
    } else if (['05', '06', '07', '08', '09'].includes(fst)) {
      code = 'B.' + code
    } else if (['10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33'].includes(fst)) {
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
    return code
  }
}
