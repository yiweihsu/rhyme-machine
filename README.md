### Usage

```
const rm = require('rhyme-machine');

async function showRM(word) {
	let data = await rm.search(word);
	await console.log(data);
}
```

### Dictionary Source

https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase3
https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase_raw
https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase