const fs = require("fs");

function parseFile(location: string): number[] {
  const input = fs.readFileSync(location, "utf8");
  return input.split("\n").map((x) => Number(x));
}

function partOne(depthMarkers: number[]): number {
  let increases = 0;

  for (
    let currentDepthMarker = 1;
    currentDepthMarker < depthMarkers.length;
    currentDepthMarker++
  ) {
    let prevDepthMarker = currentDepthMarker - 1;
    if (depthMarkers[currentDepthMarker] > depthMarkers[prevDepthMarker]) {
      increases++;
    }
  }
  return increases;
}

function partTwo(depthMarkers: number[]): number {
  let increases = 0;
  for (let i = 0; i < depthMarkers.length - 3; i++) {
    let windowOne: number =
      depthMarkers[i] + depthMarkers[i + 1] + depthMarkers[i + 2];
    let windowTwo: number =
      depthMarkers[i + 1] + depthMarkers[i + 2] + depthMarkers[i + 3];

    if (windowTwo > windowOne) {
      increases++;
    }
  }
  return increases;
}

const inputArray = parseFile("./input.txt");

console.log(`Part One: ${partOne(inputArray)}`);
console.log(`Part Two: ${partTwo(inputArray)}`);
