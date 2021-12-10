import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 3, part 1');

const binaryLines: string[] = readFileSync('./inputs/day03/part1', 'utf-8').split("\n");
    
let cumulativeOnesPerColumn: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];
binaryLines.forEach(binaryLine => {
    [...binaryLine].forEach((binaryChar, i) => {
        if (binaryChar == "1") cumulativeOnesPerColumn[i] += 1;
    });
});

let gammaRateStr: string = "";
let epsilonRateStr: string = "";
cumulativeOnesPerColumn.forEach((cumulativeOnes) => {
    if (cumulativeOnes > (binaryLines.length / 2)) {
        gammaRateStr += "1";
        epsilonRateStr += "0";
    } else {
        gammaRateStr += "0";
        epsilonRateStr += "1";
    }
});
const gammaRate: number = Number.parseInt(gammaRateStr, 2)
const epsilonRate: number = Number.parseInt(epsilonRateStr, 2);

console.log(`Answer: ${gammaRate * epsilonRate}`);
