ctrl.$onEnter = function (param, rs) {
    // 隐藏公共菜单
    avalon.vmodels.global.menu.show = false

    // 隐藏页尾
    avalon.vmodels.global.footer.show = false

    // 获取基础数 据
    wk.get({
        url: '/api/apps/' + param.path,
        done: function (data) {
            vm.app = data

            // 如果禁止访问，且用户不是owner，跳转到不存在的页面
            $.when(avalon.vmodels.global.$myDeferred).done(function () {
                if (!vm.app.gate && avalon.vmodels.global.my.info.id !== vm.app.owner) {
                    avalon.router.navigate('/404')
                    return
                }

                rs()
            })
        }
    })

    return false
}

ctrl.$onRendered = function () {

}

ctrl.$onBeforeUnload = function () {
    // 显示公共菜单
    avalon.vmodels.global.menu.show = true

    // 显示页尾
    avalon.vmodels.global.footer.show = true
}
