export {};

const fs = require("fs");

function parseFile(location: string): number[][] {
  return fs
    .readFileSync(location, "utf8")
    .split("\n")
    .map((arr) => arr.split("").map((x) => +x));
}

function partOne(heightMap: number[][]): number {
  const lowPoints: number[] = [];
  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const current = heightMap[i][j];
      const left = heightMap[i][j - 1] >= 0 ? heightMap[i][j - 1] : current + 1;
      const right =
        heightMap[i][j + 1] >= 0 ? heightMap[i][j + 1] : current + 1;
      const up = heightMap[i - 1]
        ? heightMap[i - 1][j] >= 0
          ? heightMap[i - 1][j]
          : current + 1
        : current + 1;
      const down = heightMap[i + 1]
        ? heightMap[i + 1][j] >= 0
          ? heightMap[i + 1][j]
          : current + 1
        : current + 1;

      if (current < left && current < right && current < up && current < down) {
        lowPoints.push(current);
      }
    }
  }

  return lowPoints.reduce((total, curr) => {
    return (total += curr + 1);
  }, 0);
}

function partTwo(heightMap: number[][]): number {
  const basins: number[] = [];

  for (let i = 0; i < heightMap.length; i++) {
    for (let j = 0; j < heightMap[i].length; j++) {
      const sizeOfBasin = measureBasin(heightMap, i, j);
      basins.push(sizeOfBasin);
    }
  }

  const sorted = basins.sort((a, b) => b - a);
  return sorted[0] * sorted[1] * sorted[2];
}

function measureBasin(heightMap: number[][], i: number, j: number): number {
  // do depth search, and mark each one as -1 after you've gone there...
  // recursion???
  if (heightMap[i][j] === 9) {
    return 0;
  }

  let basinCount = 0;
  // For the current node.
  basinCount += 1;

  // const leftNodeJ = j > 0 ? j - 1 : null;
  const rightNodeJ = j < heightMap[i].length - 1 ? j + 1 : null;
  // const topNodeI = i > 0 ? i - 1 : null;
  const bottomNodeI = i < heightMap.length - 1 ? i + 1 : null;

  // left
  // if (leftNodeJ !== null) {
  //   basinCount += measureBasin(heightMap, i, leftNodeJ);
  // }

  // right
  if (rightNodeJ !== null) {
    basinCount += measureBasin(heightMap, i, rightNodeJ);
  }

  // top
  // if (topNodeI !== null) {
  //   basinCount += measureBasin(heightMap, topNodeI, j);
  // }
  // bottom
  if (bottomNodeI !== null) {
    basinCount += measureBasin(heightMap, bottomNodeI, j);
  }

  return basinCount;
}

const input = parseFile("./small.txt");
// console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
