export {};
const { readFileSync } = require("fs");

function parseFile(location: string): string[][] {
  return readFileSync(location, "utf8")
    .split("\n")
    .map((x) => x.split(""));
}

function partOne(subSystem: string[][]): number {
  let errorScore = 0;

  subSystem.forEach((line) => {
    errorScore += locateSyntaxError(line);
  });

  return errorScore;
}

function locateSyntaxError(line: string[]): number {
  const costs = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  const closingBrackets = ["}", ")", "]", ">"];

  let order: string[] = [];
  for (let i = 0; i < line.length; i++) {
    let syntaxError = false;
    const bracket = line[i];
    if (closingBrackets.includes(bracket)) {
      //
      const openBracket = order.pop();
      switch (bracket) {
        case "}":
          if (openBracket !== "{") {
            syntaxError = true;
          }
          break;
        case ")":
          if (openBracket !== "(") {
            syntaxError = true;
          }
          break;
        case "]":
          if (openBracket !== "[") {
            syntaxError = true;
          }
          break;
        case ">":
          if (openBracket !== "<") {
            syntaxError = true;
          }
          break;
        default:
          break;
      }
    } else {
      order.push(bracket);
    }
    if (syntaxError) {
      return costs[bracket];
    }
  }
  return 0;
}

function partTwo(subSystem: string[][]): number {
  let completionScore: number[] = [];

  subSystem.forEach((line) => {
    const score = determineLineCompletion(line);

    if (score > 0) {
      completionScore.push(score);
    }
  });

  completionScore = completionScore.sort((a, b) => a - b);

  return completionScore[Math.floor(completionScore.length / 2)];
}

function determineLineCompletion(line: string[]): number {
  const closingBrackets = ["}", ")", "]", ">"];
  const order: string[] = [];

  for (let i = 0; i < line.length; i++) {
    let syntaxError = false;
    const bracket = line[i];
    if (closingBrackets.includes(bracket)) {
      const openBracket = order.pop();
      switch (bracket) {
        case "}":
          if (openBracket !== "{") {
            syntaxError = true;
          }
          break;
        case ")":
          if (openBracket !== "(") {
            syntaxError = true;
          }
          break;
        case "]":
          if (openBracket !== "[") {
            syntaxError = true;
          }
          break;
        case ">":
          if (openBracket !== "<") {
            syntaxError = true;
          }
          break;
        default:
          break;
      }
    } else {
      order.push(bracket);
    }
    if (syntaxError) {
      return 0;
    }
  }
  let score = 0;

  if (order.length > 0) {
    for (let i = order.length - 1; i >= 0; i--) {
      const bracket = order[i];
      switch (bracket) {
        case "(":
          score = score * 5 + 1;
          break;
        case "[":
          score = score * 5 + 2;
          break;
        case "{":
          score = score * 5 + 3;
          break;
        case "<":
          score = score * 5 + 4;
          break;
        default:
          break;
      }
    }
  }
  return score;
}

const input = parseFile("./input.txt");
const small = parseFile("./small.txt");

console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
