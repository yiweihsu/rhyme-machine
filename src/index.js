import { getPinyinWords, getClusterGroups, getRhymes } from './utils';
import dictionary from '../dict/data.json';

export async function searchRhymes(rhymeWords) {
  const word = await getPinyinWords(rhymeWords);
  const grouArr = await getClusterGroups(word);
  const result = await getRhymes(dictionary, grouArr);

  return result;
}

console.log(searchRhymes('前面的'));
