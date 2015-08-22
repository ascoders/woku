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
}

// app表单
var appForm

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
        $('#j-create-app-modal').modal({
            blurring: true,
            onApprove: function () {
                appForm.form('validate form')

                // 如果验证不通过，窗口不关闭
                if (!appForm.form('s valid')) {
                    return false
                }

                // 创建新app
                wk.post({
                    url: '/api/apps',
                    data: {
                        name: vm.name,
                        path: vm.path,
                        type: vm.type
                    },
                    success: function () {
                        wk.notice(vm.name + ' 已创建成功！', 'green')

                        // 跳转到游戏首页
                        avalon.router.navigate('/a/' + vm.path)
                    }
                })
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
