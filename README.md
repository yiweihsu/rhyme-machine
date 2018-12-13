# Rhyme Machine 1.0.7
Rhyme Machine is designed for Chinese Speaking rappers or any lyrics writers to find awesome rhymes easily. 

# Installation

You can install with npm: 
```
$ npm install rhyme-machine
```
or
```
$ yarn add rhyme-machine
```

# Usage Example 

```
const rhymeMachine = require('rhyme-machine');

async function logRM(word) {
	let data = await rm.search(word);
	await console.log(data);
}

const rhyme = '韻腳';
logRM(rhyme);
```

# Dictionary Resources

https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase3
https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase_raw
https://raw.githubusercontent.com/lqj679ssn/Hiphop/master/Init/phrase