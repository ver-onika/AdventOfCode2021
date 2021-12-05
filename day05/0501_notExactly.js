let fs = require('fs');

const inputData = fs.readFileSync("input05.txt", "utf8");

let endpoints = inputData.split("\n")
.map(x=>x
  .split(" -> ")
  .map(z=>z.split(",").map(z=>Number(z)))
);

function filterEndpoints(endpoints) {
  endpoints = endpoints.filter(x=>(x[0][0]==x[1][0] || x[0][1]==x[1][1]))
  console.log(endpoints);
  return endpoints;
};

function countIntersection(pair1,pair2) {
    let x1 = pair1[0][0];
    let y1 = pair1[0][1];
    let x2 = pair1[1][0];
    let y2 = pair1[1][1];
    let x3 = pair2[0][0];
    let y3 = pair2[0][1];
    let x4 = pair2[1][0];
    let y4 = pair2[1][1];

    // down part of intersection point formula
  	let d1 = (x1 - x2) * (y3 - y4); // (x1 - x2) * (y3 - y4)
  	let d2 = (y1 - y2) * (x3 - x4); // (y1 - y2) * (x3 - x4)
  	let d  = (d1) - (d2);
  
  	if(d == 0) {
    	return null;
    };
  
  	// upper part of intersection point formula
  	let u1 = (x1 * y2 - y1 * x2); // (x1 * y2 - y1 * x2)
  	let u4 = (x3 * y4 - y3 * x4); // (x3 * y4 - y3 * x4)
      
  	let u2x = x3 - x4; // (x3 - x4)
  	let u3x = x1 - x2; // (x1 - x2)
  	let u2y = y3 - y4; // (y3 - y4)
  	let u3y = y1 - y2; // (y1 - y2)
  
  	// intersection point formula
  	let px = (u1 * u2x - u3x * u4) / d;
  	let py = (u1 * u2y - u3y * u4) / d;
  	
  	let p = [px, py];
  
  	return p;
};

function findVents(endpoints) {
  // filter only horizontal and vertical (not diagonal) lines
  endpoints = filterEndpoints(endpoints);
  // count intersections for each two vectors
  let vents = [];
  for (let i = 0; i<endpoints.length; i++) {
    let pair1 = endpoints[i];
    for (let j = i+1; j<endpoints.length; j++) {
      let pair2 = endpoints[j];
      console.log(pair1,pair2);
      let intersection = countIntersection(pair1,pair2);
      if (intersection) {
        vents.push(intersection.toString());
      };
    };
  };
  // count currence of each intersection
  let freqs = {};
  for (intersection of vents) {
    freqs[intersection] = freqs[intersection] ? freqs[intersection]+1 : 1;
  };
  console.log(vents);
  console.log(freqs);
};

findVents(endpoints);