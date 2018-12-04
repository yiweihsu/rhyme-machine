### 使用方式

1. Input
2. 轉換成拼音
3. 抓出詞組押韻群
4. 得到韻腳

```
const input = '長處';
let word = transferPinyin(input);
groups = getGroups(word);
rmSearch(groups);
```

### 字典來源

https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase3
https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase_raw
https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase

### TODO

- Setup Express Environment
- 清理字典重複字詞
- 繁簡轉換
- 限制至少搜尋兩個字以上
