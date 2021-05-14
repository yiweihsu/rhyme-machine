const AWS = require('aws-sdk');
const converter = require('aws-sdk/lib/dynamodb/converter');
const rhymeData = require('./data.post.json');
const fs = require('fs');
const replaceObjectName = (data) => {
  data = data.replace(/"M"/g, '"m"');
  data = data.replace(/"L"/g, '"l"');
  data = data.replace(/"S"/g, '"s"');
  data = data.replace(/"N"/g, '"n"');
  return data;
};

const converterToDynamodbFormat = (data) => {
  const convertedData = converter.input(data)['M'];
  const JsonData = JSON.stringify(convertedData);
  return replaceObjectName(JsonData);
};

try {
  var wstream = fs.createWriteStream('./dict/datajson.txt');
  rhymeData.map((rhyme) => {
    wstream.write(converterToDynamodbFormat(rhyme));
    wstream.write('\n');
  });
} catch (err) {
  console.error(err);
}
