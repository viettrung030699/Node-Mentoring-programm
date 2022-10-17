const fs = require('fs');
const readline = require('readline');
const csv = require('csvtojson');
const PATHS = require('./constants');

const CSV_PATH = PATHS.CSV_PATH;
const CSV_TEXT2_PATH = PATHS.CSV_TEXT2_PATH;

const writeText = fs.createWriteStream(CSV_TEXT2_PATH);

const rl = readline.createInterface({
  input: csv().fromFile(CSV_PATH),
  crlfDelay: Infinity,
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);
  writeText.write(line + '\n');
});

rl.on('error', (error) => {
  console.error(error);
});
