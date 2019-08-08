const assert = require('assert');
const fn = require('./fn');

/**
 * Test de la solution de la partie 1
 */
const example_input_1 = [
    [5, 1, 9, 5],
    [7, 5, 3],
    [2, 4, 6, 8]
];
const example_result_1 = fn.reducer_simple(example_input_1);
assert.equal(example_result_1, 18, `The result for the example 1 should be 18 instead of ${example_result_1}`);

/**
 * Test de la solution de la partie 2
 */
const example_input_2 = [
    [5, 9, 2, 8],
    [9, 4, 7, 3],
    [3, 8, 6, 5]
];
const example_result_2 = fn.reducer_hard(example_input_2);
assert.equal(example_result_2, 9, `The result for the example 2 should be 9 instead of ${example_result_2}`);