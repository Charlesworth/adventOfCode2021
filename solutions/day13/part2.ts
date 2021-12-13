import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 13, part 2');

const input: string = readFileSync('./inputs/day13/part1', 'utf-8');

let [dotStr, instructionStr] = input.split("\n\n");

type Point = { x: number, y: number };
let dots: Point[] = dotStr.split("\n").map(line => {
	const [x, y] = line.split(",").map(v => parseInt(v, 10));
	return { x, y };
});

type Instruction = { axis: `x`|`y`, position: number };
const instructions: Instruction[] = instructionStr.split("\n").map(line => {
	const [axisStr, positionStr] = line.split("=");
	const axis = axisStr.slice(-1) as 'x' | 'y';
	const position = parseInt(positionStr);
	return { axis, position	};
});

const fold = (points: Point[], fold: Instruction): Point[] => {
	let newDots: Point[] = [];
	if (fold.axis === 'x') {
		newDots = points.map(dot => ({
			x: dot.x > fold.position ? dot.x - (dot.x - fold.position) * 2 : dot.x,
			y: dot.y
		}));
	} else {
		newDots = points.map(dot => ({
			x: dot.x,
			y: dot.y > fold.position ? dot.y - (dot.y - fold.position) * 2 : dot.y
		}));
	}

	let dotsSet: Set<string> = new Set(newDots.map(point => `${point.x},${point.y}`));
	let deduplicatedDots = [...dotsSet]
		.map(line => line.split(','))
		.map((xyStr: string[]) => ({ x: parseInt(xyStr[0], 10), y: parseInt(xyStr[1], 10) }));

	return deduplicatedDots;
}

const getDotsString = (dots: Point[]): string => {
	const width = dots.reduce((highXVal, point) => Math.max(highXVal, point.x), -1) + 1;
	const height = dots.reduce((highYVal, point) => Math.max(highYVal, point.y), -1) + 1;

	const imageMap: string[][] = Array(height).fill(0).map(() => Array(width).fill('█'));
	for (let dot of dots)
		imageMap[dot.y][dot.x] = 'X';

	return imageMap.map(line => line.join('')).join('\n');
}

for (let instruction of instructions) {
	dots = fold(dots, instruction);
}

console.log(`Answer:\n${getDotsString(dots)}`);
