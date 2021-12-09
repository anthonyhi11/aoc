export {};

const fs = require("fs");

function parseFile(location: string): string[][][] {
  return fs
    .readFileSync(location, "utf8")
    .split("\n")
    .map((x) => x.split(" | ").map((y) => y.split(" ")));
}

function partOne(data: string[][][]): number {
  // 2, 3, 4, 7
  let unique = 0;
  data.forEach((entry) => {
    entry[1].forEach((num) => {
      if (
        num.length === 2 ||
        num.length === 3 ||
        num.length === 4 ||
        num.length === 7
      ) {
        unique++;
      }
    });
  });

  return unique;
}

function partTwo(data: string[][][]): number {
  // we have to determine the numbers. 1, 4, 7, 8
  const total = { sum: 0 };
  data.forEach((entry) => {
    analyzeInput(entry, total);
  });

  return total.sum;
}

function analyzeInput(entry: string[][], total: { sum: number }): void {
  const one = entry[0]
    .find((str) => str.length === 2)
    .split("")
    .sort()
    .join("");
  const four = entry[0]
    .find((str) => str.length === 4)
    .split("")
    .sort()
    .join("");
  const seven = entry[0]
    .find((str) => str.length === 3)
    .split("")
    .sort()
    .join("");
  const eight = entry[0]
    .find((str) => str.length === 7)
    .split("")
    .sort()
    .join("");
  const three = findThree(entry[0], one).split("").sort().join("");
  const nine = findNine(
    entry[0].filter((str) => str.length === 6),
    four
  )
    .split("")
    .sort()
    .join("");
  const zero = findZero(
    entry[0].filter(
      (str) => str.length === 6 && str.split("").sort().join("") !== nine
    ),
    seven
  )
    .split("")
    .sort()
    .join("");
  const six = entry[0]
    .find(
      (str) =>
        str.length === 6 &&
        str.split("").sort().join("") !== nine &&
        str.split("").sort().join("") !== zero
    )
    .split("")
    .sort()
    .join("");

  const two = findTwo(
    entry[0].filter(
      (str) => str.length === 5 && str.split("").sort().join("") !== three
    ),
    six
  )
    .split("")
    .sort()
    .join("");
  const five = entry[0]
    .find(
      (str) =>
        str.length === 5 &&
        str.split("").sort().join("") !== three &&
        str.split("").sort().join("") !== two
    )
    .split("")
    .sort()
    .join("");

  let printedNumber = "";

  entry[1].forEach((str) => {
    let ordered = str.split("").sort().join("");
    switch (ordered) {
      case zero:
        printedNumber += "0";
        break;
      case one:
        printedNumber += "1";
        break;
      case two:
        printedNumber += "2";
        break;
      case three:
        printedNumber += "3";
        break;
      case four:
        printedNumber += "4";
        break;
      case five:
        printedNumber += "5";
        break;
      case six:
        printedNumber += "6";
        break;
      case seven:
        printedNumber += "7";
        break;
      case eight:
        printedNumber += "8";
        break;
      case nine:
        printedNumber += "9";
        break;

      default:
        console.log(`OOPS! DID NOT MATCH SWITCH ${str}`);
        break;
    }
  });

  total.sum += Number(printedNumber);
}

function findZero(entry: string[], seven: string): string {
  let sevenArray = seven.split("");

  for (let i = 0; i < entry.length; i++) {
    let zeroFound = true;

    sevenArray.forEach((letter) => {
      if (!entry[i].includes(letter)) {
        zeroFound = false;
      }
    });
    if (zeroFound) {
      return entry[i];
    }
  }
  return null;
}
function findTwo(entry: string[], six: string): string {
  let sixArray = six.split("");

  for (let i = 0; i < entry.length; i++) {
    let missing = 0;

    sixArray.forEach((char) => {
      if (!entry[i].includes(char)) {
        missing++;
      }
    });

    if (missing === 2) {
      return entry[i];
    }
  }
  return null;
}

function findThree(entry: string[], one: string): string {
  const oneArray = one.split("");
  // Finding three should be easy but I'm making it way too hard
  for (let i = 0; i < entry.length; i++) {
    if (entry[i].length === 5) {
      let threeFound = false;
      let threeFound2 = false;
      oneArray.forEach((letter) => {
        if (entry[i].includes(letter)) {
          if (threeFound) {
            threeFound2 = true;
          } else {
            threeFound = true;
          }
        } else {
          threeFound = false;
        }
      });
      if (threeFound && threeFound2) {
        return entry[i];
      }
    }
  }
  return null;
}

function findNine(entry: string[], four: string): string {
  const fourArray = four.split("");

  for (let i = 0; i < entry.length; i++) {
    let nineFound = true;

    fourArray.forEach((letter) => {
      if (!entry[i].includes(letter)) {
        nineFound = false;
      }
    });
    if (nineFound) {
      return entry[i];
    }
  }
  return null;
}
const input = parseFile("./input.txt");
console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
