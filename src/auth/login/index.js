ctrl.$onEnter = function (param, rs, rj) {
    document.title = '登陆'
    avalon.vmodels.global.menu.current = 'login'

    // 如果已登陆，返回上一级
    $.when(global.$myDeferred).done(function () { // 此时获取用户信息完毕
        if (global.myLogin) {
            return wk.jumpLastLocation()
        }
    })
}

ctrl.$onRendered = function () {
    // 帐号获取焦点
    $('input[name="account"]').focus()

    // 表单验证
    var form = $(".ui.form")

    form.form({
        fields: {
            account: {
                identifier: 'account',
                rules: [{
                    type: 'empty',
                    prompt: '<i class="user icon"></i>账号：请填写'
                }]
            },
            password: {
                identifier: 'password',
                rules: [{
                    type: 'empty',
                    prompt: '<i class="lock icon"></i>密码：请填写'
                }, {
                    type: 'minLength[6]',
                    prompt: '<i class="lock icon"></i>密码：至少6位'
                }, {
                    type: 'maxLength[30]',
                    prompt: '<i class="lock icon"></i>密码：最多30位'
                }]
            }
        },
        onSuccess: function () {
            wk.get({
                url: '/api/users/authentication',
                data: {
                    account: form.find('[name=account]').val(),
                    password: form.find('[name=password]').val()
                },
                success: function (data) {
                    avalon.vmodels.global.my.setInfo(data)
                    wk.jumpLastLocation()
                },
                error: function (message) {
                    wk.notice({
                        title: '登陆失败',
                        content: message
                    })
                }
            })
        }
    })
}
