// 创建app表单
var appForm

// 创建app模态框
var appModal

// 页面初始化
function init() {
    appForm = $('#j-create-app-modal .ui.form');
    appForm.form({
        fields: {
            name: {
                identifier: 'name',
                rules: [{
                    type: 'empty',
                    prompt: '<i class="bookmark icon"></i>应用名称：请填写'
                }, {
                    type: 'minLength[2]',
                    prompt: '<i class="bookmark icon"></i>应用名称：至少2位'
                }, {
                    type: 'maxLength[10]',
                    prompt: '<i class="bookmark icon"></i>应用名称：最多10位'
                }]
            },
            path: {
                identifier: 'path',
                optional: true,
                rules: [{
                    type: 'minLength[2]',
                    prompt: '<i class="linkify icon"></i>应用地址：至少2位'
                }, {
                    type: 'maxLength[10]',
                    prompt: '<i class="linkify icon"></i>应用地址：最多10位'
                }]
            }
        }
    })
}

// 监听
function listen() {
    menuAutoColor()
    showCreateApp()
    customPath()
}

// 导航栏变色
function menuAutoColor() {
    $(window).scroll(function () {
        if ($(document).scrollTop() > $('#j-head').offset().top + $('#j-head').height()) {
            if (avalon.vmodels.global.menu.dark) {
                avalon.vmodels.global.menu.dark = false
            }
        } else {
            if (!avalon.vmodels.global.menu.dark) {
                avalon.vmodels.global.menu.dark = true
            }
        }
    })
}

// 创建按钮点击后弹出模态框
function showCreateApp() {
    $('#j-create-app').click(function () {
        appModal = $('#j-create-app-modal')
        appModal.modal({
            blurring: true,
            onApprove: function () {
                appForm.form('validate form')

                // 如果验证不通过，窗口不关闭
                if (!appForm.form('is valid')) {
                    return false
                }

                // 提交按钮loading
                $('#j-create-app-modal .actions .ok').addClass('loading')

                var name = appForm.find('input[name="name"]').val()
                var path = appForm.find('input[name="path"]').val()

                // 如果path为空，则与name相同
                if (path === '') {
                    path = name
                }

                // 创建新app
                wk.post({
                    url: '/api/apps',
                    data: {
                        name: name,
                        path: path
                    },
                    done: function () {
                        wk.notice(vm.name + ' 已创建成功！', 'green')

                        // 跳转到游戏首页
                        avalon.router.navigate('/app/' + path)
                    },
                    fail: function (message) {
                        var errorMessage = message

                        if (message.indexOf('Duplicate') > -1 && message.indexOf('name') > -1 && message.indexOf(name) > -1) {
                            errorMessage = '应用名称 ' + name + ' 已被占用'
                        }

                        if (message.indexOf('Duplicate') > -1 && message.indexOf('path') > -1 && message.indexOf(path) > -1) {
                            errorMessage = '应用路径 ' + path + ' 已被占用'
                        }

                        // 未登录
                        if (errorMessage === '未登录') {
                            errorMessage = '未登录 <a href="/auth/login" router>立即登录</a>'
                        }

                        appForm.form("add errors", [errorMessage])
                        appForm.addClass('error')
                    },
                    always: function () {
                        // 提交按钮unloading
                        $('#j-create-app-modal .actions .ok').removeClass('loading')
                    }
                })

                // 不会自动关闭
                return false
            }
        }).modal('show')
    })
}

// 自定义路径复选框回调
function customPath() {
    $('#j-custom-path').checkbox({
        onChecked: function () {
            vm.customPath = true
        },
        onUnchecked: function () {
            vm.customPath = false
        }
    })
}

ctrl.$onEnter = function (param, rs, rj) {
    document.title = '我酷游戏'
    avalon.vmodels.global.menu.current = ''
    avalon.vmodels.global.menu.dark = true
}

ctrl.$onRendered = function () {
    init()
    listen()
}

ctrl.$onBeforeUnload = function () {
    // 菜单变白色
    avalon.vmodels.global.menu.dark = false

    // 关闭模态框
    if (appModal) {
        appModal.modal('hide')
    }
}
