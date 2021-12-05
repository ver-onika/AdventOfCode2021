let fs = require('fs');

const inputData = fs.readFileSync("input05.txt", "utf8");

// get endpoints
let endpoints = inputData.split("\n")
.map(x=>x
  .split(" -> ")
  .map(z=>z.split(",").map(z=>Number(z)))
  // .map(z=>z.map(z=>Number(z)))
);

// fitler only horizontal, vertical and diagonal lines
function filterEndpoints(endpoints) {
  endpoints = endpoints.filter(x=>
    (x[0][0]==x[1][0]
    || x[0][1]==x[1][1]
    || Math.abs(x[0][0]-x[1][0]) == Math.abs(x[0][1]-x[1][1])));
  return endpoints;
};

// count range between two numbers
function range(x1,x2) {
  let pointList = [];
  if (x1 <= x2) {
    for (let i = x1; i <= x2; i++) {
      pointList.push(i);
    }
  } else {
    for (let i = x1; i >= x2; i--) {
      pointList.push(i);
    }
  };
  return pointList;
};

// count all points of the line between endpoints
function countIntervalPoints() {
  //first endpoint
  let [x1,y1] = pair[0];
  // second endpoint
  let [x2,y2] = pair[1];

  let xs = range(x1,x2);
  let ys = range(y1,y2);
  let line = [];
  // merge coordinates
  if (xs.length == 1 || ys.length == 1) {
    for (let i = 0; i < xs.length; i++) {
      for (let j = 0; j < ys.length; j++) {
        line.push([xs[i],ys[j]]);
      };
    };
  } else {
    for (let i = 0; i < xs.length; i++) {
        line.push([xs[i],ys[i]]);
    };
  };
  return line;
};

function findVents(endpoints) {
  // filter only horizontal and vertical (not diagonal) lines
  endpoints = filterEndpoints(endpoints);

  // list of all point of all lines
  let allPoints = [];

  // for each pair count all points of line
  for (pair of endpoints) {
    allPoints.push(countIntervalPoints(pair));
  };
  // count each point currence
  let freqs = {};
  for (point of allPoints.flat(1)) {
    freqs[point] = freqs[point] ? freqs[point]+1 : 1;
  };
  // count points occuring more than 2×
  let result = Object.values(freqs).filter(x=>x>=2).length;
  console.log(result);
  
};

findVents(endpoints);