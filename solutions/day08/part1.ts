import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 8, part 1');

const outputValues = readFileSync('./inputs/day08/part1', 'utf-8').split("\n").map(line => line.split(" | ")[1].split(" ")).flat();

const [lengthOf1, lengthOf4, lengthOf7, lengthOf8] = [2, 4, 3, 7];
let [amountOf1, amountOf4, amountOf7, amountOf8] = [0, 0, 0, 0];

outputValues.forEach(outputValue => {
        switch (outputValue.length) {
            case lengthOf1:
                amountOf1++;
                return;
            case lengthOf4:
                amountOf4++;
                return;
            case lengthOf7:
                amountOf7++;
                return;
            case lengthOf8:
                amountOf8++;
                return;
            default:
                break;
        }
    })

console.log(`Answer: ${amountOf1 + amountOf4 + amountOf7 + amountOf8}`);
