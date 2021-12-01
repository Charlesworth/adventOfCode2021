import { readFileSync } from 'fs';

console.log('Advent of code: day 1, part 1');

const depths = readFileSync('./inputs/day1/part1', 'utf-8').split("\n").map(strValue => Number.parseInt(strValue, 10));

let depthIncreaseCount = 0;
for (let i = 1; i < depths.length; i++) {
    const currentDepth = depths[i];
    const previousDepth = depths[i-1];
    if (currentDepth > previousDepth) {
        depthIncreaseCount += 1;
    }
}

console.log(`Answer: ${depthIncreaseCount}`);
