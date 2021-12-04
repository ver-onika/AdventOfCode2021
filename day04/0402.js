const drawnNumbers = [10,80,6,69,22,99,63,92,30,67,28,93,0,50,65,87,38,7,91,60,57,40,84,51,27,12,44,88,64,35,39,74,61,55,31,48,81,89,62,37,94,43,29,14,95,8,78,49,90,97,66,70,25,68,75,45,42,23,9,96,56,72,59,32,85,3,71,79,18,24,33,19,15,20,82,26,21,13,4,98,83,34,86,5,2,73,17,54,1,77,52,58,76,36,16,46,41,47,11,53];

let fs = require('fs');

const inputData = fs.readFileSync("input04.txt", "utf8");

// get initial boards
let boards = inputData.split("\n\n")
.map(x=>x
  .split("\n")
  .map(y=>y.split(" "))
  .map(y=>y.filter(z=>z!=""))
  .map(z=>z.map(z=>Number(z)))
);

// the ongoing last winning results
let lastWinningBoard = null;
let lastDrawnNumber = null;
let lastWinningResult = [];

// cross out the drawn numbers on all boards
function draw(boards,number) {
  boards = boards.map(x=>x
    .map(y=>y
      .map(z=>(z==number ? "x" : z))
    )
  );
  return boards;
};

// evaluate wheather all numbers in the row are already crossed out and if so, return that board
function evaluateRows (board) {
  for (row of board) {
    if (row.every(x=>x=="x")) {
      return board;
    }
  };
};

// evaluate all boards: rows and then columns
function roundResult(boards,number) {
  for (board of boards) {
    // evaluate rows
    if (evaluateRows(board)) {
      lastWinningBoard = board;
      lastWinningResult = countFinalResult(lastWinningBoard,number);
      // remove the winning board from boards
      boards = boards.filter(board=>board!=lastWinningBoard);
    };
    // transform columns to rows and evaluate
    let transposedBoard = [[],[],[],[],[]];
    for (let i=0; i < 5; i++) {
      for (let j=0; j < 5; j++) {
        transposedBoard[i][j] = board[j][i]
      }
    };
    if (evaluateRows(transposedBoard)) {
      lastWinningBoard = board;
      lastWinningResult = countFinalResult(lastWinningBoard,number);
      // remove the winning board from boards
      boards = boards.filter(board=>board!=lastWinningBoard);
    };
  };
  return boards;  
};

// multiply drawn number and sum of left number from the winners board
function countFinalResult(winner,number) {
  let sum = winner.flat().filter(Number.isInteger).reduce((acc,n)=>acc+n,0);
  return sum * number;
};

// start bingo game with all boards and numbers to be drawn as input
function play(boards,drawnNumbers) {
  for (number of drawnNumbers) {
    boards = draw(boards,number);
    boards = roundResult(boards,number);
    console.log("the last drawn number: " + number);
    console.log("winners final board: " + lastWinningBoard);
    console.log("result: "+lastWinningResult);
  };
};

play(boards,drawnNumbers);