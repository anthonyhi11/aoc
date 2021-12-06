export {};

const fs = require("fs");

function parseFile(location: string): string[][][] {
  const firstStep = fs.readFileSync(location, "utf8").split("\n");
  const secondStep = firstStep.map((step) =>
    step.split(" -> ").map((x) => x.split(","))
  );
  return secondStep;
}

function partOne(coordinates: string[][][]): number {
  const seabedMap = new Array(1000).fill(null).map((x) => []);

  seabedMap.forEach(function (arr) {
    for (let i = 0; i < 1000; i++) {
      arr.push(0);
    }
  });
  const answer = { overlaps: 0 };

  coordinates.forEach((coord) => makeMap(seabedMap, coord, answer));

  return answer.overlaps;
}

function partTwo(coordinates: string[][][]): number {
  const seabedMap = new Array(1000).fill(null).map((x) => []);

  seabedMap.forEach(function (arr) {
    for (let i = 0; i < 1000; i++) {
      arr.push(0);
    }
  });
  const answer = { overlaps: 0 };

  coordinates.forEach((coord) => makeMapDiagonal(seabedMap, coord, answer));

  return answer.overlaps;
}

function makeMap(
  seabedMap: any[],
  instruction: string[][],
  answer: { overlaps: number }
): void {
  // To save on time complexity, I use the answer object to count the overlaps as I go.
  const isXAxis = instruction[0][0] === instruction[1][0];
  const isYAxis = instruction[0][1] === instruction[1][1];

  if (isXAxis) {
    doXAxis(seabedMap, instruction, answer);
  } else if (isYAxis) {
    // updateMap when y is exact
    doYAxis(seabedMap, instruction, answer);
  }
}

function makeMapDiagonal(
  seabedMap: any[],
  instruction: string[][],
  answer: { overlaps: number }
): void {
  // To save on time complexity, I use the answer object to count the overlaps as I go.
  const isXAxis = instruction[0][0] === instruction[1][0];
  const isYAxis = instruction[0][1] === instruction[1][1];
  const isDiag = checkDiag(instruction);

  if (isXAxis) {
    doXAxis(seabedMap, instruction, answer);
  } else if (isYAxis) {
    // updateMap when y is exact
    doYAxis(seabedMap, instruction, answer);
  } else if (isDiag) {
    doDiag(seabedMap, instruction, answer);
  }
}

function checkDiag(instruction: string[][]): boolean {
  let isDiag = false;
  const firstX = Number(instruction[0][0]);
  const secondX = Number(instruction[1][0]);
  const firstY = Number(instruction[0][1]);
  const secondY = Number(instruction[1][1]);

  if (Math.abs(firstX - secondX) === Math.abs(firstY - secondY)) {
    isDiag = true;
  }
  return isDiag;
}

function doXAxis(
  seabedMap: any[],
  instruction: string[][],
  answer: { overlaps: number }
) {
  const firstY = Number(instruction[0][1]);
  const secondY = Number(instruction[1][1]);
  const lineToMark = [];
  const x = Number(instruction[0][0]);
  const lowEnd = firstY < secondY ? firstY : secondY;
  const highEnd = firstY > secondY ? firstY : secondY;

  for (let y = Number(lowEnd); y <= Number(highEnd); y++) {
    lineToMark.push([x, y]);
  }
  lineToMark.forEach((coordinate) => {
    if (seabedMap[coordinate[0]][coordinate[1]] === 1) {
      answer.overlaps = answer.overlaps += 1;
    }
    seabedMap[coordinate[0]][coordinate[1]] = seabedMap[coordinate[0]][
      coordinate[1]
    ] += 1;
  });
}

function doYAxis(
  seabedMap: any[],
  instruction: string[][],
  answer: { overlaps: number }
) {
  const firstX = Number(instruction[0][0]);
  const secondX = Number(instruction[1][0]);
  const lineToMark = [];
  const y = Number(instruction[0][1]);
  const lowEnd = firstX < secondX ? firstX : secondX;
  const highEnd = firstX > secondX ? firstX : secondX;

  for (let x = Number(lowEnd); x <= Number(highEnd); x++) {
    lineToMark.push([x, y]);
  }

  lineToMark.forEach((coordinate) => {
    if (seabedMap[coordinate[0]][coordinate[1]] === 1) {
      answer.overlaps = answer.overlaps += 1;
    }
    seabedMap[coordinate[0]][coordinate[1]] = seabedMap[coordinate[0]][
      coordinate[1]
    ] += 1;
  });
}

function doDiag(
  seabedMap: any[],
  instruction: string[][],
  answer: { overlaps: number }
): void {
  let firstX = Number(instruction[0][0]);
  const secondX = Number(instruction[1][0]);
  let firstY = Number(instruction[0][1]);
  const secondY = Number(instruction[1][1]);

  const lineToMark = [];
  const difference = Math.abs(firstX - secondX);

  for (let i = 0; i <= difference; i++) {
    lineToMark.push([firstX, firstY]);

    firstX < secondX ? firstX++ : firstX--;
    firstY < secondY ? firstY++ : firstY--;
  }

  lineToMark.forEach((coordinate) => {
    if (seabedMap[coordinate[0]][coordinate[1]] === 1) {
      answer.overlaps = answer.overlaps += 1;
    }
    seabedMap[coordinate[0]][coordinate[1]] = seabedMap[coordinate[0]][
      coordinate[1]
    ] += 1;
  });
}

const input: string[][][] = parseFile("input.txt");
console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
