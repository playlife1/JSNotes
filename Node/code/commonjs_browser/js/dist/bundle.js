(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
let mod1 = require('./mod1');
let mod2 = require('./mod2');
let mod3 = require('./mod3');
mod1.foo();
mod2();
mod3.fn1();
mod3.fn2();

},{"./mod1":2,"./mod2":3,"./mod3":4}],2:[function(require,module,exports){

module.exports = {
    name:'我是mod1',
    foo(){
        console.log(this.name);
    }
    
}
},{}],3:[function(require,module,exports){
module.exports= ()=>{
    console.log('我是mod2');
}

},{}],4:[function(require,module,exports){
exports.fn1 = () => {
    console.log('mod3里面的fn1');
};
exports.fn2 = () => {
    console.log('mod3里面的fn2');
};


},{}]},{},[1]);
