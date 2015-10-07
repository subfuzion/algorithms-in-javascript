'use strict';

function dump(v) {
  console.log(v);
}

// average, worst, best case: O(n^2)
// despite O(n^2), more efficient than bubble or
// selection sort in practice
//
// every repetition of sort removes an element from input data,
// inserts it into the correct position in already sorted list,
// until no input elements remain.
//
// After k iterations, the first k + 1 elements are sorted
//
// adaptive - if input data is (partially) presorted, insertion
// sort takes O(n+d) where d is number of inversions
//
// stable - maintains relative order in data if keys are same
//
// best used when data is nearly sorted or input size is small
// used as the recursive base case (when problem size is small)
// for higher overhead divide-and-conquer sorting algorithms,
// such as merge and quick sort.
function insertionsort(v) {
  if (!v || !v.length) return v;

  dump(v);
  let j, x;

  for (let i = 1; i <= v.length - 1; i++) {
    x = v[i];
    j = i;

    while (v[j-1] > x && j >= 1) {
      v[j] = v[j-1];
      j--;
    }

    v[j] = x;

    dump(v);
  }

  return v;
}

// ===========================================
// TESTS
// ===========================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const _ = require('lodash');
const assert = require('assert');
const format = require('util').format;

describe('insertionsort tests', () => {
  const tests = [
    { v: [], expect: [] },
    { v: [1], expect: [1] },
    { v: [1, 2], expect: [1, 2] },
    { v: [2, 1], expect: [1, 2] },
    { v: [1, 2, 3], expect: [1, 2, 3] },
    { v: [2, 3, 1], expect: [1, 2, 3] },
    { v: [2, 4, 3, 1], expect: [1, 2, 3, 4] },
    { v: [5, 2, 4, 3, 1], expect: [1, 2, 3, 4, 5] },
    { v: [2, 4, 3, 1, 6, 5, 7], expect: [1, 2, 3, 4, 5, 6, 7] },
    { v: [1, 2, 3, 4, 5, 6, 7], expect: [1, 2, 3, 4, 5, 6, 7] },
    { v: [7, 6, 5, 4, 3, 2, 1, 0], expect: [0, 1, 2, 3, 4, 5, 6, 7] },
  ];

  tests.forEach(test => {
    let f = insertionsort;
    let descr = format('f([%s]) => [%s]\n'
      + '--------------------------------------------',
      test.v, test.expect);
    let actual;

    it (descr, () => {
      actual = f(test.v);
      assert(_.eq(actual, test.expect), format('FAIL: [%s]', test.v));
    });

  });
});

mocha.run();