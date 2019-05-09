const _ = require('lodash')
const axios = require('axios')
const pinyin = require('pinyin')

const cluster = require('./dict/cluster')
const dictionaryURL = 'https://raw.githubusercontent.com/yiweihsu/rhyme-machine/master/dict/phrase'

const getPinyinWords = (rhyme) => {
  return pinyin(rhyme, {
    style: pinyin.STYLE_NORMAL,
    heteronym: false
  })
}

const getClusterGroups = (word) => {
  const groupArr = []

  const lastChar = word[word.length - 1].join()
  const secondLastChar = word[word.length - 2].join()
  let thirdLastChar

  if (word.length > 2) {
    thirdLastChar = word[word.length - 3].join()
  }

  // check if the word belongs to the group
  for (const group in cluster) {
    if (cluster[group].includes(lastChar)) {
      groupArr[0] = group
    }
    if (cluster[group].includes(secondLastChar)) {
      groupArr[1] = group
    }
    if (word.length > 2) {
      if (cluster[group].includes(thirdLastChar)) {
        groupArr[2] = group
      }
    }
  }
  return groupArr
}

const getDictDataByUrl = async (url) => {
  try {
    const response = await axios.get(url)
    const data = response.data
    const arr1 = data.split(' ')[0].split('\n')
    const arr2 = data.split(' ')[1].split('\n')
    const result = _.concat(arr1, arr2)
    return result
  } catch (error) {
    throw error
  }
}

const getRhymes = (data, groupArr) => {
  const result = []
  const len = groupArr.length

  for (const i in data) {
    const temp = data[i]
    const rh1 = getPinyinWords(temp[temp.length - 1])
    const rh2 = getPinyinWords(temp[temp.length - 2])
    const rh3 = getPinyinWords(temp[temp.length - 3])

    // 三韻
    if (len === 3) {
      if (
        cluster[groupArr[0]].includes(rh1.join()) && cluster[groupArr[1]].includes(rh2.join()) && cluster[groupArr[2]].includes(rh3.join())
      ) {
        result.push(temp)
      }
    }

    // 雙韻
    if (len === 2) {
      if (
        cluster[groupArr[0]].includes(rh1.join()) && cluster[groupArr[1]].includes(rh2.join())
      ) {
        result.push(temp)
      }
    }
  }
  return result
}

exports.search = async function search (rhymeWords) {
  const word = await getPinyinWords(rhymeWords)
  const grouArr = await getClusterGroups(word)
  const data = await getDictDataByUrl(dictionaryURL)
  const result = await getRhymes(data, grouArr)
  return result
}

// exports.search('暴力狂')
