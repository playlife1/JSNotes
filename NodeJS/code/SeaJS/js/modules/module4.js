//定义有依赖的模块
define(function (require, exports, module) {
    let name = '我是 module4 中的内容';

    //同步的方式引入 module2
    let myModule2 = require('./module2');
    myModule2();

    //异步的方式引入 module3
    require.async('./module3', function (myModule3) {
        myModule3.module3.foo3();
    });

    function foo4() {
        console.log(name);
    }

    exports.foo4 = foo4;
})