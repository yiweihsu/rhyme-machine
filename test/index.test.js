const assert = require('assert')

// using rewire to get into private resources
const rewire = require('rewire')
const RMrewire = rewire('.././index.js')
const getPinyinWords = RMrewire.__get__('getPinyinWords')
const getClusterGroups = RMrewire.__get__('getClusterGroups')
const getRhymes = RMrewire.__get__('getRhymes')

const rm = require('../index')

const rhymeWords = '測試'

describe('Rhyme machine testing', () => {
  describe('getPinyinWords()', () => {
    it('Returns correct pinyin', () => {
      assert.strict.equal('ce', getPinyinWords(rhymeWords)[0].toString())
    })
  })
  describe('getClusterGroups()', () => {
    it('returns an object as data', () => {
      assert.strict.equal('object', typeof getClusterGroups(getPinyinWords(rhymeWords)))
    })
  })
  describe('getDictDataByUrl()', () => {
    it('returns an object as data', () => {
      assert.strict.equal('object', typeof getRhymes('url', 1))
    })
  })
  describe('search()', () => {
    it('returns rhymes', () => {
      assert.strict.equal('object', typeof rm.search(rhymeWords))
      // TODO test if value is equal
    })
  })
})
