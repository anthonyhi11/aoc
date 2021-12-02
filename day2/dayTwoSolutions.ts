export {};
const fs = require("fs");

function parseFile(location: string): string[] {
  return fs.readFileSync(location, "utf8").split("\n");
}

interface returnObjectPartOne {
  horizontal: number;
  depth: number;
  answer: number;
}

interface returnObjectPartTwo extends returnObjectPartOne {
  aim: number;
}

function partOne(inputArray: string[]): returnObjectPartOne {
  let horizontal: number = 0;
  let depth: number = 0;

  inputArray.forEach((instruction: string) => {
    const splitInstruction: string[] = instruction.split(" ");
    const direction: string = splitInstruction[0];
    const units: number = Number(splitInstruction[1]);

    switch (direction) {
      case "forward":
        horizontal += units;
        break;
      case "down":
        depth += units;
        break;
      case "up":
        depth -= units;
        break;
      default:
        console.log("oops incorrect instruction", direction);
        break;
    }
  });

  return {
    horizontal: horizontal,
    depth: depth,
    answer: depth * horizontal,
  };
}

function partTwo(inputArray: string[]): returnObjectPartTwo {
  let horizontal: number = 0;
  let depth: number = 0;
  let aim: number = 0;

  inputArray.forEach((instruction: string) => {
    const splitInstruction: string[] = instruction.split(" ");
    const direction: string = splitInstruction[0];
    const units: number = Number(splitInstruction[1]);
    switch (direction) {
      case "forward":
        horizontal += units;
        if (aim !== 0) {
          depth += units * aim;
        }
        break;
      case "down":
        aim += units;
        break;
      case "up":
        aim -= units;
        break;
      default:
        break;
    }
  });

  return {
    horizontal: horizontal,
    depth: depth,
    aim: aim,
    answer: horizontal * depth,
  };
}

const file = parseFile("./input.txt");

console.log(partOne(file));
console.log(partTwo(file));
