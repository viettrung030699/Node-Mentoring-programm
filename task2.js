const fs = require('fs');
const readline = require('readline');
const csv = require('csvtojson');

const CSV_PATH = './csv/nodejs-hw1-ex1.csv';
const TEXT_PATH = './text/nodejs-hw1-ex2.txt';

const writeText = fs.createWriteStream(TEXT_PATH);

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
