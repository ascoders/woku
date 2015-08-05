ctrl.$onEnter = function (param, rs, rj) {
	document.title = '登陆 - 我酷游戏'
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
	$('.ui.form').form({
		fields: {
			account: {
				identifier: 'account',
				rules: [{
					type: 'empty',
					prompt: 'Please enter your name'
				}]
			},
			password: {
				identifier: 'password',
				rules: [{
					type: 'empty',
					prompt: 'Please enter a password'
				}, {
					type: 'length[6]',
					prompt: 'Your password must be at least 6 characters'
				}]
			}
		}
	});
}