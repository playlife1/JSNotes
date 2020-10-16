//定义没有依赖的模块
define(function (require, exports, module) {
    let data = '我是 module3 中的内容';
    function foo3() {
        console.log(data);
    }

    //暴露模块
    exports.module3 = { foo3 }; //可以理解成：给 export 对象暴露了 module3 这个属性，这个属性里有foo3 这个函数。
});
