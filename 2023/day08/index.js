const fs = require('fs');
const lines = fs.readFileSync('input.txt', 'utf8').trim().split('\n');

const children = {};

const steps = lines[0];
for (const line of lines.slice(2)) {
    const [, par, left, right] = line.match(/(...) = \((...), (...)\)/);
    children[par] = [left, right];
}

let cur = 'AAA';
let count = 0;
while (cur !== 'ZZZ') {
    const step = steps[count % steps.length];
    if (step === 'L') {
        cur = children[cur][0];
    } else {
        cur = children[cur][1];
    }

    count += 1;
}

console.log(count);
