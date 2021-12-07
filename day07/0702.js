let fs = require('fs');
// const { off } = require('process');

const inputData = fs.readFileSync("input07.txt", "utf8");
// const inputData = fs.readFileSync("sampleInput07.txt", "utf8");

let crabPositions = inputData.split(",").map(z=>Number(z)).sort((a,b) => a-b);

function calculateFinalPoint(crabPositions) {
  let numberOfCrabs = crabPositions.length;
  let positionsSum = (crabPositions.reduce((sum, crab) => sum + crab, 0));
  console.log("number of crabs: " + numberOfCrabs);

  // count AVERAGE
  let finalPoint = Math.round(positionsSum/numberOfCrabs)-1;

  // count MEDIAN
  // let finalPoint = null;
  // let index = null;
  // if (numberOfCrabs % 2 == 0) {
  //   index = Math.round((((numberOfCrabs)/2) + ((numberOfCrabs)/2+1)) / 2)-1;
  //   finalPoint = crabPositions[index];
  // } else {
  //   index = (numberOfCrabs+1)/2;
  //   finalPoint = crabPositions[index];
  // };
  // console.log("position of final point: " + index);
  // console.log("final position value: " + finalPoint);

  return(finalPoint);
};

function calculateConsumption(crabPositions) {
  let finalPoint = calculateFinalPoint(crabPositions);
  let consumption = 0;
  for (crab of crabPositions) {
    console.log(crab + "->" + finalPoint + "..." + (crab-finalPoint));
    let steps = Math.abs(crab-finalPoint);
    consumption += steps * (1+steps)/2;
  };
  console.log(consumption);
};

calculateConsumption(crabPositions);