ctrl.$onEnter = function (param, rs, rj) {
    document.title = '管理'

    // 设置分类
    avalon.vmodels['app/base/manage'].type = ''
}

ctrl.$onRendered = function () {

}
