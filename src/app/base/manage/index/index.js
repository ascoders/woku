// 监听
function listen() {
    // 【控制按钮】是否允许访问
    $('#j-gate-checkbox').checkbox({
        onChecked: function () {
            serviceGate(true)
        },
        onUnchecked: function () {
            serviceGate(false)
        }
    })
}

// 请求资源 是否允许访问
function serviceGate(isOpen) {
    wk.notice({
        title: '访问控制',
        content: '操作失败，请稍后再试'
    })
    wk.patch({
        url: '/api/apps/' + avalon.vmodels['app/base'].app.id,
        data: {
            gate: isOpen
        },
        done: function () {
            avalon.vmodels['app/base'].app.gate = isOpen
        },
        fail: function () {
            wk.notice({
                title: '访问控制',
                content: '操作失败，请稍后再试'
            })
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
