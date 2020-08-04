/* eslint-disable no-undef */
const chai = require('chai')
const atecojs = require('../index')

describe('parse', function () {
  it('letters', function () {
    let desc = atecojs.desc('A')
    chai.assert.strictEqual(desc, 'AGRICOLTURA, SILVICOLTURA E PESCA')
    desc = atecojs.desc('B')
    chai.assert.strictEqual(desc, 'ESTRAZIONE DI MINERALI DA CAVE E MINIERE')
    desc = atecojs.desc('D')
    chai.assert.strictEqual(desc, 'FORNITURA DI ENERGIA ELETTRICA, GAS, VAPORE E ARIA CONDIZIONATA')
    desc = atecojs.desc('E')
    chai.assert.strictEqual(desc, 'FORNITURA DI ACQUA; RETI FOGNARIE, ATTIVITÀ DI GESTIONE DEI RIFIUTI E RISANAMENTO')
  })

  it('parse A calss', function () {
    let desc = atecojs.desc('13')
    chai.assert.strictEqual(desc, 'INDUSTRIE TESSILI')

    desc = atecojs.desc('82')
    chai.assert.strictEqual(desc, 'ATTIVITÀ DI SUPPORTO PER LE FUNZIONI D\'UFFICIO E ALTRI SERVIZI DI SUPPORTO ALLE IMPRESE')
  })

  it('parse B calss', function () {
    let desc = atecojs.desc('13.10')
    chai.assert.strictEqual(desc, 'Preparazione e filatura di fibre tessili')

    desc = atecojs.desc('C.13.1')
    chai.assert.strictEqual(desc, 'Preparazione e filatura di fibre tessili')

    desc = atecojs.desc('13.1')
    chai.assert.strictEqual(desc, 'Preparazione e filatura di fibre tessili')

    desc = atecojs.desc('13.10.0')
    chai.assert.strictEqual(desc, 'Preparazione e filatura di fibre tessili')

    // desc = atecojs.desc('82.04')
    // chai.assert.strictEqual(desc, 'ATTIVITÀ DI SUPPORTO PER LE FUNZIONI D\'UFFICIO E ALTRI SERVIZI DI SUPPORTO ALLE IMPRESE')
  })

  it('create tree menu' , function() {
    const tree = atecojs.tree()
    console.log(JSON.stringify(tree, null, 2))
  })
})
