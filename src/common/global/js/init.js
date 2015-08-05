// init.js

//获取登陆用户信息
wk.get({
	url: '/api/users/current',
	success: function (data) {
		if (data === false) {
			return
		}

		global.my.setInfo(data)
	},
	error: function () {
		global.$myDeferred.resolve(); // 未登录
	}
})