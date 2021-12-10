import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 9, part 1');

const heightMap: number[][] = readFileSync('./inputs/day09/part1', 'utf-8').split("\n").map((line) => [...line].map(Number));

const height: number = heightMap.length;
const width: number = heightMap[0].length;

const getAdjacentPoints = (horizontalPosition: number, verticlePosition: number): number[][] => {
  let adjacentPoints = [];
  if (horizontalPosition > 0) adjacentPoints.push([horizontalPosition - 1, verticlePosition]);
  if (verticlePosition > 0) adjacentPoints.push([horizontalPosition, verticlePosition - 1]);
  if (horizontalPosition < width - 1) adjacentPoints.push([horizontalPosition + 1, verticlePosition]);
  if (verticlePosition < height - 1) adjacentPoints.push([horizontalPosition, verticlePosition + 1]);
  return adjacentPoints;
}

let cummulativeRisk = 0;
for (let verticlePosition = 0; verticlePosition < height; verticlePosition++) {
    for (let horizonalPosition = 0; horizonalPosition < width; horizonalPosition++) {
        const adjacentPoints = getAdjacentPoints(horizonalPosition, verticlePosition);
        if (adjacentPoints.every(([a, b]) => heightMap[b][a] > heightMap[verticlePosition][horizonalPosition])) {
            cummulativeRisk += heightMap[verticlePosition][horizonalPosition] + 1;
        }
    }
}

console.log(`Answer: ${cummulativeRisk}`);
