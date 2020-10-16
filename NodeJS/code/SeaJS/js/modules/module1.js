//定义没有依赖的模块
define(function (require, exports, module) {
    let name = '我是 module1 中的内容';
    function foo1() {
        return name;
    }
    //暴露模块
    module.exports = { foo1 };  //暴露出去的是 foo1这个函数对象
});