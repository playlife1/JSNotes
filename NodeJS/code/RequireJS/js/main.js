
requirejs.config({
    //baseUrl: 'js/',     //基本路径
    paths: {    //配置路径
        myDataService: './modules/dataService',
        myAlerter: './modules/alerter'
    }
});

requirejs(['myAlerter'], function (alerter) {
    alerter.showMsg();
})();