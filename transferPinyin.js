const pinyin = require('pinyin');
function transferPinyin(word) {
	let pinyinWord = pinyin(word, {
		style: pinyin.STYLE_NORMAL,
		heteronym: false // 多音字
	});
	return pinyinWord;
}
exports.transferPinyin = transferPinyin;
