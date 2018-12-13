const assert = require('assert');
const rewire = require('rewire');

// using rewire to get into private resources
const userRewire = rewire('.././index.js');
const getPinyinWords = userRewire.__get__('getPinyinWords');
const getGroups = userRewire.__get__('getGroups');
const dataProcesser = userRewire.__get__('dataProcesser');

const rhymeWords = '測試';

describe('getPinyinWords()', () => {
	it('Returns correct pinyin', () => {
		assert.equal('ce', getPinyinWords(rhymeWords)[0].toString());
	});
});

describe('getGroups()', () => {
	it('returns an object as data', () => {
		assert.equal('object', typeof getGroups(getPinyinWords(rhymeWords)));
	});
});

describe('getData()', () => {
	it('returns an object as data', () => {
		assert.strictEqual('object', typeof dataProcesser('url', 1));
	});
});
