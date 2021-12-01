import { readFileSync } from 'fs';

console.log('Advent of code: day 1, part 2');

const depths = readFileSync('./inputs/day1/part1', 'utf-8').split("\n").map(strValue => Number.parseInt(strValue, 10));

const slidingWindowDepths = [];
for (let i = 2; i < depths.length; i++) {
    const threeMeasurementSum = depths[i] + depths[i-1] + depths[i-2];
    slidingWindowDepths.push(threeMeasurementSum);
}

let depthIncreaseCount = 0;
for (let i = 1; i < slidingWindowDepths.length; i++) {
    const currentDepth = slidingWindowDepths[i];
    const previousDepth = slidingWindowDepths[i-1];
    if (currentDepth > previousDepth) {
        depthIncreaseCount += 1;
    }
}

console.log(`Answer: ${depthIncreaseCount}`);
