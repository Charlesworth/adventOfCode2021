import { readFileSync } from 'fs';

console.log('Advent of code: day 2, part 1');

interface Command {
    instruction: string;
    value: number;
}

const commands: Command[] = readFileSync('./inputs/day2/part1', 'utf-8')
    .split("\n")
    .map(cmdStr => {
        let [instruction, valStr] = cmdStr.split(" ");
        let val = Number.parseInt(valStr, 10)
        return {instruction: instruction, value: val};
    });

let horizontalPosition = 0;
let depth = 0;
let aim = 0;

commands.forEach(command => {
    switch (command.instruction) {
        case "forward":
            horizontalPosition += command.value;
            depth += aim * command.value;
            return;
        case "down":
            aim += command.value;
            return;
        case "up":
            aim -= command.value;
            return;
        default:
            console.error(`Unexpected instruction "${command.instruction}"`)
    }
})

console.log(`Answer: ${horizontalPosition * depth}`);
