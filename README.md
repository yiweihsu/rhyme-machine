# Rhyme Machine 1.0.11
Rhyme Machine is designed for Chinese speaking rappers or lyrics writers to get some rhymes inspiration 

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes

### Prerequisites

```
node^10.0.0
```

### Installing

with npm 
```
npm install rhyme-machine
```

with yarn
```
yarn add rhyme-machine
```

## Running the tests

```
yarn run test
```

## Usage Example 

It's required to use async function along with the module. An usage example can be refered as below:

```
const rhymeMachine = require('rhyme-machine');

async function getRhyme(word) {
  let result = await rhymeMachine.search(word);
  // doing something with the result here
  // console.log(result);
}

getRhyme('韻腳');
```

## Versioning

See [npm](https://www.npmjs.com/package/rhyme-machine) page for versions details.

## Authors

Yi-Wei Hsu    
yiweihsutw@gmail.com

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details.