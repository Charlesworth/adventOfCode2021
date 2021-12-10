import { readFileSync } from 'fs';

console.log('Advent of code: day 4, part 2');

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

interface BingoBoard {
    rows: BingoRow[];
    hasWon: boolean;
}
const newBingoBoard = (bingoBoardLines: string[]): BingoBoard => { 
    return {
        rows: bingoBoardLines.map(bingoBoardLine => newBingoRow(bingoBoardLine)),
        hasWon: false,
    };
}
const markBoard = (board: BingoBoard, calledNumber: number) => {
    for (let row of board.rows) {
        for (let bingoNumber of row) {
            if (bingoNumber.value == calledNumber) bingoNumber.marked = true;
        }
    }
}
const isWinngingBoard = (board: BingoBoard): boolean => {
    for (const row of board.rows) {
        if (row.every(bingoNumber => bingoNumber.marked == true)) return true;
    }

    for (let i = 0; i < 5; i++) {
        if (board.rows[0][i].marked && board.rows[1][i].marked && board.rows[2][i].marked && board.rows[3][i].marked && board.rows[4][i].marked) return true;
    }

    return false;
}
const getScore = (board: BingoBoard, calledNumber: number): number => {
    let scoreSum = 0
    for (const row of board.rows) {
        for (const bingoNumber of row) {
            if (!bingoNumber.marked) scoreSum += bingoNumber.value
        }
    }
    return scoreSum * calledNumber;
}


const getWinningScores = (input: string[]): number[] => {
    let winningScores: number[] = [];
    const pickedNumbers: number[] = bingoInput[0].split(',').map(valStr => Number.parseInt(valStr, 10));
    
    let bingoBoards: BingoBoard[] = [];
    const bingoBoardLines: string[] = bingoInput.slice(2).filter(line => line != "");
    for (let i = 0; i < bingoBoardLines.length; i += 5) {
        bingoBoards.push(newBingoBoard(bingoBoardLines.slice(i, i+5)));
    }
    
    for (let pickedNumber of pickedNumbers) {
        for (let bingoBoard of bingoBoards) {
            if (!bingoBoard.hasWon) {
                markBoard(bingoBoard, pickedNumber);
                if (isWinngingBoard(bingoBoard)) {
                    bingoBoard.hasWon = true;
                    winningScores.push(getScore(bingoBoard, pickedNumber));
                }
            }
        }
    }
    
    return winningScores;
}

const bingoInput: string[] = readFileSync('./inputs/day4/part1', 'utf-8').split("\n");
const lastWinningScore = getWinningScores(bingoInput).pop();
console.log(`Final winning score ${lastWinningScore}`);
