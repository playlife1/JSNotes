//主模块（主模块不需要导出）
define(function (require) {

    //导入 module1
    let module1 = require('./module1');
    console.log(module1.foo1());  //执行foo1函数后，将返回值打印

    //导入 module4
    let module4 = require('./module4');
    module4.foo4();

});

