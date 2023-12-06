const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').trim();
const lines = data.split('\n');

const seeds = lines[0].split(" ").slice(1).map(Number);

// Generate all the mappings
const maps = [];

let i = 2;
while (i < lines.length) {
    maps.push([]);

    i += 1;
    while (i < lines.length && lines[i] !== "") {
        const [dstStart, srcStart, rangeLen] = lines[i].split(" ").map(Number);
        maps[maps.length - 1].push([dstStart, srcStart, rangeLen]);
        i += 1;
    }

    i += 1;
}

function findLoc(seed) {
    let curNum = seed;

    for (const m of maps) {
        for (const [dstStart, srcStart, rangeLen] of m) {
            if (srcStart <= curNum && curNum < srcStart + rangeLen) {
                curNum = dstStart + (curNum - srcStart);
                break;
            }
        }
    }

    return curNum;
}

const locs = seeds.map(findLoc);
const minLoc = Math.min(...locs);

console.log(minLoc);
