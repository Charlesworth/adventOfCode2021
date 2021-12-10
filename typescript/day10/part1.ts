import { readFileSync } from 'fs';

console.log('Advent of code: day 10, part 1');

const inputChunks: string[][] = readFileSync('./inputs/day10/part1', 'utf-8').split("\n").map((line) => line.split(""));

const characterPoints: { [key: string]: number } = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

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

let score: number = 0;

for (const chunkLine of inputChunks) {
    const stack: string[] = [];

    for (const chunkCharacter of chunkLine) {
        if (characterOpenClosePairs[chunkCharacter]) {
            stack.push(chunkCharacter);
        } else {
            if (stack[stack.length - 1] === characterCloseOpenPairs[chunkCharacter]) {
                stack.pop();
            } else {
                score += characterPoints[chunkCharacter];
                break;
            }
        }
    }
}

console.log(`Total syntax error score ${score}`);
