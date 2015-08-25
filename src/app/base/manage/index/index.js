// 监听
function listen() {
    // 【控制按钮】是否允许访问
    $('#j-gate-checkbox').checkbox({
        onChecked: function () {
            serviceGate(true)
            $('#j-gate-label').text('允许访问')
        },
        onUnchecked: function () {
            serviceGate(false)
            $('#j-gate-label').text('禁止访问')
        }
    })
}

// 请求资源 是否允许访问
function serviceGate(isOpen) {
    wk.patch({
        url: '/api/apps/' + avalon.vmodels['app/base'].app.id,
        data: {
            gate: isOpen
        },
        done: function () {

        },
        fail: function () {

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
