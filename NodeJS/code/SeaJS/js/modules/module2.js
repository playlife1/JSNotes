//定义没有依赖的模块
define(function (require, exports, module) {
    let name = '我是 module2 中的内容';
    function foo2() {
        console.log(name);
    }

    //暴露模块
    module.exports = foo2;  //可以理解成：exports就是 foo2 这个函数
});