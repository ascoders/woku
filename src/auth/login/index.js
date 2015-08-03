ctrl.$onEnter = function (param, rs, rj) {
	// 如果已登陆，返回首页
	$.when(global.$myDeferred).done(function () { // 此时获取用户信息完毕
		if (global.myLogin) {
			return avalon.router.navigate('/')
		}
	})
}

ctrl.$onRendered = function () {
	// 移动到第三方账号按钮上，下部展开
	// 鼠标移动显示更多第三方登陆
	$(".other").hover(function () {
		$(".other-hide").show()
	}, function () {
		$(".other-hide").hide()
	})

	// Enter提交表单
	$(_root).bind('keyup', function (event) {
		if (event.keyCode == 13) { //按下Enter
			vm.submit()
		}
	})

	// 账号获取焦点
	$('#check-login #account').focus()
}