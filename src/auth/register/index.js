ctrl.$onEnter = function (param, rs, rj) {
	// 如果已登陆，返回首页
	$.when(global.$myDeferred).done(function () { // 此时获取用户信息完毕
		if (global.myLogin) {
			avalon.router.navigate('/')
			return
		}
	})

	// 刷新验证码
	vm.freshCap()

	// 如果包含签名标签，则请求激活用户
	if (mmState.query.sign) {
		wk.post({
			url: '/api/users/authentication/email',
			data: mmState.query,
			success: function (data) {
				console.log(data)
			}
		})
	}
}
ctrl.$onRendered = function () {
	// Enter提交表单
	$(_root).bind('keyup', function (event) {
		if (event.keyCode == 13) { //按下Enter
			vm.submit()
		}
	})

	// 账号获取焦点
	$('#check-register #email').focus()
}