ctrl.$onEnter = function (param, rs, rj) {
    document.title = '管理 - 导航栏'

    avalon.vmodels['app/base/manage'].type = param.type
}

ctrl.$onRendered = function () {

}
