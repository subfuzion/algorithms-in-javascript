'use strict';

class Node {
  constructor(data) {
    this._data = data;
  }

  get data() {
    return this._data;
  }

  get next() {
    return this._next;
  }

  length() {
    let length = 1;
    let current = this;
    while(current.next) {
      length++;
      current = current.next;
    }
    return length;
  }

  toArray() {
    let v = [];
    let current = this;
    while (current) {
      v.push(current.data);
      current = current.next;
    }
    return v;
  }

  insert(data, index) {
    let node = new Node(data);

    if (index == 0) {
      // insert before this
      node._next = this;
      return node;
    }

    let current = this;
    let last = this;
    let i;

    for (i = 0; i < index && current; i++) {
      last = current;
      current = current.next;
    }

    if (i < index) {
      throw new Error('error: index exceeds list length');
    }

    last._next = node;
    node._next = current;
    return node;
  }

  detectCycle() {
    let tortoise = this;
    let hare = this;

    while (hare) {
      hare = hare.next;
      if (!hare) break;

      hare = hare.next;
      tortoise = tortoise.next;
      if (hare == tortoise) return true;
    }

    return false;
  }

  detectStartOfCycle() {
    let tortoise = this;
    let hare = this;

    while (hare && tortoise) {
      hare = hare.next;
      if (!hare) return;

      hare = hare.next;
      tortoise = tortoise.next;

      if (hare == tortoise) break;
    }

    if (hare == tortoise) {
      // reset tortoise to head of list
      tortoise = this;

      while (tortoise != hare) {
        tortoise = tortoise.next;
        hare = hare.next;
      }

      return tortoise;
    }
  }

  reverse() {
    function _rev(node, next) {
      if (!next) return node;
      let head = _rev(next, next.next);
      next._next = node;
      node._next = null;
      return head;
    }

    return _rev(this, this.next);
  }
}

// ==================================
// tests
// ==================================

const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);

const _ = require('lodash');
const assert = require('assert');
const format = require('util').format;

describe('tests', () => {

  it ('should return length=1', () => {
    let n = new Node('a');
    assert.equal(n.length(), 1);
  });

  it ('should insert 2 before 1', () => {
    let head = new Node(1);
    head = head.insert(2, 0);

    assert(_.eq(head.toArray(), [2, 1]))
    assert.equal(head.length(), 2);
  });

  it ('should insert 2 after 1', () => {
    let head = new Node(1);
    head.insert(2, 1);

    let actual = head.toArray();
    let expect = [1,2];

    assert(_.eq(actual, expect),
      format('actual: [%s], expected: [%s]', actual, expect));
    assert.equal(head.length(), 2);
  });

  it ('should not insert 2 past end of list', () => {
    let head = new Node(1);

    assert.throws(() => {
      head.insert(2, 2);
    }, Error);

  });

  it ('should not detect cycle', () => {
    let head = new Node(1);
    head.insert(2, head.length());
    head.insert(3, head.length());
    head.insert(4, head.length());
    head.insert(5, head.length());
    head.insert(6, head.length());
    head.insert(7, head.length());

    let actual = head.detectCycle();
    assert.equal(actual, false);
  });

  it ('should detect cycle', () => {
    let head = new Node(1);
    head.insert(2, head.length());
    head.insert(3, head.length());
    let a = head.insert(4, head.length());
    head.insert(5, head.length());
    head.insert(6, head.length());
    let b = head.insert(7, head.length());

    // create cycle
    b._next = a;

    let actual = head.detectCycle();
    assert.equal(actual, true);
  });

  it ('should detect start of cycle', () => {
    let head = new Node(1);
    head.insert(2, head.length());
    head.insert(3, head.length());
    let a = head.insert(4, head.length());
    head.insert(5, head.length());
    head.insert(6, head.length());
    let b = head.insert(7, head.length());

    // create cycle
    b._next = a;

    let actual = head.detectStartOfCycle();
    assert.equal(actual.data, 4);
  });


  it ('should reverse the list', () => {
    let head = new Node(1);
    head.insert(2, head.length());
    head.insert(3, head.length());
    head.insert(4, head.length());
    head.insert(5, head.length());

    head = head.reverse();
    let actual = head.toArray();
    assert(_.eq(actual, [5,4,3,2,1]));
  })

});


mocha.run();
