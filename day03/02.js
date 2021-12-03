let fs = require('fs');

let inputData = fs.readFileSync("input.txt", "utf8");

let listList = inputData.split("\n")
.map(x=>x.split(""))
.map(x=>x.map(y=>Number(y)));

const mostFreq = (listCount,posSum) => (posSum < (listCount/2)) ? 0 : 1;

const leastFreq = (listCount,posSum) => (posSum < (listCount/2)) ? 1 : 0;

function countFreq(listList,pos,evaluator) {
  const listCount = listList.length;
  let posSum = listList.reduce((acc,v)=>acc+v[pos], 0);
  return evaluator(listCount,posSum);
};

function filterList(listList,evaluator) {
  let pos = 0;
  while (listList.length > 1) {
    let importantNumber = countFreq(listList,pos,evaluator);
    listList = listList.filter(list=>list[pos]==importantNumber);
    pos++;
  };
  return listList[0];
};

function countResult(listList) {
  console.log("data items: "+listList.length);
  let oxygenBi = filterList(listList,mostFreq).join("");
  let CO2Bi = filterList(listList,leastFreq).join("");
  console.log("oxygen: "+oxygenBi);
  console.log("CO2:    "+CO2Bi);
  let oxygenDec = parseInt(oxygenBi,2);
  let CO2Dec = parseInt(CO2Bi, 2);
  console.log("life support rating: " + oxygenDec * CO2Dec)
};

countResult(listList);