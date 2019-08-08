const input = require('./input');

let done = false;
let frequencies = {};
let array = [...input];
let lastFrequency = 0;
let finalFrequency;
while (!done) {
    if(array.length === 0) {
        array = [...input];
    }
    let nextFrequency = lastFrequency + array[0];
    if(frequencies[nextFrequency]) {
        finalFrequency = nextFrequency;
        done = true;
    } else {
        frequencies[nextFrequency] = true;
        lastFrequency = nextFrequency;
        array.shift();
    }
}
console.log(finalFrequency);
