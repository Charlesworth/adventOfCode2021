import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 11, part 2');

let input: number[][] = readFileSync('./inputs/day11/part1', 'utf-8').split("\n").map((line) => line.split("").map(str => parseInt(str)));

type Point = { x: number, y: number };

const getAdjacentPoints = (gridWidth: number, gridHeight: number, positionX: number, positionY: number): Point[] => {
	let adjacentPoints: Point[] = [];
	const maxX = Math.min(gridWidth - 1, positionX + 1);
	const maxY = Math.min(gridHeight - 1, positionY + 1);
	const minX = Math.max(0, positionX - 1)
	const minY = Math.max(0, positionY - 1)
	for (let y = minY; y <= maxY; y++) {
		for (let x = minX; x <= maxX; x++) {
			if (!(x === positionX && y === positionY)) adjacentPoints.push({x, y});
		}
	}
	return adjacentPoints;
}


type StepResult = {
	grid: number[][];
	flashes: number;
}

const step = (grid: number[][]): StepResult => {
	let alreadyFlashed: Set<string> = new Set<string>();
	const gridWidth: number = grid[0].length;
	const gridHeight: number = grid.length;
	
	grid = grid.map((row) => row.map((point) => point + 1));
	
	const flashThreshold = 9;
	let flashesRemaining = true;
	while (flashesRemaining) {
		for (let y = 0; y < grid.length; y++) {
			for (let x = 0; x < grid[y].length; x++) {
				if (grid[y][x] > flashThreshold && !alreadyFlashed.has(`x:${x},y:${y}`)) {
					alreadyFlashed.add(`x:${x},y:${y}`);

					for (let adjacentPoint of getAdjacentPoints(gridWidth, gridHeight, x, y)) {
						grid[adjacentPoint.y][adjacentPoint.x]++;
					}
				}
			}
		}
		
		flashesRemaining = grid.some((row, y) => {
			return row.some((point, x) => {
				return point > flashThreshold && !alreadyFlashed.has(`x:${x},y:${y}`);
			})
		});
	}

	return {
		grid: grid.map((row, y) => row.map((point, x) => (alreadyFlashed.has(`x:${x},y:${y}`) ? 0 : point))),
		flashes: alreadyFlashed.size,
	};
}


const gridSize = input.length * input[0].length;
let flashed = 0;
let stepN = 0;

while (flashed != gridSize) {
	const stepResult = step(input);
	stepN++;
	flashed = stepResult.flashes;
	input = stepResult.grid;
}

console.log(`Answer ${stepN}`);
