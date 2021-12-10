import { readFileSync } from 'fs';

console.log('Advent of code 2021: day 4, part 1');

interface BingoNumber {
    value: number;
    marked: boolean;
}

type BingoRow = BingoNumber[]; 
const newBingoRow = (bingoBoardLine: string): BingoRow => { 
    return bingoBoardLine
        .split(" ")
        .filter(str => str != "")
        .map(valStr => Number.parseInt(valStr, 10))
        .map(valInt => { return { value: valInt, marked: false }; });
}

type BingoBoard = BingoRow[];
const newBingoBoard = (bingoBoardLines: string[]): BingoBoard => { 
    return bingoBoardLines.map(bingoBoardLine => newBingoRow(bingoBoardLine));
}
const markBoard = (board: BingoBoard, calledNumber: number) => {
    for (let row of board) {
        for (let bingoNumber of row) {
            if (bingoNumber.value == calledNumber) bingoNumber.marked = true;
        }
    }
}
const isWinngingBoard = (board: BingoBoard): boolean => {
    for (const row of board) {
        if (row.every(bingoNumber => bingoNumber.marked == true)) return true;
    }

    for (let i = 0; i < 5; i++) {
        if (board[0][i].marked && board[1][i].marked && board[2][i].marked && board[3][i].marked && board[4][i].marked) return true;
    }

    return false;
}
const getScore = (board: BingoBoard, calledNumber: number): number => {
    let scoreSum = 0
    for (const row of board) {
        for (const bingoNumber of row) {
            if (!bingoNumber.marked) scoreSum += bingoNumber.value
        }
    }
    return scoreSum * calledNumber;
}

const getWinningScore = (input: string[]): number => {
    const pickedNumbers: number[] = bingoInput[0].split(',').map(valStr => Number.parseInt(valStr, 10));
    
    let bingoBoards: BingoBoard[] = [];
    const bingoBoardLines: string[] = bingoInput.slice(2).filter(line => line != "");
    for (let i = 0; i < bingoBoardLines.length; i += 5) {
        bingoBoards.push(newBingoBoard(bingoBoardLines.slice(i, i+5)));
    }
    
    for (let pickedNumber of pickedNumbers) {
        for (let bingoBoard of bingoBoards) {
            markBoard(bingoBoard, pickedNumber);
            if (isWinngingBoard(bingoBoard)) {
                return getScore(bingoBoard, pickedNumber);
            }
        }
    }
    
    return -1;
}

const bingoInput: string[] = readFileSync('./inputs/day04/part1', 'utf-8').split("\n");
const winningScore = getWinningScore(bingoInput);
if (winningScore != -1)
    console.log(`Answer: ${winningScore}`);
else
    console.error("Something went wrong!")
