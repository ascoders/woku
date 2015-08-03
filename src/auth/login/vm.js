var vm = avalon.define({
	account: '',
	password: '',
	frontia: function (val) { // 点击第三方登陆
		require(['frontia'], function (frontia) {
			// API key 从应用信息页面获取
			var AK = 'RqeMWD9G1m8agmxfj6ngCKRG';
			// 在应用管理页面下的 社会化服务 - 基础设置中设置该地址
			var redirect_url = 'http://www.wokugame.com/login/oauth'

			// 初始化 frontia
			frontia.init(AK)

			// 初始化登录的配置
			var options = {
				response_type: 'token',
				media_type: val,
				redirect_uri: redirect_url,
				client_type: 'web'
			}

			// 登录
			frontia.social.login(options)
		});
	},
	submit: function () { //点击登陆按钮
		if (vm.account === '') {
			return wk.notice('账号不能为空', 'red')
		}
		if (vm.password === '') {
			return wk.notice('密码不能为空', 'red')
		}

		wk.get({
			url: '/api/users/authentication',
			data: {
				account: vm.account,
				password: vm.password
			},
			success: function (data) {
				avalon.vmodels.global.my.setInfo(data)

				// 跳回上个页面
				var lastUrl = avalon.router.getLastPath()
				if (lastUrl === 'login') {
					lastUrl = '/'
				}
				avalon.router.navigate(lastUrl)
			}
		})
	}
})