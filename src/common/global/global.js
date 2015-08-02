__inline('js/avalon_conf.js');
__inline('js/namespace.js');
__inline('js/init.js');
__inline('js/router.js');

var global = avalon.define({
	$id: "global",

	// 当前登录账号
	my: {
		// 信息
		info: {},

		// 设置信息
		setInfo: function (val) {
			val.image = wk.userImage(val.image)
			global.my.info = val
			global.my.isLogin = true

			// 信息获取完毕
			global.$myDeferred.resolve()
		},

		// 是否已登陆
		isLogin: false,

		//退出登陆
		signout: function () {
			wk.delete({
				url: '/api/users/authentication',
				data: {
					id: global.my.id
				},
				success: function (data) {
					global.my.isLogin = false
					global.my.info = {}

					wk.notice('账号已登出', 'green')

					//如果用户在用户信息后台则返回首页
					if (mmState.currentState.stateName.indexOf('user') > -1) {
						avalon.router.navigate('/')
					}
				}
			})
		},
	},

	// 获取消息盒子信息
	getMessage: function () {},

	$myDeferred: null
});