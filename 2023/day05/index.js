const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf-8').trim();
const lines = data.split('\n');

const parts = data.split('\n\n');
const seed = parts[0].split(':')[1].split(' ').map(Number);
const others = parts.slice(1);

class Function {
    constructor(S) {
        const lines = S.split('\n').slice(1); // throw away name
        // dst src sz
        this.tuples = lines.map(line => line.split(' ').map(Number));
    }

    applyOne(x) {
        for (const [dst, src, sz] of this.tuples) {
            if (src <= x && x < src + sz) {
                return x + dst - src;
            }
        }
        return x;
    }

    applyRange(R) {
        const A = [];
        for (const [dest, src, sz] of this.tuples) {
            const srcEnd = src + sz;
            const NR = [];
            while (R.length) {
                // [st                                     ed)
                //          [src       srcEnd]
                // [BEFORE ][INTER            ][AFTER        )
                const [st, ed] = R.pop();
                // (src,sz) might cut (st,ed)
                const before = [st, Math.min(ed, src)];
                const inter = [Math.max(st, src), Math.min(srcEnd, ed)];
                const after = [Math.max(srcEnd, st), ed];
                if (before[1] > before[0]) {
                    NR.push(before);
                }
                if (inter[1] > inter[0]) {
                    A.push([inter[0] - src + dest, inter[1] - src + dest]);
                }
                if (after[1] > after[0]) {
                    NR.push(after);
                }
            }
            R = NR;
        }
        return A.concat(R);
    }
}

const Fs = others.map(s => new Function(s));

const applyFunctions = (R, o) => {
    for (const line of o) {
        const [dest, src, sz] = line.split(' ').map(Number);
        // Your logic for applying functions goes here
    }
};

const P1 = [];
for (let x of seed) {
    for (const f of Fs) {
        x = f.applyOne(x);
    }
    P1.push(x);
}
console.log(Math.min(...P1));

const P2 = [];
const pairs = seed.reduce((acc, val, i) => {
    if (i % 2 === 0) {
        acc.push([val]);
    } else {
        acc[acc.length - 1].push(val);
    }
    return acc;
}, []);

for (const [st, sz] of pairs) {
    // Your logic for applying functions to ranges goes here
    // P2.push(...result);
}
console.log(Math.min(...P2));
