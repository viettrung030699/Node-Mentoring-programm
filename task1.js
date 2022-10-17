function writeFunction(string) {
  process.stdout.write(string + '\n');
}

function inputHandler(input) {
  const inputStr = input.toString().split('').reverse().join('');
  writeFunction(inputStr);
}

process.openStdin().addListener('data', inputHandler);
