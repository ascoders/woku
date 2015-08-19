ctrl.$onEnter = function (param, rs, rj) {
    // 隐藏公共菜单
    avalon.vmodels.global.menu.show = false

    // 获取基础数据
    wk.get({
        url: '/api/apps/' + param.path,
        success: function (data) {
            vm.app = data
        }
    })
}

ctrl.$onRendered = function () {

}

ctrl.$onBeforeUnload = function () {
    // 显示公共菜单
    avalon.vmodels.global.menu.show = true
}
