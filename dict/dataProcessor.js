import fs from 'fs';
import testDict from './testData.json';
import dict from './data.json';
import cluster from './cluster';
import { getPinyinWords, getClusterGroups } from '../src/utils';

const FILE_PATH = './dict/data.post.json';

const getWordPinyin = async (word) => {
  const wordPinyin = await getPinyinWords(word);
  const pinyinArr = [];

  wordPinyin.forEach((word) => {
    pinyinArr.push(word[0]);
  });

  return pinyinArr;
};

const getWordGroup = (pinyinWord) => {
  for (let i = 0; i < 22; i++) {
    if (cluster[i].includes(pinyinWord)) return i;
  }
};

const getWordTone = async (word) => {
  const wordPinyin = await getPinyinWords(word, 'STYLE_TONE2');
  return wordPinyin.map((word) => word[0]);
};

const deleteOldData = async (filePath) => {
  try {
    fs.unlinkSync(filePath);
  } catch (err) {
    console.error(err);
  }
};

const dataProcessor = async () => {
  deleteOldData(FILE_PATH);
  fs.appendFileSync(FILE_PATH, '{\n', 'utf-8');
  await Promise.all(
    testDict.map(async (word, index) => {
      const wordPinyin = await getWordPinyin(word);
      const tone = await getWordTone(word);
      const group = wordPinyin.map((pinyinWord) => {
        return getWordGroup(pinyinWord);
      });

      const processedWord = {
        id: index,
        word,
        pinyin: wordPinyin,
        group,
        tone,
      };
      fs.appendFileSync(
        FILE_PATH,
        JSON.stringify(processedWord) + ',\n',
        'utf-8'
      );
    })
  );
  fs.appendFileSync(FILE_PATH, '}\n', 'utf-8');
};

dataProcessor();
