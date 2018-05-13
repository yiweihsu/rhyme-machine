const CLUSTER = require('../../cluster');
const request = require('request');
const DICT =
  'https://raw.githubusercontent.com/yiweihsu/rhyme-machine/master/phrase';
const pinyin = require('pinyin');

module.exports = {
  transferPinyin: function(word) {
    let pinyinWord = pinyin(word, {
      style: pinyin.STYLE_NORMAL, // 设置拼音风格
      heteronym: false // 多音字
    });
    return pinyinWord;
  },

  // 抓出搜尋字詞的群組
  getGroups: function(word) {
    let arr = [];

    // 1. get the separated word
    let rhy1Str = word[word.length - 1].join(); // 最後一個字
    let rhy2Str = word[word.length - 2].join(); // 倒數第二個字
    let rhy3Str;
    if (word.length > 2) {
      rhy3Str = word[word.length - 3].join(); // 倒數第三個字
    }

    // 2. check if the word belong to the group
    for (let group in CLUSTER) {
      if (CLUSTER[group].includes(rhy1Str)) {
        arr['0'] = group;
      }
      if (CLUSTER[group].includes(rhy2Str)) {
        arr['1'] = group;
      }

      if (word.length > 2) {
        if (CLUSTER[group].includes(rhy3Str)) {
          arr['2'] = group;
        }
      }
    }
    return arr;
  },

  // TODO refactor > 把request抽出來
  rmSearch: function(dictDB, wordsGroup, transferPinyin) {
    let result = [];
    let len = wordsGroup.length;

    let list = dictDB.split('\n'); // list is a object

    for (let i in list) {
      let temp = dictDB[i];

      let rh1 = transferPinyin(temp[temp.length - 1]);
      let rh2 = transferPinyin(temp[temp.length - 2]);
      let rh3 = transferPinyin(temp[temp.length - 3]);

      // 三韻
      if (len === 3) {
        if (
          CLUSTER[wordsGroup['0']].includes(rh1.join()) &&
          CLUSTER[wordsGroup['1']].includes(rh2.join()) &&
          CLUSTER[wordsGroup['2']].includes(rh3.join())
        ) {
          result.push(temp);
        }
      }

      // 雙韻
      if (len === 2) {
        if (
          CLUSTER[wordsGroup[0]].includes(rh1.join()) &&
          CLUSTER[wordsGroup[1]].includes(rh2.join())
        ) {
          result.push(temp);
        }
      }
    }
    console.log(result);
    return result;
  }
};
