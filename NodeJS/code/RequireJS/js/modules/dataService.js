//定义没有依赖的模块
define(function () {
    let name = '我是 dataService.js中的内容';
    function getName() {
        return name;
    }

    //暴露模块
    return { getName };
});