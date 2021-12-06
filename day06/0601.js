let fs = require('fs');
const { off } = require('process');

const inputData = fs.readFileSync("input06.txt", "utf8");

let fishList = inputData.split(",").map(z=>Number(z));

function dayIncrease(fishList) {
  let newFishList = [];
  for (fish of fishList) {
    if (fish == 0) {
      newFishList.push(8);
      newFishList.push(6);
    } else {
      newFishList.push(--fish);
    };
  };
  return newFishList;
};

function fishLife(fishList,days) {
  for (i = 0; i < days; i++) {
    fishList = dayIncrease(fishList);
    console.log(`day ${i}: ` + fishList.length);
  };
  console.log(fishList.length);
};

fishLife(fishList,256);