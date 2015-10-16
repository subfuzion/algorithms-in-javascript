'use strict';


function f(n) {
  return n;
}

// ===============================================
// TESTS
// ===============================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');
const format = require('util').format;
const _ = require('lodash');

describe('tests', () => {

  const tests = [
    { n: 1, expect: 1 },
    { n: 2, expect: 2}
  ];

  tests.forEach(test => {
    let descr = format('n = %d', test.n);
    it(descr, () => {
      let expect = test.expect;
      let actual = f(test.n);
      assert(_.isEqual(actual, expect));
    });
  });

});

mocha.run();


