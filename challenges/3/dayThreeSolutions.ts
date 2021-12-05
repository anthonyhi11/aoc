export {};
const fs = require("fs");

function parseFile(location: string): string[] {
  return fs.readFileSync(location, "utf8").split("\n");
}

interface resultModelOne {
  gamma: string;
  epsilon: string;
  answer: number;
}

interface resultModelTwo {
  oxygen: string;
  co2: string;
  answer: number;
}

function partOne(inputArray: string[]): resultModelOne {
  const result: resultModelOne = {
    gamma: "",
    epsilon: "",
    answer: 0,
  };

  for (let i = 0; i < inputArray[0].length; i++) {
    let counter = { "1": 0, "0": 0 };

    for (let j = 0; j < inputArray.length; j++) {
      counter[inputArray[j][i]]++;
    }

    result.gamma += counter["1"] > counter["0"] ? "1" : "0";
    result.epsilon += counter["1"] < counter["0"] ? "1" : "0";
  }
  result.answer = parseInt(result.gamma, 2) * parseInt(result.epsilon, 2);
  return result;
}

function partTwo(inputArray: string[]): resultModelTwo {
  const result: resultModelTwo = {
    oxygen: "",
    co2: "",
    answer: 0,
  };

  result.oxygen = findOxygen(inputArray, 0);
  result.co2 = findCO2(inputArray, 0);

  result.answer = parseInt(result.oxygen, 2) * parseInt(result.co2, 2);

  return result;
}

function findOxygen(inputArray: string[], iterator: number): string {
  let remaining: string[] = inputArray;
  if (remaining.length === 1 || iterator >= inputArray[0].length) {
    return remaining[0];
  }
  let counter = { "1": [], "0": [] };

  for (let j = 0; j < inputArray.length; j++) {
    counter[inputArray[j][iterator]].push(inputArray[j]);
  }
  remaining =
    counter["1"].length >= counter["0"].length ? counter["1"] : counter["0"];
  iterator += 1;
  return findOxygen(remaining, iterator);
}

function findCO2(inputArray: string[], iterator: number): string {
  let remaining: string[] = inputArray;
  if (remaining.length === 1 || iterator >= inputArray[0].length) {
    return remaining[0];
  }
  let counter = { "1": [], "0": [] };

  for (let j = 0; j < inputArray.length; j++) {
    counter[inputArray[j][iterator]].push(inputArray[j]);
  }
  remaining =
    counter["1"].length < counter["0"].length ? counter["1"] : counter["0"];
  iterator += 1;
  return findCO2(remaining, iterator);
}

const input = parseFile("./input.txt");

console.log(`Part One: ${JSON.stringify(partOne(input))}`);
console.log(`Part Two: ${JSON.stringify(partTwo(input))}`);
