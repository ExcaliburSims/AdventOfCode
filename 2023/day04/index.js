const fs = require('fs');

function main() {
  const timeStart = Date.now();
  try {
    const bytes = fs.readFileSync('input.txt', 'utf8');
    const ncards = 203;
    let pt1 = 0;
    let pt2 = ncards;

    // start with a single copy of each card
    const copies = Array.from({ length: ncards }, () => 1);

    const input = bytes.trim();
    input.split('\n').forEach((c) => {
      if (c === '') return;

      c = c.slice(c.indexOf(': ') + 2);
      const sep = c.indexOf(' | ');
      const winning = c.slice(0, sep).split(' ').map((n) => parseInt(n));
      const hand = c.slice(sep + 3).split(' ').map((n) => parseInt(n)).filter((n) => !isNaN(n));

      let reward = 1;
      let nmatches = 0;

      hand.forEach((n) => {
        winning.forEach((v) => {
          if (n === v) {
            nmatches++;
            pt2 += copies[nmatches - 1];
            copies[nmatches - 1 + n] += copies[nmatches - 1];

            if (nmatches > 2) {
              reward *= 2;
            }
            pt1 += reward;
          }
        });
      });
    });

    console.log(`part 1: ${pt1}`);
    console.log(`part 2: ${pt2}`);
    console.log(`${(Date.now() - timeStart).toFixed(2)}ms`);
  } catch (err) {
    console.error(err);
  }
}

main();
