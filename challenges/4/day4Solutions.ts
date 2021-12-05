import { isModuleNamespaceObject } from "util/types";

export {};

const fs = require("fs");

interface bingoInput {
  answers: number[] | null;
  bingoCards: number[][][] | null;
}

function parseFile(location: string): bingoInput {
  const parsedFile: bingoInput = {
    answers: null,
    bingoCards: [],
  };
  let input = fs.readFileSync(location, "utf8").split("\n");
  parsedFile.answers = input[0].split(",").map((x) => +x);

  // Create new multi-dimensional array
  let bingoCard = [];
  input.slice(2).forEach((arr) => {
    if (arr !== "") {
      arr = arr
        .split(" ")
        .filter((x) => x !== "")
        .map((x) => +x);
      bingoCard.push(arr);
    } else if (arr === "") {
      parsedFile.bingoCards.push(bingoCard);
      bingoCard = [];
    }
  });
  return parsedFile;
}

function partOne(input: bingoInput): number {
  let winningNumber: number = 0;
  let winningBoard: number[][] = null;
  for (let i = 0; i < input.answers.length; i++) {
    winningNumber = input.answers[i];
    for (let j = 0; j < input.bingoCards.length; j++) {
      let currentCard = input.bingoCards[j];
      winningBoard = checkForMatch(winningNumber, currentCard);
      if (winningBoard !== null) {
        break;
      }
    }
    if (winningBoard !== null) {
      break;
    }
  }
  return calcScore(winningBoard, winningNumber);
}

function checkForMatch(answer: number, card: number[][]): number[][] | null {
  let winner: number[][] = null;
  for (let i = 0; i < card.length; i++) {
    if (card[i].includes(answer)) {
      const index = card[i].indexOf(answer);
      card[i][index] = -1;
      winner = checkForWinner(card);
      if (winner !== null) {
        break;
      }
    }
  }
  return winner;
}

function checkForWinner(card: number[][]): number[][] {
  let verifiedWin: boolean = false;

  for (let i = 0; i < card.length; i++) {
    const column = [card[0][i], card[1][i], card[2][i], card[3][i], card[4][i]];
    const row = card[i];

    if (
      column.filter((num) => num === -1).length === 5 ||
      row.filter((num) => num === -1).length === 5
    ) {
      verifiedWin = true;
      break;
    }
  }

  return verifiedWin ? card : null;
}

function calcScore(winningBoard: number[][], winningNumber: number): number {
  let sumOfUnmarked = 0;

  winningBoard.forEach((row) => {
    row.forEach((num) => {
      if (num !== -1) {
        sumOfUnmarked += num;
      }
    });
  });
  return sumOfUnmarked * winningNumber;
}

function partTwo(input: bingoInput): number {
  const { winner, card } = findLoser(input, 0);
  return calcScore(card, winner);
}

function findLoser(input: bingoInput, winningNumber: number) {
  if (input.bingoCards.length === 1) {
    let boardCheck = null;
    boardCheck = checkForWinner(input.bingoCards[0]);

    if (boardCheck !== null) {
      return {
        winner: winningNumber,
        card: input.bingoCards[0],
      };
    }
  }

  let numbers = input.answers.slice();
  let cards = input.bingoCards;

  let winningBoard: number[][] = null;
  for (let j = 0; j < cards.length; j++) {
    let currentCard = cards[j];
    winningBoard = checkForMatch(winningNumber, currentCard);
    if (winningBoard !== null) {
      // WINNER FOUND! Remove winning card and restart with same initial number.
      if (cards.length > 1) {
        cards.splice(j, 1);
      }
      const newInput: bingoInput = { answers: numbers, bingoCards: cards };
      return findLoser(newInput, winningNumber);
    }
  }
  // BOO, winner wasn't found... restart with new initial number.
  numbers.splice(0, 1);
  return findLoser(
    {
      bingoCards: input.bingoCards,
      answers: numbers,
    },
    numbers[0]
  );
}

const input = parseFile("./input.txt");

console.log(`Part One: ${partOne(input)}`);
console.log(`Part Two: ${partTwo(input)}`);
