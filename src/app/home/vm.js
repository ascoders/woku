var vm = avalon.define({
	$id: "app/home",

	//当前分类
	type: '',

	//列表页
	list: [],

	// 分页插件参数
	$pageOpts: {
		// 开启url模式
		urlMode: true,
		page: 1,
		limit: 20,
		ajaxInit: true,
		ajax: {
			url: '/api/apps',
			success: function (data) {
				for (var i = 0, j = data.list.length; i < j; i++) {
					data.list[i].icon = data.list[i].icon === "" ? "/static/app/home/image/app.png" :
						"http://img.wokugame.com/" + data.list[i].icon
				}
				vm.list = data.list
			}
		}
	}
})