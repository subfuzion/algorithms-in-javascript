'use strict';

function dump(v) {
  console.log(v);
}

function mergesort(v) {
  throw new Error('Not implemented');
}

// ===========================================
// TESTS
// ===========================================

require('../testhelpers/sorttest')(mergesort, 'mergesort');

