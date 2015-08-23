ctrl.$onEnter = function (param, rs, rj) {
    document.title = '管理'
    avalon.vmodels.global.menu.current = 'app.manage'

    // 设置分类
    vm.type = mmState.query.type
}

ctrl.$onRendered = function () {

}
