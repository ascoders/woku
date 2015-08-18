var vm = avalon.define({
	// 步骤
	steps: {
		info: {
			name: '快速填写信息',
			icon: 'browser',
			locked: false
		},
		email: {
			name: '邮箱',
			icon: 'mail',
			locked: true
		},
		success: {
			name: '成功',
			icon: 'checkmark',
			locked: true
		}
	},
	// 步骤名
	step: 'info',
	// 修改步骤
	setStep: function (name) {
		vm.step = name
	},

	// 刷新验证码
	freshCap: function () {
		vm.data.captcha = ''

		// 刷新验证码
		wk.post({
			url: '/api/captcha',
			success: function (data) {
				vm.data.capid = data.captchaCode
			}
		})
	},

	// 注册表单数据
	data: {
		email: '',
		nickname: '',
		password: '',
		capid: '',
		captcha: ''
	}
})