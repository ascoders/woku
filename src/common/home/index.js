ctrl.$onEnter = function (param, rs, rj) {
    document.title = '我酷游戏'
    avalon.vmodels.global.menu.current = ''
    avalon.vmodels.global.menu.dark = true
}

ctrl.$onRendered = function () {
    initCreateAppForm()
    initCreateAppModal()
    listen()
}

ctrl.$onBeforeUnload = function () {
    // 菜单变白色
    avalon.vmodels.global.menu.dark = false
}
