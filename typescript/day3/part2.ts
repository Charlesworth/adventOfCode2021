import { readFileSync } from 'fs';

console.log('Advent of code: day 3, part 1');

const binaryLines: string[] = readFileSync('./inputs/day3/part1', 'utf-8').split("\n");
const lineLength = binaryLines[0].length;
const getMostFrequentBit = (lines: string[], columnIndex: number): '1' | '0' => {
	let cumulativeOnes = 0;

    lines.forEach(line => {
        if ([...line][columnIndex] == '1') cumulativeOnes += 1;
    });

	return cumulativeOnes >= (lines.length / 2) ? '1' : '0';
};


let oxygenBinaryLines = [...binaryLines];
for (let i = 0; i < lineLength && oxygenBinaryLines.length > 1; i++) {
    const mostCommonBit = getMostFrequentBit(oxygenBinaryLines, i);
    oxygenBinaryLines = oxygenBinaryLines.filter((line) => [...line][i] === mostCommonBit);
}
if (oxygenBinaryLines.length != 1) throw new Error("oxygenBinaryLines did not reduce to single element");
const oxygenRating = parseInt(oxygenBinaryLines[0], 2);


let co2BinaryLines = [...binaryLines];
for (let i = 0; i < lineLength && co2BinaryLines.length > 1; i++) {
    const mostCommonBit = getMostFrequentBit(co2BinaryLines, i);
    co2BinaryLines = co2BinaryLines.filter((line) => [...line][i] !== mostCommonBit);
}
if (co2BinaryLines.length != 1) throw new Error("co2BinaryLines did not reduce to single element");
const co2ScrubberRating = parseInt(co2BinaryLines[0], 2);


console.log(`Answer: ${oxygenRating * co2ScrubberRating}`);
