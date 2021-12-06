export {};
const fs = require("fs");

function parseFile(location: string): number[] {
  return fs
    .readFileSync(location, "utf8")
    .split(",")
    .map((x) => +x);
}

function partOne(lanternFish: number[]): number {
  for (let i = 0; i < 80; i++) {
    lanternFish.forEach((fish, i, lanternFish) => {
      if (fish === 0) {
        lanternFish.push(8);
        lanternFish[i] = 6;
      } else {
        lanternFish[i] = fish - 1;
      }
    });
  }
  return lanternFish.length;
}

function partTwo(lanternFish: number[]): number {

  const population = lanternFish.reduce((population, age) => {
    population[age]++;
    return population;
  }, new Array(9).fill(0));

  for (let i = 0; i < 256; i++) {
    let babyFish = population[0];

    for (let j = 0; j < population.length - 1; j++) {
      population[j] = population[j + 1];
    }
    population[6] = population[6] + babyFish;
    population[8] = babyFish;
  }

  return population.reduce((total, curr) => {
    total += curr;
    return total;
  }, 0);
}

const input = parseFile("./input.txt");
console.time("Part One");
console.log(`Part One: ${partOne(input)}`);
console.timeEnd("Part One");

const input2 = parseFile("./input.txt");
console.time("Part Two");
console.log(`Part Two: ${partTwo(input2)}`);
console.timeEnd("Part Two");
