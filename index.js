const pinyin = require("pinyin");
const cluster = require("./dict/cluster");
const dictionary = require("./dict/data.json");

const getPinyinWords = (rhyme) => {
  return pinyin(rhyme, {
    // STYLE_TONE2
    // pi1n yi1n
    style: pinyin.STYLE_NORMAL,
    heteronym: false,
  });
};

const getClusterGroups = (word) => {
  const groupArr = [];

  const lastChar = word[word.length - 1].join();
  const secondLastChar = word[word.length - 2].join();
  let thirdLastChar;

  if (word.length > 2) {
    thirdLastChar = word[word.length - 3].join();
  }

  // check if the word belongs to the group
  for (const group in cluster) {
    if (cluster[group].includes(lastChar)) {
      groupArr[0] = group;
    }
    if (cluster[group].includes(secondLastChar)) {
      groupArr[1] = group;
    }
    if (word.length > 2) {
      if (cluster[group].includes(thirdLastChar)) {
        groupArr[2] = group;
      }
    }
  }
  return groupArr;
};

const getRhymes = (data, groupArr) => {
  const result = [];
  const len = groupArr.length;

  for (const i in data) {
    const temp = data[i];
    const rh1 = getPinyinWords(temp[temp.length - 1]);
    const rh2 = getPinyinWords(temp[temp.length - 2]);
    const rh3 = getPinyinWords(temp[temp.length - 3]);

    // 三韻
    if (len === 3) {
      if (
        cluster[groupArr[0]].includes(rh1.join()) &&
        cluster[groupArr[1]].includes(rh2.join()) &&
        cluster[groupArr[2]].includes(rh3.join())
      ) {
        console.log(temp);
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
};

exports.search = async function search(rhymeWords) {
  const word = await getPinyinWords(rhymeWords);
  const grouArr = await getClusterGroups(word);
  const result = await getRhymes(dictionary, grouArr);
  return result;
};
