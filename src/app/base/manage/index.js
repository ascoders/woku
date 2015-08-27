ctrl.$onEnter = function (param, rs, rj) {
    document.title = '管理 - 菜单'

    avalon.vmodels.global.menu.current = 'app.manage'
}

ctrl.$onRendered = function () {

}
