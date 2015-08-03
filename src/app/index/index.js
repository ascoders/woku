ctrl.$onEnter = function (param, rs, rj) {
	// 根据参数设置获取资源的url
	var appUrl = '/api/apps'
	if (mmState.query.type) {
		appUrl += '/type/' + mmState.query.type
	}

	vm.type = mmState.query.type || ''

	setTimeout(function () {
		console.log(avalon.vmodels.page)
	}, 100)

}

ctrl.$onRendered = function () {

}