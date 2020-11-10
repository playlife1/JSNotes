//定义有依赖的模块
define(['myDataService'], function (dataService) {
    let msg = '我是 aleter.js中的内容';
    function showMsg() {
        console.log(dataService.getName());  //调用了 myDataService 模块中的内容
        console.log(msg);
    }

    //暴露模块
    return { showMsg };

});