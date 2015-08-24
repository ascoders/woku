// 监听
function listen() {
    // 【控制按钮】是否允许访问
    $('#j-gate-checkbox').checkbox({
        onChecked: function () {
            console.log($(this))
            $('#j-gate-label').text('允许访问')
        },
        onUnchecked: function () {
            $('#j-gate-label').text('禁止访问')
        }
    })
}

ctrl.$onEnter = function (param, rs, rj) {
    document.title = '管理'

    // 设置分类
    avalon.vmodels['app/base/manage'].type = ''
}

ctrl.$onRendered = function () {
    listen()
}
