var vm = avalon.define({
	games: [],
	tops: [],
	news: [],
	newgames: [],
	hots: [],
	name: '', //新增名称
	path: '', //路径
	type: '', //类型
	submit: function () { //提交
		var teshu = /[`~!！@#$%^&*()_+<>?:"”{},.，。\/;；‘'[\]]/im;
		if (vm.name === "" || teshu.test(vm.name)) { //名称不能为空，不能包含特殊符号
			return wk.notice("名称不能或者含有特殊符号", 'red')
		}
		if (vm.name.length < 2 || vm.name.length > 20) {
			return wk.notice("名称长度2-20", 'red')
		}
		var xiaoxie = /^[a-z]*$/g;
		if (vm.path === "" || !xiaoxie.test(vm.path)) { //域名不能为空，必须为字母
			return wk.notice("域名只包括字母", 'red')
		}
		if (vm.path.length < 3 || vm.path.length > 20) {
			return wk.notice("域名长度3-20", 'red')
		}

		wk.post({
			url: '/api/apps',
			data: {
				name: vm.name,
				path: vm.path,
				type: vm.type
			},
			success: function () {
				wk.notice(vm.name + ' 已创建成功！', 'green')

				// 跳转到游戏首页
				avalon.router.navigate('/a/' + vm.path)
			}
		})
	}
})