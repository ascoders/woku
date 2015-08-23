ctrl.$onEnter = function (param, rs, rj) {
    document.title = '首页'
    avalon.vmodels.global.menu.current = 'app.home'
}

ctrl.$onRendered = function () {

}
