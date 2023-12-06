const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').trim();
const lines = data.split('\n');

const n = lines.length;
const copies = Array.from({ length: n }, () => []);

for (let i = 0; i < n; i++) {
    const parts = lines[i].split(/\s+/);
    const idx = parts.indexOf("|");
    const winning = parts.slice(2, idx).map(Number);
    const ours = parts.slice(idx + 1).map(Number);

    let score = 0;
    for (const num of ours) {
        if (winning.includes(num)) {
            score += 1;
        }
    }

    for (let j = i + 1; j < i + score + 1; j++) {
        copies[i].push(j);
    }
}

const scores = Array.from({ length: n }, () => 1);

for (let i = n - 1; i >= 0; i--) {
    for (const j of copies[i]) {
        scores[i] += scores[j];
    }
}

console.log(scores.reduce((acc, curr) => acc + curr, 0));
