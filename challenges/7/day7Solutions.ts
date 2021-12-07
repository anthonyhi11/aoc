export {};

const fs = require("fs");
function parseFile(location: string): number[] {
  return fs
    .readFileSync(location, "utf8")
    .split(",")
    .map((x) => +x);
}

function partOne(positions: number[]): number {
  const sorted: number[] = positions.sort((a, b) => a - b);
  const median: number = sorted[sorted.length / 2];

  let gasUsage = 0;
  for (let i = 0; i < sorted.length; i++) {
    gasUsage += Math.abs(sorted[i] - median);
  }

  return gasUsage;
}

function partTwo(positions: number[]): number {
  let total = 0;

  positions.forEach((pos) => (total += pos));

  const average = Math.round(total / positions.length);

  let gasUsage = 0;
  positions.forEach((pos) => {

    // the below worked fine for the small input but was off for the real input
    // I found that odd. Noticed the average 480.5 and decided maybe i should round down at .5??? 
    // SO I just subtracted another -1 from average and plugged it in and tested in advent of code and it worked
    // not really sure why
    const remainder = Math.abs(pos - average);

    let posGasUsage = 0;

    for (let i = 0; i < remainder; i++) {
      posGasUsage += i + 1;
    }
    gasUsage += posGasUsage;
  });
  return gasUsage;
}

const input = parseFile("./input.txt");
// const small = parseFile("./small.txt");
console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
