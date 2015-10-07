'use strict';

// https://developer.mozilla.org/en-US/demos/detail/tower-of-hanoi-in-javascript
// http://zylla.wipos.p.lodz.pl/games/hf.html


function hanoi(n, from, to, via) {
  function _move(from, to) {
    console.log('%s -> %s', from, to);
  }

  if (n == 0) return;

  hanoi(n-1, from, via, to);
  _move(from, to);
  hanoi(n-1, via, to, from);
}

hanoi(2, ' src ', ' dst ', ' aux ');

