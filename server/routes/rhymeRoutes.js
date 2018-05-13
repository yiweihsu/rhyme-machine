const axios = require('axios');
const url =
  'https://raw.githubusercontent.com/yiweihsu/rhyme-machine/master/phrase';
const rhymes = require('../services/rhymeMachine');

module.exports = app => {
  app.get('/api/rhymes/:words', (req, res) => {
    
    const input = req.params.words;
    let word = rhymes.transferPinyin(input);
    groups = rhymes.getGroups(word);

    (async () => {
      try {
        const a = await rhymes.rmSearch(groups, rhymes.transferPinyin);
        console.log(a);
      } catch (e) {
        throw new Error(e);
      }
    })();

    res.send('rm');
  });

  app.get('/api/getData', (req, res) => {
    axios
      .get(url)
      .then(response => {
        // TODO pass function to handle the stuff
        // https://codeburst.io/4-ways-for-making-http-s-requests-with-node-js-c524f999942d
        // const input = req.params.words;

        const input = '壞孩子';
        let word = rhymes.transferPinyin(input);
        let wordsGroup = rhymes.getGroups(word);
        let dictDB = String(response);
        // rhymes.rmSearch(response, wordsGroup, rhymes.transferPinyin);
      })
      .catch(error => {
        console.log(error);
      });
  });
};
