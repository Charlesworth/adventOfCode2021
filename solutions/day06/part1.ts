import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 6, part 1');

const lanternFishAges: number[] = readFileSync('./inputs/day06/part1', 'utf-8').split(",").map(ageStr => Number.parseInt(ageStr, 10));

let ageBuckets = new Array(9).fill(0);
for (const lanternFishAge of lanternFishAges) {
    ageBuckets[lanternFishAge]++
}
  
for (let day = 0; day < 80; day++) {
    ageBuckets[8] = ageBuckets.shift();
    ageBuckets[6] += ageBuckets[8];
}

const totalFish: number = ageBuckets.reduce((cumulativeFish, bucketFish) => cumulativeFish += bucketFish)

console.log(`Answer: ${totalFish}`);
