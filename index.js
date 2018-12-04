const CLUSTER = require('./dict/cluster');
const request = require('request');
const DICT =
  'https://raw.githubusercontent.com/yiweihsu/rhyme-machine/master/phrase';

const pinyin = require('pinyin');

function transferPinyin(word) {
  let pinyinWord = pinyin(word, {
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
    heteronym: false // 多音字
  });
  return pinyinWord;
}

function getGroups(word) {
  let arr = [];

  let last1Str = word[word.length - 1].join(); // 最後一個字
  let last2Str = word[word.length - 2].join(); // 倒數第二個字
  let last3Str; // 倒數第三個字
  
  if (word.length > 2) {
    last3Str = word[word.length - 3].join(); 
  }

  // check if the word belong to the group
  for (let group in CLUSTER) {
    if (CLUSTER[group].includes(last1Str)) {
      arr['0'] = group;
    }
    if (CLUSTER[group].includes(last2Str)) {
      arr['1'] = group;
    }
    if (word.length > 2) {
      if (CLUSTER[group].includes(last3Str)) {
        arr['2'] = group;
      }
    }
  }

  return arr;
}

function rmSearch(arr) {
  let len = arr.length;
  request(DICT, function(error, response, body) {
    let str = body;
    let list = str.split('\n'); // list is a object

    for (let i in list) {
      let temp = list[i];

      let rh1 = transferPinyin(temp[temp.length - 1]);
      let rh2 = transferPinyin(temp[temp.length - 2]);
      let rh3 = transferPinyin(temp[temp.length - 3]);

      // 三韻
      if (len === 3) {
        if (
          CLUSTER[arr['0']].includes(rh1.join()) &&
          CLUSTER[arr['1']].includes(rh2.join()) &&
          CLUSTER[arr['2']].includes(rh3.join())
        ) {
          console.log(temp);
        }
      }

      // 雙韻
      if (len === 2) {
        if (
          CLUSTER[arr[0]].includes(rh1.join()) &&
          CLUSTER[arr[1]].includes(rh2.join())
        ) {
          console.log(temp);
        }
      }
    }
  });
}

function localSearch(rhymeWords) {
  let word = transferPinyin(rhymeWords);
  groups = getGroups(word);
  return (rmSearch(groups));
}

localSearch('搞事情');

module.exports = (rhymeWords) => {
  let word = transferPinyin(rhymeWords);
  groups = getGroups(word);
  return (rmSearch(groups));
};

