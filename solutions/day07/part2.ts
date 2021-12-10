import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 7, part 2');

const input = readFileSync('./inputs/day07/part1', 'utf-8').split(",").map((valStr => Number.parseInt(valStr, 10)));
const maxPosition = Math.max(...input);

const positionCosts: number[] = new Array(maxPosition).fill(0).map((_, i) => {
    return input.reduce((acc, val) => {
        const travelDistance = Math.abs(val - i);
        const fuelUsage = (travelDistance * (travelDistance + 1)) / 2;
        return acc + fuelUsage;
    }, 0)
})

const minCost: number = Math.min(...positionCosts);

console.log(`Answer: ${minCost}`);
