const fs = require('fs');

function pt1(grid) {
  const dxvals = [-1, 0, 1];
  const dyvals = [-1, 0, 1];
  let sum = 0;
  let number = 0;
  let symbolNeighbor = false;

  for (let y = 0; y < grid.length; y++) {
    if (symbolNeighbor && number > 0) {
      sum += number;
    }
    number = 0;
    symbolNeighbor = false;

    for (let x = 0; x < grid[y].length; x++) {
      if (!isNaN(parseInt(grid[y][x]))) {
        number = number * 10 + parseInt(grid[y][x]);

        for (const dy of dyvals) {
          for (const dx of dxvals) {
            const y2 = y + dy;
            const x2 = x + dx;

            if (
              x2 >= 0 &&
              x2 < grid[y].length &&
              y2 >= 0 &&
              y2 < grid.length &&
              (x2 !== x || y2 !== y)
            ) {
              if (grid[y2][x2] !== '.' && isNaN(parseInt(grid[y2][x2]))) {
                symbolNeighbor = true;
              }
            }
          }
        }
      } else {
        if (symbolNeighbor) {
          sum += number;
        }

        number = 0;
        symbolNeighbor = false;
      }
    }
  }

  console.log(`part 1: ${sum}`);
}

function parse(grid, x, y) {
  while (x > 0 && !isNaN(parseInt(grid[y][x - 1]))) {
    x--;
  }

  let n = 0;
  while (x < grid[y].length && !isNaN(parseInt(grid[y][x]))) {
    n = n * 10 + parseInt(grid[y][x]);
    x++;
  }

  return n;
}

function pt2(grid) {
  const dxvals = [-1, 0, 1];
  const dyvals = [-1, 0, 1];
  let sum = 0;
  const ratios = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== '*') {
        continue;
      }

      ratios.length = 0;
      for (const dy of dyvals) {
        for (const dx of dxvals) {
          const y2 = y + dy;
          const x2 = x + dx;

          if (
            x2 >= 0 &&
            x2 < grid[y].length &&
            y2 >= 0 &&
            y2 < grid.length
          ) {
            if (!isNaN(parseInt(grid[y2][x2]))) {
              const v = parse(grid, x2, y2);

              let uniq = true;
              for (const v2 of ratios) {
                if (v2 === v) {
                  uniq = false;
                  break;
                }
              }
              if (uniq) {
                ratios.push(v);

                if (ratios.length > 2) {
                  gotoNext();
                }
              }
            }
          }
        }
      }

      if (ratios.length === 2) {
        sum += ratios[0] * ratios[1];
      }

      gotoNext();
    }
  }

  console.log(`part 2: ${sum}`);
}

function gotoNext() {
  // This is a placeholder for the "goto" statement
}

function main() {
  const timeStart = Date.now();

  try {
    const data = fs.readFileSync('input.txt', 'utf8');
    const grid = data.split('\n').filter((line) => line !== '').map((line) => line.split(''));

    pt1(grid);
    pt2(grid);
    console.log(`${(Date.now() - timeStart).toFixed(2)}ms`);
  } catch (err) {
    console.error(err);
  }
}

main();
