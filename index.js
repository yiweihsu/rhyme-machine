const _ = require('lodash');
const axios = require('axios');
const pinyin = require('pinyin');

const cluster = require('./dict/cluster');
const dictionary_url =
	'https://raw.githubusercontent.com/yiweihsu/rhyme-machine/master/dict/phrase';

function getPinyinWords(rhyme) {
	let pinyinWord = pinyin(rhyme, {
		style: pinyin.STYLE_NORMAL, // 設置拼音風格
		heteronym: false, // 多音字
	});
	return pinyinWord;
}

function getClusterGroups(word) {
	let groupArr = [];

	let last1Str = word[word.length - 1].join(); // 最後一個字
	let last2Str = word[word.length - 2].join(); // 倒數第二個字
	let last3Str; // 倒數第三個字

	if (word.length > 2) {
		last3Str = word[word.length - 3].join();
	}

	// check if the word belong to the group
	for (let group in cluster) {
		if (cluster[group].includes(last1Str)) {
			groupArr['0'] = group;
		}
		if (cluster[group].includes(last2Str)) {
			groupArr['1'] = group;
		}
		if (word.length > 2) {
			if (cluster[group].includes(last3Str)) {
				groupArr['2'] = group;
			}
		}
	}
	return groupArr;
}

async function getDictDataByUrl(url) {
	try {
		let response = await axios.get(url);
		let data = response.data;
		let arr1 = data.split(' ')[0].split('\n');
		let arr2 = data.split(' ')[1].split('\n');
		let result = _.concat(arr1, arr2);
		return result;
	} catch (error) {
		throw error;
	}
}

function getRhymes(data, groupArr) {
	let result = [];
	let len = groupArr.length;

	for (let i in data) {
		let temp = data[i];
		let rh1 = getPinyinWords(temp[temp.length - 1]);
		let rh2 = getPinyinWords(temp[temp.length - 2]);
		let rh3 = getPinyinWords(temp[temp.length - 3]);

		// 三韻
		if (len === 3) {
			if (
				cluster[groupArr['0']].includes(rh1.join()) &&
				cluster[groupArr['1']].includes(rh2.join()) &&
				cluster[groupArr['2']].includes(rh3.join())
			) {
				result.push(temp);
			}
		}

		// 雙韻
		if (len === 2) {
			if (
				cluster[groupArr[0]].includes(rh1.join()) &&
				cluster[groupArr[1]].includes(rh2.join())
			) {
				result.push(temp);
			}
		}
	}
	return result;
}

exports.search = async function search(rhymeWords) {
	let word = await getPinyinWords(rhymeWords);
	let grouArr = await getClusterGroups(word);
	let data = await getDictDataByUrl(dictionary_url);
	let result = await getRhymes(data, grouArr);
	return result;
};

// exports.search('暴力');
