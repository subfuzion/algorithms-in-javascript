Algorithms in JavaScript
========================

There are a lot of algorithm examples out there in C/C++, Java, etc. This is a collection of algorithms in JavaScript
that can be easily tested on your system or using an online environment like [CoderPad](https://coderpad.io/). Each
module is completely self-contained: it contains an algorithm implementation and verification tests. 

Run tests

```
npm install
npm test
```

Test individual modules:

```
npm install
npm install -g mocha
mocha src/<filename>
```

Note that modules include the following:

```
const Mocha = require('mocha');
const mocha = new Mocha();
mocha.suite.emit('pre-require', this, '', mocha);
```

This is required to work with CodePad (https://coderpad.io/languages#javascript).


