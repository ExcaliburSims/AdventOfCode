const fs = require('fs');

// Read data from the file
const lines = fs.readFileSync('input.txt', 'utf-8').trim().split('\n');

let possibleGames = 0;
let powerSum = 0;

for (const line of lines) {
    const sets = line.replace(/[;,:]/g, '').split(/\s+/);
    const colormax = {};

    for (let i = 2; i < sets.length; i += 2) {
        const count = parseInt(sets[i]);
        const color = sets[i + 1];
        colormax[color] = Math.max(colormax[color] || 0, count);
    }

    const power = Object.values(colormax).reduce((acc, val) => acc * val, 1);

    if (colormax["red"] <= 12 && colormax["green"] <= 13 && colormax["blue"] <= 14) {
        possibleGames += parseInt(sets[1]);
    }

    powerSum += power;
}

// Part 1
console.log(possibleGames);

// Part 2
console.log(powerSum);
