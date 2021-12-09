// Warning: I'm not particularly proud of this solution, I may come back to tidy it up but probably won't
import { readFileSync } from 'fs';

console.log('Advent of code: day 8, part 2');

interface PuzzleLine {
    inputs: string[];
    outputs: string[];
}

const puzzleLines: PuzzleLine[] = readFileSync('./inputs/day8/part1', 'utf-8')
    .split("\n")
    .map(line => {
        const splitInput = line.split(" | ");
        const inputs: string[] = splitInput[0].split(" ").map(unsortedStr => {
            return [...unsortedStr].sort().join('');
        });
        const outputs: string[] = splitInput[1].split(" ").map(unsortedStr => {
            return [...unsortedStr].sort().join('');
        });;
        return {
            inputs: inputs,
            outputs: outputs,
        }
    });

const [lengthOf1, lengthOf4, lengthOf7, lengthOf8] = [2, 4, 3, 7];

const getEdgesInCommon = (a: string, b: string): number => {
    let commonEdgesCount = 0
    for (let char of a) {
        if (b.includes(char)) {
            commonEdgesCount++;
        }
    }
    return commonEdgesCount;
}

const getDigit = (input: string, digit1: string, digit4: string, digit8: string): number => {
    if (input.length === 6) {
        if (getEdgesInCommon(digit1, input) === 2 && getEdgesInCommon(digit4, input) === 3 && getEdgesInCommon(digit8, input) === 6) {
            return 0;
        }
        if (getEdgesInCommon(digit1, input) === 1 && getEdgesInCommon(digit4, input) === 3 && getEdgesInCommon(digit8, input) === 6) {
            return 6;
        }
        if (getEdgesInCommon(digit1, input) === 2 && getEdgesInCommon(digit4, input) === 4 && getEdgesInCommon(digit8, input) === 6) {
            return 9;
        }
    }
    if (input.length === 5) {
        if (getEdgesInCommon(digit1, input) === 1 && getEdgesInCommon(digit4, input) === 2 && getEdgesInCommon(digit8, input) === 5) {
            return 2;
        }
        if (getEdgesInCommon(digit1, input) === 2 && getEdgesInCommon(digit4, input) === 3 && getEdgesInCommon(digit8, input) === 5) {
            return 3;
        }
        if (getEdgesInCommon(digit1, input) === 1 && getEdgesInCommon(digit4, input) === 3 && getEdgesInCommon(digit8, input) === 5) {
            return 5;
        }
    }
    throw new Error(`STOP RIGHT THERE CRIMINAL SCUM! Error: A digit was not matched`);
    return -100000000; 
}

const getOutput = (puzzleLine: PuzzleLine): number => {
    let outputMap = new Map<string, number>();
    const charsOf1 = puzzleLine.inputs.filter(input => input.length == lengthOf1)[0];
    const charsOf4 = puzzleLine.inputs.filter(input => input.length == lengthOf4)[0];
    const charsOf7 = puzzleLine.inputs.filter(input => input.length == lengthOf7)[0];
    const charsOf8 = puzzleLine.inputs.filter(input => input.length == lengthOf8)[0];
    
    outputMap.set(charsOf1, 1);
    outputMap.set(charsOf4, 4);
    outputMap.set(charsOf7, 7);
    outputMap.set(charsOf8, 8);

    let forDeletion = [charsOf1, charsOf4, charsOf7, charsOf8];
    let remainingDigits = puzzleLine.inputs.filter(item => !forDeletion.includes(item))

    for (let digitStr of remainingDigits) {
        outputMap.set(digitStr, getDigit(digitStr, charsOf1, charsOf4, charsOf8));
    }

    let outputStr = "";
    for (let outputDigit of puzzleLine.outputs) {
        outputStr = `${outputStr}${outputMap.get(outputDigit)}`
    }

    return Number.parseInt(outputStr, 10);
}

let cumulativePuzzleOutputs = 0;
for (let puzzleLine of puzzleLines) {
    cumulativePuzzleOutputs += getOutput(puzzleLine);
}

console.log(`${cumulativePuzzleOutputs}`);
