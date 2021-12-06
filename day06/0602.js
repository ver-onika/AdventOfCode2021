let fs = require('fs');
const { off } = require('process');

const inputData = fs.readFileSync("input06.txt", "utf8");
// const inputData = fs.readFileSync("sampleInput06.txt", "utf8");

let fishList = inputData.split(",").map(z=>Number(z));

function dayIncrease(fishMap) {
  let newFishMap = [0,0,0,0,0,0,0,0,0];
  for (let i = fishMap.length-1; i >= 0 ; i--) {
    if (i == 0) {
      newFishMap[8] += fishMap[0];
      newFishMap[6] += fishMap[0];
    } else {
      newFishMap[i-1] += fishMap[i];
    };
  };
  return newFishMap;
};

function fishLife(fishList,days) {
  let fishMap = [0,0,0,0,0,0,0,0,0];

  for (fish of fishList) {
    fishMap[fish] = fishMap[fish] ? fishMap[fish]+1 : 1;
  };

  for (i = 0; i < days; i++) {
    fishMap = dayIncrease(fishMap);
  };
  console.log(countFish(fishMap));
};

function countFish(fishMap) {
  return fishMap.reduce((sum, f) => sum + f, 0);
};

fishLife(fishList,256);