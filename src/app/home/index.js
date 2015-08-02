avalon.controller(function ($ctrl) {
	$ctrl.$onEnter = function (param, rs, rj) {
		// 根据参数设置获取资源的url
		var appUrl = '/api/apps'
		if (param.type) {
			appUrl += '/type/' + param.type
		}

		vm.type = param.type || ''
	}
	$ctrl.$onRendered = function () {}
})