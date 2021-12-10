import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 10, part 2');

const inputChunks: string[][] = readFileSync('./inputs/day10/part1', 'utf-8').split("\n").map((line) => line.split(""));

const characterOpenClosePairs: { [key: string]: string } = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

const characterCloseOpenPairs: { [key: string]: string } = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const autocompleationPoints: { [key: string]: number } = {
  ")": 1,
  "]": 2,
  "}": 3,
  ">": 4,
}

let scores: number[] = [];
for (const chunkLine of inputChunks) {
    const stack: string[] = [];
    let isCorrupt: boolean = false;

    for (const chunkCharacter of chunkLine) {
        if (characterOpenClosePairs[chunkCharacter]) {
            stack.push(chunkCharacter);
        } else {
            if (stack[stack.length - 1] === characterCloseOpenPairs[chunkCharacter]) {
                stack.pop();
            } else {
                isCorrupt = true;
                break;
            }
        }
    }

    if (!isCorrupt) {
        let score = 0;

        while (stack.length > 0) {
            const missingCharacter = characterOpenClosePairs[stack.pop() as string];
            score = score * 5 + autocompleationPoints[missingCharacter];
        }

        scores.push(score);
    }
}

const middleIndex = (scores.length - 1) / 2;
const middleScore: number = scores.sort((a, b) => a - b)[middleIndex];

console.log(`Middle autocompleation score: ${middleScore}`);
