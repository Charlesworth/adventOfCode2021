import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 5, part 2');

type Vector2D = {
    x: number;
    y: number;
}

type Line = { start: Vector2D, end: Vector2D};
const getLinesFromInput = (inputStrs: string[]): Line[] => {
    return inputStrs.map(lineStr => {
        let coOrds = lineStr
        .split(" -> ")
        .map(vector2DStr => vector2DStr.split(","))
        .flat()
        .map(coOrdStr => Number.parseInt(coOrdStr, 10));
        
        return {
            start: { x: coOrds[0], y: coOrds[1]},
            end: { x: coOrds[2], y: coOrds[3]},
        };
    })
}
const diagonalToVector2Ds = (line: Line): Vector2D[] => {
    let points: Vector2D[] = [];
    let x = line.start.x;
    let y = line.start.y;
    while (x != line.end.x) {
        points.push({ x: x, y: y });

        if (x > line.end.x) x--
        else x++;

        if (y > line.end.y) y--
        else y++;
    }
    points.push({x: x, y:y});
    return points;
}

const lineToVector2Ds = (line: Line): Vector2D[] => {
    // ignore horizonals
    if (line.start.y != line.end.y && line.start.x != line.end.x) return diagonalToVector2Ds(line);

    // verticle line
    if (line.start.y != line.end.y) return getRangeInclusive(line.start.y, line.end.y).map(yPoint => { return { x: line.start.x, y: yPoint }; });
    
    // horizontal line
    if (line.start.x != line.end.x) return getRangeInclusive(line.start.x, line.end.x).map(xPoint => { return { x: xPoint, y: line.start.y }; });
    
    // single point
    return [{ x: line.start.x, y: line.start.y }];
}

const getRangeInclusive = (a: number, b: number): number[] => {
    let index = a > b ? b : a;
    const indexLimit = a < b ? b+1 : a+1;
    let range: number[] = [];
    for (; index < indexLimit; index++) {
        range.push(index);
    }
    return range;
}

// Solution

const geothermalsInput: string[] = readFileSync('./inputs/day05/part1', 'utf-8').split("\n");
const geoThermalLines: Line[] = getLinesFromInput(geothermalsInput);
const geoThermalGridPoints: Vector2D[] = geoThermalLines
    .map(line => lineToVector2Ds(line))
    .flat();

let geoThermalGridPointsOverlaps = new Map<string, boolean>();
for (let gridPoint of geoThermalGridPoints) {
    const key = `${gridPoint.x},${gridPoint.y}`;
    if (geoThermalGridPointsOverlaps.has(key)) {
        geoThermalGridPointsOverlaps.set(key, true);
    } else {
        geoThermalGridPointsOverlaps.set(key, false);
    }
}

let overlaps: number = 0;
for (let isGridpointGeothermalOverlap of geoThermalGridPointsOverlaps.values()) {
    if (isGridpointGeothermalOverlap) {
        overlaps += 1;
    }
}

console.log(`Answer: ${overlaps}`);
