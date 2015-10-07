'use strict';

const _ = require('lodash');
const format = require('util').format;

class Matrix {
  constructor(array) {
    this.matrix = array;
    this.height = array.length;
    this.width = array[0].length;
  }

  toString() {
    let s = [];
    for (let i = 0; i < this.matrix.length; i++) {
      s.push(this.matrix[i].join(', '));
    }
    return s.join('\n');
  }

  transpose() {
    let t = [];
    for (let i = 0; i < this.height; i++) {
      t[i] = [];
      for (let j = 0; j < this.width; j++) {
        t[i][j] = this.matrix[j][i];
      }
    }
    return new Matrix(t);
  }

  transpose_functional() {
    let a = this.matrix;

    let t = a[0].map((x, i) => {
      return a.map((y) => {
        return y[i];
      });
    });

    return new Matrix(t);
  }

  multiply(other) {
    if (this.width != other.height) {
      throw new Error(format('this width (%d) does not equal the other\'s height (%d)'),
        this.width, other.height);
    }

    let r = [];
    for (let i = 0; i < this.height; i++) {
      r[i] = [];

      for (let j = 0; j < other.width; j++) {
        let sum = 0;

        for (let k = 0; k < this.width; k++) {
          sum += this.matrix[i][k] * other.matrix[k][j];
        }

        r[i][j] = sum;
      }
    }

    return new Matrix(r);
  }

}


// ==========================================
// tests
// ==========================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const assert = require('assert');

describe('matrix transpose tests', function () {
  this.timeout(30 * 1000);

  const tests = [
    {
      m: [
        [1, 1, 1, 1],
        [2, 4, 8, 16],
        [3, 9, 27, 81],
        [4, 16, 64, 256]

      ], expect: [
      [1, 2, 3, 4],
      [1, 4, 9, 16],
      [1, 8, 27, 64],
      [1, 16, 81, 256]

    ]
    }
  ];

  tests.forEach(test => {
    it('should transpose matrix', function () {
      let m = new Matrix(test.m);
      let expect = new Matrix(test.expect);
      //let actual = m.transpose();
      let actual = m.transpose_functional();
      console.log('matrix: \n%s\n', m.toString());
      console.log('expect: \n%s\n', expect.toString());
      console.log('actual: \n%s\n', actual.toString());
      assert(_.eq(actual, expect), '%s\n\n  =>\n %s\n\nExpected:\n%s',
        m.toString(), actual.toString(), expect.toString());
    });
  });

});

describe('matrix multiple tests', function () {
  this.timeout(30 * 1000);

  const tests = [
    {
      a: [
        [1, 2],
        [3, 4]
      ],
      b: [
        [-3, -8, 3],
        [-2, 1, 4]
      ],
      expect: [
        [-7, -6, 11],
        [-17, -20, 25]

      ]
    },
    {
      a: [
        [1, 2],
        [3, 4],
        [5, 6]
      ],
      b: [
        [7, 8, 9],
        [10, 11, 12]
      ],
      expect: [
        [27, 30, 33],
        [61, 68, 75],
        [95, 106, 117]
      ]
    }
  ];

  it ('should not multply matrices with incompatible sizes', () => {
    let a = new Matrix(tests[0].a);
    let b = new Matrix([[1, 2]]);

    assert.throws(() => {
      a.multiply(b);
    }, Error);
  });

  tests.forEach(test => {
    it('should multiply matrix', function () {
      let a = new Matrix(test.a);
      let b = new Matrix(test.b);
      let expect = new Matrix(test.expect);
      let actual = a.multiply(b);

      console.log('matrix a: \n%s\n', a.toString());
      console.log('matrix b: \n%s\n', b.toString());
      console.log('expect: \n%s\n', expect.toString());
      console.log('actual: \n%s\n', actual.toString());

      assert(_.eq(actual, expect), format('\na:\n%s\nb:\n%s\n\nActual =>\n%s\n\nExpected:\n%s',
        a.toString(), b.toString(), actual.toString(), expect.toString()));
    });
  });

});

mocha.run();