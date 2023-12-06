const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').trim();
const lines = data.split('\n');

let ans = 0;

for (const line of lines) {
    const parts = line.split(/\s+/);
    const winning = parts.slice(2, 12).map(Number);
    const ours = parts.slice(13).map(Number);

    let score = 0;
    for (const num of ours) {
        if (winning.includes(num)) {
            score += 1;
        }
    }

    if (score > 0) {
        ans += 2 ** (score - 1);
    }
}

console.log(ans);
