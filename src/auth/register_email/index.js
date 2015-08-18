ctrl.$onEnter = function (param, rs, rj) {
	document.title = '邮箱注册'
	avalon.vmodels.global.menu.current = 'register_email'

	// 请求激活用户
	wk.post({
		url: '/api/users/authentication/email',
		data: mmState.query,
		success: function (data) {
			avalon.router.navigate("/")
		},
		error: function (message) {
			wk.notice({
				title: '注册失败',
				content: message
			})
		}
	})
}

ctrl.$onRendered = function () {

}