'use strict';

function dump(v) {
  console.log(v);
}

// O(n^2) (event in best case)
function bubblesort(v) {
  let n = v.length;
  dump(v);

  for (let pass = n - 1; pass > 0; pass--) {
    for (let i = 0; i < pass; i++) {
      if (v[i] > v[i+1]) {
        // swap to put the two in order
        let t = v[i];
        v[i] = v[i+1];
        v[i+1] = t;
      }
      dump(v);
    }
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

describe('bubblesort tests', () => {
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
    let f = bubblesort;
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