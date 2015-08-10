ctrl.$onEnter = function (param, rs, rj) {
	document.title = '登陆'
	avalon.vmodels.global.menuName = 'login'

	// 如果已登陆，返回首页
	$.when(global.$myDeferred).done(function () { // 此时获取用户信息完毕
		if (global.myLogin) {
			return avalon.router.navigate('/')
		}
	})
}

ctrl.$onRendered = function () {
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

					// 跳回上个页面
					avalon.router.navigate(avalon.router.getLastPath())
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