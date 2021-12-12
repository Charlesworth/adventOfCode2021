import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 9, part 2');

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

const fillBasin = (set: Set<string>, horizontalPosition: number, verticlePosition: number): Set<string> => {
    if (
        set.has(`x:${horizontalPosition},y:${verticlePosition}`) || 
        heightMap[verticlePosition][horizontalPosition] === 9
    ) {
        return new Set;
    }

    set.add(`x:${horizontalPosition},y:${verticlePosition}`);

    getAdjacentPoints(horizontalPosition, verticlePosition)
        .forEach(([adjacentHorizontalPosition, adjacentVerticlePosition]) => fillBasin(set, adjacentHorizontalPosition, adjacentVerticlePosition));

    return set;
}

let basins: number[] = [];
for (let verticlePosition = 0; verticlePosition < height; verticlePosition++) {
    for (let horizonalPosition = 0; horizonalPosition < width; horizonalPosition++) {
        const adjacentPoints = getAdjacentPoints(horizonalPosition, verticlePosition);
        if (adjacentPoints.every(([a, b]) => heightMap[b][a] > heightMap[verticlePosition][horizonalPosition])) {
            basins.push(fillBasin(new Set(), horizonalPosition, verticlePosition).size);
        }
    }
}

const largest3Basins = basins
    .sort((a, b) => b - a)
    .slice(0, 3);
const largestBasinMultiple = largest3Basins[0] * largest3Basins[1] * largest3Basins[2];
console.log(`Answer: ${largestBasinMultiple}`);
