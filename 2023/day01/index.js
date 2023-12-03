const fs = require('fs');

// Read the content of the file
const data = fs.readFileSync('input.txt', 'utf-8').trim();

// Split the data into lines
const lines = data.split('\n');

// Step one
const firstStep = lines.map((line) => {
  return line.split('').filter((char) => !isNaN(char));
});

const firstSum = firstStep.map((digits) => {
  return parseInt(digits[0] + digits[digits.length - 1]);
});

console.log('first step:', firstSum.reduce((acc, curr) => acc + curr, 0));

// Step two
const strNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

function firstInt(str, reverse = false) {
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(str[i])) {
      return parseInt(str[i]);
    } else {
      let count = i + 2;
      while (count < i + 6) {
        const substr = reverse ? str.slice(i, count + 1).split('').reverse().join('') : str.slice(i, count + 1);
        if (reverse && strNumbers.includes(substr)) {
          return strNumbers.indexOf(substr) + 1;
        }
        if (strNumbers.includes(substr)) {
          return strNumbers.indexOf(substr) + 1;
        }
        count++;
      }
    }
  }
}

const secondStep = lines.map((line) => {
  return parseInt(`${firstInt(line)}${firstInt(line.split('').reverse().join(''), true)}`);
});

console.log('second step:', secondStep.reduce((acc, curr) => acc + curr, 0));
