const fs = require('fs');

function pt1(dirs, m) {
    let cur = "AAA";
    let steps = 0;

    while (cur !== "ZZZ") {
        for (const c of dirs) {
            if (c === 'L') {
                cur = m[cur][0];
            } else {
                cur = m[cur][1];
            }
            steps += 1;

            if (cur === "ZZZ") {
                return steps;
            }
        }
    }

    return steps;
}

function pt2(dirs, m) {
    const curs = [];
    for (const c in m) {
        if (c[2] === 'A') {
            curs.push(c);
        }
    }
    const steps = new Array(curs.length).fill(0);

    for (let i = 0; i < curs.length; i++) {
        let cur = curs[i];
        while (cur[2] !== 'Z') {
            for (const turn of dirs) {
                if (turn === 'L') {
                    cur = m[cur][0];
                } else {
                    cur = m[cur][1];
                }

                steps[i]++;

                if (cur[2] === 'Z') {
                    break;
                }
            }
        }
    }

    let prod = 1;
    for (const s of steps) {
        for (const f of primeFactors(s)) {
            if (prod % f !== 0) {
                prod *= f;
            }
        }
    }

    return prod;
}

function parse(filename) {
    const input = fs.readFileSync(filename, 'utf-8');
    const lines = input.split('\n');
    const dirs = lines[0];
    const m = {};

    for (const l of lines.slice(2)) {
        if (l === '') {
            continue;
        }

        const source = l.slice(0, 3);
        const left = l.slice(7, 10);
        const right = l.slice(12, 15);
        m[source] = [left, right];
    }

    return [dirs, m];
}

function primeFactors(n) {
    const pfs = [];

    while (n % 2 === 0) {
        pfs.push(2);
        n = n / 2;
    }

    for (let i = 3; i * i <= n; i = i + 2) {
        while (n % i === 0) {
            pfs.push(i);
            n = n / i;
        }
    }

    if (n > 2) {
        pfs.push(n);
    }

    return pfs;
}

function main() {
    const timeStart = Date.now();
    const [dirs, m] = parse("input.txt");
    const a1 = pt1(dirs, m);
    const a2 = pt2(dirs, m);

    console.log("--- Day 8: Haunted Wasteland ---");
    console.log(`Part 1: ${a1}`);
    console.log(`Part 2: ${a2}`);
    console.log(`Time: ${(Date.now() - timeStart).toFixed(2)}ms`);
}

main();
