let uniq = require('uniq');
let mod1 = require('./modules/mod1');
let mod2 = require('./modules/mod2');
let mod3 = require('./modules/mod3');
mod1.foo();
mod2()
mod3.fn1();
mod3.fn2()
uniq(mod3.arr)
console.log(mod3.arr);