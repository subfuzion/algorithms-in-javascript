'use strict';

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const _ = require('lodash');
const assert = require('assert');
const format = require('util').format;

module.exports = function(sortFunc, name) {

  const sortFuncName = name || 'sort';

  describe(format('%s tests', sortFuncName), () => {
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
      let f = sortFunc;

      let descr = format('%s([%s]) => [%s]\n'
        + '--------------------------------------------',
        sortFuncName, test.v, test.expect);

      it (descr, () => {
        let actual = f(test.v);
        assert(_.eq(actual, test.expect), format('FAIL: actual = [%s]', actual));
      });

    });
  });

  mocha.run();
};

