export {};

const { readFileSync } = require("fs");

function parseFile(location: string): octopus[][] {
  return readFileSync(location, "utf8")
    .split("\n")
    .map((line) =>
      line.split("").map((x) => ({
        energy: +x,
        visited: null,
      }))
    );
}

interface octopus {
  energy: number;
  visited: number;
}

function partOne(octopiMap: octopus[][]): number {
  // for 100 steps, push through each oct and make increase it
  let flashes = 0;
  for (let i = 0; i < 100; i++) {
    // each step...
    for (let j = 0; j < octopiMap.length; j++) {
      for (let k = 0; k < octopiMap[j].length; k++) {
        if (octopiMap[j][k].energy !== 0) {
          const anyFlashes = performStep(octopiMap, j, k, i);
          if (anyFlashes > 0) {
            flashes += anyFlashes;
          }
        } else if (octopiMap[j][k].visited !== i) {
          const anyFlashes = performStep(octopiMap, j, k, i);
          if (anyFlashes > 0) {
            flashes += anyFlashes;
          }
        }
      }
    }
  }
  return flashes;
}

function performStep(
  octopiMap: octopus[][],
  j: number,
  k: number,
  i: number,
  allFlash?: boolean[]
): number {
  let flash = 0;
  let didFlash = false;

  octopiMap[j][k].energy += 1;

  if (octopiMap[j][k].energy > 9) {
    if (allFlash) {
      allFlash.push(true);
    }
    octopiMap[j][k].energy = 0;
    octopiMap[j][k].visited = i;

    // define matrix for all adjacent octopi and run them through performStep
    /*
     * a b c
     * d * f
     * g h i
     */
    // Top Left (a)
    if (j > 0 && k > 0) {
      if (octopiMap[j - 1][k - 1].energy !== 0) {
        flash += performStep(octopiMap, j - 1, k - 1, i, allFlash);
      } else if (octopiMap[j - 1][k - 1].visited !== i) {
        flash += performStep(octopiMap, j - 1, k - 1, i, allFlash);
      }
    }

    // Top Center (b)
    if (j > 0) {
      if (octopiMap[j - 1][k].energy !== 0) {
        flash += performStep(octopiMap, j - 1, k, i, allFlash);
      } else if (octopiMap[j - 1][k].visited !== i) {
        flash += performStep(octopiMap, j - 1, k, i, allFlash);
      }
    }

    // Top Right (c)
    if (j > 0 && k < octopiMap[j].length - 1) {
      if (octopiMap[j - 1][k + 1].energy !== 0) {
        flash += performStep(octopiMap, j - 1, k + 1, i, allFlash);
      } else if (octopiMap[j - 1][k + 1].visited !== i) {
        flash += performStep(octopiMap, j - 1, k + 1, i, allFlash);
      }
    }

    // Left (d)
    if (k > 0) {
      if (octopiMap[j][k - 1].energy !== 0) {
        flash += performStep(octopiMap, j, k - 1, i, allFlash);
      } else if (octopiMap[j][k - 1].visited !== i) {
        flash += performStep(octopiMap, j, k - 1, i, allFlash);
      }
    }
    // Right (f)
    if (k < octopiMap[j].length - 1) {
      if (octopiMap[j][k + 1].energy !== 0) {
        flash += performStep(octopiMap, j, k + 1, i, allFlash);
      } else if (octopiMap[j][k + 1].visited !== i) {
        flash += performStep(octopiMap, j, k + 1, i, allFlash);
      }
    }

    // Bottom Left (g)
    if (j < octopiMap.length - 1 && k > 0) {
      if (octopiMap[j + 1][k - 1].energy !== 0) {
        flash += performStep(octopiMap, j + 1, k - 1, i, allFlash);
      } else if (octopiMap[j + 1][k - 1].visited !== i) {
        flash += performStep(octopiMap, j + 1, k - 1, i, allFlash);
      }
    }

    // Bottom Center (h)
    if (j < octopiMap.length - 1) {
      if (octopiMap[j + 1][k].energy !== 0) {
        flash += performStep(octopiMap, j + 1, k, i, allFlash);
      } else if (octopiMap[j + 1][k].visited !== i) {
        flash += performStep(octopiMap, j + 1, k, i, allFlash);
      }
    }

    // Bottom Right (i)
    if (j < octopiMap.length - 1 && k < octopiMap[j].length - 1) {
      if (octopiMap[j + 1][k + 1].energy !== 0) {
        flash += performStep(octopiMap, j + 1, k + 1, i, allFlash);
      } else if (octopiMap[j + 1][k + 1].visited !== i) {
        flash += performStep(octopiMap, j + 1, k + 1, i, allFlash);
      }
    }
    flash += 1;
  }
  return flash;
}

function partTwo(octopiMap: octopus[][]) {
  let allFlash: boolean[] = [];
  let flashes = 0;
  for (let i = 0; i < 500; i++) {
    // each step...
    for (let j = 0; j < octopiMap.length; j++) {
      for (let k = 0; k < octopiMap[j].length; k++) {
        if (octopiMap[j][k].energy !== 0) {
          const anyFlashes = performStep(octopiMap, j, k, i, allFlash);
          if (anyFlashes > 0) {
            flashes += anyFlashes;
          }
        } else if (octopiMap[j][k].visited !== i) {
          const anyFlashes = performStep(octopiMap, j, k, i, allFlash);
          if (anyFlashes > 0) {
            flashes += anyFlashes;
          }
        }
      }
    }
    if (allFlash.length === 100) {
      return i + 1;
    }

    allFlash = [];
  }
  return flashes;
}

const input = parseFile("./input.txt");
const small = parseFile("./small.txt");

console.log(`Part Two: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
