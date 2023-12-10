const fs = require('fs');

function parse(filename) {
    const input = fs.readFileSync(filename, 'utf-8');
    const sequences = [];

    input.split('\n').forEach((line) => {
        if (line.trim() === '') {
            return;
        }

        const sequence = line.split(' ').map(Number);
        sequences.push(sequence);
    });

    return sequences;
}

function reverseArray(arr) {
    return arr.slice().reverse();
}

function pt1(mainSequences) {
    let pt1 = 0;

    mainSequences.forEach((s) => {
        pt1 += s[s.length - 1];
        let hasNonZero = 1;

        while (hasNonZero !== 0) {
            const diffs = [];
            hasNonZero = 0;

            for (let i = 0; i < s.length - 1; i++) {
                const diff = s[i + 1] - s[i];
                diffs.push(diff);
                hasNonZero |= diff;
            }

            pt1 += diffs[diffs.length - 1];
            s = diffs;
        }
    });

    return pt1;
}

function pt2(seqs) {
    seqs.forEach((seq) => {
        seq = reverseArray(seq);
    });
    return pt1(seqs);
}

function main() {
    const timeStart = Date.now();
    const seqs = parse("input.txt");

    const a1 = pt1(seqs);
    const a2 = pt2(seqs);
    
    console.log("--- Day 9: Mirage Maintenance ---");
    console.log(`Part 1: ${a1}`);
    console.log(`Part 2: ${a2}`);
    console.log(`Time: ${(Date.now() - timeStart).toFixed(2)}ms`);
}

main();
